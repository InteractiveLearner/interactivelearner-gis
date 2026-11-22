import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { collectDocs, toMarkdown, literal } from '../scripts/ai-content.mjs';
import { discoveryAssets } from '../scripts/discovery.mjs';
import { wantsMarkdown } from '../scripts/ai-http.mjs';
import worker from '../scripts/pages-worker.mjs';
import { searchDocs, getDoc } from '../mcp/search.ts';
import { serverCard } from '../mcp/metadata.ts';

test('every lesson exports readable Markdown without answer keys or Vue props', () => {
  const docs = collectDocs();
  assert.ok(docs.length >= 22);
  for (const doc of docs) {
    assert.ok(doc.markdown.length > 50, doc.url);
    assert.doesNotMatch(doc.markdown, /correctAnswer:|:quiz-data=|<Quiz|<Sources|<ContentFigure/);
  }
  const projections = docs.find(d => d.url === '/lessons/projections');
  assert.match(projections.markdown, /Practice question/);
  assert.match(projections.markdown, /Interactive visualization: ProjectionExplorer/);
  assert.match(projections.markdown, /\]\(https:/);
});

test('Markdown preserves code examples and does not execute prop expressions', () => {
  const code = '```html\n<script src="example.js"></script>\n<Quiz />\n```';
  assert.equal(toMarkdown(code).trim(), code);
  assert.throws(() => literal('process.exit()'));
  assert.deepEqual(literal("{questions: [{question: 'Hi', correctAnswer: 1}]}"), { questions: [{ question: 'Hi', correctAnswer: 1 }] });
});

test('Accept negotiation respects explicit exclusions, preferences and browser defaults', () => {
  for (const value of ['', '*/*', 'text/html,*/*;q=0.8', 'text/markdown;q=0', 'text/markdown;q=0.5,text/html']) assert.equal(wantsMarkdown(value), false, value);
  for (const value of ['text/markdown', 'text/html;q=0.5,text/markdown', 'text/markdown;q=1,text/html;q=1']) assert.equal(wantsMarkdown(value), true, value);
});

const env = { ASSETS: { fetch: async () => new Response('<!DOCTYPE html><h1>Lesson</h1>', { headers: { 'Content-Type': 'text/html', 'X-Asset': 'preserved' } }) } };
test('production handler serves negotiated and explicit Markdown and keeps HTML the default', async () => {
  for (const path of ['/lessons/projections', '/lessons/projections.html', '/lessons/projections/']) {
    const response = await worker.fetch(new Request('https://example.test' + path, { headers: { Accept: 'text/markdown' } }), env);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('Content-Type'), /text\/markdown/);
    assert.equal(response.headers.get('Vary'), 'Accept');
    assert.match(await response.text(), /# Projections/);
  }
  const explicit = await worker.fetch(new Request('https://example.test/lessons/projections.md'), env);
  assert.match(explicit.headers.get('Content-Type'), /text\/markdown/);
  const html = await worker.fetch(new Request('https://example.test/lessons/projections'), env);
  assert.equal(html.headers.get('X-Asset'), 'preserved');
  assert.match(html.headers.get('Link'), /rel="api-catalog"/);
  assert.equal(html.headers.get('Vary'), 'Accept');
  assert.match(await html.text(), /<!DOCTYPE html>/);
  const head = await worker.fetch(new Request('https://example.test/index.md', { method: 'HEAD' }), env);
  assert.equal(await head.text(), '');
});

test('BM25 search uses lesson text, handles plurals, short terms and noisy queries', () => {
  for (const [query, expected] of [
    ['map projections', '/lessons/projections'], ['equal interval quantile natural breaks', '/lessons/classification'],
    ['coordinate reference systems', '/lessons/projections'], ['SQL', '/lessons/relational-db'],
    ['how do I publish a web map on GitHub Pages', '/exercises/web/publish-a-web-map'],
  ]) assert.ok(searchDocs(query, 3).some(d => d.url.endsWith(expected)), query);
  assert.equal(searchDocs('the and of').length, 0);
  assert.equal(searchDocs('xyzzy-nonexistent').length, 0);
  assert.ok(searchDocs('map', 2).length <= 2);
});

test('get_doc only reads known site documents', () => {
  assert.ok(getDoc('/lessons/projections.md'));
  assert.ok(getDoc('https://www.interactivelearner-gis.com/lessons/projections.html#test'));
  assert.ok(getDoc('/lessons/web-GIS/'));
  for (const path of ['https://example.com/lessons/projections', '//example.com/lessons/projections', '/does-not-exist', 'file:///etc/passwd']) assert.equal(getDoc(path), undefined);
});

test('discovery hashes exact skill bytes and advertises only configured services', () => {
  const assets = discoveryAssets('');
  const index = JSON.parse(assets['/.well-known/agent-skills/index.json'].body);
  const skill = assets['/.well-known/agent-skills/gis-tutor/SKILL.md'].body;
  assert.equal(index.skills[0].digest, 'sha256:' + createHash('sha256').update(skill).digest('hex'));
  assert.equal(assets['/.well-known/api-catalog'].type, 'application/linkset+json');
  assert.equal(JSON.parse(assets['/.well-known/ai-catalog.json'].body).entries.length, 1);
  const configured = discoveryAssets('https://gis-mcp.example.com/mcp');
  const entries = JSON.parse(configured['/.well-known/ai-catalog.json'].body).entries;
  assert.equal(entries[1].url, 'https://gis-mcp.example.com/mcp/server-card');
  assert.throws(() => discoveryAssets('https://user:secret@example.com/mcp'));
  assert.equal(serverCard('https://example.com').remotes[0].url, 'https://example.com/mcp');
});
