import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = resolve(process.cwd());
const OUT = resolve(ROOT, 'dist');

console.log('--- 1. Generating HTML & XML Files ---');
execSync('node scripts/generate.mjs', { stdio: 'inherit', cwd: ROOT });

console.log('\n--- 2. Staging Output to dist/ ---');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const PUBLISH_DIRS = ['assets', 'css', 'js', 'hi', 'kn', 'ta', 'te', 'mr', 'bn', 'gu'];
const PUBLISH_FILES = [
  'index.html',
  'pricing.html',
  'book.html',
  'franchise.html',
  'about.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'cancellation-refund.html',
  'delivery-policy.html',
  '404.html',
  'bangalore.html',
  'mumbai.html',
  'delhi-ncr.html',
  'hyderabad.html',
  'pune.html',
  'chennai.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'ontology.json',
  '_headers',
  '_redirects'
];

for (const dir of PUBLISH_DIRS) {
  const from = join(ROOT, dir);
  if (existsSync(from)) {
    cpSync(from, join(OUT, dir), { recursive: true });
    console.log(`  ✓ staged dir: ${dir}/`);
  }
}

for (const file of PUBLISH_FILES) {
  const from = join(ROOT, file);
  if (existsSync(from)) {
    cpSync(from, join(OUT, file));
    console.log(`  ✓ staged file: ${file}`);
  }
}

// Safety Verification
const strays = [];
(function scan(dir, prefix = '') {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = prefix ? `${prefix}/${entry}` : entry;
    if (statSync(abs).isDirectory()) scan(abs, rel);
    else if (entry.startsWith('.') || entry.endsWith('.env') || entry.endsWith('.pem')) {
      strays.push(rel);
    }
  }
})(OUT);

if (strays.length > 0) {
  console.error('REFUSING DEPLOY: Sensitive files detected in dist:', strays);
  process.exit(1);
}

console.log('\n✨ Build complete & verified! Output ready in dist/');
