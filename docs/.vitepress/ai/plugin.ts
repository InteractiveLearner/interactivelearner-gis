import { collectDocs, origin } from '../../../scripts/ai-content.mjs';
import { discoveryLink, findDoc, wantsMarkdown } from '../../../scripts/ai-http.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { discoveryAssets } from '../../../scripts/discovery.mjs';

export function aiContentPlugin(): Plugin {
  return {
    name: 'gis-ai-content',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Vite also requests .md files as compiled page modules during navigation.
        if (req.headers['sec-fetch-dest'] === 'script' || /[?&](import|raw|vue)([=&]|$)/.test(req.url || '')) return next();
        const pathname = new URL(req.url || '/', 'http://localhost').pathname;
        const asset = discoveryAssets()[pathname];
        if (asset && ['GET', 'HEAD'].includes(req.method || 'GET')) {
          res.setHeader('Content-Type', asset.type);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(req.method === 'HEAD' ? undefined : asset.body);
          return;
        }
        const doc = findDoc(collectDocs(), pathname);
        if (!doc || !['GET', 'HEAD'].includes(req.method || 'GET')) return next();
        res.setHeader('Vary', 'Accept');
        res.setHeader('Link', `${discoveryLink}, <${doc.markdownPath}>; rel="alternate"; type="text/markdown"`);
        if (!pathname.endsWith('.md') && !wantsMarkdown(req.headers.accept)) return next();
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.end(req.method === 'HEAD' ? undefined : doc.markdown);
      });
    },
  };
}

export function writeMarkdown(outDir: string) {
  const docs = collectDocs();
  for (const doc of docs) {
    const file = path.join(outDir, doc.markdownPath);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, doc.markdown);
  }
  writeFileSync(path.join(outDir, 'llms.txt'), `# Interactive Learner GIS\n\n> Public GIS lessons and exercises. No authentication required.\n\n[Agent documentation](${origin}/ai)\n\n## Pages\n\n${docs.map(d => `- [${d.title}](${origin}${d.markdownPath}): ${d.description}`).join('\n')}\n`);
}
