
let O, K
let nn,mk,dx,val,kst

function su(u) { return (u.length) ? new TextDecoder("utf-8").decode(u) : "" }
function draw(w,h,x){}
function msl(){var b=K.exports.mem.buffer;K.C=new Uint8Array(b);K.U=new Uint32Array(b);K.I=new Int32Array(b);K.F=new Float64Array(b)}
function grow(x){var cur=K.exports.mem.buffer.byteLength;if((1<<x)>cur){var a=(1<<x)-cur;K.exports.mem.grow(a>>>16); msl()};return x}
function printc(x,y){O(su(K.C.slice(x,x+y))+"\n")}
function cstr(s) {
 var n = s.length
 var x = mk(1, n)
 for (var i=0;i<n;i++) K.C[8+x+i] = s.charCodeAt(i);
 return x
}
function sk(x) { var n = nn(x); dx(x); return su(K.C.slice(8+x, 8+x+n))}

let env={ext:{"sin":Math.sin,"cos":Math.cos,"exp":Math.exp,"log":Math.log,"atan2":Math.atan2,"hypot":Math.hypot,"draw":draw,"grow":grow,"printc":printc}}

function ini(left,o){O=o
 fetch("./kw/k.w"   ).then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 

 fetch('./kw/k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{ 
  K=r.instance
  var e=K.exports;nn=e.nn;dx=e.dx;mk=e.mk;val=e.val;kst=e.kst;
  msl()
  K.exports.ini(16)
  O("ktye/k.w\n ")
 })
}

function evl(s){
 O("\n")
 let r=sk(kst(val(cstr(s))))
 O((r.length>0)?r+"\n ":" ")
}

let kw={ini:ini,evl:evl}

export { kw }
