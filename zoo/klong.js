
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

let buf = new Uint8Array([])
let bp = 0
function setinput(s){s+=" ";bp=0;buf=us(s);buf[buf.length]=0; }


let fs = {}
fs.name = {"/dev/stdin":0,"/dev/stdout":1,"/dev/stderr":2,"./klong.image":3}
fs.u    = [[],[],[],[]]
fs.rp   = [0, 0, 0, 0 ]
fs.wp   = [0, 0, 0, 0 ]
function fsfind(x){for(let i=0;i<fs.name.length;i++){if(fs[i].name==x)return x};return -1}
function fsopen(x,y){
 let file=s0(x);
 let mode=s0(y);
 console.log("fopen",file,mode)
 if(mode=="r"||mode=="rb"||mode=="a") {
  let i=fs.name[file]
  if(i===undefined) {console.log("not found");return 0}
  if(mode=="a") fs.wp[i]=fs.u[i].length
  else          fs.rp[i]=0
  return i
 }
 if(mode=="w"){
  let i=fs.name[file]
  if(i===undefined){
   i=fs.rp.length
   fs.name[file]=i
   fs.u.push(new Uint8Array([]))
   fs.rp.push(0)
   fs.wp.push(0)
  }
  return i
 }else console.error("fsopen unknown mode:", mode)
}
function fsgetc(fp){
 console.log("fsgetc",fp)
 let u=fs.u[fp]
 let p=fs.rp[fp]
 if(p==u.length) return -1
 let r=u[p];p++;fs.rp[fp]=p
 console.log("r=>",r)
 return r
}
function fseof(fp){ return fs.rp[fp]<fs.u[fp].length }
function fswrite(fp,d){
 console.log("fswrite",fp,d)
 let u=fs.u[fp]
 let p=fs.wp[fp]
 if(p==0){
  fs.u[fp]=d
  fs.wp[fp]=d.length
 }else{
  let r=new Uint8Array(p+d.length)
  r.set(u.slice(0,p))
  r.set(d,p)
  fs.u[fp]=r
  fs.wp[fp]=r.length
 }
 console.log("fswrite=>",fs.u[fp])
}
function fsread(dst,s,n,fp){
 console.log("fsread",dst,s,n,fp)
 let src=fs.u[fp]
 let p=fs.rp[fp]
 console.log("s*n",s*n)
 let x=src.slice(p,p+s*n)
 console.log("src", x)
 U().set(x,dst)
 console.log("wrote:",U().slice(dst,dst+s*n))
 console.log("return",n)
 return n
}


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
  fgetc:   function(x){if(x!=0)return fsgetc(x);if(bp==buf.length)return -1;let r=buf[bp];bp++;return r},
  fwrite:  function(a,b,c,d){write(d,U().slice(a,a+b*c));return c;},
  fread:   fsread,
  putc:    function(x,y){write(y,new Uint8Array([x]));return x;},
  ungetc:  function(x,y){console.log("ungetc",x,y);if(x)console.error("ungetc not stdin");bp--},
  fopen:   fsopen,
  feof:    function(x){if(x)return fseof(x);return 0},
  malloc:  function(n){let r=head;head+=n;console.log("malloc",head,n,(head+n)/1024/1024,"MB");return r},
  remove:  function(x){console.log("remove");return -1},
  clock:   function( ){return Date().now()},
  rand:    function( ){return Math.trunc(Math.random()*2147483647)},
 }}

 
 fetch('./klong/kg.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  K.memory.grow(1024) // 1024*64kb => 64MB
  M=r.instance.exports.memory.buffer
  head=r.instance.exports.__heap_base

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
