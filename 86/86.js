

let rip,eop,eod,brk,brk0=Infinity;const stacktop=0x7faee69ffed8n,arg1=0x7faee69fffddn
let loadelf=u=>{let U=new Uint32Array(u.buffer,0,u.buffer.byteLength>>>2),H=new Uint16Array(u.buffer,0,u.buffer.byteLength>>>1),n=H[28],p=U[8]>>>2,i,s=[],m=0,M,R,rip=U[6],eop,eod=0
 eop=U[p+4]+U[p+8];for(i=0;i<n;i++){s.push({o:U[p+2],va:U[p+4],fs:U[p+8]});eod=Math.max(eod,U[p+4]+U[p+10]);p+=14};eod=(15+eod)>>4<<4;M=new Uint8Array(eod+1024);s.forEach(x=>M.set(u.subarray(x.o,x.o+x.fs),x.va));return[M,rip,eop,eod]}

//todo:r15 xmm0 are both 128
const regmap=" 0  8 16 24 32 9  17 25 33  48  56  64  72  72  80  88   96   104  112  120  128  8 16 24 32 40 48 56 64  72  80  88   96   104  112  120  128  8   16  24  32  40  48  56  64  72  80  88   96   104  112  120  128  8   16  24  32  40  48  56  64 72 80  88  96 104 112 120 128  0  0  0  0  0  0   0   0   0   0   0   0   0   0   0   0    0    0    0    0    0    0   0   0   0   0   0   0   0   0   0   0    0    0    0    0    0    0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0  128  136  144  152  160  168  176  184  192  200  208    216   224   232   240   248    0    0    0    0    0    0    0    0    0    0     0     0     0     0     0     0 256".replaceAll(/ +/g," ").trim().split(" ").map(Number)
const regtab="xx al cl dl bl ah ch dh bh spl bpl sil dil r8b r9b r10b r11b r12b r13b r14b r15b ax cx dx bx sp bp si di r8w r9w r10w r11w r12w r13w r14w r15w eax ecx edx ebx esp ebp esi edi r8d r9d r10d r11d r12d r13d r14d r15d rax rcx rdx rbx rsp rbp rsi rdi r8 r9 r10 r11 r12 r13 r14 r15 es cs ss ds fs gs cr0 cr1 cr2 cr3 cr4 cr5 cr6 cr7 cr8 cr9 cr10 cr11 cr12 cr13 cr14 cr15 dr0 dr1 dr2 dr3 dr4 dr5 dr6 dr7 dr8 dr9 dr10 dr11 dr12 dr13 dr14 dr15 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 st0 st1 st2 st3 st4 st5 st6 st7 xmm0 xmm1 xmm2 xmm3 xmm4 xmm5 xmm6 xmm7 xmm8 xmm9 xmm10 xmm11 xmm12 xmm13 xmm14 xmm15 ymm0 ymm1 ymm2 ymm3 ymm4 ymm5 ymm6 ymm7 ymm8 ymm9 ymm10 ymm11 ymm12 ymm13 ymm14 ymm15 rip".split(" ")
const regsiz=regtab.map(x=>x.endsWith("l")?8:x.endsWith("h")?8:x.startsWith("e")?32:x.endsWith("d")?32:" ax bx cx dx si di sp bp ip ".includes(" "+x+" ")?16:64)
const mne="aaa,aad,aam,aas,adc,add,addpd,addps,addsd,addss,addsubpd,addsubps,aesdec,aesdeclast,aesenc,aesenclast,aesimc,aeskeygenassist,and,andnpd,andnps,andpd,andps,arpl,blendpd,blendps,blendvpd,blendvps,bound,bsf,bsr,bswap,bt,btc,btr,bts,call,cbw,cdq,cdqe,clc,cld,clflush,clgi,cli,clts,cmc,cmova,cmovae,cmovb,cmovbe,cmovg,cmovge,cmovl,cmovle,cmovno,cmovnp,cmovns,cmovnz,cmovo,cmovp,cmovs,cmovz,cmp,cmppd,cmpps,cmpsb,cmpsd,cmpsq,cmpss,cmpsw,cmpxchg,cmpxchg16b,cmpxchg8b,comisd,comiss,cpuid,cqo,crc32,cvtdq2pd,cvtdq2ps,cvtpd2dq,cvtpd2pi,cvtpd2ps,cvtpi2pd,cvtpi2ps,cvtps2dq,cvtps2pd,cvtps2pi,cvtsd2si,cvtsd2ss,cvtsi2sd,cvtsi2ss,cvtss2sd,cvtss2si,cvttpd2dq,cvttpd2pi,cvttps2dq,cvttps2pi,cvttsd2si,cvttss2si,cwd,cwde,daa,das,dec,div,divpd,divps,divsd,divss,dppd,dpps,emms,enter,extractps,f2xm1,fabs,fadd,faddp,fbld,fbstp,fchs,fclex,fcmovb,fcmovbe,fcmove,fcmovnb,fcmovnbe,fcmovne,fcmovnu,fcmovu,fcom,fcom2,fcomi,fcomip,fcomp,fcomp3,fcomp5,fcompp,fcos,fdecstp,fdiv,fdivp,fdivr,fdivrp,femms,ffree,ffreep,fiadd,ficom,ficomp,fidiv,fidivr,fild,fimul,fincstp,fist,fistp,fisttp,fisub,fisubr,fld,fld1,fldcw,fldenv,fldl2e,fldl2t,fldlg2,fldln2,fldpi,fldz,fmul,fmulp,fndisi,fneni,fninit,fnop,fnsave,fnsetpm,fnstcw,fnstenv,fnstsw,fpatan,fprem,fprem1,fptan,frndint,frstor,frstpm,fscale,fsin,fsincos,fsqrt,fst,fstp,fstp1,fstp8,fstp9,fsub,fsubp,fsubr,fsubrp,ftst,fucom,fucomi,fucomip,fucomp,fucompp,fxam,fxch,fxch4,fxch7,fxrstor,fxsave,fxtract,fyl2x,fyl2xp1,getsec,haddpd,haddps,hlt,hsubpd,hsubps,idiv,imul,in,inc,insb,insd,insertps,insw,int,int1,int3,into,invd,invept,invlpg,invlpga,invvpid,iretd,iretq,iretw,ja,jae,jb,jbe,jcxz,jecxz,jg,jge,jl,jle,jmp,jno,jnp,jns,jnz,jo,jp,jrcxz,js,jz,lahf,lar,lddqu,ldmxcsr,lds,lea,leave,les,lfence,lfs,lgdt,lgs,lidt,lldt,lmsw,lock,lodsb,lodsd,lodsq,lodsw,loop,loope,loopne,lsl,lss,ltr,maskmovdqu,maskmovq,maxpd,maxps,maxsd,maxss,mfence,minpd,minps,minsd,minss,monitor,montmul,mov,movapd,movaps,movbe,movd,movddup,movdq2q,movdqa,movdqu,movhlps,movhpd,movhps,movlhps,movlpd,movlps,movmskpd,movmskps,movntdq,movntdqa,movnti,movntpd,movntps,movntq,movq,movq2dq,movsb,movsd,movshdup,movsldup,movsq,movss,movsw,movsx,movsxd,movupd,movups,movzx,mpsadbw,mul,mulpd,mulps,mulsd,mulss,mwait,neg,nop,not,or,orpd,orps,out,outsb,outsd,outsw,pabsb,pabsd,pabsw,packssdw,packsswb,packusdw,packuswb,paddb,paddd,paddq,paddsb,paddsw,paddusb,paddusw,paddw,palignr,pand,pandn,pavgb,pavgusb,pavgw,pblendvb,pblendw,pclmulqdq,pcmpeqb,pcmpeqd,pcmpeqq,pcmpeqw,pcmpestri,pcmpestrm,pcmpgtb,pcmpgtd,pcmpgtq,pcmpgtw,pcmpistri,pcmpistrm,pextrb,pextrd,pextrq,pextrw,pf2id,pf2iw,pfacc,pfadd,pfcmpeq,pfcmpge,pfcmpgt,pfmax,pfmin,pfmul,pfnacc,pfpnacc,pfrcp,pfrcpit1,pfrcpit2,pfrsqit1,pfrsqrt,pfsub,pfsubr,phaddd,phaddsw,phaddw,phminposuw,phsubd,phsubsw,phsubw,pi2fd,pi2fw,pinsrb,pinsrd,pinsrq,pinsrw,pmaddubsw,pmaddwd,pmaxsb,pmaxsd,pmaxsw,pmaxub,pmaxud,pmaxuw,pminsb,pminsd,pminsw,pminub,pminud,pminuw,pmovmskb,pmovsxbd,pmovsxbq,pmovsxbw,pmovsxdq,pmovsxwd,pmovsxwq,pmovzxbd,pmovzxbq,pmovzxbw,pmovzxdq,pmovzxwd,pmovzxwq,pmuldq,pmulhrsw,pmulhrw,pmulhuw,pmulhw,pmulld,pmullw,pmuludq,pop,popa,popad,popcnt,popfd,popfq,popfw,por,prefetch,prefetchnta,prefetcht0,prefetcht1,prefetcht2,psadbw,pshufb,pshufd,pshufhw,pshuflw,pshufw,psignb,psignd,psignw,pslld,pslldq,psllq,psllw,psrad,psraw,psrld,psrldq,psrlq,psrlw,psubb,psubd,psubq,psubsb,psubsw,psubusb,psubusw,psubw,pswapd,ptest,punpckhbw,punpckhdq,punpckhqdq,punpckhwd,punpcklbw,punpckldq,punpcklqdq,punpcklwd,push,pusha,pushad,pushfd,pushfq,pushfw,pxor,rcl,rcpps,rcpss,rcr,rdmsr,rdpmc,rdrand,rdtsc,rdtscp,rep,repne,ret,retf,rol,ror,roundpd,roundps,roundsd,roundss,rsm,rsqrtps,rsqrtss,sahf,salc,sar,sbb,scasb,scasd,scasq,scasw,seta,setae,setb,setbe,setg,setge,setl,setle,setno,setnp,setns,setnz,seto,setp,sets,setz,sfence,sgdt,shl,shld,shr,shrd,shufpd,shufps,sidt,skinit,sldt,smsw,sqrtpd,sqrtps,sqrtsd,sqrtss,stc,std,stgi,sti,stmxcsr,stosb,stosd,stosq,stosw,str,sub,subpd,subps,subsd,subss,swapgs,syscall,sysenter,sysexit,sysret,test,ucomisd,ucomiss,ud2,unpckhpd,unpckhps,unpcklpd,unpcklps,vaddpd,vaddps,vaddsd,vaddss,vaddsubpd,vaddsubps,vaesdec,vaesdeclast,vaesenc,vaesenclast,vaesimc,vaeskeygenassist,vandnpd,vandnps,vandpd,vandps,vblendpd,vblendps,vblendvpd,vblendvps,vbroadcastsd,vbroadcastss,vcmppd,vcmpps,vcmpsd,vcmpss,vcomisd,vcomiss,vcvtdq2pd,vcvtdq2ps,vcvtpd2dq,vcvtpd2ps,vcvtps2dq,vcvtps2pd,vcvtsd2si,vcvtsd2ss,vcvtsi2sd,vcvtsi2ss,vcvtss2sd,vcvtss2si,vcvttpd2dq,vcvttps2dq,vcvttsd2si,vcvttss2si,vdivpd,vdivps,vdivsd,vdivss,vdppd,vdpps,verr,verw,vextractf128,vextractps,vhaddpd,vhaddps,vhsubpd,vhsubps,vinsertf128,vinsertps,vlddqu,vmaskmovdqu,vmaskmovpd,vmaskmovps,vmaxpd,vmaxps,vmaxsd,vmaxss,vmcall,vmclear,vminpd,vminps,vminsd,vminss,vmlaunch,vmload,vmmcall,vmovapd,vmovaps,vmovd,vmovddup,vmovdqa,vmovdqu,vmovhlps,vmovhpd,vmovhps,vmovlhps,vmovlpd,vmovlps,vmovmskpd,vmovmskps,vmovntdq,vmovntdqa,vmovntpd,vmovntps,vmovq,vmovsd,vmovshdup,vmovsldup,vmovss,vmovupd,vmovups,vmpsadbw,vmptrld,vmptrst,vmread,vmresume,vmrun,vmsave,vmulpd,vmulps,vmulsd,vmulss,vmwrite,vmxoff,vmxon,vorpd,vorps,vpabsb,vpabsd,vpabsw,vpackssdw,vpacksswb,vpackusdw,vpackuswb,vpaddb,vpaddd,vpaddq,vpaddsb,vpaddsw,vpaddusb,vpaddusw,vpaddw,vpalignr,vpand,vpandn,vpavgb,vpavgw,vpblendvb,vpblendw,vpclmulqdq,vpcmpeqb,vpcmpeqd,vpcmpeqq,vpcmpeqw,vpcmpestri,vpcmpestrm,vpcmpgtb,vpcmpgtd,vpcmpgtq,vpcmpgtw,vpcmpistri,vpcmpistrm,vperm2f128,vpermilpd,vpermilps,vpextrb,vpextrd,vpextrq,vpextrw,vphaddd,vphaddsw,vphaddw,vphminposuw,vphsubd,vphsubsw,vphsubw,vpinsrb,vpinsrd,vpinsrq,vpinsrw,vpmaddubsw,vpmaddwd,vpmaxsb,vpmaxsd,vpmaxsw,vpmaxub,vpmaxud,vpmaxuw,vpminsb,vpminsd,vpminsw,vpminub,vpminud,vpminuw,vpmovmskb,vpmovsxbd,vpmovsxbq,vpmovsxbw,vpmovsxwd,vpmovsxwq,vpmovzxbd,vpmovzxbq,vpmovzxbw,vpmovzxdq,vpmovzxwd,vpmovzxwq,vpmuldq,vpmulhrsw,vpmulhuw,vpmulhw,vpmulld,vpmullw,vpor,vpsadbw,vpshufb,vpshufd,vpshufhw,vpshuflw,vpsignb,vpsignd,vpsignw,vpslld,vpslldq,vpsllq,vpsllw,vpsrad,vpsraw,vpsrld,vpsrldq,vpsrlq,vpsrlw,vpsubb,vpsubd,vpsubq,vpsubsb,vpsubsw,vpsubusb,vpsubusw,vpsubw,vptest,vpunpckhbw,vpunpckhdq,vpunpckhqdq,vpunpckhwd,vpunpcklbw,vpunpckldq,vpunpcklqdq,vpunpcklwd,vpxor,vrcpps,vrcpss,vroundpd,vroundps,vroundsd,vroundss,vrsqrtps,vrsqrtss,vshufpd,vshufps,vsqrtpd,vsqrtps,vsqrtsd,vsqrtss,vstmxcsr,vsubpd,vsubps,vsubsd,vsubss,vtestpd,vtestps,vucomisd,vucomiss,vunpckhpd,vunpckhps,vunpcklpd,vunpcklps,vxorpd,vxorps,vzeroall,vzeroupper,wait,wbinvd,wrmsr,xadd,xchg,xcryptcbc,xcryptcfb,xcryptctr,xcryptecb,xcryptofb,xgetbv,xlatb,xor,xorpd,xorps,xrstor,xsave,xsetbv,xsha1,xsha256,xstore,invalid,3dnow,none,db,pause".split(",")

let bold=x=>x.classList.add("b"),unbold=x=>x.classList.remove("b")
let hx=(x,n)=>"0x"+x.toString(16).padStart(n,"0"),log2=Math.log2,lo=x=>x.constructor==BigInt?Number(BigInt.asUintN(32,x)):x
let i8=x=>(0xff&x)<<24>>24,i16=x=>(0xffff&x)<<16>>16,i32=x=>(0xffffffff&x)<<0>>0
let h2=x=>x.toString(16).padStart(2,"0"),h4=x=>x.toString(16).padStart(8,"0"),h8=(h,l)=>h4(h)+h4(l),H8=x=>x.toString(16).padStart(16,"0")

/* compare against cpulog: build blink with LOG_CPU=1
BEGIN{n=0}
/IP/{ip=$2}
/SP/{sub(/0x/,"",$2);sp=$2}
/AX/{sub(/0x/,"",$2);ax=$2}
/CX/{sub(/0x/,"",$2);cx=$2}
/DX/{sub(/0x/,"",$2);dx=$2}
/BX/{sub(/0x/,"",$2);bx=$2}
/BP/{sub(/0x/,"",$2);bp=$2}
/SI/{sub(/0x/,"",$2);si=$2}
/DI/{sub(/0x/,"",$2);di=$2}
/FLAGS/{f=$2;print n++,ip,f,sp,ax,cx,dx,bx,bp,si,di}
*/
let cpulog=(l,elf)=>{if(!l)return x=>x;let L=su(l).split("\n"),U=new Uint32Array(elf[0].buffer,0,260),n=0,f=x=>af("OSZAPC").map((s,i)=>(1&(x>>(5-i)))?s:".").join("");
 let h=i=>" "+((BigInt(U[1+i])<<32n)|BigInt(U[i])).toString(16);
 return x=>{if("string"==typeof(x))return x;let s=String(n)+" "+U[64].toString(16)+" "+f(U[0])+h(10)+h(2)+h(4)+h(6)+h(8)+h(12)+h(14)+h(16);
 /*console.log(n,s,L[n]);*/ if(!L[n].startsWith(s)){O("\n"+s+"\n"+L[n]+"\n");return"cpu mismatch"};n++}}
 
let execv=a=>{ kdbut.hidden=false;kdb(1);
 let u=fsget(a[0]),elf;if(u===0){progexit();return}
 try{elf=loadelf(u)}
 catch(e){out.textContent+="elf: "+e.message+"\n";progexit();return}
 WebAssembly.instantiateStreaming(fetch("ud/dis.wasm")).then(r=>{let d=r.instance.exports
  disasm(elf,d);stackinit(elf,a);rdxinit(elf,0x7faee69ffff9n);eop=BigInt(elf[2]);eod=elf[3];
  showheap=shhep(elf[0]);showheap((elf[2]+15)>>4<<4);br.textContent=h8(0,brk0);
  let stp=execute(elf,d),cpu=cpulog(fsget("x.cpulog"),elf);cpu();traceinto=stp;stepover=stp;
  runto=bp=>{while(1){let pc=stp();if(pc==bp)return;if("string"==typeof pc){if(""==pc)return;O("\n"+h4(lpc)+": "+pc+"\n");return}}};
  if(deb.checked==false){let lpc;while(1){let pc=cpu(stp());if("string"==typeof pc){if(""==pc)return;O("\n"+h4(lpc)+": "+pc+"\n");return};lpc=pc;}}})
}
let exit=x=>{if(x)O("exit "+x+"\n");progexit();kdb(0);return""}

let showstack,showheap
let xxD=(b,t)=>{let h=(i,o)=>h2(b[o+i*16])+h2(b[1+o+i*16])+" "+h2(b[2+o+i*16])+h2(b[3+o+i*16]),s=o=>Array(16).fill("-").map((x,i)=>(x=b[o+i],x>31&&x<127?String.fromCharCode(x):".")).join("")
 return Array(16).fill(0).map((_,i)=>h4(t+i*16)+" "+h(i,0)+" "+h(i,4)+" "+h(i,8)+" "+h(i,12)+" "+s(i*16)).join("\n")}
let shhep=M=>t=>heap.textContent=(t=min(t,M.length-16*32),xxD(new Uint8Array(M.buffer,t,16*32),t))
let shstk=S=>(h,rsp)=>{for(let i=0;i<16;i++){let j=stacktop-BigInt(8*(i+h)); ge("stk"+i).textContent=(rsp>j?"│":rsp==j?"└":" ")+H8(j)+" "+H8(S[(i+h)])}  }
let showcal=c=>{c.slice(c.length-16,c.length).forEach((x,i)=>tc(h4(x[0])+": "+h4(x[1]),ge("cal"+i)))}
let markrsp=rsp=>{for(let i=0;i<16;i++){let e=ge("stk"+i),s=e.textContent,a=BigInt("0x"+s.slice(1,17));s=(a>rsp?"│":a<rsp?" ":"└")+s.slice(1);e.textContent=s}}
let stackinit=(d,a)=>{let J=new BigUint64Array(d[0].buffer,0,32),b=new Uint8Array(d[0].buffer),U=new Uint32Array(d[0].buffer,d[3]),p=d[1]-16;
 a=a.toReversed();a.forEach((x,i)=>{x=us(x);let k=(7+1+x.length)>>3<<3;p-=k;b.set(x,p);b[p+x.length]=0;U[2+2*i]=p;U[3+2*i]=0});U[2+2*a.length]=a.length;U[3+2*a.length]=0;rsp=stacktop-BigInt(8*(1+a.length));J[5]=rsp; 
 showstack=shstk(new BigUint64Array(d[0].buffer,d[3]));showstack(0,rsp);}
let rdxinit=(d,rdx)=>{let J=new BigUint64Array(d[0].buffer,0,32);J[3]=rdx}

//virtual addr :                                                  xxxxxxxxxxxxxxxxxxxxxxxx       xxxx  brk0.......brk  .....(stacktop)
//memory layout: 0..256 registers (0:eflags) 256(rip)  argstrings entrypoint..program code (eop) data (eod) heap (brk) stack

let err=s=>{throw new Error(s)}
let execute=(elf,D)=>{ //brk S R B( lo= flag
  let[M,rip,eop]=elf,ud=D.dis_init(rip),b=new Uint8Array(D.memory.buffer,ud,576),u=new Uint32Array(D.memory.buffer,ud+340,59),cal=[[0,rip]],flag={};showcal(cal)
  let bp  =new Uint32Array(D.memory.buffer,4+ud,1)[0]; //pointer to ibuf stored within ud struct
  let u8_=new Uint8Array(1),u16_=new Uint16Array(1),u32_=new Uint32Array(1),u8=x=>(u8_[0]=x,u8_[0]),u16=x=>(u16_[0]=x,u16_[0]),u32=x=>(u32_[0]=x,u32_[0]),u64=x=>BigInt.asUintN(64,x),uint=x=>sz==8?u8(x):sz==16?u16(x):sz==32?u32(x):u64(x)
  let ibuf=new Uint8Array(D.memory.buffer,bp,16),sz,adrmode,B=x=>BigInt(x);
  let V=new DataView(M.buffer),H=new Uint16Array(M.buffer,0,M.buffer.byteLength>>1),U=new Uint32Array(M.buffer,0,M.buffer.byteLength>>2),J=new BigUint64Array(M.buffer,0,M.buffer.byteLength>>3) /*,I=new Int32Array(M.buffer,0,69)*/;U[64]=rip;   // [156 regs][4 imm]
  let Rat=(x, s)=>(s=regsiz[x],x=regmap[x],B(8==s?M[x]:16==s?H[x>>1]:32==s?U[x>>2]:J[x>>3])),simm=(i,l,h, a)=>(a=66+2*i,U[a]=l,U[1+a]=h,a<<2)
  let push=(x, i)=>(J[5]-=8n, i=(brk+Number(stacktop-J[5]))>>2, U[i]=U[x>>2],U[1+i]=U[1+(x>>2)] )
  let popl=x=>((r=U[(brk+Number(stacktop-J[5]))>>2]),(J[5]+=8n),r)
  let pucal=(x,y)=>{cal.push([x,y]),cal.length<16?tc(h4(x)+": "+h4(y),ge("cal"+(cal.length-1))):showcal(cal)},pocal=_=>{cal.pop();cal.length<15?tc("",ge("cal"+cal.length)):showcal(cal)}
  let lpc=rip;mark(U,rip,40,0,0,0)
  let prot=x=>{if(x>=rip&&x<=eop)throw new Error("write protection");return x}
  let iasm=asm.map(x=>xs(x.slice(0,8)));
  return _=>{ if(!iasm.includes(U[64])){O(`\nillegal rip: ${h4(U[64])}\n`);return exit(1);}
   for(let j=0;j<16;j++)ibuf[j]=M[j+U[64]];let n=D.dis();if(!n)return 0;rip+=n;U[64]=rip;let lea=u[0]==269;
   sz=b[538+9];adrmode=b[538+10],rep=b[544]?"rep":b[545]?"repe":b[546]?"repne":"" ;
   if(u[1]==156&&u[3]<5)sz=8; //fix mov al,byte .. sz=32
   let bs=x=>sz==64?BigInt(x):x
   
   let imm=(i,x)=>{let s=u[1+x],l=u[x+6],h=u[x+7],sn=46==u[x+10];return simm(i,sn?(8==s?l<<24>>24:l<<0>>0):(8==s?0xff:16==s?0xffff:0xffffffff)&l)}
   let jmm=(i,x)=>{let s=u[1+x],l=u[x+6],h=u[x+7];return simm(i,U[64]+(8==s?i8(l):16==s?i16(l):i32(l)))}
   let disp=(o,b,i,l,h)=>(8==o?0xff:16==o?0xffff:0xffffffff)&l
   let indx=(i,s)=>Rat(i)*B(s?s:1);
   let st=x=>lea?x:x<eod?Number(x):(x>=brk0&&x<brk)?eop+Number(brk0-x):x<stacktop?brk+Number(x-stacktop):(O(`\nillegal addr: ${x.toString(16)}\n`),exit(1)); //x>0xffffffffn?brk+Number(stacktop-x):x
   let opmem=x=>{let s=u[1+x],b=u[2+x],i=u[3+x],sc=u[4+x]&0xff,o=(u[4+x]>>>8)&0xff; /*console.log("opmem b",b,s,regmap[b],regmap[b]>>2,Rat(b),"i",i);*/ return(b?Rat(b)+(i?indx(i,sc):0n):0n)+B(o?disp(o,b,i,u[x+6],u[x+7]):0n)}
   let oper=i=>{let x=1+12*i,t=u[x]; return(t==0)?0:t==156?regmap[u[2+x]]:t==157?opmem(x):t==159?imm(i,x):t==160?jmm(i,x):(err("operand type:"+t),0)}
   
   //flags see https://github.com/jart/blink/blob/master/blink/alu.c
   let aco=(a,c,o)=>{flag.A=+a;flag.C=+c;flag.O=+o},fsz=r=>(flag.Z=r==0,flag.S=(r>[0x7f,0x7fff,0x7fffffff,0x7fffffffffffffffn][log2(sz)-3]))
   let fl0=(x,y,r)=>(aco(0,0,0),fsz(uint(r)),r)
   let fla=(x,y,r)=>(aco((r&bs(15))<(y&bs(15)),r<y,!!(((r^x)&(r^y))>>bs(sz-1))),fsz(r),r)
   let fls=(x,y,r)=>(aco((x&bs(15))<(r&bs(15)),x<r,!!(((x^y)&(r^x))>>bs(sz-1))),fsz(r),r)
   let X=oper(0),Y=oper(1),Z=oper(2),ZZ=oper(3),x=st(X),y=st(Y),z=st(Z),zz=st(ZZ),na=(X!=0n)+(Y!=0n)+(Z!=0n)+(ZZ!=0n);
   let clu=x=>{if(x<132)U[4+x>>2]=0}
   let F2=(f,fl, r,xx,yy)=>(prot(x),8==sz?(M[x]=r=u8(f(xx=M[x],yy=M[y])),fl(xx,yy,r))
                                  :16==sz?(V.setUint16   (x,   r=u16(f(xx=V.getUint16(   x,1),yy=V.getUint16(   y,1))),1),fl(xx,yy,r))
                                  :32==sz?(V.setUint32   (x,   r=u32(f(xx=V.getUint32(   x,1),yy=V.getUint32(   y,1))),1),fl(xx,yy,r),clu(x))
                                  :       (V.setBigUint64(x,   r=u64(f(xx=V.getBigUint64(x,1),yy=V.getBigUint64(y,1))),1),fl(xx,yy,r)));
   console.log("X",X,x,"Y",Y,y);
   switch(u[0]){
   case   5/*add */: F2((x,y)=>x+y,fla);                                                       break;
   case  18/*and */: F2((x,y)=>x&y,fl0);                                                       break;
   case  36/*call*/: push(256); U[64]=U[x>>2];rip=U[64]; Y=J[5]; Z=40; pucal(lpc,rip);         break;
   case  40/*clc */: flag.C=0;                                                                 break;
   case  63/*cmp */: F2((x,y)=>x,(x,y,r)=>fls(x,y,x-y));                                       break;
   case 105/*dec */: let c=flag.C;64==sz?F2(x=>x-1n,fla):F2(x=>x-1,fls); flag.C=c;             break; //keep carry also for inc
   case 246/*jb/c*/: if(flag.C)U[64]=U[x>>2];rip=U[64];                                        break;
   case 254/*jmp */: rip=U[x>>2];U[64]=rip;                                                    break;
   case 258/*jnz */: if(!flag.Z)U[64]=U[x>>2];rip=U[64];                                       break;
   case 263/*jz  */: if( flag.Z)U[64]=U[x>>2];rip=U[64];                                       break;
   case 269/*lea */: prot(x);(8==sz?(M[x]=y):16==sz?V.setUint16(x,y,1):32==sz?V.setUint32(x,y,1):V.setBigUint64(x,Y,1)); y=0; break;
   case 303/*mov */: F2((x,y)=>y,(a,b,r)=>r);                                                  break;
   case 339/*movzx*/:F2((x,y)=>0xff&y,(a,b,r)=>r);                                             break;
   case 347/*neg */: F2(x=>-x,(x,y,r)=>(aco(+!!x,+!!x,+(r==x)),fsz(r),r));                     break;
   case 350/*or  */: F2((x,y)=>x|y,fl0);                                                       break;
   case 532/*ret */: rip=popl();U[64]=rip;x=40;y=64; pocal();                                  break;
   case 547/*scasb*/:while(1){ //eax:8 edi:64 ecx:16
	      let a=M[8],b=M[U[64>>2]];
              U[64>>2]++; if(rep=="")break;let c=--U[16>>2]; //todo: dirflag cld/std
              if((!c)||(rep=="repe"&&a!=b)||(rep=="repne"&&a==b))break}; x=16; y=64;           break; //todo flag: OF, SF, ZF, AF, PF, and CF flags are set according to the temporary result of the comparison.
   case 583/*stc */: flag.C=1;                                                                 break;
   case 593/*sub */: F2((x,y)=>x-y,fls);                                                       break;
   case 599/*sysc*/: if(60==U[2])return exit(U[16]);U[2]=syscall(M,U[2],U[16],U[14],U[6]); X=8;Y=64;Z=56;zz=24;fsz(8);break;
   case 603/*test*/: F2((x,y)=>x,(x,y,r)=>fsz(uint(x&y)));aco(0,0,0);                          break;
   case 894/*xor */: F2((x,y)=>x^y,fl0);                                                       break;  
   case 280/*lodsb*/:X=8n;x=8;Y=Rat(32==sz?43:59);y=lo(Y);Z=56n;F2((x,y)=>0xff&y,(a,b,r)=>r);J[7]+=(flag.D?-1n:1n); if(rep!=""){O("todo lodsb rep");return exit(1)}; break
   case 588/*stosb*/:X=Rat(32==sz?44:60);x=lo(X);Y=8n;y=8;F2((x,y)=>0xff&y,(a,b,r)=>r);J[8]+=(flag.D?-1n:1n); break;
   default: O(`\n${h4(lpc)}:unknown instr ${u[0]}: ${mne[u[0]]}\n`); return exit(1);
   }
   U[0]=(+!!flag.C)|((+!!flag.P)<<1)|((+!!flag.A)<<2)|((+!!flag.Z)<<3)|((+!!flag.S)<<4)|((+!!flag.O)<<5)   
   mark(U,lpc,X,Y,Z,ZZ);lpc=rip
   return rip
 }
}

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
let syscall=(M,rax,rdi,rsi,rdx)=>1==rax?(O(M.subarray(rsi,rsi+rdx)),rdx):12==rax&&rdi==0?brk:(O("unknown syscall: "+rax+" "+rdi+"\n"),exit(1))

let disasm=(elf,D)=>{let[M,rip,eop]=elf;asm=[];disa.innerHTML=""
  let ud=D.dis_init(rip)
  let bp  =new Uint32Array(D.memory.buffer,4+ud,1)[0]; //pointer to ibuf stored within ud struct
  let ibuf=new Uint8Array(D.memory.buffer,bp,16);
  let b=new Uint8Array(D.memory.buffer,ud,576),u=new Uint32Array(D.memory.buffer,ud+340,59)
  let s;while(1){for(let i=0;i<16;i++)ibuf[i]=M[rip+i];let n=D.dis();if(!n)break;rip+=n;s=decode(rip,b,u);asm.push(s);if(rip>=eop)break}
  let n=Math.min(16,asm.length)
  for(let i=0;i<n;i++)disa.appendChild(tc(asm[i]+"\n",ce("span")))}

let decode=(rip,b,u)=>{ //sizeofud(576) inp_buf(+4) inp_ctr(+20 length) mnemonic(+340) operand:(+344 392 440 488) pfx_rex(+538) pfx_rep:(+540) repe(541) repne(542) prim.opc(+557) userdata(+560)
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
 let jmm=x=>{let s=u[1+x],l=u[x+6],h=u[x+7];return s==8?hx(i8(l)+rip,2):s==16?hx(i16(l)+rip,4):s==32?hx(i32(l)+rip,8):("jmm-size?"+s)}
 let oper=i=>{let x=1+12*i;t=u[x];return t==0?"":t==156?regstr(u[2+x]):t==157?opmem(x):t==159?imm(x):t==160?jmm(x):"oper?"+t}
 let operands=_=>[oper(0),oper(1),oper(2),oper(3)].filter(x=>x!="").join(",")
 return h4(rip-b[20])+" "+rep+(mne[u[0]]).padEnd(4," ")+" "+operands()}

let mark=(U,rip,x,y,z,zz)=>{let pc=h4(rip),rsp=BigInt(U[10])|(BigInt(U[11])<<32n); //S R flg
 let a=af(disa.childNodes);a.forEach(unbold)
 let i=a.findIndex(x=>x.textContent.startsWith(pc));if(i<0){i=asm.findIndex(x=>x.startsWith(pc));if(i>=0){disa.dataset.i=i-1;disa.move(1);bold(disa.firstChild)}}else bold(a[i]);
 a=af(regs.children);a.forEach(unbold);flags.textContent=af("OSZAPC").map((s,i)=>(1&(U[0]>>(5-i)))?s:".").join("");
 let h=x=>U[1+(x>>2)].toString(16).padStart(8,"0")+U[x>>2].toString(16).padStart(8,"0");
 let H=(i,x)=>"ffffffff"+x.toString(16).padStart(8,"0")+" "+S[i].toString(16).padStart(8,"0")+S[1+i].toString(16).padStart(8,"0")
 tc(h(256),reg32) //rip
 const stkx=[stk0,stk1,stk2,stk3,stk4,stk5,stk6,stk7,stk8,stk9,stk10,stk11,stk12,stk13,stk14,stk15]
 let st=x=>{let s=H8(x),i=stkx.findIndex(y=>s==y.textContent.substring(1,17)),u=brk+Number(stacktop-rsp)>>2;
  if(i>=0){bold(stkx[i]);stkx[i].textContent=stkx[i].textContent.substring(0,18)+h4(U[1+u])+h4(U[u])}
 }
 let mk=x=>{if(x.constructor==BigInt){if(x>BigInt(brk))return st(x);x=lo(x)}; (!x)?0:x<=256?(bold(tc(h(x),ge("reg"+((x>>>3)-1)))),(40==x?markrsp(rsp):0)):0};mk(x);mk(y);mk(z);mk(zz)}

