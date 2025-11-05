let rip
let loadelf=u=>{let U=new Uint32Array(u.buffer,0,u.buffer.byteLength>>>2),H=new Uint16Array(u.buffer,0,u.buffer.byteLength>>>1),n=H[28],p=U[8]>>>2,i,s=[],m=0,M,R,rip=U[6],eop,brk=0
 eop=U[p+4]+U[p+8];for(i=0;i<n;i++){s.push({o:U[p+2],va:U[p+4],fs:U[p+8]});brk=Math.max(brk,U[p+4]+U[p+10]);p+=14};brk=(15+brk)>>4<<4;console.log("brk",brk);M=new Uint8Array(brk+1024);s.forEach(x=>M.set(u.subarray(x.o,x.o+x.fs),x.va));return[M,rip,eop,brk]}

const regmap=" 0  8 16 24 32 9  17 25 33  48  56  64  72  72  80  88   96   104  112  120  128  8 16 24 32 40 48 56 64  72  80  88   96   104  112  120  128  8   16  24  32  40  48  56  64  72  80  88   96   104  112  120  128  8   16  24  32  40  48  56  64 72 80  88  96 104 112 120 128  0  0  0  0  0  0   0   0   0   0   0   0   0   0   0   0    0    0    0    0    0    0   0   0   0   0   0   0   0   0   0   0    0    0    0    0    0    0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0  128  136  144  152  160  168  176  184  192  200  208    216   224   232   240   248    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0  256".replaceAll(/ +/g," ").trim().split(" ").map(Number)
const regtab="xx al cl dl bl ah ch dh bh spl bpl sil dil r8b r9b r10b r11b r12b r13b r14b r15b ax cx dx bx sp bp si di r8w r9w r10w r11w r12w r13w r14w r15w eax ecx edx ebx esp ebp esi edi r8d r9d r10d r11d r12d r13d r14d r15d rax rcx rdx rbx rsp rbp rsi rdi r8 r9 r10 r11 r12 r13 r14 r15 es cs ss ds fs gs cr0 cr1 cr2 cr3 cr4 cr5 cr6 cr7 cr8 cr9 cr10 cr11 cr12 cr13 cr14 cr15 dr0 dr1 dr2 dr3 dr4 dr5 dr6 dr7 dr8 dr9 dr10 dr11 dr12 dr13 dr14 dr15 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 st0 st1 st2 st3 st4 st5 st6 st7 xmm0 xmm1 xmm2 xmm3 xmm4 xmm5 xmm6 xmm7 xmm8 xmm9 xmm10 xmm11 xmm12 xmm13 xmm14 xmm15 ymm0 ymm1 ymm2 ymm3 ymm4 ymm5 ymm6 ymm7 ymm8 ymm9 ymm10 ymm11 ymm12 ymm13 ymm14 ymm15 rip".split(" ")
const mne="aaa,aad,aam,aas,adc,add,addpd,addps,addsd,addss,addsubpd,addsubps,aesdec,aesdeclast,aesenc,aesenclast,aesimc,aeskeygenassist,and,andnpd,andnps,andpd,andps,arpl,blendpd,blendps,blendvpd,blendvps,bound,bsf,bsr,bswap,bt,btc,btr,bts,call,cbw,cdq,cdqe,clc,cld,clflush,clgi,cli,clts,cmc,cmova,cmovae,cmovb,cmovbe,cmovg,cmovge,cmovl,cmovle,cmovno,cmovnp,cmovns,cmovnz,cmovo,cmovp,cmovs,cmovz,cmp,cmppd,cmpps,cmpsb,cmpsd,cmpsq,cmpss,cmpsw,cmpxchg,cmpxchg16b,cmpxchg8b,comisd,comiss,cpuid,cqo,crc32,cvtdq2pd,cvtdq2ps,cvtpd2dq,cvtpd2pi,cvtpd2ps,cvtpi2pd,cvtpi2ps,cvtps2dq,cvtps2pd,cvtps2pi,cvtsd2si,cvtsd2ss,cvtsi2sd,cvtsi2ss,cvtss2sd,cvtss2si,cvttpd2dq,cvttpd2pi,cvttps2dq,cvttps2pi,cvttsd2si,cvttss2si,cwd,cwde,daa,das,dec,div,divpd,divps,divsd,divss,dppd,dpps,emms,enter,extractps,f2xm1,fabs,fadd,faddp,fbld,fbstp,fchs,fclex,fcmovb,fcmovbe,fcmove,fcmovnb,fcmovnbe,fcmovne,fcmovnu,fcmovu,fcom,fcom2,fcomi,fcomip,fcomp,fcomp3,fcomp5,fcompp,fcos,fdecstp,fdiv,fdivp,fdivr,fdivrp,femms,ffree,ffreep,fiadd,ficom,ficomp,fidiv,fidivr,fild,fimul,fincstp,fist,fistp,fisttp,fisub,fisubr,fld,fld1,fldcw,fldenv,fldl2e,fldl2t,fldlg2,fldln2,fldpi,fldz,fmul,fmulp,fndisi,fneni,fninit,fnop,fnsave,fnsetpm,fnstcw,fnstenv,fnstsw,fpatan,fprem,fprem1,fptan,frndint,frstor,frstpm,fscale,fsin,fsincos,fsqrt,fst,fstp,fstp1,fstp8,fstp9,fsub,fsubp,fsubr,fsubrp,ftst,fucom,fucomi,fucomip,fucomp,fucompp,fxam,fxch,fxch4,fxch7,fxrstor,fxsave,fxtract,fyl2x,fyl2xp1,getsec,haddpd,haddps,hlt,hsubpd,hsubps,idiv,imul,in,inc,insb,insd,insertps,insw,int,int1,int3,into,invd,invept,invlpg,invlpga,invvpid,iretd,iretq,iretw,ja,jae,jb,jbe,jcxz,jecxz,jg,jge,jl,jle,jmp,jno,jnp,jns,jnz,jo,jp,jrcxz,js,jz,lahf,lar,lddqu,ldmxcsr,lds,lea,leave,les,lfence,lfs,lgdt,lgs,lidt,lldt,lmsw,lock,lodsb,lodsd,lodsq,lodsw,loop,loope,loopne,lsl,lss,ltr,maskmovdqu,maskmovq,maxpd,maxps,maxsd,maxss,mfence,minpd,minps,minsd,minss,monitor,montmul,mov,movapd,movaps,movbe,movd,movddup,movdq2q,movdqa,movdqu,movhlps,movhpd,movhps,movlhps,movlpd,movlps,movmskpd,movmskps,movntdq,movntdqa,movnti,movntpd,movntps,movntq,movq,movq2dq,movsb,movsd,movshdup,movsldup,movsq,movss,movsw,movsx,movsxd,movupd,movups,movzx,mpsadbw,mul,mulpd,mulps,mulsd,mulss,mwait,neg,nop,not,or,orpd,orps,out,outsb,outsd,outsw,pabsb,pabsd,pabsw,packssdw,packsswb,packusdw,packuswb,paddb,paddd,paddq,paddsb,paddsw,paddusb,paddusw,paddw,palignr,pand,pandn,pavgb,pavgusb,pavgw,pblendvb,pblendw,pclmulqdq,pcmpeqb,pcmpeqd,pcmpeqq,pcmpeqw,pcmpestri,pcmpestrm,pcmpgtb,pcmpgtd,pcmpgtq,pcmpgtw,pcmpistri,pcmpistrm,pextrb,pextrd,pextrq,pextrw,pf2id,pf2iw,pfacc,pfadd,pfcmpeq,pfcmpge,pfcmpgt,pfmax,pfmin,pfmul,pfnacc,pfpnacc,pfrcp,pfrcpit1,pfrcpit2,pfrsqit1,pfrsqrt,pfsub,pfsubr,phaddd,phaddsw,phaddw,phminposuw,phsubd,phsubsw,phsubw,pi2fd,pi2fw,pinsrb,pinsrd,pinsrq,pinsrw,pmaddubsw,pmaddwd,pmaxsb,pmaxsd,pmaxsw,pmaxub,pmaxud,pmaxuw,pminsb,pminsd,pminsw,pminub,pminud,pminuw,pmovmskb,pmovsxbd,pmovsxbq,pmovsxbw,pmovsxdq,pmovsxwd,pmovsxwq,pmovzxbd,pmovzxbq,pmovzxbw,pmovzxdq,pmovzxwd,pmovzxwq,pmuldq,pmulhrsw,pmulhrw,pmulhuw,pmulhw,pmulld,pmullw,pmuludq,pop,popa,popad,popcnt,popfd,popfq,popfw,por,prefetch,prefetchnta,prefetcht0,prefetcht1,prefetcht2,psadbw,pshufb,pshufd,pshufhw,pshuflw,pshufw,psignb,psignd,psignw,pslld,pslldq,psllq,psllw,psrad,psraw,psrld,psrldq,psrlq,psrlw,psubb,psubd,psubq,psubsb,psubsw,psubusb,psubusw,psubw,pswapd,ptest,punpckhbw,punpckhdq,punpckhqdq,punpckhwd,punpcklbw,punpckldq,punpcklqdq,punpcklwd,push,pusha,pushad,pushfd,pushfq,pushfw,pxor,rcl,rcpps,rcpss,rcr,rdmsr,rdpmc,rdrand,rdtsc,rdtscp,rep,repne,ret,retf,rol,ror,roundpd,roundps,roundsd,roundss,rsm,rsqrtps,rsqrtss,sahf,salc,sar,sbb,scasb,scasd,scasq,scasw,seta,setae,setb,setbe,setg,setge,setl,setle,setno,setnp,setns,setnz,seto,setp,sets,setz,sfence,sgdt,shl,shld,shr,shrd,shufpd,shufps,sidt,skinit,sldt,smsw,sqrtpd,sqrtps,sqrtsd,sqrtss,stc,std,stgi,sti,stmxcsr,stosb,stosd,stosq,stosw,str,sub,subpd,subps,subsd,subss,swapgs,syscall,sysenter,sysexit,sysret,test,ucomisd,ucomiss,ud2,unpckhpd,unpckhps,unpcklpd,unpcklps,vaddpd,vaddps,vaddsd,vaddss,vaddsubpd,vaddsubps,vaesdec,vaesdeclast,vaesenc,vaesenclast,vaesimc,vaeskeygenassist,vandnpd,vandnps,vandpd,vandps,vblendpd,vblendps,vblendvpd,vblendvps,vbroadcastsd,vbroadcastss,vcmppd,vcmpps,vcmpsd,vcmpss,vcomisd,vcomiss,vcvtdq2pd,vcvtdq2ps,vcvtpd2dq,vcvtpd2ps,vcvtps2dq,vcvtps2pd,vcvtsd2si,vcvtsd2ss,vcvtsi2sd,vcvtsi2ss,vcvtss2sd,vcvtss2si,vcvttpd2dq,vcvttps2dq,vcvttsd2si,vcvttss2si,vdivpd,vdivps,vdivsd,vdivss,vdppd,vdpps,verr,verw,vextractf128,vextractps,vhaddpd,vhaddps,vhsubpd,vhsubps,vinsertf128,vinsertps,vlddqu,vmaskmovdqu,vmaskmovpd,vmaskmovps,vmaxpd,vmaxps,vmaxsd,vmaxss,vmcall,vmclear,vminpd,vminps,vminsd,vminss,vmlaunch,vmload,vmmcall,vmovapd,vmovaps,vmovd,vmovddup,vmovdqa,vmovdqu,vmovhlps,vmovhpd,vmovhps,vmovlhps,vmovlpd,vmovlps,vmovmskpd,vmovmskps,vmovntdq,vmovntdqa,vmovntpd,vmovntps,vmovq,vmovsd,vmovshdup,vmovsldup,vmovss,vmovupd,vmovups,vmpsadbw,vmptrld,vmptrst,vmread,vmresume,vmrun,vmsave,vmulpd,vmulps,vmulsd,vmulss,vmwrite,vmxoff,vmxon,vorpd,vorps,vpabsb,vpabsd,vpabsw,vpackssdw,vpacksswb,vpackusdw,vpackuswb,vpaddb,vpaddd,vpaddq,vpaddsb,vpaddsw,vpaddusb,vpaddusw,vpaddw,vpalignr,vpand,vpandn,vpavgb,vpavgw,vpblendvb,vpblendw,vpclmulqdq,vpcmpeqb,vpcmpeqd,vpcmpeqq,vpcmpeqw,vpcmpestri,vpcmpestrm,vpcmpgtb,vpcmpgtd,vpcmpgtq,vpcmpgtw,vpcmpistri,vpcmpistrm,vperm2f128,vpermilpd,vpermilps,vpextrb,vpextrd,vpextrq,vpextrw,vphaddd,vphaddsw,vphaddw,vphminposuw,vphsubd,vphsubsw,vphsubw,vpinsrb,vpinsrd,vpinsrq,vpinsrw,vpmaddubsw,vpmaddwd,vpmaxsb,vpmaxsd,vpmaxsw,vpmaxub,vpmaxud,vpmaxuw,vpminsb,vpminsd,vpminsw,vpminub,vpminud,vpminuw,vpmovmskb,vpmovsxbd,vpmovsxbq,vpmovsxbw,vpmovsxwd,vpmovsxwq,vpmovzxbd,vpmovzxbq,vpmovzxbw,vpmovzxdq,vpmovzxwd,vpmovzxwq,vpmuldq,vpmulhrsw,vpmulhuw,vpmulhw,vpmulld,vpmullw,vpor,vpsadbw,vpshufb,vpshufd,vpshufhw,vpshuflw,vpsignb,vpsignd,vpsignw,vpslld,vpslldq,vpsllq,vpsllw,vpsrad,vpsraw,vpsrld,vpsrldq,vpsrlq,vpsrlw,vpsubb,vpsubd,vpsubq,vpsubsb,vpsubsw,vpsubusb,vpsubusw,vpsubw,vptest,vpunpckhbw,vpunpckhdq,vpunpckhqdq,vpunpckhwd,vpunpcklbw,vpunpckldq,vpunpcklqdq,vpunpcklwd,vpxor,vrcpps,vrcpss,vroundpd,vroundps,vroundsd,vroundss,vrsqrtps,vrsqrtss,vshufpd,vshufps,vsqrtpd,vsqrtps,vsqrtsd,vsqrtss,vstmxcsr,vsubpd,vsubps,vsubsd,vsubss,vtestpd,vtestps,vucomisd,vucomiss,vunpckhpd,vunpckhps,vunpcklpd,vunpcklps,vxorpd,vxorps,vzeroall,vzeroupper,wait,wbinvd,wrmsr,xadd,xchg,xcryptcbc,xcryptcfb,xcryptctr,xcryptecb,xcryptofb,xgetbv,xlatb,xor,xorpd,xorps,xrstor,xsave,xsetbv,xsha1,xsha256,xstore,invalid,3dnow,none,db,pause".split(",")

let bold=x=>x.classList.add("b"),unbold=x=>x.classList.remove("b")
let hx=(x,n)=>"0x"+x.toString(16).padStart(n,"0")
let h4=x=>x.toString(16).padStart(8,"0"),h8=(h,l)=>h4(h)+h4(l)

let execv=a=>{ kdbut.hidden=false; kdb.style.display="flex";
 let u=fsget(a[0]),elf;if(u===0){progexit();return}
 try{elf=loadelf(u)}
 catch(e){out.textContent+="elf: "+e.message+"\n";progexit();return}
 WebAssembly.instantiateStreaming(fetch("ud/dis.wasm")).then(r=>{let d=r.instance.exports
  disasm(elf,d)
  stackinit(elf,a)
  showheap=shhep(elf[0]);showheap((elf[2]+15)>>4<<4);brk.textContent=h8(0,elf[3])
  let stp=execute(elf,d);traceinto=stp;stepover=stp;runto=stp;
  if(deb.checked==false){let lpc;while(1){let pc=stp();if("string"==typeof pc){if(""==pc)return;console.log("lpc",lpc);O("\n"+h4(lpc)+": "+pc+"\n");return};lpc=pc;}}})
}
let exit=x=>{if(x)O("exit "+x+"\n");progexit();return""}

let showstack,showheap
let xxD=(b,t)=>{let u=new Uint32Array(b.buffer,b.byteOffset,4*32),s=Array(32).fill(""),ss=b=>af(b).map(x=>x>31&&x<127?String.fromCharCode(x):".").join("");s.forEach((_,i)=>{let j=i<<2,j4=i<<4;s[i]=h4(t+j4)+" "+h4(u[j])+h4(u[1+j])+" "+h4(u[2+j])+h4(u[3+j])+" "+ss(b.subarray(j4,16+j4)) });return s.join("\n")}
let shhep=M=>t=>heap.textContent=(t=min(t,M.length-16*32),xxD(new Uint8Array(M.buffer,t,16*32),t))
let shstk=S=>(h,rsp)=>{const t=4294967288;for(let i=0;i<16;i++)ge("stk"+i).textContent=(rsp<-8*(i+h)-8?"│":rsp==-8*(i+h)-8?"└":" ")+h8(0xffffffff,t-8*(i+h))+" "+h8(S[2*(i+h)+1],S[2*(i+h)])}
let markrbp=rbp=>{for(let i=0;i<16;i++){let e=ge("stk"+i),s=e.textContent,a=xs(s.slice(9,17));s=(a>rbp?"│":a<rbp?" ":"└")+s.slice(1);e.textContent=s}}
let stackinit=(d,a)=>{let rsp=-32,I=new Int32Array(d[0].buffer,0,32),b=new Uint8Array(d[0].buffer),U=new Uint32Array(d[0].buffer,d[3]),p=d[1]-16;
 a=a.toReversed();a.forEach((x,i)=>{x=us(x);let k=(7+1+x.length)>>3<<3;p-=k;b.set(x,p);b[p+x.length]=0;U[2+2*i]=p;U[3+2*i]=0});U[2+2*a.length]=a.length;U[3+2*a.length]=0;rsp=-8*(2+a.length);I[10]=rsp;I[11]=-1;
 showstack=shstk(new Uint32Array(d[0].buffer,d[3]));showstack(0,rsp);}

/* fasm syscalls:
0x0    0  read
0x1    1  write
0x2    2  open
0x3    3  close
0x8    8  lseek
0x9    9  mmap         only for large alloc
0xb   11  munmap       .. 
0xc   12  brk
0x3c  60  exit
0x60  96  gettimeofday
0xc9 201  time
*/
let err=s=>{throw new error(s)}
let execute=(elf,D)=>{ //brk S R
  let[M,rip,eop]=elf,ud=D.dis_init(rip),b=new Uint8Array(D.memory.buffer,ud,576),u=new Uint32Array(D.memory.buffer,ud+340,59),cal=[],bk=elf[3],flag=""
  let bp  =new Uint32Array(D.memory.buffer,4+ud,1)[0]; //pointer to ibuf stored within ud struct
  let ibuf=new Uint8Array(D.memory.buffer,bp,16),sz,adrmode,B=x=>BigInt(x);
  let H=new Uint16Array(M.buffer,0,M.buffer.byteLength>>1),U=new Uint32Array(M.buffer,0,M.buffer.byteLength>>2),J=new BigUint64Array(M.buffer,0,M.buffer.byteLength>>3),I=new Int32Array(M.buffer,0,69);U[64]=rip;   // [156 regs][4 imm]
  let Rat=x=>U[regmap[x]>>2],simm=(i,l,h, a)=>(a=66+2*i,U[a]=l,U[1+a]=h,a<<2)
  let push=(x, i)=>(U[10]-=8,i=bk+(-I[10])>>2,U[i]=U[x>>2],U[1+i]=U[1+(x>>2)])
  let popl=x=>((r=U[bk+(-I[10])>>2]),(U[10]+=8),r)
  let pucal=(x,y)=>{cal.push([x,y]),cal.length<12?tc(h4(x)+": "+h4(y),ge("cal"+(cal.length-1))):showcal(cal)},pocal=_=>{cal.pop();cal.length<10?tc("",ge("cal"+cal.length)):showcal(cal)}
  let lpc=rip;mark(U,rip,bk,flag,40,0,0,0)
  return _=>{
   for(let j=0;j<16;j++)ibuf[j]=M[j+U[64]];let n=D.dis();if(!n)return 0;rip+=n;U[64]=rip
   sz=b[538+9];adrmode=b[538+10],rep=b[544]?"rep":b[545]?"repe":b[546]?"repne":"" ; //console.log("oprmode",oprmode,"adrmode",adrmode)
      
   let imm=(i,x)=>{let s=u[1+x],l=u[x+6],h=u[x+7],sn=46==u[x+10];return simm(i,sn?(8==s?l<<24>>24:l<<0>>0):(8==s?0xff:16==s?0xffff:0xffffffff)&l)}
   let jmm=(i,x)=>{let s=u[1+x],l=u[x+6],h=u[x+7];               return simm(i,U[64]+((8==s?0xff:16==s?0xffff:0xffffffff)&l))}
   let disp=(o,b,i,l,h)=>{ return(8==0?0xff:16==o?0xffff:0xffffffff)&l }
   let indx=(i,s)=>Rat(i)*(s?s:1)
   let st=x=>(x>0x7fffffff?bk-8+(1+~x):x)
   let opmem=x=>{let s=u[1+x],b=u[2+x],i=u[3+x],sc=u[4+x]&0xff,o=(u[4+x]>>>8)&0xff; return(b?Rat(b)+(i?indx(i,sc):0):0)+(o?disp(o,b,i,u[x+6],u[x+7]):0)}
   let oper=i=>{let x=1+12*i,t=u[x]; return st((t==0)?0:t==156?regmap[u[2+x]]:t==157?opmem(x):t==159?imm(i,x):t==160?jmm(i,x):(err("operand type:"+t),0))}
   
   let flg=x=>{x=8==sz?M[x]:16==sz?H[x>>1]:32==sz?U[x>>2]:J[x>>3];flag=x==0?"Z":(x>[0,0x7f,0x7fff,0x7fffffff,0x7fffffffffffffffn][sz>>3])?"S":""}
   let x=oper(0),y=oper(1),z=oper(2),zz=oper(3),na=(x!=0)+(y!=0)+(z!=0)+(zz!=0);
   let x1=x>>1,y1=y>>1,x2=x>>2,y2=y>>2,x3=x>>3,y3=y>>3
   switch(u[0]){
   case   5/*add */: 8==sz?(M[x]+=M[y]):16==sz?(H[x1]+=H[y1]):32==sz?(U[x2]+=U[y2]):(J[x3]+=J[y3]); flg(x);  break;
   case  36/*call*/: push(256); U[64]=I[x2];rip=U[64]; y=U[10]; z=40; pucal(lpc,rip); break;
   case 105/*dec */: 8==sz?(M[x]--    ):16==sz?(H[x1]--     ):32==sz?(U[x2]--     ):(J[x3]--);      flg(x);  break;
   case 263/*jz  */: if("Z"==flag)rip=U[x>>2];                                                               break;
   case 269/*lea */: 8==sz?(M[x] =  y ):16==sz?(H[x1] =  y1 ):32==sz?(U[x2] =  y2 ):(J[x3] =B(y3));          break;
   case 303/*mov */: 8==sz?(M[x] =M[y]):16==sz?(H[x1] =H[y1]):32==sz?(U[x2] =U[y2]):(J[x3] =J[y3]);          break;
   case 347/*neg */: 8==sz?(M[x]=-M[x]):16==sz?(H[x1]=-H[x1]):32==sz?(U[x2]=-U[x2]):(J[x3]=-J[y3]); flg(x);  break;
   case 350/*or  */: 8==sz?(M[x]|=M[y]):16==sz?(H[x1]|=H[y1]):32==sz?(U[x2]|=U[y2]):(J[x3]|=J[y3]); flg(x);  break;
   case 532/*ret */: rip=popl();U[64]=rip;x=40;y=64; pocal(); break;
   case 547/*scasb*/:let nnn=34;while(nnn--){ //eax:8 edi:64 ecx:16
	      let a=M[8],b=M[U[64>>2]];
              U[64>>2]++; if(rep=="")break;let c=--U[16>>2]; //todo: dirflag cld/std
              if((!c)||(rep=="repe"&&a!=b)||(rep=="repne"&&a==b))break}; x=16; y=64; break
   case 593/*sub */: 8==sz?(M[x]-=M[y]):16==sz?(H[x1]-=H[y1]):32==sz?(U[x2]-=U[y2]):(J[x3]-=J[y3]); flg(x);  break;
   case 599/*sysc*/: U[8>>2]=syscall(M,U[8>>2],U[64>>2],U[56>>2],U[24>>2]); x=8;y=64;z=56;zz=24;    flg(8);  break;
   case 894/*xor */: 8==sz?(M[x]^=M[y]):16==sz?(H[x1]^=H[y1]):32==sz?(U[x2]^=U[y2]):(J[x3]^=J[y3]); flg(x);  break;
   default: O(`\n${h4(lpc)}:unknown instr ${u[0]}: ${mne[u[0]]}\n`); return exit(1);
   }
   mark(U,lpc,bk,flag,x,y,z,zz);lpc=rip
   return rip
 }
}

let syscall=(M,rax,rdi,rsi,rdx)=>1==rax?(O(M.subarray(rsi,rsi+rdx)),rdx):err("unknown syscall: "+rax)

let disasm=(elf,D)=>{let[M,rip,eop]=elf;asm=[];disa.innerHTML=""
  let ud=D.dis_init(rip)
  let bp  =new Uint32Array(D.memory.buffer,4+ud,1)[0]; //pointer to ibuf stored within ud struct
  let ibuf=new Uint8Array(D.memory.buffer,bp,16);
  let b=new Uint8Array(D.memory.buffer,ud,576),u=new Uint32Array(D.memory.buffer,ud+340,59)
  
  let s;while(1){
   for(let i=0;i<16;i++)ibuf[i]=M[rip+i];
   let n=D.dis();if(!n)break;rip+=n;
   s=decode(rip,b,u);asm.push(s);if(rip>=eop)break
  }
  let n=Math.min(30,asm.length)
  for(let i=0;i<n;i++)disa.appendChild(tc(asm[i]+"\n",ce("span")));}

let decode=(rip,b,u)=>{
 //sizeofud:  576
 //inp_buf:  +  4
 //inp_ctr:  + 20 (length)
 //mnemonic: +340
 //operand : +344, 392, 440, 488
 //pfx_rex : +538
 //pfx_rep : +540  repe(541)  repne(542)
 //prim.opc: +557
 //userdata: +560
 // enum UD_OP_REG(156) MEM(157)
 let oprmode=b[538+9],adrmode=b[538+10],rep=b[544]?"rep ":b[545]?"repe ":b[546]?"repne ":""
 let regstr=x=>regtab[x]
 let hx8=(h,l,n)=>"0x"+h.toString(16).padStart(8,"0")+l.toString(16).padStart(8,"0")
 let hs=(x,n)=>(x<0)?"-"+hx(-x,n):hx(x,n)
 let uword=l=>hx(l,4),dword=l=>hx(l,8),qword=(h,l)=>hx8(h,l)
 let disp=(o,b,i,l,h)=>((b==0&&i==0)?(o==16?uword(l):o==32?dword(l):o==64?qword(h,l):"disp?o="+o) : ("+"+(o==8?hs((l<<24)>>24,2):o==16?hs((l<<16)>>16,4):o==32?hs(l,8):("displ?"+o))))
 let indx=(b,i,s,o)=>((b?"+":"")+regstr(i)+(s?("*"+s):""))
 let opsize=x=>(x==0?"":x==8?"byte ":x==16?"word ":x==32?"dword ":x==64?"qword ":x==80?"tword ":x==128?"oword ":x==256?"yword ":"(size?)")
 let opmem=x=>{ let s=u[1+x],b=u[2+x],i=u[3+x],sc=u[4+x]&0xff, o=(u[4+x]>>>8)&0xff;
  return opsize(s)+"["+(b?regstr(b)+(i?indx(b,i,sc):""):"")+(o?disp(o,b,i,u[x+6],u[x+7]):"")+"]"}
 let imm=x=>{let s=u[1+x],l=u[x+6],h=u[x+7],sn=s!=oprmode&&46==u[x+10];return sn?(s==8?hs(l<<24>>24):hs(l<<0>>0)):s==8?hx(l,2):s==16?hx(l,4):s==32?hx(l,8):s==64?hx8(h,l):("imm-size?"+s)}
 let jmm=x=>{let s=u[1+x],l=u[x+6],h=u[x+7];return s==8?hx(l+rip,2):s==16?hx(l+rip,4):s==32?hx(l+rip,8):("jmm-size?"+s)}
 let oper=i=>{let x=1+12*i;t=u[x];return t==0?"":t==156?regstr(u[2+x]):t==157?opmem(x):t==159?imm(x):t==160?jmm(x):"oper?"+t}
 let operands=_=>[oper(0),oper(1),oper(2),oper(3)].filter(x=>x!="").join(",")
 return h4(rip-b[20])+" "+rep+(mne[u[0]]).padEnd(4," ")+" "+operands()}

let stkx=[stk0,stk1,stk2,stk3,stk4,stk5,stk6,stk7,stk8,stk9,stk10,stk11,stk12,stk13,stk14,stk15]
let mark=(U,rip,bk,flg,x,y,z,zz)=>{let pc=h4(rip); //S R
 let a=af(disa.childNodes);a.forEach(unbold)
 let i=a.findIndex(x=>x.textContent.startsWith(pc));if(i<0){i=asm.findIndex(x=>x.startsWith(pc));if(i>=0){disa.dataset.i=i-1;disa.move(1);bold(disa.firstChild)}}else bold(a[i]);
 a=af(regs.children);a.forEach(unbold);flags.textContent=flg
 let h=x=>U[1+(x>>2)].toString(16).padStart(8,"0")+U[x>>2].toString(16).padStart(8,"0");
 let H=(i,x)=>"ffffffff"+x.toString(16).padStart(8,"0")+" "+S[i].toString(16).padStart(8,"0")+S[1+i].toString(16).padStart(8,"0")
 tc(h(256),reg32) //rip
 let st=x=>{let s,b=(1+~x),u=(bk+b)>>2,sx=h4(x),i=stkx.findIndex(y=>sx==y.textContent.substring(9,17));
  if(i>=0){bold(stkx[i]);stkx[i].textContent=stkx[i].textContent.substring(0,18)+h4(U[1+u])+h4(U[u])}
  //todo: ps
 }
 let mk=x=>{ (!x)?0:x<=256?( bold(tc( h(x) ,ge("reg"+((x>>>3)-1)))),(40==x?markrbp(U[10]):0) ):x>0x7fffffff?st(x) :0 };mk(x);mk(y);mk(z);mk(zz)}

if("undefined"!=typeof Deno){ //$deno --allow-read 86.js fasm.elf args..  or $deno repl --allow-read --eval-file=86.js -- fasm.elf args..
 let argv=Deno.args;if(!argv.length)Deno.exit(0)
 let D=new WebAssembly.Instance(new WebAssembly.Module(Deno.readFileSync("ud/dis.wasm"))).exports
 let elf=loadelf(Deno.readFileSync(argv[0]))
 execute(elf,D)}

