
let ref=`j stack language          parse                      list operators                      
                            (comment)                  #     length/non-list: -1         
32-bit type system          abc   symbol (max 6)       ,     cat                         
  ..000 list[quotation]     123   int (max 31 bit)    []i@   index                       
  ....1 int  x>>1           [..]  list/quote          [a]i v$store       [a]"#v$ (append)
  ...10 symbol x>>2                                                                      
  ..100 operator x>>3     numeric operators (dyadic) assign/quote/exec                   
heap memory                  +-*/% arith               [p][a]: assign [p] to symbol a    
  0     total memory(log)    <=>   compare             a       lookup symbol a and exec  
  1     stack                                          [p].    exec                      
  2     stack(swap)                                                                      
  3     key/val list      stack operators            control                             
  4..32 free list           ~"_|  swap dup pop roll    c[t][e]?      (if c then t else e)
  33... data(buckets)          !  print stack          }  pop/push to swap stack         
unused '\\^;               canvas draw [arg][func]&     {  pop/push from swap stack       

SOURCE (j.w)

stk:V:I{}draw:V:II{}

j:I:I{(~I 0)? :ii x;(1~lu 110)?((41~x)?110 as 0;rz);(40~x)?(110 as 1;rz);                       /p
 n:lu 114;(47<x)?(58>x)?(x-:48;(~x|n)?(pc 1;rz);n*:10;n+:x;114 as n;rz);n?(pc 1|n<<1;114 as 0); /a
 y:lu 118;(96<x)?(123>x)?(y*:32;y+:x-96;118 as y;rz);y?(pc 2|y<<2;118 as 0);                    /r
 $[33>x;(10~x)?(exe x;pu mk 0; :1);91~x;pu mk 0;93~x;pc lp;pc 4|(x-33)<<3];0}                   /sexe

ii.I:I{0::x;p:128;i:7;(i<x)?/((4*i)::p;p*:2;i+:1);4::mk sz;8::mk sz;(4+I 4)::0;(4+I 8)::0;pu mk 0;12::mk 0;110 as 0;114 as 0;118 as 0;x}
bk.I:I{r:32-*7+4*x;(r<4)? :4;r}rx.I:I{xl?(x::1+I x);x}nn.I:I{I 4+x}nx:{(nn x)}xl:{(~x&7)}rz:{ :0}sz:{126}
dx.V:I{x?xl?(r:(I x)-1;x::r;(~r)?(n:I x+4;p:x+8;n/(dx I p;p+:4);fr x))}fr.V:I{p:4*bk I 4+x;x::I p;p::x}
mk.I:I{t:bk x;i:4*t;m:4*I 0;(~I i)?/((i>='m)?!;i+:4);a:I i;i::I a;k:i-4;(k>=4*t)?/(u:a+1<<k>>2;u::I k;k::u;k-:4);a::1;(a+4)::x;a}
sw.I:I{s:I 4;4::I 8;8::s;x}pp.I:I{t:po;x:sw x;pu t;x}

lc.I:II{n:nx;(1~I x)?((bk 1+n)~bk n)?((8+x+4*n)::y;(4+x)::1+n; :x);r:mk 1+n;(cp(x;r;n))::y;dx x;r}
cp.I:III{x+:8;y+:8;z/(y::rx I x;x+:4;y+:4);y}pc.V:I{pu lp lc x}
pl.I:I{4+x+4*nx}fi.I:I{(~nx)?!;r:rx I x+8;dx x;r}us.I:I{(1~I x)? :x;n:nx;r:mk n;n:cp(x;r;n);dx x;r}
ip:{(ipop x)}ipop.I:I{x:po;(~x&1)?!;r:x>>1;(0>'x)?r|:2147483648;r}lp:{(lpop x)}lpop.I:I{x:po;(7&x)?!;x}
pi.V:I{pu 1+2*x}ln.I:I{p:fn x;(~p)?!;rx I p}pu.V:I{s:I 4;n:nn s;(n~sz)?!;(4+s)::1+n;(pl s)::x}px:{pu x}
fn.I:I{s:I 12;n:(nn s)>>1;p:s+8;n/((x~I p)? :4+p;p+:8);0}lu.I:I{p:fn x;(~p)?!;I p}
ps.I:I{s:I 12;p:fn x;(~p)?(s:s lc x;s:s lc 1;p:pl s);12::s;p}as.V:II{(ps x)::y}
po:{(pop x)}pop.I:I{x:I 4;n:nx;(~n)?!;r:I x+4*1+n;(4+x)::n-1;r}

exe.V:I{x:lp;p:x+8;l:x;nx?l:pl x;(p<=l)?/(c:I p;$[2~c&3;(pu rx lu c;exe x);~4~c&7;pu rx c;740~c;x:sw pp x;724~c;x:pp sw x;(V.c>>3)(x)];p+:4);dx x}
add.V:I{pi ip+ip}sub.V:I{pi(-ip)+ip}mul.V:I{pi ip*ip}div.V:I{swp x;pi ip%ip}
mod.V:I{swp x;pi I?ip\'ip}lti.V:I{pi ip>'ip}eql.V:I{pi ip~ip}gti.V:I{pi ip<'ip}
dup.V:I{x:po;pu rx x;px}drp.V:I{dx po}swp.V:I{x:po;y:po;px;pu y}rol.V:I{x:po;y:po;z:po;px;pu z;pu y}
cnt.V:I{x:po;r:-1;xl?r:1+2*nx;dx x;pu r}atx.V:I{i:ip;l:lp;((i<0)+i>='nn l)?!;pu rx I 8+l+4*i;dx l}
amd.V:I{v:po;i:ip;a:us lp;n:nn a;$[i~n;a:a lc v;(i<'0)+i>'n;!;(ap:8+a+4*i;x:rx I ap;ap::v)];pu a}
cat.V:I{y:po;x:po;(7&x)?x:(mk 0)lc x;$[7&y;x:x lc y;(yp:y+8;(nn y)/(x:x lc rx I yp;yp+:4);dx y)];px}
asn.V:I{y:fi lp;(~2~y&3)?!;v:po;(v&7)?(v:(mk 0)lc v);p:ps y;dx I p;p::v}
ife.V:I{e:po;t:po;$[~ip;(dx t;pu e);(dx e;pu t)];exe x}drw.V:I{y:lp;x:lp;x draw y;dx x;dx y}
0:{stk;dup;cnt;amd;mod;drw;xxx;xxx;xxx;mul;add;cat;sub;exe;div}25:{asn;xxx;lti;eql;gti;ife;atx}62:{drp}91:{rol;xxx;swp}
`



var O,C,U,I,B,J,JJ,jj

var chr=String.fromCharCode;
function jload(){fetch('../j.j').then(r=>r.arrayBuffer()).then(u=>jj=new Uint8Array(u))}
function msl(b){J.exports.mem.grow(3);b=J.exports.mem.buffer;C=new Uint8Array(b);U=new Uint32Array(b);I=new Int32Array(b);JJ=J.exports.j;JJ(18);B=C.slice(0);jload()}
function draw(x,y){}
function nn(x){return U[1+(x>>>2)]}
function LX(x,n){n=nn(x);x=2+(x>>>2);var r=new Array(n);for(var i=0;i<n;i++)r[i]=X(U[x+i]);return "["+r.join(" ")+"]"}
function X(x){return(x==0)?"!!":(!(x&7))?LX(x):(x&1)?(x>>1).toString():(x&2)?sy(x):(x&4)?chr(33+(x>>>3)):"!!!"}
function sy(x,u){u=[];x>>>=2;while(x>0){u.push(96+x%32);x>>>=5};return su(new Uint8Array(u.reverse()))}
function jju(u){for(var i=0;i<u.length;i++)JJ(u[i])}
function us(s){return new TextEncoder("utf-8").encode(s)}
function su(u){return new TextDecoder("utf-8").decode(u)}

function stk(x){O(X(U[1]))}

function ini(left,o){O=o
 let p=document.createElement("pre");p.textContent=ref;left.appendChild(p)

 var ext={
  init: function( ){O("ktye/k\n ")},
  read: function(x){return new Uint8Array(0)},
  write:function(x,y){if(x===""){O(su(y))}},
 }
 
 fetch('../j.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,{"ext":{"stk":stk,"draw":draw} })).then(r=>{
  J=r.instance;msl();
  jju(us("!\n"))
  O("\n ")
 })


}

function evl(s){
 O("\n")
 jju(us(s+"!\n"))
 O("\n ")
}

let jstack={ini:ini,evl:evl,src:""}

export { jstack }
