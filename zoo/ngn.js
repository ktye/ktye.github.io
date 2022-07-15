
let K,heap,inp
let T1=new TextEncoder,t1=x=>T1.encode(x)
let T0=new TextDecoder,t0=x=>T0.decode(x)
let U8=x=>new Uint8Array(x)
let M=(p,n)=>U8(K.memory.buffer).subarray(p,p+n)
let O

function ma(n){heap+=n;let m=K.memory,l=m.buffer.byteLength;heap>l&&m.grow((heap-l-1>>>16)+1);return heap-n}

function ini(left,o){O=o
 fetch("./ngn/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 

 let env={env:{sin:Math.sin,cos:Math.cos,log:Math.log,exp:Math.exp,
  js_in:(a,n)=>{const s=inp;inp="";console.log("s?",s);let w=T1.encodeInto(s,M(a,n)).written;console.log(w);return w},
  js_out:(a,n)=>{O(t0(M(a,n)))},
  js_log:a=>console.log(t0(gb(a))),
  js_time:(a,b)=>{ return 0 },
  js_exit:x=>{ console.log("exit",x); },
  js_alloc:n=>{ const p=4096,r=heap%p;r&&ma(p-r);return ma(n) },
  js_eval:(a,m,r,n)=>{ console.log("jseval",a,m,r,n); },
 }}

 fetch('./ngn/k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  heap=K.__heap_base
  K.kinit()
  O("ngn/k, (c) 2019-2022 ngn, GNU AGPLv3.\n ")
 })
}

function evl(s){inp=s+"\n"
 O("\n")
 K.rep()
 O(" ")
}

let ngn={ini:ini,evl:evl}

export { ngn }
