#!/usr/bin/env node
/**
 * Checks that every package in artifacts/artmap-college/package.json
 * is also present in artifacts/artmap-college/package.vercel.json.
 *
 * Run: node .github/scripts/check-vercel-packages.js
 */
const path = require('path');
const fs   = require('fs');

const root       = path.resolve(__dirname, '../..');
const pkgPath    = path.join(root, 'artifacts/artmap-college/package.json');
const vercelPath = path.join(root, 'artifacts/artmap-college/package.vercel.json');

if (!fs.existsSync(pkgPath)) {
  console.error('❌  package.json not found:', pkgPath);
  process.exit(1);
}
if (!fs.existsSync(vercelPath)) {
  console.error('❌  package.vercel.json not found:', vercelPath);
  process.exit(1);
}

const pkg       = JSON.parse(fs.readFileSync(pkgPath,    'utf8'));
const vercelPkg = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

const allSrc = {
  ...(pkg.dependencies    || {}),
  ...(pkg.devDependencies || {}),
};
const allDst = {
  ...(vercelPkg.dependencies    || {}),
  ...(vercelPkg.devDependencies || {}),
};

// Packages we intentionally skip in package.vercel.json
const SKIP_PREFIXES = ['@replit/', '@workspace/'];
const SKIP_EXACT    = ['vite'];   // listed under buildCommand anyway

const missing  = [];
const mismatch = [];

for (const [name, version] of Object.entries(allSrc)) {
  const ver = String(version);

  // Skip workspace-local and replit-internal packages
  if (SKIP_PREFIXES.some(p => name.startsWith(p))) continue;
  if (SKIP_EXACT.includes(name)) continue;

  if (!(name in allDst)) {
    missing.push(
      ver.startsWith('catalog:')
        ? `  ${name}  (catalog: — needs explicit semver in package.vercel.json)`
        : `  ${name}@${ver}`
    );
  }
}

let exitCode = 0;

if (missing.length > 0) {
  console.error('\n❌  Packages missing from package.vercel.json:\n');
  missing.forEach(m => console.error(m));
  console.error('\n👉  Add them to artifacts/artmap-college/package.vercel.json with explicit semver versions.');
  exitCode = 1;
}

if (exitCode === 0) {
  console.log('\n✅  package.json and package.vercel.json are in sync — Vercel builds will work.\n');
}

process.exit(exitCode);