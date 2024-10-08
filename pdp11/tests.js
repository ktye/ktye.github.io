let tests = {
 x  :[5],
 asn:[6],
 add:[9058058],
 ad1:[1076181845, 54],
 ad2:[1076181853, 54],
 sub:[-6588926],
 sb1:[-749138641,54],
 sb2:[-1, -1],
 and:[2244932],
 ant:[66595],
 orr:[11782135],
 xor:[9537203],
 loc:[-6588926],
 mul:[1136708649],
 neg:[-123456789],
 cst:[-2,-1],
 lit:[591396865,2146959361],
 li1:[2, 0],
 li2:[-3, -1],
 li3:[-2147483648, 0],
 shr:[154320],
 shl:[1523630080],
 ks1:[0,1744830464],
 ks2:[0,123456],
 ks3:[21,0],
 ks4:[31,0],
 dex:[-2, -1],
 iff:[-26],
 if1:[26],
 if2:[5],
 if3:[4],
 if4:[1],
 ife:[39],
 ifl:[100],
 ret:[26],
 re1:[10],
 eql:[14],
 eq1:[13],
 neq:[13],
 or1:[26],
 or2:[14],
 or3:[-13],
 an1:[-13],
 an2:[-13],
 an3:[-26],
 slp:[1],
 brk:[2],
 bhi:[10],
 bh1:[5],
 cnt:[-98],
 swc:[-6],
 swd:[4],
 st1:[1029],
 st2:[-1],
 st3:[16384],
 st4:[16384],
 st5:[4096],
 lds:[1234435,-1],
 cns:[7],
 glg:[-2045800064,28744],
 gls:[1,0],
 gl1:[-2147483648],
 gl2:[-2147483648],
 gl3:[16,0],
 glo:[-42949685],
 get:[-1097262461,28],
 ge1:[3],
 mem:[-1726315776,7358],
 clz:[43],
 div:[19],
 mod:[-8],
 ibo:[8],
 wrt:[0],
 max:[10],
 cal:[13],
 lop:[30],
 lp2:[48],
 ble:[3],
 bpl:[3],
 blt:[5],
 bgt:[5],
 bge:[5],
 sto:[16384],
 buk:[10],
 cli:[4],
 cl1:[-8],
 cl4:[6],
 isf:[2, 0],
 tok:[45, 0],
 mis:[-30],
}
//let test=x=>reset(x,runtest) //e.g. test("x")
let runtest=x=>{ge("tty").textContent="test "+x+"\n";
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
  if(e==g)ge("tty").value+=w+" ok\n"
  else    ge("tty").value+=w+" failed: got "+g+" expected "+e+"\n"
  return e==g
 }
 console.log("e/r",e,r)
 let lo=check("lo",e[0],r[0],r[1])
 let hi=(e.length>1)?check("hi",e[1],r[2],r[3]):true //64bit
 return lo&&hi
}
