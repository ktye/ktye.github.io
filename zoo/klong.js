import { fs }    from './fs.js'
import allocator from './ma.js'

var O,K,ma

function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function us(s){return new TextEncoder("utf-8").encode(s)}
function u0(s){let u=us(s);let r=new Uint8Array(1+u.length);r.set(u);r[u.length]=0;return r}
function s0(x){let i=U().slice(x);return su(i.slice(0,i.indexOf(0)))}
function U(  ){return new Uint8Array(K.memory.buffer)}
function I(  ){return new Int32Array(K.memory.buffer)}

function sf(y,z){ // sprintf: supported %s %c %d
 let i=I(),j
 let s=s0(y)
 while(1){
  let j=s.indexOf("%")
  if(j<0)break
  let p=i[z>>>2]
  let c=s[1+j]
  switch(c){
  case "s": c=s0(p); break
  case "c": c=String.fromCharCode(p); break
  case "d": c=String(p); break
  default:  r="<sprintf:"+c+">"; console.error("sprintf:unsupported format:", c); break;
  }
  s=s.slice(0,j)+c+s.slice(2+j)
  
  z+=4
 }
 return s
 //let r=u0(s)
 //U().set(r,x)
 //return r-1
}
function vpf(fp,fmt,ap){ // vfprintf
 let s=sf(fmt,ap);
 if(fp<3)O(s);else console.error("fprintf to file");
 return 1+s.length;
}


function setinput(s){s+=" ";let buf=us(s);buf[buf.length-1]=0; fs.setinput(buf) }

function ini(left,out){O=out
  fetch("./klong/klong-qref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent="t3x.org/klong\n"+r;left.appendChild(p)});

 let env={env:{
  fgetc:   fs.getc,
  fwrite:  fs.fwrite,
  fread:   fs.fread,
  putc:    fs.putc,
  ungetc:  fs.ungetc,
  fopen:   fs.fopen,
  fclose:  fs.fclose,
  feof:    fs.feof,
  remove:  fs.remove,
  trap:    function(   ){return K.trap()},
  malloc:  function( x ){return ma.malloc(x)}, 
  realloc: function(x,y){return ma.realloc(x,y)},
  free:    function( x ){return ma.free(x)},
  clock:   function(   ){return Date().now()},
  rand:    function(   ){return Math.trunc(Math.random()*2147483647)},
  vfprintf:vpf,
  sprintf: function(x,y,z){let r=u0(sf(y,z));U().set(r,x);return r-1}
 }}

 let s9test=false
 fetch('./klong/'+(s9test?'s9.wasm':'kg.wasm')).then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  K=r.instance.exports
  //K.memory.grow(1024) // 1024*64kb => 64MB
  ma=new allocator(K.__heap_base,K.memory)
  fs.init(U,O)

  window.klong=K
  window.ma=ma


  if(s9test){
   console.log("s9test:",K.main(0,0))
  }else{

   K.kginit(0) // without image
   fetch('./klong/test.kg').then(r=>r.arrayBuffer()).then(r=>{fs.writefile("./test.kg",new Uint8Array(r))})
   // run tests with: .l("test.kg")


/*
  fetch('./klong/klong.image').then(r=>r.arrayBuffer()).then(r=>{
    fs.writefile("./klong.image", new Uint8Array(r))
    K.kginit(1)
   })
*/

  }
 })
}

function evl(s){
 O("\n")
 setinput(s+"\n");
 K.rep();
}

let klong={ini:ini,evl:evl,src:"./klong/klong.json"}
export { klong }
