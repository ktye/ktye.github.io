let  /*k*/

atom  =x=>typeof x==="number",
atomic=f=>(x,y)=>atom(x)?(atom(y)?f(x,y):y.map(y=>atomic(f)(x,y))):atom(y)?x.map(x=>atomic(f)(x,y)):x.map((x,i)=>atomic(f)(x,y[i])),
rec   =f=>x=>atom(x)?f(x):x.map(rec(f)),

each  =f=>x=>atom(x)?f(x):x.map(f),
over  =(f,y)=>x=>{y=y?y:0;if(!atom(x))x.forEach(x=>y=f(y,x));return y},
scan  =(f,y)=>x=>{y=y?y:first(x);return atom(x)?x:x.map(x=>y=f(y,x))},
left  =f=>(x,y)=>atom(x)?f(x,y):x.map((x,i)=>f(x,y)),
right =f=>(x,y)=>atom(y)?f(x,y):y.map((y,i)=>f(x,y)),
both  =f=>(x,y)=>atom(x)?right(f)(x,y):atom(y)?left(f)(x,y):x.map((x,i)=>f(x,y[i])),

type  =x=>x.constructor.name,
neg   =rec(x=>-x),
sqr   =rec(x=>x*x),
sqrt  =rec(Math.sqrt),
flip  =x=>atom(x)?x:over(max,each(count,x)).fill(0).map((_,i)=>x.map((_,j)=>x(j,i))),
rev   =x=>atom(x)?x:x.reverse(),
up    =x=>{x=til(count(x));return x.sort((a,b)=>a<b?-1:a>b?1:0)},
down  =x=>{x=til(count(x));return x.sort((a,b)=>a>b?-1:a<b?1:0)},
freq  =x=>x.reduce((r,x)=>{r[x]=r[x]?r[x]+1:1;r},{}),
not   =rec(x=>+!x),
value =x=>(typeof x==="string")?eval(parse(x)):x.constructor===Object?Object.values(x):x,
til   =x=>(typeof x==="string")?token(x):atom(x)?Array(x<0?0:x).fill(0).map((_,i)=>i):where(x),
where =x=>Array(x.flatMap((x,i)=>Array(x).fill(i))),
first =x=>atom(x)?x:x.length?x[0]:0,
uniq  =x=>atom(x)?rand(x):x.filter((y,i)=>i===x.indexOf(y)),
rand  =x=>atom(x)?Array(x).fill(0).map(Math.random):x.toSorted((a,b)=>0.5-Math.random()),
sort  =x=>x.toSorted(),
count =x=>atom(x)?1:x.length,
floor =rec(Math.floor),
list  =x=>[x],
string=x=>atom(x)?String(x):x.every(atom)?x.map(String).join(" "):"("+x.map(string).join(";")+")",

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
at    =(y,x)=>(typeof x==="function")?x(y):atom(x)?x:atom(y)?x[y]:right(at)(x,y),
find  =(y,x)=>atom(y)?(-1<(y=x.indexOf(y))?y:x.length):right(find)(x,y),
cut   =(y,x)=>atom(x)?(x<0?cut(Math.floor(y.length/-x),y):cut(mul(Math.ceil(y.length/x),til(x)),y)):[...x].map((x,i,a)=>y.slice(x,a[i<a.length-1?1+i:a.length])),
take  =(y,x)=>atom(x)?at(y,x<0?add(y.length+x,til(-x)):til(x)):x.filter(x=>y.includes(x)),
drop  =(y,x)=>atom(x)?(x<0?y.slice(0,x):y.slice(x)):x.filter(x=>!y.includes(x)),
cat   =(y,x)=>atom(x)?cat(list(x),y):x.concat(y),
split =(y,x)=>y.split(x),
join  =(y,x)=>y.join(x),
dec   =(y,x)=>y.slice(1).reduce((r,y,i)=>y+mul(at(x,i),r),first(y)),
enc   =(y,x)=>rev(rev(x).map(x=>{let t=mod(x,y);y=idiv(x,y);return t}))


/*             (implicit)
+ type   add
- neg    sub
* sqr    mul
% sqrt   div   inv idiv mod
& flip   min   (and)
| rev    max   (or)
< up     less
> down   more
= freq   eql
~ not    match
. value        parse
! til    dict  where (repeat) key token
@ first  at
? uniq   find  rand (shuffle)
^ sort   cut
# count  take
_ floor  drop
, list   cat
$ string
' each   both 
/ over   right dec join  fix
\ scan   left  enc split

atom atomic rec
*/
