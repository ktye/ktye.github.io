let tests = {
 x  :[5],
 asn:[5],
 add:[9058058],
 and:[2244932],
 ant:[66595],
 orr:[11782135],
 xor:[9537203],
 loc:[-6588926],
 mul:[1136708649],
 neg:[-123456789],
 cst:[-2,-1],
 lit:[591396865,2146959361],
 shr:[154320],
 shl:[1523630080],
 ks1:[0,1744830464],
 ks2:[0,123456],
 ks3:[21,0],
 ks4:[31,0],
 iff:[-26],
 ife:[39],
 ret:[26],
 slp:[1],
}
let test=x=>reset(x,runtest) //e.g. test("x")
let runtest=x=>{ge("tty").textContent="test "+x+"\n"
 do{step()}while((!wait)&&(M[7]!=brk))
 
 //program result are the register values r0..r4 before the last drop instruction.
 //32bit is r0..r1, 64bit: r0..r3
 
 let p=ge("asm").getElementsByClassName("b")[0].previousElementSibling
 let r=p.textContent.slice(16,43).split(" ").map(x=>parseInt(x,8)) //r0..r4
 let e=tests[x]
 console.log(x,tests[x],e)
 let check=(w,e,l,h)=>{
  let g=l|(h<<16)
  console.log("e/l/h/g",e,l,h,g)
  if(e==g)ge("tty").textContent+=w+" ok\n"
  else    ge("tty").textContent+=w+" failed: got "+g+" expected "+e+"\n"
  return e==g
 }
 console.log("e/r",e,r)
 let lo=check("lo",e[0],r[0],r[1])
 let hi=(e.length>1)?check("hi",e[1],r[2],r[3]):true //64bit
 return lo&&hi
}
