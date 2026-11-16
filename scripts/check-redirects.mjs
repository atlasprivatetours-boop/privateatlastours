// Checks every legacy URL against a running server (default http://localhost:3333).
// Each must answer 301 in ONE hop to a page that answers 200. Usage: node scripts/check-redirects.mjs [base]
import http from "node:http";
import fs from "node:fs";

const base = new URL(process.argv[2] || "http://localhost:3333");
const j = (f) => JSON.parse(fs.readFileSync(new URL(`../src/content/${f}.json`, import.meta.url), "utf8"));
const tours = j("tours"), posts = j("posts"), map = j("imagemap"), hidden = j("hidden-tours");
const live = (slug) => hidden[slug] ?? slug; // tours taken off the site redirect to their replacement

const get = (path, headers = {}) =>
  new Promise((resolve, reject) => {
    const req = http.request({ host: base.hostname, port: base.port, path, method: "GET", headers }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, location: res.headers.location });
    });
    req.on("error", reject);
    req.end();
  });

const cases = [];
for (const t of tours) cases.push([`/${t.slug}`, `/tours/${live(t.slug)}`], [`/${t.slug}/`, `/tours/${live(t.slug)}`]);
for (const p of posts) cases.push([`/${p.slug}`, `/blog/${p.slug}`], [`/${p.slug}/`, `/blog/${p.slug}`]);
cases.push(
  ["/5-days-desert-tour-from-marrakech-to-marrakech", "/tours/5-days-desert-tour-from-marrakech"],
  ["/7-days-casablanca-via-fez-to-marrakech", "/tours/7-day-tour-from-casablanca-to-marrakech"],
  ["/9-days-casablanca-rabat-fes-marrakech", "/tours/9-days-casablanca-rabat-fes-marrakech-desert"],
  ["/3-days-from-marrakesh-to-fes", "/tours/3-days-tour-from-marrakech-to-fes-via-sahara"],
  ["/4-days-marrakesh-to-fes", `/tours/${live("4-day-tour-from-marrakesh-to-fes")}`],
  ["/morocco-tours/", "/tours"], ["/about-us/", "/about"], ["/contact-us/", "/contact"], ["/home/", "/"],
  ["/category/fes-city/", "/blog"], ["/category/travel-guide", "/blog"], ["/tag/morocco/", "/blog"],
  ["/author/admin/", "/blog"], ["/blog/page/2/", "/blog"], ["/feed/", "/blog"], ["/comments/feed/", "/blog"],
);
for (const [from, to] of Object.entries(map)) {
  const p = decodeURI(new URL(from).pathname);
  if (p.startsWith("/wp-content/uploads/")) cases.push([encodeURI(p), to]);
}

const bad = [];
const landed = new Map();
for (const [from, to] of cases) {
  const r = await get(from);
  const loc = r.location ? new URL(r.location, base).pathname : null;
  if (r.status !== 301 || loc !== to) { bad.push(`${from} -> ${r.status} ${r.location} (expected 301 ${to})`); continue; }
  if (!landed.has(to)) landed.set(to, (await get(to)).status);
}
for (const [to, s] of landed) if (s !== 200) bad.push(`destination ${to} answered ${s}`);

// www host goes to the bare domain in one hop.
const w = await get("/tours", { host: "www.atlasprivatetours.com" });
if (w.status !== 301 || w.location !== "https://atlasprivatetours.com/tours") bad.push(`www host -> ${w.status} ${w.location}`);

console.log(`${cases.length + 1} redirects checked, ${landed.size} distinct destinations, ${bad.length} problems`);
bad.slice(0, 25).forEach((b) => console.log("  " + b));
process.exit(bad.length ? 1 : 0);
