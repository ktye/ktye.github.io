
/*

'use strict' // ngn/k, (c) 2019-2021 ngn, GNU AGPLv3 - https://codeberg.org/ngn/k/blob/master/LICENSE
const{min,max}=Math,{now}=Date,U8=x=>new Uint8Array(x),doc=document,
T1=new TextEncoder,t1=x=>T1.encode(x),
T0=new TextDecoder,t0=x=>T0.decode(x)

let app,heap,inp='',
M=(p,n)=>U8(app.memory.buffer).subarray(p,p+n),
g1=p=>new DataView(app.memory.buffer).getUint8(p),
gb=p=>{let q=p;while(g1(q))q++;return M(p,q-p)},
gs=p=>t0(gb(p)),
s4=(p,x)=>new DataView(app.memory.buffer).setUint32(p,x,1),
S4=(p,a)=>a.forEach((x,i)=>s4(p+4*i,x)),
ma=n=>{heap+=n;let m=app.memory,l=m.buffer.byteLength;heap>l&&m.grow((heap-l-1>>>16)+1);return heap-n},
msn=s=>{s=t1(s);let p=ma(s.length);M(p,s.length).set(s);return[p,s.length]},
ms=s=>msn(s)[0],
wa=_=>kw.then(),
env={sin:Math.sin,cos:Math.cos,log:Math.log,exp:Math.exp,
 js_in:(a,n)=>{const s=inp;inp='';return T1.encodeInto(s,M(a,n)).written},
 js_out:(a,n)=>(ap(t0(M(a,n))),n),
 js_log:a=>console.log(t0(gb(a))),
 js_time:(a,b)=>{const t=now();s4(a,t/1000);s4(b,t%1000*1000)},
 js_exit:x=>{throw Error(`exit(${x})`)},
 js_alloc:n=>{const p=4096,r=heap%p;r&&ma(p-r);return ma(n)},
 js_eval:(a,m,r,n)=>T1.encodeInto(''+eval(t0(M(a,m))),M(r,n)).written}
*/


M=(p,n)=>U8(app.memory.buffer).subarray(p,p+n),

let env={sin:Math.sin,cos:Math.cos,log:Math.log,exp:Math.exp,
 js_in:(a,n)=>{const s=inp;inp='';return T1.encodeInto(s,M(a,n)).written},
 js_out:(a,n)=>(ap(t0(M(a,n))),n),
 js_log:a=>console.log(t0(gb(a))),
 js_time:(a,b)=>{const t=now();s4(a,t/1000);s4(b,t%1000*1000)},
 js_exit:x=>{throw Error(`exit(${x})`)},
 js_alloc:n=>{const p=4096,r=heap%p;r&&ma(p-r);return ma(n)},
 js_eval:(a,m,r,n)=>T1.encodeInto(''+eval(t0(M(a,m))),M(r,n)).written}

let O
function ini(left,o){O=o
 fetch("./ngn/k.wasm").then(x=>x.arrayBuffer()).then(x=>WebAssembly.instantiate(x,{env})).then(x=>{
  app=x.instance.exports;heap=app.__heap_base
  let p=ms('kw\0repl.k\0'),argv=ma(16);S4(argv,[p,p+3,0,0]);app.kinit();app.kargs(1,argv);
  app.rep()
 })
}

function evl(s){
}

let ngn={ini:ini,evl:evl}

export { ngn }
