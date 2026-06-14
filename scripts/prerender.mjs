import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const serverEntry = resolve("dist-ssr/entry-server.js");
const indexPath = resolve("dist/index.html");

if (!existsSync(serverEntry)) {
  console.error(`[prerender] SSR bundle not found at ${serverEntry}`);
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

let html = readFileSync(indexPath, "utf-8");

if (!html.includes('<div id="root"></div>')) {
  console.warn('[prerender] could not find empty <div id="root"></div> in dist/index.html — skipping injection');
  process.exit(0);
}

html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, html);

console.log(`[prerender] injected ${appHtml.length.toLocaleString()} chars of rendered HTML into dist/index.html`);
