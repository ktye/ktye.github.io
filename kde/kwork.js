
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
 let  ext={}
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
 K.kinit(ext,"../k.wasm")
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
 if(p)postMessage({"m":"indicate","p":p})
}

