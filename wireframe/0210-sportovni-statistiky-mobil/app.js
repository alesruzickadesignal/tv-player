/* Sportovní statistiky — mobil (IPTV-6465). Interaktivní koncept v kódu; data jsou vymyšlená. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- ikony (styl Lucide, 24×24) ---------- */
const PATH={
chevDown:'<path d="m6 9 6 6 6-6"/>',chevL:'<path d="m15 18-6-6 6-6"/>',chevR:'<path d="m9 18 6-6-6-6"/>',
x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',back:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
gear:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
cast:'<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12a9 9 0 0 1 8 8"/><path d="M2 16a5 5 0 0 1 4 4"/><path d="M2 20h.01"/>',
play:'<path d="M6 3 20 12 6 21Z"/>',pause:'<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
ccw:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',cw:'<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
full:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
mini:'<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>',
vol:'<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.8"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
eyeOff:'<path d="M10.7 5.1a10.7 10.7 0 0 1 11.2 6.5 1 1 0 0 1 0 .7 10.7 10.7 0 0 1-1.4 2.5"/><path d="M14.1 14.2a3 3 0 0 1-4.2-4.2"/><path d="M17.5 17.5a10.8 10.8 0 0 1-15.4-5.2 1 1 0 0 1 0-.7 10.8 10.8 0 0 1 4.4-5.1"/><path d="m2 2 20 20"/>',
eye:'<path d="M2.1 12.3a1 1 0 0 1 0-.7 10.8 10.8 0 0 1 19.8 0 1 1 0 0 1 0 .7 10.8 10.8 0 0 1-19.8 0"/><circle cx="12" cy="12" r="3"/>',
bell:'<path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M3.3 15.3A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C19.4 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.4 6-2.7 7.3"/>',
bellOff:'<path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M17 17H4a1 1 0 0 1-.7-1.7C4.6 14 6 12.5 6 8a6 6 0 0 1 .3-1.7"/><path d="m2 2 20 20"/><path d="M8.7 3A6 6 0 0 1 18 8c0 2.7.8 4.7 1.7 6"/>',
chList:'<path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/><path d="m16 12 5 3-5 3v-6Z"/>',
plist:'<path d="M3 6h18"/><path d="M3 12h12"/><path d="M3 18h18"/>',
chart:'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
timer:'<path d="M10 2h4"/><path d="m12 14 3-3"/><circle cx="12" cy="14" r="8"/>',
swap:'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
rec:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
gauge:'<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
subs:'<rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
tv:'<rect width="20" height="15" x="2" y="7" rx="2"/><path d="m17 2-5 5-5-5"/>',
vod:'<rect width="18" height="14" x="3" y="5" rx="2"/><path d="m10 9 5 3-5 3z"/>',
heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
cal:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
check:'<path d="M20 6 9 17l-5-5"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
ball:'<circle cx="12" cy="12" r="10"/><path d="m12 7.2-4.1 3 1.6 4.8h5l1.6-4.8z"/><path d="M12 2v5.2M7.9 10.2 2.6 8.4M9.5 15l-3.3 4.4M14.5 15l3.3 4.4M16.1 10.2l5.3-1.8"/>'
};
const ic=(n,s=24)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PATH[n]}</svg>`;

const ri=(n,s=24)=>{const i=RI[n];if(!i)return PATH[n]?ic(n,s):'';const m=Math.max(i.w,i.h);return`<svg class="ic" width="${(s*i.w/m).toFixed(2)}" height="${(s*i.h/m).toFixed(2)}" viewBox="${i.vb}" fill="none">${i.in}</svg>`};
const bi=(n,s=24)=>RI[n]?ri(n,s):ic(n,s);

/* ---------- data zápasu ---------- */
const DEV={ios:{w:402,h:874,r:56},and:{w:390,h:844,r:34}};
const DEVT={ios:{w:820,h:1180,r:24},and:{w:800,h:1280,r:22}};// tablety: iPad Air 11" (pt), Android tablet třídy medium/expanded (dp)
const dev=()=>(S.form==='tab'?DEVT:DEV)[S.platform];
const M={league:'Fortuna liga',kick:'18:00',channel:'Prima Sport',
 t:[{name:'Slavia',full:'Slavia Praha',code:'SLA'},{name:'Plzeň',full:'Viktoria Plzeň',code:'PLZ'}],
 ev:[
  {min:12,type:'yellow',team:1,p:'M. Kovář'},
  {min:19,type:'goal',team:0,p:'L. Provod',a:'J. Kuchta',score:[1,0]},
  {min:33,type:'goal',team:1,p:'J. Novák',a:'M. Kovář',score:[1,1]},
  {min:45,type:'phase',title:'Poločas',sub:'Stav 1 : 1',score:[1,1]},
  {min:52,type:'sub',team:0,pin:'V. Chorý',pout:'J. Kuchta'},
  {min:59,type:'goal',team:0,p:'L. Provod',a:'T. Holeš',score:[2,1]},
  {min:63,type:'yellow',team:0,p:'T. Holeš'},
  {min:71,type:'sub',team:1,pin:'D. Pokorný',pout:'P. Svoboda'},
  {min:76,type:'var',team:1,title:'VAR · Přezkoumání',sub:'Penalta pro Plzeň zrušena'},
  {min:81,type:'yellow',team:1,p:'J. Sýkora'},
  {min:90,type:'phase',title:'Konec zápasu',sub:'Stav 2 : 1',score:[2,1],end:true}
 ]};
const FIN=[['Držení míče','poss',54,46,'%'],['Střely na bránu','son',6,3],['Střely mimo','soff',5,7],['Rohové kopy','cor',5,2],['Fauly','fou',8,12],
 ['Zblokované střely','sblk',3,4],['Střely celkem','stot'],['Ofsajdy','off',2,1],['Přihrávky','pas',412,351],['Zákroky','sav',2,4],['Žluté karty','yc'],['Červené karty','rc',0,0]];
const LU=[
 [{n:1,nm:'M. Dvořák',pos:'Brankář',age:31,c:'Česko',x:.07,y:.5,z:2,gk:1},{n:2,nm:'O. Černý',pos:'Obránce',age:25,c:'Česko',x:.22,y:.15,z:4},{n:31,nm:'T. Holeš',pos:'Obránce',age:28,c:'Česko',x:.22,y:.38,z:4},{n:4,nm:'S. Marek',pos:'Obránce',age:24,c:'Slovensko',x:.22,y:.62,z:3},{n:5,nm:'L. Veselý',pos:'Obránce',age:29,c:'Česko',x:.22,y:.85,z:5},
  {n:6,nm:'J. Král',pos:'Záložník',age:27,c:'Česko',x:.42,y:.33,z:3},{n:8,nm:'P. Horák',pos:'Záložník',age:26,c:'Česko',x:.42,y:.67,z:2},{n:7,nm:'L. Provod',pos:'Záložník',age:29,c:'Česko',x:.62,y:.18,z:1},{n:10,nm:'J. Kuchta',pos:'Záložník',age:28,c:'Česko',x:.62,y:.5,z:1,out:52,cap:1},{n:11,nm:'A. Němec',pos:'Záložník',age:23,c:'Česko',x:.62,y:.82,z:2},{n:9,nm:'K. Pokorný',pos:'Útočník',age:30,c:'Česko',x:.82,y:.5,z:1}],
 [{n:1,nm:'R. Holub',pos:'Brankář',age:33,c:'Česko',x:.07,y:.5,z:4,gk:1},{n:2,nm:'F. Kratochvíl',pos:'Obránce',age:26,c:'Česko',x:.22,y:.15,z:3},{n:3,nm:'M. Beneš',pos:'Obránce',age:30,c:'Česko',x:.22,y:.38,z:5},{n:4,nm:'J. Sýkora',pos:'Obránce',age:25,c:'Česko',x:.22,y:.62,z:4},{n:5,nm:'P. Vlček',pos:'Obránce',age:27,c:'Slovensko',x:.22,y:.85,z:3},
  {n:6,nm:'A. Doležal',pos:'Záložník',age:24,c:'Česko',x:.45,y:.25,z:2},{n:8,nm:'M. Kovář',pos:'Záložník',age:29,c:'Česko',x:.45,y:.5,z:3,cap:1},{n:10,nm:'P. Svoboda',pos:'Záložník',age:22,c:'Česko',x:.45,y:.75,z:2,out:71},{n:7,nm:'L. Sýkora',pos:'Útočník',age:26,c:'Česko',x:.75,y:.2,z:1},{n:11,nm:'V. Beneš',pos:'Útočník',age:25,c:'Česko',x:.75,y:.8,z:1},{n:9,nm:'J. Novák',pos:'Útočník',age:28,c:'Česko',x:.82,y:.5,z:1,out:48}]];
const FORM=['4-2-3-1','4-3-3'];
const LC={'NOVA SPORT 1':'#e8590c','NOVA SPORT 2':'#e8590c','ARENA SPORT 1':'#d71920','ČT SPORT':'#00924a','PRIMA SPORT':'#c8102e','NOVA':'#0b3f8f'};
const CH=[
 {n:1,name:'Prima Sport',logo:'prima_sport',now:'Fotbal: Slavia – Plzeň',time:'18:00 – 20:00',p:.74,match:'main'},
 {n:2,name:'ČT1',logo:'ct1',now:'Události',time:'19:00 – 19:45',p:.1},
 {n:3,name:'Nova',logo:'nova',now:'Televizní noviny',time:'19:30 – 20:20',p:0},
 {n:4,name:'Prima COOL',logo:'primacool',now:'Simpsonovi',time:'18:25 – 18:50',p:.82},
 {n:5,name:'Prima MAX',logo:'prima_max',now:'Rychle a zběsile 7',time:'17:40 – 20:15',p:.46},
 {n:6,name:'Nova Cinema',logo:'novacinema',now:'Počátek',time:'17:15 – 19:50',p:.58}];
const PROG=[{t:'16:00',n:'Studio Fotbal',d:'Záznam · 120 min'},{t:'18:00',n:'Fotbal: Slavia – Plzeň',d:'Live · 120 min',cur:1,match:1},{t:'20:00',n:'Fotbalový večer',d:'Magazín · 60 min'},{t:'21:00',n:'Hokej: Sparta – Kometa',d:'Záznam · 150 min'},{t:'23:30',n:'Sportovní zprávy',d:'Zprávy · 30 min'}];

/* ---------- stav ---------- */
const S={platform:'ios',form:'phone',orient:'portrait',scene:'player',tab:2,sub:0,team:0,minute:67,live:67,settings:{ext:true,hide:false,mute:false},revealed:false,
 sheet:null,sheetFrom:null,controls:true,toast:null,newEv:false,dimOn:true,idle:false,notes:true,sim:false,panel:null,lpTab:1,playing:true,prevTab:0,catDay:0,dTab:0};
const DEF=JSON.parse(JSON.stringify(S));
const hideNow=()=>S.settings.hide&&!S.revealed;
const atLive=()=>S.minute>=S.live-.05;
const fin=()=>S.live>=90;
const scoreAt=m=>{let s=[0,0];M.ev.forEach(e=>{if(e.type==='goal'&&e.min<=m)s=e.score});return s};
const phaseTxt=m=>m<0?'Před zápasem':m<45?'1. poločas':m<46?'Poločas':m<90?'2. poločas':'Konec zápasu';
function status(){const m=S.minute,mm=Math.min(Math.floor(m),90);
 if(m<0)return{t:'PŘED ZÁPASEM',live:false,pre:true,sub:`${M.league} · výkop ${M.kick}`};
 const sub=`${M.league} · ${phaseTxt(m)}`;
 if(m>=90&&fin())return{t:'UKONČENO',live:false,end:true,sub};
 if(atLive()&&!fin())return{t:`ŽIVĚ · ${mm}'`,live:true,sub};
 return{t:fin()?`ZÁZNAM · ${mm}'`:`${mm}'`,live:false,behind:!fin(),sub}}// pozadu za živým: jen minuta, kterou divák vidí; cestu na živé ukáže odkaz pod ní
const mmss=m=>{const t=Math.round(clamp(m,0,90)*60);return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};
function statsAt(m){const f=clamp(m,0,90)/90,c={};
 FIN.forEach(r=>{const[,k,h,a]=r;if(k==='poss'){const hh=m<=0?50:Math.round(50+(h-50)*f);c[k]=[hh,100-hh]}else if(k==='stot'||k==='yc'){}else c[k]=[Math.round(h*f),Math.round(a*f)]});
 c.stot=[c.son[0]+c.soff[0]+c.sblk[0],c.son[1]+c.soff[1]+c.sblk[1]];
 c.yc=[0,0];M.ev.forEach(e=>{if(e.type==='yellow'&&e.min<=m)c.yc[e.team]++});
 return FIN.map(r=>[r[0],c[r[1]][0],c[r[1]][1],r[4]||''])}

/* ---------- drobné komponenty ---------- */
const KIT={SLA:{c:'#d71920',t:'#fff',gk:'#f5c518'},PLZ:{c:'#1f4fa3',t:'#fff',gk:'#12b76a'}};
function star(cx,cy,R,r){let d='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r:R;d+=(k?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1)}return d+'Z'}
function crest(code,s=36){let g;const IMGC={SLA:'sp-slavia',PLZ:'sp-plzen'};if(IMGC[code])return`<span class="crest im" style="--s:${s}px"><img src="../../img/${IMGC[code]}.png" alt="${code}"></span>`;
 if(code==='SLA')g=`<circle cx="20" cy="20" r="18.5" fill="#fff" stroke="#d71920" stroke-width="3"/><path d="${star(20,21,10.5,4.4)}" fill="#d71920"/>`;
 else if(code==='PLZ')g=`<rect width="40" height="40" fill="#fff"/><rect x="4" width="6.4" height="40" fill="#d5001c"/><rect x="16.8" width="6.4" height="40" fill="#d5001c"/><rect x="29.6" width="6.4" height="40" fill="#d5001c"/><rect x="10.4" width="6.4" height="40" fill="#0b3f8f"/><rect x="23.2" width="6.4" height="40" fill="#0b3f8f"/><circle cx="20" cy="20" r="18.5" fill="none" stroke="#fff" stroke-width="2"/>`;
 else g=`<path transform="translate(-0.9 -0.4) scale(.66)" d="M32 12.36s3.13.63 9.91 2.38c6.41 1.65 8.66 2.31 8.66 2.31s.33 6.61-2.58 18.57C45.65 45.27 36.9 50.62 32 53.64c-4.89-3.03-13.64-8.37-15.99-18.02-2.91-11.96-2.58-18.57-2.58-18.57s2.25-.66 8.66-2.31C28.88 12.99 32 12.36 32 12.36z" fill="rgba(255,255,255,.55)"/>`;// placeholder = štít (jako Figma sport/team-crest)
 return`<span class="crest" style="--s:${s}px"><svg viewBox="0 0 40 40" width="${s}" height="${s}">${g}</svg></span>`}
function avatar(p,t){const k=KIT[M.t[t].code];// jako TV (Avatar): fotka na světlém podkladu; bez fotky placeholder se siluetou
 return`<span class="av ${t===0?'ph2':'phx'}${t===1?' away':''}"><b>${p.n}</b></span>`}
function evIcon(e){const t=e.type;let i='';
 if(t==='goal'||t==='sub')return`<img class="evimg" src="img/sp-${t}.svg" width="32" height="32" alt="">`;
 else if(t==='yellow')i='<i class="card" style="background:var(--warn)"></i>';else if(t==='red')i='<i class="card" style="background:var(--error)"></i>';
 else if(t==='var')i='<span class="var">VAR</span>';else i=ic('timer',18);
 return`<span class="evi">${i}</span>`}
function statusBar(){const sig='<svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
 const wifi='<svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M1 4.2a10 10 0 0 1 14 0"/><path d="M3.6 7a6.3 6.3 0 0 1 8.8 0"/><circle cx="8" cy="10" r="1.1" fill="#fff" stroke="none"/></svg>';
 const bat='<svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke="#fff" opacity=".5"/><rect x="2" y="2" width="19" height="8" rx="2" fill="#fff"/><path d="M24 4v4" stroke="#fff" opacity=".5" stroke-linecap="round"/></svg>';
 return S.platform==='ios'?`<div class="sb"><span>9:41</span><div class="sbi">${sig}${wifi}${bat}</div></div>${S.form==='tab'?'':'<div class="island"></div>'}`
  :`<div class="sb"><span>18:32</span><div class="sbi">${wifi}${sig}${bat}</div></div><div class="cam"></div>`}
const bottomSys=()=>S.platform==='ios'?'<div class="home"></div>':'<div class="anav"><i></i><i></i><i></i></div>';
const toggle=on=>`<span class="tg ${on?'on':''}"><i></i></span>`;

/* ---------- panel „Zápas“ ---------- */

function evRow(e,first){const hid=hideNow()&&e.type==='goal';let title,sub='';
 switch(e.type){case'goal':title=hid?'Gól · skryto':`Gól · ${e.p}`;sub=hid?'Zobrazí se na vyžádání':(e.a?`Asistence: ${e.a}`:'');break;
  case'yellow':title=`Žlutá karta · ${e.p}`;break;case'red':title=`Červená karta · ${e.p}`;break;
  case'sub':title=`Střídání · ${e.pin}`;sub=`Za: ${e.pout}`;break;case'var':title=e.title;sub=e.sub;break;
  default:title=e.title;sub=hideNow()?'':(e.sub||'')}
 const tag=(e.team!==undefined&&!hid)?`<span class="tag">${M.t[e.team].code}</span>`:'';
 const sc=(e.type==='goal'&&!hid)?`<span class="scp">${e.score[0]}:${e.score[1]}</span>`:'';
 const info=S.scene==='detail'&&!hid;// v detailu jen informace, do videa vede „Přehrát“
 return`<${info?'div':'button'} class="ev${hid?' hid':''}${info?' info':''}"${info?'':` data-act="${hid?'reveal':'jump'}" data-v="${e.min}"`}${first?' data-mk="5"':''}>${evIcon(e)}<span class="min">${e.min}'</span><span class="tx"><b>${title}</b>${sub?`<span>${sub}</span>`:''}</span>${tag}${sc}${hid?'<span class="rv">Zobrazit</span>':''}</${info?'div':'button'}>`}
function timeline(){const evs=M.ev.filter(e=>e.min<=S.minute).sort((a,b)=>b.min-a.min);
 if(!evs.length)return`<div class="empty" data-mk="13"><div class="eill" aria-hidden="true" style="--t:-${Date.now()%9600}ms"><svg class="epitch" viewBox="0 0 176 104" fill="none"><rect x="1" y="1" width="174" height="102" rx="10"/><path d="M88 1v102"/><circle cx="88" cy="52" r="18"/><rect x="1" y="30" width="22" height="44"/><rect x="153" y="30" width="22" height="44"/></svg><i class="ering"></i><i class="ering r2"></i><i class="eh"></i><i class="ea"></i><i class="eshadow"></i><img class="eball" src="img/sp-ball.svg" alt=""></div><b>Zatím se nic nestalo</b><span>Události zápasu se tu objeví během utkání.</span></div>`;
 let h=hideNow()||S.scene==='detail'?'':'<div class="hint2">Klepnutím na událost skočíte na tu chvíli ve videu.</div>';if(hideNow())h+=`<div class="banner" data-mk="11">${ri('eyeOff_a',20)}<div class="tx"><b>Bez spoilerů</b>Skóre a góly jsou skryté, dokud si je nevyžádáte.</div><button data-act="reveal">Zobrazit</button></div>`;
 const g2=evs.filter(e=>e.min>45),g1=evs.filter(e=>e.min<=45);let first=true;
 const rows=g=>g.map(e=>{const r=evRow(e,first);first=false;return r}).join('');
 // sekce poločasu: nadpis se přilepí pod hlavičku, další poločas ho vytlačí (sekční hlavička jako v iOS seznamech)
 if(g2.length)h+=`<div class="hs"><div class="gh">2. POLOČAS</div><div class="grp">${rows(g2)}</div></div>`;if(g1.length)h+=`<div class="hs"><div class="gh">1. POLOČAS</div><div class="grp">${rows(g1)}</div></div>`;
 return`<div class="lst">${h}</div>`}
function stats(){return`<div class="lst">`+statsAt(S.minute).map((r,i)=>{const[l,h,a,s]=r,fh=(h+a)?h:1,fa=(h+a)?a:1;
 return`<div class="sr"${i===0?' data-mk="8"':''}><div class="vals"><b>${h}${s}</b><span>${l}</span><b>${a}${s}</b></div><div class="bar"><i style="flex:${fh} 1 0"></i><i style="flex:${fa} 1 0"></i></div></div>`}).join('')+`</div>`}
function lineups(){const t=S.team,m=clamp(S.minute,0,90),f=m/90,pl=LU[t];
 const sel=S.pl||0,dots=pl.map((p,i)=>`<span class="dt${i===sel?' on':''}" data-act="pl" data-v="${i}" style="left:${3+94*p.x}%;top:${6+88*p.y}%" title="${p.nm}">${p.n}</span>`).join('');// tečky jako na TV: bez čísel, vybraný hráč modře
 const yc=nm=>M.ev.filter(e=>e.type==='yellow'&&e.p===nm&&e.min<=m).length;
 const rows=pl.map((p,i)=>{const pm=Math.round(p.out?Math.min(m,p.out):m);return`<div class="pr2${i===sel?' on':''}" data-act="pl" data-v="${i}">${avatar(p,t)}<span class="tx"><b>${p.nm} · ${p.pos}</b><span>Věk: ${p.age} let · ${p.c} · Číslo: ${p.n}</span><span>Odehráno: ${pm} min · ${p.gk?'Zákroky':'Souboje'}: ${Math.round(p.z*f)} · Karty: ${yc(p.nm)}</span></span></div>`}).join('');
 return`<div class="lst lu"><div class="tsw" data-mk="9"><button class="${t===0?'on':''}" data-act="team" data-v="0">${crest(M.t[0].code,20)}${M.t[0].full}</button><button class="${t===1?'on':''}" data-act="team" data-v="1">${crest(M.t[1].code,20)}${M.t[1].full}</button></div>
 <div class="lul${S.luMini?' mini':''}${t===1?' away':''}"><div class="form${t===1?' away':''}">Rozestavení ${FORM[t]}</div><div class="luw"><div class="pitch"><i class="ln" style="left:3%;right:3%;top:6%;bottom:6%"></i><i class="ln" style="left:50%;top:6%;bottom:6%;border-width:0 0 0 1px"></i><i class="ln" style="left:calc(50% - 22px);top:calc(50% - 22px);width:44px;height:44px;border-radius:50%"></i><i class="ln" style="left:3%;top:28%;bottom:28%;width:14%"></i><i class="ln" style="right:3%;top:28%;bottom:28%;width:14%"></i>${dots}</div><div class="lusel"><span class="n">${pl[sel].n}</span><span class="tx"><b>${pl[sel].nm}</b><span>${pl[sel].pos} · Rozestavení ${FORM[t]}</span></span></div></div></div>
 <div class="lur"><div class="gh">SESTAVA</div>${rows}</div></div>`}
function chipsRow(close,noGear){const sub=['Průběh','Statistiky','Sestavy'];
 const cr=`<span class="cr">${noGear?'':`<button class="gear${S.sheet==='sport'?' on':''}" data-act="sheet" data-v="sport">${ri('settings',20)}</button>`}${close?`<button class="gear" data-act="panel" data-v="">${ri('x_a',20)}</button>`:''}</span>`;
 return`<div class="chips" data-mk="4"><div class="l">${sub.map((s,i)=>`<button class="chip${S.sub===i?' on':''}" data-act="sub" data-v="${i}">${s}</button>`).join('')}</div>${cr}</div>`}
const subContent=()=>[timeline,stats,lineups][S.sub]();
function matchPanel(){return`<div class="mp cmp"><div class="stk">${headerCompact()}${chipsRow()}</div>${subContent()}</div>`}

/* ---------- seznamy kanálů a pořadů ---------- */
function liveLine(c){if(!c.match)return'';const st=status(),hide=hideNow()||st.pre;
 if(c.match==='other')return`<div class="live-line"><i class="ld"></i><b>${c.other.h} ${hide?'– : –':c.other.s} ${c.other.a}</b><span class="mn">${c.other.min}</span></div>`;
 const sc=scoreAt(S.minute);return`<div class="live-line" data-mk="16">${st.live?'<i class="ld"></i>':''}${crest(M.t[0].code,16)}<b>${hide?'– : –':sc[0]+' : '+sc[1]}</b>${crest(M.t[1].code,16)}<span class="mn">${hide?'Zápas probíhá':(st.pre?'výkop '+M.kick:Math.min(Math.floor(S.minute),90)+"'")}</span></div>`}
function chRows(){return CH.map(c=>`<div class="chrow${c.n===1&&S.scene==='player'?' cur':''}" data-act="${c.n===1?'noop':'other'}"><span class="lg"><img src="../../app/img/logos/${c.logo}.png" alt="${c.name}"></span><span class="tx"><span class="cn"><span>${c.name}</span><span>${c.n}</span></span><span class="pt">${c.now}</span><span class="pr"><i style="width:${c.p*100}%"></i></span>${c.match?liveLine(c):`<span class="tm">${c.time}</span>`}</span></div>`).join('')}
function progRows(){return PROG.map(p=>`<div class="chrow${p.cur?' cur':''}" data-act="other"><span class="lg tm2">${p.t}</span><span class="tx"><span class="pt">${p.n}</span><span class="tm">${p.d}</span>${p.match?'<div class="live-line" style="margin-top:4px"><span class="badge" data-mk="17">'+ic('chart',12)+' Statistiky</span></div>':''}</span></div>`).join('')}

/* ---------- přehrávač: na výšku ---------- */
function seekbar(){const f=clamp(S.minute,0,90)/90*100,b=clamp(S.live,0,90)/90*100,hide=hideNow();
 // na ose jen góly (kopačák): Bez spoilerů jen do aktuální pozice, jinak všechny známé až po živý okraj (i před táhlem); klepnutí skočí na gól
 const ticks=M.ev.filter(e=>e.type==='goal'&&e.min<=(hide?S.minute:S.live)).map(e=>`<i class="gball" data-act="jump" data-v="${e.min}" style="left:${e.min/90*100}%"><img src="img/sp-ball.svg" alt="Gól ${e.min}'"></i>`).join('');
 return`<div class="seekbar" data-act="seek" data-mk="6"><div class="trk"></div><div class="buf" style="width:${b}%"></div><div class="prog" style="width:${f}%"></div>${ticks}${b<100?`<i class="edge" style="left:${b}%"></i>`:''}<i class="knob" style="left:${f}%"></i></div>`}
function pill(){const st=status(),sc=scoreAt(S.minute);
 if(hideNow()||st.pre)return`<div class="vpill off" data-act="openmatch" data-mk="2">${ri('eyeOff_a',14)}<span>${st.pre?'Výkop '+M.kick:'Výsledek skrytý'}</span></div>`;
 return`<div class="vpill" data-act="openmatch" data-mk="2">${st.live?'<i class="ld"></i>':''}${crest(M.t[0].code,20)}<b class="sc">${sc[0]} : ${sc[1]}</b>${crest(M.t[1].code,20)}<span class="mn">${Math.min(Math.floor(S.minute),90)}'</span></div>`}
function video(vh,withPill=true){return`<div class="video ph${S.controls?'':' ctl-off'}" style="height:${vh}px" data-act="vtap"><span class="vlabel">video 16:9</span><div class="vslot"></div>
 <div class="vctl"><div class="vtop"><button class="ib" data-act="rotate" title="Zmenšit">${ri('chevron_down',24)}</button><div class="vtitle"><b>Fotbal: ${M.t[0].name} – ${M.t[1].name}</b><span>${M.channel} · ${M.league}</span></div><button class="cb">${ri('cast',24)}</button><button class="cb" data-act="sheet" data-v="main">${ri('settings',22)}</button></div>
 <div class="vcenter"><span class="sk" data-act="back10">${ri('m_back',44)}</span><span class="pb" data-act="play">${ri(S.playing?'pause':'play',40)}</span><span class="sk" data-act="fwd10">${ri('m_forward',44)}</span></div>
 <span class="vtime">${mmss(S.minute)} / 90:00</span><button class="cb vfull" data-act="rotate">${ri('fullscreen',18)}</button></div>${seekbar()}</div>`}
function sheet(){if(!S.sheet)return'';const back=S.sheet==='sport'&&S.sheetFrom==='main',st=S.settings;let title,body;
 if(S.sheet==='main'){title='Nastavení přehrávače';
  const row=(i,t,v,act,mk)=>`<button class="ai"${act?` data-act="sheet" data-v="${act}" data-from="main"`:''}${mk?` data-mk="${mk}"`:''}><span class="ico">${bi(i,22)}</span><span class="t">${t}</span><span class="v">${v}</span>${act?ri('chevR',20):''}</button>`;
  body=row('gauge','Rychlost přehrávání','Normální')+row('audio','Zvuk','Čeština')+row('subtitle','Titulky','Vypnuto')+row('record','Nahrávat','')+row('chart','Sportovní statistiky',st.ext?(st.hide?'Bez spoilerů':'Zapnuto'):'Vypnuto','sport',10)}
 else{title='Sportovní statistiky';const r=(k,t,d,mk)=>`<button class="ai" data-act="tog" data-v="${k}"${mk?` data-mk="${mk}"`:''}><span class="t">${t}<small>${d}</small></span>${toggle(st[k])}</button>`;
  body=r('ext','Rozšířené info o utkání','Sestavy, statistiky a průběh zápasu v panelu.',10)+r('hide','Bez spoilerů','Nezobrazovat skóre a góly, dokud si je sami nevyžádáte.')+r('mute','Skrýt notifikace','Nezobrazovat upozornění na góly a další události během zápasu.')}
 return`<div class="scrim" data-act="sheet" data-v=""></div><div class="sheet"><div class="hnd"></div><div class="hd">${back?`<button class="ib" data-act="sheet" data-v="main">${ri('back_a',22)}</button>`:''}<b${back?'':' style="padding-left:0"'}>${title}</b><button class="ib" data-act="sheet" data-v="">${ri('x_a',22)}</button></div><hr>${body}</div>`}
function evToast(e){const T=M.t[e.team]||{};switch(e.type){
 case'goal':return[`Gól · ${e.min}' ${e.p}`,`${M.t[0].name} ${e.score[0]} : ${e.score[1]} ${M.t[1].name}`];
 case'yellow':return[`Žlutá karta · ${e.min}' ${e.p}`,T.name];case'red':return[`Červená karta · ${e.min}' ${e.p}`,T.name];
 case'sub':return[`Střídání · ${e.min}' ${e.pin}`,`Za: ${e.pout} · ${T.name}`];case'var':return[`${e.title} · ${e.min}'`,e.sub];
 default:return[`${e.title} · ${e.min}'`,hideNow()?'':(e.sub||'')]}}
function toast(){const t=S.toast;if(!t)return'';
 if(t.kind==='goal'||t.kind==='ev'){const[a,b]=evToast(t.e);return`<div class="toast" data-mk="12">${evIcon(t.e)}<span class="tx"><b>${a}</b>${b?`<span>${b}</span>`:''}</span></div>`}
 return`<div class="toast plain"><span class="tx"><b>${t.txt}</b></span></div>`}
function viewPlayer(o){o=o||{};const v=o.variant,d=dev(),vh=Math.round(d.w*9/16),ext=S.settings.ext&&!v,tabs=ext?['TV kanály','Pořady','Sportovní statistiky']:['TV kanály','Pořady'],tab=ext?S.tab:Math.min(S.tab,1);
 const dotCls=S.newEv?'dot new':'dot',seg=`<div class="ptabs">${tabs.map((t,i)=>`<button class="chip${tab===i?' on':''}" data-act="tab" data-v="${i}"${i===2?' data-mk="1"':''}>${t}</button>`).join('')}</div>`;// taby přehrávače = Tab base z design systému (jako ve Figmě)
 const body=[chRows,progRows,matchPanel][tab]();const dim=S.dimOn&&S.idle&&tab!==2;
 const strip=v==='strip'?`<div class="strip"><i class="ld"></i><b style="color:var(--success)">ŽIVĚ · 67'</b><b class="sc">SLA 2 : 1 PLZ</b><span class="sp">Průběh · Statistiky · Sestavy</span>${ri('chevR',18)}</div>`:'';
 const msheet=v==='sheet'?`<div class="msheet"><div class="hnd"></div>${matchPanel()}</div>`:'';
 return`<div class="scr ${S.platform}">${statusBar()}<div class="pl${tab===2?' sport':''}" style="--vtop:calc(var(--sbh) + ${vh}px)"${S.form==='tab'?' data-mk="24"':''}><div class="sbspace"></div>${video(vh)}${strip}${seg}<div class="panewrap${dim||v==='sheet'?' dimmed':''}"><div class="pane"${tab===2?' data-mk="7"':''}>${body}</div><div class="dim" data-act="undim"></div></div>${msheet}${bottomSys()}</div>${sheet()}${toast()}</div>`}

/* ---------- přehrávač: na šířku ---------- */
function viewSide(){const sk=`<span class="sk" data-act="back10">${ri('m_back',38)}</span><span class="pb" data-act="play">${ri(S.playing?'pause':'play',34)}</span><span class="sk" data-act="fwd10">${ri('m_forward',38)}</span>`;
 const ctl=`<div class="sctl"><div class="stop"><button class="ib" data-act="rotate">${ri('chevron_down',22)}</button><div class="vtitle"><b>Fotbal: ${M.t[0].name} – ${M.t[1].name}</b><span>${M.channel}</span></div></div><div class="scen">${sk}</div><div class="sbot"><span class="stime">${mmss(S.minute)} / 90:00</span>${seekbar()}</div></div>`,fd=`--fd:-${Math.min(400,Date.now()-(S.sideHidAt||0))}ms`;
 // tablet na šířku (expanded): supporting pane – video vlevo zůstává plnohodnotné (celé ovládání), pod ním velké skóre; panel vpravo ~30 %
 const vid=S.form==='tab'?`${statusBar()}<div class="svid tabv${sideCls()}" style="${fd}"><div class="lvid ph" data-act="sidetap"><span class="vlabel">video 16:9</span><div class="vslot"></div>${ctl}</div><div class="tmatch" data-mk="23">${headerCompact()}</div></div>`
  :`<div class="svid${sideCls()}" data-act="sidetap" style="${fd}"><div class="lvid ph"><span class="vlabel">video 16:9</span><div class="vslot"></div></div>
  ${ctl}</div>`;
 return`<div class="scr ${S.platform} ls side">${vid}
  <div class="spanel" data-mk="22"><div class="pane"><div class="mp lpm cmp"><div class="lmtitle">Sportovní statistiky</div>${headerCompact()}${chipsRow(false)}${subContent()}</div></div><button class="gear spx" data-act="panel" data-v="" aria-label="Zavřít">${ri('x_a',20)}</button></div>
  ${sheet()}${toast()}${S.platform==='ios'?(S.form==='tab'?'<div class="home"></div>':'<div class="home"></div><div class="island-l"></div>'):''}</div>`}
function viewLandscape(){const open=S.panel,st=S.settings;if(open==='match'&&st.ext)return viewSide();
 const btn=(i,t,act,v)=>`<button class="lbtn" data-act="${act}"${v!==undefined?` data-v="${v}"`:''}>${bi(i,i==='chart'?24:26)}${t?`<span>${t}</span>`:''}</button>`;
 const mt=st.ext?`<button class="lbtn" data-act="panel" data-v="match" data-mk="14">${ic('chart',24)}<span>Sportovní statistiky</span>${status().live?'<i class="ld"></i>':''}</button>`:'';
 const panelL=open==='channels'?`<div class="lpanel l"><div class="segwrap" style="height:auto;padding:14px 16px 6px"><b style="font:500 18px/24px Roboto">Kanály</b></div><div class="panewrap"><div class="pane">${chRows()}</div></div></div>`:'';
 const lhead=t=>`<div class="lphd"><b>${t}</b><button class="ib" data-act="panel" data-v="">${ri('x_a',22)}</button></div>`;
 const panelR=open==='programs'?`<div class="lpanel r">${lhead('Pořady')}<div class="panewrap"><div class="pane">${progRows()}</div></div></div>`
  :'';
 return`<div class="scr ${S.platform} ls${open?' lpan-open':''}"><div class="lvid ph${S.controls||open?'':' ctl-off'}" data-act="vtap"><span class="vlabel">video 16:9</span><div class="vslot"></div></div>
 ${open&&S.platform!=='ios'?'<div class="lscrim" data-act="panel" data-v=""></div>':''}
 <div class="lctl ${S.controls?'':'ctl-off'}" data-act="vtap" style="${open?'display:none':''}"><div class="ltitle"><button class="ib" data-act="rotate">${ri('chevron_down',24)}</button><div class="vtitle"><b>Fotbal: ${M.t[0].name} – ${M.t[1].name}</b><span>${M.channel} · ${M.league}</span></div></div><button class="cb lcast">${ri('cast',24)}</button>
  <span class="lsi" style="left:24px">${ri('brightness',22)}</span><div class="lslide" style="left:33px"><i style="height:60%"></i></div><span class="lsi" style="right:24px">${ri('volume_on',22)}</span><div class="lslide" style="right:33px"><i style="height:70%"></i></div>
  <div class="lcenter"><span class="sk" data-act="back10">${ri('m_back',44)}</span><span class="pb" data-act="play">${ri(S.playing?'pause':'play',40)}</span><span class="sk" data-act="fwd10">${ri('m_forward',44)}</span></div>
  <span class="ltime">${mmss(S.minute)} / 90:00</span><button class="cb lmin" data-act="rotate">${ri('minimize',18)}</button><div class="lseek">${seekbar()}</div>
  <div class="lbar">${btn('list','Kanály','panel','channels')}${btn('list_right','Pořady','panel','programs')}${mt}${btn('gauge','','noop')}${btn('audio','','noop')}${btn('subtitle','','noop')}${btn('record','','noop')}${btn('lock','','noop')}</div></div>
 ${S.platform==='ios'?(open?overlayIos():''):panelL+panelR}${sheet()}${toast()}${S.platform==='ios'?(S.form==='tab'?'<div class="home"></div>':'<div class="home"></div><div class="island-l"></div>'):''}</div>`}

function hCards(kind){return kind==='channels'
 ?CH.map(c=>`<div class="hcard"><span class="lg"><img src="../../app/img/logos/${c.logo}.png" alt="${c.name}"></span><span class="cn">${c.name}</span><span class="pt">${c.now}</span><span class="pr"><i style="width:${c.p*100}%"></i></span>${c.match?liveLine(c):`<span class="tm">${c.time}</span>`}</div>`).join('')
 :PROG.map(p=>`<div class="hcard"><span class="lg">${p.t}</span><span class="pt">${p.n}</span><span class="tm">${p.d}</span>${p.match?'<span class="badge" style="margin-top:4px">'+ic('chart',12)+' Statistiky</span>':''}</div>`).join('')}
function headerCompact(){const st=status(),sc=scoreAt(S.minute),hide=hideNow()||st.pre,go=st.behind?`<span class="go" data-act="live">↻ Živě · ${Math.min(Math.floor(S.live),90)}'</span>`:'';
 return`<div class="lmh" data-mk="${S.orient==='portrait'?21:3}">${crest(M.t[0].code,28)}<b class="nm">${M.t[0].name}</b><b class="score">${hide?'– : –':sc[0]+' : '+sc[1]}</b><b class="nm">${M.t[1].name}</b>${crest(M.t[1].code,28)}<span class="sp"></span><span class="st">${st.live?'<i class="ld"></i>':st.end?'<i class="ld end"></i>':''}<span style="color:${st.live?'var(--success)':st.end?'var(--error)':'var(--fg2)'}">${st.t}</span>${go}</span><span class="lg2">${st.sub}</span></div>`}
function overlayIos(){const open=S.panel,x=`<button class="ib lovx" data-act="panel" data-v="">${ri('x_a',24)}</button>`;
 const ix=open==='programs'?1:0;
 return`<div class="lov"><div class="lovsw"><div class="seg">${['Kanály','Pořady'].map((l,i)=>`<button class="${ix===i?'on':''}" data-act="ovtab" data-v="${i}">${l}</button>`).join('')}</div></div>${x}<div class="lovbody"><div class="hstrip">${hCards(ix===0?'channels':'programs')}</div></div></div>`}

/* ---------- vstupní body ---------- */
function bottomChrome(on){if(S.platform==='ios')return`<div class="tabbar" data-mk="19">${[['home','Domů'],['tv','TV kanály'],['epg','Program'],['pvr','Nahrávky'],['vod','Videotéka']].map((t,i)=>`<button class="${i===on?'on':''}" data-act="other">${ri(t[0],22)}<span>${t[1]}</span></button>`).join('')}</div><div class="home"></div>`;
 return`<div class="bnav" data-mk="19">${['home','tv','epg','pvr','vod'].map((t,i)=>`<span class="${i===on?'on':''}">${ri(t,24)}</span>`).join('')}</div><div class="anav"><i></i><i></i><i></i></div>`}
function mthumb(o){o=o||{};const big=o.big;return`<span class="mth${big?' big':''}">${crest(o.h||'SLA',big?64:26)}<span class="vs">${o.txt||'vs'}</span>${crest(o.a||'PLZ',big?64:26)}${o.live?'<span class="bd">ŽIVĚ</span>':''}${o.p?`<span class="pb"><i style="width:${o.p*100}%"></i></span>`:''}</span>`}
function sthumb(o){return`<span class="mth sp" style="--g:${o.g}">${ic(o.i||'tv',26)}<span class="vs">${o.txt}</span></span>`}
function viewCatalog(){const st=status(),sc=scoreAt(S.minute),hide=hideNow();
 const days=['Dnes 2.10.','Zítra 3.10.','So 4.10.','Ne 5.10.'],items=[
 {t:'Fotbal: Slavia – Plzeň',m:'Dnes 18:00 – 20:00 · Prima Sport',live:1,go:1,p:.74,th:mthumb({live:1,p:.74})},{t:'Fotbal: Baník – Sparta',m:'Dnes 20:30 – 22:30 · Prima Sport',up:1,go:0,th:mthumb({h:'BAN',a:'SPA',txt:'20:30'})},
 {t:'Tenis: ATP Turnaj – semifinále',m:'Dnes 14:00 – 17:30 · Prima Sport',th:sthumb({g:'#1f5e3a',txt:'Tenis'})},{t:'Hokej: Sparta – Kometa',m:'Dnes 17:00 – 19:30 · Prima Sport',th:sthumb({g:'#1d3f6e',txt:'Hokej'})},{t:'Studio Fotbal',m:'Dnes 21:30 – 22:30 · Prima Sport',th:sthumb({g:'#3a2f5c',txt:'Studio'})}];
 const rows=items.map((it,i)=>`<button class="itm" data-act="${it.go?'play':'other'}"><span class="th">${it.th}</span><span class="tx"><b>${it.t}</b><span>${it.m}</span>${(it.live||it.up)?`<div class="live-line itl"${it.live?' data-mk="16"':''}><span class="badge" data-mk="17">${ic('chart',12)} Statistiky</span>${it.live?`<i class="ld"></i>${crest(M.t[0].code,16)}<b>${hide?'– : –':sc[0]+' : '+sc[1]}</b>${crest(M.t[1].code,16)}<span class="mn">${hide?'Zápas probíhá':Math.floor(S.minute)+"'"}</span>`:''}</div>`:''}</span></button>`).join('');
 return`<div class="scr ${S.platform}">${statusBar()}<div class="page"><div class="appbar"><span class="bk">${ri('back_a',22)}</span><b>Sport</b></div><div class="dchips">${days.map((d,i)=>`<span class="chip${i===0?' on':''}">${d}</span>`).join('')}</div><div class="pbody">${rows}</div>${bottomChrome(0)}</div>${toast()}</div>`}
function viewChannels(){const ios=S.platform==='ios';
 return`<div class="scr ${S.platform}">${statusBar()}<div class="page">${ios?'<div class="ptitle"><b>TV kanály</b>'+ri('search',24)+'</div>':'<div class="appbar"><b>TV kanály</b><span class="sp"></span>'+ri('search',24)+'</div>'}<div class="dchips">${['Vše','Oblíbené','Sport','Filmy'].map((d,i)=>`<span class="chip${i===2?' on':''}">${d}</span>`).join('')}</div><div class="pbody" style="${ios?'padding-bottom:110px':''}">${chRows()}</div>${bottomChrome(1)}</div>${toast()}</div>`}
function detailStats(){const st=status(),hide=hideNow(),m=S.minute;
 const sec=(t,sub,link)=>`<div class="dsh"><b>${t}</b>${link!==undefined?`<button data-act="openstats" data-v="${link}">${sub} ${ri('chevR',16)}</button>`:''}</div>`;
 const line=`<div class="dst">${st.live?'<i class="ld"></i>':st.end?'<i class="ld end"></i>':''}<span style="color:${st.live?'var(--success)':st.end?'var(--error)':'var(--fg2)'}">${st.t}</span><span class="sp">${st.sub}</span></div>`;
 let h=line;
 if(st.pre)h+=`<div class="dsec">${sec('Průběh')}<div class="empty sm"><b>Zápas začne v ${M.kick}</b><span>Události se tu objeví během utkání.</span></div></div>`;
 else if(hide)h+=`<div class="dsec">${sec('Průběh')}<div class="banner" data-mk="11">${ri('eyeOff_a',20)}<div class="tx"><b>Bez spoilerů</b>Skóre a góly jsou skryté, dokud si je nevyžádáte.</div><button data-act="reveal">Zobrazit</button></div></div>`;
 else{const key=M.ev.filter(e=>e.min<=m&&(e.type==='goal'||e.type==='yellow'||e.type==='red')).sort((a,b)=>b.min-a.min).slice(0,4);
  h+=`<div class="dsec">${sec('Průběh','Celý průběh',0)}<div class="lst">${key.length?`<div class="grp">${key.map(e=>evRow(e,false)).join('')}</div>`:'<div class="empty sm"><b>Zatím se nic nestalo</b></div>'}</div></div>`}
 if(!st.pre)h+=`<div class="dsec">${sec('Statistiky','Všechny statistiky',1)}<div class="lst">${statsAt(m).slice(0,5).map(r=>{const[l,a,b,x]=r,fh=(a+b)?a:1,fa=(a+b)?b:1;return`<div class="sr"><div class="vals"><b>${a}${x}</b><span>${l}</span><b>${b}${x}</b></div><div class="bar"><i style="flex:${fh} 1 0"></i><i style="flex:${fa} 1 0"></i></div></div>`}).join('')}</div></div>`;
 h+=`<div class="dsec dlu">${sec('Sestavy','Celá sestava',2)}${lineups()}</div>`;
 return h}
const playLbl=()=>{const st=status();return st.pre?`Sledovat ${M.channel}`:fin()?'Přehrát záznam':'Přehrát živě'};
const playIc=()=>ri(fin()?'play':'play_live',16);// živé vysílání = m:play_live (jako TV), záznam = m:play_md
const dplay=on=>`<button class="dplay${on?' on':''}" data-act="play">${playIc()} ${playLbl()}</button>`;
function viewDetailFull(){
 return`<div class="scr ${S.platform}">${statusBar()}<div class="page dfull" style="overflow:hidden"><div class="appbar"><span class="bk" data-act="dback">${ri('back_a',22)}</span><span class="tt"><b>Sportovní statistiky</b><span>Fotbal: ${M.t[0].name} – ${M.t[1].name}</span></span></div><div class="pbody"><div class="mp cmp"><div class="stk">${headerCompact()}${chipsRow(false,true)}</div>${subContent()}</div></div>${dplay(true)}</div>${toast()}</div>`}
function viewDetail(){if(S.dFull!=null)return viewDetailFull();const st=status(),hide=hideNow(),dt=['Sportovní statistiky','Podobné pořady','Více info'];
 return`<div class="scr ${S.platform}">${statusBar()}<div class="page dpage" style="overflow:hidden"><div class="pbody"><div class="hero mhero">${mthumb({big:1,txt:status().pre?M.kick:(hideNow()?'– : –':scoreAt(S.minute).join(' : '))})}<span class="bk">${ri('back_a',22)}</span><span class="hmeta">${M.league} · ${M.channel}</span></div><div class="dtl"><h1>Fotbal: ${M.t[0].name} – ${M.t[1].name}</h1><div class="meta">2. 10. 2026, 18:00 – 20:00 · ${M.channel} · ${M.league}</div><button class="playbtn" data-act="play">${playIc()} ${playLbl()}</button>
 <div class="acts"><div>${ri('heart',22)}Přidat do oblíbených</div><div>${ri('record_d',22)}Nahrát pořad</div><div>${ri('bell',22)}Připomenout</div></div></div>
 <div class="dtabs" data-mk="18">${dt.map((d,i)=>`<span class="chip${i===S.dTab?' on':''}" data-act="dtab" data-v="${i}">${d}</span>`).join('')}</div>
 <div class="mini">${S.dTab===0?detailStats():'<div class="empty"><span>(mimo prototyp)</span></div>'}</div></div>${dplay(S.dplayOn)}</div>${toast()}</div>`}

/* ---------- popisky, poznámky ---------- */
const NOTES={
1:['Třetí záložka „Sportovní statistiky“','Stejný název jako tlačítko na TV. Přibude do stávajícího Segment-nav pod videem („TV kanály | Pořady“). Android: další položka v `ChannelsViewModel.tabs` (`PlayerPortraitMetadata` → `ChannelTypePicker` je indexový, N záložek zvládne). iOS: `NativePlayer2ContentRowView.switcherView` je dnes dvoustavový (`ContentListType` = `.channelList` / `.epg`, indikátor napevno půl šířky) — třetí stav = nový case a přepočet na třetiny. Zobrazí se jen když má pořad sportovní data a je zapnuté „Rozšířené info“. Zelená tečka = živý zápas, červená = nová událost.'],
2:['Oznámení místo skóre na videu','Na videu není trvalé skóre. Jako na TV se při události (gól, karta, střídání, VAR, poločas) ukáže oznámení nahoře na 5 s, jen informuje (neklikací, jako na TV). Skóre je vidět v řádku nad pilulkami. Při „Bez spoilerů“ se góly neoznamují, při „Skrýt notifikace“ nic.'],
3:['Hlavička zápasu','Stav se řídí pozicí přehrávání, ne reálným časem: ŽIVĚ · 67\' / pozadu za živým jen 34\' bez tečky + odkaz „↻ Živě · 67\'“ (vrátí na živý okraj a ukáže, o kolik je divák pozadu) / ZÁZNAM / UKONČENO. Soutěž · fáze vpravo. Bez technických pojmů jako start over / timeshift. Texty z Personigo (`sports_statistics.*`).'],
4:['Podzáložky + nastavení','Průběh / Statistiky / Sestavy jako chipy (stejný vzor jako v Detailu). Na TV jsou to taby; na dotyku přidat swipe doleva/doprava. Ozubené kolo = Nastavení zápasu (sheet). Chipy zůstávají při scrollu přilepené, hlavička odroluje.'],
5:['Průběh','Nejnovější nahoře, skupiny po poločasech, stejná anatomie řádku jako na TV: ikona · minuta · akce · hráč · asistence · tag týmu · průběžné skóre u gólu. Klepnutí na řádek = skok ve videu na tu chvíli (jako OK na TV); seznam se pak ořízne na pozici přehrávání.'],
6:['Góly na seekbaru','Jen góly, jako malý míč 14 px přímo na ose (jako klíčové momenty). Normálně jsou vidět všechny známé góly až po živý okraj, i ty za táhlem — divák výsledek zná. V režimu „Bez spoilerů“ jen góly před aktuální pozicí, takže nic neprozradí (příznak `SPOILER` z manifestu). Klepnutí na míč = skok na gól. Bílá čárka = živý okraj.'],
7:['Zatemnění spodní části po 10 s','Dnes se spodní část portrétu po 10 s nečinnosti ztlumí (Android `PORTRAIT_METADATA_DIM_DELAY`, iOS `PlaylistDimmingManager`, překryv 85 %). Záložka Sportovní statistiky je z toho **vyjmutá** — čte se bez dotyku a data se mění živě. Zkuste v ovládání zapnout „Zatemňování po 10 s“ a přepnout na TV kanály.'],
8:['Statistiky','Hodnota · popisek · hodnota a dvoubarevný pruh (domácí vlevo). Pořadí jako na TV: Držení míče, Střely na bránu, Střely mimo, Rohy, Fauly, dál ostatní. Hodnoty se mění s pozicí přehrávání (okna `matchstats` v manifestu).'],
9:['Sestavy','Přepínač týmů místo ‹ › (na dotyku větší cíl). Formace + hřiště, pak hráči: jméno · post, věk · země · číslo, odehráno · zákroky · karty. Fotky hráčů backend zatím nedořešil (Timeline spec) → fallback číslo dresu.'],
10:['Nastavení zápasu (sheet)','Stejný vzor jako Nastavení přehrávače (`PlayerOptionsSheet`, `ActionItem`, horní radius 12): v hlavním sheetu přibude položka „Sportovní statistiky“ s vnořeným sheetem; stejný sheet otevře i ozubené kolo v panelu. Tři přepínače jako na TV + „Skrýt notifikace“.'],
11:['Bez spoilerů','Skóre „– : –“, góly „Gól · skryto“ s tlačítkem „Zobrazit“, žádné značky gólů, žádné gólové oznámení. Na TV odkrytí vypne celý režim; tady je otázka, jestli odkrytí platí jen pro tuhle relaci. Kteří události jsou spoiler (karty? VAR?), určuje Metaprofile Feed.'],
12:['Oznámení události','Malá kapsle nahoře nad videem, 5 s, neklikací (klepnutí projde do videa). Pro všechny události, nejen góly. Vázané na pozici přehrávání, ne na živý čas, takže ve start over nespoileruje. Vyzkoušejte tlačítko „Ukázat oznámení“ vlevo.'],
13:['Prázdný stav','„Zatím se nic nestalo“ (`sports_statistics.timeline_empty_description`) před výkopem a v prvních minutách. Sestavy bývají k dispozici dřív než průběh.'],
14:['Tlačítko Sportovní statistiky (na šířku)','Třetí kapsle vedle Kanály a Pořady, stejný vzhled (42 dp, text + ikona), jen když jsou data. Android: položka v `PlayerOverlayActionFactory.fullscreenDefaultLeftBottomButtons`; iOS: nové tlačítko v `LandscapeOptionsBarView` vedle `bottomChannelsButton` a `bottomProgramButton`. Zelená tečka = živě.'],
16:['Skóre v seznamech','Živé skóre u běžícího zápasu v seznamu kanálů, v katalogu Sport a v EPG. Respektuje „Bez spoilerů“ → „Zápas probíhá“. Otázka: chceme to i mimo přehrávač?'],
17:['Štítek „Statistiky“','Štítek jako jiné štítky (Nahrávka, Nedostupné…): pořad má sportovní data. Nese text, ne jen barvu.'],
18:['Detail: záložka Sportovní statistiky','Chip taby v Detailu jsou už samy záložky, proto uvnitř žádné další pilulky: jedna stránka se sekcemi Průběh (jen góly a karty), Statistiky (5 hlavních) a Sestavy (hřiště). „Celý průběh / Všechny statistiky / Celá sestava“ otevře celou obrazovku v detailu (bez videa, zpět na detail); do přehrávače vede jen „Přehrát“, které je po odscrollování plovoucí dole. Události v detailu jsou jen informace. Skóre je jen v hero (bez duplicitní karty). Před zápasem jen čas výkopu a sestavy; „Bez spoilerů“ schová průběh i skóre v hero.'],
22:['Na šířku: video se zmenší','Jako na TV: panel vyjede zprava (360 px + safe zóna) a video se plynule zmenší vlevo, takže ho nic nezakrývá (YouTube to tak dělá u chatu). Telefon je širší než 16:9, video tak ztratí jen část velikosti. Ve zmenšeném videu je jen titulek, ±10 s, play/pauza a osa; spodní lišta se vrátí po zavření panelu (✕ v řádku s pilulkami). Obsah panelu je stejný jako na výšku, jeden sloupec.'],
23:['Tablet na šířku (supporting pane)','Material 3 „expanded“ (≥ 840 dp) a iPad v režimu regular: statistiky jsou doplněk k videu, proto vzor supporting pane — video vlevo zhruba 70 %, panel vpravo 380 (≈ 30 %), mezera 24. Na rozdíl od telefonu se video nezmenší na náhled: je dost velké, takže si nechá celé ovládání (titulek, ±10 s, osa s góly), které po 3 s zmizí. Volné místo pod videem zabere velké skóre se stavem a soutěží; v panelu proto hlavička se skóre není. Stavový řádek 24, spodní okraj iPad 20 / Android 24.'],
24:['Tablet na výšku','Material 3 „medium“ (600–839 dp) a iPad na výšku: rozložení zůstává jako v aplikaci na telefonu — video 16:9 přes celou šířku, pod ním taby a obsah (ověřeno ve zdrojáku: iOS i Android mají na tabletu stejný přehrávač, jen větší miniplayer 440×248 / 319×179). Okraje 24. Sestavy jdou do dvou sloupců: hřiště vlevo zůstává přilepené, hráči vpravo, takže kompaktní hřiště není potřeba. Oznámení a nastavení nejsou přes celou šířku (max. ~440 / 600).'],
21:['Skóre + pilulky','Přepínač TV kanály | Pořady | Sportovní statistiky zůstává. Velká karta se skóre je nahrazená kompaktním řádkem (loga, skóre, stav), který je spolu s pilulkami přilepený nahoře. Řádek se skóre odděluje obě řady pilulek, takže nesplývají, a skóre je vidět i při scrollu (jako sbalená hlavička ve FotMob).'],
19:['Navigace platforem','iOS: plovoucí tab bar (Domů, TV kanály, Program, Nahrávky, Videotéka). Android V2: spodní navigace 48 dp s ikonami ze serveru; Android V1 má šuplík — otázka, jestli ho řešit.']};
const CAPS={player:'Video je ukázkový veřejný stream (Red Bull TV), se zápasem nesouvisí; data zápasu jsou simulovaná. Přehrávač na výšku. Klikněte na záložky, chipy, ozubené kolo, řádky průběhu; tažením seekbaru měníte pozici přehrávání, tlačítkem vlevo spustíte simulaci zápasu.',
 landscape:'Přehrávač na šířku: tlačítka Kanály / Pořady / Sportovní statistiky dole. Sportovní statistiky vysunou panel zprava a video se zmenší vedle něj (jako na TV), na iPhonu i Androidu.',catalog:'Katalog Sport: živé skóre a štítek „Statistiky“ u zápasů s daty.',channels:'TV kanály: u běžícího zápasu živé skóre (nebo „Zápas probíhá“ při skrytém výsledku).',detail:'Detail události: záložka „Sportovní statistiky“ jako jedna stránka se sekcemi Průběh (klíčové události), Statistiky (5 hlavních) a Sestavy; odkazy otevřou celou obrazovku v detailu, do přehrávače vede jen Přehrát.'};

/* ---------- vykreslení ---------- */
let wasScroll=0,vid=null,hlsI=null;
const STREAMS=['https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8','https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8','https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'];
function loadStream(i){if(i>=STREAMS.length)return;const u=STREAMS[i],next=()=>{if(hlsI){hlsI.destroy();hlsI=null}loadStream(i+1)};
 if(/\.m3u8/.test(u)){if(window.Hls&&Hls.isSupported()){hlsI=new Hls({maxBufferLength:12,capLevelToPlayerSize:true});hlsI.loadSource(u);hlsI.attachMedia(vid);hlsI.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)next()})}else if(vid.canPlayType('application/vnd.apple.mpegurl'))vid.src=u;else next()}
 else{vid.src=u;vid.onerror=next}
 vid.play&&vid.play().catch(()=>{})}
function setupVideo(){vid=document.createElement('video');vid.id='vid';vid.muted=true;vid.loop=true;vid.autoplay=true;vid.playsInline=true;vid.setAttribute('playsinline','');vid.poster='../../img/video.jpg';vid.addEventListener('loadeddata',()=>{vid.classList.add('ok');if(S.playing)vid.play().catch(()=>{})});vid.addEventListener('canplay',()=>{if(S.playing&&vid.paused)vid.play().catch(()=>{})});loadStream(0)}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&vid&&S.playing&&vid.paused)vid.play().catch(()=>{})});
function holdVideo(){if(vid)$('#vhold').appendChild(vid)}
function attachVideo(scr){if(!vid)return;const slot=$('.vslot',scr);if(slot){slot.appendChild(vid);if(S.playing){if(vid.paused)vid.play().catch(()=>{})}else vid.pause()}}
// hřiště v sestavě zůstává přilepené pod hlavičkou; klepnutí na tečku posune seznam k hráči
function paneOf(n){let p=n&&n.parentElement;while(p&&!/(auto|scroll)/.test(getComputedStyle(p).overflowY))p=p.parentElement;return p}
// po odscrollování se hřiště zmenší do kompaktní lišty (víc místa pro seznam); práh s hysterezí, ať to neposkakuje
function syncMini(){$$('#screen .mp.cmp').forEach(mp=>{if(S.form==='tab'&&S.orient!=='landscape'&&!$('#screen .ls')){const l=$('.lu .lul',mp);if(l)l.classList.remove('mini');S.luMini=false;return}const lul=$('.lu .lul',mp),tsw=$('.lu .tsw',mp),stk=$('.stk',mp);if(!lul||!tsw)return;const mini=lul.classList.contains('mini');
 const hd=stk||$('.chips',mp);const ref=hd?hd.getBoundingClientRect().bottom:paneOf(lul).getBoundingClientRect().top;// na šířku (boční panel) není přilepená hlavička → okraj panelu
 const d=tsw.getBoundingClientRect().bottom-ref;// přepínač týmů zajel pod hlavičku = seznam se scrolluje
 const want=mini?d<24:d<-4;if(want!==mini){lul.classList.toggle('mini',want);S.luMini=want}})}
// nadpis poločasu dostane pozadí hlavičky jen když je opravdu přilepený (jinak by byl vidět jako pruh na přechodu pozadí)
function syncGh(){$$('#screen .mp.cmp').forEach(mp=>{const t=parseFloat(mp.style.getPropertyValue('--stk'))||0;$$('.hs>.gh',mp).forEach(g=>{const p=paneOf(g);if(!p)return;const top=g.getBoundingClientRect().top-p.getBoundingClientRect().top;g.classList.toggle('stuck',p.scrollTop>0&&top<=t+1)})})}
function stickyLineup(scr){$$('.mp.cmp',scr).forEach(mp=>{const stk=$('.stk',mp),lul=$('.lu .lul',mp),ch=$('.chips',mp),hd=stk||(ch&&getComputedStyle(ch).position==='sticky'?ch:null);
 if(hd){const cs=getComputedStyle(hd);mp.style.setProperty('--stk',hd.offsetHeight+'px');mp.style.setProperty('--stkbg',cs.backgroundImage!=='none'?cs.backgroundImage:cs.backgroundColor)}// nadpisy poločasů se lepí pod hlavičku se stejným pozadím
 if(!lul)return;
 if(stk){lul.style.top=stk.offsetHeight+'px';const cs=getComputedStyle(stk);lul.style.backgroundImage=cs.backgroundImage;lul.style.backgroundColor=cs.backgroundColor}else{const ch=$('.chips',mp);lul.style.top=(ch&&getComputedStyle(ch).position==='sticky'?ch.offsetHeight:0)+'px'}if(S.luMini)lul.classList.add('mini')});
 if(S.plScroll){S.plScroll=false;const row=$('.pr2.on',scr),lul=$('.lu .lul',scr);if(row&&lul){let pane=row.parentElement;while(pane&&!/(auto|scroll)/.test(getComputedStyle(pane).overflowY))pane=pane.parentElement;
  if(pane){const r=row.getBoundingClientRect(),l=lul.getBoundingClientRect(),p=pane.getBoundingClientRect();if(r.top<l.bottom||r.bottom>p.bottom)pane.scrollTop+=r.top-l.bottom-6}}}}
function render(o){o=o||{};const scr=$('#screen'),SC=['.pane','.lovbody','.hstrip','.pbody'],vk=S.scene+(S.scene==='detail'&&S.dFull!=null?'-'+S.dFull:''),same=scr.dataset.scene===vk,keep=SC.map(q=>{const e=same&&$(q,scr);return e?[e.scrollTop,e.scrollLeft]:null});scr.dataset.scene=vk;
 S.platform=S.platform==='and'?'and':'ios';
 const land=S.orient==='landscape'&&S.scene==='player',d=dev();
 const w=land?d.h:d.w,h=land?d.w:d.h;
 scr.style.width=w+'px';scr.style.height=h+'px';scr.style.borderRadius=(d.r-10)+'px';$('#device').style.borderRadius=d.r+'px';
 const v={player:land?viewLandscape:viewPlayer,catalog:viewCatalog,channels:viewChannels,detail:viewDetail}[S.scene];
 holdVideo();scr.innerHTML=v();{const r0=scr.firstElementChild;if(r0)r0.classList.toggle('tab',S.form==='tab')}attachVideo(scr);scr.classList.toggle('anim',!!S.anim);S.anim=false;
 SC.forEach((q,i)=>{const e=$(q,scr);if(e&&keep[i]){e.scrollTop=keep[i][0];e.scrollLeft=keep[i][1]}});stickyLineup(scr);syncGh();if(S.dRestore!=null){const b=$('.pbody',scr);if(b)b.scrollTop=S.dRestore;S.dRestore=null}syncDplay();
 $$('[data-mk]',scr).forEach(e=>{if(getComputedStyle(e).position==='static')e.style.position='relative'});
 $('#stagewrap').classList.toggle('mk-on',S.notes);document.body.classList.toggle('mk-on',S.notes);
 fit(w,h);if(!o.noCtl)renderCtl();renderNotes();
 $('#cap').textContent=land?CAPS.landscape:CAPS[S.scene]}
function fit(w,h){const wrap=$('#stagewrap'),st=$('#stage'),rs=document.body.classList.contains('solo')?0:60,k=Math.min(1,(wrap.clientHeight-rs)/(h+20),(wrap.clientWidth-(rs?16:0))/(w+20));
 st.style.transform=`scale(${k})`;st.style.marginBottom=(-(h+20)*(1-k))+'px'}
function renderNotes(){const el=$('#notes');const nums=[...new Set($$('[data-mk]',$('#screen')).map(e=>+e.dataset.mk))].sort((a,b)=>a-b);
 el.innerHTML='<h3>Poznámky k UX</h3>'+(S.notes?(nums.length?'<ul>'+nums.map(n=>`<li data-n="${n}"><b>${n}</b><span><strong>${NOTES[n][0]}</strong>${NOTES[n][1].replace(/`([^`]+)`/g,'<code>$1</code>')}</span></li>`).join('')+'</ul>':'<p class="none">V tomto stavu nejsou žádné značky.</p>'):'<p class="none">Značky jsou vypnuté (viz Ovládání).</p>')
 +`<h3>Otevřené otázky</h3><ul class="q"><li>Šířka záložek: „Sportovní statistiky“ se do třetiny šířky nevejde — záložky musí mít šířku podle textu (Android <code>SecondaryTabRow</code> je dnes stejnoměrný, iOS indikátor napevno půl šířky).</li><li>Kde bude „Bez spoilerů“: jen v panelu, nebo i v Nastavení aplikace (seznamy, Detail)?</li><li>Platí odkrytí spoileru jen pro relaci, nebo vypíná režim?</li><li>Má se skóre ukazovat v seznamech a katalogu?</li><li>Android V1 (šuplík) dělat také?</li><li>Přetoky EPG: zápas přeteče slot a aplikace přepne pořad.</li></ul>`;
 $$('li[data-n]',el).forEach(li=>{li.onmouseenter=()=>$$('[data-mk="'+li.dataset.n+'"]',$('#screen')).forEach(e=>e.classList.add('hl-note'));li.onmouseleave=()=>$$('.hl-note').forEach(e=>e.classList.remove('hl-note'))})}
function renderCtl(){const el=$('#ctl'),seg=(k,opts)=>`<div class="seg2">${opts.map(o=>`<button class="${S[k]===o[0]?'on':''}" data-c="${k}" data-v="${o[0]}"${o[2]?' disabled':''}>${o[1]}</button>`).join('')}</div>`;
 const nonPlayer=S.scene!=='player';
 el.innerHTML=`<h3>Zařízení</h3>${seg('platform',[['ios',S.form==='tab'?'iPad':'iPhone'],['and','Android']])}<h3>Velikost</h3>${seg('form',[['phone','Telefon'],['tab','Tablet']])}<h3>Orientace</h3>${seg('orient',[['portrait','Na výšku'],['landscape','Na šířku',nonPlayer]])}
 <h3>Scéna</h3>${seg('scene',[['player','Přehrávač'],['catalog','Katalog'],['channels','Kanály'],['detail','Detail']])}
 <h3>Stav zápasu</h3><div class="btnrow">${[['Před výkopem',-8,-8],['12\'',12,12],['Poločas',45,45],['67\' živě',67,67],['Pozadu 34\'',34,67],['Konec 90\'',90,90]].map(p=>`<button data-preset="${p[1]},${p[2]}">${p[0]}</button>`).join('')}</div>
 <div class="rngl" style="margin-top:10px"><span>Pozice přehrávání</span><b id="l-minute">${Math.floor(S.minute)}'</b></div><input class="rng" type="range" min="-10" max="90" step="1" value="${Math.floor(S.minute)}" data-r="minute">
 <div class="rngl"><span>Živý okraj</span><b id="l-live">${Math.floor(S.live)}'</b></div><input class="rng" type="range" min="-10" max="90" step="1" value="${Math.floor(S.live)}" data-r="live">
 <div class="btnrow" style="margin-top:8px"><button data-sim class="${S.sim?'on':''}">${S.sim?'■ Zastavit simulaci':'▶ Simulovat zápas'}</button><button data-toast>Ukázat oznámení</button></div>
 <h3>Nastavení zápasu</h3>${[['ext','Rozšířené info o utkání'],['hide','Bez spoilerů'],['mute','Skrýt notifikace']].map(o=>`<label class="chk"><input type="checkbox" data-s="${o[0]}" ${S.settings[o[0]]?'checked':''}><span>${o[1]}</span></label>`).join('')}
 <h3>Prototyp</h3><label class="chk"><input type="checkbox" data-o="notes" ${S.notes?'checked':''}><span>Číslované poznámky</span></label><label class="chk"><input type="checkbox" data-o="dimOn" ${S.dimOn?'checked':''}><span>Zatemňování spodní části po 10 s <small>jako dnes v appce; Zápas je vyjmutý</small></span></label>
 <div class="btnrow" style="margin-top:8px"><button data-reset>Obnovit výchozí stav</button></div>`}

/* ---------- logika ---------- */
// play/pauza na zmenšeném videu: ukáže se na 3 s (jako ovládání v appce), pak zmizí
let sideT=null;function sideShow(){S.sideCtl=true;clearTimeout(sideT);sideT=setTimeout(()=>{S.sideCtl=false;S.sideHidAt=Date.now();const v=$('#screen .ls.side .svid');if(v){v.style.setProperty('--fd','0ms');v.classList.add('ctl-fade')}},3000)}
// zmizení = animace 0,4 s; při překreslení během ní pokračuje (záporné zpoždění), potom ctl-off
function sideCls(){if(S.sideCtl)return'';return Date.now()-(S.sideHidAt||0)<400?' ctl-fade':' ctl-off'}
let demoT=-1,toastT=null,idleT=null,simT=null;
function showToast(t,ms=5000){S.toast=t;clearTimeout(toastT);toastT=setTimeout(()=>{S.toast=null;render()},ms)}
function resetIdle(){if(S.idleHold){S.idleHold=false;return}S.idle=false;const w=$('.panewrap');if(w)w.classList.remove('dimmed');clearTimeout(idleT);idleT=setTimeout(()=>{if(S.dimOn&&S.scene==='player'&&S.orient==='portrait'&&S.tab!==2){S.idle=true;const w2=$('.panewrap');if(w2)w2.classList.add('dimmed')}},10000)}
function setMinute(m){S.minute=clamp(m,-10,Math.min(S.live,90));}
function tick(){if(S.live>=90){stopSim();return}const prev=S.minute;S.live++;if(S.playing)S.minute=Math.min(S.minute+1,S.live);
 M.ev.filter(e=>e.min>prev&&e.min<=S.minute).forEach(e=>{if(!S.settings.mute&&!(hideNow()&&e.type==='goal')){if(S.tab!==2||S.scene!=='player'||S.orient==='landscape')S.newEv=true;showToast({kind:'ev',e})}});
 render()}
// živý zápas běží sám (1 min = 3 s), aby toasty chodily i bez simulace
setInterval(()=>{if(!S.sim&&S.live<90&&S.scene==='player')tick()},3000);
function startSim(){if(S.live>=90){S.live=-8;S.minute=-8;S.revealed=false}S.sim=true;clearInterval(simT);simT=setInterval(tick,1000);render()}
function stopSim(){S.sim=false;clearInterval(simT);render()}
function act(a,ds,el){const pPrev=S.panel;switch(a){
 case'tab':if(+ds.v===2&&S.tab!==2)S.prevTab=S.tab;S.tab=+ds.v;if(S.tab===2)S.newEv=false;resetIdle();break;
 case'sub':S.sub=+ds.v;S.luMini=false;break;case'team':S.team=+ds.v;S.pl=0;S.luMini=false;break;case'pl':S.pl=+ds.v;S.plScroll=!!(el&&el.classList.contains('dt'));break;
 case'sheet':S.sheetFrom=ds.from||(ds.v==='sport'&&S.sheet==='main'?'main':null);S.sheet=ds.v||null;break;
 case'tog':S.settings[ds.v]=!S.settings[ds.v];if(ds.v==='hide')S.revealed=false;if(ds.v==='ext'&&!S.settings.ext&&S.tab===2)S.tab=0;break;
 case'reveal':S.revealed=true;showToast({kind:'plain',txt:'Výsledek zobrazen (jen pro tuto relaci)'},2500);break;
 case'jump':{const m=+ds.v;S.minute=Math.min(m,S.live);showToast({kind:'plain',txt:`Skok na ${m}' ve videu`},2200);break}
 case'live':S.minute=S.live;break;case'sidetap':if(S.sideCtl){S.sideCtl=false;S.sideHidAt=Date.now();clearTimeout(sideT)}else sideShow();break;case'play':if(S.orient==='landscape'&&S.panel==='match')sideShow();if(S.scene!=='player'){if(S.scene==='detail'&&S.dFull!=null)S.sub=S.dFull;S.scene='player';S.orient='portrait';if(S.tab!==2)S.prevTab=S.tab;S.tab=2;S.dFull=null;S.newEv=false;S.playing=true;if(!fin())S.minute=S.live}else S.playing=!S.playing;break;
 case'rotate':S.orient=S.orient==='portrait'?'landscape':'portrait';S.panel=null;break;
 case'vtap':S.controls=!S.controls;break;
 case'openmatch':if(S.settings.ext){if(S.orient==='landscape'){S.panel='match';S.lpTab=1}else{if(S.tab!==2)S.prevTab=S.tab;S.tab=2;S.newEv=false}}break;case'openstats':{S.dplayOn=false;const b=$('#screen .pbody');S.dRet=b?b.scrollTop:0;S.dFull=S.sub=+ds.v;break}case'dback':S.dFull=null;S.dRestore=S.dRet||0;break;
 case'panel':S.panel=ds.v||null;if(ds.v==='match'){S.lpTab=1;sideShow()}if(ds.v==='programs')S.lpTab=0;if(S.panel)S.newEv=false;break;
 case'lptab':S.lpTab=+ds.v;break;case'ovtab':S.panel=['channels','programs','match'][+ds.v];break;case'toastgo':S.toast=null;if(S.orient==='landscape'){S.panel='match';S.lpTab=1}else S.tab=2;S.sub=0;S.newEv=false;break;
 case'back10':S.minute=clamp(S.minute-1/6,-10,S.live);break;case'fwd10':S.minute=clamp(S.minute+1/6,-10,S.live);break;
 case'dtab':S.dTab=+ds.v;break;case'other':showToast({kind:'plain',txt:'(mimo prototyp)'},1600);break;case'undim':resetIdle();return;default:return}
 if(S.panel&&S.panel!==pPrev)S.anim=true;
 render()}
let hashView=null;
function fromHash(){const h=location.hash.replace(/^#/,'');if(!h)return;h.split('&').forEach(kv=>{const[k,v]=kv.split('='),n=+v;
 switch(k){case'platform':S.platform=v==='and'?'and':'ios';break;case'form':S.form=v==='tab'?'tab':'phone';break;case'orient':S.orient=v;break;case'scene':S.scene=v;break;case'tab':S.tab=n;break;case'sub':S.sub=n;break;case'team':S.team=n;break;
  case'minute':S.minute=n;break;case'live':S.live=n;break;case'hide':S.settings.hide=v==='1';break;case'ext':S.settings.ext=v!=='0';break;case'mute':S.settings.mute=v==='1';break;
  case'sheet':S.sheet=v||null;break;case'sheetfrom':S.sheetFrom=v;break;case'panel':S.panel=v||null;break;case'lptab':S.lpTab=n;break;case'notes':S.notes=v!=='0';break;
  case'solo':document.body.classList.add('solo');break;case'dim':S.dimOn=v!=='0';break;case'idle':S.idle=v==='1';S.idleHold=true;break;case'controls':S.controls=v!=='0';break;case'dtab':S.dTab=n;break;case'dfull':S.dFull=S.sub=n;break;
  case'toast':if(v==='goal')S.toast={kind:'ev',e:M.ev[5]};if(v==='card')S.toast={kind:'ev',e:M.ev[6]};if(v==='sub')S.toast={kind:'ev',e:M.ev[4]};break;case'view':hashView=v;break;case'scroll':S.scrollTo=n;break;}})}
function syncDplay(){const b=$('#screen .dpage .pbody'),f=$('#screen .dpage .dplay'),pb=$('#screen .dpage .playbtn');if(!b||!f||!pb)return;
 S.dplayOn=pb.getBoundingClientRect().bottom<b.getBoundingClientRect().top+56;f.classList.toggle('on',S.dplayOn)}
function init(){fromHash();setupVideo();$('#screen').addEventListener('scroll',syncDplay,true);$('#screen').addEventListener('scroll',syncMini,true);$('#screen').addEventListener('scroll',syncGh,true);
 $('#screen').addEventListener('click',e=>{if(e.target.classList&&e.target.classList.contains('lov')){act('panel',{v:''});return}const el=e.target.closest('[data-act]');if(!el)return;act(el.dataset.act,el.dataset,el)});
 $('#screen').addEventListener('pointermove',()=>{if(S.idle)resetIdle()});
 $('#screen').addEventListener('pointerdown',e=>{resetIdle();const sb=e.target.closest('.seekbar');if(!sb)return;e.preventDefault();
  const mv=ev=>{const r=($('.seekbar')||sb).getBoundingClientRect();S.minute=clamp((ev.clientX-r.left)/r.width*90,0,S.live);render()};mv(e);
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};addEventListener('pointermove',mv);addEventListener('pointerup',up)});
 $('#ctl').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.c){S[b.dataset.c]=b.dataset.v;if(b.dataset.c==='scene'){S.dFull=null;if(b.dataset.v!=='player')S.orient='portrait'}render()}
  else if(b.dataset.preset){const[m,l]=b.dataset.preset.split(',').map(Number);S.live=l;S.minute=m;S.revealed=false;render()}
  else if('sim' in b.dataset){S.sim?stopSim():startSim()}
  else if('toast' in b.dataset){const ok=M.ev.filter(e=>!e.end&&!(hideNow()&&e.type==='goal')),past=ok.filter(e=>e.min<=S.minute),ev=past.length?past:ok;demoT=(demoT+1)%ev.length;showToast({kind:'ev',e:ev[demoT]});render()}
  else if('reset' in b.dataset){stopSim();Object.assign(S,JSON.parse(JSON.stringify(DEF)));render()}});
 $('#ctl').addEventListener('input',e=>{const t=e.target;
  if(t.dataset.r){const v=+t.value;if(t.dataset.r==='live'){S.live=v;if(S.minute>v)S.minute=v}else S.minute=Math.min(v,S.live);render({noCtl:true});$('#l-minute').textContent=Math.floor(S.minute)+"'";$('#l-live').textContent=Math.floor(S.live)+"'";const mr=$('[data-r="minute"]');if(mr&&+mr.value!==Math.floor(S.minute))mr.value=Math.floor(S.minute)}
  else if(t.dataset.s){S.settings[t.dataset.s]=t.checked;if(t.dataset.s==='hide')S.revealed=false;if(t.dataset.s==='ext'&&!t.checked&&S.tab===2)S.tab=0;render()}
  else if(t.dataset.o){S[t.dataset.o]=t.checked;render();if(t.dataset.o==='dimOn')resetIdle()}});
 $$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.view').forEach(v=>v.classList.toggle('on',v.id===b.dataset.view));if(b.dataset.view==='v-proto')render();if(b.dataset.view==='v-alt')renderAlts()});
 addEventListener('resize',()=>{if($('#v-proto').classList.contains('on'))render()});
 render();if(S.scrollTo){$$('.lovbody,.lpanel .pane,.pl .pane,.pbody').forEach(e=>e.scrollTop=S.scrollTo)}resetIdle();if(hashView){const b=$(`.tabs button[data-view="v-${hashView}"]`);if(b)b.click()}}

/* ---------- alternativy umístění ---------- */
function renderAlts(){const host=$('#alts');if(host.dataset.done)return;host.dataset.done=1;
 const mk=(s,fn)=>{const save=JSON.parse(JSON.stringify(S));Object.assign(S,s);const d=dev();const html=fn();Object.assign(S,save);
  return`<div class="frame"><div class="device" style="border-radius:${d.r*.6}px;padding:6px"><div class="screen" style="width:${d.w}px;height:${d.h}px;border-radius:${(d.r-10)}px;transform:scale(.7);transform-origin:top left;margin:0 ${-d.w*.3}px ${-d.h*.3}px 0;pointer-events:none">${html}</div></div></div>`};
 const base={platform:'and',scene:'player',orient:'portrait',minute:67,live:67,controls:true,sheet:null,toast:null,idle:false,settings:{ext:true,hide:false,mute:false},revealed:false,sub:0};
 const A=mk({...base,tab:2},()=>viewPlayer());
 const B=mk({...base,tab:0},()=>viewPlayer({variant:'sheet'}));
 const C=mk({...base,tab:0},()=>viewPlayer({variant:'strip'}));
 host.innerHTML=`<div class="alt"><h3>A · Třetí záložka „Sportovní statistiky“ <span class="pill-ok">doporučeno</span></h3>${A}<div class="pc"><ul class="l"><li>Žádný nový prvek navigace, reuse Segment-nav</li><li>Video zůstává vidět, jedna ruka</li><li>Na šířku stejná logika jako Kanály / Pořady</li></ul><ul class="l"><li>Záložky přibývají (3 jsou ještě OK)</li><li>Při přepnutí zmizí seznam kanálů</li></ul></div></div>
 <div class="alt"><h3>B · Bottom sheet přes seznam</h3>${B}<div class="pc"><ul class="l"><li>Seznam kanálů zůstává pod sheetem</li><li>Známé gesto tažení</li></ul><ul class="l"><li>Druhý sheet vedle Nastavení = konflikt gest</li><li>Obsah se těžko čte na polovině obrazovky</li><li>Nový vzor, který appka nemá</li></ul></div></div>
 <div class="alt"><h3>C · Proužek „match strip“ pod videem</h3>${C}<div class="pc"><ul class="l"><li>Skóre vidět vždy, i na jiné záložce</li><li>Jednoduchý vstup</li></ul><ul class="l"><li>−48 px výšky (na malém telefonu tlačí seznam)</li><li>Duplikuje pill na videu</li><li>Rozbalení stejně potřebuje panel</li></ul></div></div>`}
document.addEventListener('DOMContentLoaded',init);
})();
