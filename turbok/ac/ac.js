//c compiler
let ac=x=>{
 let A=[],O=x=>A.push(x)
 let c=cparse(x)
//console.log(c)
 let pos=0,rtyp="i",args=[],locs={},globs={},funcs={}
 let ew=(x,y)=>x.endsWith(y)
 let ops={"+":"ad?","-":"su?","*":"mu?","/":"dv?","%":"mo?","=":"asn",
  "==":"eq=","!=":"ne=","<=":"le=",">=":"ge=","<":"lt=",">":"gt="}
 let mods="+ - * / % & << >> % ^ |".split(" ").map(x=>x+"=")
 let nt=(x,r)=>((r="?ijef".indexOf(x)),r=="?"?E("unknown type: "+x):r-1)
 let t2=(x,y)=>x==y?x:"ijef"[Math.max(nt(x),nt(y))]
 let tp=(x,r)=>("PointerType"==x.type)?tpp(x):((x=(x.name=="int"&&x.modifier[0]=="long")?"long":x.name),(r="?chijef"[1+["char","short","int","long","float","double"].indexOf(x)]),r=="?"?E("unknown type: "+r):r)
 let tpp=(x,r)=>("Type"==x.target.type?tp(x.target).toUpperCase():E("unknown pointer type"))
 let ptr=t=>"CHIJEF".includes(t)
 let pts=t=>((t="CHIJEF".indexOf(t)),t>0?(O("i "+[0,1,2,3,2,1][t]),O("sli")):0)
 let unp=t=>ptr(t)?"i":t
 let E=x=>{throw new Error("ac:"+pos+": "+x)}
 let cast=(r,x,t)=>(t=emit(x),(unp(t)!=unp(r))?O(r+"o"+t):0,r)
 let bini=(x,y,op,o,t)=>{o=ops[op];
  return(op==":")?tern(x,y)
  :mods.includes(op)?assign(x,{type:"BinaryExpression",left:x,right:y,operator:op.slice(0,-1)})
  :(!o)?E("unknown operator: "+op)
  :"asn"==o?assign(x,y)
  :(ew(o,"?")||ew(o,"="))?dya(x,y,o):E("unknown operator: "+x)}
 let dya=(x,y,o,c)=>(c=ew(o,"="),x=emt(x),y=emt(y),t=t2(x[0],y[0]),cast(t,{type:"asm",t:x[0],v:x[1]}),(ptr(y[0])&&(!c)?pts(y[0]):0),cast(t,{type:"asm",t:y[0],v:y[1]}),(ptr(x[0])&&(!c)?pts(x[0]):0),O(String(o).slice(0,-1)+t),(c?"i":t))
 let getset=x=>(x in args)?[args[x].t,"get "+args[x].i,"set "+args[x].i]:(x in locs)?[locs[x],"get "+x,"set "+x]:(x in globs)?[globs[x],"glo "+x,"gst "+x]:E("cannot locate variable: "+x)
 let incdec=(x,add,post,t,g,s)=>([t,g,s]=getset(x),O(g),O(t+" 1"),O(add?"adi":"sui"),O(s),O(g), (post?(O(t+" 1"),(O(add?"sui":"adi"))):0),t)
 let suf=(x,o,g,s)=>(x.type!="Identifier")?E("suffix expr: expect identifier"):o=="++"?incdec(x.value,1,1):o=="--"?incdec(x.value,0,1):E("unknown suffix operator: "+o)
 let pre=(x,o,t,g,s)=>"sizeof"==o?(x=emt(x),O(x[1]+" "+("?4848"[1+"ilef".indexOf(x[1])])),x[1])
  :"-"==o?(t=emit(x),O("ng"+t),t)
  :"!"==o?(t=emit(x),("ij".includes(t)?O("ez"+t):E("! expects integer")))
  :"~"==o?(t=emit(x),("ij".includes(t)?(O("ng"+t),O(t+" 1"),O("su"+t)):E("~ expects integer")))
  :("++"==o||"--"==o)?(x.type!="Identifier"?E("++/-- prefix expects identifier"):incdec(x.value,"++"==o,0))
  :E("unknown prefix operator: "+o)
 let tern=(x,y,t)=>{if(x.operator!="?")E("ternary: expect ? binary operator")
  t=emit(x.left),O("if "+t),emit(x.right),O("else"),emit(y),O("end");return t}
 let setheap=(x,i,y,t)=>{
  if(x.type!="Identifier")E("array assign: expect identifier")
  (t=look(x.value)),emit(i),O("adi"),emit(y),O("st"+t);return"v"
 }
 let assign=(x,y)=>{
  if("IndexExpression"==x.type)return setheap(x.value,x.index,y)
  if(x.type!="Identifier")E("expected assigment identifier, got: "+x.type)
  x=x.value; (x in args)?(cast(args[x].t,y),O("set "+args[x].i))
  :(x in locs)?(cast(locs[x],y),O("set "+x))
  :(x in globs)?(cast(globs[x],y),O("gst "+x))
  :E("cannot locate variable: "+x)
  return"v"	  
 }
 //let siz=t=>[0,1,2,4,8,4,8][1+[" chijef"].indexOf(t)]
 let index=(x,y,t,s)=>{if(x.type!="Identifier")E("index: expect identifier on lhs")
  return((t=look(x.value)),O(y),pts(t),O("adi"),O("ld"+unp(t)),t)}
 let look=(x,r)=>("continue"==x||"break"==x)?(O(x),"v")
  :(x in args)?(O("get "+args[x].i),args[x].t)
  :(x in locs)?(O("get "+x),locs[x])
  :(x in globs)?(O("glo "+x),globs[x])
  :E("lookup: "+x)
 let locl=(s,t)=>(t=tp(t),O(t+" "+s),locs[s]=t,"v")
 let lite=x=>(O(ew(x,"f")?"e "+x.slice(0,-1):ew(x,"l")?"j "+x.slice(0,-1):x.includes(".")?"f "+x:"i "+x),A[A.length-1][0])
 let call=(f,a,t)=>{let fn=funcs[f]
  if(!(f in funcs))E("call "+f+": func not defined")
  if(a.length!=fn.a.length)E("call "+f+": wrong number of args")	
  a.forEach((x,i)=>(cast(fn.a[i],x)));O("cal "+f);return fn.r}
 let iff=(c,b,e)=>(cast("i",c),O("if"),emits(b),(e==undefined?0:(O("else"),emits(e))),O("end"))
 let whl=(c,b)=>(O("while"),emit(c),O("do"),emits(b),O("end"),"v")
 let dowh=(c,b)=>(O("do"),emits(b),O("while"),emit(c),O("end"),"v")
 let ifor=(i,c,s,b)=>(emit(i),O("while"),emit(c),O("do"),emits(b),emit(s),O("end"))
 let emt=x=>{let r,t,a=A;A=[];t=emit(x);r=A;A=a;return[t,r]}
 let emits=x=>(x.forEach(emit),"v")
 let emit=x=>{let tx,ty
  return"asm"==x.type?(A.push(...x.v),x.t)
  :"BinaryExpression"   ==x.type?bini(x.left,x.right,x.operator)
  :"SuffixExpression"   ==x.type?suf(x.value,x.operator)
  :"PrefixExpression"   ==x.type?pre(x.value,x.operator)
  :"ExpressionStatement"==x.type?("v"!=emit(x.expression)?O("drp"):0,"v")
  :"Literal"            ==x.type?lite(x.value)
  :"Identifier"         ==x.type?look(x.value)
  :"VariableDeclaration"==x.type?locl(x.name,x.defType)
  :"CastExpression"     ==x.type?cast(tp(x.targetType),x.value)
  :"CallExpression"     ==x.type?call(x.base.value,x.arguments)
  :"IfStatement"        ==x.type?iff(x.condition,x.body,x.else)
  :"WhileStatement"     ==x.type?whl(x.condition,x.body)
  :"DoWhileStatement"   ==x.type?dowh(x.condition,x.body)
  :"ForStatement"       ==x.type?ifor(x.init,x.condition,x.step,x.body)
  :"IndexExpression"    ==x.type?index(x.value,x.index)
  :"ReturnStatement"    ==x.type?(cast(rtyp,x.value),O("ret"),"v")
  :E("unknown ast type:"+x.type)
 }
 let func=(x,h)=>{args={};locs={}
  let s={r:unp(tp(x.defType)),a:x.arguments.map(x=>unp(tp(x.defType))).join("")}
  funcs[x.name]=s
  if(h)return
  x.arguments.forEach((x,i)=>{args[x.name]={i:i,t:tp(x.defType)}})
  rtyp=unp(tp(x.defType))
  O(x.name+" "+s.r+":"+s.a+" export "+x.name)
  x.body.forEach((x,i,b)=>(x.type=="ReturnStatement"&&b.length==1+i)?cast(rtyp,x.value):emit(x))
 }
 c.forEach(x=>{pos=x.pos
   "FunctionDeclaration"==x.type?func(x,0)
  :"FunctionDefinition"==x.type?func(x,1)
  :"GlobalVariableDeclaration"==x.type?(globs[x.name]=tp(x.defType))
  :E("unknown toplevel ast type: "+x.type)
 })
 return A.join("\n")+"\n"
}
