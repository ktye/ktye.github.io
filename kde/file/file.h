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
<script>{{plot.js}}</script>

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
   <input  id="grep"         type="text"     title="input"/>
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

function uncompress(x){ //from SnappyJs 0.7.0 Zhipeng Jia (MIT) https://github.com/zhipeng-jia/snappyjs
 let uclen=function(x){let p=0,r=0,s=0,c,v
  while(s<32&&p<x.length){c=x[p];p+=1;v=c&0x7f;
   if(((v<<s)>>>s)!==v)return -1;r|=v<<s;if(c<128)return[r,p];s+=7
  };return -1}
 let cp=function(x,a,y,b,n){for(let i=0;i<n;i++)y[b+i]=x[a+i]}
 let scb=function(x,p,o,n){for(let i=0;i<n;i++)x[p+i]=x[p-o+i]}
 let dectob=function(r,x,p){let n=x.length,q=0,c,l,s,o,W=[0,0xff,0xffff,0xffffff,0xffffffff]
  while(p<n){c=x[p];p++
   if((c&0x3)===0){l=(c>>>2)+1
    if(l>60){if(p+3>=n)return false;s=l-60;l=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);l=(l&W[s])+1;p+=s}
    if(p+l>n)return false;cp(x,p,r,q,l);p+=l;q+=l
   }else{switch(c&0x3){
    case 1:l=((c>>>2)&0x7)+4;o=x[p]+((c>>>5)<<8);p+=1;break
    case 2:if(p+1>=n)return false;l=(c>>>2)+1;o=x[p]+(x[p+1]<<8);p+=2;break
    case 3:if(p+3>=n)return false;l=(c>>>2)+1;o=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);p+=4;break
    default:break}
    if(o===0||o>q)return false
    scb(r,q,o,l);q+=l
  }};return true}
 let [n,p]=uclen(x);let r=new Uint8Array(n);dectob(r,x,p);return r}
function b64dec(s){
 const y=[
  255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
  255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
  255,62,255,255,255,63,52,53,54,55,56,57,58,59,60,61,255,255,255,0,255,255,255,0,1,2,
  3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,
  255,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
  let g=function(c){
   if(c>=y.length)throw new Error("b64");
   const o=y[c];if(o===255)throw new Error("b64")
   return o;}
  if(s.length%4!==0)throw new Error("b64");
   const i=s.indexOf("=");if (i!==-1&&i<s.length-2)throw new Error("b64");
   let m=s.endsWith("==")?2:s.endsWith("=")?1:0,
   n=s.length,r=new Uint8Array(3*(n/4)),b;
   for(let i=0,j=0;i<n;i+=4,j+=3){
    b=g(s.charCodeAt(i))<<18|g(s.charCodeAt(i+1))<<12|g(s.charCodeAt(i+2))<<6|g(s.charCodeAt(i+3));
    r[j]=b>>16;r[j+1]=(b>>8)&0xFF;r[j+2]=b&0xFF;}
   return r.subarray(0,r.length-m);}
let dwasm=function(){
 let w="{{d.wasm.z}}"
 return uncompress(b64dec(w))
}
let kdefile=true
let srcmapobj={{src.map}}
{{kwork.js}}
</script>

<script>
let kde=function(){
 let kdefile=true,cmedit=false
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
}()
</script>


<script>
let fs={{fs}}
let kuid=0
let kresolv={}
let kreject={}
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}
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
  kde.kstart("",true)
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
