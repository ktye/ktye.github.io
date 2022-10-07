
import {K} from '../k.js'

const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)

onmessage=function(e){
 switch(e.data.m){
 case"start":kstart(e.data);break
 case"repl" :repl(e.data)  ;break
 case"kst"  :kst(e.data.k) ;break
 case"xgets":xgets(e.data.k);break
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

function kstart(d){let s=d.s
 fstack=[],kerr=[]
 let  ext={fpush:fpush,fpop:fpop,Trap:Trap}
 ext.init= function(){
  if(("string"==typeof s)&&(s!="")){
   let ok=true
   if(d.trc===true){
    try{
     K.save()
     console.log("kasa?")
     let l=K._.Atx(K.Ks("p"), K.KC(s))
     ok=kasa(l)
    }catch(e){ 
     postMessage({m:"write",f:"",s:"kasa error\n"});
     ok=false;indicate() 
    }
   }
   if(!ok)return
   t0=performance.now()
   try     { krep(s)    }
   catch(e){ indicate() }
  }
  if(s==""){
   postMessage({m:"write",f:"",s:"ktye/k "+K.n});
   postMessage({m:"prompt"})
  }
 }
 //ext.read=d.r
 ext.write=function(f,u){
  let k
  console.log("k??")
  if(fstack.length>0){ //extract source position from last function call
   let f=fstack[fstack.length-1]
   console.log("f?",f)
   let p=Number(BigInt.asUintN(32,f[0]>>BigInt(32))&BigInt(0xffffff))
   console.log("p?",p)
   k={p:p,t:"C",i:"out@"+p,k:0}
  }
  console.log("k?",k)
  postMessage({m:"write",f:f,u:u,s:(f=="")?su(u):"",mem:memory()+" "+dt(),k:k})
 }
 K.kinit(ext,(d.trc===true)?"../d.wasm":"../k.wasm")
}

function krep(s){
 let silencio=function(){postMessage({m:"prompt"});return null}
 let x=K.Kx(".",K.KC(s))
 if(x==0)return silencio()
 let r
 if(s.startsWith(" ")) r=K.BK(K.Kx("`k@",K.ref(x))) //kst
 else r=K.BK(K.Kx("\"\\n\"/:`l@",K.ref(x)))
 postMessage({m:"write",f:"",s:su(r),k:kinfo(x)})
 postMessage({m:"prompt"})
}

function kinfo(x,str){
 let p=Number(BigInt.asUintN(32,x>>BigInt(32))&BigInt(0xffffff))
 let t=K.TK(x)
 let i=t
 console.log("kinfo",x,str,t,p)
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
 try     {krep(d.s);K.save()     }
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
fetch("../src.map").then(r=>r.json()).then(r=>{srcmap=r})

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
   console.log("L",n)
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

function kasa(x){
 let ok=true
 
 let show=function(x,y){ok=false
  let k=kinfo(y)
  k.i="out@ "+k.i
  postMessage({m:"write",f:"",s:x+"\n",k:k})
 }
 
 x=K.LK(x)
 let typs=function(x){let t=[];for(let i=0;i<x.length;i++)t.push(K.TK(x[i]));return t}
 
 let undef=function(x){ //undefined variables, todo test locals in lambdas
  let s={}
  let t=typs(x)
  for(let i=0;i<x.length;i++){
   if((i>0)&&(t[i]=="0")&&(lo(x[i])==20)&&t[i-1]=="s"){s[K.sK(x[i-1])]=x[i]}
  }
  for(let i=0;i<x.length;i++){
   if((i>0)&&(t[i]=="0")&&(lo(x[i])==64)&&t[i-1]=="s"){s[K.sK(x[i-1])]=0}
  }
  let sym=Object.keys(s)
  for(let i=0;i<sym.length;i++){
   let u=s[sym[i]];if(u!=0)show("undefined "+sym[i], u)
  }
 }
 undef(x)
 return ok
}



