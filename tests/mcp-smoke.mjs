import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const endpoint = new URL(process.env.MCP_TEST_URL || 'http://localhost:8787/mcp');
const client = new Client({ name: 'gis-readiness-check', version: '1.0.0' });
const transport = new StreamableHTTPClientTransport(endpoint);
try {
  await client.connect(transport);
  const tools = await client.listTools();
  assert.deepEqual(tools.tools.map(t => t.name).sort(), ['get_doc', 'list_topics', 'search_docs']);
  const search = await client.callTool({ name: 'search_docs', arguments: { query: 'coordinate reference systems', limit: 3 } });
  assert.match(search.content[0].text, /lessons\/projections/);
  const page = await client.callTool({ name: 'get_doc', arguments: { path: '/lessons/projections.md' } });
  assert.match(page.content[0].text, /# Projections/);
  assert.doesNotMatch(page.content[0].text, /correctAnswer/);
  const blocked = await client.callTool({ name: 'get_doc', arguments: { path: 'https://example.com' } });
  assert.equal(blocked.isError, true);
  const invalid = await client.callTool({ name: 'search_docs', arguments: { query: 'map', limit: -1 } });
  assert.equal(invalid.isError, true);
  const resources = await client.listResources();
  assert.equal(resources.resources.length, 22);
  const markdown = await client.readResource({ uri: 'https://interactivelearner-gis.com/lessons/projections.md' });
  assert.match(markdown.contents[0].text, /# Projections/);
  const card = await fetch(new URL('/mcp/server-card', endpoint));
  assert.match(card.headers.get('Content-Type'), /mcp-server-card/);
  assert.equal((await card.json()).remotes[0].url, endpoint.href);
  console.log('MCP protocol check passed: initialize, tools, search, full lesson, validation, resources and server card.');
} finally {
  await transport.terminateSession().catch(() => {});
  await client.close();
}
