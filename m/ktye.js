//ktye/k service worker
//
// message interface:      (js to worker)
//  m:"start",files:[{f:"filename",t:"content"},...]  input files to run in order
//  m:"repl",t:"string..",r:rows,c:cols      repl input line
// posted messages:        (worker to js)
//  m:"exit"                request to restart k, e.g. after \\
//  m:"write",t:"string.."
//  m:"writefile",f:"file",u:uint8array
//  m:"stat",t:"string"     status text, e.g. memory, exec time

const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)

onmessage=function(e){let d=e.data
 switch(e.data.m){
 case"start"  :start(d.files)  ;break
 case"runfile":runfile(d.f,d.t);break
 case"repl"   :repl(d.t)       ;break
 default:console.log("kwork: unknown message:", e)
}}
onerror=function(e){
 console.log("kwork error",e.message,e)
}


let K
function start(files){
 let env={env:{        //ktye/k wasm import object
  Exit:x=>postMessage({m:"exit"}),
  Args:()=>{return 0},       //no command line arguments
  Arg:(x,y)=>{return 0},
  Read:(x,y,z)=>{return 0},  // x:<`file is always empty
  Write:kwrite,
  ReadIn:(x,y)=>{return 0},
  Native:(x,y)=>{
   //let i=I()[lo(x)>>>2]    // todo e.g. image/draw
   return 0
 }}}
 fetch("../k.wasm").then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports;K.kinit();
  filenames=["(z.k)"]
  fileoff  =[0]
  console.log("#z.k", K.nn(K.src()))
  //todo K.register see kde/kwork.js
  let t0=performance.now()
  for(let i=0;i<files.length;i++){
   //todo track file positions to mark error
   filenames.push(files[i].f)
   fileoff.push(fileoff[fileoff.length-1]+1+files[i].t.length)
   runfile(files[i].f,files[i].t)
  }
  //K.save()? 
  stat(t0)
 })
}

let mem=x=>{x/=1024;return (x>1024)?Math.round(x/1024)+"m":Math.round(x)+"k"}

function kwrite(file,nfile,src,n){
 let d = new Uint8Array(K.memory.buffer, src,  n)
 if(nfile==0){ postMessage({m:"write",t:su(d)}); return 0; }    //to console
 let filename = su(new Uint8Array(K.memory.buffer, file, nfile))
 postMessage({m:"writefile",u:d}); return 0;
}

function repl(t){
 let t0=performance.now()
 try{ K.repl(KC(us(t))); stat(t0)  /*save()*/            }
 catch(e){ indicate(e); /*restore()*/  } 
}
function runfile(name,t){
 console.log("src", lo(K.src()), "srcp", K.Srcp())
 try{ K.dx(K.Val(KC(us(t)))) }
 catch(e){ indicate(e, name, t, K.Srcp()-p) }
}

function indicate(e,name,t,p){
 console.log("indicate-error", e, name, t, p, K.src())
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
