let  /*k*/

constructors=[Array,Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,BigInt64Array,BigUint64Array],
conform=(x,y,a,b)=>(a=type(x),b=type(y),(a<b)?[uptype(x,a,b),y]:(a>b)?[x,uptype(y,b,a)]:[x,y]),
uptype=(x,s,d)=>(s==0&&d>6)?new constructors[d](x):(s==0)?new constructors[i]( ..................................................
atom=(x,t)=>{t=t?t:"n";x=("c"==t?new Int8Array([x]):"h"==t?new Int16Array([x]):"i"==t?new Int32Array([x]):"l"==t?new BigInt64Array([BigInt(x)]):[BigInt(x)]);x.a=true;return x},
atomic=f=>(x,y)=>([x,y]=conform(x,y),x.a?(y.a?f(x,y):y.map(y=>atomic(f)(x,y))):y.a?x.map(x=>atomic(f)(x,y)):x.map((x,i)=>atomic(f)(x,y[i]))),
curry =(f,a,i)=>(i=a.map((x,i)=>x==undefined?i:-1).filter(x=>-1<x),(...x)=>(x.forEach((x,j)=>a[i[j]]=x),f(...a))), 
rec   =f=>x=>x.a?f(x):x.map(rec(f)),
su=x=>t_.decode(x),t_=new TextDecoder("utf-8"),us=x=>_t.encode(x),_t=new TextEncoder("utf-8"),

usn   =x=>x.u?x.u:x.constructor==Uint8Array?true:x.constructor==Uint16Array?true:x.constructor==Uint32Array?true:x.constructor==BigUint64Array?true:false,

each  =f=>(...x)=>1==x.length?(x[0].a?f(x[0]):x[0].map(x=>f(x))):flip(x).map(x=>f(...x)),
over  =f=>(...x)=>1<x.length?fold(f,...x):x[0].reduce((a,x,i)=>i?f(x,a):a),
fold  =f=>(...x)=>flip(x.slice(1)).reduce((a,x,i)=>i?f(...x[i],a):a,x[0]),
scan  =f=>x=>x.length?((x=x.slice()).reduce((a,b,i)=>x[i]=i?f(b,a):a,x[0]),x):x,
left  =f=>(y,x)=>x.a?f(x,y):x.map((x,i)=>f(y,x)),
right =f=>(y,x)=>y.a?f(x,y):(y=("string"===typeof y?y.split(""):y).map((y,i)=>f(y,x))).every(x=>"string"==typeof x)?y.join(""):y  ,
both  =f=>(y,x)=>x.a?right(f)(x,y):y.a?left(f)(y,x):x.map((x,i)=>f(y[i],x)),
prior =(f,y)=>x=>x.map((x,i,a)=>f(i?a[i-1]:y?y:a[0],x)),

id    =x=>x,
type  =x=>constructors.indexOf(x),
neg   =rec(x=>-x),
sqr   =rec(x=>x*x),
sqrt  =rec(Math.sqrt),
abs   =rec(Math.abs),
flip  =x=>x.a?x:Array(over(max)(each(count)(x))).fill(0).map((_,i)=>x.map(x=>x.a?x:x[i])),
rev   =x=>x.a?x:x.toReversed(),
up    =x=>til(count(x)).sort((a,b)=>(a=x[a])<(b=x[b])?-1:a>b?1:0),
down  =x=>til(count(x)).sort((a,b)=>(a=x[a])>(b=x[b])?-1:a<b?1:0),
freq  =x=>x.reduce((r,x)=>{r[x]=r[x]?r[x]+1:1;r},{}),
not   =rec(x=>+!x),
value =x=>(typeof x==="string")?eval(parse(x)):x.constructor===Object?Object.values(x):x,
til   =x=>x.a?Array(x<0?0:x).fill(0).map((_,i)=>i):where(x),
where =x=>(x.a?list(x):x).flatMap((x,i)=>Array(x).fill(i)),
first =x=>x.a?x:x.length?x[0]:0,
uniq  =x=>x.a?rand(x):x.filter((y,i)=>i===x.indexOf(y)),
rand  =x=>x.a?Array(x).fill(0).map(Math.random):x.toSorted((a,b)=>0.5-Math.random()),
sort=(x,f)=>x.toSorted(f),
count =x=>atom(x.length),
floor =rec(Math.floor),
list  =x=>[x],
string=x=>Array.isArray(x)||ArrayBuffer.isView(x)?x.every(x=>!isNaN(x))?x.map(String).join(" "):"("+x.map(string).join(";")+")":("function"===typeof x||"bigint"===typeof x)?String(x):JSON.stringify(x),
//string=x=>(typeof x==="string"||typeof x==="object")?JSON.stringify(x):(x.a||typeof x==="function")?String(x):x.every(x=>!isNaN(x))?x.map(String).join(" "):"("+x.map(string).join(";")+")",

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

match =(y,x)=>(type(x)!=type(y))?0:(x.a?+(x==y):(x.length!=y.length)?0:+x.every((x,i)=>match(x,y[i]))),
dict  =(y,x)=>x.reduce((r,x,i)=>(r[x]=y[i],r),{}),
at    =(y,x)=>"function"===typeof x?x(y):x.a?x:Array.isArray(y)||ArrayBuffer.isView(y)?right(at)(y,x):(y=x[y])!==undefined?y:"string"==typeof x?" ":0,
amend =(y,f,i,x)=>{x=x.slice();(i.a?(y=[y],[i]):i).forEach((i,j)=>x[i]=(f?f:dex)(y.a?y:y[j],x[i]));return x},
find  =(y,x)=>y.a?(-1<(y=x.indexOf(y))?y:x.length):right(find)(y,x),
cut   =(y,x)=>x.a?(x<0?cut(y,0|y.length/-x):cut(y,mul(0|y.length/x,til(x)))):[...x].map((x,i,a)=>y.slice(x,a[i<a.length-1?1+i:a.length])),
take  =(y,x)=>x.a?at(x<0?add(y.length+x,til(-x)):til(x),y):x.filter(x=>y.includes(x)),
drop  =(y,x)=>x.a?(x<0?y.slice(0,x):y.slice(x)):x.filter(x=>!y.includes(x)),
cat   =(y,x)=>x.a?cat(y,list(x)):x.concat(y),
print =(...x)=>2===x.length?(console.log(x[1]+"$",x[0]),x[0]):(console.log(...rev(x)),1==x.length?x[0]:x),
split =(y,x)=>y.split(x),
join  =(y,x)=>y.join(x),


token=x=>{x=us(x);let i,s,r=[],
 C="aaaaaaaaaanaaaaaaaaaaaaaaaaaaaaaadhddddebcdddjgmggggggggggdbdddddffffffffffffffffffffffffffblcddiffffkfffffffffffffffffffffbdcdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
 T="abcdefghijfekbabcdefghijfekbabcdefghidfeebabcdefghijfeebabcdefghijfeebabcdemmhidmeebabcdennhidoeebppppppprpppqppabcdemghidmeebabcdefnhijfeeblllllllllllllblllllllllllllbabcdemmhidmeebabcdennhidoeebabcdennhinneebppppppprpppqppppppppppppppppabcdefghidfeeb"
 C=us(C).map(x=>x-97);T=us(T).map(x=>x-97);s=0;for(i of x)(11<(s=T[14*s+C[i]]))?r[r.length-1].push(i):r.push([i]);return r.map(x=>su(new Uint8Array(x)))}

parse=$=>{$=token($).filter(x=>!((1<x.length&&x[0]=="/")||x[0]==" ")) //rm space&comments
 let i=(x,y)=>x.includes(y),nm="0123456789",num=x=>i(nm,x[0])||(1<x.length&&"-"==x[0]&&i(nm,x[1])),la=x=>x[x.length-1],
 ar=x=>{let t=la(x);if(!i("chi",t)){x=i("ln",x)?la(x):x;return((t=="l")?"new BigInt64Array":"")+"(["+x.split(",").map(x=>x+"n").join(",")+"])"};return "new Int"+("c"==t?"8":"h"==t?"16":"32")+"Array(["+x.slice(0,-1)+"])"},
 b=(x,y,s,q)=>x+(q?q[0]:"(")+((y.constructor===Array)?y.join(s?s:","):y)+(q?q[1]:")"),B=x=>b("",x),k=0
 while(k<$.length){if(k&&num($[k])&&num($[k-1])){$.splice(k-1,2,$[k-1]+","+$[k])}else{k++}}
 $=$.map(x=>new String(num(x)?(i(x,",")?ar(x):b("atom", i("chil",la(x))?[x.slice(0,-1),"'"+x.slice(-1)+"'"]:x)):x))
 
 console.log($.length,$.join(" ; "))
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\",xyz=[],
 f1="id type neg sqr sqrt flip rev up down freq not value til first uniq sort count floor list string each right left".split(" "),
 f2="dex add sub mul div min max less more eql match dot dict at find cut take drop cat print both join split".split(" "),
 a2=(x,y)=>(y=["","each","right","left"][1+["each","over","scan"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x},S=x=>String(x),
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
   if(i("'/\\",p))r=d(p,r)                             //derive
   else if(p=="[")r=a(r)                               //apply/cond
   else{$.push(p);break}}
  return r},
 
 e=x=>{let y,z                               //e(t()): expr
  if(!x)return 0;if(!(y=t()))return G(x)     //x or primitive
  if(y.verb&&!x.verb){
   z=e(t())
   return(!z)?p(x,y):(z.verb&&":"!=y)?c(p(x,y),z):sw(z,"id(")?_(x,y,sl(z,3)):y==":"?_(x,0,z):D(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
  
 sw=(x,y)=>x.startsWith(y),sl=(x,y)=>x.slice(y,-1),
 a=(x,y,n)=>x in J?((n=cut(y=l(),[0,J[x]])),x+(J[x]?b("",n[0],";"):"")+(n[1].length?b("",n[1],";","{}"):"")+(0==J[x]?e(t()):"")):
  1==(n=(y=l()).length)?b("at",[y[0],F(x,f1)]):"$"==x&&y.length>2?C(y):y.undef?b("curry",F(x,f2)+b(",",y.reverse(),",","[]")):b(F(x,f2),y.reverse()), //apply x[y] or x[y;z;..]
 C=x=>B(sl(join(x.map((x,i)=>x+"?:"[i&1]),""),0)), //cond
 c=(x,y)=>v(B("(x,y)=>"+(i(f2,y)?cx(x,F(y,f2)+"(x,y)"):sw(y,"(x=>")?cx(x,sl(y,4)):sw(y,"((x,y)=>")?cx(x,sl(y,8)):cx(x,y+"(x)")))),
 cx=(x,y)=>sw(x,"(x=>")?sl(x,4).replace("(x,","("+y+","):b(i(V,x)?F(x,f1):x,y),                  //c:composition
 d=(x,r)=>v((x=="'"&&i(V,r)&&V.indexOf(r)<11)?b("prior",F(r,f2)):["each(","over(","scan("]["'/\\".indexOf(x)]+(x=="'"?H(r):G(r))+")"), //derived: +/ -> over(add)
 dt=x=>(!isNaN(+x[0])&&2<split(x,".").length)?"(new Date('"+x.replace(".","-").replace(".","-")+"'))":x, //2024.10.31T10:57:13.001
 M=(x,y)=>b(F(x,f1),y),D=(x,y,z)=>b(F(a2(x),f2),[y,z]),j=(x,y)=>b("at",[x,y]),                   //monadic/dyadic/juxtaposition
 p=(x,y)=>v(B(b("x=>"+F(y,f2),["x",x]))),                                                        //project 1+
 v=x=>((x=new String(x)).verb=true,x),
 n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=(r,x)=>{r=[];while(L($)){r.push((x=e(t()))?x:(r.undef=1,"undefined"));if(";"!=$.pop())return 1==r.length&&r.undef?[]:r}},L=x=>x.length?x[x.length-1]:0, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(!r.length?"[]":r[0]):L($)==":"?b("",(r.forEach(x=>λλ.push(x)),r),",","[]"):"rev(["+r.reverse().join(",")+"])";return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z,s,i)=>B(sw(x,"at(")?((s=sl(x,1+(i=x.lastIndexOf(","))))+b("=amend",[z,F(y,f2),x.slice(3,i),s])):x+"="+(y?D(y,z,x):λλλ(x,z))),  //assign(4x:modified&indexed)
 λ=(r,t,X)=>{t=λλ;λλ=[];λλ.n=0;X=xyz;xyz="["==L($)?($.pop(),l().map(S)):["x","y","z"];r=l()
  if(1<r.length){r[r.length-1]="return "+L(r);r=b("",r,";","{}")}
  [t,λλ]=[λλ,t];[X,xyz]=[xyz,X];return B(b("",uniq(cat(t,rev(X.slice(0,1+t.n)))).filter(x=>!(i(x,".")+sw(x,"["))))+"=>"+r)},λλ=[],λλλ=(x,y)=>(λλ.push(S(x)),y) 
 while(L($)==";")$.pop();$.reverse();return join(l(),";")}
