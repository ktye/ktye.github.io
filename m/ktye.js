//ktye/k service worker
//
// message interface:                                   js to worker
//  m:"start",f:{f:"name",t:"content"},                 input file and fs cnv size
//    fs:{f1:u1,f2:u2},cnv:{w,h}            
//  m:"repl",t:"string..",r:rows,c:cols,cnv:[w,h]       repl input line, console/canvas size
// posted messages:                                     worker to js
//  m:"exit"                                            request to restart k, e.g. after \\
//  m:"write",t:"string.."
//  m:"writefile",f:"file",u:uint8array
//  m:"stat",t:"string"                                 status text, e.g. memory, exec time
//  m:"filepos",f:"filename",l:line,c:col,p:bytepos     error position for status bar link
//  m:"image",u:uint8array                              request image update (e.g. k writes to `image)

const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)

onmessage=function(e){let d=e.data
 switch(e.data.m){
 case"start"  :start(d.f,d.fs,d.cnv);break
 case"runfile":runfile(d.f,d.t)     ;break
 case"repl"   :repl(d.t)            ;break
 default:console.log("kwork: unknown message:", e)
}}
onerror=function(e){
 console.log("kwork error",e.message,e)
}


let K,kfs,cnv
function start(file,fs,cnvsize){kfs=fs,fs.canvas=us(cnvsize.w+" "+cnvsize.h)
 let env={env:{              //ktye/k.wasm import object
  Exit:x=>postMessage({m:"exit"}),
  Args:()=>{return 0},       //no command line arguments
  Arg:(x,y)=>{return 0},
  Read: kread,               // x:<`file from kfs
  Write:kwrite,              // write to disk(chosen directory)
  ReadIn:(x,y)=>{return 0},
  Native:(x,y)=>{
   //let i=I()[lo(x)>>>2]    // todo e.g. image/draw
   return 0
 }}}
 fetch("../k.wasm").then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports;K.kinit();
  
  //todo K.register see kde/kwork.js
  
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

function repl(t){
 let t0=performance.now()
 try{ K.repl(KC(us(t))); stat(t0)  /*save()*/            }
 catch(e){ indicate(e); /*restore()*/  } 
}


function indicate(e,name,t,p){
 console.log("indicate-error", e, name, t, p, K.src())
}

function linecol(t,p){let v=t.split("\n")
 for(let i=0;i<v.length;i++){let n=v[i].length;if(p<n)return[i,p];p-=1+n}
 return[v.length,p]
}

function stat(t0){
 let ms=performance.now()-t0
 let t=(ms>1000)?Math.floor(ms/1000)+"s":(ms<1)?Math.floor(ms*1000)+"µs":ms+"ms"
 postMessage({m:"stat",t:mem(K.memory.buffer.byteLength)+"   "+t})}

function lo(x){return Number(BigInt.asUintN(32,x))}  // 32-bit of BigInt serves as the wasm memory index (pointer).
function C(){ return new     Int8Array(K.memory.buffer) }

function KC(x){
 if("string"===typeof(x))x=us(x);
 let r=K.mk(18,x.length);
 C().set(x,lo(r));return r}
