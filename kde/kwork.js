
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)

onmessage=function(e){
 switch(e.data.m){
 case"start":kstart(e.data);break
 case"repl" :repl(e.data)  ;break
 case"kst"  :kst(e.data.k) ;break
 case"xgets":xgets(e.data.k);break
 case"kcall":let r=kcall(e.data.f,e.data.a) //kdefile
  if("string"==typeof(r))postMessage({m:"kres",e:r,uid:e.data.uid,jstack:e.data.jstack})
  else                   postMessage({m:"kres",    uid:e.data.uid,r:r[0]})
  break
 default:console.log("kwork: unknown message:", e)
 }
}
onerror=function(e){
 console.log("kwork error",e.message,e)
}

function memory(){
 let m=K._.memory.buffer.byteLength>>>10
 return (m>1000)?((m>>>10)+"M"):m+"k"
}

let K={}
function kstart(d){let s=d.s,fs=d.fs,w=d.cons.w,h=d.cons.h
 fstack=[],kerr=[]
 let  ext={fpush:fpush,fpop:fpop,Trap:Trap}
 ext.init= function(){
  if(("string"==typeof s)&&(s!="")){
   let ok=true
   if(d.trc===true){
    try{
     K.save()
     let l=K._.Atx(K.Ks("p"), K.KC(s))
     ok=kasa(l)
     K.restore()
    }catch(e){
     postMessage({m:"write",f:"",s:"kasa error\n"});
     ok=false;indicate() 
    }
   }
   if(!ok)return
   t0=performance.now()
   try     { krep(s,w,h)}
   catch(e){ indicate() }
  }
  if(s==""){
   postMessage({m:"write",f:"",s:"ktye/k "+K.n});
   postMessage({m:"prompt"})
  }
 }
 ext.read=function(s){return (s in fs)?fs[s]:new Uint8Array(0)}
 ext.write=function(f,u){
  let k
  if(fstack.length>0){ //extract source position from last function call
   let f=fstack[fstack.length-1]
   let p=Number(BigInt.asUintN(32,f[0]>>BigInt(32))&BigInt(0xffffff))
   k={p:p,t:"C",i:"out@"+p,k:0}
  }
  postMessage({m:"write",f:f,u:u,s:(f=="")?su(u):"",mem:memory()+" "+dt(),k:k})
 }
 if("undefined"!==typeof d.kw)K.kinit(ext,d.kw)
 else                         K.kinit(ext,(d.trc===true)?"../d.wasm.lz4":"../k.wasm")
}

function krep(s,w,h){
 let silencio=function(){postMessage({m:"prompt"});return null}
 let x=K.Kx(".",K.KC(s))
 if(x==0)return silencio()
 let r
 if(s.startsWith(" ")) r=K.BK(K.Kx("`kxy@"+w,K.ref(x))) //kst
 else r=K.BK(K.Kx("\"\\n\"/:(`lxy "+w+" "+(h-4)+")@",K.ref(x)))
 postMessage({m:"write",f:"",s:su(r),k:kinfo(x)})
 postMessage({m:"prompt"})
}

function kinfo(x,str){
 let p=Number(BigInt.asUintN(32,x>>BigInt(32))&BigInt(0xffffff))
 let t=K.TK(x)
 let i=t
 if(t=="l")t="λ"
 if("CIFZLDT".includes(t))i+="#"+K.NK(x)
 if(p!=0)i+=" p="+p

 let r={k:x,i:i,p:p}
 if(str===true){
  let s=""
  const v=" :+-*%&|<>=~!,^#_$?@."
  switch(t){
  case"0":
   let n=lo(x);if(n&&n<v.length)s=v[n];else if((-1<n-64)&&(n-64)<v.length)s=v[n-64];else s="`"+String(n);break
  case"i":s=String(lo(x));break
  default:s=i
  }
  r.s=s
 }
 return r
}


function repl(d){
 t0=performance.now()
 try     {krep(d.s,d.cons.w,d.cons.h);K.save()     }
 catch(e){indicate(); K.restore()}
}
function kst(x){
 let u=new Uint8Array(0)
 try{u=K.BK(K.Kx("`k@",K.ref(x)));K.save()}
 catch(e){K.restore()}
 postMessage({m:"write",f:"",s:su(u),k:kinfo(x)})
 postMessage({m:"prompt"})
}
function xgets(x){K.KA(K.Ks("x"),K.ref(x))}

function kcall(f,a){let r=0n
 if(a==undefined){
  try     {r=K.Kx(f);K.save()}
  catch(e){indicate();K.restore()}
  return jk(r)}
 let e=false
 for(let i=0;i<a.length;i++){a[i]=kj(a[i]);if(a[i]==0n)e=true}
 if(e){for(let i=0;i<a.length;i++)_.dx(a[i]);return"k-input-type"}
 try  {r=K.Kx(f,...a)}
 catch{indicate();K.restore()}
 return jk(r)
}
function kj(x){
 switch(typeof x){// f:1 i:true i:2n C:"" s:Symbol("") L:[]
 case"number": return K.Ki(Math.round(x))
 case"string": return K.KC(x)
 default:
  if(x.constructor===Float64Array)return K.KF(x)
  return 0n
}}
function jk(x){let t=K.TK(x)
 switch(t){
 case"i":return[lo(x)]
 case"f":return[K.fK(x)]
 case"s":return[K.sK(x)]
 case"C":return[K.CK(x)]
 case"I":return[K.IK(x)]
 case"F":return[K.FK(x)]
 default:return dxr(x,"k-return-type "+t)
}}


let t0
function dt(){
  let ms=performance.now()-t0
  if(ms>1000)return Math.floor(ms/1000)+"s"
  if(ms<1)   return Math.floor(ms*1000)+"µs"
  return Math.floor(ms)+"ms"
}

function indicate(){
 let p=K._.Srcp()
 if(p)postMessage({"m":"indicate","p":p,"e":(kerr.length)?kerr[0]:"","l":(kerr.length)?kerr[1]:"","stack":printstack()})
 postMessage({m:"prompt"})
}

//debugger(d.wasm)
let srcmap, kerr=[]
if(typeof srcmapobj!="undefined")srcmap=srcmapobj
else fetch("../src.map").then(r=>r.json()).then(r=>{srcmap=r})

let fstack=[]
function fpush(f,x){fstack.push([f,x])}
function fpop(){fstack.pop()}
function Trap(p,e,sp,s){
 var e="err type value index length rank parse stack grow unref io nyi".split(" ")[e]
 kerr=[e+":"+srcmap[p].replace(" ",":"), "https://github.com/ktye/i/tree/master/"+srcmap[p].replace(" ","#L")]
}
function lo(x){return Number(BigInt.asUintN(32,x))}         // 32-bit of BigInt serves as the wasm memory index (pointer).
function printstack(){let r=[]
 for(let j=0;j<fstack.length;j++){
  let i=fstack.length-1-j
  let f=fstack[i]
  let t=K.TK(f[0])
  let m=Number(BigInt.asUintN(32,f[0]>>BigInt(32))&BigInt(0xffffff))
  let ki=[kinfo(f[0],true)]

  if(K.TK(f[1])=="L"){let n=K.NK(f[1])
   if(n>5) ki.push(kinfo(f[1],true))
   else{
    let l=K.LK(f[1]);
    for(let i=0;i<n;i++)ki.push(kinfo(l[i],true))
   }
  }else ki.push(kinfo(f[1],true))

  r.push({"s":t+K.NK(f[1]),"p":m,k:ki})
 }
 return r
}


//static analysis
function kasa(x){ // x:`p"program.."
 let ok=true
 
 let show=function(x,y){ok=false
  let k=kinfo(y)
  k.i="out@ "+k.i
  postMessage({m:"write",f:"",s:x+"\n",k:k,l:true})
 }
 
 x=K.LK(x)
 let typs=function(x){let t=[];for(let i=0;i<x.length;i++)t.push(K.TK(x[i]));return t}

 let T=typs(x)
 let G={plot:true,abs:true,sin:true,cos:true,find:true,fill:true,imag:true,conj:true,angle:true,exp:true,log:true} //global assigned variables
 for(let i=0;i<x.length;i++)if((i>0)&&(T[i]=="0")&&(64==lo(x[i]))&&T[i-1]=="s")G[K.sK(x[i-1])]=true

 //undefined variables
 let undef=function(x,a){ //undefined variables
  let s={}
  let t=typs(x)
  for(let i=0;i<x.length;i++){
   if((i>0)&&(t[i]=="0")&&(20==lo(x[i]))&&t[i-1]=="s"){
    let c=K.sK(x[i-1])
    s[c]=(G[c]===true)?0:x[i]
   }
  }
  for(let i=0;i<x.length;i++)if((i>0)&&(t[i]=="0")&&(64==lo(x[i]))&&t[i-1]=="s")s[K.sK(x[i-1])]=0
  for(let i=0;i<a.length;i++){s[a[i]]=0}
  let sym=Object.keys(s)
  for(let i=0;i<sym.length;i++){
   let u=s[sym[i]];if(u!=0)show("undefined "+sym[i], u)
  }
 }
 undef(x,[]) //undef in global context

 //undef within lambdas
 let l=[]
 let lam=function(x){
  let l=K.LK(K.Kx(".", K.ref(x))), a=K.SK(l[1]), n=lo(l[3])
  return{k:x,c:K.LK(l[0]),a:a.slice(0,n),l:a.slice(n)}}
 for(let i=0;i<x.length;i++)if(T[i]=="l")l.push(lam(x[i]))
 for(let i=0;i<l.length;i++)undef(l[i].c,l[i].a)

 //use of uninitialized local
 let ubef=function(x,l){
  let c={}
  let t=typs(x)
  for(let i=0;i<x.length;i++){
   if((i>0)&&(t[i]=="0")&&(t[i-1]=="s")){
    let s=K.sK(x[i-1])
    if(!l.includes(s))continue
    if(64==lo(x[i]))c[s]=true
    else if(20==lo(x[i])&&c[s]!==true)show("uninitialized "+s,x[i])
 }}}
 for(let i=0;i<l.length;i++)ubef(l[i].c,l[i].l)
 return ok
}


// k interface, from k.js but not as a module
let _
let usr_write
let usr_read
let filename="" 
let filedata      // for fd_read
let kenv={env:{ 
 Exit: function( x){ console.log("exit", x) },
 Args: function(  ){ console.log("args", x); return 0},
 Arg: function(x,y){ console.log("args", x, y); return 0},
 Read:  k_read,
 Write: k_write,
 ReadIn: function(x,y){ return 0 },
 Native: function(x,y){ let i=I()[lo(x)>>>2]
  K._.dx(x)
  return kplot(y)
 },
}}

function k_write(file,nfile,src,n){
 let d = new Uint8Array(K._.memory.buffer, src,  n)
 if(nfile==0){ usr_write("",       d); return 0; }
 let filename = su(new Uint8Array(K._.memory.buffer, file, nfile))
 return usr_write(filename, d)
}

let _rd
function k_read(file,nfile,dst){
 let filename = su(new Uint8Array(K._.memory.buffer, file, nfile))
 if(dst == 0){
  _rd=usr_read(filename)
  return _rd.length
 }
 let m = new Uint8Array(K._.memory.buffer, dst, _rd.length)
 m.set(_rd)
 return 0
}
K.kinit = function(ext,kw){
 usr_read  = ext.read;  delete ext.read  // file read  implementation for k: read(name)=>Uint8Array
 usr_write = ext.write; delete ext.write // file write implementation for k: write(name,data_uint8array)

 //d.wasm (debug build for ktye.github.io/kdb)
 if('fpush'in ext){kenv.env.fpush=ext.fpush;delete ext.fpush}
 if('fpop' in ext){kenv.env.fpop =ext.fpop; delete ext.fpop }
 if('Trap' in ext){kenv.env.Trap =ext.Trap; delete ext.Trap }

 let initk=function(r){
  _=r.instance.exports
  _.kinit()
  K._=_
  K.register("plot",0,1)
  ext.init()
  K.save()
 }
 instance(kw,initk)
}
function binsize(x){K.n=x.byteLength;return x}
//!kdefile
function lz(x){let i=7,j,n,t,c,o,r=[],S=-(1<<31),R=(x,a,n)=>{for(j=0;j<n;j++)r.push(x[a+j]);return n},
 h=()=>x[i++]|x[i++]<<8,C=()=>{if(c===15)do{c+=x[i]}while(x[i++]==255)},
 d=(x,n)=>{while(i<n){t=x[i++];c=t>>4;C();i+=R(x,i,c);if(i<n){c=t&15;o=r.length-h();C();R(r,o,4+c)}}}
 while(n=h()|h()<<16)(n&S)?i+=R(x,i,n&~S):d(x,i+n);return new Uint8Array(r)}
function instance(kw,initk){
 let unzip=(x)=>kw.endsWith(".lz4")?lz(new Uint8Array(x)).buffer:x
 fetch(kw).then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(binsize(unzip(r)),kenv)).then(initk)}
//kdefile
K.TK = function(x){ 
 const t="0-cisfz---mdplx---CISFZLDT";
 return t[_.tp(x)]
}
K.NK = function(x){ return _.nn(x) }

function dxr(x,r){_.dx(x);return r}
function C(){ return new     Int8Array(_.memory.buffer) }
function U(){ return new   Uint32Array(_.memory.buffer) }
function J(){ return new BigInt64Array(_.memory.buffer) }
function I(){ return new    Int32Array(_.memory.buffer) }
function F(){ return new  Float64Array(_.memory.buffer) }
K.KC = function(x){
 if("string"===typeof(x))x=us(x);
 let r=_.mk(18,x.length);
 C().set(x,lo(r));return r
}
K.sK = function(x){ return K.CK(_.cs(x)) }
K.Ks = function(x){ return _.sc(K.KC(x)) }
K.Ki = function(x){ return _.Ki(x) }
K.BK = function(x){ return dxr(x, C().slice(lo(x),lo(x)+_.nn(x))) } //bytes
K.CK = function(x){ return su(K.BK(x)) }
K.SK = function(x){ let n=_.nn(x); let r=new Array(n); let p=lo(x)>>>2
 let y=I().slice(p,p+n)
 for(let i=0;i<n;i++)r[i]=K.CK(_.cs(K.Ki(y[i]))) 
 return dxr(x,r)
}
K.fK = function(x){ let p=lo(x)>>>3;return dxr(x,F()[p]) }
K.IK = function(x){ let p=lo(x)>>>2;return dxr(x,I().slice(p,p+_.nn(x))) }
K.FK = function(x){
 let t=_.tp(x); let n=(t==6) ? 2 : (t==22) ? 2*_.nn(x) : _.nn(x);
 let p=lo(x)>>>3;return dxr(x,F().slice(p,p+n))
}
K.KF = function(x){let r=_.mk(21,x.length);F().set(x,lo(r)>>>3);return r}
K.LK = function(x){
 let n=(_.tp(x)==23) ? _.nn(x) : 2 // L vs D,T
 let r=new Array(n); let p=lo(x)>>>3; let j=J()
 for(let i=0;i<n;i++)r[i]=_.rx(j[p+i])
 return dxr(x,r)
}
K.KL = function(x){
 let n=x.length
 let r=_.mk(23,n)
 let j=J()
 let p=lo(r)>>>3
 for(let i=0;i<n;i++)j[i+p]=x[i]
 return r
}

K.ref  = function(x){return _.rx(x)}
K.Kx   = function(s,...args){ 
 let c=1+":+-*%&|<>=~!,^#_$?@.".indexOf(s)
 let f = ((s.length==1)&&(c>0)) ? BigInt(c) : _.Val(K.KC(s))
 return (args.length>0) ? _.Cal(f,K.KL(args)) : f
}
K.KA   = function(sym,val){ K._.dx(K._.Asn(sym,val)) }
let bak   // save/restore back buffer
K.save    = function(){ bak = new Uint8Array(K._.memory.buffer).slice(0, 1<<U()[32]) }
K.restore = function(){ let u=new Uint8Array(K._.memory.buffer).set(bak) }
K.register= function(name, idx, arity){
 let f = K._.l2(K.Kx(",", K.Ki(idx)), K.KC(name))
 I()[(lo(f)>>>2)-3] = arity                           // length-field at offset -3*32bit
 f = (BigInt(14)<<BigInt(59)) + BigInt(lo(BigInt(f))) // type tag xf(extern function) as upper bits
 K.KA(K.Ks(name), f)                                  // assign
}

//!kdefile
function kplot(x){x=K.Kx("*",x)
 let t=K.TK(x)
 switch(t){
 case"I":
 case"F":
 case"Z":x=K.Kx(",",x);break
 }
 t=K.TK(x)
 if(t!="L")K._.trap(0)
 let l=K.LK(x)
 if(l.length==0)K._.trap(0)
 let xt=K.TK(l[0])
 if("Z"==xt){
  for(let i=0;i<l.length;i++){
   if("Z"!=K.TK(l[i]))K._.trap(0)
   l[i]=K.FK(l[i])
  }
  postMessage({m:"plot",t:"polar",l:l})
  return K.Ks("polar")
 }
 
 let vec=function(x){
  let t=K.TK(x)
  switch(t){
  case"I":return K.IK(x)
  case"F":return K.FK(x)
  default:K._.trap(0)
  }
 }
 for(let i=0;i<l.length;i++){
  let t=K.TK(l[i])
  switch(t){
  case "I": 
  case "F": let v=vec(l[i]);l[i]=[K.IK(K.Kx("!",K.Ki(v.length))),v]; break
  case "L":
   l[i]=K.LK(l[i])
   if(2!=l[i].length)K._.trap(0)
   l[i][0]=vec(l[i][0])
   l[i][1]=vec(l[i][1])
   if(l[i][0].length!=l[i][1].length)K._.trap(0)
   break
  default: K._.trap(0)
  }
 }
 postMessage({m:"plot",t:"xy",l:l})
 return K.Ki(l.length)
}
//kdefile
