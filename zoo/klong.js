import { fs }    from './fs.js'
import allocator from './ma.js'

var O,K,M,ma

function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function us(s){return new TextEncoder("utf-8").encode(s)}
function s0(x){let i=U().slice(x);return su(i.slice(0,i.indexOf(0)))}
function U(  ){return new Uint8Array(M)}
function I(  ){return new Int32Array(M)}

function write(f,u){
 if(f<3) O(su(u))
 else    fswrite(f,u)
}

function setinput(s){s+=" ";let buf=us(s);buf[buf.length]=0; fs.setinput(buf) }

function ini(left,out){O=out
  fetch("./klong/klong-qref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent="t3x.org/klong\n"+r;left.appendChild(p)});

 let env={env:{
  fgetc:   fs.getc,
  fwrite:  fs.fwrite,
  fread:   fs.fread,
  putc:    fs.putc,
  ungetc:  fs.ungetc,
  fopen:   fs.fopen,
  feof:    fs.feof,
  remove:  fs.remove,
  malloc:  function( x ){return ma.malloc(x)}, 
  realloc: function(x,y){return ma.realloc(x,y)},
  free:    function( x ){return ma.free(x)},
  clock:   function(   ){return Date().now()},
  rand:    function(   ){return Math.trunc(Math.random()*2147483647)},
 }}

 
 fetch('./klong/kg.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  K.memory.grow(1024) // 1024*64kb => 64MB
  M=r.instance.exports.memory.buffer
  ma=new allocator(K.__heap_base,K.memory)
  fs.init(U,O)

  fetch('./klong/klong.image').then(r=>r.arrayBuffer()).then(r=>{
   fs.writefile("./klong.image", new Uint8Array(r))
   K.kginit(1)
  })

  // K.kginit(0) // without image
 })
}

function evl(s){
 O("\n")
 setinput(s+"\n");
 K.rep();
}

let klong={ini:ini,evl:evl,src:"./klong/klong.json"}
export { klong }
