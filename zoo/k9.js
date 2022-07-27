import { fs }    from './fs.js'

let O,M,K,ss,oe,sa,t0
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
  ++b
 }
 return a
} 

function ftoa(x,y,z){
 if(x!=1158) console.log("ftoa?", x)
 let a=readConst(y,z)
 let u=us(a[0].toPrecision(7))
 let to=a[1];let max=a[2]
 let d=U()
 if(to){d.set(u,to);d[to+u.length]=0}
 return u.length
}

function atof(x,y,z){
 if(x!=1181) console.log("atof?",x)
 let a=readConst(y,z)
 let u=U().slice(a[0])
 let n=u.indexOf(0)
 return Number.parseFloat(su(u.slice(0,n)))
}

// k file io:
// -read:  stat, open, mmap2, munmap
// -write: unlink, open, ftruncate64, mmap2, munmap
// -print: fd_write(wasi)

let isread=false,filename="" // flags&args for open are equal for read&write, we use stat/unlink to select
function mmap2(addr,len,prot,flags,fp,off){ // read file
 let dst=K.D(len) //malloc
 if(isread){ //also prot=1
  if(0>fs.fread(dst,1,len,fp)) return -1
  return dst
 }
 return dst
}
function munmap(addr,len){
 if(!isread){ // write on unmap
  let u=new Uint8Array(len)
  u.set(U().slice(addr,addr+len))
  fs.writefile(filename,u)
 }
 K.E(addr) //free
 return 0
}
function open(path,flags,args){
 let name=s0(path)
 if(isread){
  let r=fs.open_ra(name,false);
  return (r==0)?-1:r
 }
 return fs.open_w(name)
}
function stat(path, buf){isread=true
 let name=s0(path)
 let n=fs.filesize(name)
 if(n<0)return -1
 let i=I()
 let b=buf>>>2
 i.fill(0, b, b+21)
 i[3+b]=33279 //mode
 i[10+b]=n;
 return 0
}
function fd_write(f,iov,nio,nr){
 if(nio!=1)console.log("nio!=1")
 let i=I();
 let ptr = i[iov>>2]
 let len = i[1+(iov>>2)]
 O(su(U().slice(ptr,ptr+len)))
 i[nr>>2]=len;
 return 0
}

function ini(left,o){O=o
 fetch("./k9/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)}); 
 
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
   d: function(){console.log("d __exit,")},
   j: function(){console.log("j _clock_gettime,")},
   b: atof, //_emscripten_asm_const_double
   c: ftoa, //_emscripten_asm_const_int
   g: function(){console.log("g _emscripten_get_now,")},
   l: function(dest,src,num){console.log("l _emscripten_memcpy_big,");U().copyWithin(dest,src,src+num) },
   h: function(){console.log("h _execve,")},
   x: function(){console.log("x _exit,")},
   r: fs.fclose, //_fd_close
   t: function(){console.log("t _fd_read,")},
   u: fd_write, //_fd_write
   i: function(){console.log("i _fork,")},
   a: function(x){t0=x},
  }}  
  //             wasm func
  // main        F (i32,i32)
  // setTempRet0 a (i32)
  // fd_write    u (i32,i32,i32,i32->i32)
  //
  //        _oe: A (i32,i32->i32)
  //         ss: G (i32    ->i32)
  // stackAlloc: P (i32    ->i32)
 
 fetch('./k9/k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  M=K.y.buffer           //memory
  window.k9=K

  //emscripten seems to split a 64bit return value into a 32bit return value and calls a function before with the other (setTempRet0).
  ss=function(x){let r=K.G(x);let t=hl(t0,r); return t}
  oe=function(x){let r=K.A(lo(x),hi(x));let t=hl(t0,r); return t}
  sa=K.P //stack allocate

  fs.init(U,O)
  fs.writefile("alpha",us("abc"))
  K.F(0,0) //main
  O("w2021.03.27 1gb firefox (c)shakti 2.0\n ")

 })
}

function evl(s){
 O("\n")
 let u=us(s)
 let x=sa(1+u.length)
 let m=U()
 m.set(u,x)
 m[x+u.length]=0
 oe(ss(x))
 O(" ")
}

let k9={ini:ini,evl:evl,src:""}

export { k9 }

