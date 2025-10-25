let K,kshell=(a,shprmt,exit)=>{
 let lo=x=>Number(BigInt.asUintN(32,x))
 let C=()=>new Int8Array(K.memory.buffer)
 let KC=x=>{x=("string"===typeof x)?us(x):x;let r=K.mk(18,x.length);C().set(x,lo(r));return r}
 let su=x=>t_.decode(x),t_=new TextDecoder("utf-8"),us=x=>_t.encode(x),_t=new TextEncoder("utf-8")

 if("string"==typeof a){
  if(a.trim().startsWith("\\")){K=0;return exit()}
  let bak=new Uint8Array(K.memory.buffer).slice()
  try{K.repl(KC(a))}
  catch(e){let u=new Uint8Array(K.memory.buffer).set(bak)}
  return shprmt(" ")
 }

 let kenv={env:{ 
  Exit:  x=>{K=0;exit()},
  Args:  x=>0,
  Arg:   (x,y)=>0,
  Read:  (a,b,c)=>{let u=new Uint8Array(K.memory.buffer),f=su(u.slice(a,a+b)),
   s=fsget(f);if(s===0)return -1;if(!c)return s.length;u.set(s,c);return s.length},
  Write: (a,b,c,d)=>{let u=new Uint8Array(K.memory.buffer),v=u.slice(c,c+d),f=su(u.slice(a,a+b));f==""?O(su(v)):fsadd(f,v);return 0},
  ReadIn:(x,y)=>0,
  Native:(x,y,i)=>0}}

 let kargs=_=>{
  for(let i=0;i<a.length;i++){
   if(a[i]=="-e"){let s=a.slice(1+i).join(" ");if(s.length)K.repl(KC(s));return 1;}
   let s=fsget(a[i]);if(s!==0)K.repl(KC(s))
  }
 }
 
 let kinit=_=>{
  let n,nk=x=>{n=x.byteLength;return x}
  fetch("../k.wasm").then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(nk(r),kenv)).then(r=>{
  K=r.instance.exports;K.kinit();
  if(a.length)if(kargs()){K=0;exit();return}
  out.textContent+="ktye/k "+n+"\n"
  K.repl(KC('`l:(.`"lxy.")80 19'))
  shprmt(" ")
  })}

 kinit() }
