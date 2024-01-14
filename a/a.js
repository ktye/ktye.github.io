let g=x=>document.getElementById(x)
let t=g("t"),j=g("j") //t:console(content-editable pre element)
let O=s=>{t.textContent=(t.textContent+s).split("\n").slice(-20).join("\n");E()}
let E=_=>{let s=window.getSelection();s.removeAllRanges();let r=document.createRange();r.selectNodeContents(t);r.collapse(false);s.addRange(r);t.focus()}
let lo=x=>Number(BigInt.asUintN(32,x))
let su=x=>t_.decode(x),t_=new TextDecoder("utf-8")
let us=x=>_t.encode(x),_t=new TextEncoder("utf-8")

 
let /*there be*/ K
let B                                                //input buffer
let C=_=>new Uint8Array(K.memory.buffer)
let M,ma=x=>{M+=x;return M-x}                        //todo check for max memory and grow
let S=(x,n)=>su(new Uint8Array(K.memory.buffer,x,n)) //js string from wasm pointer,length
let kenv={env:{                                      //this is a.wasm's import module                
 malloc:ma,                                          //which provides js functions called by wasm
 sprintf:(x,y,z)=>{c=C();z=c[z];z=us((z>128?z-256:z)+" .");y=z.length-1;z[y]=0;c.set(z,x);return y},
 write:(x,y,z)=>{O(S(y,z));return z},
 strlen:x=>C().slice(x).indexOf(0),
 strchr:(x,y)=>{let c=C();while(c[x++])if(y==c[x])return x;return 0}}}

let key=(e,t)=>{if("Enter"==e.key){
 let s="\n"+t.textContent;s=s.slice(1+s.lastIndexOf("\n")).trim();t.textContent+="\n"
 try{ws(us(s));t.textContent+=" "}catch(e){
  O("segmentation fault\n");kinit()}                 //for authentic look and feel
  E()}}
 
let ws=u=>{let c=C();u.forEach((x,i)=>c[B+i]=x);c[B+u.length]=0;K.w_(K.e(B))}  //fill buffer then call w_(e(s))


let kinit=()=>{
 fetch("a.wasm").then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,kenv)).then(r=>{
  K=r.instance.exports,M=K.__heap_base               //store all exports in K
  B=ma(128);                                         //allocate input buffer
  O(" ")})}

