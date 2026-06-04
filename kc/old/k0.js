//kc bootstrap interpreter (no float, no complex)
//used by repl.html or on the command line with: qjs --std k0.js *.k *.js [-e [expr]]

//all files share globals (interpreter, k, js).
//k0 interpreter uses 4-letter-allcaps: TOKN PARS PLUS OVER SCAN IOTA..
 let
TOKN=x=>{x=CHJS(x)
 let C="aaaaaaaaaanaaaaaaaaaaaaaaaaaaaaaadhddddebcdddjgmggggggggggdbdddddffffffffffffffffffffffffffblcddiffffkfffffffffffffffffffffbdcdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
 let T="abcdefghijfekbabcdefghijfekbabcdefghidfeebabcdefghijfeebabcdefghijfeebabcdemmhidmeebabcdennhidoeebppppppprpppqppabcdemghidmeebabcdefnhijfeeblllllllllllllblllllllllllllbabcdemmhidmeebabcdennhidoeebabcdennhinneebppppppprpppqppppppppppppppppabcdefghidfeeb"
 let t=0;C=PLUS(-97,CHJS(C));T=PLUS(-97,CHJS(T))
 let s=IOTA(1+x.length),y=PLUS(0,x);for(let i=0;i<y.length;i++)s[1+i]=T[14*s[i]+C[y[i]]];s=DROP(s,1)
 x=CUTT(x,WERE(MORE(s,11))).map(x=>(1==x.length&&x[0]=="\n")?[";"]:x).filter(x=>!((1==x.length&&x[0]==" ")||(1<x.length)&&x[0]=="/"));x.t=99-64;return x},
TRAP=x=>{throw(x.toUpperCase()+" ERROR")},
PARS=$=>{$=TOKN($)
 let k=SCAN((x,y)=>x+x*y)($.map(x=>+!isNaN(parseFloat(x)))),ax=x=>x.constructor===Array,                     
 b=(x,y,s,q)=>x+(q?q[0]:"(")+((y.constructor===Array)?y.join(s?s:","):y)+(q?q[1]:")"),B=x=>b("",x)      //join numeric vectors
 $=$.reduce((a,x,j)=>{a.push(1==k[j]?[x]:1<k[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?b("",x,",","[]"):x)
 $=$.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings
 
 let V=":+-*%&|<>=~.!@?^#_,$'/\\",abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",xyz=[],
 f1="IDEN MAGN NEGT SQAR SQRT FLIP FLOP GRAD DOWN FREQ NOTT VALU IOTA HEAD UNIQ SORT LENG FLOR LIST STRN EACH RITE LEFT".split(" "),
 f2="DEXX PLUS SUBS MULT IDIV MINN MAXX LESS MORE EGAL MATC todo todo INDX FIND CUTT TAKE DROP CATS PRNT BOTH JOIN SPLT".split(" "),
 a2=(x,y)=>(y=["","EACH","RITE","LEFT"][1+["EACH","OVER","SCAN"].indexOf(x.slice(0,4))])?y+x.slice(4):x,
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x},
 J={if:1,for:3,while:1,try:0,catch:1,throw:1}

 
 let t=()=>{let r                                      //t(): term
  if(!L($))return 0;r=$.pop();                         //next token
  if(i(")}];",r)){$.push(r);return 0}                  //terminator
  r.verb=i(V,r);λλ.n=Math.max(λλ.n,xyz.indexOf(S(r)))
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
   //return(!z)?p(x,y):y==":"?_(x,0,z):z.verb?c(p(x,y),z):sw(z,"IDEN(")?_(x,y,sl(z,3)):D(y,z,x)
   return(!z)?p(x,y):(z.verb&&":"!=y)?c(p(x,y),z):sw(z,"IDEN(")?_(x,y,sl(z,3)):y==":"?_(x,0,z):D(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
  
 i=(x,y)=>x.includes(S(y)),sw=(x,y)=>x.startsWith(y),sl=(x,y)=>x.slice(y,-1),
 a=(x,y,n)=>x in J?((n=CUTT(y=l(),[0,J[x]])),x+(J[x]?b("",n[0],";"):"")+(n[1].length?b("",n[1],";","{}"):"")+(0==J[x]?e(t()):"")):
  1==(n=(y=l()).length)?b("INDX",[y[0],F(x,f1)]):"$"==x&&y.length>2?C(y):y.undef?TRAP("no-projection"):b(F(x,f2),y.reverse()), //apply x[y] or x[y;z;..]
 C=x=>B(sl(JOIN(x.map((x,i)=>x+"?:"[i&1]),""),0)), //cond
 c=(x,y)=>v(B("(x,y)=>"+(i(f2,y)?cx(x,F(y,f2)+"(x,y)"):sw(y,"(x=>")?cx(x,sl(y,4)):sw(y,"((x,y)=>")?cx(x,sl(y,8)):cx(x,y+"(x)")))),
 cx=(x,y)=>sw(x,"(x=>")?sl(x,4).replace("(x,","("+y+","):b(i(V,x)?F(x,f1):x,y),                  //c:composition
 d=(x,r)=>v((x=="'"&&i(V,r)&&V.indexOf(r)<11)?b("PRIO",F(r,f2)):["EACH(","OVER(","SCAN("]["'/\\".indexOf(x)]+(x=="'"?H(r):G(r))+")"), //derived: +/ -> over(add)
 M=(x,y)=>b(F(x,f1),y),D=(x,y,z)=>b(F(a2(x),f2),[y,z]),j=(x,y)=>b("INDX",[x,y]),                   //monadic/dyadic/juxtaposition
 p=(x,y)=>TRAP("no-project 1+"),
 v=x=>((x=new String(x)).verb=true,x),S=x=>String(x),n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=(r,x)=>{r=[];while(L($)){r.push((x=e(t()))?x:(r.undef=1,"undefined"));if(";"!=$.pop())return 1==r.length&&r.undef?[]:r}},L=x=>x.length?x[x.length-1]:0, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(!r.length?"[]":r[0]):L($)==":"?b("",(r.forEach(x=>λλ.push(x)),r),",","[]"):"FLOP(["+r.reverse().join(",")+"])";return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z,s,i)=>B(sw(x,"INDX(")?((s=sl(x,1+(i=x.lastIndexOf(","))))+b("=AMEN",[z,F(y,f2),x.slice(3,i),s])):x+"="+(y?D(y,z,x):λλλ(x,z))),  //assign(4x:modified&indexed)
 λ=(r,t,X)=>{t=λλ;λλ=[];λλ.n=0;X=xyz;xyz="["==L($)?($.pop(),l().map(S)):["x","y","z"];r=l()
  if(1<r.length){r[r.length-1]="return "+L(r);r=b("",r,";","{}")}
  [t,λλ]=[λλ,t];[X,xyz]=[xyz,X];return B(b("",UNIQ(CATS(t,FLOP(X.slice(0,1+t.n)))).filter(x=>!(i(x,".")+sw(x,"["))))+"=>"+r)},λλ=[],λλλ=(x,y)=>(λλ.push(S(x)),y)
 
 while(L($)==";")$.pop();$.reverse()
 return JOIN(l(),";")
}

let/*k be*/
TYPE=x=>("number"===typeof x)?105:("string"==typeof x)?99:(Array.isArray(x)&&"t"in x)?x.t:TRAP("type"), //ciCIST  99 105-32*rank
BASE=x=>[0,99,99,99,105,105,105][1+[0,99,99-32,99-64,105,105-32,105-64].indexOf(TYPE(x))],
RANK=x=>[-1,0,0,1,1,2,2][1+[99,105,99-32,105-32,99-64,105-64].indexOf(TYPE(x))],
ATOM=x=>!RANK(x),
ATMC=f=>(x,y)=>(x=(BASE(x)<BASE(y))?UPTY(x):x,y=(BASE(y)<BASE(x))?UPTY(y):y,x=("cc"==BASE(x)+BASE(y))?UNDR(f,x,y):ATOM(x)?(ATOM(y)?f(x,y):MAPT(y,y=>f(x,y))):ATOM(y)?MAPT(x,x=>f(x,y)):MAPT(x,(x,i)=>ATMC(f)(x,y[i])),x)
UNDR=(f,x,y)=>FLOR(ATMC(f)(UPTY(x),UPTY(y))),
UPTY=x=>RANK(x)?EACH(UPTY)(x):x.charCodeAt(),

MAPT=(x,f,t)=>(t=x.t,x=x.map(f),x.t=t,x),

CHJS=x=>(x=x.split(""),x.t=99-32,x),
CHRS=x=>(x=Array(x).fill(   "\0"),x.t= 99-32,x),
INTS=x=>(x=Array(x).fill(     0 ),x=x.map((_,i)=>i),x.t=105-32,x),
STRS=x=>(x=Array(x).fill(CHRS(0)),x.t= 99-64,x),
MATR=x=>(x=Array(x).fill(INTS(0)),x.t=105-64,x),
UNFY=x=>(x.t=x.length?(ATOM(x[0])?TYPE(x[0])-32:x[0].t-32):95-32,x),

RECU=f=>x=>ATOM(x)?f(x):MAPT(x,RECU(f)),
VECT=x=>"string"!==typeof(x)?x:x.split("").map(x=>x.charCodeAt()),

EACH=f=>x=>UNFY(x.map(x=>f(x))),
//EACH=f=>(...x)=>1==x.length?(ATOM(x[0])?TRAP("rank"):x[0].map(x=>f(x))):FLIP(x).map(x=>f(...x)),
OVER=f=>(...x)=>1<x.length?FOLD(f,...x):x[0].reduce((a,x,i)=>i?f(x,a):a),
FOLD=f=>(...x)=>FLIP(x.slice(1)).reduce((a,x,i)=>i?f(...x[i],a):a,x[0]),
SCAN=f=>x=>x.length?((x=x.slice()).reduce((a,b,i)=>x[i]=i?f(b,a):a,x[0]),x):x,
LEFT=f=>(y,x)=>ATOM(x)?f(x,y):x.map((x,i)=>f(y,x)),
RITE=f=>(y,x)=>ATOM(y)?f(x,y):(MAPT(y,y=>f(y,x)))  ,
BOTH=f=>(y,x)=>ATOM(x)?RITE(f)(x,y):ATOM(y)?LEFT(f)(y,x):x.map((x,i)=>f(y[i],x)),
PRIO=(f,y)=>x=>x.map((x,i,a)=>f(i?a[i-1]:y?y:a[0],x)),

IDEN=x=>x,
NEGT=RECU(x=>-x),
SQAR=RECU(x=>x*x),
SQRT=RECU(x=>TRAP("no-float")),
MAGN=RECU(x=>x<0?-x:x),
FLIP=x=>ATOM(x)?x:Array(OVER(MAXX)(EACH(LENG)(x))).fill(0).map((_,i)=>x.map(x=>ATOM(x)?x:x[i])),
FLOP=x=>ATOM(x)?x:x.toReversed(),
GRAD=x=>IOTA(LENG(x)).sort((a,b)=>(a=x[a])<(b=x[b])?-1:a>b?1:0),
DOWN=x=>IOTA(LENG(x)).sort((a,b)=>(a=x[a])>(b=x[b])?-1:a<b?1:0),
FREQ=x=>x.reduce((r,x)=>{r[x]=r[x]?r[x]+1:1;r},{}),
NOTT=RECU(x=>+!x),
VALU=x=>(typeof x==="string")?eval(PARS(x)):x.constructor===Object?Object.values(x):x,
IOTA=(x,t)=>(t=TYPE(x),x=(105==t?INTS(x<0?TRAP("domain"):x):(t==105-32)?WERE(x):TRAP("iota")),x),
WERE=x=>(x=(ATOM(x)?LIST(x):x).flatMap((x,i)=>Array(x).fill(i)),x.t=105-32,x),
HEAD=x=>ATOM(x)?x:x.length?x[0]:0,
UNIQ=x=>ATOM(x)?todo(x):x.filter((y,i)=>i===x.indexOf(y)),
SORT=(x,f,t)=>(t=x.t,x.toSorted(f),x.t=t,x),
LENG=x=>ATOM(x)?1:x.length,
FLOR=RECU(x=>(x<0)?TRAP("domain"):String.fromCharCode(x)),
LIST=(x,t)=>(t=TYPE(x),x=(t<99-32)?TRAP("RANK"):[x],x.t=t-32,x),
STRN=x=>Array.isArray(x)?x.every(x=>!isNaN(x))?(1==x.length)?","+String(x):x.map(String).join(" "):"("+x.map(STRN).join(";")+")":("function"===typeof x)?String(x):JSON.stringify(x),
WRIT=(y,x)=>{o.innerText+=y+"\n";return y},

DEXX=(y,x)=>y,
PLUS=ATMC((y,x)=>~~(x+y)),
SUBS=ATMC((y,x)=>~~(x-y)),
MULT=ATMC((y,x)=>~~(x*y)),
IDIV=ATMC((y,x)=>~~(x/y)),
//MODU=ATMC((y,x)=>x?(y%=x,y+x*+(y<0)):y),
//IDIV=ATMC((y,x)=>x?~~((y-(x-1)*+(y<0))/x):y),
MINN=ATMC((y,x)=>x<y?x:y),
MAXX=ATMC((y,x)=>x>y?x:y),
LESS=ATMC((y,x)=>+(x<y)),
MORE=ATMC((y,x)=>+(x>y)),
EGAL=ATMC((y,x)=>+(x==y)),

MATC=(y,x)=>(TYPE(x)!=TYPE(y))?0:(ATOM(x)?+(x==y):(x.length!=y.length)?0:+x.every((x,i)=>MATC(x,y[i]))),
INDX=(y,x)=>"function"===typeof x?x(y):ATOM(x)?x:!ATOM(y)?RITE(INDX)(y,x):(y=x[y])!==undefined?y:TRAP("index"),
AMEN=(y,f,i,x)=>{x=x.slice();(ATOM(i)?(y=[y],[i]):i).forEach((i,j)=>x[i]=(f?f:DEXX)(ATOM(y)?y:y[j],x[i]));return x},
FIND=(y,x)=>ATOM(y)?(-1<(y=x.indexOf(y))?y:x.length):(x=RITE(FIND)(y,x),x.t=105-32*RANK(x),x),
CUTT=(y,x,t,ty)=>(ty=(1!=RANK(y))?TRAP("rank"):TYPE(y),t=TYPE(x),y=(t==105)?(x<0?CUTT(y,0|y.length/-x):CUTT(y,MULT(0|y.length/x,IOTA(x)))):(t==105-32)?[...x].map((x,i,a)=>(x=y.slice(x,a[i<a.length-1?1+i:a.length]),x.t=ty,x)):TRAP("type"),y.t=ty-32,y),
TAKE=(y,x)=>ATOM(x)?INDX(x<0?PLUS(y.length+x,IOTA(-x)):IOTA(x),y):x.filter(x=>y.includes(x)),
DROP=(y,x,t)=>(t=TYPE(y),x=ATOM(x)?(x<0?y.slice(0,x):y.slice(x)):x.filter(x=>!y.includes(x)),x.t=t,x),
CATS=(y,x,t)=>(x=ATOM(x)?LIST(x):x,y=ATOM(y)?LIST(y):y,t=TYPE(x),x=(t!=TYPE(y))?TRAP("type"):x.concat(y),x.t=t,x),
PRNT=(...x)=>2===x.length?(console.log(x[1]+"$",x[0]),x[0]):(console.log(...FLOP(x)),1==x.length?x[0]:x),
SPLT=(y,x)=>y.split(x),
JOIN=(y,x)=>y.join(x)

/*
//use as k0 repl in quickjs, otherwise web.
if("os"in globalThis){let _K=x=>STRN(eval(PARS(x))),_a=scriptArgs.slice(1),_i,_s
 for(_i=0;_i<_a.length;_i++){_s=_a[_i]
  if(_s.endsWith(".k"))_K(std.loadFile(_a[_i]))
  if(_s.endsWith(".js")) std.loadScript(_a[_i])
  if(_s=="-e"){if(_i<_a.length-1)PRNT(_K(_a[1+_i]));std.exit(0)}}
 std.puts("k0.js\n");while(1){std.puts(" ");try{PRNT(_K(std.in.getline()))}catch(_e){console.log(_e)}}}
*/

/*
monadic
 :+-*%&|<>=~.!@?^#_,$
ccc-c------i-------CC
iiiii-I----i-I----cIC
CCC-C--CII-i--cCCi-SC
IIIII-IIII-i-IiIIiCTC
SSS-S-SSII-i--CSSi--C
TTTTT-TTII-i--ITTiS-C

dyadic    y:ciCIST  x(down)             
:     +    -      *     %     &     |     <     >     =     ~     .     !     @     ?     ^     #     ,     $     
ciCISTciCISTciCISTciCISTciCISTciCISTciCISTiiIITTiiIITTiiIITTiiiiii------------------------------------C-C---CCCCCC
ciCISTiiIIITiiIIITiiIIITiiIIITiiIIITiiIIITiiIITTiiIITTiiIITTiiiiii--------------------------ST--CICIST-I-I--CCCCCC
ciCISTCICISTCICISTCICISTCICISTCICISTCICISTIIIITTIIIITTIIIITTiiiiii-------------c-C---c-C--------------C-C---CCCCCC
ciCISTIIIITTIIIITTIIIITTIIIITTIIIITTIIIITTIIIITTIIIITTIIIITTiiiiii-------------i-I---i-I----ST---------I-I--------
ciCISTSISTSTSISTSTSISTSTSISTSTSISTSTSISTSTTTTTTTTTTTTTTTTTTTiiiiii-------------C-S---C-S------------------S-------
ciCISTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTiiiiii-------------I-T---I-T-------------------T------
*/
