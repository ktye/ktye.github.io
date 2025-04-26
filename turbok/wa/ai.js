//let ai=x=>{

let parse=(x,M,A)=>{ //source,import-object
 let G={} //globals {name:v}
 let F={} //functions
 let T=[] //indirect call table
 let U=new Uint8Array(A.memory.buffer),dd=(o,s)=>{for(let i=0;i<s.length;i+=2)U[o++]=parseInt(s.substr(i,2),16)} //data/heap
 let isvar=x=>!"-0123456789".includes(x[0])
 let args =x=>{let r={};x.forEach((t,i)=>r[i]="j"==t?0n:0);return r}
 x.split("\n").forEach((x,line)=>{x=x.trim(){let a=x.split(" "),a0=a[0].trim(),n=0,s="",c=[],l=0,im="",lo={}
  let p=_=>{if(!n)return;s=s.split(":");F[n]={r:s[0],a:s[1],c:im?["native",im]:c,lo:{...args(s[1]),...lo},l:l};if(ma)M=n;[n,s,c,l,im,lo]=[0,"",[],0,"",{}]}
  (1<a.length&&a[1].includes(":"))?(p(),n=a0,s=a[1],l=line,im=(a[2]=="import")?a[3]:"")
  :"tab"==a0?(p(),T.push(a[2]))
  :"dat"==a0?(p(),dd(Number(parseFloat(a[1]),a[2]))
  :(1==a0.length)&&"ijef".includes(a0))?(s?0:G[a[1]]=(a0=="j"?0n:0))
  :n?(("i"==a0&&isvar(a[1]))?(c.push(a),lo[a[1]]=0 )
    : ("j"==a0&&isvar(a[1]))?(c.push(a),lo[a[1]]=0n)
    : ("e"==a0&&isvar(a[1]))?(c.push(a),lo[a[1]]=0 )
    : ("f"==a0&&isvar(a[1]))?(c.push(a),lo[a[1]]=0 )
    :c.push(a))
 }});p();return{G:G,S:S,F:F,T:T,M:M,S:[],C:[],f:"",l:0}}  //S(value stack) C(call stack) f(current function name) l(line of function)

/*o-p-s*/
let ops={
ezi:[1,1],
eqi:[1,2],
nei:[1,2],
lti:[1,2],
ltu:[1,2],
gti:[1,2],
gtu:[1,2],
lei:[1,2],
leu:[1,2],
gei:[1,2],
geu:[1,2],
ezj:[1,1],
eqj:[1,2],
nej:[1,2],
ltj:[1,2],
ltl:[1,2],
gtj:[1,2],
gtl:[1,2],
lej:[1,2],
lel:[1,2],
gej:[1,2],
gel:[1,2],
eqe:[1,2],
nee:[1,2],
lte:[1,2],
gte:[1,2],
lee:[1,2],
gee:[1,2],
eqf:[1,2],
nef:[1,2],
ltf:[1,2],
gtf:[1,2],
lef:[1,2],
gef:[1,2],
clz:[1,1],
ctz:[1,1],
pci:[1,1],
adi:[1,2],
sui:[1,2],
mui:[1,2],
dvi:[1,2],
dvu:[1,2],
moi:[1,2],
mou:[1,2],
ani:[1,2],
ori:[1,2],
xoi:[1,2],
sli:[1,2],
sri:[1,2],
sru:[1,2],
rli:[1,2],
rri:[1,2],
clj:[1,1],
ctj:[1,1],
pcj:[1,1],
adj:[1,2],
suj:[1,2],
muj:[1,2],
dvj:[1,2],
dvl:[1,2],
moj:[1,2],
mol:[1,2],
anj:[1,2],
orj:[1,2],
xoj:[1,2],
slj:[1,2],
srj:[1,2],
srl:[1,2],
rlj:[1,2],
rrj:[1,2],
abe:[1,1],
nge:[1,1],
cee:[1,1],
fle:[1,1],
tre:[1,1],
nae:[1,1],
sqe:[1,1],
ade:[1,2],
sue:[1,2],
mue:[1,2],
dve:[1,2],
mie:[1,2],
mae:[1,2],
cse:[1,2],
abf:[1,1],
ngf:[1,1],
cef:[1,1],
flf:[1,1],
trf:[1,1],
naf:[1,1],
sqf:[1,1],
adf:[1,2],
suf:[1,2],
muf:[1,2],
dvf:[1,2],
mif:[1,2],
maf:[1,2],
csf:[1,2],
ioj:[1,1],
ioe:[1,1],
uoe:[1,1],
iof:[1,1],
iou:[1,1],
joi:[1,1],
jou:[1,1],
joe:[1,1],
loe:[1,1],
jof:[1,1],
lof:[1,1],
eoi:[1,1],
eou:[1,1],
eoj:[1,1],
eol:[1,1],
eof:[1,1],
foi:[1,1],
fou:[1,1],
foj:[1,1],
fol:[1,1],
foe:[1,1],
ire:[1,1],
jrf:[1,1],
eri:[1,1],
frj:[1,1],
ixg:[1,1],
ixh:[1,1],
jxg:[1,1],
jxh:[1,1],
jxi:[1,1],
ngi:[1,1],
ngj:[1,1],
ldi:[1,1],
ldj:[1,1],
lde:[1,1],
ldf:[1,1],
ldg:[1,1],
ldb:[1,1],
ldh:[1,1],
lds:[1,1],
sti:[0,2],
stj:[0,2],
ste:[0,2],
stf:[0,2],
stg:[0,2],
sth:[0,2],
siz:[1,0],
grw:[1,1],
cpy:[0,3],
fil:[0,3],
}
/*o-p-s*/

let exit=m=>{throw new error("exit")}
let retu=m=>m.C.length?[m.f,m.l]=m.C.pop():exit()

let step=m=>{let F=m.F[m.f];if(F.c.length==++m.l)return ret(m)
 let a=F[m.l],a0=a[0],x
 let cal=f=>{m.C.push(m.f,1+m.l);m.f=f;m.l=-1;F=m.F[f];for(let i=0;i<F.a.length;i++)F.lo[i]=m.S.pop()}
 let icl=(x,s,f)=>{f=m.T[x];if(m.F[f].s!=s){throw new Error("line "+(F.l+m.l)+": signature mismatch for indirect function "+x)};cal(f)}
 let isvar=x=>!"-0123456789".includes(x[0])
  "i"==a0?(isvar(x[1])?0:m.S.push(Number(x[1])))
 :"j"==a0?(isvar(x[1])?0:m.S.push(BigInt(x[1])))
 :"e"==a0?(isvar(x[1])?0:m.S.push(Number(x[1])))
 :"f"==a0?(isvar(x[1])?0:m.S.push(Number(x[1])))
 :"get"==a0?m.S.push(m.f.lo[a[1]])
 :"set"==a0?m.f.lo[a[1]]=m.S.pop()
 :"tee"==a0?m.f.lo[a[1]]=m.S[m.S.length-1]
 :"glo"==a0?m.S.push(m.G[a[1]])
 :"gst"==a0?m.G[a[1]]=m.S.pop()
 :"cal"==a0?cal(a[1])
 :a0.includes(":")?icl(m.S.pop(),a0)
 //todo if else do while break continue switch endcase end
 :op(a0)
}
