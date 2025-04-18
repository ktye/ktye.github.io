O("/bootstrap\n")

 fetch("ai/ai.a").then(r=>r.text()).then(a=>{
try{
  ea.value=a
  O("$A ai.a\n")
  let w=A(a)
  O("ai.w ("+w.length+" bytes)\n")
  O("$L ai.w\n")
  L(w)
}catch(e){ O(e.message);throw(e) }
 })
