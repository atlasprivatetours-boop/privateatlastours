// Crawls every URL in the sitemap on a running server (default http://localhost:3333) and checks the basics of on-page SEO:
// one <title> and one <h1>, a meta description of sensible length, a canonical link, valid JSON-LD with the expected types,
// absolute URLs inside the JSON-LD, unique titles and descriptions. Usage: node scripts/check-seo.mjs [base]
const base = process.argv[2] || "http://localhost:3333";
const get = async (p) => (await fetch(base + p, { redirect: "manual" }));
const sm = await (await get("/sitemap.xml")).text();
const paths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const bad = [];
const titles = new Map(), descs = new Map();
const typeCount = new Map();
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

for (const p of paths) {
  const r = await get(p);
  if (r.status !== 200) { bad.push(`${p}: HTTP ${r.status}`); continue; }
  const h = await r.text();
  const title = decode((h.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const desc = decode((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!title) bad.push(`${p}: no title`);
  else if (title.length > 75) bad.push(`${p}: title ${title.length} chars: ${title}`);
  if (!desc) bad.push(`${p}: no meta description`);
  else if (desc.length < 70 || desc.length > 165) bad.push(`${p}: description ${desc.length} chars`);
  if (h1 !== 1) bad.push(`${p}: ${h1} <h1> elements`);
  if (!canon) bad.push(`${p}: no canonical`);
  else if (new URL(canon).pathname.replace(/\/$/, "") !== p.replace(/\/$/, "")) bad.push(`${p}: canonical points to ${canon}`);
  if (titles.has(title)) bad.push(`${p}: same title as ${titles.get(title)}`); else titles.set(title, p);
  if (descs.has(desc)) bad.push(`${p}: same description as ${descs.get(desc)}`); else descs.set(desc, p);

  const blocks = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) bad.push(`${p}: no JSON-LD`);
  for (const b of blocks) {
    let j;
    try { j = JSON.parse(b); } catch { bad.push(`${p}: JSON-LD does not parse`); continue; }
    for (const node of Array.isArray(j) ? j : [j]) {
      const t = [].concat(node["@type"] || []).join("/");
      typeCount.set(t, (typeCount.get(t) || 0) + 1);
      if (!node["@context"] && !node["@id"]) bad.push(`${p}: ${t} has no @context`);
      const s = JSON.stringify(node);
      if (/"undefined"|NaN|null/.test(s.replace(/"[^"]*":null/g, "")) ) bad.push(`${p}: ${t} contains undefined, NaN or null`);
      for (const m of s.matchAll(/"(?:url|item|image|logo|mainEntityOfPage|@id)":"([^"#]*)/g)) if (m[1] && !/^https?:\/\//.test(m[1])) bad.push(`${p}: ${t} has a relative URL ${m[1]}`);
    }
  }
}

console.log(`${paths.length} pages checked, ${bad.length} problems`);
console.log("JSON-LD types:", [...typeCount].sort().map(([k, v]) => `${k} x${v}`).join(", "));
bad.slice(0, 40).forEach((b) => console.log("  " + b));
process.exit(bad.length ? 1 : 0);
