import { K } from '../k.js'

function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}

var O

function ini(left,o){O=o
 fetch("../readme").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});

 var ext={
  init: function( ){O("ktye/k\n ")},
  read: function(x){return new Uint8Array(0)},
  write:function(x,y){if(x===""){O(su(y))}},
 }

 K.kinit(ext,"../k.wasm")
}

function evl(s){
 O("\n")
 K._.repl(K.KC(s))
 O(" ")
}

let k={ini:ini,evl:evl,src:'k.json'}

export { k }
