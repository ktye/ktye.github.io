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
   <button id="dlbt" class="kdebutton" title="download file bundle">download</button>
  </div>
  <div id="expl"></div>
 </div>
 <a id="dl" style="display:none"></a>
 <pre id="mono">0 1 2 3 4 5 6 7 8 9 0</pre> <!-- to calculate font metrics -->
</div>
<main id="main"></main>

<script id="worker1" type="javascript/worker">
 
let dwasm=function(){
 let w="{{d.hx.wasm}}"
 let a=new Uint8Array(w.length/2)
 let b=function(x){return x-((x<97)?48:87)}
 for(let i=0;i<a.length;i++)a[i]=b(w.charCodeAt(1+2*i))+16*b(w.charCodeAt(2*i))
 return a
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
 return {newfile:newfile,setfile:setfile,kstart:kstart,kpost:kpost,err:err}
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
 
 let pack=function(){
  let b="<!DOCTYPE html>\n"+inner+"</"+"html>"
  let i=b.indexOf("\nlet fs={")
  let n=1+b.slice(1+i).indexOf("\n")
  let newfs="\nlet fs="+JSON.stringify(fs)
  return b.slice(0,i)+newfs+b.slice(i+n)
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
 start()
}
</script>
</body>
</html>
