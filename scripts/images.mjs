import fs from 'fs'; import path from 'path';
const t=JSON.parse(fs.readFileSync('src/content/tours.raw.json'));
const d=JSON.parse(fs.readFileSync('src/content/daytrips.raw.json'));
const p=JSON.parse(fs.readFileSync('src/content/posts.raw.json'));
const g=(await (await fetch('https://atlasprivatetours.com/gallery/',{headers:{'user-agent':'Mozilla/5.0'}})).text());
const gal=[...new Set([...g.matchAll(/https:\/\/atlasprivatetours\.com\/wp-content\/uploads\/[^"'\s)]+\.(?:jpe?g|png|webp)/gi)].map(m=>m[0].replace(/-\d+x\d+(\.\w+)$/,'$1')))];
fs.writeFileSync('src/content/gallery.raw.json',JSON.stringify(gal,null,1));
const all=new Set([...t.flatMap(x=>x.images),...d.images,...gal,...p.flatMap(x=>[x.image,...x.images]).filter(Boolean)]);
const urls=[...all].filter(u=>u.includes('/wp-content/uploads/'));
fs.mkdirSync('public/images',{recursive:true});
const map={}; let ok=0,fail=0;
const name=u=>u.split('/wp-content/uploads/')[1].replace(/\//g,'-').toLowerCase();
const q=[...urls]; 
await Promise.all(Array.from({length:10},async()=>{while(q.length){const u=q.shift();const f='public/images/'+name(u);map[u]='/images/'+name(u);
 if(fs.existsSync(f)){ok++;continue;}
 try{const r=await fetch(u,{headers:{'user-agent':'Mozilla/5.0'}}); if(!r.ok) throw 0; fs.writeFileSync(f,Buffer.from(await r.arrayBuffer())); ok++;}catch{fail++;delete map[u];}}}));
fs.writeFileSync('src/content/imagemap.json',JSON.stringify(map,null,1));
console.log({total:urls.length,ok,fail});
