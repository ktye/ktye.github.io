//kc bootstrap interpreter (no float, no complex)

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
    "1;)+'11q`+1e'';", //"1;)+'11q`++e'';",
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
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\",abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",xyz=[],
 f1="id type neg sqr sqrt flip rev up down freq not value til first uniq sort count floor list string each right left".split(" "),
 f2="dex add sub mul div min max less more eql match dot dict at find cut take drop cat print both join split".split(" "),
 a2=(x,y)=>(y=["","each","right","left"][1+["each","over","scan"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x},
 J={if:1,for:3,while:1,try:0,catch:1,throw:1}

 
 let t=()=>{let r                                      //t(): term
  if(!L($))return 0;r=$.pop();                         //next token
  if(i(")}];",r)){$.push(r);return 0}                  //terminator
  r.verb=i(V,r=dt(r));λλ.n=Math.max(λλ.n,xyz.indexOf(S(r)))
  if(r=="{")r=λ()
  if(r=="(")r=R()                                      //(1) and (1;2;3) and (x;y):
  if(r[0]=="`")r=sl(r,1)                               //`js`
  while(1){                                            //adverb and [application]
   if(!L($))return r;let p=$.pop()
   if(i(abc,r[0])&&p=="{")return λ()                   //ignore lambda type, e.g. ii{x+y}
   if(i("'/\\",p))r=d(p,r)                             //derive
   else if(p=="[")r=a(r)                               //apply/cond
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
 d=(x,r)=>v((x=="'"&&i(V,r)&&V.indexOf(r)<11)?b("prior",F(r,f2)):["each(","over(","scan("]["'/\\".indexOf(x)]+(x=="'"?H(r):G(r))+")"), //derived: +/ -> over(add)
 dt=x=>(!isNaN(+x[0])&&2<split(x,".").length)?"(new Date('"+x.replace(".","-").replace(".","-")+"'))":x, //2024.10.31T10:57:13.001
 M=(x,y)=>b(F(x,f1),y),D=(x,y,z)=>b(F(a2(x),f2),[y,z]),j=(x,y)=>b("at",[x,y]),                   //monadic/dyadic/juxtaposition
 p=(x,y)=>v(B(b("x=>"+F(y,f2),["x",x]))),                                                        //project 1+
 v=x=>((x=new String(x)).verb=true,x),S=x=>String(x),n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=(r,x)=>{r=[];while(L($)){r.push((x=e(t()))?x:(r.undef=1,"undefined"));if(";"!=$.pop())return 1==r.length&&r.undef?[]:r}},L=x=>x.length?x[x.length-1]:0, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(!r.length?"[]":r[0]):L($)==":"?b("",(r.forEach(x=>λλ.push(x)),r),",","[]"):"rev(["+r.reverse().join(",")+"])";return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z,s,i)=>B(sw(x,"at(")?((s=sl(x,1+(i=x.lastIndexOf(","))))+b("=amend",[z,F(y,f2),x.slice(3,i),s])):x+"="+(y?D(y,z,x):λλλ(x,z))),  //assign(4x:modified&indexed)
 λ=(r,t,X)=>{t=λλ;λλ=[];λλ.n=0;X=xyz;xyz="["==L($)?($.pop(),l().map(S)):["x","y","z"];r=l()
  if(1<r.length){r[r.length-1]="return "+L(r);r=b("",r,";","{}")}
  [t,λλ]=[λλ,t];[X,xyz]=[xyz,X];return B(b("",uniq(cat(t,rev(X.slice(0,1+t.n)))).filter(x=>!(i(x,".")+sw(x,"["))))+"=>"+r)},λλ=[],λλλ=(x,y)=>(λλ.push(S(x)),y)
 
 while(L($)==";")$.pop();$.reverse()
 return join(l(),";")
}


let  /*k*/

atom  =x=>"number"===typeof x||"string"===typeof(x)&&1==x.length||"bigint"==typeof x||x.constructor===Date,
atomic=f=>(x,y)=>atom(x)?(atom(y)?f(x,y):vec(y).map(y=>atomic(f)(x,y))):atom(y)?vec(x).map(x=>atomic(f)(x,y)):x.map((x,i)=>atomic(f)(x,y[i])),
curry =(f,a,i)=>(i=a.map((x,i)=>x==undefined?i:-1).filter(x=>-1<x),(...x)=>(x.forEach((x,j)=>a[i[j]]=x),f(...a))), 
rec   =f=>x=>atom(x)?f(x):x.map(rec(f)),
vec   =x=>"string"!==typeof(x)?x:x.split("").map(x=>x.charCodeAt()),

each  =f=>(...x)=>1==x.length?(atom(x[0])?f(x[0]):x[0].map(x=>f(x))):flip(x).map(x=>f(...x)),
over  =f=>(...x)=>1<x.length?fold(f,...x):x[0].reduce((a,x,i)=>i?f(x,a):a),
fold  =f=>(...x)=>flip(x.slice(1)).reduce((a,x,i)=>i?f(...x[i],a):a,x[0]),
scan  =f=>x=>x.length?((x=x.slice()).reduce((a,b,i)=>x[i]=i?f(b,a):a,x[0]),x):x,
left  =f=>(y,x)=>atom(x)?f(x,y):x.map((x,i)=>f(y,x)),
right =f=>(y,x)=>atom(y)?f(x,y):(y=("string"===typeof y?y.split(""):y).map((y,i)=>f(y,x))).every(x=>"string"==typeof x)?y.join(""):y  ,
both  =f=>(y,x)=>atom(x)?right(f)(x,y):atom(y)?left(f)(y,x):x.map((x,i)=>f(y[i],x)),
prior =(f,y)=>x=>x.map((x,i,a)=>f(i?a[i-1]:y?y:a[0],x)),

id    =x=>x,
type  =x=>x.constructor.name,
neg   =rec(x=>-x),
sqr   =rec(x=>x*x),
sqrt  =rec(Math.sqrt),
abs   =rec(Math.abs),
flip  =x=>atom(x)?x:Array(over(max)(each(count)(x))).fill(0).map((_,i)=>x.map(x=>atom(x)?x:x[i])),
rev   =x=>atom(x)?x:x.toReversed(),
up    =x=>til(count(x)).sort((a,b)=>(a=x[a])<(b=x[b])?-1:a>b?1:0),
down  =x=>til(count(x)).sort((a,b)=>(a=x[a])>(b=x[b])?-1:a<b?1:0),
freq  =x=>x.reduce((r,x)=>{r[x]=r[x]?r[x]+1:1;r},{}),
not   =rec(x=>+!x),
value =x=>(typeof x==="string")?eval(parse(x)):x.constructor===Object?Object.values(x):x,
til   =x=>atom(x)?Array(x<0?0:x).fill(0).map((_,i)=>i):where(x),
where =x=>(atom(x)?list(x):x).flatMap((x,i)=>Array(x).fill(i)),
first =x=>atom(x)?x:x.length?x[0]:0,
uniq  =x=>atom(x)?rand(x):x.filter((y,i)=>i===x.indexOf(y)),
rand  =x=>atom(x)?Array(x).fill(0).map(Math.random):x.toSorted((a,b)=>0.5-Math.random()),
sort=(x,f)=>x.toSorted(f),
count =x=>atom(x)?1:x.length,
floor =rec(Math.floor),
list  =x=>[x],
string=x=>Array.isArray(x)||ArrayBuffer.isView(x)?x.every(x=>!isNaN(x))?x.map(String).join(" "):"("+x.map(string).join(";")+")":("function"===typeof x||"bigint"===typeof x)?String(x):JSON.stringify(x),
write=(y,x)=>{o.innerText+=y+"\n";return y},


dex   =(y,x)=>y,
add   =atomic((y,x)=>x+y),
sub   =atomic((y,x)=>x-y),
mul   =atomic((y,x)=>x*y),
div   =atomic((y,x)=>x/y),
mod   =atomic((y,x)=>x?(y%=x,y+x*+(y<0)):y),
idiv  =atomic((y,x)=>x?~~((y-(x-1)*+(y<0))/x):y),
min   =atomic(Math.min),
max   =atomic(Math.max),
less  =atomic((y,x)=>+(x<y)),
more  =atomic((y,x)=>+(x>y)),
eql   =atomic((y,x)=>+(x==y)),

match =(y,x)=>(type(x)!=type(y))?0:(atom(x)?+(x==y):(x.length!=y.length)?0:+x.every((x,i)=>match(x,y[i]))),
dict  =(y,x)=>x.reduce((r,x,i)=>(r[x]=y[i],r),{}),
at    =(y,x)=>"function"===typeof x?x(y):atom(x)?x:Array.isArray(y)||ArrayBuffer.isView(y)?right(at)(y,x):(y=x[y])!==undefined?y:"string"==typeof x?" ":0,
amend =(y,f,i,x)=>{x=x.slice();(atom(i)?(y=[y],[i]):i).forEach((i,j)=>x[i]=(f?f:dex)(atom(y)?y:y[j],x[i]));return x},
find  =(y,x)=>atom(y)?(-1<(y=x.indexOf(y))?y:x.length):right(find)(y,x),
cut   =(y,x)=>atom(x)?(x<0?cut(y,0|y.length/-x):cut(y,mul(0|y.length/x,til(x)))):[...x].map((x,i,a)=>y.slice(x,a[i<a.length-1?1+i:a.length])),
take  =(y,x)=>atom(x)?at(x<0?add(y.length+x,til(-x)):til(x),y):x.filter(x=>y.includes(x)),
drop  =(y,x)=>atom(x)?(x<0?y.slice(0,x):y.slice(x)):x.filter(x=>!y.includes(x)),
cat   =(y,x)=>atom(x)?cat(y,list(x)):x.concat(y),
print =(...x)=>2===x.length?(console.log(x[1]+"$",x[0]),x[0]):(console.log(...rev(x)),1==x.length?x[0]:x),
split =(y,x)=>y.split(x),
join  =(y,x)=>y.join(x),
dec   =(y,x)=>y.slice(1).reduce((r,y,i)=>y+mul(at(x,i),r),first(y)),
enc   =(y,x)=>rev(rev(x).map(x=>{let t=mod(x,y);y=idiv(x,y);return t}))
