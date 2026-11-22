import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import ts from 'typescript';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const origin = 'https://interactivelearner-gis.com';

// Read only literal Vue prop values. Never execute lesson expressions during a build.
export function literal(expression) {
  const source = ts.createSourceFile('prop.ts', `(${expression})`, ts.ScriptTarget.Latest, true);
  function read(node) {
    if (ts.isParenthesizedExpression(node)) return read(node.expression);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(read);
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => {
      if (!ts.isPropertyAssignment(p) || !p.name || !('text' in p.name)) throw new Error('Expected a literal property');
      return [p.name.text, read(p.initializer)];
    }));
    throw new Error('Only literal component props can be exported as Markdown');
  }
  if (source.parseDiagnostics.length) throw new Error('Invalid component prop');
  return read(source.statements[0].expression);
}

function prop(tag, name) {
  const bound = tag.match(new RegExp(`:${name}="([\\s\\S]*?)"`));
  if (bound) return literal(bound[1].replaceAll('&quot;', '"').replaceAll('&amp;', '&'));
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

export function toMarkdown(source, metadata = {}) {
  // Preserve code examples exactly, including embedded HTML and script tags.
  const fences = [];
  let text = source.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, code => `\u0000FENCE${fences.push(code) - 1}\u0000`);
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<WikiTooltip\s+url="([^"]+)"[^>]*>([\s\S]*?)<\/WikiTooltip>/g, '[$2]($1)')
    .replace(/<ContentFigure\b[\s\S]*?\/>/g, tag => {
      const image = prop(tag, 'imgSrc');
      const description = prop(tag, 'description') || 'Lesson figure';
      const credit = prop(tag, 'anchorHref');
      return `![${description}](${image})${credit ? `\n[${prop(tag, 'anchorText') || 'Source'}](${credit})` : ''}`;
    })
    .replace(/<Sources\b[\s\S]*?\/>/g, tag => (prop(tag, 'sources') || []).map(s => `- [${s.title}](${s.url})${s.author ? ` — ${s.author}` : ''}`).join('\n'))
    .replace(/<Quiz\b[\s\S]*?\/>/g, tag => {
      const quiz = prop(tag, 'quiz-data');
      return (quiz?.questions || []).map((q, i) => `### Practice question ${i + 1}\n\n${q.question}\n\n${q.options.map(o => `- ${o.answer}`).join('\n')}`).join('\n\n') + '\n\nAnswer in the browser. The read_quiz_results tool can read your attempted answers and feedback.';
    })
    .replace(/<([A-Z]\w*)\b[^>]*\/>/g, (_, name) => `\n[Interactive visualization: ${name}. Open this page in a browser and use list_visualizations to discover its controls.]\n`)
    .replace(/<\/?(?:ClientOnly|Stepper)\b[^>]*>/g, '')
    .replace(/<\/?(?:div|template)\b[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n');
  if (metadata.hero) {
    text = `# Interactive Learner GIS\n\n${metadata.hero.text}\n\n${metadata.hero.tagline}\n\n[Get started](/welcome)\n${text}`;
  }
  return text.replace(/\u0000FENCE(\d+)\u0000/g, (_, i) => fences[Number(i)]).trim() + '\n';
}

export function collectDocs() {
  const docs = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.') || ['public', 'node_modules'].includes(entry.name)) continue;
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.md')) {
        const { data, content } = matter(readFileSync(file, 'utf8'));
        const relative = path.relative(path.join(root, 'docs'), file).replaceAll(path.sep, '/');
        const url = '/' + relative.replace(/index\.md$/, '').replace(/\.md$/, '');
        const markdown = toMarkdown(content, data);
        docs.push({ title: data.title || (url === '/' ? 'Interactive Learner GIS' : markdown.match(/^# (.+)$/m)?.[1]) || relative,
          description: data.description || '', url, markdownPath: '/' + relative, markdown });
      }
    }
  }
  walk(path.join(root, 'docs'));
  return docs;
}

export function generateIndex() {
  const docs = collectDocs();
  const dir = path.join(root, 'mcp/generated');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'docs.json'), JSON.stringify(docs));
  return docs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(`Generated AI content for ${generateIndex().length} pages.`);
}
