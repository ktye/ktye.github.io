
function pd(e){if(e){e.preventDefault();e.stopPropagation()}};
function ge(x){return document.getElementById(x)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function us(s){return new TextEncoder("utf-8").encode(s)}

function write(f,s){
 if(f==1) tty.value+=s
 else     console.log("write to file ", f, ":", s)
}
function strtodn(u){let i=0;
 for(;i<30;i++)if((u[i]!=46)&&(u[i]!=101)&&(u[i]<48||u[i]>57))break
 return i
}
function prompt(){O("    ")}

var J,M
function m(x){ let a=-(x%8);x+=(a<0)?8+a:0;M+=x;return M-x; } //todo: better malloc
function u( ){ return new Uint8Array(J.memory.buffer)       }
function i( ){ return new Int32Array(J.memory.buffer)       }
function n(x){ return u().slice(x).indexOf(0)               }
function s(x){ return su(u().slice(x,x+n(x)))               }
function O(u){ tty.value+=su(u)                             }
function A(s){ }
function SF(d,f,a){ //sprintf
 let I=i()
 let F=new Float64Array(J.memory.buffer)
 let b
 switch(s(f)){
 case "%ld":   b=us(String(I[a/4])); u().set(b,d); return b.length; break;
 case "%0.6g": b=us(String(F[a/8])); u().set(b,d); return b.length; break;
 default:
  console.log("sprintf unknown format:", s(f))
 }
 return 0;
}
let env={env:{
 sprintf:SF,
 fputc:function(x,y){write(y,String.fromCharCode(x));return x;},
 fputs:function(x,y){write(y,s(x));return 0;},
 fwrite:function(a,b,c,d){write(d,su(u().slice(a,a+b*c)));return c;},
 free:function(x){},
 malloc:m,
 fmod:function(x,y){return Number((x-(Math.floor(x/y)*y)).toPrecision(8));},
 exp:Math.exp,
 sin:Math.sin,
 cos:Math.cos,
 log:Math.log,
 atan2:Math.atan2,
 cosh:Math.cosh,
 sinh:Math.sinh,
 strtod:function(x,y,z){let b=u();let n=strtodn(b.slice(x));let j=i();j[y/4]=x+n;let r=Number(su(b.slice(x,x+n)));return r;},
 ilog:function(x){console.log("ilog",x);},
}}


function ini(left,o){O=o
 fetch("../j/j41/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 
 fetch('../j/j41/j41.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{
  J=r.instance.exports
  M=J.__heap_base.value
  J.jinit()
  prompt()
 })
}

function evl(s){
 O("\n")
 let x=us(s);let r=m(1+x.length);let d=u();d.set(x,r);d[r+x.length]=0;
 x=J.jx(r);
 J.jpr(x);prompt();
}

let j41={ini:ini,evl:evl}

export { j41 }
