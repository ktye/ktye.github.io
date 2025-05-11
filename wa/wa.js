console.log("xx")
/*
ez eq ne lt lu gt gu
cz ct pc
ad su mu di du mo mu
an or xo sl sr su rl rr
ab ng ce fl tr na sq cs
io jo ju eo eu 
ir jr er fr
li lj le lf lg lb lh ls
si sj se sf sg    sh
sz gr cp fi

0 0n 3.1 fc(3) ec(3)  literal
"x" get
as assign
te

wh    while
cn    cond if-else  cn(c,i) cn(c,i,e) cn(c,i,c,i,c,e)
dr    drop
br(1) break br(0) continue

ez4560     eq46515b61 ne47525c62 lt48535d63 lu4954
gt4a555e64 gu4b56     cz6779     ct687a     pc697b
ac6a7c92a0 su6b7c93a1 mu6c7394a2 di6d7f95a3 du6f80
mo7081     mu7182     an7183     or7284     xo7385 
sl7486     sr7587     su7688     rl7789     rr788a
ab    8b99 ng    8c9a ce    8d9b fl    8e9c 
tr    8f9d na    909e sq    919f mi    96a4 
ma    97a5 cs    98a6


gt:4a555e64 sl:7486ac6a7c92a0 ez:4560ab00008b99 mo:7081
tr:00008f9d gu:4b56ma000097a5 mu:7182eq46515b61 sr:7587
su:6b7c93a1 cz:6779ng00008c9a an:7183na0000909e su:7688
cs:000098a6 lu:4954lt48535d63 pc:697bdi6d7f95a3 du:6f80
fl:00008e9c xo:7385mi000096a4 rr:788ane47525c62 ct:687a
mu:6c7394a2 or:7284ce00008d9b rl:7789sq0000919f

iff(le(x,0))(as(x,0))

fn("abc","i:ii")()

iff(x)(a,b,c),end()
cond(x)
ife(d
cn(le(x,0))()

iff(le(x,0))(a,b,c)
ife(le(x,0))(a,b,c)
ife(le(x,0))(a,b)(ife(le(x,2))()())
wile()(le(x,0))(a,b,c)

f=x=>(...y)  [y.flat(),

let[x,y,z,a,b,c,n,i,j]="xyzabcnij".split("") 
wa(fn("add i:ii",ad(x,y)),fn("sub i:ii",su(x,y)))

lo( )(c)(b)
cn(a)(b)(c)
fn("add:i:ii")
wa("initialdata..",          //first arg may be the initial data section
 fn("cos:f:f"),              //
 fn("inc:i:i",ad(x,ic(1))))

let o=[],p=(...x)=>(o.push(...x),x[0]),
f=x=>(...y)=>(p(255&x>>8*y[0]),y[0]),
[ad,su,mu,di,du,lt,gt,le,ge,lu,gu]=
[0xa0927c6a,0xa1937d6b,0xa2947e6c,0xa2947e6d,32878,0x635d5348,0x645e554a,
 0x655f574c,0x6660594e,21581,22091].map(f)
console.log("o",o)
*/


let o=[],p=(...x)=>o.push(...x),
f=x=>(...y)=>(p(255&x>>8*y[0]),y[0]),
[ez,   eq,   ne,   lt,lu,   gt,gu,   le,   ge, cz, ct, cx,   ad,   su,   mu,   di, du, mo, rm, an, or, xo, sl, sa, sr, rl, rr,  dr,  se,  re]=
[69,24902,25159,25416,73,25674,75,25932,26190,103,104,105,41066,41323,41580,41837,110,111,112,113,114,115,116,117,118,119,120,6682,6939,3855].map(f),
[ ab, ng, ce, fl, tr, na, sq, mi, ma, cs]=[153,154,155,156,157,158,159,164,165,166].map(x=>f(x<<8)),
io=x=>(p(167),0),fo=x=>(p(183),1),sz=x=>(p(63,0),0),gr=x=>(p(64,0),0),cp=x=>(p(252,10,0,0),-1),fi=x=>(p(252,11,0,0),-1),
li=x=>(p(40,2,0),0),lf=x=>(p(43,3,0),1),lc=x=>(p(44,1,0),0),lb=x=>(p(45,1,0),0),st=(x,y)=>p(54+3*y,2+y,0),sc=(x,y)=>p(58,0,0)
eu=(x,b)=>{do{b=x&127;p((x>>>=7)?b|=128:b)}while(x)},
ei=(x,b)=>{while(1){b=x&127;x>>=7;if(x==0&&!(b&64)||(x==-1&&(b&64))){p(b);break};p(b|128)}},
ic=x=>(o.push(65),ei(x),0),
fc=x=>(p(68,[...new Uint8Array(new Uint64Array([x]).buffer)]),1),
lo=_=>(p(2,3),_=>(p(69,4,64),_=>p(14,0,11,11))),
cn=_=>(p(4,64),_=>(p(5),_=>p(11))),
da=(x,y)=>[x,y], //da(offset,"str")

sp=(x,y)=>x.split(y),
ns=x=>[...eu(x.length),...sp(x,"").map(x=>x.charCodeAt(0))],
ty=x=>[0,127,126,125,124][x],
tp=x=>sp(".i.j.e.f",".").indexOf(x),
fn=x=>(x={n:(x=sp(x,":"))[0],s:x[1]+":"+x[2],c:o},o=[],x),
gl=(x,y)=>(x={n:x,t:y,c:o},o=[],x),
ws=(x,y)=>(y.length&&y[0]!=0?p(x),eu(y.length),p(...y)):0, //section
wv=x=>(eu(x.length),p(...x.flat())),                 //encode vector
wx=x=>{},                                            //exports..
wa=x=>{let d=x.filter(x=>x.length),                  //data
 f=x.filter(x=>x.s),                                 //funcs
 F=f.filter(x=>x.c),                                 //funcs without imports
 s=f.map(x=>x.s).filter((x,i,a)=>i==a.indexOf(x)),   //signatures
 n=f.map(x=>x.n),                                    //names
 g=x.filter(x=>x.t),                                 //globals
//...
 o=[0,97,115,109,1,0,0,0]
 ws(1,wv(s.map((x,r,a)=>([r,a]=sp(x,":"),[96,a.length,...sp(a,"").map(x=>ty(tp(x)),r.length,...sp(r,"").map(x=>ty(tp(x))))))))
 ws(2,wv(f.filter(x=>!x.c).map(x=>[1,97,...ns(x.n),0,..eu(s.indexOf(x.s))])))  //imports
 ws(3,wv(F.map(x=>eu(s.indexOf(x.s))))) //signature index list
 ws(5,[1,0,1])          //memory 1seg,unshared,1block
 ws(6,wv(g.map(x=>[ty(x.t),1,...x.c])))
 ws(7,wv([...ns("memory"),2,0,...F.map((x,i)=>[...ns(x.n),0,...eu(i)]))) //export memory&all functions
 //ws10
 // sect(10,vect(funs.filter(x=>!x.import).map(x=>((x=[...locs(x),...x.code,11]),[...lebu(x.length),...x]))))
 // locs=x=>{let t=new Map();Object.values(x.lo).forEach(x=>t.set(x,(t.has(x)?1+t.get(x):1)));let r=vect([...t.keys()].map(x=>[...lebu(t.get(x)),Number(x)]));return r}
 //
 if(x[0])ws(11,wv(d.map(x=>[0,65,...eu(x[0]),11,...ns(x[1])])))
 return o}


