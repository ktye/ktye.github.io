import { fs } from './fs.js'

var O,K,M,head

function pd(e){if(e){e.preventDefault();e.stopPropagation()}};
function ge(x){return document.getElementById(x)}
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

/* kg.wasm expects these imports:
  (type (;0;) (func (param i32)))
  (type (;1;) (func (param i32 i32) (result i32)))
  (type (;2;) (func))
  (type (;3;) (func (param i32) (result i32)))
  (type (;4;) (func (param i32 i32 i32 i32) (result i32)))
  (type (;5;) (func (result i32)))
  (type (;6;) (func (param i32 i32)))
  (type (;7;) (func (param i32 i32 i32) (result i32)))
  (type (;8;) (func (param i32 i32 i32)))
  (type (;9;) (func (param i32 i32 i32 i32)))
  (type (;10;) (func (param i32 i32 i32 i32 i32 i32) (result i32)))
  (import "env" "fgetc" (func $fgetc (type 3)))
  (import "env" "fwrite" (func $fwrite (type 4)))
  (import "env" "putc" (func $putc (type 1)))
  (import "env" "ungetc" (func $ungetc (type 1)))
  (import "env" "fread" (func $fread (type 4)))
  (import "env" "fopen" (func $fopen (type 1)))
  (import "env" "feof" (func $feof (type 3)))
  (import "env" "malloc" (func $malloc (type 3)))
  (import "env" "remove" (func $remove (type 3)))
  (import "env" "clock" (func $clock (type 5)))
  (import "env" "rand" (func $rand (type 5)))
*/
 let env={env:{
  fgetc:   fs.getc,
  fwrite:  fs.fwrite,
  fread:   fs.fread,
  putc:    fs.putc,
  ungetc:  fs.ungetc,
  fopen:   fs.fopen,
  feof:    fs.feof,
  remove:  fs.remove,
  malloc:  function(n){let r=head;head+=n;console.log("malloc",head,n,(head+n)/1024/1024,"MB");return r},
  clock:   function( ){return Date().now()},
  rand:    function( ){return Math.trunc(Math.random()*2147483647)},
 }}

 
 fetch('./klong/kg.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  K.memory.grow(1024) // 1024*64kb => 64MB
  M=r.instance.exports.memory.buffer
  head=r.instance.exports.__heap_base
  fs.init(U,O)

/* this runs out of memory. maybe because of reallocations. we need a better malloc.
  fetch('./klong/klong.image').then(r=>r.arrayBuffer()).then(r=>{
   fs.u[3]=new Uint8Array(r)
   K.kginit(1) // load klong.image runs out of memory
  })
*/

  K.kginit(0)
 })
}

function evl(s){
 O("\n")
 setinput(s+"\n");
 K.rep();
}

let klong={ini:ini,evl:evl,src:"./klong/klong.json"}
export { klong }
