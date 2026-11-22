import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { collectDocs, origin } from './ai-content.mjs';

export function discoveryAssets(mcpEndpoint = process.env.MCP_SERVER_URL) {
  const docs = collectDocs();
  const skillPath = '/.well-known/agent-skills/gis-tutor/SKILL.md';
  const skill = readFileSync(new URL('./gis-tutor.md', import.meta.url), 'utf8');
  const json = (data, type = 'application/json') => ({ body: JSON.stringify(data, null, 2) + '\n', type });
  /** @type {Record<string, {body: string, type: string}>} */
  const assets = {
    [skillPath]: { body: skill, type: 'text/markdown; charset=utf-8' },
    '/.well-known/agent-skills/index.json': json({
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      skills: [{ name: 'gis-tutor', type: 'skill-md', description: 'Teach GIS with lesson Markdown, visual comparisons and learner quiz feedback.', url: origin + skillPath, digest: 'sha256:' + createHash('sha256').update(skill).digest('hex') }],
    }),
    '/health.json': json({ status: 'ok', pages: docs.length }),
    '/openapi.json': json({ openapi: '3.1.0', info: { title: 'Interactive Learner GIS Markdown', version: '1.0.0', description: 'Public lesson Markdown. No authentication required.' }, servers: [{ url: origin }],
      paths: Object.fromEntries(docs.map(d => [d.markdownPath, { get: { summary: d.title, responses: { 200: { description: 'Lesson Markdown', content: { 'text/markdown': { schema: { type: 'string' } } } } } } }])) }),
  };
  const linkset = [{ anchor: origin, 'service-desc': [{ href: origin + '/openapi.json', type: 'application/vnd.oai.openapi+json' }], 'service-doc': [{ href: origin + '/ai', type: 'text/html' }], status: [{ href: origin + '/health.json', type: 'application/json' }] }];
  const entries = [{ identifier: 'urn:air:interactivelearner-gis.com:skill:gis-tutor', displayName: 'GIS tutor', type: 'text/markdown', url: origin + skillPath, representativeQueries: ['Help me understand map projections', 'Use my quiz results to explain GIS concepts'] }];
  if (mcpEndpoint) {
    const endpoint = new URL(mcpEndpoint);
    if (endpoint.protocol !== 'https:' || endpoint.pathname !== '/mcp' || endpoint.search || endpoint.hash || endpoint.username || endpoint.password) throw new Error('MCP_SERVER_URL must be a public HTTPS /mcp URL without credentials or query parameters.');
    const cardUrl = new URL('/mcp/server-card', endpoint).href;
    linkset.push({ anchor: endpoint.href, 'service-desc': [{ href: cardUrl, type: 'application/mcp-server-card+json' }], 'service-doc': [{ href: origin + '/ai', type: 'text/html' }], status: [{ href: new URL('/health', endpoint).href, type: 'application/json' }] });
    entries.push({ identifier: 'urn:air:interactivelearner-gis.com:mcp:docs', displayName: 'GIS documentation MCP', type: 'application/mcp-server-card+json', url: cardUrl, representativeQueries: ['Find lessons about data classification', 'Read the QGIS vector exercise'] });
  }
  assets['/.well-known/api-catalog'] = json({ linkset }, 'application/linkset+json');
  assets['/.well-known/ai-catalog.json'] = json({ specVersion: '1.0', host: { name: 'Interactive Learner GIS', url: origin }, entries });
  assets['/llms.txt'] = { body: `# Interactive Learner GIS\n\n> Public GIS lessons and exercises. No authentication required.\n\n[Agent documentation](${origin}/ai)\n\n## Pages\n\n${docs.map(d => `- [${d.title}](${origin}${d.markdownPath}): ${d.description}`).join('\n')}\n`, type: 'text/plain; charset=utf-8' };
  return assets;
}
