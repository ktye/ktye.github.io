//assembly interpreter
/*
 do    0
  ..   1
 end   2

 while 0
  ..   1
 do    2
  ..   3
 end   4

 switch 3  0    // "switch" currentindex [..offset-addr-endcase-i] [..offset endcase-i-to-end]
  ..       1
 endcase   2
  ..       3
 endcase   4
  ..       5
 end       6

*/

let ai=(_=>{

let parse=(x,M,A)=>{ //source,import-object
 let G={} //globals {name:v}
 let F={} //functions
 let T=[] //indirect call table
 let U=new Uint8Array(A.memory.buffer),dd=(o,s)=>{for(let i=0;i<s.length;i+=2)U[o++]=parseInt(s.substr(i,2),16)} //data/heap
 let isvar=x=>!"-0123456789".includes(x[0])
 let args =x=>{let r={};x.forEach((t,i)=>r[i]="j"==t?0n:0);return r}
 let nest=[],addr=[],la=""
 x.split("\n").forEach((x,line)=>{let i,j,a=x.trim().split(" "),a0=a[0].trim(),a1=a[1].trim(),n=0,s="",c=[],l=0,im="",lo={}
  let p=_=>{if(!n)return;s=s.split(":");F[n]={r:s[0],a:s[1],c:im?["native",im]:c,lo:{...args(s[1]),...lo},l:l};if(ma)M=n;[n,s,c,l,im,lo]=[0,"",[],0,"",{}]}
  (1<a.length&&a[1].includes(":"))?(p(),n=a0,s=a[1],l=line,im=(a[2]=="import")?a[3]:"")
  :    "tab"==a0?(p(),T.push(a[2]))
  :    "dat"==a0?(p(),dd(Number(parseFloat(a[1]),a[2])))
  :     "if"==a0?(nest.push("if"),addr.push(c.length),c.push(["if",0]))
  :   "else"==a0?(nest.pop(),i=addr.pop(),c[i][1]=c.length-i,nest.push("else"),addr.push(c.length),c.push(["jmp",0]))
  :  "while"==a0?(nest.push("while"),addr.push([c.length,c.length]),c.push(["nop"]))
  :     "do"==a0?((nest[nest.length-1]=="while")?(la=addr.pop(),la[0]=c.length-la[0],la[1]=c.length,addr.push(la),c.push(["if",0]))//  (while)do
                                               :(nest.push("do"),c.push(["nop",c.length])))                                       //    do(end)
  : "switch"==a0?(nest.push("switch"),addr.push(c.length),c.push(["switch",Number(a1),2,Array(Number(a1)-1).fill(c.length)]))
  :"endcase"==a0?(i=addr[addr.length-1],j=c[i][2]++,c[i][j]=c.length-c[i][j],c[i].push(c.length),c.push(["jmp",c.length]))
  :    "end"==a0?(la=nest.pop(),i=addr.pop(),(la==  "if"?(c[i][1]=c.length-i,c.push(["nop"]))                                          //    (if)end
                                             :la=="else"?(c[i][1]=c.length-i,c.push(["nop"]))                                          //  (else)end
                                             :la==  "do"?c.push(["ifnot",c[i][1]-c.length])                                            //    (do)end
                                             :(j=c[i][2],c[i].slice(j).forEach((x,k)=>c[i][j+k]=c.length-c[i][j+k]),c.push(["nop"])))) //(switch)end 
  :(1==a0.length&&"ijef".includes(a0))?(n?("i"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0 ):c.push(["const",Number(a1)]))
                                          :"j"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0n):c.push(["const",BigInt(a1)]))
                                          :"e"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0 ):c.push(["const",Number(a1)]))
                                          :        (isvar(a1)?(c.push(["nop"]),lo[a[1]]=0 ):c.push(["const",Number(a1)])))
                                         :(G[a[1]]=(a0=="j"?0n:0)))
  :c.push(a)
 });p();return{G:G,S:S,F:F,T:T,M:M,S:[],C:[],f:"",l:0}}  //S(value stack) C(call stack) f(current function name) l(line of function)

/*o-p-s*/
let ops={
ezi:1,eqi:2,nei:2,lti:2,ltu:2,gti:2,gtu:2,lei:2,leu:2,gei:2,geu:2,ezj:1,eqj:2,nej:2,ltj:2,ltl:2,
gtj:2,gtl:2,lej:2,lel:2,gej:2,gel:2,eqe:2,nee:2,lte:2,gte:2,lee:2,gee:2,eqf:2,nef:2,ltf:2,gtf:2,
lef:2,gef:2,clz:1,ctz:1,pci:1,adi:2,sui:2,mui:2,dvi:2,dvu:2,moi:2,mou:2,ani:2,ori:2,xoi:2,sli:2,
sri:2,sru:2,rli:2,rri:2,clj:1,ctj:1,pcj:1,adj:2,suj:2,muj:2,dvj:2,dvl:2,moj:2,mol:2,anj:2,orj:2,
xoj:2,slj:2,srj:2,srl:2,rlj:2,rrj:2,abe:1,nge:1,cee:1,fle:1,tre:1,nae:1,sqe:1,ade:2,sue:2,mue:2,
dve:2,mie:2,mae:2,cse:2,abf:1,ngf:1,cef:1,flf:1,trf:1,naf:1,sqf:1,adf:2,suf:2,muf:2,dvf:2,mif:2,
maf:2,csf:2,ioj:1,ioe:1,uoe:1,iof:1,iou:1,joi:1,jou:1,joe:1,loe:1,jof:1,lof:1,eoi:1,eou:1,eoj:1,
eol:1,eof:1,foi:1,fou:1,foj:1,fol:1,foe:1,ire:1,jrf:1,eri:1,frj:1,ixg:1,ixh:1,jxg:1,jxh:1,jxi:1,
ngi:1,ngj:1,ldi:1,ldj:1,lde:1,ldf:1,ldg:1,ldb:1,ldh:1,lds:1,sti:2,stj:2,ste:2,stf:2,stg:2,sth:2,
siz:0,grw:1,cpy:3,fil:3,}
/*o-p-s*/

let op=(m,s,a)=>{a=ops[s];a=m.A[s](...m.S.splice(-a,a));if(a!==undefined)m.S.push(a)}
let exit=m=>{throw new error("exit")}
let retu=m=>m.C.length?[m.f,m.l]=m.C.pop():exit()

let step=m=>{let F=m.F[m.f];if(F.c.length==++m.l)return ret(m)
 let a=F[m.l],a0=a[0],a1=a[1],x
 let cal=f=>{m.C.push(m.f,1+m.l);m.f=f;m.l=-1;F=m.F[f];for(let i=0;i<F.a.length;i++)F.lo[i]=m.S.pop()}
 let icl=(x,s,f)=>{f=m.T[x];if(m.F[f].s!=s){throw new Error("line "+(F.l+m.l)+": signature mismatch for indirect function "+x)};cal(f)}
   "const"==a0?m.S.push(a1)                    //ief(Number) j(BigNum)
 :   "get"==a0?m.S.push(m.f.lo[a1])
 :   "set"==a0?m.f.lo[a1]=m.S.pop()
 :   "tee"==a0?m.f.lo[a1]=m.S[m.S.length-1]
 :   "glo"==a0?m.S.push(m.G[a1])
 :   "gst"==a0?m.G[a1]=m.S.pop()
 :   "cal"==a0?cal(a1)
 :    "if"==a0?m.l+=m.S.pop()?a1:0
 : "ifnot"==a0?m.l+=m.S.pop()?0:a1              //do after while, end after do
 :"switch"==a0?(x=1+m.S.pop(),m.l+=(x<a.length?a[x]:a[x.length-1]))
 :   "jmp"==a0?m.l+=a1                          //else break continue endcase end
 :   "nop"==a0?0                                //do while
 :  "ical"==a0?icl(m.S.pop(),a1)
 :op(m,a0)}

let run=x=>{x.f="main";x.l=0;while(1)step()}

return{parse:parse,step:step}})()
