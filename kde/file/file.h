<!DOCTYPE html>
<head><meta charset="utf-8">
<link rel=icon href='data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX/AAAAAAD////KksOZAAAAMElEQVR4nGJYtWrVKoYFq1ZxMSyYhkZMgxNRXAwLpmbBCDAXSRZEgAwAGQUIAAD//+QzHr+8V1EyAAAAAElFTkSuQmCC'>
<title>{{title}}</title>

<style>
 *{font-family:monospace}
 body{margin:0;overflow:hidden}
 #left{position:absolute; left:0; top:0; background:#ffe; resize:none; border:none; outline:none}
 .left0{width:50vw;height:100vh;}
 .left1{width:100vw;height:50vh;}
 #repl{box-sizing: border-box;border-left:1px solid black;;background-color:#fff; position:absolute; margin:0;outline:0px;overflow:auto}
 .repl0{left:50vw; width:50vw; height:50vh; top:0;} 
 .repl1{left:0; width:50vw; height:50vh; top:50vh;} 
 #repl.k{border:none}
 #canv{position:absolute;z-index:-1}
 .can1{left:0;top:0;width:100vw;height:100vh}
 #legn{position:absolute;z-index:20;top:0;right:5px}
 [contenteditable]:focus{outline:0px solid transparent}
 #brow{box-sizing: border-box;border-left:1px solid black; position:absolute;overflow:auto; left:50vw; width:50vw; height:50vh; top:50vh;}
 #brow.k{background-color:#efe;border:none}
 #bar{display:flex;flex-direction:row}
 .kdebutton{border:1px solid black;background-color:#fff}
 .kdebutton:active{transform:translateY(1px)}
 #odir{float:right}
 #expl{margin-top:5px;display:grid;grid-template-columns:repeat(4,1fr);}
 .kfile{color:#a00}
 .curfile{font-weight:bold;background:#bca}
 .modified{text-decoration:underline}
 .kval:hover{color:darkred}
 .kval-pos:{hover:color:darkred;text-decoration:underline}
 .kout{color:red}
 #mono{position:absolute;margin:0;outline:0px;z-index:-1}
 .hidden{visibility:hidden} /*consize needs "mono" and "repl"*/
</style>
<style id="maincss"></style>
<script>/*{{ plot.js }}*/function plot(){console.log("plot nyi")}</script>

</head>


<body onload="init()">
<div id="kde" class="hidden">
 <textarea id="left" class="left0" spellcheck="false"></textarea>
 <pre id="repl" class="repl0 k" spellcheck="false">k</pre>
 <canvas id="canv" class="repl0"></canvas>
 <span id="legn"></span>
 <div id="brow" class="k">
  <div id="bar">
   <button id="stab" class="kdebutton" title="restart application">start</button>
   <button id="putb" class="kdebutton" disabled title="commit file modification">put</button>
   <button id="runb" class="kdebutton" title="run .k">k</button>
   <button id="intr" class="kdebutton" disabled title="interrupt">int</button>
   <input  id="feat" checked type="checkbox" title="switch" style="display:none">
   <span   id="memo" style="flex-grow:1">0k</span>
   <select id="colb" class="kdebutton" title="columns"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>
   <button id="dlbt" class="kdebutton" title="download file bundle">html</button>
   <button id="dlct" class="kdebutton" title="download kde file">kde</button>
  </div>
  <div id="expl"></div>
 </div>
 <a id="dl" style="display:none"></a>
 <pre id="mono">0 1 2 3 4 5 6 7 8 9 0</pre> <!-- to calculate font metrics -->
</div>
<main id="main"></main>

<script id="worker1" type="javascript/worker">
let kdefile=true
let srcmapobj={{src.map}}
let instance=(kw,initk)=>{WebAssembly.instantiate(binsize(kw.buffer),kenv ).then(initk)}
{{kwork.js}}
</script>

<script>
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}
let kde=(function(){
 let kdefile=true
 let kmode=x=>{}
 let cminit=function(){
  ed=ge("left")
  ed.getValue=function(){return ed.value}
  ed.setValue=function(x){ed.value=x}
  ed.setOption=function(o){}
  ed.onchange=modify
 }
 let newkw=()=>{kw=new Worker(window.URL.createObjectURL(new Blob([document.querySelector('#worker1').textContent])),{name:"kwork"})}
 let showpos=(i)=>{ed.selectionStart=i;ed.selectionEnd=1+i;ed.focus()}
 let blob = new Blob([document.querySelector('#worker1').textContent]);
 let worker = new Worker(window.URL.createObjectURL(blob));
 {{kde.js}}
 ge("putb").onclick=function(){ed.sp.u=us(ed.getValue());fs[ed.sp.textContent]=su(ed.sp.u);ed.sp.classList.remove("modified");unmodify()}
 let newfile=function(name,s){
  let sp=addfile({name:name})
  delete sp.h //no handle
  sp.u=us(s)
 }
 zk={{z.k}}
 let setfile=function(name){openfile(findfile(name),ge("expl"))}
 let kpost=function(x){kw.postMessage(x)}
 let kdefilesys=function(){let ex=ge("expl"),fs={};let a=ex.children;for(let i=0;i<a.length;i++)fs[a[i].textContent]=su(a[i].u);return fs}
 return {newfile:newfile,setfile:setfile,fs:kdefilesys,kstart:kstart,kpost:kpost,err:err}
})()
</script>


<script>
let fs={{fs}}
let kuid=0
let kresolv={}
let kreject={}

function u64s(s){let c=function(x){const r=new Uint8Array(x.length);for(let i=0;i<x.length;i++)r[i]=x.charCodeAt(i);return r};return c(atob(s))}
function s64u(u){let c=function(x){let r='';for(let i=0;i<x.length;i++)r+=String.fromCharCode(x[i]);return r};return btoa(c(u))}
function lz(x){let i=7,j,n,t,c,o,r=[],S=-(1<<31),R=(x,a,n)=>{for(j=0;j<n;j++)r.push(x[a+j]);return n},
 h=()=>x[i++]|x[i++]<<8,C=()=>{if(c===15)do{c+=x[i]}while(x[i++]==255)},
 d=n=>{while(i<n){t=x[i++];c=t>>4;C();i+=R(x,i,c);if(i<n){c=t&15;o=r.length-h();C();R(r,o,4+c)}}}
 while(n=h()|h()<<16)(n&S)?i+=R(x,i,n&~S):d(i+n);return new Uint8Array(r)}
function debug(x){ge(x?"kde":"main").classList.remove("hidden");ge(x?"main":"kde").classList.add("hidden")}
function download(name,u){
 var dl=ge("dl");var b=new Blob([u],{type:"application/octet-stream"})
 dl.href=URL.createObjectURL(b);dl.download=name;dl.click()
}
window.onkeydown=function(e){if(e.ctrlKey&&e.key=='k'){pd(e);debug(ge("kde").classList.contains("hidden"))}}
let start;ge("stab").onclick=function(e){start()}
window.ondragover=function(e){pd(e)}

window.ondrop=function(e){pd(e);
 let kdesplit=function(s){
  let fs={},v=s.split("\n");let f="";fs[f]=[]
  for(let i=0;i<v.length;i++){let l=v[i]
   if((l.length>6)&&l.startsWith("///")&&l.endsWith("///")){f=l.slice(3,l.length-3);fs[f]=[]}
   else fs[f].push(l)
  };delete fs[""];
  let k=Object.keys(fs);for(let i=0;i<k.length;i++)fs[k[i]]=fs[k[i]].join("\n")
  return fs}
 let l=e.dataTransfer.files
 for(let i=0;i<l.length;i++){
  let f=l.item(i);
  f.arrayBuffer().then(u=>{
   if(f.name.endsWith(".kde")){fs=kdesplit(su(u));init()}
   else if(typeof dropfile!=='undefined')dropfile(f.name,u) //application defined handler
   else kde.newfile(f.name,su(u))                           //default: add to fs
})}}


function k(f,...a){ //kcall
 let jstack=new Error().stack
 kuid++
 let p=new Promise(function(xx,yy){kresolv[kuid]=xx;kreject[kuid]=yy
  kde.kpost({m:"kcall",uid:kuid,f:f,a:a,jstack:jstack})
 })
 return p
}
function kres(m){
 if("e"in m)kde.err(m.e,m.jstack) //kreject[m.uid](m.e) //todo js indicate
 else       kresolv[m.uid](m.r)
 delete     kresolv[m.uid];delete kreject[m.uid]
}
function init(){
 let kw=lz(u64s("{{d.wasm.lz4}}"))
 let inner=document.documentElement.innerHTML;
 let t=document.title
 
 let pack=function(){fs=kde.fs()
  let b="<!DOCTYPE html>\n"+inner+"</"+"html>"
  let i=b.indexOf("\nlet fs={")
  let n=1+b.slice(1+i).indexOf("\n")
  let newfs="\nlet fs="+JSON.stringify(fs)
  return b.slice(0,i)+newfs+b.slice(i+n)
 }
 let kdepack=function(){fs=kde.fs()
  let k=Object.keys(fs);let o=""
  for(let i=0;i<k.length;i++){let name=k[i];o+=((i==0||o.endsWith("\n"))?"":"\n")+"///"+name+"///\n"+fs[name]}
  return o
 }
 start=function(){
  kde.kstart(".k",true,kw)
  let c=ge("maincss");c.innerHTML=fs[".css"]
  let m=ge("main");rm(m);m.insertAdjacentHTML("afterbegin",fs[".html"])
  eval?.(fs[".js"]) //indirect eval in global scope
  debug(false)
  if("function"===typeof main)main()
 }
 let krun=ge("runb").onclick //from kde
 ge("runb").onclick=function(e){kde.setfile(".k");krun()}
 
 kdeinit()
 kde.newfile(".html",fs[".html"])
 kde.newfile(".css",fs[".css"])
 kde.newfile(".js",fs[".js"])
 kde.newfile(".k",fs[".k"])
 kde.setfile(".k")
 ge("dlbt").onclick=function(){download(t+".html",us(pack()))}
 ge("dlct").onclick=function(){download(t+".kde",us(kdepack()))}
 start()
}
</script>
</body>
</html>
