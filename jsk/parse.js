let token=x=>{
 let a=x,t=[]
 chr=x=>{if(x[0]!="\"")return 0
  let q=0,n=0;while(++n&&x.length>n&&("\\n"!=x[n]&&(q^=(x[n]=="\\"))));
  return n},
 num=x=>isNaN(parseFloat(x))?0:x.match(/-?[0-9]*\.?[0-9]*/)[0].length,
 nms=x=>{let a=x,t,n=num(x);if(!n)return 0
  while(x.length>n&&" "==x[n]&&(t=num(x=x.slice(1+n))))n+=1+t
  return n},
 ver=x=>+"+-*%&|<>=~.!@?^#_,$'/\\".includes(x[0]),
 pct=x=>+"{}[]();\n".includes(x[0]),
 nam=x=>(0>x.search(/a-zA-Z/))?0:x.search(/^a-zA-Z0-9/)
 while((x=x.trim()).length){
  let pp=a.length-x.length,n=(chr(x)||nms(x)||ver(x)||pct(x)||nam(x)||(x=>{throw"parse: "+x})(pp))
  t.push([x.slice(0,n),pp]);x=x.slice(n)
 };return t},                                                 //token,position

parse=s=>{//+-*%&|<>=~.!@?^#_,$'/\\
 let s1="type neg sqr sqrt flip rev up down frq not value til first uniq sort count floor list string each right left".split(" ")
 let s2="add sub mul div min max less more eql match dot dict at find cut take drop cat string both join split".split(" ")
 let Y="+-*%&|<>=~.!@?^#_,$'/\\"
 let isv=x=>Y.includes(x[0])
 
 s=((s.constructor===String)?token(s):s).toReversed()
 
 let pp,N=()=>{if(!s.length)return false;let r=s.pop();pp=r[1];return r[0]},
 monadic= (f,x)=>({t:(isv(f)?s1[Y.indexOf(f[0])]:f)+"("+x+")",v:0}),
 dyadic=(x,f,y)=>({t:(isv(f)?s2[Y.indexOf(f[0])]:f)+"("+y+","+x+")",v:0}),
 T=()=>{let r=N()
  if(!r)return 0
  return{t:r,v:isv(r)}
 },
 E=x=>{let z
  if(!x)return 0
  let y=T()
  if(!y)return x
  if(y.v&&!x.v){
   z=E(T())
   return dyadic(x.t,y.t,z.t)
  }
  z=E(y)
  return monadic(x.t,z.t)
 }
 return E(T()).t
}