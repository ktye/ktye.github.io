let token=x=>{let C,c,i=x=>split(x,"").map(x=>x.charCodeAt()),
 S=" \t",                    //space
 L="({[;\n",                 //left
 R=")}]",                    //right
 A="'/\\",                   //adverb
 V="+-*%&|<>=^!~,#_$?@.",    //verb
 T=[" ;)+'a0q`-:e\/n",       //state transition table
    ";;)+'a0q`-+a'/;",
    ");)+'a0q`++a'';",
    "+;)+'a0q`-:a'';",
    "';)+'a0q`-:a'';",
    "a;)+'bbq`++b'';",
    "0;)+'11q`+:e'';",
    "qrrrrrrtrrrrsrr",
    "`;)+'b0q`++b'';",
    "-;)+'a1q`-:a'';",
    "/ccccccccccccc;",
    "cccccccccccccc;",
    ":;)+'a0q`-+a'';",
    "b;)+'bbq`++b'';",
    "1;)+'11q`++e'';",
    "e;)+'11q`1+1'';",
    "rrrrrrrtrrrrsrr",
    "srrrrrrrrrrrrrr",
    "t;)+'a0q`++a'';"];T=drop(T,1);let t0=i(join(each(first)(T),""));T=each(x=>find(i(x).slice(1),t0))(T)
  C=[i(S+L),i(R),i(V),i(A),cat(add(65,til(26)),add(97,til(26))),i("0123456789."),...each(list)(i("\"`-:e\\/\n"))];
  C=C.reduce((a,x,i)=>amend(i,0,x,a),add(-1,where(256)))
  return cut(x,where(more(scan((x,y)=>T[y][x],0)(at(i(x),C)),10)))},
  
 

parse=s=>{s=((s.constructor===String)?token(s):s).filter(x=>!((1<x.length&&s[x]=="/")||(!x.trim().length))) //remove comments,space
 let k=scan((x,y)=>x+x*y)(s.map(x=>+!isNaN(parseFloat(x)))),ax=x=>x.constructor===Array                     //join numeric vectors
 s=s.reduce((a,x,j)=>{a.push(1==k[j]?[x]:1<k[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?("["+x.join(",")+"]"):x)
 s=s.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\"
 f1=" type neg sqr sqrt flip rev up down frq not value til first uniq sort count floor list string each right left".split(" "),
 f2=" add sub mul div min max less more eql match dot dict at find cut take drop cat string both join split".split(" "),
 a2=(x,y)=>(y=["","both","right","left"][1+["each","over","scan"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x}


 
 let t=()=>{let r                                           //t(): term
  if(!L(s))return 0;r=s.pop();                              //next token
  if(i(")}];",r)){s.push(r);return 0}                       //terminator
  r.verb=i(V,r)
  if(r=="(")r=R()                                           //(1) and (1;2;3)
  while(1){                                                 //adverb and [application]
   if(!L(s))return r;let p=s.pop()
   if(i("'/\\",p))r=d(p,r)
   else if(p=="[")r=a(r)                                    
   else{s.push(p);break}
  }
  return r},
 
 e=(x)=>{let y,z                                           //e(t()): expr
  if(!x)return 0;if(!(y=t()))return G(x)
  if(y.verb&&!x.verb){
   z=e(t())
   return L(y)==":"?_(x,y,z):(!z)?p(x,y):z.verb? c(p(x,y),z)  /*q(x,y,z)*/ :D(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
 
 a=(x,y)=>{y=l();return(1==y.length)?b("at",[y[0],x]):b(x,y.reverse())},                     //apply x[y] or x[y;z;..]   //todo project
 b=(x,y)=>x+"("+((y.constructor===Array)?y.join(","):y)+")",B=x=>b("",x),                    //x(y) or x(y0,y1)
 c=(x,y)=>v(i(f2,S(y))?b("((x,y)=>"+F(x,f1),b(y,"x,y)")):                                    //composition
  sw(y,"((x,y)=>")?b("((x,y)=>"+F(x,f1),y.slice(8)):
  b("(x=>"+F(x,f1),(sw(y,"(x=>")?y.slice(4):b(y,"x)")))),
 d=(x,r)=> 
  v(["each(","over(","scan("]["'/\\".indexOf(x)]+ G( (x=="'"&&i(V,r))?r+":": r   )+")"), //derived verb
 M=(x,y)=>
  //(sw(x,"both")&&i(f2,x.slice(5,-1)))?b(b("each",f1[f2.indexOf(x.slice(5,-1))]),y):
  b(F(x,f1),y),
 D=(x,y,z)=>b(F(a2(x),f2),[y,z]),
 i=(x,y)=>x.includes(y),sw=(x,y)=>x.startsWith(y),
 j=(x,y)=>b("at",[y,x]),                                                                     //juxtaposition x y
 v=x=>((x=new String(x)).verb=true,x),S=x=>x.toString(),n=x=>((x=new String(x)).verb=false,x),
 p=(x,y)=>B(b("x=>"+F(y,f2),["x",x])),                                                          //project 1+
 //q=(x,y,z)=>v(B(i(V,z)?b("(y,x)=>"+F(y,f2),[b(F(z,f2),"y,x"),x]):b("x=>"+F(y,f2),[b(F(z,f1),"x"),x]))),  //compose project 1+-
 l=r=>{r=[];while(L(s)){r.push(e(t()));if(s.pop()!=";")return r}},L=x=>x.length?x[x.length-1]:0,    // list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(r[0]):"rev(["+r.reverse().join(",")+"])";return r},
 G=(x)=>i(V,x[0])?(x.length==1?v(F(x,f2)):(x.length==2&&L(x)==":")?v(F(x[0],f1)):x):x,   //- -> x=>neg(x)
 _=(x,y,z)=>y[0]==":"?(x+"="+z):x+"=?amend?"
 //λ 
 
 s.reverse()
 return S(e(t()))
}
