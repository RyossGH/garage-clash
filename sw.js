// Garage Clash — mode hors-ligne
// La page est servie « réseau d'abord » (les mises à jour arrivent tout de suite),
// les images « cache d'abord ». Changer VERSION si des images existantes sont remplacées.
const VERSION='gc-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// La page envoie la liste des images : on les met en cache en tâche de fond, quelques-unes à la fois
self.addEventListener('message',e=>{
  if(!e.data||e.data.type!=='precache')return;
  e.waitUntil(caches.open(VERSION).then(async c=>{
    const todo=[];for(const u of e.data.urls){if(!(await c.match(u)))todo.push(u)}
    for(let i=0;i<todo.length;i+=8)await Promise.all(todo.slice(i,i+8).map(u=>c.add(u).catch(()=>{})));
  }));
});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin){
    if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))
      e.respondWith(caches.open(VERSION).then(async c=>{const m=await c.match(r);if(m)return m;const res=await fetch(r);c.put(r,res.clone());return res}));
    return;
  }
  if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));return res})
      .catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res})));
});
