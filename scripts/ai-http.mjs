// Shared by the production Pages Worker and the Vite development server.
export const discoveryLink = '</.well-known/api-catalog>; rel="api-catalog", </ai>; rel="service-doc", </llms.txt>; rel="describedby"; type="text/plain"';

export function wantsMarkdown(accept = '') {
  const types = accept.toLowerCase().split(',').map(part => {
    const [type, ...params] = part.trim().split(';');
    const q = params.find(p => p.trim().startsWith('q='));
    const quality = q ? Number(q.trim().slice(2)) : 1;
    return { type, q: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0 };
  });
  const markdown = types.find(t => t.type === 'text/markdown')?.q || 0;
  const html = types.find(t => t.type === 'text/html')?.q || 0;
  return markdown > 0 && markdown >= html;
}

export function findDoc(docs, pathname) {
  return docs.find(d => [d.url, d.url === '/' ? '/index.html' : d.url.replace(/\/$/, '') + '.html', d.markdownPath,
    d.url.endsWith('/') ? d.url + 'index.html' : d.url + '/'].includes(pathname));
}
