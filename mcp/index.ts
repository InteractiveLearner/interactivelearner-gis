import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { McpAgent } from 'agents/mcp';
import { z } from 'zod';
import { docs, searchDocs, getDoc, BASE_URL } from './search';
import { serverCard, apiCatalog } from './metadata';

const readOnly = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };
const result = (value: unknown) => ({ content: [{ type: 'text' as const, text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });

export class MyMCP extends McpAgent<Env> {
  server = new McpServer({ name: 'Interactive Learner GIS', version: '1.1.0' });
  async init() {
    this.server.registerTool('search_docs', {
      description: 'Search actual GIS lesson and exercise text. Returns ranked passages and canonical HTML/Markdown links. Scores are ranking weights, not probabilities.',
      inputSchema: { query: z.string().trim().min(1).max(500), limit: z.number().int().min(1).max(20).default(5) }, annotations: readOnly,
    }, async ({ query, limit }) => result({ query, results: searchDocs(query, limit) }));
    this.server.registerTool('list_topics', {
      description: 'List all public GIS lessons, exercises and documentation pages.', annotations: readOnly,
    }, async () => result(docs.map(({ markdown: _, ...doc }) => ({ ...doc, url: BASE_URL + doc.url, markdownUrl: BASE_URL + doc.markdownPath }))));
    this.server.registerTool('get_doc', {
      description: 'Read a full GIS lesson as Markdown. Supply a site path or canonical site URL from search_docs or list_topics. Cannot fetch arbitrary URLs or browser quiz results.',
      inputSchema: { path: z.string().min(1).max(500) }, annotations: readOnly,
    }, async ({ path }) => {
      const doc = getDoc(path);
      return doc ? result({ title: doc.title, url: BASE_URL + doc.url, markdown: doc.markdown }) : { ...result('Page not found. Use list_topics for valid paths.'), isError: true };
    });
    for (const doc of docs) {
      const uri = BASE_URL + doc.markdownPath;
      this.server.registerResource(doc.title, uri, { description: doc.description, mimeType: 'text/markdown' }, async () => ({ contents: [{ uri, mimeType: 'text/markdown', text: doc.markdown }] }));
    }
  }
}

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    const headers = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' };
    if (request.method === 'GET' || request.method === 'HEAD') {
      let body: unknown;
      let type = 'application/json';
      if (['/mcp/server-card', '/.well-known/mcp/server-card.json'].includes(url.pathname)) { body = serverCard(url.origin); type = 'application/mcp-server-card+json'; }
      if (url.pathname === '/.well-known/api-catalog') { body = apiCatalog(url.origin); type = 'application/linkset+json'; }
      if (url.pathname === '/health') body = { status: 'ok', pages: docs.length, version: '1.1.0' };
      if (body) return new Response(request.method === 'HEAD' ? null : JSON.stringify(body), { headers: { ...headers, 'Content-Type': type } });
    }
    if (url.pathname === '/mcp') return MyMCP.serve('/mcp', { binding: 'MCP_OBJECT' }).fetch(request, env, ctx);
    return new Response('Not found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
