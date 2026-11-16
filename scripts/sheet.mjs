import sharp from 'sharp'; import fs from 'fs';
const files=fs.readdirSync('public/images').filter(f=>/atlas-private-tours-\d+\.jpe?g$/.test(f)||/^2017-12-(?!atlas)/.test(f)&&false).sort((a,b)=>parseInt(a.match(/-(\d+)\.jp/)[1])-parseInt(b.match(/-(\d+)\.jp/)[1]));
const info=[];const W=200,H=150,C=8;
const tiles=[];
for(const f of files){const m=await sharp('public/images/'+f).metadata(); info.push(f+' '+m.width+'x'+m.height);
 tiles.push({input:await sharp('public/images/'+f).resize(W,H,{fit:'cover'}).composite([{input:Buffer.from(`<svg width="${W}" height="24"><rect width="${W}" height="24" fill="black" opacity=".7"/><text x="6" y="17" font-size="15" fill="white">${f.match(/-(\d+)\.jp/)[1]}</text></svg>`),gravity:'northwest'}]).toBuffer()});}
const rows=Math.ceil(tiles.length/C);
await sharp({create:{width:W*C,height:H*rows,channels:3,background:'#222'}}).composite(tiles.map((t,i)=>({...t,left:(i%C)*W,top:Math.floor(i/C)*H}))).jpeg({quality:70}).toFile('sheet.jpg');
fs.writeFileSync('sheet.txt',info.join('\n')); console.log(files.length);
