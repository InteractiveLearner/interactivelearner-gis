import content from './generated/docs.json' with { type: 'json' };
export const BASE_URL = 'https://interactivelearner-gis.com';
export const docs = content;
export type Doc = typeof docs[number];

const stopWords = new Set('a an and are as at be by can do does for from how i in is it learn me of on or show tell that the their these this to understand use what when where which why with you your'.split(' '));
export function tokenize(text: string): string[] {
  return text.toLowerCase().normalize('NFKD').replace(/[’']/g, '').match(/[a-z0-9]+/g)?.map(word => word.length > 4 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word).filter(word => !stopWords.has(word)) || [];
}
const indexed = docs.map(doc => {
  const tokens = tokenize(`${doc.title} ${doc.title} ${doc.description} ${doc.markdown}`);
  const frequency = new Map<string, number>();
  for (const token of tokens) frequency.set(token, (frequency.get(token) || 0) + 1);
  return { doc, tokens, frequency, title: new Set(tokenize(doc.title)) };
});
const averageLength = indexed.reduce((sum, row) => sum + row.tokens.length, 0) / indexed.length;
const documentFrequency = new Map<string, number>();
for (const row of indexed) for (const token of row.frequency.keys()) documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);

export function searchDocs(query: string, limit = 5) {
  const terms = [...new Set(tokenize(query))];
  if (!terms.length) return [];
  return indexed.map(({ doc, frequency, tokens, title }) => {
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const tf = frequency.get(term) || 0;
      if (!tf) continue;
      matched++;
      const df = documentFrequency.get(term) || 0;
      const idf = Math.log(1 + (indexed.length - df + 0.5) / (df + 0.5));
      score += idf * tf * 2.2 / (tf + 1.2 * (0.25 + 0.75 * tokens.length / averageLength));
      if (title.has(term)) score += idf * 2;
    }
    score *= matched / terms.length;
    const passages = doc.markdown.split(/\n\s*\n/).filter(p => !p.startsWith('```'));
    const count = (p: string) => terms.filter(t => tokenize(p).includes(t)).length;
    const excerpt = passages.sort((a, b) => count(b) - count(a))[0]?.slice(0, 600) || doc.description;
    return { title: doc.title, description: doc.description, url: BASE_URL + doc.url, markdownUrl: BASE_URL + doc.markdownPath, score: Math.round(score * 1000) / 1000, excerpt };
  }).filter(row => row.score > 0).sort((a, b) => b.score - a.score || a.url.localeCompare(b.url)).slice(0, Math.max(1, Math.min(20, limit)));
}

export function getDoc(value: string): Doc | undefined {
  let url: URL;
  try { url = new URL(value, BASE_URL); } catch { return undefined; }
  if (![BASE_URL, 'https://www.interactivelearner-gis.com'].includes(url.origin)) return undefined;
  const pathname = url.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  return docs.find(doc => [doc.url.replace(/\/$/, '') || '/', doc.markdownPath, doc.markdownPath.replace(/\.md$/, '')].includes(pathname));
}
