// Builds public/ from the notes in content/: one page per note and an index. Run with `node build.mjs`.
import {mkdir, readdir, readFile, rm, writeFile} from "node:fs/promises";

const escape = (text) => text.replace(/[&<>"]/g, (character) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"})[character]);
const page = (title, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${escape(title)} · Field log</title>
<style>:root { color-scheme: dark; font-family: system-ui, sans-serif; background: #0b1220; color: #e6edf6; } main { max-width: 680px; margin: 0 auto; padding: 48px 20px; } a { color: #8f7cf0; }</style></head>
<body><main>${body}</main></body></html>
`;

await rm("public", {recursive: true, force: true});
await mkdir("public", {recursive: true});
const notes = (await readdir("content")).filter((name) => name.endsWith(".txt")).sort();
const links = [];
for (const name of notes) {
  const [title, ...lines] = (await readFile(`content/${name}`, "utf8")).trim().split("\n");
  const slug = name.replace(/\.txt$/, "");
  await writeFile(`public/${slug}.html`, page(title, `<p><a href="index.html">All notes</a></p><h1>${escape(title)}</h1>${lines.filter(Boolean).map((line) => `<p>${escape(line)}</p>`).join("")}`));
  links.push(`<li><a href="${slug}.html">${escape(title)}</a></li>`);
}
await writeFile("public/index.html", page("All notes", `<h1>Field log</h1><ul>${links.join("")}</ul><p>Built by build.mjs from strux.json.</p>`));
console.log(`Built ${notes.length} notes into public/`);
