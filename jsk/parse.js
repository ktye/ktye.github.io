
// let token=x=>{
//  let a=x,t=[]
//  chr=x=>{if(x[0]!="\"")return 0
//   let q=0,n=0;while(++n&&x.length>n&&("\\n"!=x[n]&&(q^=(x[n]=="\\"))));
//   return n},
//  sub=i=>+(i&&a[i]=="-"&&"abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789)]}".includes(a[i-1])),
//  num=x=>isNaN(parseFloat(x))?0:x.match(/-?[0-9]*\.?[0-9]*/)[0].length,
//  nms=x=>{let a=x,t,n=num(x);if(!n)return 0
//   while(x.length>n&&" "==x[n]&&(t=num(x=x.slice(1+n))))n+=1+t
//   return n},
//  ver=x=>+"+-*%&|<>=~.!@?^#_,$'/\\".includes(x[0]),
//  pct=x=>+"{}[]();\n".includes(x[0]),
//  nam=x=>(0>x.search(/a-zA-Z/))?0:x.search(/^a-zA-Z0-9/)
//  while((x=x.trim()).length){
//   let pp=a.length-x.length,n=(chr(x)||sub(pp)||nms(x)||ver(x)||pct(x)||nam(x)||(x=>{throw"parse: "+x})(pp))
//   t.push([x.slice(0,n),pp]);x=x.slice(n)
//  };return t},                                                 //token,position

 
let token=x=>{let C,c,ci=x=>String.fromCharCode(...x),ic=x=>x.split("").map(x=>x.charCodeAt()),
 S=" \t",                    //space
 L="({[;\n",                 //left
 R=")}]",                    //right
 A="'/\\",                   //adverb
 V="+-*%&|<>=^!~,#_$?@.",    //verb
 T=[" ;)+'a0q`-:e\/n",       //state transition table
    ";;)+'a0q`-+a'/;",
    ");)+'a0q`++a'';",
    "+;)+'a0q`-+a'';",
    "';)+'a0q`-:a'';",
    "a;)+'bbq`++b'';",
    "0;)+'11q`+:e'';",
    "qrrrrrrtrrrrsrr",
    "`;)+'b0q`++b'';",
    "-;)+'a1q`-+a'';",
    "/ccccccccccccc;",
    "cccccccccccccc;",
    ":;)+'a0q`-+a'';",
    "b;)+'bbq`++b'';",
    "1;)+'11q`++e'';",
    "e;)+'11q`1+1'';",
    "rrrrrrrtrrrrsrr",
    "srrrrrrrrrrrrrr",
    "t;)+'a0q`++a'';"];T=drop(T,1);let t0=ic(join(each(first)(T),""));T=each(x=>find(ic(x).slice(1),t0))(T)
  C=[ic(S+L),ic(R),ic(V),ic(A),cat(add(65,til(26)),add(97,til(26))),ic("0123456789"),...each(list)(ic("\"`-:e\\/\n"))];
  C=C.reduce((a,x,i)=>amend(i,0,x,a),add(-1,where(256)))
  return cut(x,where(more(scan((x,y)=>T[y][x],0)(at(ic(x),C)),10)))}
 

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
