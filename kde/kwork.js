
import {K} from '../k.js'

const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)

onmessage=function(e){
 switch(e.data.m){
 case"start":kstart(e.data);break
 case"repl" :repl(e.data)  ;break
 default:console.log("kwork: unknown message:", e)
 }
}
onerror=function(e){
 console.log("kwork error",e.message,e)
}

function memory(){
 let m=K._.memory.buffer.byteLength>>>10
 return (m>1000)?((m>>>10)+"M"):m+"k"
}

function kstart(d){let s=d.s
 fstack=[],kerr=[]
 let  ext={fpush:fpush,fpop:fpop,Trap:Trap}
 ext.init= function(){
  if(("string"==typeof s)&&(s!="")){
   t0=performance.now()
   try     { K._.repl(K.KC(s)) }
   catch(e){ indicate() }
  }
  if(s=="")postMessage({m:"write",f:"",u:us("ktye/k "+K.n+"\n ")});
 }
 //ext.read=d.r
 ext.write=function(f,u){
  postMessage({m:"write",f:f,u:u,mem:memory()+" "+dt()})
 }
 K.kinit(ext,(d.trc===true)?"../d.wasm":"../k.wasm")
}


function repl(d){
 t0=performance.now()
 try     {K._.repl(K.KC(d.s));K.save()}
 catch(e){indicate(); K.restore()}
 postMessage({m:"write",f:"",u:us(" ")})
}

let t0
function dt(){
  let ms=performance.now()-t0
  if(ms>1000)return Math.floor(ms/1000)+"s"
  if(ms<1)   return Math.floor(ms*1000)+"µs"
  return Math.floor(ms)+"ms"
}

function indicate(){
 let p=K._.Srcp()
 if(p)postMessage({"m":"indicate","p":p,"e":(kerr.length)?kerr[0]:"","l":(kerr.length)?kerr[1]:"","stack":printstack()})
}

//debugger(d.wasm)
let srcmap, kerr=[]
fetch("../src.map").then(r=>r.json()).then(r=>{srcmap=r})

let fstack=[]
function fpush(f,x){fstack.push([f,x])}
function fpop(){fstack.pop()}
function Trap(p,e,sp,s){
 var e="err type value index length rank parse stack grow unref io nyi".split(" ")[e]
 kerr=[e+":"+srcmap[p].replace(" ",":"), "https://github.com/ktye/i/tree/master/"+srcmap[p].replace(" ","#L")]
}
function lo(x){return Number(BigInt.asUintN(32,x))}         // 32-bit of BigInt serves as the wasm memory index (pointer).
function printstack(){let r=[]
 for(let j=0;j<fstack.length;j++){
  let i=fstack.length-1-j
  let f=fstack[i]
  let t=K.TK(f[0])
  const v=" :+-*%&|<>=~!,^#_$?@."
  if(t=="l")t="λ"
  if(t=="0"){let n=lo(f[0]);if(n&&n<v.length)t=v[n];else if((-1<n-64)&&(n-64)<v.length)t=v[n-64];else t="`"+String(n)}
  let m=Number(BigInt.asUintN(32,f[0]>>BigInt(32))&BigInt(0xffffff))
  r.push({"s":t+K.NK(f[1]),"p":m})
 }
 return r
}


/*kdb

function ce(x) { return document.createElement(x) }
function ge(x) { return document.getElementById(x) }
function rm(p){while(p.firstChild)p.removeChild(p.firstChild)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function C(){ return new     Int8Array(K._.memory.buffer) }
function U(){ return new   Uint32Array(K._.memory.buffer) }
function I(){ return new    Int32Array(K._.memory.buffer) }
function J(){ return new BigInt64Array(K._.memory.buffer) }
function F(){ return new  Float64Array(K._.memory.buffer) }
function con(x){ return ge("out").firstElementChild }

ge("hlp").onclick=function(e){ge("help").classList.toggle("hidden")}
ge("run").onclick=function(e){ //click run button
 fstack=[]
 let v=ge("val");rm(val);delete val.d;delete val.e;delete val.k
 rm(ge("msg"))
 rm(ge("out"))
 rm(ge("crs").firstChild)
 run()
}
function post(){
 con().value=""
 con().readOnly=true
 let c=ge("crs").firstChild
 let src=ge("inp").value
 try     { K._.repl(K.KC(src));c.textContent="no error" }
 catch(e){ console.log(e) }
 srcinp(1)
 setfstk()
 loadsym()
 scrollHi()
}
function run(){
 kweb.init({wasm:"../d.wasm", post:post, ext:{fpush:fpush,fpop:fpop,Trap:Trap}, ak:ge("ak").checked })
}
function scrollHi(){let h=ge("hi");if(h)h.scrollIntoView(false)}

function setfstk(){
 let c=ge("call")
 rm(c)
 for(let j=0;j<fstack.length;j++){let i=fstack.length-1-j
  let f=fstack[i]
  let t=K.TK(f[0])
  const v=" :+-*%&|<>=~!,^#_$?@."
  if(t=="l")t="λ"
  if(t=="0"){let n=lo(f[0]);if(n&&n<v.length)t=v[n];else if((-1<n-64)&&(n-64)<v.length)t=v[n-64];else t="`"+String(n)}
  let m=Number(BigInt.asUintN(32,f[0]>>BigInt(32))&BigInt(0xffffff))
  let o=ce("option");o.textContent=t+" @"+m+" #"+K.NK(f[1])
  o.x=f[1];o.i=m
  c.appendChild(o)
 }
}
ge("call").onchange=function(e){let s=e.target //select call stack
 setcrs(null,s.children[s.selectedIndex].i)
 scrollHi()
 show(K.ref(s.children[s.selectedIndex].x))
}

function srcinp(x){
 let b=["edt","src"]
 ge(b[x-0]).classList.add("selected"); 
 ge(b[1-x]).classList.remove("selected")
 ge("crs").classList[["add","remove"][x]]("hidden")
 ge("inp").classList[["remove","add"][x]]("hidden")
}
ge("edt").onclick=function(){srcinp(0)} //click edt button
ge("src").onclick=function(){srcinp(1)} //click src button

ge("fsym").onchange=function(e){ //search symbol
 let s=e.target.value
 let tab=ge("tab");let opts=tab.children
 for(let i=0;i<opts.length;i++){
  let t=opts[i].textContent
  if(t.startsWith(s)){ tab.selectedIndex=i;opts[i].scrollIntoView();return }
 }
}
function show(x){
 if(-1<"sl".indexOf(K.TK(x)))x=K.Kx(",",x)
 kweb.show(K.Ks("val"),x)
}
 

ge("tab").onchange=function(e){ //select symbol
 let s=e.target
 show(K.ref(s.children[s.selectedIndex].x))
}

function loadsym(){
 let tab=ge("tab");rm(tab)
 let j=J();let i=I()
 let p=i[0] >>> 3
 let q=lo(j[1]) >>> 3
 let n=K.NK(j[0])
 for(let i=0;i<n;i++){
  let o=ce("option");
  let x=j[q+i]
  let s=cc(j[p+i])
  s+="&nbsp;".repeat((s.length>10)?0:10-s.length)
  let t=K.TK(x)
  if(0<="CIFZLDT".indexOf(t))s+=String(K.NK(x))+"#"+t
  else s+=t
  if(0<="0ci".indexOf(t))s+=": "+lo(x)
  o.innerHTML=s
  o.x=x
  tab.appendChild(o)
 }
}
function cc(x){ return su(C().slice(lo(x),lo(x)+K.NK(x))) }

var crst
function setcrs(s,p){p-=1
 let c=ge("crs").firstChild;
 let t=(s!==null)?cc(s):crst
 crst=t
 if((-1<p)&&(p<t.length))
  c.innerHTML=html(t.slice(0,p)) + '<span id="hi">'+t[p]+'</span>'+html(t.slice(1+p))
 else c.textContent=t
}
function html(s){ return s.replace(/[\u00A0-\u9999<>\&]/g,((i)=>`&#${i.charCodeAt(0)};`)) }

kweb.O = function(x){console.log("k>>",x)}


var srcmap=[]
function Trap(p,e,sp,s){
 let x=srcmap[p].replace(" ","#L")
 var e="err type value index length rank parse stack grow unref io nyi".split(" ")[e]
 let a=ce("a");a.href="https://github.com/ktye/i/tree/master/"+x;a.target="_blank";a.innerText=x
 let msg=ge("msg");msg.appendChild(a)
 let t=document.createTextNode(" "+e+" error @"+sp)
 msg.appendChild(t)
 setcrs(s, sp)
}

let h=window.location.hash.slice(1);if(h.length)ge("inp").value=decodeURIComponent(h)
kweb.filedrop(function(name,u){
 if(name.endsWith(".k"))ge("inp").value.su(u)
 else                      kweb.fsadd(name,u)
})

fetch("kdb.help").then(r=>r.text()).then(r=>ge("help").innerHTML=r)

*/
