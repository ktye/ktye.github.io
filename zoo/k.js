import { K  } from '../k.js'
import { D  } from '../draw.js'
import { fs } from './fs.js'


function U(){ return new   Uint32Array(K._.memory.buffer) }
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}

var O
var ctx

function ktry(s){
 try     { let x=K._.repl(K.KC(s)); K.save() }
 catch(e){ console.log(e); K.restore() }
}
function display(){
 let cnv=ce("canvas")
 cnv.id="_cnv"
 cnv.style.position="absolute"
 cnv.style.left=0;
 cnv.style.bottom="0vh"
 cnv.style.zIndex=10;
 ctx=cnv.getContext("2d")
 return cnv
}

function ini(left,o){O=o
 fetch("../readme").then(r=>r.text()).then(r=>{
  let p=ce("pre");p.textContent=r;left.appendChild(p)
  left.appendChild(display())
 });

 var ext={
  init: function( ){O("ktye/k\n ")},
  read: fs.readfile,
  write:function(f,u){if(f==""){O(su(u))}else{fs.writefile(f,u)}},
 }

 fs.init(U,O)

 Object.assign(ext, D)
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
