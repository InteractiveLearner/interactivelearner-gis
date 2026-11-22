import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';
import { root } from './ai-content.mjs';
import { discoveryAssets } from './discovery.mjs';

const out = path.join(root, 'docs/.vitepress/dist');
const assets = discoveryAssets();
for (const [url, { body }] of Object.entries(assets)) {
  const file = path.join(out, url);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, body);
}
writeFileSync(path.join(out, '_headers'), Object.entries(assets).map(([url, { type }]) => `${url}\n  Content-Type: ${type}\n  Access-Control-Allow-Origin: *\n  Cache-Control: public, max-age=300`).join('\n\n') + '\n\n/*.md\n  Content-Type: text/markdown; charset=utf-8\n  Access-Control-Allow-Origin: *\n');
await build({ entryPoints: [path.join(root, 'scripts/pages-worker.mjs')], outfile: path.join(out, '_worker.js'), bundle: true, format: 'esm', platform: 'browser', target: 'es2022' });
console.log('Generated discovery endpoints and the Cloudflare Pages Markdown handler.');
