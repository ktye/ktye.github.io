
//edt
let show=(x,r)=>(r=r.replaceAll("\r",""),edt.value=r,x.endsWith(".k")?kinit(r):0)
let fe=x=>{if(x==""){edt.value="";return kinit()};ex?show(x,ex[x]):fetch(x).then(r=>r.text()).then(r=>show(x,r))}


let O
let evl
let ini=(left,o)=>{O=o
 let K,M,C,U,I
 let su=x=>t_.decode(x),t_=new TextDecoder("utf-8"),us=x=>_t.encode(x),_t=new TextEncoder("utf-8")
 let cs=(r,s)=>(C.set(us(s),r),C[r+s.length]=0,s.length)
 let m=_=>(C=new Uint8Array(K.memory.buffer),I=new Int32Array(K.memory.buffer),U=new Uint32Array(K.memory.buffer))
 let S=x=>su(C.slice(x,C.indexOf(0,x)))
 let e={env:{
  malloc:x=>{let r=M,t=K.memory.buffer.byteLength,a=t-r;
   //console.log("malloc",x,a,x<a?"ok":"grow "+((x-a+65536)>>>16));
   if(x>a){K.memory.grow((x-a+65536)>>>16);m()};M+=x;return r},
  write:x=>O(S(x)),
  writn:x=>O(S(x)+"\n"),
  writi:x=>O(+x),
  spg:(r,p,f,s,t)=>(s=f.toPrecision(p),t=f.toString(),cs(r,s.length<t.length?s:t)),
  spf:(r,d,f)=>cs(r,f.toFixed(d)),
  spe:(r,d,f)=>cs(r,(f<0?"":" ")+f.toExponential(d)),
  spne:(r,n,d,f)=>cs(r,(f<0?"":" ")+f.toExponential(d).padEnd(n," ")),
  spnf:(r,n,d,f)=>cs(r,f.toFixed(d).padStart(n," ")),
  strtod:(x,p,s,n,r)=>(s=S(x),n=s.length,r=Number(s),U[p>>2]=x+n-isNaN(r),r),
 }}
 "log exp sqrt floor sin cos tan asin acos atan sinh cosh tanh".split(" ").forEach(x=>e.env[x]=Math[x])
 let ex
 let kw
 let kp=_=>O("  ")
 let k=(s,r,n)=>(O("\n"),s=us(s.trim()),n=s.length,r=e.env.malloc(((3+n)>>2)<<2),C.set(s,r),C[r+n]=0,K.keval(r),kp())
 let cut=(x,i)=>(i=x.indexOf("\n\\\n"),i>0?x.slice(0,i):x)
 let wa=(r,s)=>WebAssembly.instantiate(r,e).then(r=>{K=r.instance.exports;M=K.__heap_base.value;m();K.kinit();s?k(cut(s)):O("k2\n");kp()});
 let kinit=s=>kw?wa(kw,s):fetch("../k2/k.wasm").then(r=>r.arrayBuffer()).then(r=>wa(r,s))
 kinit();
 evl=k
 console.log("evl",evl)
}

let k2={ini:ini,evl:s=>evl(s),src:""}

export { k2 }
