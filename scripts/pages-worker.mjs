import { discoveryLink, findDoc, wantsMarkdown } from './ai-http.mjs';
import docs from '../mcp/generated/docs.json' with { type: 'json' };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const doc = findDoc(docs, url.pathname);
    const read = request.method === 'GET' || request.method === 'HEAD';
    if (doc && read && (url.pathname.endsWith('.md') || wantsMarkdown(request.headers.get('Accept') || ''))) {
      return new Response(request.method === 'HEAD' ? null : doc.markdown, { headers: {
        'Content-Type': 'text/markdown; charset=utf-8', 'Vary': 'Accept',
        'Link': `${discoveryLink}, <${doc.markdownPath}>; rel="alternate"; type="text/markdown"`,
        'Access-Control-Allow-Origin': '*',
      } });
    }
    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    if (doc && read) {
      response.headers.append('Vary', 'Accept');
      response.headers.append('Link', `${discoveryLink}, <${doc.markdownPath}>; rel="alternate"; type="text/markdown"`);
    }
    return response;
  },
};
