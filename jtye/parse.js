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
    "`jjjjjjjjjjjjjj",
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
  return drop(cut(x=" "+x,where(more(scan((x,y)=>T[y][x])(at(i(x),C)),10))).map(x=>x=="\n"?";":x),1)},
  

parse=$=>{$=(($.constructor===String)?token($):$).filter(x=>!((1<x.length&&x[0]=="/")||!x.trim().length)) //rm space&comments
 let k=scan((x,y)=>x+x*y)($.map(x=>+!isNaN(parseFloat(x)))),ax=x=>x.constructor===Array,                     
 b=(x,y,s,q)=>x+(q?q[0]:"(")+((y.constructor===Array)?y.join(s?s:","):y)+(q?q[1]:")"),B=x=>b("",x)      //join numeric vectors
 $=$.reduce((a,x,j)=>{a.push(1==k[j]?[x]:1<k[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?b("",x,",","[]"):x)
 $=$.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\",xyz=[],
 f1="id type neg sqr sqrt flip rev up down freq not value til first uniq sort count floor list string each right left".split(" "),
 f2="dex add sub mul div min max less more eql match dot dict at find cut take drop cat print both join split".split(" "),
 a2=(x,y)=>(y=["","each","right","left"][1+["each","over","scan"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x},
 J={if:1,for:3,while:1,try:0,catch:1,throw:1}

 
 let t=()=>{let r                            //t(): term
  if(!L($))return 0;r=$.pop();               //next token
  if(i(")}];",r)){$.push(r);return 0}        //terminator
  r.verb=i(V,r);λλ.n=Math.max(λλ.n,xyz.indexOf(S(r)))
  if(r=="{")r=λ()
  if(r=="(")r=R()                            //(1) and (1;2;3) and (x;y):
  if(r[0]=="`")r=sl(r,1)                     //`js`
  while(1){                                  //adverb and [application]
   if(!L($))return r;let p=$.pop()
   if(i("'/\\",p))r=d(p,r)                   //derive
   else if(p=="[")r=a(r)                     //apply/cond
   else{$.push(p);break}}
  return r},
 
 e=x=>{let y,z                               //e(t()): expr
  if(!x)return 0;if(!(y=t()))return G(x)     //x or primitive
  if(y.verb&&!x.verb){
   z=e(t())
   //return(!z)?p(x,y):y==":"?_(x,0,z):z.verb?c(p(x,y),z):sw(z,"id(")?_(x,y,sl(z,3)):D(y,z,x)
   return(!z)?p(x,y):(z.verb&&":"!=y)?c(p(x,y),z):sw(z,"id(")?_(x,y,sl(z,3)):y==":"?_(x,0,z):D(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
  
 i=(x,y)=>x.includes(S(y)),sw=(x,y)=>x.startsWith(y),sl=(x,y)=>x.slice(y,-1),
 a=(x,y,n)=>x in J?((n=cut(y=l(),[0,J[x]])),x+(J[x]?b("",n[0],";"):"")+(n[1].length?b("",n[1],";","{}"):"")+(0==J[x]?e(t()):"")):
  1==(n=(y=l()).length)?b("at",[y[0],F(x,f1)]):"$"==x&&y.length>2?C(y):y.undef?b("curry",F(x,f2)+b(",",y.reverse(),",","[]")):b(F(x,f2),y.reverse()), //apply x[y] or x[y;z;..]
 C=x=>B(sl(join(x.map((x,i)=>x+"?:"[i&1]),""),0)), //cond
 c=(x,y)=>v(B("(x,y)=>"+(i(f2,y)?cx(x,F(y,f2)+"(x,y)"):sw(y,"(x=>")?cx(x,sl(y,4)):sw(y,"((x,y)=>")?cx(x,sl(y,8)):cx(x,y+"(x)")))),
 cx=(x,y)=>sw(x,"(x=>")?sl(x,4).replace("(x,","("+y+","):b(i(V,x)?F(x,f1):x,y),                  //c:composition
 d=(x,r)=>v( (x=="'"&&i(V,r)&&V.indexOf(r)<11)?b("prior",F(r,f2)):["each(","over(","scan("]["'/\\".indexOf(x)]+(x=="'"?H(r):G(r))+")"),                //derived: +/ -> over(add)
 M=(x,y)=>b(F(x,f1),y),D=(x,y,z)=>b(F(a2(x),f2),[y,z]),j=(x,y)=>b("at",[x,y]),                   //monadic/dyadic/juxtaposition
 p=(x,y)=>v(B(b("x=>"+F(y,f2),["x",x]))),                                                        //project 1+
 v=x=>((x=new String(x)).verb=true,x),S=x=>String(x),n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=(r,x)=>{r=[];while(L($)){r.push((x=e(t()))?x:(r.undef=1,"undefined"));if(";"!=$.pop())return r}},l0=x=>x.length==1&&x[0]=="undefined",L=x=>x.length?x[x.length-1]:0, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(l0(r)?"[]":r[0]):L($)==":"?b("",(r.forEach(x=>λλ.push(x)),r),",","[]"):"rev(["+r.reverse().join(",")+"])";return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z,s,i)=>B(sw(x,"at")?((s=sl(x,1+(i=x.lastIndexOf(","))))+b("=amend",[z,F(y,f2),x.slice(3,i),s])):x+"="+(y?D(y,z,x):λλλ(x,z))),  //assign(4x:modified&indexed)
 λ=(r,t,X)=>{t=λλ;λλ=[];λλ.n=0;X=xyz;xyz="["==L($)?($.pop(),l().map(S)):["x","y","z"];r=l()
  if(1<r.length){r[r.length-1]="return "+L(r);r=b("",r,";","{}")}
  [t,λλ]=[λλ,t];[X,xyz]=[xyz,X];return B(b("",uniq(cat(t,rev(X.slice(0,1+t.n)))).filter(x=>!(i(x,".")+sw(x,"["))))+"=>"+r)},λλ=[],λλλ=(x,y)=>(λλ.push(x),y)
 
 while(L($)==";")$.pop();$.reverse()
 return join(l(),";")
}


