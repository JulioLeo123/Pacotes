import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { load } from 'cheerio';

// Detecta dinamicamente o diretório do app (pacotes-web) mesmo se o script for rodado a partir da raiz
const cwd = process.cwd();
const PACOTES_WEB_DIR = fs.existsSync(path.join(cwd, 'pacotes-web', 'src'))
  ? path.join(cwd, 'pacotes-web')
  : fs.existsSync(path.join(cwd, 'src'))
  ? cwd
  : null;

if (!PACOTES_WEB_DIR) {
  console.error('Não foi possível localizar o diretório do app (pacotes-web). Rode o script na raiz do repositório ou dentro de pacotes-web.');
  process.exit(1);
}

const appDir = PACOTES_WEB_DIR;
const rootDir = path.resolve(appDir, '..');
const outData = path.join(appDir, 'src', 'data', 'packages.js');
const imagesDir = path.join(appDir, 'public', 'images');

fs.mkdirSync(path.dirname(outData), { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

const files = fg
  .sync(['*.html', '*/*.html', '*/*/*.html'], {
    cwd: rootDir,
    onlyFiles: true,
    ignore: ['pacotes-web/**', 'node_modules/**'],
  })
  .map((f) => path.join(rootDir, f));

function parsePrice(html) {
  const m = html.match(/R\$\s*[\d\.\,]+/g);
  if (!m || !m.length) return 0;
  const last = m[m.length - 1].replace(/[^\d.,]/g, '');
  const num = Number(last.replace(/\./g, '').replace(',', '.'));
  return isNaN(num) ? 0 : Math.round(num);
}
function isRemote(src) { return /^https?:\/\//i.test(src); }
function copyLocalImage(src, baseDir) {
  try {
    const abs = path.resolve(baseDir, src);
    if (!fs.existsSync(abs)) return null;
    const ext = path.extname(abs);
    const base = path.basename(abs, ext).replace(/\s+/g, '-').toLowerCase();
    let target = path.join(imagesDir, `${base}${ext}`);
    let i = 1;
    while (fs.existsSync(target)) {
      target = path.join(imagesDir, `${base}-${i}${ext}`);
      i++;
    }
    fs.copyFileSync(abs, target);
    return `/images/${path.basename(target)}`;
  } catch {
    return null;
  }
}

const packages = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = load(html); // <- ajuste

  const title =
    ($('main h1').first().text() ||
      $('h1').first().text() ||
      $('h2').first().text() ||
      $('title').first().text() ||
      path.basename(file, path.extname(file)))
      .replace(/\s+/g, ' ')
      .trim();

  let imgSrc =
    $('main img').first().attr('src') ||
    $('section img').first().attr('src') ||
    $('img').first().attr('src') ||
    '';

  let finalImg = imgSrc;
  if (imgSrc && !isRemote(imgSrc)) {
    finalImg = copyLocalImage(imgSrc, path.dirname(file)) || '';
  }

  const price = parsePrice(html);
  const idBase = path.basename(file, path.extname(file)).toLowerCase();
  const id = idBase === 'index' ? 'home' : idBase;

  const location =
    ($('p:contains("Brasil"), p:contains("Argentina"), p:contains("Portugal"), p:contains("Espanha"), p:contains("França")')
      .first()
      .text() || '')
      .replace(/\s+/g, ' ')
      .trim();

  const nightsMatch = html.match(/(\d+)\s+noite[s]?/i);
  const nights = nightsMatch ? Number(nightsMatch[1]) : undefined;

  packages.push({
    id,
    title,
    location: location || undefined,
    nights: nights || undefined,
    price: price || 0,
    image: finalImg || (isRemote(imgSrc) ? imgSrc : ''),
  });
}

const unique = Object.values(packages.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}));
const fileContent = `export const packages = ${JSON.stringify(unique, null, 2)};\n`;
fs.writeFileSync(outData, fileContent, 'utf8');

console.log(`Extraídos ${unique.length} pacotes de ${files.length} HTML(s).`);
console.log(`Gerado: ${path.relative(appDir, outData)}`);
console.log(`Imagens locais copiadas para: ${path.relative(appDir, imagesDir)}`);