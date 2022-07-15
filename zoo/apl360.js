import { K } from '../k.js'

function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}

var O

function ini(left,o){O=o
 fetch("../apl.k").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});



 var ext={
  init: function( ){fetch("../apl.k").then(r=>r.text()).then(s=>K.Kx(".",K.KC(s)));},
  read: function(x){return new Uint8Array(0)},
  write:function(x,y){if(x===""){O(su(y))}},
 }

 K.kinit(ext,"../k.wasm")
}

function evl(s){
 O("\n")
 K.unref(K.Kx("APL",K.KC(s)))
 O("      ")
}

let apl360={ini:ini,evl:evl,src:"../apl.k"}

export { apl360 }
