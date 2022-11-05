<!DOCTYPE html>
<head><meta charset="utf-8">
<link rel=icon href='data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX/AAAAAAD////KksOZAAAAMElEQVR4nGJYtWrVKoYFq1ZxMSyYhkZMgxNRXAwLpmbBCDAXSRZEgAwAGQUIAAD//+QzHr+8V1EyAAAAAElFTkSuQmCC'>
<title>{{title}}</title>

<style>{{k.mode.css}}</style>
<style>{{codemirror.min.css}}</style>
<style>{{foldgutter.css}}</style>
<style>{{show-hint.css}}</style>
<style>
 *{font-family:monospace}
 body{margin:0}
 #left{position:absolute; left:0; top:0}
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
 .CodeMirror{height:100%!important;border:none;resize:none}
 .CodeMirror-selected{background-color:white;outline:2px solid red;outline-offset:-0.5px}
 .CodeMirror-focused .CodeMirror-selected{background-color:#d7d4f0;outline:none}
 .CodeMirror-fullscreen{position:fixed;top:0;left:0;right:0;bottom:0;height:auto;z-index:9}
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
 .hidden{display:none}
</style>
<style id="maincss"></style>

<script>{{jquery.min.js}}</script>
<script>{{codemirror.min.js}}</script>
<script>{{matchbrackets.js}}</script>
<script>{{foldcode.js}}</script>
<script>{{foldgutter.js}}</script>
<script>{{brace-fold.js}}</script>
<script>{{fullscreen.js}}</script>
<script>{{show-hint.js}}</script>
<script>{{k.mode.js}}</script>
<script>{{plot.js}}</script>

</head>


<body onload="init()">
<div id="kde" class="hidden">
 <div id="left" class="left0"></div>
 <pre id="repl" class="repl0 k" spellcheck="false">k</pre>
 <canvas id="canv" class="repl0"></canvas>
 <span id="legn"></span>
 <div id="brow" class="k">
  <div id="bar">
   <button id="runb" class="kdebutton">run</button>
   <button id="putb" class="kdebutton" disabled title="commit file modification">put</button>
   <button id="intr" class="kdebutton" disabled title="interrupt">int</button>
   <input  id="feat" checked type="checkbox" title="switch" style="display:none">
   <input  id="grep"         type="text"     title="input"/>
   <span   id="memo" style="flex-grow:1">0k</span>
   <select id="colb" class="kdebutton" title="columns"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>
   <button id="dlbt" class="kdebutton" title="download bundle file">download</button>
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
let fs={}
let kde=function(){
 let kdefile=true
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
 return {newfile:newfile,kstart:kstart}
}()
</script>


<script>
function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}
function debug(x){ge(x?"kde":"main").classList.remove("hidden");ge(x?"main":"kde").classList.add("hidden")}
window.onkeydown=function(e){if(e.ctrlKey&&e.key=='k'){pd(e);debug(ge("kde").classList.contains("hidden"))}}
let run;ge("runb").onclick=function(e){run()}
function init(){
 let inner=document.documentElement.innerHTML;
 let i=inner.indexOf("/script>\n<!--\n")
 let s=inner.slice(14+i,-13)
 let u=inner.slice(0,i)+"/"+"script>\n<!--\n"
 for(let i=0;;i++){
  let p=s.indexOf("\n")
  let name=s.slice(1,p)
  s=s.slice(p)
  p=s.indexOf("\n\\")
  if(p<0){fs[name]=s.slice(1,p-1);break}
  fs[name]=s.slice(1,1+p)
  s=s.slice(1+p)
 }
 console.log("fs",fs)
 
 let t=document.title
 kde.newfile(".html",fs[".html"])
 kde.newfile(".css",fs[".css"])
 kde.newfile(".js",fs[".js"])
 kde.newfile(".k",fs[".k"])
 
 let pack=function(){
  let b="<!DOCTYPE html>\n"+u
  let k=Object.keys(fs)
  for(let i=0;i<k.length;i++){
   b+="\\"+k[i]+"\n"
   b+=fs[k[i]]
  }
  b+="\n!-->\n</"+"body>\n</"+"html>\n"
  return b
 }
 run=function(){
  kde.kstart(fs[".k"],true)
  let c=ge("maincss");c.innerHTML=fs[".css"]
  let m=ge("main");rm(m);m.insertAdjacentHTML("afterbegin",fs[".html"])
  eval?.(fs[".js"]) //indirect eval in global scope
  debug(false)
  if("function"===typeof main)main()
 }
 
 kdeinit()
 ge("dlbt").onclick=function(){download(t+".html",us(pack()))}
 run()
}
</script>
<!--
\.html
{{html}}
\.css
{{css}}
\.js
{{js}}
\.k
{{k}}
!-->
</body>
</html>
