let /*k*/
type =x=>x.constructor.name,
neg  =x=>rec(x=>-x),
sqr  =x=>rec(x=>x*x),
sqrt =x=>rec(x=>math.Sqrt(x)),
flip =x=>atom(x)?x:over(max,each(count,x)).fill(0).map((_,i)=>x.map((_,j)=>x(j,i))),
rev  =x=>atom(x)?x:x.reverse(),
up   =x=>{x=til(count(x));return x.sort((a,b)=>a<b?-1:a>b?1:0)},
down =x=>{x=til(count(x));return x.sort((a,b)=>a>b?-1:a<b?1:0)},
freq =x=>x.reduce((r,x)=>{r[x]=r[x]?r[x]+1:1;r},{}),

sort =x=>x.toSorted(),


/*
+ type   add
- neg    sub
* sqr    mul
% sqrt   div   inv idiv mod
& flip   min
| rev    max
< up     less
> down   more
= freq   eql
~ not    not   match
. value  call  parse
! til    dict  key
@ first  at
? uniq   find
^ sort   cut
# count  take
_ floor  drop
, enlist cat
$ string
' each   both 
/ over   right dec join  fix
\ scan   left  enc split

rec atom
*/
