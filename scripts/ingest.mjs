// One-off migration: reads the live WordPress site and writes structured JSON to src/content
import fs from 'fs';
const BASE='https://atlasprivatetours.com';
const UA={'user-agent':'Mozilla/5.0'};
const get=async u=>(await fetch(u,{headers:UA})).text();
const clean=s=>s.replace(/&#8217;|&#8216;/g,"'").replace(/&#8220;|&#8221;/g,'"').replace(/&#8211;|&#8212;/g,'–').replace(/&amp;/g,'&').replace(/&#x274c;/g,'').replace(/&nbsp;|\u200b/g,' ').replace(/&#\d+;/g,'').replace(/[ \t]+/g,' ').trim();
const toLines=h=>{
  h=h.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<(nav|footer|header)[\s\S]*?<\/\1>/g,'');
  return h.replace(/<\/(p|h[1-6]|li|div|section|span)>|<br\s*\/?>/g,'\n').replace(/<[^>]+>/g,' ').split('\n').map(clean).filter(Boolean);
};
const imgsOf=h=>[...new Set([...h.matchAll(/https:\/\/atlasprivatetours\.com\/wp-content\/uploads\/[^"'\s)]+\.(?:jpe?g|png|webp)/gi)].map(m=>m[0].replace(/-\d+x\d+(\.\w+)$/,'$1')))];
const meta=h=>({title:clean((h.match(/<title>([^<]*)/)||[])[1]||''),description:clean((h.match(/name="description" content="([^"]*)/)||[])[1]||'')});

const tourSlugs=`10-days-tours-from-marrakech-imperial-cities 4-days-from-fes-to-merzouga-desert 3-days-from-marrakech-to-desert-merzouga 3-days-from-fes-to-marrakech-desert-trip 9-days-casablanca-rabat-fes-marrakech-desert 7-day-tour-from-casablanca-to-marrakech 5-days-desert-trip-from-fes-to-experience 4-day-tour-from-marrakesh-to-fes 3-days-tour-from-marrakech-to-fes-via-sahara 10-day-tour-itinerary-from-casablanca 5-days-desert-tour-from-marrakech 4-days-tour-from-marrakech-to-merzouga 7-days-from-fes-imperial-cities-and-sahara 6-days-marrakech-merzouga-sahara-desert`.split(' ');

const tours=[];
for(const slug of tourSlugs){
  const h=await get(`${BASE}/${slug}/`); const L=toLines(h); const m=meta(h);
  const iFrom=L.findIndex(l=>/^Tours from /i.test(l));
  const origin=iFrom>=0?L[iFrom].replace(/^Tours from /i,''):'';
  const name=iFrom>=0?L[iFrom+1]:m.title;
  const STOP=/^(Book this tour|Tour Price|Name$|mail adres|Phone$|Message$|Submit$|Gallery|WhatsApp|Frequently|FAQ|Q$|N$|c$)/i;
  const HEAD=/^(?:Day\s*(\d+)(?:\s*[-–]\s*(\d+))?|(\d+)\s*Day)\s*[:\-–.]\s*(.*)$/i;
  const days=[];
  for(let i=0;i<L.length;i++){
    const d=L[i].match(HEAD); if(!d) continue;
    let title=(d[4]||'').replace(/[:.\s]+$/,''); const body=[]; let j=i+1;
    if(!title && L[j] && !HEAD.test(L[j])){title=L[j];j++;}
    for(;j<L.length;j++){ if(HEAD.test(L[j])||STOP.test(L[j])) break; body.push(L[j]); }
    if(body.length) days.push({day:+(d[1]||d[3]),dayEnd:d[2]?+d[2]:undefined,title,text:body.join('\n')});
  }
  const dedupDays=[...new Map(days.filter(d=>d.text.length>30).map(d=>[d.day,d])).values()];
  const faqIdx=L.findIndex(l=>/^(Frequently|FAQ)/i.test(l)); const faqs=[];
  if(faqIdx>=0){for(let i=faqIdx+1;i<L.length-1;i++){const q=L[i].match(/^\d+\.\s*(.+\?)$/); if(q){faqs.push({q:q[1],a:L[i+1]});i++;}}}
  const sect=(start,endRe)=>{const s=L.findIndex(l=>start.test(l)); if(s<0) return []; const out=[]; for(let i=s+1;i<L.length;i++){ if(endRe.test(L[i])) break; out.push(L[i]);} return out;};
  const overviewIdx=L.findIndex(l=>/^Tour Overview/i.test(l));
  const hiIdx=L.findIndex(l=>/Hilights|Highlights/i.test(l));
  const itinIdx=L.findIndex(l=>/Itinerary|^Tour Details/i.test(l) && !/^Day/.test(l));
  const overview=overviewIdx>=0?L.slice(overviewIdx+1,hiIdx>overviewIdx?hiIdx:itinIdx).filter(x=>x.length>40):[];
  const highlights=hiIdx>=0?L.slice(hiIdx+1,itinIdx>hiIdx?itinIdx:hiIdx+14):[];
  const includes=sect(/^Tour Price Includes/i,/^(Q|Tour Price Excludes)/i).filter(x=>x.length>3);
  const excludes=sect(/^Tour Price Excludes/i,/^(Gallery|WhatsApp)/i).filter(x=>x.length>3);
  const dur=slug.match(/^(\d+)-day/); const nights=dur?+dur[1]-1:null;
  tours.push({slug,name,origin,days:dur?+dur[1]:dedupDays.length,nights,seoTitle:m.title,seoDescription:m.description,overview,highlights,itinerary:dedupDays,includes,excludes,faqs,images:imgsOf(h).filter(u=>!/logo|favicon|div\.png/i.test(u))});
  console.log(slug,origin,'|',dedupDays.length,'days',highlights.length,'hl',includes.length,'inc',imgsOf(h).length,'img');
}
fs.writeFileSync('src/content/tours.raw.json',JSON.stringify(tours,null,1));

// Day trips
{const h=await get(`${BASE}/day-trips/`); const L=toLines(h); const trips=[]; const raw=h;
 for(let i=0;i<L.length;i++){ const t=L[i].match(/^(.+) Day trip$/i); if(t){ trips.push({name:t[1].trim(),text:L[i+1],place:L[i+2]}); } }
 fs.writeFileSync('src/content/daytrips.raw.json',JSON.stringify({trips,images:imgsOf(h)},null,1)); console.log('daytrips',trips.map(t=>t.name).join(', '));}

// Testimonials
{const h=await get(`${BASE}/testimonials/`); const L=toLines(h); const out=[]; 
 for(let i=0;i<L.length;i++){ if(/^Posted on Tripadvisor/i.test(L[i])){ out.push({author:L[i+1],title:(L[i+2]||'').replace(/^Verified\s*/,''),text:L[i+3]}); } }
 fs.writeFileSync('src/content/testimonials.raw.json',JSON.stringify(out,null,1)); console.log('testimonials',out.length);}

// Blog
{const sm=await get(`${BASE}/post-sitemap.xml`); const urls=[...sm.matchAll(/<loc>(https:\/\/atlasprivatetours\.com\/[^<]+\/)<\/loc>/g)].map(m=>m[1]); const posts=[];
 for(const u of urls){ const h=await get(u); const m=meta(h);
  const date=(h.match(/article:published_time" content="([^"]+)/)||[])[1]; const mod=(h.match(/article:modified_time" content="([^"]+)/)||[])[1];
  const ogimg=(h.match(/og:image" content="([^"]+)/)||[])[1];
  const body=(h.match(/<h1[\s\S]*?<\/article>|<h1[\s\S]*?(?=<footer)/)||[h])[0];
  const L=toLines(body);
  posts.push({slug:u.replace(BASE,'').replace(/\//g,''),seoTitle:m.title,description:m.description,date,modified:mod,image:ogimg,lines:L,images:imgsOf(body)});
  console.log('post',posts.at(-1).slug,L.length);}
 fs.writeFileSync('src/content/posts.raw.json',JSON.stringify(posts,null,1));}
