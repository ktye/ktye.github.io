//k9 web worker

onmessage=function(e){let d=e.data
 switch(d.m){
 case"start"  :start(d.f,d.fs,d.r,d.c,d.w,d.h);break
 case"runfile":runfile(d.f,d.t)               ;break
 case"repl"   :repl(d.t,d.r,d.c,d.w,d.h)      ;break
 default:console.log("kwork: unknown message:", e)
}}
onerror=function(e){
 console.log("kwork error",e.message,e)
}

let O=s=>postMessage({m:"write",t:s})

function start(file,kfs,rows,cols,width,height){
 
 let env={a:{ //k9.wasm import object
   p: function(){console.log("p ___sys_chdir,")},
   w: function(){console.log("w ___sys_dup2,")},
   o: function(x,y){return 0},  //___sys_ftruncate64
   s: function(){console.log("s ___sys_getcwd,")},
   m: mmap2,   //___sys_mmap2
   n: munmap,  //___sys_munmap
   f: open,    //___sys_open
   v: function(){console.log("v ___sys_pipe,")},
   k: function(){console.log("k ___sys_socketpair,")},
   e: stat,
   q: function(x){isread=false;filename=s0(x);return 0},   //___sys_unlink (called before write)
   d: function(){console.log("d _exit")},
   j: function(){console.log("j _clock_gettime,")},
   b: atof, //_emscripten_asm_const_double
   c: ftoa, //_emscripten_asm_const_int
   g: function(){console.log("g _emscripten_get_now,")},
   l: function(dest,src,num){U().copyWithin(dest,src,src+num) },
   h: function(){console.log("h _execve,")},
   x: function(){console.log("x _exit,")},
   r: fclose, //_fd_close
   t: function(){console.log("t _fd_read,")},
   u: fd_write, //_fd_write
   i: function(){console.log("i _fork,")},
   a: function(x){t0=x},
  }}  
 
 fetch('../zoo/k9/k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  M=K.y.buffer           //memory

  //emscripten splits a 64bit return value into a 32bit return value and calls setTempRet0(hi) before returning lo.
  ss=function(x){let r=K.G(x);let t=hl(t0,r); return t}
  oe=function(x){let r=K.A(lo(x),hi(x));let t=hl(t0,r); return t}
  sa=K.P //stack allocate

  K.F(0,0) //main
  if(file.t=="")O("w2021.03.27 1gb firefox (c)shakti 2.0\n")
  
  fsinit()
  let keys=Object.keys(kfs)
  for(let i=0;i<keys.length;i++)fs.files[keys[i]]=kfs[keys[i]]
  
  if(file.t!=""){if(!file.f.endsWith(".k"))file.f="a.k";fs.files[file.f]=us(file.t)}
  
  let t0=performance.now()
  if(file.t!="")repl("\\l "+file.f,rows,cols,width,height)
  status(t0)

 })
}

function repl(t,rows,cols,width,height){dims(rows,cols,width,height)
 if(t=="\\")t=`""0:."\\\\"`
 let u=us(t)
 let x=sa(1+u.length)
 let m=U()
 m.set(u,x)
 m[x+u.length]=0
 oe(ss(x))}

function status(t0){let p=x=>x.toPrecision(4)
 let ms=performance.now()-t0
 let t=(ms>1000)?p(ms/1000)+"s":(ms<1)?p(ms*1000)+"µs":p(ms)+"ms"
 postMessage({m:"stat",t:mem(M.byteLength)+"   "+t})}
let mem=x=>{x/=1024;return (x>1024)?Math.round(x/1024)+"m":Math.round(x)+"k"}

function dims(rows,cols,width,height){ //todo console size
 fs.files["canvas"]=us(width+" "+height)
}


function U( ){ return new Uint8Array(M) }
function I( ){ return new Uint32Array(M) }
function F( ){ return new Float64Array(M) }

function us(s){return new TextEncoder("utf-8").encode(s)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function s0(x){let i=U().slice(x);return su(i.slice(0,i.indexOf(0)))}
function lh(x,y){ return (new Float64Array((new Uint32Array([x, y])).buffer))[0] }
function hl(x,y){ return lh(y,x) }
function lo(x){ return (new Uint32Array((new Float64Array([x])).buffer))[0] }
function hi(x){ return (new Uint32Array((new Float64Array([x])).buffer))[1] }

function readConst(s,b){
 let a=[];let c;
 b>>=2;
 let u=U();let i=I();let f=F()
 while(c=u[s++]){
  var double=c<105;
  if(double&&(b&1))b++;
  a.push(double?f[b++>>1]:i[b]);
  ++b}
 return a}

function ftoa(x,y,z){
 if(x!=1158) console.log("ftoa?", x)
 let a=readConst(y,z)
 let u=us(a[0].toPrecision(7))
 let to=a[1];let max=a[2]
 let d=U()
 if(to){d.set(u,to);d[to+u.length]=0}
 return u.length}

function atof(x,y,z){
 if(x!=1181) console.log("atof?",x)
 let a=readConst(y,z)
 let u=U().slice(a[0])
 let n=u.indexOf(0)
 return Number.parseFloat(su(u.slice(0,n)))}

// k file io:
// -read:  stat, open, mmap2, munmap
// -write: unlink, open, ftruncate64, mmap2, munmap
// -print: fd_write(wasi)

let isread=false,filename="" // flags&args for open are equal for read&write, we use stat/unlink to select
function mmap2(addr,len,prot,flags,fp,off){ // read file
 let dst=K.D(len) //malloc
 if(isread){ //also prot=1
  if(0>fread(dst,1,len,fp)) return -1
  return dst}
 return dst}
function munmap(addr,len){
 if(!isread){ // write on unmap
  let u=new Uint8Array(len)
  u.set(U().slice(addr,addr+len))
  writefile(filename,u)}
 K.E(addr) //free
 return 0}
function open(path,flags,args){
 let name=s0(path)
 if(isread){
  let r=open_ra(name,false);
  return (r==0)?-1:r
 }
 return open_w(name)}
function stat(path, buf){isread=true;
 let name=s0(path)
 let n=filesize(name)
 if(n<0)return -1
 let i=I()
 let b=buf>>>2
 i.fill(0, b, b+21)
 i[3+b]=33279 //mode
 i[10+b]=n;
 return 0}
function fd_write(f,iov,nio,nr){
 if(nio!=1)console.log("nio!=1")
 let i=I();
 let ptr = i[iov>>2]
 let len = i[1+(iov>>2)]
 O(su(U().slice(ptr,ptr+len)))
 i[nr>>2]=len;
 return 0}


let fs={
 files:   {},      // name:Uint8Array
 pointers:[0,0,0] // number:dataobject{u:Uint8Array,p:position,name:string}
},
fsinit=()=>{fs.files={};fs.pointers=[0,0,0]},
open_ra=(name,append)=>{
 let d=fs.files[name]
 if(d===undefined) return 0;
 let fp=newfp()
 fs.pointers[fp]={u:new Uint8Array(d),p:append?d.length:0,name:name}
 return fp},
open_w=name=>{
 let d=fs.files[name]
 fs.files[name]=new Uint8Array([]);
 let fp=newfp()
 fs.pointers[fp]={p:0,name:name}
 return fp},
writefile=(s,u)=>{
 if(s=="")O(su(u))
 else{fs.files[s]=u
  d=new Uint8Array(u.length);d.set(u)//copy
  postMessage({m:"writefile",f:s,u:d})
 }
},
filesize=name=>{ // simpler stat
 let u=fs.files[name]
 return(u===undefined)?-1:u.length},
fclose=fp=>{fs.pointers[fp]=false;return 0;},
newfp=()=>{
 for(let i=0;i<fs.pointers;i++)if(pointers[i]===false)return i
 return fs.pointers.length},
fread=function(dst,s,n,fp){
 let src=fs.pointers[fp].u
 let p  =fs.pointers[fp].p
 if(p>=src.length) return -1
 let avail=src.length-p
 let nmemb=Math.floor(avail/s)
 if(nmemb<n)n=nmemb
 U().set(src.slice(p,p+s*n),dst)
 fs.pointers[fp].p+=s*n
 return n}
