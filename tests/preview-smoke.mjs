import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

if (!process.env.PREVIEW_URL) throw new Error('Set PREVIEW_URL to the Cloudflare preview URL.');
const origin = new URL(process.env.PREVIEW_URL).origin;
const output = path.resolve(process.env.PREVIEW_ARTIFACT_DIR || '.wrangler/preview-checks');
mkdirSync(output, { recursive: true });
const report = { origin, checkedAt: new Date().toISOString(), checks: [], pageErrors: [], consoleErrors: [], failedSiteRequests: [] };
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : process.platform === 'darwin' ? { channel: 'chrome' } : {}),
  headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(30000);
page.on('pageerror', error => report.pageErrors.push(error.message));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
page.on('response', response => {
  if (response.status() >= 400 && new URL(response.url()).origin === origin) report.failedSiteRequests.push({ url: response.url(), status: response.status() });
});

async function open(route) {
  const response = await page.goto(origin + route);
  assert.equal(response.status(), 200, route);
  await page.waitForFunction(async () => {
    if (!document.modelContext) return false;
    const names = (await document.modelContext.getTools()).map(t => t.name);
    return ['get_page_markdown', 'list_visualizations', 'update_visualization', 'read_quiz_results'].every(name => names.includes(name));
  });
}
async function call(name, input = {}) {
  await page.waitForFunction(async name => document.modelContext && (await document.modelContext.getTools()).some(tool => tool.name === name), name);
  return page.evaluate(async ({ name, input }) => {
    const tools = await document.modelContext.getTools();
    const tool = tools.find(t => t.name === name);
    if (!tool) throw new Error('Tool unavailable: ' + name + '; discovered: ' + tools.map(t => t.name).join(', '));
    return JSON.parse(await document.modelContext.executeTool(tool, input));
  }, { name, input });
}
async function screenshot(name) { await page.screenshot({ path: path.join(output, name + '.png') }); }
async function check(name, run) {
  await run();
  report.checks.push({ name, status: 'pass' });
  console.log('PASS ' + name);
}

try {
  await check('HTTP Markdown negotiation and discovery', async () => {
    const html = await fetch(origin + '/lessons/projections');
    assert.equal(html.status, 200);
    assert.match(html.headers.get('content-type'), /text\/html/);
    assert.match(html.headers.get('link'), /rel="api-catalog"/);
    const markdown = await fetch(origin + '/lessons/projections', { headers: { Accept: 'text/markdown' } });
    assert.equal(markdown.status, 200);
    assert.match(markdown.headers.get('content-type'), /text\/markdown/);
    assert.match(markdown.headers.get('vary'), /Accept/);
    assert.match(await markdown.text(), /# Projections/);
    for (const [route, type] of [['/.well-known/api-catalog', 'application/linkset+json'], ['/.well-known/ai-catalog.json', 'application/json'], ['/.well-known/agent-skills/index.json', 'application/json'], ['/openapi.json', 'application/json']]) {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200, route);
      assert.ok(response.headers.get('content-type').startsWith(type), route);
      assert.equal(response.headers.get('access-control-allow-origin'), '*', route);
      await response.json();
    }
  });
  await check('Classification, natural breaks, Calcite controls and quiz feedback', async () => {
    await open('/lessons/classification');
    await page.waitForFunction(() => document.querySelectorAll('#classified-map path.leaflet-interactive').length > 40);
    const lesson = await call('get_page_markdown');
    assert.match(lesson.markdown, /# Classifying data/);
    assert.doesNotMatch(lesson.markdown, /correctAnswer/);
    const before = await call('read_quiz_results');
    assert.equal(before.quizzes[0].answered, 0);
    assert.equal(before.quizzes[0].questions[0].correctAnswer, undefined);
    const changed = await call('update_visualization', { id: 'classified-map', changes: { variable: 'density', method: 'naturalBreaks', classes: 4 } });
    assert.equal(changed.state.method, 'naturalBreaks');
    assert.equal(changed.state.variable, 'density');
    assert.equal(changed.state.classes, 4);
    const colors = await page.locator('#classified-map path.leaflet-interactive').evaluateAll(paths => [...new Set(paths.map(p => p.getAttribute('fill')))]);
    assert.equal(colors.length, 4, 'Map should visibly use the four classification colors');
    assert.match((await call('update_visualization', { id: 'classified-map', changes: { classes: 99 } })).error, /Out of range/);
    await page.getByRole('button', { name: 'False', exact: true }).click();
    const feedback = await call('read_quiz_results');
    assert.equal(feedback.quizzes[0].answered, 1);
    assert.equal(feedback.quizzes[0].questions[0].status, 'incorrect');
    await page.getByRole('button', { name: 'Filter', exact: true }).click();
    await screenshot('classification');
    await page.getByRole('link', { name: 'Next page Misleading maps', exact: true }).click();
    await page.waitForURL('**/lessons/misleading');
    await page.locator('h1').filter({ hasText: 'Misleading maps' }).waitFor({ state: 'visible' });
    const next = await call('read_quiz_results');
    assert.equal(next.page, '/lessons/misleading');
    assert.equal(next.quizzes[0].answered, 0);
  });
  await check('Projection explorer and D3 drawing', async () => {
    await open('/lessons/projections');
    await page.waitForFunction(() => document.querySelectorAll('g.map path').length > 100);
    const before = await page.locator('g.map path').first().getAttribute('d');
    const changed = await call('update_visualization', { id: 'projection-explorer', changes: { type: 'Mercator', scale: 150 } });
    assert.equal(changed.state.type, 'Mercator');
    assert.notEqual(await page.locator('g.map path').first().getAttribute('d'), before);
  });
  await check('Vector and raster map controls', async () => {
    await open('/lessons/spatial-data');
    await page.waitForFunction(() => document.querySelectorAll('#vector-map path.leaflet-interactive').length > 40);
    const changed = await call('update_visualization', { id: 'vector-and-raster', changes: { variable: 'density', zoom: 5 } });
    assert.equal(changed.state.variable, 'density');
    assert.equal(changed.state.zoom, 5);
  });
  await check('ArcGIS Maps SDK and map panels', async () => {
    await open('/lessons/map-types');
    await page.waitForFunction(async () => {
      if (!document.modelContext) return false;
      const tools = await document.modelContext.getTools();
      const tool = tools.find(t => t.name === 'list_visualizations');
      const data = JSON.parse(await document.modelContext.executeTool(tool, {}));
      return data.visualizations.some(v => v.id === 'chorochromatic' && v.ready);
    }, undefined, { timeout: 90000 });
    const changed = await call('update_visualization', { id: 'chorochromatic', changes: { zoom: 5, panel: 'legend' } });
    assert.equal(changed.state.panel, 'legend');
    assert.equal(changed.state.zoom, 5);
    await page.locator('#chorochromatic').scrollIntoViewIfNeeded();
    await screenshot('arcgis');
  });
  await check('Mermaid diagram and frontend example', async () => {
    await open('/lessons/web-GIS/frontend-frameworks');
    await page.locator('svg[id^="mermaid-"]').first().waitFor({ state: 'visible' });
    assert.ok(await page.locator('svg[id^="mermaid-"] path').count());
  });
  assert.deepEqual(report.pageErrors, [], 'Unexpected browser runtime errors');
  assert.deepEqual(report.failedSiteRequests, [], 'Site resources should load successfully');
} catch (error) {
  report.lastPageUrl = page.url();
  report.failure = error.stack || String(error);
  await screenshot('failure').catch(() => {});
  throw error;
} finally {
  writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
