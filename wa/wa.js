
let o=[],v={},p=(...x)=>o.push(...x),
f=x=>(...y)=>(p(255&x>>8*y[0]),y[0]),
[ez,    eq,        ne,        lt,        lu,    gt,        gu,    le,        ge,        cz,    ct,    cx,   ]= 
[0x5045,0x615b5146,0x625c5247,0x635d5348,0x5449,0x645e554a,0x564b,0x655f574c,0x6660594e,0x7a67,0x7968,0x7b69].map(f),
[ad,        su,        mu,        di,        du,    mo,    rm,    an,    or,    xo,    sl,    sa,    sr,    rl,    rr,    dr,        se,        re        ]=
[0xa0927c6a,0xa1937d6b,0xa2947e6c,0xa3957f6d,0x806e,0x816f,0x8270,0x8371,0x8472,0x8573,0x8674,0x8775,0x8876,0x8977,0x8a78,0x1a1a1a1a,0x1b1b1b1b,0x0f0f0f0f].map(f),
[ ab, ng, ce, fl, tr, na, sq, mi, ma, cs]=[0x998b,0x9a8c,0x9b8d,0x9c8e,0x9d8f,0x9e90,0x9f91,0xa496,0xa597,0xa698].map(x=>f(x<<16)),
io=x=>(p(167),0),fo=x=>(p(183),1),sz=x=>(p(63,0),0),gr=x=>(p(64,0),0),cp=x=>(p(252,10,0,0),-1),fi=x=>(p(252,11,0,0),-1),
li=x=>(p(40,2,0),0),lf=x=>(p(43,3,0),1),lc=x=>(p(44,1,0),0),lb=x=>(p(45,1,0),0),st=(x,y)=>p(54+3*y,2+y,0),sc=(x,y)=>p(58,0,0)
eu=(x,b,r)=>{r=[];do{b=x&127;r.push((x>>>=7)?b|=128:b)}while(x);return r},
ei=(x,b)=>{while(1){b=x&127;x>>=7;if(x==0&&!(b&64)||(x==-1&&(b&64))){p(b);break};p(b|128)}},
ic=x=>(o.push(65),ei(x),0),
fc=x=>(p(68,[...new Uint8Array(new Uint64Array([x]).buffer)]),1),
pa=(x,y,l)=>(v[x]={i:eu(Object.keys(v).length),t:tp(y),a:!l},tp(y)),
as=(x,y)=>(((!(x in v))?pa(x,y,1):0),p(33,...v[x].i),-1),
va=x=>(p(32,...v[x].i),v[x].t),
lo=_=>(p(2,3),_=>(p(69,4,64),_=>p(14,0,11,11))),
cn=_=>(p(4,64),_=>(p(5),_=>p(11))),
da=(x,y)=>[x,y], //da(offset,"str")

sp=(x,y)=>x.split(y?":":""),
ns=x=>[...eu(x.length),...sp(x).map(x=>x.charCodeAt(0))],
ty=x=>[0,127,126,125,124][1+x],
tp=x=>sp("i:j:e:f",1).indexOf(x),
fn=(x,...y)=>(x={n:x,s:((y=y[y.length-1])>=0?y:"")+":"+Object.values(v).filter(x=>x.a).map(x=>x.t).join(""),c:o,l:v},o=[],v={},x),
gl=(x,y)=>(x={n:x,t:y,c:o},o=[],x),
ws=(x,y)=>(y=[...eu(y.length),...y.flat()],p(x,...eu(y.length),...y)), //section
wx=x=>{},                                            //exports..
wa=(...x)=>{let r,d=x.filter(x=>x.length),           //data
 f=x.filter(x=>x.s),                                 //funcs
 F=f.filter(x=>x.c),                                 //funcs without imports
 s=f.map(x=>x.s).filter((x,i,a)=>i==a.indexOf(x)),   //signatures
 n=f.map(x=>x.n),                                    //names
 g=x.filter(x=>x.t),                                 //globals
 v=f=>(f=Object.values(f.l).filter(x=>!x.a).map(x=>[1,ty(x.t),...x.i]),[...eu(f.length),...f.flat()])
 o=[0,97,115,109,1,0,0,0]
 ws(1,s.map((x,r,a)=>([r,a]=sp(x,1),[96,a.length,...sp(a).map(x=>ty(Number(x))),r.length,...sp(r).map(x=>ty(Number(x)))])))
 ws(2,f.filter(x=>!x.c).map(x=>[1,97,...ns(x.n),0,...eu(s.indexOf(x.s))]))  //imports
 ws(3,F.map(x=>eu(s.indexOf(x.s)))) //signature index list
 p(5,3,1,0,1)                       //memory 1seg,unshared,1block
 ws(6,g.map(x=>[ty(x.t),1,...x.c]))
 ws(7,[[...ns("memory"),2,0],...F.map((x,i)=>[...ns(x.n),0,...eu(i)])]) //export memory&all functions
 ws(10,F.map((x,y)=>((y=[...v(x),...x.c,11]),[...eu(y.length),...y])))
 ws(11,d.map(x=>[0,65,...eu(x[0]),11,...ns(x[1])]))
 r=new Uint8Array(o);o=[];v={};return r}
