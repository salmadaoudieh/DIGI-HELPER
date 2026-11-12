// Turns dist-single/index.html into a body fragment for publishing as a claude.ai artifact.
import { readFileSync, writeFileSync } from 'node:fs';
const html = readFileSync(new URL('./dist-single/index.html', import.meta.url), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/i)[1];
const keep = head.replace(/<meta charset[^>]*>/i, '').replace(/<meta name="viewport"[^>]*>/i, '');
const out = `<title>Digi Helper</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${keep.replace(/<title>[^<]*<\/title>/i, '')}\n${body}`;
writeFileSync(new URL('./dist-single/artifact.html', import.meta.url), out);
console.log('artifact.html', out.length);
