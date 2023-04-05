//ngn/k web worker (see ktye.js for the protocol)

onmessage=function(e){let d=e.data
 switch(e.data.m){
 case"start"  :start(d.f,d.fs,d.r,d.c,d.w,d.h);break
 case"runfile":runfile(d.f,d.t)               ;break
 case"repl"   :repl(d.t,d.r,d.c,d.w,d.h)      ;break
 default:console.log("kwork: unknown message:", e)
}}
onerror=function(e){
 console.log("kwork error",e.message,e)
}

let O=s=>postMessage({m:"write",t:s})

let K,heap,inp
let T1=new TextEncoder,t1=x=>T1.encode(x)
let T0=new TextDecoder,t0=x=>T0.decode(x)
let U8=x=>new Uint8Array(x)
let M=(p,n)=>U8(K.memory.buffer).subarray(p,p+n)
let ma=(n)=>{heap+=n;let m=K.memory,l=m.buffer.byteLength;heap>l&&m.grow((heap-l-1>>>16)+1);return heap-n}
let msn=s=>{s=t1(s);let p=ma(s.length);M(p,s.length).set(s);return[p,s.length]}
let ms=s=>msn(s)[0]

function start(file,kfs,rows,cols,width,height){
 let env={env:{sin:Math.sin,cos:Math.cos,log:Math.log,exp:Math.exp,
  js_in:(a,n)=>{const s=inp;inp="";let w=T1.encodeInto(s,M(a,n)).written;return w},
  js_out:(a,n)=>{O(t0(M(a,n)))},
  js_log:a=>console.log(t0(gb(a))),
  js_time:(a,b)=>{ return 0 },
  js_exit:x=>{ console.log("exit",x); },
  js_alloc:n=>{ const p=4096,r=heap%p;r&&ma(p-r);return ma(n) },
  js_eval:(a,m,r,n)=>{ console.log("jseval",a,m,r,n); },
 }}
 
 fetch('../zoo/ngn/k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  heap=K.__heap_base
  K.kinit()
  if(file.t=="")O("ngn/k, (c) 2019-2022 ngn, GNU AGPLv3.\n")
  
  //todo kfs
  //todo execute f.t, maybe writefile + load
  postMessage({m:"stat",t:""})
 })
}

function repl(t,rows,cols,width,height){
 inp=t+"\n"
 K.rep()
}

/*
function writefile(name){
 const O_RDWR=2,O_CREAT=64
 const f=K.open(ms(name+"\0"),O_RDWR|O_CREAT,438),[q,nq]=msn(s);K.write(f,q,nq);K.close(f)
}
*/

/*
  const ev=s=>w.then(x=>{K=x.instance.exports;heap=app.__heap_base;txt();out.value='';ubc()
   const O_RDWR=2,O_CREAT=64
   const f=app.open(ms('a.k\0'),O_RDWR|O_CREAT,438),[q,nq]=msn(s);app.write(f,q,nq);app.close(f)
   const h=heap,a=heap+=T1.encodeInto('k\0a.k\0',M(heap,8)).written;S4(a,[h,h+2,0,0]);heap+=16;
   let e;try{app.main(2,a)}catch(x){e=x}if(e&&e.message!=='exit(0)')throw e;w=wa()})
 */

