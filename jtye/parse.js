let token=x=>{let C,c,i=x=>split(x,"").map(x=>x.charCodeAt()),
 S=" \t",                    //space
 L="({[;\n",                 //left
 R=")}]",                    //right
 A="'/\\",                   //adverb
 V="+-*%&|<>=^!~,#_$?@.",    //verb
 T=[" ;)+'a0q`-:e\/n",       //state transition table
    ";;)+'a0q`-+a'/;",
    ");)+'a0q`++a'';",
    "+;)+'a0q`-+a'';",
    "';)+'a0q`-+a'';",
    "a;)+'bbq`++b'';",
    "0;)+'11q`+:e'';",
    "qrrrrrrtrrrrsrr",
    "`jjjjjjjjjjjjjj",  // "`;)+'b0q`++b'';",
    "-;)+'a1q`-+a'';",
    "/ccccccccccccc;",
    "cccccccccccccc;",
    ":;)+'a0q`-+a'';",
    "b;)+'bbq`++b'';",
    "1;)+'11q`++e'';",
    "e;)+'11q`1+1'';",
    "rrrrrrrtrrrrsrr",
    "srrrrrrrrrrrrrr",
    "jjjjjjjjtjjjjjj",
    "t;)+'a0q`++a'';"];T=drop(T,1);let t0=i(join(each(first)(T),""));T=each(x=>find(i(x).slice(1),t0))(T)
  C=[i(S+L),i(R),i(V),i(A),cat(add(65,til(26)),add(97,til(26))),i("0123456789."),...each(list)(i("\"`-:e\\/\n"))];
  C=C.reduce((a,x,i)=>amend(i,0,x,a),add(-1,where(256)))
  return cut(x,where(more(scan((x,y)=>T[y][x],0)(at(i(x),C)),10)))},
  

parse=s=>{s=((s.constructor===String)?token(s):s).filter(x=>!((1<x.length&&s[x]=="/")||(!x.trim().length))) //remove comments,space
 let k=scan((x,y)=>x+x*y)(s.map(x=>+!isNaN(parseFloat(x)))),ax=x=>x.constructor===Array                     //join numeric vectors
 s=s.reduce((a,x,j)=>{a.push(1==k[j]?[x]:1<k[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?("["+x.join(",")+"]"):x)
 s=s.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\"
 f1="id type neg sqr sqrt flip rev up down freq not value til first uniq sort count floor list string each right left".split(" "),
 f2="dex add sub mul div min max less more eql match dot dict at find cut take drop cat string both join split".split(" "),
 a2=(x,y)=>(y=["","each","right","left"][1+["each","over","scan"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x}


 
 let t=()=>{let r                            //t(): term
  if(!L(s))return 0;r=s.pop();               //next token
  if(i(")}];",r)){s.push(r);return 0}        //terminator
  r.verb=i(V,r)
  if(r=="(")r=R()                            //(1) and (1;2;3)
  if(r[0]=="`")r=sl(r,1)                     //`js`
  while(1){                                  //adverb and [application]
   if(!L(s))return r;let p=s.pop()
   if(i("'/\\",p))r=d(p,r)                   //derive
   else if(p=="[")r=a(r)                     //apply
   else{s.push(p);break}}
  return r},
 
 e=x=>{let y,z                                           //e(t()): expr
  if(!x)return 0;if(!(y=t()))return G(x)                 //x or primitive
  if(y.verb&&!x.verb){
   z=e(t())
   return y==":"?_(x,0,z):(!z)?p(x,y):z.verb?c(p(x,y),z):sw(z,"id(")?_(x,y,sl(z,3)):D(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
 
 i=(x,y)=>x.includes(S(y)),sw=(x,y)=>x.startsWith(y),sl=(x,y)=>x.slice(y,-1),
 a=(x,y)=>{y=l();return(1==y.length)?b("at",[y[0],x]):b(x,y.reverse())},                         //apply x[y] or x[y;z;..]   //todo project
 b=(x,y)=>x+"("+((y.constructor===Array)?y.join(","):y)+")",B=x=>b("",x),                        //brace x(y) or x(y0,y1)
 c=(x,y)=>v(B("(x,y)=>"+(i(f2,y)?cx(x,F(y,f2)+"(x,y)"):sw(y,"(x=>")?cx(x,sl(y,4)):sw(y,"((x,y)=>")?cx(x,sl(y,8)):cx(x,y+"(x)")))),
 cx=(x,y)=>sw(x,"(x=>")?sl(x,4).replace("(x,","("+y+","):b(i(V,x)?F(x,f1):x,y),                  //c:composition
 d=(x,r)=>v( (x=="'"&&i(V,r)&&V.indexOf(r)<11)?b("prior",F(r,f2)):   ["each(","over(","scan("]["'/\\".indexOf(x)]+(x=="'"?H(r):G(r))+")"),                //derived: +/ -> over(add)
 M=(x,y)=>b(F(x,f1),y),D=(x,y,z)=>b(F(a2(x),f2),[y,z]),j=(x,y)=>b("at",[x,y]),                   //monadic/dyadic/juxtaposition
 p=(x,y)=>v(B(b("x=>"+F(y,f2),["x",x]))),                                                        //project 1+
 v=x=>((x=new String(x)).verb=true,x),S=x=>x.toString(),n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=r=>{r=[];while(L(s)){r.push(e(t()));if(s.pop()!=";")return r}},L=x=>x.length?x[x.length-1]:0, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(r[0]):"rev(["+r.reverse().join(",")+"])";return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z,s,i)=>B(sw(x,"at")?((s=sl(x,1+(i=x.lastIndexOf(","))))+b("=amend",[z,F(y,f2),x.slice(3,i),s])):x+"="+(y?D(y,z,x):z))  //assign(4x:modified&indexed)
 //λ inside-out +\1 -1"{}"?
 
 s.reverse()
 return S(e(t()))
}
