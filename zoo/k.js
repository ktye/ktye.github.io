import { K  } from '../k.js'
import { fs } from './fs.js'


function U(){ return new   Uint32Array(K._.memory.buffer) }
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function ge(x){return document.getElementById(x)}

var O

function ktry(s){
 try     { let x=K._.repl(K.KC(s)); K.save() }
 catch(e){ console.log(e); K.restore() }
}

function ini(left,o){O=o
 fetch("../readme").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});

 var ext={
  init: function( ){O("ktye/k\n ")},
  read: fs.readfile,
  write:fs.writefile,
 }

 fs.init(U,O)

 K.kinit(ext,"../k.wasm")
 
 tty.drop=function(name,u){
  if(name.endsWith(".k")){O("\\l "+name+"\n"); ktry(u); O(" ")}
 }
 
}

function evl(s){
 O("\n")
 //K._.repl(K.KC(s))
 ktry(s)
 O(" ")
}

let k={ini:ini,evl:evl,src:'k.json'}

export { k }
