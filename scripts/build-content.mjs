import fs from 'fs';
const R=f=>JSON.parse(fs.readFileSync('src/content/'+f));
const map=R('imagemap.json'); const img=u=>map[u]||null;
const fix=s=>s.replace(/(^|\s)44\s+(transfer|transport|vehicle)/gi,"$1"+"4x4 $2").replace(/\s+([,.;:])/g,'$1').replace(/\bimperial\b/g,'Imperial').replace(/\bFez\b/g,'Fes').replace(/Marrakesh/g,'Marrakech');
const HERO={ // curated from available originals (best resolution)
 'merzouga':'/images/2017-12-atlas-private-tours-13.jpeg','sunrise':'/images/2017-12-atlas-private-tours-11.jpeg',
 'benhaddou':'/images/2017-12-atlas-private-tours-79.jpg','fes':'/images/2017-12-atlas-private-tours-44.jpg','casablanca':'/images/2017-12-atlas-private-tours-18.jpeg'};
const HERO_BY_SLUG={"10-days-tours-from-marrakech-imperial-cities":"44.jpg","4-days-from-fes-to-merzouga-desert":"13.jpeg","3-days-from-marrakech-to-desert-merzouga":"11.jpeg","3-days-from-fes-to-marrakech-desert-trip":"56.jpg","9-days-casablanca-rabat-fes-marrakech-desert":"82.jpg","7-day-tour-from-casablanca-to-marrakech":"66.jpg","5-days-desert-trip-from-fes-to-experience":"52.jpg","4-day-tour-from-marrakesh-to-fes":"79.jpg","3-days-tour-from-marrakech-to-fes-via-sahara":"60.jpg","10-day-tour-itinerary-from-casablanca":"18.jpeg","5-days-desert-tour-from-marrakech":"41.jpg","4-days-tour-from-marrakech-to-merzouga":"50.jpg","7-days-from-fes-imperial-cities-and-sahara":"46.jpg","6-days-marrakech-merzouga-sahara-desert":"62.jpg"};
const heroFor=t=>"/images/2017-12-atlas-private-tours-"+(HERO_BY_SLUG[t.slug]||"79.jpg");
const tours=R('tours.raw.json').map(t=>{
  const imgs=[...new Set(t.images.map(img).filter(Boolean))].filter(u=>!/chatgpt-image|logo/i.test(u)); // drop the old site logo graphic
  return {slug:t.slug,name:fix(t.name),origin:t.origin,days:t.days,nights:t.nights,
    seoTitle:fix(t.seoTitle).replace(/ - Atlas Private Tours$/,''),seoDescription:/local Moroccan travel Agency/.test(t.seoDescription)?'':t.seoDescription,
    overview:t.overview,highlights:t.highlights.slice(0,(i=>i<0?undefined:i)(t.highlights.findIndex(h=>/^(Details of|Day *[0-9]|\(Approx)/i.test(h)))).filter(h=>h.length<230&&!/^[0-9]+ *Day/i.test(h)&&!/details$/i.test(h)).slice(0,16),itinerary:t.itinerary.map(d=>({...d,title:fix(d.title),text:fix(d.text)})),
    includes:t.includes,excludes:t.excludes,faqs:(t.faqs||[]).map(f=>({q:fix(f.q),a:fix(f.a)})),hero:heroFor(t),images:imgs};});
const trips=R('daytrips.raw.json').trips.map(d=>({slug:d.name.toLowerCase().replace(/[^a-z]+/g,'-').replace(/-$/,''),name:d.name,text:d.text,route:d.place}));
// The source site repeats the Merzouga desert text under "Atlas Mountains". This is the real High Atlas trip, taken from the site’s homepage teaser.
const atlas=trips.find(t=>t.slug==="atlas-mountains");if(atlas)atlas.text="A full day in the High Atlas, setting out from Marrakech at 9am. You travel into the mountains through Asni and the Berber villages of the foothills, past steep hillsides and mountain views, and stop at a Berber home for a glass of mint tea.";
const heading=l=>l.length<90&&!/[.!?,]$/.test(l)&&l.split(' ').length<=14;
const posts=R('posts.raw.json').map(p=>{
  const L=p.lines; const title=L[0]; const cut=L.findIndex(l=>/^(Submit a Comment|Leave a (Reply|Comment))/i.test(l)); const blocks=L.slice(1,cut>0?cut:undefined).filter(l=>l.length>2&&!/^(Share|Related|Leave a|Comments|Posted|Tags|Categories|Previous|Next)/i.test(l)).map(l=>heading(l)?{t:'h',x:l.replace(/:$/,'')}:{t:'p',x:l});
  const first=blocks.find(b=>b.t==='p');
  return {slug:p.slug,title,seoTitle:p.seoTitle.replace(/ - Atlas Private Tours$/,''),description:p.description||(first?first.x.slice(0,155):''),date:p.date,modified:p.modified,image:img(p.image)||null,blocks};});
fs.writeFileSync('src/content/tours.json',JSON.stringify(tours,null,1));
fs.writeFileSync('src/content/daytrips.json',JSON.stringify(trips,null,1));
fs.writeFileSync('src/content/posts.json',JSON.stringify(posts));
fs.writeFileSync('src/content/testimonials.json',JSON.stringify(R('testimonials.raw.json')));
fs.writeFileSync('src/content/gallery.json',JSON.stringify(R('gallery.raw.json').map(img).filter(Boolean)));
console.log(tours.length,trips.length,posts.length,posts.filter(p=>p.image).length,'with image');
