let O,K

function ini(left,o){O=o

 fetch("./k7/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)}); 
 fetch("./k7/k7.js").then(r=>r.text()).then(r=>{
 
  let f = new Function(r)
  console.log(f)
  let kpc = f()
  console.log(kpc)
  
  const y = {
   onExit: (e) => { console.error("exit", e); },
   print: (e) => { console.log("stdout:", e.toString()); },
   printErr: (e) => { console.log("printerr", e) },
  }
   
  kpc(y).then(x=>{ 
   K=x 
   K._init()
   window.K=x
   O("2019-09-25 10:44:44 α 8core 512mb wsm32 (c) shakti\n ")
  })
 
 })

}
function evl(str){
 O("\n")
 let v = new TextDecoder("utf8")
 let s = (e, t) => new Float64Array(new Uint32Array([e, t]).buffer)[0]
 let o = (e, t) => s(t, e)
 let a = (e) => new Uint32Array(new Float64Array([e]).buffer)[0]
 let u = (e) => new Uint32Array(new Float64Array([e]).buffer)[1]
 let m = (t) => (r) => {
  const n = K.ccall(t, "number", ["number"], [a(r), u(r)]), s = K.getTempRet0()
  return o(s, n);
 }
 let _ = ((e) => (t) => {e(t);})(m("r0"))
 let P = (t) => K.HEAP8[a(t) - 5]
 let F = (t) => {
  const r = ((e) => v.decode(e))(K.HEAP8.slice(a(t), a(t) + ((t) => K.HEAP32[(a(t) >> 2) - 1])(t)));
  return _(t), r
 }
 let g = (e) => {
  const t = 2147483647 & u(e);
  return e && t < 1048576 ? ((e < 0) << 15) | (t >> 16) : 14;
 }
 let b = (t) => o(0, K.ccall("kp", "number", ["string"], [t]))
 let w = m("ex")
 let y = m("vx")
 let r = w(b(str))
 let tp = g(r)
 if(tp == 32773) O( ["", "class", "length", "type", "domain", "value", "parse", "stack", "nyi", ""][255&a(r)] + " error")
 else            O(F(y(r)))
 O("\n ")
}

let k7={ini:ini,evl:evl,src:""}

export { k7 }

