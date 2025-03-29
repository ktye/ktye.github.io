#if __x86_64
#define S(f,i) ZU AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
#if __AVX512F__
#define o(f) bu(ia32_##f##512)
UV(b_,o(cvtb2mask)(a))UV(b2,o(cvtd2mask)(a))UV(b3,o(cvtq2mask)(a))Ve(sq,o(sqrtps)(x,4))V3(AM,bu(ia32_vfmaddsubps512_mask3)(a,b,c,-1,9))VF(a4,o(pshufb)(a,b))VF(LG,o(pminub)(a,b))VF(MG,o(pmaxub)(a,b))VF(LI,o(pminud)(a,b))VF(MI,o(pmaxud)(a,b))
#else
#define o(f) bu(ia32_##f##256)
#define Y(a) ((g5*)&a)[i]
UV(b_,Ux=0;i(2,x|=(U)o(pmovmskb)(Y(a))<<32*i)x)UV(b2,Ux=0;i(2,x|=o(movmskps)(Y(a))<<8*i)x)UV(b3,Ux=0;i(2,x|=o(movmskpd)(Y(a))<<4*i)x)Vf(sq,i(2,Y(a)=o(sqrtps)(Y(a)))a)V3(AM,i(2,Y(a)=o(vfmaddsubps)(Y(a),Y(b),Y(c)))a)
VF(a4,i(2,Y(a)=o(pshufb)(Y(a),Y(b)))a)VF(LG,i(2,Y(a)=o(pminub)(Y(a),Y(b)))a)VF(MG,i(2,Y(a)=o(pmaxub)(Y(a),Y(b)))a)VF(LI,i(2,Y(a)=o(pminud)(Y(a),Y(b)))a)VF(MI,i(2,Y(a)=o(pmaxud)(Y(a),Y(b)))a)
#endif
ZU AS(ut,"rdtsc;shl $32,%rdx;or %rdx,%rax;")_f(X9,bu(ia32_pclmulqdq128)((j4){x},~(j4){},0)[0])D(g4,p4,bu(ia32_pshufb128)(a,b),g4 a,g4 b)VF(GG,AM(a,a4(b,S0),(e6)a4(a,S2)*a4(b,S1)))
#else
#define S(f,i) ZU AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nmov x4,0\nmov x5,x4\nsvc 0\n",Ux,...)
#define o(f) bu(neon_v##f##q_v)
#define Y(a) ((g4*)&a)[i]
#define y(i) ((g4*)&a)[i]
D(j4,b,o(padd)(x,y,48),g4 x,g4 y)U(b_,g4 m=1<<I4%8;x(b(b(m&y(0),m&y(1)),b(m&y(2),m&y(3))),b(x,x)[0]),Va)U(b4,g6 b;i(4,Y(b)=o(qtbl4)(y(0),y(1),y(2),y(3),c*Y(I0),48))b_(b),cc,Va)UV(b2,b4(4,a))UV(b3,b4(8,a))
D(g4,p4,o(qtbl1)(a,b,32),g4 a,g4 b)VF(a4,i(4,Y(a)=p4(Y(a),Y(b)))a)VF(LG,i(4,Y(a)=o(min)(Y(a),Y(b),32))a)VF(MG,i(4,Y(a)=o(max)(Y(a),Y(b),32))a)VF(LI,i(4,Y(a)=o(min)(Y(a),Y(b),48))a)VF(MI,i(4,Y(a)=o(max)(Y(a),Y(b),48))a)
ZU AS(ut,"mrs x0,cntvct_el0\n")_f(X9,bu(neon_vmull_p64)(x,-1L))VF(GG,Vc={};i(4,asm("fcmla.4s %0,%1,%2,0\nfcmla.4s %0,%1,%2,90":"+w"(Y(c)):"w"(Y(a)),"w"(Y(b))))c)Vf(sq,i(4,Y(a)=o(sqrt)(Y(a),41))a)
#endif
#if linux
S(w_,1)S(_w,0)S(d_,2)S(_d,3)S(d7,4)S(m_,9)S(_m,11)S(_k,60)f(M7,m_(0,x,3,0x4022,0,0))f(D7,Ua[24];!d7(x,a)&1&a[3]>>15?a[6]:0) 
#else
S(w_,4)S(_w,3)S(d_,5)S(_d,6)S(d7,338)S(m_,197)S(_m,73)S(_k,1)f(M7,m_(0,x,3,0x1042,0,0))f(D7,Ua[24];!d7(x,a)&1&*a>>47?a[12]:0) 
#endif
