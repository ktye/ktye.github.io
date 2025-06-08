/* ai:assembly interpreter
   ai interprets a(assembly) instead of compiling it.
   it is used by the debugger and allows breakpoints, stepping and watches.

   in a first pass the asm listing is translated to an internal array
   which has jump offsets computed for structured program flow.
   the number of lines still matches the original asm to stay in sync with the ui.  */

let ai=(_=>{

let parse=(x,M,aim)=>{ //source,import-object,ai.a(compiled module)
 let A=new WebAssembly.Instance(aim,M).exports
 let G={} //globals {name:v}
 let F={} //functions
 let T=[] //indirect call table
 let U=new Uint8Array(A.memory.buffer),dd=(o,s)=>{for(let i=0;i<s.length;i+=2)U[o++]=parseInt(s.substr(i,2),16)} //data/heap
 let isvar=x=>!"-0123456789".includes(x[0])
 let args =x=>{let r={};x.split("").forEach((t,i)=>r[i]="j"==t?0n:0);return r}
 let nest=[],addr=[],la=""
 let cmpl=(x,a,p)=>(p=(a=x[1]?x[1]:0)/180*Math.PI,x=x[0],a==0?[x,0]:a==90?[0,x]:a==180?[-x,0]:a==270?[0,-x]:[x*Math.cos(p),x*Math.sin(p)])
 let n=0,s="",c=[],l=0,im="",lo={}
 let brk=(a,b)=>{while(++a<b)if(c[a][0]=="break")c[a]=["jmp",b-a]}                   //fix break offset
 let cnt=(a,b,i)=>{i=a;while(++a<b)if(c[a][0]=="continue")c[a]=["jmp",i-a];return i} //fix continue
 let swc=(i,b)=>{c[i].slice(2).forEach((x,j)=>{c[x][1]=b-c[x][1],c[i][2+j]-=i});c.push(["nop"])} //fix switch
 let p=_=>{if(!n)return;s=s.split(":");F[n]={r:s[0],a:s[1],c:c,lo:{...args(s[1]),...lo},l:l};[n,s,c,l,im,lo]=[0,"",[],0,"",{}]}
 x.trimEnd().split("\n").forEach((x,line)=>{let i,j,a=x.trim().split(" "),a0=a[0].trim(),a1=(a[1]?a[1].trim():"");
  (1<a.length&&a[1].includes(":"))?(p(),n=a0,s=a[1],l=line,c.push((a[2]=="import")?[M[a[3]][a[4]]]:["nop"]))
  :    "tab"==a0?(p(),T.push(a[2]))
  :    "dat"==a0?(p(),dd(Number(a1),a[2]))
  :     "if"==a0?(nest.push("if"),addr.push(c.length),c.push(["if",0]))
  :   "else"==a0?(nest.pop(),i=addr.pop(),c[i][1]=c.length-i,nest.push("else"),addr.push(c.length),c.push(["jmp",0]))
  :  "while"==a0?(nest.push("while"),addr.push(c.length),c.push(["nop"]))
  :     "do"==a0?((nest[nest.length-1]=="while")?(nest.push("whdo"),addr.push(c.length),c.push(["if",0]))//  (while)do
                                               :(nest.push("do"),addr.push(c.length),c.push(["nop",c.length,a1])))                     //    do(end)
  : "switch"==a0?(nest.push("switch"),addr.push(c.length),c.push(["switch",Number(a1)]))
  :"endcase"==a0?(i=addr[addr.length-1],c[i].push(c.length),c.push(["jmp",c.length]))
  :    "end"==a0?(la=nest.pop(),i=addr.pop(),(la==  "if"?(c[i][1]=c.length-i,c.push(["nop"]))                                          //    (if)end
                                             :la=="whdo"?(brk(i,c.length),c[i][1]=c.length-i,nest.pop(),c.push(["jmp",cnt(addr.pop(),c.length)-c.length]))
                                             :la=="else"?(c[i][1]=c.length-i,c.push(["nop"]))                                          //  (else)end
                                             :la==  "do"?c.push(["donot",c[i][1]-c.length,c[i][2]])                                            //    (do)end
                                             :swc(i,c.length))) //(switch)end 
  :(1==a0.length&&"ijefz".includes(a0))?(n?("i"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0    ):c.push(["const",Number(a1)]))
                                           :"j"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0n   ):c.push(["const",BigInt(a1)]))
                                           :"e"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0    ):c.push(["const",Number(a1)]))
                                           :"f"==a0?(isvar(a1)?(c.push(["nop"]),lo[a[1]]=0    ):c.push(["const",Number(a1)]))
					   :        (isvar(a1)?(c.push(["nop"]),lo[a[1]]=[0,0]):c.push(["const",cmpl(a1.split("a").map(Number))])))
                                          :(G[a[1]]=(a0=="j"?0n:0)))
  :a0.includes(":")?c.push(["ical",a0])
  :c.push(a)
  if(a.length>1&&a[a.length-1].startsWith("@"))c[c.length-1]["@"]=Number(a[a.length-1].slice(1))
 });p();return{A:A,G:G,F:F,T:T,M:M,S:[],C:[],H:[0,1],B:[],f:"",l:0}}  //S(value stack) C(call stack) f(current function name) l(line of function) H(heapmarks) B(breakpoints)
/*o-p-s*/
let ops={
ezi:1,eqi:2,nei:2,lti:2,ltu:2,gti:2,gtu:2,lei:2,leu:2,gei:2,geu:2,ezj:1,eqj:2,nej:2,ltj:2,ltl:2,
gtj:2,gtl:2,lej:2,lel:2,gej:2,gel:2,eqe:2,nee:2,lte:2,gte:2,lee:2,gee:2,eqf:2,nef:2,ltf:2,gtf:2,
lef:2,gef:2,clz:1,ctz:1,pci:1,adi:2,sui:2,mui:2,dvi:2,dvu:2,moi:2,mou:2,ani:2,ori:2,xoi:2,sli:2,
sri:2,sru:2,rli:2,rri:2,noi:1,clj:1,ctj:1,pcj:1,adj:2,suj:2,muj:2,dvj:2,dvl:2,moj:2,mol:2,anj:2,
orj:2,xoj:2,slj:2,srj:2,srl:2,rlj:2,rrj:2,noj:1,abe:1,nge:1,cee:1,fle:1,tre:1,nae:1,sqe:1,ade:2,
sue:2,mue:2,dve:2,mie:2,mae:2,cse:2,abf:1,ngf:1,cef:1,flf:1,trf:1,naf:1,sqf:1,adf:2,suf:2,muf:2,
dvf:2,mif:2,maf:2,csf:2,ioj:1,ioe:1,uoe:1,iof:1,iou:1,joi:1,jou:1,joe:1,loe:1,jof:1,lof:1,eoi:1,
eou:1,eoj:1,eol:1,eof:1,foi:1,fou:1,foj:1,fol:1,foe:1,ire:1,jrf:1,eri:1,frj:1,ixg:1,ixh:1,jxg:1,
jxh:1,jxi:1,ngi:1,ngj:1,adz:2,suz:2,scz:2,eqz:2,nez:2,ngz:1,zoi:1,zoj:1,zoe:1,zof:1,foz:1,imz:1,
zrr:1,stz:2,ldz:1,ldi:1,ldj:1,lde:1,ldf:1,ldg:1,ldb:1,ldh:1,lds:1,sti:2,stj:2,ste:2,stf:2,stg:2,
sth:2,siz:0,grw:1,cpy:3,fil:3,}
/*o-p-s*/

let op=(m,s,a)=>{if(!s in ops)throw new Error("unknown op:",s);a=ops[s];a=m.A[s](...m.S.splice(-a,a));if(a!==undefined)m.S.push(a)}
let zop=(m,o,f,n)=>(f={adz:(x,y)=>[x[0]+y[0],x[1]+y[1]],suz:(x,y)=>[x[0]-y[0],x[1]-y[1]],scz:(x,y)=>[x[0]*y[0],x[1]*y[1]],eqz:(x,y)=>(x[0]==y[0]&&x[1]==y[1]),nez:(x,y)=>(x[0]!=y[0]||x[1]!=y[1]),ngz:x=>[-x[0],-y[0]],zoi:x=>[x,0],zoj:x=>[x,0],zoe:x=>[x,0],zof:x=>[x,0],foz:x=>x[0],imz:x=>x[1],zrr:x=>[x,x],stz:(x,y)=>(m.A.stf(x,y[0]),m.A.stf(x+8,y[1])),ldz:x=>[m.A.ldf(x),m.A.ldf(x+8)]}[o],f?(n=ops[o],o=f(...m.S.splice(-n,n)),((o!=undefined)?m.S.push(o):1),1):0)
let exit=m=>{throw new Error("exit")}
let ret=m=>{m.C.length>1?[m.f,m.l]=m.C.pop():(m.exit=1,exit())}
let ncal=(F,m)=>{let r=F.c[0][0](...Object.values(F.lo));if(F.r.length)m.S.push(r)} //native
let scal=(f,m,ad)=>{m.C.push([m.f,m.l,"@"+ad]);m.f=f;m.l=0;let F=m.F[f];for(let i=0;i<F.a.length;i++)F.lo[F.a.length-1-i]=m.S.pop();if(1==F.c.length)ncal(F,m)}
let dcal=(f,m)=>{let n=m.C.length;scal(f,m);while(m.C.length>n)step(m,1)}
let heap=(m,o,s)=>{if((s=o.startsWith("st"))||o.startsWith("ld"))m.H=[m.S[m.S.length-1-s],{g:1,b:1,h:2,s:2,i:4,j:8,e:4,f:8,z:8}[o[2]]]} //store heap access

let step=(m,over)=>{if(m.exit)return;let F=m.F[m.f],cal=over?dcal:scal;if(F.c.length<=++m.l)return ret(m)
 if(!m.C.length)m.C.push([m.f,0])
 let a=F.c[m.l],a0=a[0],a1=a[1],ad=a["@"],x
 if(a0=="")return
 let icl=(x,s,ad,f)=>{f=m.T[x];x=m.F[f];if(s!=x.r+":"+x.a){throw new Error("line "+(F.l+m.l)+": signature mismatch for indirect function "+x)};cal(f,m,ad)}
   "const"==a0?m.S.push(a1)                    //iefz(Number) j(BigNum)
 :   "get"==a0?m.S.push(F.lo[a1])
 :   "set"==a0?F.lo[a1]=m.S.pop()
 :   "tee"==a0?F.lo[a1]=m.S[m.S.length-1]
 :   "glo"==a0?m.S.push(m.G[a1])
 :   "gst"==a0?m.G[a1]=m.S.pop()
 :   "cal"==a0?cal(a1,m,ad)
 :    "if"==a0?(m.l+=m.S.pop()?0:a1)
 : "donot"==a0?(m.l+=m.S.pop()?(a[2]?m.S.pop():0,a1):0)   //end after do
 :"switch"==a0?(x=m.S.pop(),m.l+=(x==0?0:(x>0&&x<a1)?a[1+x]:a[a1]))
 :   "jmp"==a0?m.l+=a1                          //else break continue endcase end
 :   "nop"==a0?0                                //do while
 :  "ical"==a0?icl(m.S.pop(),a1,ad)
 :  "ret"==a0?ret(m)
 :(heap(m,a0),zop(m,a0)?0:op(m,a0))}

let runto=m=>{if(m.exit)return;if(m.B.includes(line(m)))step(m,1);do{if(m.B.includes(line(m)))return;step(m,0)}while(1)}
let run=(f,a,m)=>{m.f=f,m.l=0,a.forEach((v,i)=>m.F[f].lo[i]=v);try{ while(1)step(m,0) }catch(e){ if(e.message=="exit"){if(m.S.length)return m.S[0]}else{throw(e)} }}
let line=x=>x.l+x.F[x.f].l
return{parse:parse,step:step,run:run,runto:runto,line:line}})()
