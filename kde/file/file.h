<!DOCTYPE html>
<head><meta charset="utf-8">
<link rel=icon href='data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX/AAAAAAD////KksOZAAAAMElEQVR4nGJYtWrVKoYFq1ZxMSyYhkZMgxNRXAwLpmbBCDAXSRZEgAwAGQUIAAD//+QzHr+8V1EyAAAAAElFTkSuQmCC'>
<title>file</title>

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
 button{border:1px solid black;background-color:#fff}
 button:active{transform:translateY(1px)}
 #odir{float:right}
 #expl{margin-top:5px;display:grid;grid-template-columns:repeat(4,1fr);}
 .kfile{color:#a00}
 .curfile{font-weight:bold;background:#bca}
 .modified{text-decoration:underline}
 .kval:hover{color:darkred}
 .kval-pos:{hover:color:darkred;text-decoration:underline}
 .kout{color:red}
 #mono{position:absolute;margin:0;outline:0px;z-index:-1}
</style>

</head>





<body onload="window.init()">
<div id="left" class="left0"></div>
 <pre id="repl" class="repl0 k" spellcheck="false">k</pre>
 <canvas id="canv" class="repl0"></canvas>
 <span id="legn"></span>
 <div id="brow" class="k">
  <div id="bar">
   <button id="runb">run</button>
   <button id="putb" disabled title="write&download">put</button>
   <button id="intr" disabled title="interrupt">int</button>
   <input  id="feat" checked type="checkbox" title="switch">
   <input  id="grep"         type="text"     title="input"/>
   <span   id="memo" style="flex-grow:1">0k</span>
  </div>
  <div id="expl"></div>
 </div>
 <a id="dl" style="display:none"></a>
 <pre id="mono">0 1 2 3 4 5 6 7 8 9 0</pre> <!-- to calculate font metrics -->



<script id="worker1" type="javascript/worker">
let kdefile=true
let srcmapobj={{src.map}}
{{kwork.js}}
</script>


<script>
let kdefile=true
let blob = new Blob([document.querySelector('#worker1').textContent]);
let worker = new Worker(window.URL.createObjectURL(blob));
{{kde.js}}

function addFile(name,s){
 let sp=addfile({name:name})
 delete sp.h //no handle
 sp.u=us(s)
}
</script>



<script>
let fs={} //in-src-fs modified and repacked by the application
let K
let kenv={env:{}} //todo
function init(){
 let inner=document.documentElement.innerHTML;
 let i=inner.indexOf("/script>\n<!--\n")
 let s=inner.slice(14+i,-14)
 let u=inner.slice(0,i)+"\n</"+"script>\n<!--\n"
 for(let i=0;;i++){
  let p=s.indexOf("\n")
  let name=s.slice(1,p)
  s=s.slice(p)
  p=s.indexOf("\n\\")
  if(p<0){fs[name]=s.slice(1,p-1);break}
  fs[name]=s.slice(1,1+p)
  s=s.slice(1+p)
 }
 
 addFile("html",fs["html"])
 addFile("css",fs["css"])
 addFile("js",fs["js"])
 addFile("k",fs["k"])
 
 /*
 let w=fs["d.hx.wasm"]
 let a=new Uint8Array(w.length/2)
 let b=function(x){return x-((x<97)?48:87)}
 for(let i=0;i<a.length;i++)a[i]=b(w.charCodeAt(1+2*i))+16*b(w.charCodeAt(2*i))
 WebAssembly.compile(a).then(x=>WebAssembly.instantiate(x,kenv))
 */
 window.dopack=function(f){
  let b="<!DOCTYPE html>\n"+u
  let k=Object.keys(f)
  for(let i=0;i<k.length;i++){
   b+="\n\\"+k[i]+"\n"
   b+=f[k[i]]
  }
  b+="\n!--></"+"body>\n</"+"html>\n"
  return b
 }
}
</script>
<!--
\html
{{html}}
\css
{{css}}
\js
{{js}}
\k
{{k}}
\d.hx.wasm
{{d.hx.wasm}}
!-->
</body>
</html>
