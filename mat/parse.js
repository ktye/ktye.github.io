let jsparse=x=>{const tests=`1                      /1
1+2                    /add(1,2)
1 2 3                  /mat(1,3,[1,2,3])
1a90 2i3               /mat(1,2,[0,1,2,3])
?10a                   /randz(10)
x+y                    /add(x,y)
x/y                    /div(x,y)
-A                     /neg(A)
\`js\`                   /js
2 3#A                  /reshape(A,...mat(1,2,[2,3]))
-2^A                   /reshape(A,-2)
A[0]                   /at(A,0)
A[1,2]                 /at(A,1,2)
A[x,]                  /row(A,x)
A[,x]+=y               /setcol(A,x,add(col(A,x),y))
A[1:2,:3]              /at(A,add(1,til(2-1)),til(3))
T[,.ab.cd]             /col(T,["ab","cd"])
A . B                  /dot(A,B)
A'B                    /dot(trans(A),B)
/A                     /sum(A)
A\\B                    /solve(A,B)
ok                     /ok`;
let test=(a,b)=>{let r=jsparse(a);if(r!=b){throw new Error("^ got:                  "+r)}},runtests=()=>{let r="/*\n",s=tests.split("\n"),t=s.map(x=>x.split(/ +\//)),i;for(i=0;i<t.length;i++){r+=s[i]+"\n";try{test(t[i][0],t[i][1])}catch(e){r+=e.message;break}};return r+"*/''"}
if(x=="?")return runtests()


let token=x=>{x=x.replaceAll(",",";");let C,c,i=x=>split(x,"").map(x=>x.charCodeAt()),
 S=" \t",                    //space
 L="({[;\n",                 //left
 R=")}]",                    //right
 A="'",                      //adverb
 V="+-*/&|<>=^!~,#_$?@.",    //verb
 T=[" ;)+'a0q`-:e\\n",       //state transition table
    ";;)+'a0q`-+a';",
    ");)+'a0q`++a';",
    "+;)+'a0q`-+a';",
    "';)+'a0q`-+a';",
    "a;)+'bbq`++b';",
    "0;)+'11q`+:e';",
    "qrrrrrrtrrrrsr",
    "`jjjjjjjjjjjjj",
    "-;)+'a1q`-+a';",
    ":;)+'a0q`-+a';",
    "b;)+'bbq`++b';",
    "1;)+'11q`+1e';",
    "e;)+'11q`1+1';",
    "rrrrrrrtrrrrsr",
    "srrrrrrrrrrrrr",
    "jjjjjjjjtjjjjj",
    "t;)+'a0q`++a'';"];T=drop(T,1);let t0=i(join(each(first)(T),""));T=each(x=>find(i(x).slice(1),t0))(T)
  C=[i(S+L),i(R),i(V),i(A),cat(add(65,til(26)),add(97,til(26))),i("0123456789."),...each(list)(i("\"`-:e\\\n"))];
  C=C.reduce((a,x,i)=>amend(i,0,x,a),add(-1,where(256)))
  return drop(cut(x=" "+x,where(more(scan((x,y)=>T[y][x])(at(i(x),C)),10))).map(x=>x=="\n"?";":x),1)},
  

parse=$=>{$=$.filter(x=>x.trim().length);if(!$.length)return"" //rm space&comments
 let nm=x=>!isNaN(parseFloat(x)),tiny=x=>Math.abs(x)<2e-16?0:x
 let complex=x=>"`complex("+x+")`",zi=(x,y)=>x+","+y,za=(x,y)=>{x=+x;y=+y;y=Math.PI*y/180;return String(x*tiny(Math.cos(y)))+","+String(x*tiny(Math.sin(y)))}
 let zzz=(x,a)=>{let z=x.split(a),x0=z[0],x1=z[1]||"0";return z.length!=2||!(nm(x0)&&nm(x1))?x:complex(a=="a"?za(x0,x1):zi(x0,x1))}
 let swz=x=>x.startsWith("`complex"),unz=x=>x.map(x=>swz(x)?x.slice(9,-2):x+",0")
 let zz=x=>{let a=1+x.indexOf("a"),i=1+x.indexOf("i");return a?zzz(x,"a"):i?zzz(x,"i"):x}
 $=$.map(zz)
 let k=scan((x,y)=>x+x*y)($.map(x=>+(swz(x)||nm(x)))),ax=x=>x.constructor===Array,                     
 b=(x,y,s,q)=>x+(q?q[0]:"(")+(ax(y)?y.join(s?s:","):y)+(q?q[1]:")"),B=x=>b("",x)      //join numeric vectors
 $=$.reduce((a,x,j)=>{a.push(1==k[j]?[x]:1<k[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?`mat(1,${x.length},${b("",x.some(swz)?unz(x):x,",","[]")})`:x)
 $=$.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings

 
 let V=":+-*/&|<>=~.!@?^#_,$\\'",xyz=[],
 f1="til Abs neg sqr sum where rev up down freq not value til first rand sort dims floor list string qr each".split(" "),
 f2="dex add sub mul div min max less more eql match dot dict at find cut reshape drop cat print solve both".split(" "),
 F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x}

 while($.length&&$.at(-1)==";")$.pop();
 let $i=0,$n=$.length
 let L=()=>$i>=$n?0:$[$i]
 let pop=()=>$[$i++]
 let push=x=>$[--$i]=x
 
 let t=()=>{let r                                      //t(): term
  if(!L())return 0;r=pop();                            //next token
  if(i(")}];",r)){push(r);return 0}                    //terminator
  r.verb=i(V,r);
  if(r=="{")r="{"+R()+"}"
  if(r=="(")r=R()                                      //(1) and (1;2;3) and (x;y):
  if(r[0]=="`")r=sl(r,1)                               //`js`
  if(r.length>1&&r[0]==".")r=vs(r)                     //.a.b => ["a","b"]
  while(1){                                            //adverb and [application]
   if(!L())return r;let p=pop()
   if(p=="'")r=`trans(${r})`                           //derive
   //else if(p=="["){let i=$i;r=a(r);if($[$i]=="="||$[1+$i]=="="){$i=i;r=as(r)}}      //index index-asn
   else if(p=="[")r=a(r)                               //index
   else{push(p);break}}
  return r},
 
 e=x=>{let y,z                               //e(t()): expr
  if(!x)return 0;if(!(y=t()))return G(x)     //x or primitive
  if(y.verb&&!x.verb){z=e(t());return(!z)?p(x,y):(z.verb&&"="!=y)?c(p(x,y),z):sw(z,"freq(")?_(x,y,sl(z,5)):y=="="?_(x,0,z):D(y,z,x)}
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):M(x,z)},
  
 i=(x,y)=>x.includes(S(y)),sw=(x,y)=>x.startsWith(y),sl=(x,y)=>x.slice(y,-1),w=x=>x[0]
 a=(x,y,n)=>1==(n=(y=l()).length)?`at(${x},${y[0]})`:y.undef?I(x,y,n):`at(${x},${y.join(",")})`, //apply x[y] or x[y;z;..]
 c=(x,y)=>v(B("(x,y)=>"+(i(f2,y)?cx(x,F(y,f2)+"(x,y)"):sw(y,"(x=>")?cx(x,sl(y,4)):sw(y,"((x,y)=>")?cx(x,sl(y,8)):cx(x,y+"(x)")))),
 cx=(x,y)=>sw(x,"(x=>")?sl(x,4).replace("(x,","("+y+","):b(i(V,x)?F(x,f1):x,y),                  //c:composition
 M=(x,y)=>x=="?"&&sw(y,"complex")?`randz(${y.slice(8,y.indexOf(","))})`:b(F(x,f1),y), //monadic
 D=(x,y,z)=>x=="#"?`reshape(${y},...${z})`:x=="^"?`reshape(${y},${z})`:x==":"?g(z,y):b(F(x,f2),[z,y]), //dyadic
 g=(x,y)=>`add(${x},til(${y}-${x}))`  //range x:y
 j=(x,y)=>sw(y,"trans(")?`dot(${y},${x})`:b(y,x),                   //jux
 p=(x,y)=>v(B(b("x=>"+F(y,f2),["x",x]))),                                                        //project 1+
 v=x=>((x=new String(x)).verb=true,x),S=x=>String(x),n=x=>((x=new String(x)).verb=false,x),   //mark verb/noun
 l=(r,x)=>{r=[];while(L()){r.push((x=e(t()))?x:(r.undef=1,"undefined"));if(";"!=pop())return 1==r.length&&r.undef?[]:r}}, //list e;e;e[terminator]
 R=()=>{let r=l();r=1==r.length?n(r[0]):(!r.length)?n(" "):L()=="="?b("",r,",","[]"):r.join(",");return r},
 G=x=>i(V,x)?v(F(x,f2)):x,                                                                                //- -> neg
 H=x=>i(V,x)?("((x,y)=>y===undefined?"+F(x,f1)+"(x):"+F(x,f2)+"(x,y))"):i(f2,x)?H(V[f2.indexOf(S(x))]):x, //neg -> ambivalent
 _=(x,y,z)=>sw(x,"at(")||sw(x,"col(")||sw(x,"row(")?as(x,y,z):y?`(${x}=${F(y,f2)}(${x},${z}))`:`(${x}=${z})`,
 as=(x,y,z, s)=>(s=w(sl(x,3)),`set${sl(x,0)},`+(y?`${F(y,f2)}(${x},${z})`: z)+")"),
 vs=x=>"["+x.split(".").slice(1).map(x=>'"'+x+'"').join(",")+"]",
 I=(x,y,n)=>y[0]=="undefined"?`col(${x},${y[1]})`:`row(${x},${y[0]})`  //x[;y]
 
 return join(l(),";")
}



let/*k*/
atom  =x=>"number"===typeof x||"string"===typeof(x)&&1==x.length,
atomic=f=>(x,y)=>atom(x)?(atom(y)?f(x,y):y.map(y=>atomic(f)(x,y))):atom(y)?x.map(x=>atomic(f)(x,y)):x.map((x,i)=>atomic(f)(x,y[i])),
curry =(f,a,i)=>(i=a.map((x,i)=>x==undefined?i:-1).filter(x=>-1<x),(...x)=>(x.forEach((x,j)=>a[i[j]]=x),f(...a))), 
rec   =f=>x=>atom(x)?f(x):x.map(rec(f)),

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
//string=x=>(typeof x==="string"||typeof x==="object")?JSON.stringify(x):(atom(x)||typeof x==="function")?String(x):x.every(x=>!isNaN(x))?x.map(String).join(" "):"("+x.map(string).join(";")+")",

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

return parse(token(x))}

