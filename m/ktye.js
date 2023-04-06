//ktye/k web worker
//
// message interface:                                   js to worker
//  m:"start",f:{f:"name",t:"content"},                 input file and fs cnv size
//    fs:{f1:u1,f2:u2},r:rows,c:cols,w:w,h:h           
//  m:"repl",t:"string..",r:rows,c:cols,w:w,h:h         repl input line, console/canvas size
// posted messages:                                     worker to js
//  m:"write",t:"string.."
//  m:"writefile",f:"file",u:uint8array
//  m:"stat",t:"string"                                 status text, e.g. memory, exec time
//  m:"filepos",f:"filename",l:line,c:col,p:bytepos     error position for status bar link
//  m:"image",u:uint8array                              request image update (e.g. k writes to `image)

const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)

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


let K,kfs,cnv
function start(file,fs,rows,cols,width,height){kfs=fs
 let env={env:{              //ktye/k.wasm import object
  Exit:x=>{},
  Args:()=>{return 0},       //no command line arguments
  Arg:(x,y)=>{return 0},
  Read: kread,               // x:<`file from kfs
  Write:kwrite,              // write to disk(chosen directory)
  ReadIn:(x,y)=>{return 0},
  Native: function(x,y){ 
  let i=I()[lo(x)>>>2]
   K.dx(x);return knative[i](...explode(y))
 }}}
 fetch("../k.wasm").then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports;K.kinit();
  kfuncs()
  dims(rows,cols,width,height)
  if(file.t=="")postMessage({m:"write",t:"ktye/k\n"})
  
  //todo: build input files from "\l file", replace with "/l file"
  let files=[file]     //[{f:file.f,t:file.t}]
  
  //track error positions:
  //ktye/k catenates everything to a variable called src before parsing.
  //src may relocate
  let nam=[   "(z.k)"   ] //z.k is implicit (built-in)
  let off=[K.nn(K.src())] //size of z.k
  
  try { //execute all input files
  
   let t0=performance.now()
   for(let i=0;i<files.length;i++){let {f,t}=files[i]
  
    nam.push(f)
    off.push(off[off.length-1]+1+t.length) // oldsrc,"\n",newsrc
    
    K.dx(K.Val(KC(us(t))))  //exec file
    //K.save()? 
   }
   stat(t0)
  }catch(e){
   console.log(e)
   let p=K.Srcp()
   for(let i=0;i<off.length;i++){
    if(off[i]>p){let l="byte",c
     if(i==0)c=p
     else{p=-2+p-off[i-1];[l,c]=linecol(files[i-1].t,p)}
     postMessage({m:"filepos",f:nam[i],"l":l,"c":c,"p":p})
     return
}}}})}

let mem=x=>{x/=1024;return (x>1024)?Math.round(x/1024)+"m":Math.round(x)+"k"}

//kwrite writes to both: the worker's internal kfs and posts a message to write to disk.
function kwrite(file,nfile,src,n){
 let d=new Uint8Array(n);d.set(new Uint8Array(K.memory.buffer,src,n))//copy
 if(nfile==0){ postMessage({m:"write",t:su(d)}); return 0; }         //to console
 let name=su(new Uint8Array(K.memory.buffer,file,nfile))
 if(name=="image"){postMessage({m:"image",u:d});return 0}            //special file
 kfs[name]=d
 postMessage({m:"writefile",f:name,u:d}); return 0;
}

//kread read from the worker's internal kfs
function kread(file,nfile,dst){
 let name=su(new Uint8Array(K.memory.buffer,file,nfile))
 if(dst==0)return(name in kfs)?kfs[name].length:0 //query size
 let m=new Uint8Array(K.memory.buffer,dst,kfs[name].length)
 m.set(kfs[name])
 return 0
}

function repl(t,rows,cols,width,height){dims(rows,cols,width,height)
 let t0=performance.now()
 try{ K.repl(KC(us(t))); stat(t0)  /*save()*/             }
 catch(e){ indicate(e); /*restore()*/  } 
}

function dims(rows,cols,width,height){
 kfs.canvas=us(width+" "+height)
 K.dx(K.Asn(kj("l."),K.Atx(kj("lxy"),K.Val(KC(cols+" "+rows)))))
}

function indicate(e,name,t,p){
 //console.log("indicate:", e.message+"\n"+e.fileName+":"+e.lineNumber)
 throw(e)
}

function linecol(t,p){let v=t.split("\n")
 for(let i=0;i<v.length;i++){let n=v[i].length;if(p<n)return[i,p];p-=1+n}
 return[v.length,p]
}

function stat(t0){let p=x=>x.toPrecision(4)
 let ms=performance.now()-t0
 let t=(ms>1000)?p(ms/1000)+"s":(ms<1)?p(ms*1000)+"µs":p(ms)+"ms"
 postMessage({m:"stat",t:mem(K.memory.buffer.byteLength)+"   "+t})}

function lo(x){return Number(BigInt.asUintN(32,x))}  // 32-bit of BigInt serves as the wasm memory index (pointer).
function C(){ return new     Int8Array(K.memory.buffer) }
function I(){ return new    Int32Array(K.memory.buffer) }
function U(){ return new    Uint8Array(K.memory.buffer) }
function F(){ return new  Float64Array(K.memory.buffer) } 

function KC(x){x=("string"==typeof x)?us(x):x;let r=K.mk(18,x.length);C().set(x,lo(r));return r}
function CK(x){let n=K.nn(x);K.dx(x);return su(U().slice(lo(x),lo(x)+n))}
function CK(x){let n=K.nn(x);K.dx(x);return su(U().slice(lo(x),lo(x)+n))}
function explode(x){let r=[],n=K.nn(x);for(let i=0;i<n;i++){r.push(Ati(K.rx(x),i))};K.dx(x);return r}

function jk(x){let t=K.tp(x),n=(t>16)?K.nn(x):0;let p=lo(x)>>>3
 switch(t){
 case 2:return String.fromCharCode(lo(x))
 case 3:return lo(x)
 case 4:return CK(K.cs(x))
 case 5:K.dx(x);return F()[p]
 case 6:K.dx(x);return F().slice(p,2+p)
 case 18:return CK(x)
 case 19:K.dx(x);p=lo(x)>>>2;return I().slice(p,p+n)
 case 21:K.dx(x);return F().slice(p,p+n)
 case 22:K.dx(x);return F().slice(p,p+2*n)
 case 20:case 23:case 25:{let r=[];for(let i=0;i<n;i++)r.push(jk(Ati(K.rx(x),i)));K.dx(x);return r}
 case 24:{let k=Til(K.rx(x)),v=K.Val(x);let r={};for(let i=0;i<n;i++)r[jk(Ati(K.rx(k),i))]=jk(Ati(K.rx(v),i));K.dx(k);K.dx(v);return r}
 default:K.dx(x);return null}}
function kj(x){
 switch(typeof x){
 case"number": return K.Kf(x)
 case"string": return K.sc(KC(x))
 case"boolean":return K.Ki(x)
 case"object":  
  if(x===null)return K.mk(23,0)
  if(x.constructor===Float64Array){r=K.mk(21,x.length);F().set(x,lo(r)>>>3);return r}
  if(Array.isArray(x)){
   let r=K.mk(23,0)
   for(let i=0;i<x.length;i++)r=Cat(r,Enl(kj(x[i])))
   return r //Ech(1n,r) //uf
  }else{
   let keys=Object.keys(x)
   let k=K.mk(20,0)
   let v=K.mk(23,0)
   for(let i=0;i<keys.length;i++){k=Cat(k,kj(keys[i]));v=Cat(v,Enl(kj(x[keys[i]])))}
   return Key(k,v)}
 default:return 0
}}

let knative=[];
let Flp,Til,Enl,Out,Key,Cat,Ech
function kfuncs(){
 [Flp,Til,Enl,Out,Key,Cat,Cut,Ech]=[2,12,13,29,76,77,78,85].map(x=>K.table.get(x))
 let nats={"plot":kplot};for(let k in nats)register(k,nats[k])
}
let Ati=(x,y)=>K.Atx(x,K.Ki(y))
function register(name,f){
 let x=K.l2(Enl(K.Ki(knative.length)),KC(name));I()[(lo(x)>>>2)-3]=f.length;
 knative.push(f);K.dx(K.Asn(kj(name),(BigInt(14)<<BigInt(59))+BigInt(lo(BigInt(x)))))}

//single line:  plot@+`x`y!(0.+!10;?10)
//todo: refcount error?
function kplot(x){ //id?t  fff->xyy fzz->aa zz->pp  ps
 let id=["id0"],l=0n
 if(K.tp(x)==25)l=Enl(x)              //table   (single line)
 else{id=jk(Til(K.rx(x)));l=K.Val(x)} //keytable(multiple lines)
 if(id.length==0)return{}
 let l0=Ati(K.rx(l),0)
 let t=jk(Ech(19n,Enl(K.Val(K.rx(l0))))) //"FZZ"
 let s=jk(Til(l0))
 let x0=(t.length>0&&t[0]=="F");if(x0)t=t.slice(1)
 let ps=[]
 for(let i=0;i<t.length;i++){let p={};
  p.type=(t[i]=="F")?"xy":x0?"ampang":"polar" //todo "ampang":"polar"
  p.xlabel=x0?s[0]:""
  p.title=s[x0+i]
  p.lines=[]
  for(let j=0;j<id.length;j++){
   let ln={id:id[j]},v=jk(K.Val(Ati(K.rx(l),j)));let vj=v[x0+j]
   if(x0)ln.x=v[0]
   if(p.type=="xy")ln.y=vj
   else{let y=new Float64Array(vj.length/2),z=new Float64Array(vj.length/2)
    for(let k=0,r=0;k<vj.length;r++,k+=2){y[r]=vj[k];z[r]=vj[1+k]}
    ln.y=y;ln.z=z
   }
   p.lines.push(ln)
  }
  ps.push(p)
 }
 K.dx(l)
 postMessage({m:"plot","p":{plots:ps}})
 return kj({plots:ps})
}
