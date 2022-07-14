

function pd(e){if(e){e.preventDefault();e.stopPropagation()}};
function ge(x){return document.getElementById(x)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function us(s){return new TextEncoder("utf-8").encode(s)}

var J,M,O
function m(x){ M+=x;return M-x;                       }
function u( ){ return new Uint8Array(J.memory.buffer) }
function n(x){ return u().slice(x).indexOf(0)         }
function p(x){ O(su(u().slice(x,x+n(x))));return 0    }
function d(x){ tty.value+=String(u()[x])+" "          }
function A(s){ let x=us(s);let r=m(1+x.length);let d=u();d.set(x,r);d[r+x.length]=0;return r}

function ini(left,o){O=o
 fetch("../j/j00/j.c"   ).then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 
 let env={env:{
  printf:function(x,y){return y?d(y):p(x)},
  malloc:m,
  strlen:n,
 }}
 
 fetch('../j/j00/j.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  J=r.instance.exports
  M=J.__heap_base.value
 })
}

function evl(s){
 J.j(A(s))
 O(" ")
}

let j0={ini:ini,evl:evl}

export { j0 }
