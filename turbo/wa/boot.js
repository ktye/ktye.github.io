O("/bootstrap\n")
fetch("wa/ai.a").then(r=>r.text()).then(a=>{
 O("$wa ai.a\n")
 let w=wa(a)
 O("ai.w ("+w.length+" bytes)\n")
 A=new WebAssembly.Module(w)
})

/*
fetch("wa/t.a").then(r=>r.text()).then(a=>{
 try{
  ea.value=a
  O("$wa ai.a\n")
  let w=wa(a)
  O("ai.w ("+w.length+" bytes)\n")
  O("$L ai.w\n")
  A=L(w)
 }catch(e){ O(e.message);throw(e) }
})
*/
