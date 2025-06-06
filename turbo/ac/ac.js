//c compiler
let ac=x=>{
 let A=[],O=(x,p)=>A.push(x+(p?" @"+p:""))
 let c=cparse(x)            //cparse.js
//console.log(c)
 let pos=0,rtyp="i",args=[],locs={},globs={},funcs={},tab={name:"",f:[]},imports={},strings={},top=1
 let ew=(x,y)=>x.endsWith(y)
 let ops={"+":"ad?","-":"su?","*":"mu?","/":"dv?","%":"mo?","=":"asn",
  "==":"eq=","!=":"ne=","<=":"le=",">=":"ge=","<":"lt=",">":"gt="}
 let mods="+ - * / % & << >> % ^ |".split(" ").map(x=>x+"=")
 let nt=(x,r)=>((r="?ijefz".indexOf(x)),r=="?"?E("unknown type: "+x):r-1)
 let t2=(x,y)=>x==y?x:("z"==x||"z"==y)?0:"ijefz"[Math.max(nt(x),nt(y))]
 let tp=(x,r)=>("PointerType"==x.type)?tpp(x):((x=(x.name=="int"?(x.modifier[0]=="long"?"long":x.modifier=="short"?"short":x.name):x.name)),(r="?vchijefz"[1+["void","char","short","int","long","float","double","complex"].indexOf(x)]),r=="?"?E("unknown type: "+r):r)
 let tpp=(x,r)=>("Type"==x.target.type?tp(x.target).toUpperCase():E("unknown pointer type"))
 let ptr=t=>"VCHIJEFZ".includes(t)
 let pts=t=>((t="CHIJEFZ".indexOf(t)),t>0?(O("i "+[0,1,2,3,2,1,4][t]),O("sli")):0)
 let unp=t=>ptr(t)?"i":"v"==t?"":t
 let E=x=>{throw new Error("ac:"+pos+": "+x)}
 let glob=(t,s)=>(O(tp(t)+" "+s),(globs[s]=tp(t)))
 let cast=(r,x,t)=>(t=emit(x),(unp(t)!=unp(r))?O(unp(r)+"o"+unp(t)):0,r)
 let bini=(x,y,op,p,o,t)=>{o=ops[op];
  return(op==":")?tern(x,y)
  :mods.includes(op)?assign(x,{type:"BinaryExpression",left:x,right:y,operator:op.slice(0,-1)})
  :(!o)?E("unknown operator: "+op)
  :"asn"==o?assign(x,y)
  :(ew(o,"?")||ew(o,"="))?dya(x,y,o,p):E("unknown operator: "+x)}
 let dyz=(x,y,o,c,f)=>((f="z"==x[0]),"ad? su? eq? ne?".includes(o))?(cas("z",f?y:x),O(f?x[1]:y[1]),O(o.slice(0,2)+"z"),"z"):("mu?"==o)?(cas("f",f?y:x),O("zrr"),O(f?x[1]:y[1]),O("scz"),"z"):E("complex op not supported: "+o)
 let cas=(t,x)=>cast(t,{type:"asm",t:x[0],v:x[1]})
 let dya=(x,y,o,p,c)=>(c=ew(o,"="),x=emt(x),y=emt(y),t=t2(x[0],y[0]))?(cas(t,x),(ptr(y[0])&&(!c)?pts(y[0]):0),cas(t,y),(ptr(x[0])&&(!c)?pts(x[0]):0),O(String(o).slice(0,-1)+t,p),(c?"i":t)):dyz(x,y,o,c)
 let getset=x=>(x in args)?[args[x].t,"get "+args[x].i,"set "+args[x].i]:(x in locs)?[locs[x],"get "+x,"set "+x]:(x in globs)?[globs[x],"glo "+x,"gst "+x]:E("cannot locate variable: "+x)
 let incdec=(x,add,post,p,t,g,s)=>([t,g,s]=getset(x),O(g),O(t+" 1"),O(add?"adi":"sui",p),O(s,p),O(g,p),(post?(O(t+" 1",p),(O(add?"sui":"adi",p))):0),t)
 let suf=(x,o,g,s)=>(x.type!="Identifier")?E("suffix expr: expect identifier"):o=="++"?incdec(x.value,1,1,x.pos):o=="--"?incdec(x.value,0,1,x.pos):E("unknown suffix operator: "+o)
 let pre=(x,o,t,g,s)=>"sizeof"==o?(x=emt(x),O(x[1]+" "+("?4848"[1+"ilef".indexOf(x[1])])),x[1])
  :"-"==o?(t=emit(x),O("ng"+t),t)
  :"!"==o?(t=emit(x),("ij".includes(t)?O("ez"+t):E("! expects integer")),t)
  :"~"==o?(t=emit(x),("ij".includes(t)?O("no"+t):E("~ expects integer")),t)
  :("++"==o||"--"==o)?(x.type!="Identifier"?E("++/-- prefix expects identifier"):incdec(x.value,"++"==o,0,x.pos))
  :E("unknown prefix operator: "+o)
 let tern=(x,y,t)=>{if(x.operator!="?")E("ternary: expect ? binary operator")
  t=emit(x.left),O("if "+t),emit(x.right),O("else"),emit(y),O("end");return t}
 let setheap=(x,i,y,t)=>{ if(x.type!="Identifier")E("array assign: expect identifier");
  return((t=look(x.value)),emit(i),pts(t),O("adi"),emit(y),(t=t.toLowerCase()),O("st"+t),"v")
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
 let index=(x,y,p,t,s)=>{if(x.type!="Identifier")E("index: expect identifier on lhs")
  return((t=look(x.value,p)),emit(y),pts(t),O("adi"),O("ld"+(t=t.toLowerCase())),t)}
 let look=(x,p,r)=>("continue"==x||"break"==x)?(O(x),"v")
  :(x in args)?(O("get "+args[x].i,p),args[x].t)
  :(x in locs)?(O("get "+x,p),locs[x])
  :(x in globs)?(O("glo "+x,p),globs[x])
  :E("lookup: "+x)
 let locl=(s,t)=>(t=tp(t),O(unp(t)+" "+s),locs[s]=t,"v")
 let lite=(x,p)=>(O(ew(x,"f")?"e "+x.slice(0,-1):ew(x,"l")?"j "+x.slice(0,-1):x.includes("a")?("z "+x):x.includes(".")?"f "+x:"i "+x,p),A[A.length-1][0])
 let slit=(x,p)=>(O("i "+((x in strings)?strings[x]:((strings[x]=top),(top+=1+x.length),top-1-x.length)),p),"C")
 let pf=(x,t)=>(t=emt(x),("e"==t[0]?(emit(x),O("ire"),O("jou")):"f"==t[0]?(emit(x),O("jrf")):cast("j",x))) //special case for e|f: dont auto cast but reinterpret to j
 let call=(f,a,p,t)=>{let fn=funcs[f];
  if(!(f in funcs))E("call "+f+": func not defined")
  if(a.length!=fn.a.length)E("call "+f+": wrong number of args")	
  a.forEach((x,i)=>(("printf"==f&&i==1)?pf(x):cast(fn.a[i],x)));O("cal "+f,p);return fn.r}
 let ical=(x,r,s)=>(x.type=="CallExpression"&&x.base.type=="Identifier"&&x.base.value==tab.name)?
  (s=r+":"+x.arguments.slice(1).map(emit).join(""),emit(x.arguments[0]),O(s),r):0
 let tabl=x=>(
  x.defType.type=="PointerType"&&x.defType.target.name=="void"&&x.value.type=="Literal"&&Array.isArray(x.value.value)?
  (tab.name=x.name,tab.f=x.value.value.map(x=>x.value))
  :0)
 let iff=(c,b,e)=>(cast("i",c),O("if"),emits(b),(e==undefined?0:(O("else"),emits(e))),O("end"))
 let whl=(c,b,p)=>(O("while",p),emit(c),O("do",b[0].pos),emits(b),O("end"),"v")
 let dowh=(c,b)=>(O("do"),emits(b),O("while"),emit(c),O("end"),"v")
 let ifor=(i,c,s,b)=>(emit(i),O("while"),emit(c),O("do"),emits(b),emit(s),O("end"))
 let drop=x=>(x=="v"||x=="")?0:O("drp")
 let text=t=>Object.keys(strings).length?(t=new TextEncoder(),("00"+Object.keys(strings).map(x=>Array.from(t.encode(x)).map(x=>x.toString(16).padStart(2,"0")).join("")+"00").join("")).match(/.{1,32}/g).map((x,i)=>"dat "+(16*i)+" "+x+"\n").join("")):""
 let emt=x=>{let r,t,a=A;A=[];t=emit(x);r=A;A=a;return[t,r]}
 let emits=x=>(x.forEach(emit),"v")
 let emit=x=>{let tx,ty
  return"asm"==x.type?(A.push(...x.v),x.t)
  :"BinaryExpression"   ==x.type?bini(x.left,x.right,x.operator,x.pos)
  :"SuffixExpression"   ==x.type?suf(x.value,x.operator)
  :"PrefixExpression"   ==x.type?pre(x.value,x.operator)
  :"ExpressionStatement"==x.type?drop(emit(x.expression))
  :"Literal"            ==x.type?(x.str?slit(x.value,x.pos):lite(x.value,x.pos))
  :"Identifier"         ==x.type?look(x.value,x.pos)
  :"VariableDeclaration"==x.type?locl(x.name,x.defType)
  :"CastExpression"     ==x.type?((tx=ical(x.value,unp(tp(x.targetType))))?tx:(cast(tp(x.targetType),x.value)))
  :"CallExpression"     ==x.type?call(x.base.value,x.arguments,x.pos)
  :"IfStatement"        ==x.type?iff(x.condition,x.body,x.else)
  :"WhileStatement"     ==x.type?whl(x.condition,x.body,x.pos)
  :"DoWhileStatement"   ==x.type?dowh(x.condition,x.body)
  :"ForStatement"       ==x.type?ifor(x.init,x.condition,x.step,x.body)
  :"IndexExpression"    ==x.type?index(x.value,x.index,x.pos)
  :"ReturnStatement"    ==x.type?(cast(rtyp,x.value),O("ret"),"v")
  :E("unknown ast type:"+x.type)
 }
 let func=(x,h,p)=>{args={};locs={}
  let s={r:unp(tp(x.defType)),a:x.arguments.map(x=>unp(tp(x.defType))).join(""),p:p}
  funcs[x.name]=s;imports[x.name]=1
  if(h)return;    imports[x.name]=0
  x.arguments.forEach((x,i)=>{args[x.name]={i:i,t:tp(x.defType)}})
  rtyp=unp(tp(x.defType))
  O(x.name+" "+s.r+":"+s.a+" export "+x.name,p)
  x.body.forEach((x,i,b)=>(x.type=="ReturnStatement"&&b.length==1+i)?cast(rtyp,x.value):emit(x))
 }
 c.forEach(x=>{pos=x.pos;
   "FunctionDeclaration"==x.type?func(x,0,x.pos)
  :"FunctionDefinition"==x.type?func(x,1,x.pos)
  :"GlobalVariableDeclaration"==x.type?(tabl(x)?0:glob(x.defType,x.name))
  :E("unknown toplevel ast type: "+x.type)
 })
 let h=Object.keys(imports).filter(x=>imports[x]).map(x=>x+" "+funcs[x].r+":"+funcs[x].a+" import env "+x+" @"+funcs[x].p)
 let j=x=>(x.length?x.join("\n")+"\n":"")
 return j(h)+j(A)+j(tab.f.map((x,i)=>"tab "+i+" "+x))+text()
}
