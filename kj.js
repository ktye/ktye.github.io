
let _I2,_I8,_I32,_I64,_F64,_memorysize,_memorysize2,_F
const I=x=>x|0,U=x=>BigInt.asUintN(32,x),J=x=>BigInt.asIntN(64,x),K=x=>BigInt.asUintN(64,x),F=x=>+x
const _UI=x=>U(BigInt(x)),_KI=x=>K(BigInt.asIntN(32,BigInt(x))),_KU=x=>K(x),_JI=x=>J(BigInt(x))
const _IK=_IJ=x=>Number(BigInt.asIntN(32,x))|0,_UK=_UJ=x=>U(x),_JK=x=>J(x),_KJ=x=>K(x)
const _FI=_FJ=_FK=x=>+Number(x),_JF=x=>J(BigInt(x|0)),_IF=x=>x|0,_KF=x=>K(BigInt(x|0))
const _F0=new Float64Array(1),_U0=new BigUint64Array(_F0.buffer)
const _msl=function(){_I32=new Int32Array(_I8.buffer);_I64=new BigInt64Array(_I8.buffer);_F64=new Float64Array(_I8.buffer)}
const Memory =function(x){_memorysize =x;_I8=new Int8Array(x*64*1024);_msl()}
const Memory2=function(x){_memorysize2=x;_I2=new Int8Array(x*64*1024)}
const Memorycopy=function(x,y,z){_I8.copyWithin(x,y,y+z)}
const Memorycopy2=function(x,y,z){_I2.set(_I8.subarray(y,y+z),x)}
const Memorycopy3=function(x,y,z){_I8.set(_I2.subarray(y,y+z),x)}
const Memoryfill=function(x,y,z){_I8.fill(y,x,x+z)}
const Memorysize =function(){return _memorysize}
const Memorysize2=function(){return _memorysize2}
const Memorygrow=x=>{
 let r=_memorysize;_memorysize+=x;
 let m=new Int8Array(64*1024*_memorysize)
 m.set(_I8);_I8=m;_msl();return r}
const Memorygrow2=x=>{
 let r=_memorysize2;_memorysize2+=x;
 let m=new Int8Array(64*1024*_memorysize2)
 m.set(_I2);_I2=m;return r}
const I8=x=>_I8[x],I32=x=>_I32[x>>>2],I64=x=>_I64[x>>>3],F64=x=>_F64[x>>>3]
const SetI8 =function(x,y){_I8[x]=y}
const SetI32=function(x,y){_I32[x>>2]=y}
const SetI64=function(x,y){_I64[x>>3]=y}
const SetF64=function(x,y){_F64[x>>3]=y}
const I32clz=x=>Math.clz32(x),I32B=x=>(+x|0)
const F64reinterpret_i64=x=>{_U0[0]=x;return _F0[0]}
const I64reinterpret_f64=x=>{_F0[0]=x;return _U0[0]}
const F64floor=x=>Math.floor(x),F64min=(x,y)=>Math.min(x,y),F64max=(x,y)=>Math.max(x,y)
const F64abs=x=>Math.abs(x),F64sqrt=x=>Math.sqrt(x),F64copysign=function(x,y){return x*Math.sign(y)}

const panic=x=>{throw(x)}
const Err=I(0);
const Type=I(1);
const Value=I(2);
const Index=I(3);
const Length=I(4);
const Rank=I(5);
const Parse=I(6);
const Stack=I(7);
const Grow=I(8);
const Unref=I(9);
const Io=I(10);
const Nyi=I(11);
const nai=I(-2147483648);
const ct=I(2);
const it=I(3);
const st=I(4);
const ft=I(5);
const zt=I(6);
const lt=I(7);
const dt=I(8);
const tt=I(9);
const cf=I(10);
const df=I(11);
const pf=I(12);
const lf=I(13);
const xf=I(14);
const Ct=I(18);
const It=I(19);
const St=I(20);
const Ft=I(21);
const Zt=I(22);
const Lt=I(23);
const Dt=I(24);
const Tt=I(25);
const pi=F(3.141592653589793);
const maxfloat=F(1.7976931348623157e+308);
let loc = K(0n);
let xyz = K(0n);
let na = F(0.);
let inf = F(0.);
let pp = I(0);
let pe = I(0);
let sp = I(0);
let srcp = I(0);
let rand_ = I(0);
let ps = I(0);
const ech=function(x){
 return l2t(x,K(0n),df);
}
const ecp=function(x){
 return l2t(x,K(1n),df);
}
const rdc=function(x){
 return l2t(x,K(2n),df);
}
const ecr=function(x){
 return l2t(x,K(3n),df);
}
const scn=function(x){
 return l2t(x,K(4n),df);
}
const ecl=function(x){
 return l2t(x,K(5n),df);
}
const Ech=function(f,x){
 let r,t,xt,xn,rp,i14
 r=K(0n);
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)==I(2)){
   r=x0(x);
   return lin(r,f,r1(x));
  }
  return Bin(f,Fst(x));
 }
 if(nn(x)==I(1)){
  x=Fst(x);
 } else {
  return ecn(f,x);
 }
 if(tp(x)<I(16)){
  trap(Type);
 }
 xt=tp(x);
 if(xt==Dt){
  r=x0(x);
  return Key(r,Ech(f,l1(r1(x))));
 }
 if(xt==Tt){
  x=explode(x);
 }
 xn=nn(x);
 r=mk(Lt,xn);
 rp=_IK(r);
 {
  i14=I(0);
  for(;(i14<xn);i14++){
   SetI64(rp,_JK(Atx(rx(f),ati(rx(x),i14))));
   rp+=8;
  }
 }
 dx(f);
 dx(x);
 return uf(r);
}
const ecn=function(f,x){
 let r2
 if(nn(x)==I(2)){
  r2=x0(x);
  x=r1(x);
  if(r2==K(0n)){
   return Ech(f,l1(x));
  }
  if((tp(f)==I(0))&&(_IK(f)==I(13))){
   if((tp(r2)==Tt)&&(tp(x)==Tt)){
    if(nn(r2)!=nn(x)){
     trap(Length);
    }
    f=Cat(x0(r2),x0(x));
    return key(f,Cat(r1(r2),r1(x)),Tt);
   }
  }
  return ec2(f,r2,x);
 }
 return Ech(K(20n),l2(f,Flp(x)));
}
const ec2=function(f,x,y){
 let r,t,n,rp,i8
 r=K(0n);
 t=dtypes(x,y);
 if(t>Lt){
  r=dkeys(x,y);
  return key(r,ec2(f,dvals(x),dvals(y)),t);
 }
 n=conform(x,y);
 switch(n){
  case 0:return Cal(f,l2(x,y));
  break;
  case 1:n=nn(y);
  break;
  case 2:n=nn(x);
  break;
  default:n=nn(x);
  break;
 } 
 r=mk(Lt,n);
 rp=_IK(r);
 {
  i8=I(0);
  for(;(i8<n);i8++){
   SetI64(rp,_JK(Cal(rx(f),l2(ati(rx(x),i8),ati(rx(y),i8)))));
   rp+=8;
  }
 }
 dx(f);
 dx(x);
 dx(y);
 return uf(r);
}
const Ecp=function(f,x){
 let m,y,t,xn,xt,yt,fp17,r,rp,i24
 m=I(0);
 y=K(0n);
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)!=I(1)){
   trap(Rank);
  }
  return In(f,Fst(x));
 }
 xn=nn(x);
 if(xn==I(1)){
  x=Fst(x);
  y=Fst(rx(x));
  m=I(1);
 } else {
  if(xn==I(2)){
   y=x0(x);
   x=r1(x);
  } else {
   trap(Rank);
  }
 }
 xt=tp(x);
 if(xt<I(16)){
  trap(Type);
 }
 if(xt>Lt){
  trap(Nyi);
 }
 xn=nn(x);
 if(I(1)>I(xn-m)){
  dx(f);
  return x;
 }
 yt=tp(y);
 if(((tp(f)==I(0))&&(xt<Zt))&&(yt==I(xt-I(16)))){
  fp17=_IK(f);
  if(((fp17>I(1))&&(fp17<I(8)))&&((xt==It)||(xt==Ft))){
   return epx(fp17,x,y,xn);
  }
  if(fp17==I(11)){
   fp17=I(10);
  }
  if((fp17>I(9))&&(fp17<I(11))){
   return epc(fp17,x,y,xn);
  }
 }
 r=mk(Lt,xn);
 rp=_IK(r);
 SetI64(rp,_JK(cal(rx(f),l2(ati(rx(x),I(0)),y))));
 {
  i24=I(1);
  for(;(i24<xn);i24++){
   rp+=8;
   SetI64(rp,_JK(cal(rx(f),l2(ati(rx(x),i24),ati(rx(x),I(i24-I(1)))))));
  }
 }
 dx(f);
 dx(x);
 return uf(r);
}
const Rdc=function(f,x){
 let r,t,y,xn12,yt,yn,xt,fp25,i
 r=K(0n);
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)==I(2)){
   r=x0(x);
   x=r1(x);
   if((t==it)&&(isfunc(tp(r))!=I(0))){
    return ndo(_IK(f),r,x);
   } else {
    trap(Type);
   }
  }
  return Mod(Fst(x),f);
 }
 if(arity(f)>I(2)){
  return rdn(f,x,K(0n));
 }
 if(t==df){
  r=x0(f);
  dx(f);
  return Dec(r,Fst(x));
 }
 y=K(0n);
 {
  xn12=nn(x);
  if(xn12==I(1)){
   y=Fst(x);
   x=K(0n);
  } else {
   if(xn12==I(2)){
    y=x1(x);
    x=r0(x);
   } else {
    y=trap(Rank);
   }
  }
 }
 yt=tp(y);
 if(yt==Dt){
  y=Val(y);
  yt=tp(y);
 }
 if(yt<I(16)){
  if(x==K(0n)){
   dx(f);
   return y;
  } else {
   return cal(f,l2(x,y));
  }
 }
 yn=nn(y);
 xt=tp(x);
 if(tp(f)==I(0)){
  fp25=_IK(f);
  if(((fp25>I(1))&&(fp25<I(8)))&&((xt==I(0))||(yt==I(xt+I(16))))){
   if(yt==Tt){
    return Ech(rdc(f),l2(x,Flp(y)));
   }
   r=K(_F[I(I(365)+fp25)](x,_IK(y),yt,yn));
   if(r!=K(0n)){
    dx(x);
    dx(y);
    return r;
   }
  }
  if((x==K(0n))&&(fp25==I(13))){
   if(yt<Lt){
    return y;
   }
   r=ucats(y);
   if(r!=K(0n)){
    return r;
   }
  }
 }
 if(yn==I(0)){
  if(x==K(0n)){
   return ov0(f,y);
  } else {
   dx(f);
   dx(y);
   return x;
  }
 }
 i=I(0);
 if(x==K(0n)){
  x=ati(rx(y),I(0));
  i=I(1);
 }
 for(;(i<yn);){
  x=cal(rx(f),l2(x,ati(rx(y),i)));
  i++;
 }
 dx(y);
 dx(f);
 return x;
}
const rdn=function(f,x,l){
 let r,n,i1
 r=Fst(rx(x));
 x=Flp(ndrop(I(1),x));
 n=nn(x);
 {
  i1=I(0);
  for(;(i1<n);i1++){
   r=Cal(rx(f),Cat(l1(r),ati(rx(x),i1)));
   if(l!=K(0n)){
    l=cat1(l,rx(r));
   }
  }
 }
 dx(f);
 dx(x);
 if(l!=K(0n)){
  dx(r);
  return uf(l);
 }
 return r;
}
const Ecr=function(f,x){
 let r,t,xn,y7,yt7,t11,yn7,rp7,i12
 r=K(0n);
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)!=I(1)){
   trap(Rank);
  }
  return join(f,Fst(x));
 }
 xn=nn(x);
 switch(I(xn-I(1))){
  case 0:return fix(f,Fst(x),K(0n));
  break;
  case 1:{
   y7=x1(x);
   x=r0(x);
   yt7=tp(y7);
   if(yt7<I(16)){
    return cal(f,l2(x,y7));
   }
   if(yt7>Lt){
    t11=dtypes(x,y7);
    r=dkeys(x,y7);
    return key(r,Ecr(f,l2(dvals(x),dvals(y7))),t11);
   }
   yn7=nn(y7);
   r=mk(Lt,yn7);
   rp7=_IK(r);
   {
    i12=I(0);
    for(;(i12<yn7);i12++){
     SetI64(rp7,_JK(cal(rx(f),l2(rx(x),ati(rx(y7),i12)))));
     rp7+=8;
    }
   }
   dx(f);
   dx(x);
   dx(y7);
   return uf(r);
  }
  break;
  default:return trap(Rank);
  break;
 } 
}
const fix=function(f,x,l){
 let r,y
 r=K(0n);
 y=rx(x);
 for(;;){
  r=Atx(rx(f),rx(x));
  if(match(r,x)!=I(0)){
   break;
  }
  if(match(r,y)!=I(0)){
   break;
  }
  dx(x);
  x=r;
  if(l!=K(0n)){
   l=cat1(l,rx(x));
  }
 }
 dx(f);
 dx(r);
 dx(y);
 if(l!=K(0n)){
  dx(x);
  return l;
 }
 return x;
}
const ndo=function(n,f,x){
 for(;(n>I(0));){
  x=cal(rx(f),l1(x));
  n=I(n-I(1));
 }
 dx(f);
 return x;
}
const Scn=function(f,x){
 let r,y,t,xn9,yt,yn,xt,fp24,rp,i
 r=K(0n);
 y=K(0n);
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)!=I(1)){
   trap(Rank);
  }
  return Div(Fst(x),f);
 }
 if(arity(f)>I(2)){
  return rdn(f,x,mk(Lt,I(0)));
 }
 if(t==df){
  r=x0(f);
  dx(f);
  return Enc(r,Fst(x));
 }
 {
  xn9=nn(x);
  if(xn9==I(1)){
   y=Fst(x);
   x=K(0n);
  } else {
   if(xn9==I(2)){
    y=x1(x);
    x=r0(x);
   } else {
    y=trap(Rank);
   }
  }
 }
 yt=tp(y);
 if(yt<I(16)){
  if(x==K(0n)){
   dx(f);
   return y;
  } else {
   return cal(f,l2(x,y));
  }
 }
 yn=nn(y);
 if(yn==I(0)){
  dx(f);
  dx(x);
  return y;
 }
 if(yt==Dt){
  r=x0(y);
  return Key(r,Scn(f,l2(x,r1(y))));
 }
 xt=tp(x);
 if(tp(f)==I(0)){
  fp24=_IK(f);
  if(((fp24==I(2))||(fp24==I(4)))&&((xt==I(0))||(yt==I(xt+I(16))))){
   if(yt==Tt){
    return Flp(Ech(scn(f),l2(x,Flp(y))));
   }
   r=K(_F[I(I(372)+fp24)](x,_IK(y),yt,yn));
   if(r!=K(0n)){
    dx(x);
    dx(y);
    return r;
   }
  }
 }
 r=mk(Lt,yn);
 rp=_IK(r);
 i=I(0);
 if(x==K(0n)){
  {
   x=ati(rx(y),I(0));
   i=I(1);
  }
  SetI64(rp,_JK(rx(x)));
  rp+=8;
 }
 for(;(i<yn);){
  x=cal(rx(f),l2(x,ati(rx(y),i)));
  SetI64(rp,_JK(rx(x)));
  rp+=8;
  i++;
 }
 dx(y);
 dx(x);
 dx(f);
 return uf(r);
}
const Ecl=function(f,x){
 let t,xn,y7,xn7,r7,rp7,i10
 t=tp(f);
 if(isfunc(t)==I(0)){
  if(nn(x)!=I(1)){
   trap(Rank);
  }
  return split(f,Fst(x));
 }
 xn=nn(x);
 switch(I(xn-I(1))){
  case 0:{
   x=rx(Fst(x));
   return fix(f,x,Enl(x));
  }
  break;
  case 1:{
   y7=x1(x);
   x=r0(x);
   if(tp(x)<I(16)){
    return cal(f,l2(x,y7));
   }
   xn7=nn(x);
   r7=mk(Lt,xn7);
   rp7=_IK(r7);
   {
    i10=I(0);
    for(;(i10<xn7);i10++){
     SetI64(rp7,_JK(cal(rx(f),l2(ati(rx(x),i10),rx(y7)))));
     rp7+=8;
    }
   }
   dx(f);
   dx(x);
   dx(y7);
   return uf(r7);
  }
  break;
  default:return trap(Rank);
  break;
 } 
}
const uf=function(x){
 let rt,xn,xp,i1,t2,r,s,rp,i13,i16,i19,i22,s23
 rt=I(0);
 xn=nn(x);
 xp=_IK(x);
 {
  i1=I(0);
  for(;(i1<xn);i1++){
   t2=tp(_KJ(I64(xp)));
   if(i1==I(0)){
    rt=t2;
   } else {
    if(t2!=rt){
     return x;
    }
   }
   xp+=8;
  }
 }
 if(rt==Dt){
  return ufd(x);
 }
 if((rt==I(0))||(rt>zt)){
  return x;
 }
 rt+=16;
 r=mk(rt,xn);
 s=sz(rt);
 rp=_IK(r);
 xp=_IK(x);
 switch(I(s>>I(2))){
  case 0:{
   i13=I(0);
   for(;(i13<xn);i13++){
    SetI8(rp,I32(xp));
    xp+=8;
    rp++;
   }
  }
  break;
  case 1:{
   i16=I(0);
   for(;(i16<xn);i16++){
    SetI32(rp,I32(xp));
    xp+=8;
    rp+=4;
   }
  }
  break;
  case 2:{
   i19=I(0);
   for(;(i19<xn);i19++){
    SetI64(rp,I64(I32(xp)));
    xp+=8;
    rp+=8;
   }
  }
  break;
  default:{
   i22=I(0);
   for(;(i22<xn);i22++){
    s23=I32(xp);
    SetI64(rp,I64(s23));
    SetI64(I(rp+I(8)),I64(I(s23+I(8))));
    xp+=8;
    rp+=16;
   }
  }
  break;
 } 
 dx(x);
 return r;
}
const ufd=function(x){
 let r,n,xp,i3
 r=Til(x0(x));
 if(tp(r)!=St){
  dx(r);
  return x;
 }
 n=nn(x);
 xp=_IK(x);
 {
  i3=I(0);
  for(;(i3<n);i3++){
   if(match(r,_KJ(I64(_IJ(I64(xp)))))==I(0)){
    dx(r);
    return x;
   }
   xp+=8;
  }
 }
 return key(r,Flp(Ech(K(20n),l1(x))),Tt);
}
const ov0=function(f,x){
 dx(f);
 dx(x);
 return missing(tp(x));
}
const epx=function(f,x,y,n){
 let xt,xp,r,rp,yp,i3,i6
 xt=tp(x);
 xp=_IK(x);
 r=mk(xt,n);
 rp=_IK(r);
 f=I(I(212)+I(I(11)*f));
 yp=_IK(y);
 if(xt==It){
  SetI32(rp,I(_F[f](I32(xp),yp)));
  {
   i3=I(1);
   for(;(i3<n);i3++){
    xp+=4;
    rp+=4;
    SetI32(rp,I(_F[f](I32(xp),I32(I(xp-I(4))))));
   }
  }
 } else {
  f++;
  SetF64(rp,F(_F[f](F64(xp),F64(yp))));
  {
   i6=I(1);
   for(;(i6<n);i6++){
    xp+=8;
    rp+=8;
    SetF64(rp,F(_F[f](F64(xp),F64(I(xp-I(8))))));
   }
  }
 }
 dx(x);
 dx(y);
 return r;
}
const epc=function(f,x,y,n){
 let xt,xp,s,r,rp,i3,i6,i9
 xt=tp(x);
 xp=_IK(x);
 s=sz(xt);
 r=mk(It,n);
 rp=_IK(r);
 f=I(I(188)+I(I(15)*f));
 switch(I(s>>I(2))){
  case 0:{
   SetI32(rp,I(_F[f](I8(xp),_IK(y))));
   {
    i3=I(1);
    for(;(i3<n);i3++){
     xp++;
     rp+=4;
     SetI32(rp,I(_F[f](I8(xp),I8(I(xp-I(1))))));
    }
   }
  }
  break;
  case 1:{
   SetI32(rp,I(_F[f](I32(xp),_IK(y))));
   {
    i6=I(1);
    for(;(i6<n);i6++){
     xp+=4;
     rp+=4;
     SetI32(rp,I(_F[f](I32(xp),I32(I(xp-I(4))))));
    }
   }
  }
  break;
  default:{
   f++;
   SetI32(rp,I(_F[f](F64(xp),F64(_IK(y)))));
   {
    i9=I(1);
    for(;(i9<n);i9++){
     xp+=8;
     rp+=4;
     SetI32(rp,I(_F[f](F64(xp),F64(I(xp-I(8))))));
    }
   }
  }
  break;
 } 
 dx(x);
 dx(y);
 return r;
}
const minit=function(a,b){
 let p,i1
 p=I(I(1)<<a);
 {
  i1=a;
  for(;(i1<b);i1++){
   SetI32(I(I(4)*i1),p);
   SetI32(p,I(0));
   p=I(p*I(2));
  }
 }
 SetI32(I(128),b);
}
const alloc=function(n,s){
 let size,t,i,m,a,j8,u9
 size=I(n*s);
 t=bucket(size);
 if(J(_JI(n)*_JI(s))>J(2147483647n)){
  trap(Grow);
 }
 i=I(I(4)*t);
 m=I(I(4)*I32(I(128)));
 for(;(I32(i)==I(0));)if(i>=m){
  m=I(I(4)*grow(i));
 } else {
  i+=4;
 }
 a=I32(i);
 SetI32(i,I32(a));
 {
  j8=I(i-I(4));
  for(;(j8>=I(I(4)*t));j8=I(j8-I(4))){
   u9=I(a+I(I(1)<<I(j8>>I(2))));
   SetI32(u9,I32(j8));
   SetI32(j8,u9);
  }
 }
 if(I(a&I(31))!=I(0)){
  trap(Unref);
 }
 return a;
}
const grow=function(p){
 let m,n,g
 m=I32(I(128));
 n=I(I(1)+I(p>>I(2)));
 g=I(I(I(1)<<I(n-I(16)))-Memorysize());
 if(g>I(0)){
  if(Memorygrow(g)<I(0)){
   trap(Grow);
  }
 }
 minit(m,n);
 return n;
}
const mfree=function(x,bs){
 let t
 if(I(x&I(31))!=I(0)){
  trap(Unref);
 }
 t=I(I(4)*bs);
 SetI32(x,I32(t));
 SetI32(t,x);
}
const bucket=function(size){
 let r
 r=I(I(32)-I32clz(I(I(15)+size)));
 if(r<I(5)){
  r=I(5);
 }
 return r;
}
const mk=function(t,n){
 let r,x
 if(t<I(17)){
  trap(Value);
 }
 r=K(_KI(t)<<K(59n));
 x=alloc(n,sz(t));
 SetI32(I(x+I(12)),I(1));
 SetI32(I(x+I(4)),n);
 return K(r|_KI(I(x+I(16))));
}
const tp=function(x){
 return _IK(K(x>>K(59n)));
}
const nn=function(x){
 return I32(I(_IK(x)-I(12)));
}
const ep=function(x){
 return I(_IK(x)+I(sz(tp(x))*nn(x)));
}
const sz=function(t){
 if(t<I(16)){
  return I(8);
 } else {
  if(t<I(19)){
   return I(1);
  } else {
   if(t<I(21)){
    return I(4);
   } else {
    if(t==Zt){
     return I(16);
    }
   }
  }
 }
 return I(8);
}
const rx=function(x){
 let p
 if(tp(x)<I(5)){
  return x;
 }
 p=I(_IK(x)-I(4));
 SetI32(p,I(I(1)+I32(p)));
 return x;
}
const dx=function(x){
 let t,p,rc,n6,p8,i13
 t=tp(x);
 if(t<I(5)){
  return ;
 }
 p=I(_IK(x)-I(16));
 rc=I32(I(p+I(12)));
 SetI32(I(p+I(12)),I(rc-I(1)));
 if(rc==I(0)){
  trap(Unref);
 }
 if(rc==I(1)){
  n6=nn(x);
  if(I(t&I(15))>I(6)){
   if(((t==I(14))||(t==I(24)))||(t==I(25))){
    n6=I(2);
   } else {
    if((t==I(12))||(t==I(13))){
     n6=I(3);
    }
   }
   p8=_IK(x);
   {
    i13=I(0);
    for(;(i13<n6);i13++){
     dx(_KJ(I64(p8)));
     p8+=8;
    }
   }
  }
  mfree(p,bucket(I(sz(t)*n6)));
 }
}
const rl=function(x){
 let xp,xn,i1
 xp=_IK(x);
 xn=nn(x);
 {
  i1=I(0);
  for(;(i1<xn);i1++){
   rx(_KJ(I64(xp)));
   xp+=8;
  }
 }
}
const lfree=function(x){
 mfree(I(_IK(x)-I(16)),bucket(I(I(8)*nn(x))));
}
const Cal=function(x,y){
 let xt
 xt=tp(x);
 y=explode(y);
 if(isfunc(xt)!=I(0)){
  return cal(x,y);
 }
 return atdepth(x,y);
}
const isfunc=function(t){
 return I32B(((t==I(0))||((t<I(16))&&(t>tt))));
}
const cal=function(f,x){
 let r,z,t,fp,xn,y15,d22,a22
 r=K(0n);
 z=K(0n);
 t=tp(f);
 fp=_IK(f);
 xn=nn(x);
 if(t<df){
  switch(I(xn-I(1))){
   case 0:x=Fst(x);
   break;
   case 1:{
    r=x1(x);
    x=r0(x);
   }
   break;
   case 2:{
    r=x1(x);
    z=x2(x);
    x=r0(x);
   }
   break;
  }
 }
 if(t!=I(0)){
  t=I(t-I(9));
 }
 switch(t){
  case 0:{
   switch(I(xn-I(1))){
    case 0:r=K(_F[_IK(f)](x));
    break;
    case 1:r=K(_F[I(fp+I(64))](x,r));
    break;
    case 2:r=K(_F[I(fp+I(192))](x,r,K(1n),z));
    break;
    case 3:{
     r=x0(x);
     y15=x1(x);
     z=x2(x);
     r=K(_F[I(fp+I(192))](r,y15,z,r3(x)));
    }
    break;
    default:r=trap(Rank);
    break;
   } 
  }
  break;
  case 1:{
   switch(I(xn-I(1))){
    case 0:r=calltrain(f,x,K(0n));
    break;
    case 1:r=calltrain(f,x,r);
    break;
    default:r=trap(Rank);
    break;
   } 
  }
  break;
  case 2:{
   d22=x0(f);
   a22=I(I(85)+_IJ(I64(I(fp+I(8)))));
   r=K(_F[a22](d22,x));
  }
  break;
  case 3:r=callprj(f,x);
  break;
  case 4:r=lambda(f,x);
  break;
  case 5:r=native(f,x);
  break;
  default:r=trap(Type);
  break;
 } 
 dx(f);
 return r;
}
const calltrain=function(f,x,y){
 let r,n,i4
 r=K(0n);
 n=nn(f);
 r=(y==K(0n))?(cal(x0(f),l1(x))):(cal(x0(f),l2(x,y)));
 {
  i4=I(1);
  for(;(i4<n);i4++)r=cal(x0(K(f+K(8n))),l1(r));
 }
 return r;
}
const callprj=function(f,x){
 let n,fn
 n=nn(x);
 fn=nn(f);
 if(fn!=n){
  if(n<fn){
   rx(f);
   return prj(f,x);
  }
  trap(Rank);
 }
 return Cal(x0(f),stv(x1(f),x2(f),x));
}
const native=function(f,x){
 let fn,xn
 fn=nn(f);
 xn=nn(x);
 if(xn<fn){
  rx(f);
  return prj(f,x);
 }
 if(xn!=fn){
  trap(Rank);
 }
 return _KJ(Native(_JK(x0(f)),_JK(x)));
}
const lambda=function(f,x){
 let fn,xn,fp,c,lo,nl,sa,sp,vp,lp,xp,i5,p6,spp,spe,r,i10,p11
 fn=nn(f);
 xn=nn(x);
 if(xn<fn){
  rx(f);
  return prj(f,x);
 }
 if(xn!=fn){
  trap(Rank);
 }
 fp=_IK(f);
 c=_KJ(I64(fp));
 lo=_KJ(I64(I(fp+I(8))));
 nl=nn(lo);
 sa=mk(It,I(I(2)*nl));
 sp=_IK(sa);
 vp=I32(I(8));
 lp=_IK(lo);
 xp=_IK(x);
 rl(x);
 dx(x);
 {
  i5=I(0);
  for(;(i5<nl);i5++){
   p6=I(vp+I32(lp));
   SetI64(sp,I64(p6));
   if(i5<fn){
    SetI64(p6,I64(xp));
    xp+=8;
   } else {
    SetI64(p6,J(0n));
   }
   sp+=8;
   lp+=4;
  }
 }
 {
  spp=pp;
  spe=pe;
 }
 r=exec(rx(c));
 vp=I32(I(8));
 sp=_IK(sa);
 lp=_IK(lo);
 {
  i10=I(0);
  for(;(i10<nl);i10++){
   p11=I(vp+I32(lp));
   dx(_KJ(I64(p11)));
   SetI64(p11,I64(sp));
   SetI64(sp,J(0n));
   lp+=4;
   sp+=8;
  }
 }
 dx(sa);
 {
  pp=spp;
  pe=spe;
 }
 return r;
}
const com=function(x,y){
 return K(_KI(_IK(l2(y,x)))|K(_KI(cf)<<K(59n)));
}
const prj=function(f,x){
 let r,xn,xp,a,i3,ar,i7,an,y10
 r=K(0n);
 if(isfunc(tp(f))==I(0)){
  return atdepth(f,x);
 }
 xn=nn(x);
 xp=_IK(x);
 a=mk(It,I(0));
 {
  i3=I(0);
  for(;(i3<xn);i3++){
   if(I64(xp)==J(0n)){
    a=cat1(a,Ki(i3));
   }
   xp+=8;
  }
 }
 ar=arity(f);
 {
  i7=xn;
  for(;(i7<ar);i7++){
   a=cat1(a,Ki(i7));
   x=cat1(x,K(0n));
  }
 }
 an=nn(a);
 if(tp(f)==pf){
  r=x1(f);
  y10=x2(f);
  f=r0(f);
  x=stv(r,rx(y10),x);
  a=Drp(a,y10);
 }
 r=l3(f,x,a);
 SetI32(I(_IK(r)-I(12)),an);
 return K(_KI(_IK(r))|K(_KI(pf)<<K(59n)));
}
const arity=function(f){
 let t
 t=tp(f);
 if(t>df){
  return nn(f);
 }
 return I(2);
}
const Cat=function(x,y){
 let xt,yt
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((xt==Tt)&&(yt==Dt)){
  y=Enl(y);
  yt=Tt;
 }
 if(I(xt&I(15))==I(yt&I(15))){
  if(xt<I(16)){
   x=Enl(x);
  }
  return (yt<I(16))?(cat1(x,y)):(ucat(x,y));
 } else {
  if((xt==Lt)&&(yt<I(16))){
   if(nn(x)>I(0)){
    return cat1(x,y);
   }
  }
 }
 x=uf(Cat(explode(x),explode(y)));
 if(nn(x)==I(0)){
  dx(x);
  return mk(I(xt|I(16)),I(0));
 }
 return x;
}
const Enl=function(x){
 let t,r2,rp2,xp2,s2
 t=tp(x);
 if(t<I(7)){
  t+=16;
  r2=mk(t,I(1));
  rp2=_IK(r2);
  xp2=_IK(x);
  s2=sz(t);
  switch(I(s2>>I(2))){
   case 0:SetI8(rp2,xp2);break;
   case 1:SetI32(rp2,xp2);break;
   case 2:SetI64(rp2,I64(xp2));break;
   case 3:{
   }
   break;
   case 4:{
    SetI64(rp2,I64(xp2));
    SetI64(I(rp2+I(8)),I64(I(xp2+I(8))));
   }
   break;
  } 
  dx(x);
  return r2;
 }
 if(t==Dt){
  if(tp(_KJ(I64(_IK(x))))==St){
   return Flp(Ech(K(13n),l1(x)));
  }
 }
 return l1(x);
}
const explode=function(x){
 let r,xt,xn6,xp6,rp6,e6,xn28,k28,rp28,xp28,i29
 r=K(0n);
 xt=tp(x);
 if(xt<I(16)){
  r=l1(x);
 } else {
  if(xt==Dt){
   r=mk(Lt,I(1));
   SetI64(_IK(r),_JK(x));
  } else {
   if(xt<Lt){
    xn6=nn(x);
    r=mk(Lt,xn6);
    if(xn6==I(0)){
     dx(x);
     return r;
    }
    {
     xp6=_IK(x);
     rp6=_IK(r);
    }
    e6=ep(x);
    switch(I(xt-I(18))){
     case 0:do{
      SetI64(rp6,_JK(Kc(I8(xp6))));
      rp6+=8;
      xp6++;
     }while(xp6<e6);
     break;
     case 1:do{
      SetI64(rp6,_JK(Ki(I32(xp6))));
      rp6+=8;
      xp6+=4;
     }while(xp6<e6);
     break;
     case 2:do{
      SetI64(rp6,_JK(Ks(I32(xp6))));
      rp6+=8;
      xp6+=4;
     }while(xp6<e6);
     break;
     case 3:do{
      SetI64(rp6,_JK(Kf(F64(xp6))));
      rp6+=8;
      xp6+=8;
     }while(xp6<e6);
     break;
     default:do{
      SetI64(rp6,_JK(Kz(F64(xp6),F64(I(xp6+I(8))))));
      rp6+=8;
      xp6+=16;
     }while(xp6<e6);
     break;
    } 
    dx(x);
   } else {
    if(xt==Lt){
     r=x;
    } else {
     if(xt==Tt){
      xn28=nn(x);
      k28=x0(x);
      x=r1(x);
      r=mk(Lt,xn28);
      rp28=_IK(r);
      x=Flp(x);
      xp28=_IK(x);
      {
       i29=I(0);
       for(;(i29<xn28);i29++){
        SetI64(rp28,_JK(Key(rx(k28),x0(_KI(xp28)))));
        xp28+=8;
        rp28+=8;
       }
      }
      dx(x);
      dx(k28);
      return r;
     }
    }
   }
  }
 }
 return r;
}
const flat=function(x){
 let r,xn,xp,i1
 r=mk(Lt,I(0));
 xn=nn(x);
 xp=_IK(x);
 {
  i1=I(0);
  for(;(i1<xn);i1++){
   r=Cat(r,x0(_KI(xp)));
   xp+=8;
  }
 }
 dx(x);
 return r;
}
const ucat=function(x,y){
 let xt,xn,yn,r,s
 xt=tp(x);
 if(xt>Lt){
  return dcat(x,y);
 }
 xn=nn(x);
 yn=nn(y);
 r=uspc(x,xt,yn);
 s=sz(xt);
 if(xt==Lt){
  rl(y);
 }
 Memorycopy(I(_IK(r)+I(s*xn)),_IK(y),I(s*yn));
 dx(y);
 return r;
}
const dcat=function(x,y){
 let t,r,q
 t=tp(x);
 if(t==Tt){
  if(match(_KJ(I64(_IK(x))),_KJ(I64(_IK(y))))==I(0)){
   return ucat(explode(x),explode(y));
  }
 }
 r=x0(x);
 x=r1(x);
 q=x0(y);
 y=r1(y);
 if(t==Dt){
  r=Cat(r,q);
  return Key(r,Cat(x,y));
 } else {
  dx(q);
  x=Ech(K(13n),l2(x,y));
  return key(r,x,t);
 }
}
const ucats=function(x){
 let rt,xn,xp,rn,i3,xi4,t4,r,s,rp,i9,xi10
 rt=I(0);
 xn=nn(x);
 if(xn==I(0)){
  return x;
 }
 xp=_IK(x);
 rn=I(0);
 {
  i3=I(0);
  for(;(i3<xn);i3++){
   xi4=_KJ(I64(xp));
   t4=tp(xi4);
   if(i3==I(0)){
    rt=t4;
   }
   if(((rt!=t4)||(rt<I(16)))||(t4>Zt)){
    return K(0n);
   }
   rn=I(rn+nn(xi4));
   xp+=8;
  }
 }
 r=mk(rt,rn);
 s=sz(rt);
 rp=_IK(r);
 xp=_IK(x);
 {
  i9=I(0);
  for(;(i9<xn);i9++){
   xi10=_KJ(I64(xp));
   rn=I(s*nn(xi10));
   Memorycopy(rp,_IK(xi10),rn);
   rp=I(rp+rn);
   xp+=8;
  }
 }
 dx(x);
 return r;
}
const cat1=function(x,y){
 let xt,xn,r,s,rp,yp
 xt=tp(x);
 xn=nn(x);
 r=uspc(x,xt,I(1));
 s=sz(xt);
 rp=I(_IK(r)+I(s*xn));
 yp=_IK(y);
 if(s==I(1)){
  SetI8(rp,yp);
 } else {
  if(s==I(4)){
   SetI32(rp,yp);
  } else {
   if(s==I(8)){
    if(xt==Ft){
     SetI64(rp,I64(yp));
     dx(y);
    } else {
     SetI64(rp,_JK(y));
    }
   } else {
    if(s==I(16)){
     Memorycopy(rp,yp,I(16));
     dx(y);
    }
   }
  }
 }
 return r;
}
const uspc=function(x,xt,ny){
 let r,nx,s
 r=K(0n);
 nx=nn(x);
 s=sz(xt);
 if((I32(I(_IK(x)-I(4)))==I(1))&&(bucket(I(s*nx))==bucket(I(s*I(nx+ny))))){
  r=x;
 } else {
  r=mk(xt,I(nx+ny));
  Memorycopy(_IK(r),_IK(x),I(s*nx));
  if(xt==Lt){
   rl(x);
  }
  dx(x);
 }
 SetI32(I(_IK(r)-I(12)),I(nx+ny));
 return r;
}
const ncat=function(x,y){
 let xt
 xt=tp(x);
 if(xt<I(16)){
  x=Enl(x);
 }
 xt=maxtype(x,y);
 x=uptype(x,xt);
 y=uptype(y,xt);
 return cat1(x,y);
}
const Mtc=function(x,y){
 let r
 r=Ki(match(x,y));
 dx(x);
 dx(y);
 return r;
}
const match=function(x,y){
 let yn,xt,yt,xn6,xp6,yp6,e6,i18,xp,yp
 yn=I(0);
 if(x==y){
  return I(1);
 }
 {
  xt=tp(x);
  yt=tp(y);
 }
 if(xt!=yt){
  return I(0);
 }
 if(xt>I(16)){
  xn6=nn(x);
  yn=nn(y);
  if(xn6!=yn){
   return I(0);
  }
  if(xn6==I(0)){
   return I(1);
  }
  {
   xp6=_IK(x);
   yp6=_IK(y);
  }
  e6=ep(y);
  switch(I(xt-I(18))){
   case 0:return mtC(xp6,yp6,e6);
   break;
   case 1:return mtC(xp6,yp6,e6);
   break;
   case 2:return mtC(xp6,yp6,e6);
   break;
   case 3:return mtF(xp6,yp6,e6);
   break;
   case 4:return mtF(xp6,yp6,e6);
   break;
   case 5:{
    {
     i18=I(0);
     for(;(i18<xn6);i18++){
      if(match(_KJ(I64(xp6)),_KJ(I64(yp6)))==I(0)){
       return I(0);
      }
      xp6+=8;
      yp6+=8;
     }
    }
    return I(1);
   }
   break;
   default:{
    if(match(_KJ(I64(xp6)),_KJ(I64(yp6)))!=I(0)){
     return match(_KJ(I64(I(xp6+I(8)))),_KJ(I64(I(yp6+I(8)))));
    }
    return I(0);
   }
   break;
  } 
 }
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 if(xt<ft){
  return I32B((xp==yp));
 }
 switch(I(I(xt-ft)-I(I(3)*I32B((xt>I(9)))))){
  case 0:return eqf(F64(xp),F64(yp));
  break;
  case 1:return eqz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))));
  break;
  case 2:yn=I(I(8)*nn(y));
  break;
  case 3:yn=I(16);
  break;
  case 4:yn=I(24);
  break;
  case 5:return match(_KJ(I64(I(xp+I(16)))),_KJ(I64(I(yp+I(16)))));
  break;
  default:return I32B((I64(xp)==I64(yp)));
  break;
 } 
 for(;(yn>I(0));){
  yn=I(yn-I(8));
  if(match(_KJ(I64(I(xp+yn))),_KJ(I64(I(yp+yn))))==I(0)){
   return I(0);
  }
 }
 return I(1);
}
const mtC=function(xp,yp,e){
 let ve
 ve=I(e&~I(7));
 for(;(yp<ve);){
  if(I64(xp)!=I64(yp)){
   return I(0);
  }
  xp+=8;
  yp+=8;
 }
 for(;(yp<e);){
  if(I8(xp)!=I8(yp)){
   return I(0);
  }
  xp++;
  yp++;
 }
 return I(1);
}
const mtF=function(xp,yp,e){
 do{
  if(eqf(F64(xp),F64(yp))==I(0)){
   return I(0);
  }
  xp+=8;
  yp+=8;
 }while(yp<e);
 return I(1);
}
const In=function(x,y){
 let xt,yt
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((xt==yt)&&(xt>I(16))){
  return Ecl(K(30n),l2(x,y));
 } else {
  if(I(xt+I(16))!=yt){
   trap(Type);
  }
 }
 dx(y);
 return in_(x,y,xt);
}
const in_=function(x,y,xt){
 let xp,yp,e
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 e=ep(y);
 switch(I(xt-I(2))){
  case 0:e=inC(xp,yp,e);
  break;
  case 1:e=inI(xp,yp,e);
  break;
  case 2:e=inI(xp,yp,e);
  break;
  case 3:{
   dx(x);
   e=inF(F64(xp),yp,e);
  }
  break;
  default:{
   dx(x);
   e=inZ(F64(xp),F64(I(xp+I(8))),yp,e);
  }
  break;
 } 
 return Ki(I32B((e!=I(0))));
}
const inC=function(x,yp,e){
 for(;(yp<e);){
  if(x==I8(yp)){
   return yp;
  }
  yp++;
 }
 return I(0);
}
const inI=function(x,yp,e){
 for(;(yp<e);){
  if(x==I32(yp)){
   return yp;
  }
  yp+=4;
 }
 return I(0);
}
const inF=function(x,yp,e){
 for(;(yp<e);){
  if(eqf(x,F64(yp))!=I(0)){
   return yp;
  }
  yp+=8;
 }
 return I(0);
}
const inZ=function(re,im,yp,e){
 for(;(yp<e);){
  if(eqz(re,im,F64(yp),F64(I(yp+I(8))))!=I(0)){
   return yp;
  }
  yp+=16;
 }
 return I(0);
}
const Not=function(x){
 x=(I(tp(x)&I(15))==st)?(Eql(Ks(I(0)),x)):(Eql(Ki(I(0)),x));
 return x;
}
const trap=function(x){
 let s,a3,i4,b3,i8
 s=src();
 if(srcp==I(0)){
  write(Ku(K(2608n)));
 } else {
  a3=maxi(I(srcp-I(30)),I(0));
  {
   i4=a3;
   for(;(i4<srcp);i4++)if(I8(I(_IK(s)+i4))==I(10)){
    a3=I(I(1)+i4);
   }
  }
  b3=mini(nn(s),I(srcp+I(30)));
  {
   i8=srcp;
   for(;(i8<b3);i8++)if(I8(I(_IK(s)+i8))==I(10)){
    b3=i8;
    break;
   }
  }
  Write(I(0),I(0),I(_IK(s)+a3),I(b3-a3));
  if(srcp>a3){
   write(Cat(Kc(I(10)),ntake(I(I(srcp-a3)-I(1)),Kc(I(32)))));
  }
 }
 write(Ku(K(2654n)));
 panic(x);
 return K(0n);
}
const Srcp=function(){
 return srcp;
}
const quoted=function(x){
 return I32B(((_IK(x)>=I(448))&&(tp(x)==I(0))));
}
const quote=function(x){
 return K(x+K(448n));
}
const unquote=function(x){
 return K(x-K(448n));
}
const exec=function(x){
 let a,b,c,xn,p,e,u4
 srcp=I(0);
 a=K(0n);
 b=K(0n);
 c=K(0n);
 xn=nn(x);
 if(xn==I(0)){
  dx(x);
  return K(0n);
 }
 p=_IK(x);
 e=I(p+I(I(8)*xn));
 do{
  u4=_KJ(I64(p));
  if(tp(u4)!=I(0)){
   push(a);
   a=rx(u4);
  } else {
   switch(I(_IK(u4)>>I(6))){
    case 0:a=K(_F[marksrc(u4)](a));
    break;
    case 1:a=K(_F[marksrc(u4)](a,pop()));
    break;
    case 2:{
     marksrc(a);
     b=pop();
     a=Cal(a,l2(b,pop()));
    }
    break;
    case 3:{
     b=pop();
     c=pop();
     a=K(_F[marksrc(u4)](a,b,c,pop()));
    }
    break;
    case 4:{
     dx(a);
     a=pop();
    }
    break;
    case 5:{
     p=I(p+_IK(a));
     a=pop();
    }
    break;
    case 6:{
     u4=pop();
     p+=_IK(a)*I32B((_IK(u4)==I(0)));
     dx(u4);
     a=pop();
    }
    break;
    default:{
     push(a);
     a=rx(K(u4-K(448n)));
    }
    break;
   }
  }
  p+=8;
 }while(p<e);
 dx(pop());
 dx(x);
 return a;
}
const marksrc=function(x){
 let p1
 {
  p1=I(I(16777215)&_IK(K(x>>K(32n))));
  if(p1!=I(0)){
   srcp=p1;
  }
 }
 return _IK(x);
}
const push=function(x){
 SetI64(sp,_JK(x));
 sp+=8;
 if(sp==I(512)){
  trap(Stack);
 }
}
const pop=function(){
 let r
 sp=I(sp-I(8));
 if(sp<I(256)){
  trap(Stack);
 }
 r=_KJ(I64(sp));
 return r;
}
const lst=function(n){
 let rn,r,rp,i1
 rn=_IK(n);
 r=mk(Lt,rn);
 rp=_IK(r);
 {
  i1=I(0);
  for(;(i1<rn);i1++){
   SetI64(rp,_JK(pop()));
   rp+=8;
  }
 }
 return uf(r);
}
const nul=function(x){
 push(x);
 return K(0n);
}
const lup=function(x){
 let vp,r
 vp=I(I32(I(8))+_IK(x));
 r=x0(_KI(vp));
 return r;
}
const Asn=function(x,y){
 let vp
 if(tp(x)!=st){
  trap(Type);
 }
 vp=I(I32(I(8))+_IK(x));
 dx(_KJ(I64(vp)));
 SetI64(vp,_JK(rx(y)));
 return y;
}
const Amd=function(x,i,v,y){
 let xt,n6,j7,r10,ti,yt
 xt=tp(x);
 if(xt==st){
  return Asn(x,Amd(Val(x),i,v,y));
 }
 if(xt<I(16)){
  trap(Type);
 }
 if(tp(i)==Lt){
  n6=nn(i);
  {
   j7=I(0);
   for(;(j7<n6);j7++)x=Amd(x,ati(rx(i),j7),rx(v),ati(rx(y),j7));
  }
  dx(i);
  dx(v);
  dx(y);
  return x;
 }
 if(xt>Lt){
  r10=x0(x);
  x=r1(x);
  if((xt==Tt)&&(I(tp(i)&I(15))==it)){
   if(tp(y)>Lt){
    y=Val(y);
   }
   return key(r10,Dmd(x,l2(K(0n),i),v,y),xt);
  }
  r10=Unq(Cat(r10,rx(i)));
  return key(r10,Amd(ntake(nn(r10),x),Fnd(rx(r10),i),v,y),xt);
 }
 if(i==K(0n)){
  if(v==K(1n)){
   if(tp(y)<I(16)){
    y=ntake(nn(x),y);
   }
   dx(x);
   return y;
  }
  return Cal(v,l2(x,y));
 }
 if((tp(v)!=I(0))||(v!=K(1n))){
  y=cal(v,l2(Atx(rx(x),rx(i)),y));
 }
 {
  ti=tp(i);
  yt=tp(y);
 }
 if(I(xt&I(15))!=I(yt&I(15))){
  x=explode(x);
  xt=Lt;
 }
 if(ti==it){
  if(xt!=I(yt+I(16))){
   x=explode(x);
  }
  return sti(x,_IK(i),y);
 }
 if(yt<I(16)){
  y=ntake(nn(i),y);
  yt=tp(y);
 }
 if(xt==Lt){
  y=explode(y);
 }
 return stv(x,i,y);
}
const Dmd=function(x,i,v,y){
 let f,n8,t12,j15,rj16
 if(tp(x)==st){
  return Asn(x,Dmd(Val(x),i,v,y));
 }
 i=explode(i);
 f=Fst(rx(i));
 if(nn(i)==I(1)){
  dx(i);
  return Amd(x,f,v,y);
 }
 if(f==K(0n)){
  f=seq(nn(x));
 }
 i=ndrop(I(1),i);
 if(tp(f)>I(16)){
  n8=nn(f);
  if(nn(i)!=I(1)){
   trap(Rank);
  }
  i=Fst(i);
  if((tp(f)==It)&&(tp(x)==Tt)){
   t12=rx(x0(x));
   return key(t12,Dmd(r1(x),l2(Fnd(t12,i),f),v,y),Tt);
  }
  if((tp(f)!=It)||(tp(x)!=Lt)){
   trap(Nyi);
  }
  x=use(x);
  {
   j15=I(0);
   for(;(j15<n8);j15++){
    rj16=I(_IK(x)+I(I(8)*I32(I(_IK(f)+I(I(4)*j15)))));
    SetI64(rj16,_JK(Amd(_KJ(I64(rj16)),rx(i),rx(v),ati(rx(y),j15))));
   }
  }
  dx(f);
  dx(i);
  dx(v);
  dx(y);
  return x;
 }
 x=rx(x);
 return Amd(x,f,K(1n),Dmd(Atx(x,f),i,v,y));
}
const Fnd=function(x,y){
 let r,xt,yt,yn11,rp11,yp19,i20,i23,yi24
 r=K(0n);
 {
  xt=tp(x);
  yt=tp(y);
 }
 if(xt<I(16)){
  return (yt==Tt)?(grp(x,y)):(deal(x,y));
 }
 if(xt>Lt){
  if(xt==Tt){
   trap(Nyi);
  }
  r=x0(x);
  return Atx(r,Fnd(r1(x),y));
 } else {
  if(xt==yt){
   yn11=nn(y);
   if((xt<Ft)&&(yn11>I(2))){
    if(((yn11>I(4))&&(xt==Ct))||(yn11>I(8))){
     r=fndXs(x,y,xt,yn11);
     if(r!=K(0n)){
      return r;
     }
    }
   }
   r=mk(It,yn11);
   rp11=_IK(r);
   if(xt==Lt){
    yp19=_IK(y);
    {
     i20=I(0);
     for(;(i20<yn11);i20++){
      SetI32(rp11,fndl(x,x0(_KI(yp19))));
      rp11+=4;
      yp19+=8;
     }
    }
   } else {
    i23=I(0);
    for(;(i23<yn11);i23++){
     yi24=ati(rx(y),i23);
     SetI32(rp11,fnd(x,yi24,I(xt-I(16))));
     dx(yi24);
     rp11+=4;
    }
   }
  } else {
   if(xt==I(yt+I(16))){
    r=Ki(fnd(x,y,yt));
   } else {
    if(xt==Lt){
     r=Ki(fndl(x,rx(y)));
    } else {
     if(yt==Lt){
      return Ecr(K(18n),l2(x,y));
     } else {
      trap(Type);
     }
    }
   }
  }
 }
 dx(x);
 dx(y);
 return r;
}
const fnd=function(x,y,t){
 let r,xn,xp,yp,xe
 r=I(0);
 xn=nn(x);
 if(xn==I(0)){
  return nai;
 }
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 xe=ep(x);
 switch(I(t-I(2))){
  case 0:r=idxc(yp,xp,xe);
  break;
  case 1:r=idxi(yp,xp,xe);
  break;
  case 2:r=idxi(yp,xp,xe);
  break;
  case 3:r=idxf(F64(yp),xp,xe);
  break;
  default:r=idxz(F64(yp),F64(I(yp+I(8))),xp,xe);
  break;
 } 
 if(r<I(0)){
  return nai;
 }
 return r;
}
const fndXs=function(x,y,t,yn){
 let xn,a,b,r,rp,x0,xp
 xn=nn(x);
 a=_IK(min(K(0n),_IK(x),t,xn));
 b=I(I(1)+I(I(_IK(max(K(0n),_IK(x),t,xn))-a)>>I(I(3)*I32B((t==St)))));
 if((b>I(256))&&(b>yn)){
  return K(0n);
 }
 if(t==St){
  {
   x=Div(Flr(x),Ki(I(8)));
   y=Div(Flr(y),Ki(I(8)));
  }
  a=I(a>>I(3));
 }
 r=ntake(b,Ki(nai));
 rp=I(_IK(r)-I(I(4)*a));
 x0=_IK(x);
 xp=ep(x);
 if(t==Ct){
  for(;(xp>x0);){
   xp=I(xp-I(1));
   SetI32(I(rp+I(I(4)*I8(xp))),I(xp-x0));
  }
 } else {
  for(;(xp>x0);){
   xp=I(xp-I(4));
   SetI32(I(rp+I(I(4)*I32(xp))),I(I(xp-x0)>>I(2)));
  }
 }
 dx(x);
 return Atx(r,Add(Ki(I(-a)),y));
}
const idxc=function(x,p,e){
 let r
 r=inC(x,p,e);
 if(r==I(0)){
  return I(-1);
 }
 return I(r-p);
}
const idxi=function(x,p,e){
 let r
 r=inI(x,p,e);
 if(r==I(0)){
  return I(-1);
 }
 return I(I(r-p)>>I(2));
}
const idxf=function(x,p,e){
 let r
 r=inF(x,p,e);
 if(r==I(0)){
  return I(-1);
 }
 return I(I(r-p)>>I(3));
}
const idxz=function(re,im,p,e){
 let r
 r=inZ(re,im,p,e);
 if(r==I(0)){
  return I(-1);
 }
 return I(I(r-p)>>I(4));
}
const fndl=function(x,y){
 let xn,xp,r
 xn=nn(x);
 xp=_IK(x);
 dx(y);
 r=I(0);
 for(;(r<xn);){
  if(match(_KJ(I64(xp)),y)!=I(0)){
   return r;
  }
  r++;
  xp+=8;
 }
 return nai;
}
const idx=function(x,a,b){
 let i1
 {
  i1=a;
  for(;(i1<b);i1++)if(x==I8(i1)){
   return I(i1-a);
  }
 }
 return I(-1);
}
const Find=function(x,y){
 let xt,yt,xn,yn,r,xp,yp,y0,e
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((xt!=yt)||(xt!=Ct)){
  trap(Type);
 }
 {
  xn=nn(x);
  yn=nn(y);
 }
 if((xn==I(0))||(yn==I(0))){
  dx(x);
  dx(y);
  return mk(It,I(0));
 }
 r=mk(It,I(0));
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 y0=yp;
 e=I(I(I(yp+yn)+I(1))-xn);
 do{
  if(findat(xp,yp,xn)!=I(0)){
   r=cat1(r,Ki(I(yp-y0)));
   yp=I(yp+xn);
  } else {
   yp++;
  }
 }while(yp<e);
 dx(x);
 dx(y);
 return r;
}
const findat=function(xp,yp,n){
 let i1
 {
  i1=I(0);
  do{
   if(I8(I(xp+i1))!=I8(I(yp+i1))){
    return I(0);
   }
   i1++;
  }while(i1<n);
 }
 return I(1);
}
const Atx=function(x,y){
 let r,xt,yt,xp
 r=K(0n);
 {
  xt=tp(x);
  yt=tp(y);
 }
 xp=_IK(x);
 if(xt<I(16)){
  if((xt==I(0))||(xt>tt)){
   return cal(x,l1(y));
  }
  if(xt==st){
   if(xp==I(0)){
    if(yt==it){
     return _KI(_IK(y));
    }
   }
   return cal(Val(sc(cat1(cs(x),Kc(I(46))))),l1(y));
  }
 }
 if((xt>Lt)&&(yt<Lt)){
  r=x0(x);
  x=r1(x);
  if(xt==Tt){
   if(I(yt&I(15))==it){
    return key(r,Ecl(K(19n),l2(x,y)),I(Dt+I32B((yt==It))));
   }
  }
  return Atx(x,Fnd(r,y));
 }
 if(I(yt&I(15))==ft){
  return Rot(x,y);
 }
 if(yt<It){
  y=uptype(y,it);
  yt=tp(y);
 }
 if(yt==It){
  return atv(x,y);
 }
 if((yt==it)&&(xt>I(16))){
  return ati(x,_IK(y));
 }
 if(yt==Lt){
  return Ecr(K(19n),l2(x,y));
 }
 if(yt==Dt){
  r=x0(y);
  return Key(r,Atx(x,r1(y)));
 }
 return trap(Type);
}
const ati=function(x,i){
 let r,t,s,p
 r=K(0n);
 t=tp(x);
 if(t<I(16)){
  return x;
 }
 if(t>Lt){
  return Atx(x,Ki(i));
 }
 if((i<I(0))||(i>=nn(x))){
  dx(x);
  return missing(I(t-I(16)));
 }
 s=sz(t);
 p=I(_IK(x)+I(i*s));
 switch(I(s>>I(2))){
  case 0:r=_KU(_UI(I8(p)));
  break;
  case 1:r=_KU(_UI(I32(p)));
  break;
  case 2:r=_KJ(I64(p));
  break;
  default:{
   dx(x);
   return Kz(F64(p),F64(I(p+I(8))));
  }
  break;
 } 
 if(t==Ft){
  r=Kf(F64reinterpret_i64(r));
 } else {
  if(t==Lt){
   r=rx(r);
   dx(x);
   return r;
  }
 }
 dx(x);
 return K(r|K(_KI(I(t-I(16)))<<K(59n)));
}
const atv=function(x,y){
 let t,yn,xn,r,s,rp,xp,yp,na,i7,xi8,i13,xi14,i19,xi20,i28,xi29
 t=tp(x);
 if(t==Tt){
  return Atx(x,y);
 }
 yn=nn(y);
 if(t<I(16)){
  dx(y);
  return ntake(yn,x);
 }
 xn=nn(x);
 r=mk(t,yn);
 s=sz(t);
 rp=_IK(r);
 xp=_IK(x);
 yp=_IK(y);
 na=missing(I(t-I(16)));
 switch(I(s>>I(2))){
  case 0:{
   i7=I(0);
   for(;(i7<yn);i7++){
    xi8=I32(yp);
    if(_UI(xi8)>=_UI(xn)){
     SetI8(rp,_IK(na));
    } else {
     SetI8(rp,I8(I(xp+xi8)));
    }
    rp++;
    yp+=4;
   }
  }
  break;
  case 1:{
   i13=I(0);
   for(;(i13<yn);i13++){
    xi14=I32(yp);
    if(_UI(xi14)>=_UI(xn)){
     SetI32(rp,_IK(na));
    } else {
     SetI32(rp,I32(I(xp+I(I(4)*xi14))));
    }
    rp+=4;
    yp+=4;
   }
  }
  break;
  case 2:{
   i19=I(0);
   for(;(i19<yn);i19++){
    xi20=I32(yp);
    if(_UI(xi20)>=_UI(xn)){
     if(t==Lt){
      SetI64(rp,_JK(na));
     } else {
      SetI64(rp,I64(_IK(na)));
     }
    } else {
     SetI64(rp,I64(I(xp+I(I(8)*xi20))));
    }
    rp+=8;
    yp+=4;
   }
  }
  break;
  default:{
   i28=I(0);
   for(;(i28<yn);i28++){
    xi29=I32(yp);
    if(_UI(xi29)>=_UI(xn)){
     SetI64(rp,I64(_IK(na)));
     SetI64(I(rp+I(8)),I64(_IK(na)));
    } else {
     xi29=I(xi29*I(16));
     SetI64(rp,I64(I(xp+xi29)));
     SetI64(I(rp+I(8)),I64(I(I(I(8)+xp)+xi29)));
    }
    rp+=16;
    yp+=4;
   }
  }
  break;
 } 
 if(t==Lt){
  rl(r);
  r=uf(r);
 }
 dx(na);
 dx(x);
 dx(y);
 return r;
}
const stv=function(x,i,y){
 let n,xt,xn,s,xp,yp,ip,j7,xi8,j13,j16,j21,j23,j28
 if(It!=tp(i)){
  trap(Type);
 }
 n=nn(i);
 if(n==I(0)){
  dx(y);
  dx(i);
  return x;
 }
 if(n!=nn(y)){
  trap(Length);
 }
 x=use(x);
 xt=tp(x);
 xn=nn(x);
 s=sz(xt);
 xp=_IK(x);
 yp=_IK(y);
 ip=_IK(i);
 {
  j7=I(0);
  for(;(j7<n);j7++){
   xi8=_UI(I32(I(ip+I(I(4)*j7))));
   if(xi8>=_UI(xn)){
    trap(Index);
   }
  }
 }
 switch(I(s>>I(2))){
  case 0:{
   j13=I(0);
   for(;(j13<n);j13++){
    SetI8(I(xp+I32(ip)),I8(yp));
    ip+=4;
    yp++;
   }
  }
  break;
  case 1:{
   j16=I(0);
   for(;(j16<n);j16++){
    SetI32(I(xp+I(I(4)*I32(ip))),I32(yp));
    ip+=4;
    yp+=4;
   }
  }
  break;
  case 2:{
   if(xt==Lt){
    rl(y);
    {
     j21=I(0);
     for(;(j21<n);j21++){
      dx(_KJ(I64(I(xp+I(I(8)*I32(ip))))));
      ip+=4;
     }
    }
    ip=_IK(i);
   }
   {
    j23=I(0);
    for(;(j23<n);j23++){
     SetI64(I(xp+I(I(8)*I32(ip))),I64(yp));
     ip+=4;
     yp+=8;
    }
   }
   if(xt==Lt){
    x=uf(x);
   }
  }
  break;
  default:{
   j28=I(0);
   for(;(j28<n);j28++){
    xp=I(_IK(x)+I(I(16)*I32(ip)));
    SetI64(xp,I64(yp));
    SetI64(I(xp+I(8)),I64(I(yp+I(8))));
    ip+=4;
    yp+=16;
   }
  }
  break;
 } 
 dx(i);
 dx(y);
 return x;
}
const sti=function(x,i,y){
 let xt,xn,s,xp,yp
 x=use(x);
 xt=tp(x);
 xn=nn(x);
 if((i<I(0))||(i>=xn)){
  trap(Index);
 }
 s=sz(xt);
 xp=_IK(x);
 yp=_IK(y);
 switch(I(s>>I(2))){
  case 0:SetI8(I(xp+i),yp);break;
  case 1:SetI32(I(xp+I(I(4)*i)),yp);break;
  case 2:{
   xp+=I(8)*i;
   if(xt==Lt){
    dx(_KJ(I64(xp)));
    SetI64(xp,_JK(rx(y)));
    x=uf(x);
   } else {
    SetI64(xp,I64(yp));
   }
  }
  break;
  default:{
   xp+=I(16)*i;
   SetI64(xp,I64(yp));
   SetI64(I(xp+I(8)),I64(I(yp+I(8))));
  }
  break;
 } 
 dx(y);
 return x;
}
const atdepth=function(x,y){
 let xt,f
 xt=tp(x);
 if(xt<I(16)){
  trap(Type);
 }
 f=Fst(rx(y));
 if(f==K(0n)){
  f=seq(nn(x));
 }
 x=Atx(x,f);
 if(nn(y)==I(1)){
  dx(y);
  return x;
 }
 y=ndrop(I(1),y);
 if(tp(f)>I(16)){
  if((nn(y)==I(1))&&(xt==Tt)){
   return Atx(x,Fst(y));
  }
  return Ecl(K(20n),l2(x,y));
 }
 return atdepth(x,y);
}
const kinit=function(){
 let x,y,z
 minit(I(12),I(16));
 sp=I(256);
 SetI64(I(552),_JK(mk(Ct,I(0))));
 loc=K(0n);
 na=F64reinterpret_i64(K(BigInt("0x7ff8000000000001")));
 inf=F64reinterpret_i64(K(BigInt("0x7ff0000000000000")));
 rand_=I(1592653589);
 SetI64(I(0),_JK(mk(Lt,I(0))));
 SetI64(I(8),_JK(mk(Lt,I(0))));
 sc(Ku(K(0n)));
 x=sc(Ku(K(120n)));
 y=sc(Ku(K(121n)));
 z=sc(Ku(K(122n)));
 xyz=cat1(Cat(x,y),z);
 zk();
}
const Kc=function(x){
 return K(_KU(_UI(x))|K(_KI(ct)<<K(59n)));
}
const Ki=function(x){
 return K(_KU(_UI(x))|K(_KI(it)<<K(59n)));
}
const Ks=function(x){
 return K(_KU(_UI(x))|K(_KI(st)<<K(59n)));
}
const Kf=function(x){
 let r
 r=mk(Ft,I(1));
 SetF64(_IK(r),x);
 return K(_KI(_IK(r))|K(_KI(ft)<<K(59n)));
}
const Kz=function(x,y){
 let r,rp
 r=mk(Zt,I(1));
 rp=_IK(r);
 SetF64(rp,x);
 SetF64(I(rp+I(8)),y);
 return K(_KI(rp)|K(_KI(zt)<<K(59n)));
}
const l1=function(x){
 let r
 r=mk(Lt,I(1));
 SetI64(_IK(r),_JK(x));
 return r;
}
const l2t=function(x,y,t){
 let r
 r=mk(Lt,I(2));
 SetI64(_IK(r),_JK(x));
 SetI64(I(I(8)+_IK(r)),_JK(y));
 return K(_KU(_UK(r))|K(_KI(t)<<K(59n)));
}
const l2=function(x,y){
 return l2t(x,y,Lt);
}
const l3=function(x,y,z){
 return cat1(l2(x,y),z);
}
const r0=function(x){
 let r
 r=x0(x);
 dx(x);
 return r;
}
const r1=function(x){
 let r
 r=x1(x);
 dx(x);
 return r;
}
const r3=function(x){
 let r
 r=x3(x);
 dx(x);
 return r;
}
const x0=function(x){
 return rx(_KJ(I64(_IK(x))));
}
const x1=function(x){
 return x0(K(x+K(8n)));
}
const x2=function(x){
 return x0(K(x+K(16n)));
}
const x3=function(x){
 return x0(K(x+K(24n)));
}
const Ku=function(x){
 let r,p
 r=mk(Ct,I(0));
 p=_IK(r);
 for(;(x!=K(0n));){
  SetI8(p,_IK(x));
  x=K(x>>K(8n));
  p++;
 }
 SetI32(I(_IK(r)-I(12)),I(p-_IK(r)));
 return r;
}
const kx=function(u,x){
 return cal(Val(Ks(u)),l1(x));
}
const kxy=function(u,x,y){
 return cal(Val(Ks(u)),l2(x,y));
}
const sc=function(c){
 let s,sp,sn,i1
 s=_KJ(I64(I(0)));
 sp=_IK(s);
 sn=nn(s);
 {
  i1=I(0);
  for(;(i1<sn);i1++){
   if(match(c,_KJ(I64(sp)))!=I(0)){
    dx(c);
    return K(_KI(I(sp-_IK(s)))|K(_KI(st)<<K(59n)));
   }
   sp+=8;
  }
 }
 SetI64(I(0),_JK(cat1(s,c)));
 SetI64(I(8),_JK(cat1(_KJ(I64(I(8))),K(0n))));
 return K(_KI(I(I(8)*sn))|K(_KI(st)<<K(59n)));
}
const cs=function(x){
 return x0(K(_KI(I32(I(0)))+x));
}
const td=function(x){
 let r,m
 r=x0(x);
 x=r1(x);
 if((tp(r)!=St)||(tp(x)!=Lt)){
  trap(Type);
 }
 m=maxcount(_IK(x),nn(x));
 x=Ech(K(15n),l2(Ki(m),x));
 r=l2(r,x);
 SetI32(I(_IK(r)-I(12)),m);
 return K(_KI(_IK(r))|K(_KI(Tt)<<K(59n)));
}
const missing=function(t){
 switch(I(t-I(2))){
  case 0:return Kc(I(32));
  break;
  case 1:return Ki(nai);
  break;
  case 2:return Ks(I(0));
  break;
  case 3:return Kf(na);
  break;
  case 4:return Kz(na,na);
  break;
  default:return mk(Ct,I(0));
  break;
 } 
}
const hypot=function(p,q){
 let t2
 {
  p=F64abs(p);
  q=F64abs(q);
 }
 if(p<q){
  t2=p;
  p=q;
  q=t2;
 }
 if(p==F(0.)){
  return F(0.);
 }
 q=F(q/p);
 return F(p*F64sqrt(F(F(1.)+F(q*q))));
}
const cosin=function(deg,rp){
 let c,s
 {
  c=F(0.);
  s=F(0.);
 }
 if(deg==F(0.)){
  c=F(1.);
 } else {
  if(deg==F(90.)){
   s=F(1.);
  } else {
   if(deg==F(180.)){
    c=F(-1.);
   } else {
    if(deg==F(270.)){
     s=F(-1.);
    } else {
     cosin_(F(deg*F(0.017453292519943295)),rp,I(0));
     return ;
    }
   }
  }
 }
 SetF64(rp,c);
 SetF64(I(rp+I(8)),s);
}
const ang2=function(y,x){
 let deg
 if(y==F(0.)){
  if(x<F(0.)){
   return F(180.);
  }
  return F(0.);
 }
 if(x==F(0.)){
  if(y<F(0.)){
   return F(270.);
  }
  return F(90.);
 }
 deg=F(F(57.29577951308232)*atan2(y,x));
 if(deg<F(0.)){
  deg=F(deg+F(360.));
 }
 return deg;
}
const cosin_=function(x,rp,csonly){
 let c,s,ss,cs,j,y,z,zz
 {
  c=F(0.);
  s=F(0.);
  ss=I(0);
  cs=I(0);
 }
 if(x<F(0.)){
  x=F(-x);
  ss=I(1);
 }
 j=_KF(F(x*F(1.2732395447351628)));
 y=_FK(j);
 if(K(j&K(1n))==K(1n)){
  j=K(j+K(1n));
  y=F(y+F(1.));
 }
 j=K(j&K(7n));
 z=F(F(F(x-F(y*F(0.7853981256484985)))-F(y*F(3.774894707930798e-08)))-F(y*F(2.6951514290790595e-15)));
 if(j>K(3n)){
  j=K(j-K(4n));
  {
   ss=I(I(1)-ss);
   cs=I(I(1)-cs);
  }
 }
 if(j>K(1n)){
  cs=I(I(1)-cs);
 }
 zz=F(z*z);
 c=F(F(F(1.)-F(F(0.5)*zz))+F(F(zz*zz)*F(F(F(F(F(F(F(F(F(F(F(-1.1358536521387682e-11)*zz)+F(2.087570084197473e-09))*zz)+F(-2.755731417929674e-07))*zz)+F(2.4801587288851704e-05))*zz)+F(-0.0013888888888873056))*zz)+F(0.041666666666666595))));
 s=F(z+F(F(z*zz)*F(F(F(F(F(F(F(F(F(F(F(1.5896230157654656e-10)*zz)+F(-2.5050747762857807e-08))*zz)+F(2.7557313621385722e-06))*zz)+F(-0.0001984126982958954))*zz)+F(0.008333333333322118))*zz)+F(-0.1666666666666663))));
 if((j==K(1n))||(j==K(2n))){
  x=c;
  c=s;
  s=x;
 }
 if(cs!=I(0)){
  c=F(-c);
 }
 if(ss!=I(0)){
  s=F(-s);
 }
 SetF64(rp,c);
 if(csonly==I(0)){
  SetF64(I(rp+I(8)),s);
 } else {
  if(csonly==I(1)){
   SetF64(rp,s);
  }
 }
}
const atan2=function(y,x){
 let q
 q=atan(F(y/x));
 if(x<F(0.)){
  if(q<=F(0.)){
   return F(q+pi);
  }
  return F(q-pi);
 }
 return q;
}
const atan=function(x){
 return (x>F(0.))?(satan(x)):(F(-satan(F(-x))));
}
const satan=function(x){
 if(x<=F(0.66)){
  return xatan(x);
 }
 if(x>F(2.414213562373095)){
  return F(F(F(1.5707963267948966)-xatan(F(F(1.)/x)))+F(6.123233995736766e-17));
 }
 return F(F(F(0.7853981633974483)+xatan(F(F(x-F(1.))/F(x+F(1.)))))+F(F(0.5)*F(6.123233995736766e-17)));
}
const xatan=function(x){
 let z
 z=F(x*x);
 z=F(F(z*F(F(F(F(F(F(F(F(F(-0.8750608600031904)*z)+F(-16.157537187333652))*z)+F(-75.00855792314705))*z)+F(-122.88666844901361))*z)+F(-64.85021904942025)))/F(F(F(F(F(F(F(F(F(z+F(24.858464901423062))*z)+F(165.02700983169885))*z)+F(432.88106049129027))*z)+F(485.3903996359137))*z)+F(194.5506571482614)));
 z=F(F(x*z)+x);
 return z;
}
const exp=function(x){
 let k,hi,lo
 k=J(0n);
 if(x!=x){
  return x;
 }
 if(x>F(709.782712893384)){
  return inf;
 }
 if(x<F(-745.1332191019411)){
  return F(0.);
 }
 if((F(-3.725290298461914e-09)<x)&&(x<F(3.725290298461914e-09))){
  return F(F(1.)+x);
 }
 k=(x<F(0.))?(_JF(F(F(F(1.4426950408889634)*x)-F(0.5)))):(_JF(F(F(F(1.4426950408889634)*x)+F(0.5))));
 hi=F(x-F(_FJ(k)*F(0.6931471803691238)));
 lo=F(_FJ(k)*F(1.9082149292705877e-10));
 return expmulti(hi,lo,k);
}
const expmulti=function(hi,lo,k){
 let r,t,c,y
 r=F(hi-lo);
 t=F(r*r);
 c=F(r-F(t*F(F(0.16666666666666666)+F(t*F(F(-0.0027777777777015593)+F(t*F(F(6.613756321437934e-05)+F(t*F(F(-1.6533902205465252e-06)+F(t*F(4.1381367970572385e-08)))))))))));
 y=F(F(1.)-F(F(lo-F(F(r*c)/F(F(2.)-c)))-hi));
 return ldexp(y,k);
}
const ldexp=function(frac,exp){
 let nf,x,m
 if((((frac==F(0.))||(frac>maxfloat))||(frac<F(-maxfloat)))||(frac!=frac)){
  return frac;
 }
 nf=normalize(frac);
 if(nf!=frac){
  exp=J(exp-J(52n));
  frac=nf;
 }
 x=I64reinterpret_f64(frac);
 exp=J(exp+J(J(_JK(K(x>>K(52n)))&J(2047n))-J(1023n)));
 if(exp<J(-1075n)){
  return F64copysign(F(0.),frac);
 }
 if(exp>J(1023n)){
  if(frac<F(0.)){
   return F(-inf);
  }
  return inf;
 }
 m=F(1.);
 if(exp<J(-1022n)){
  exp=J(exp+J(53n));
  m=F(1.1102230246251565e-16);
 }
 x=K(x&~K(BigInt("0x7ff0000000000000")));
 x=K(x|K(_KJ(J(exp+J(1023n)))<<K(52n)));
 return F(m*F64reinterpret_i64(x));
}
const frexp1=function(f){
 if(f==F(0.)){
  return I(0);
 }
 if(((f<F(-maxfloat))||(f>maxfloat))||(f!=f)){
  return I(0);
 }
 return I(1);
}
const frexp2=function(f){
 let x
 f=normalize(f);
 x=I64reinterpret_f64(f);
 x=K(x&~K(BigInt("0x7ff0000000000000")));
 x=K(x|K(BigInt("0x3fe0000000000000")));
 return F64reinterpret_i64(x);
}
const frexp3=function(f){
 let exp,nf,x
 exp=J(0n);
 nf=normalize(f);
 if(nf!=f){
  exp=J(-52n);
  f=nf;
 }
 x=I64reinterpret_f64(f);
 return J(J(exp+_JK(K(K(x>>K(52n))&K(2047n))))-J(1022n));
}
const normalize=function(x){
 if(F64abs(x)<F(2.2250738585072014e-308)){
  return F(x*F(4.503599627370496e+15));
 }
 return x;
}
const log=function(x){
 let f1,ki,f,k,s,s2,s4,t1,t2,R,hfsq
 if((x!=x)||(x>maxfloat)){
  return x;
 }
 if(x<F(0.)){
  return na;
 }
 if(x==F(0.)){
  return F(-inf);
 }
 f1=x;
 ki=J(0n);
 if(frexp1(x)!=I(0)){
  f1=frexp2(x);
  ki=frexp3(x);
 }
 if(f1<F(0.7071067811865476)){
  f1=F(f1*F(2.));
  ki=J(ki-J(1n));
 }
 f=F(f1-F(1.));
 k=_FJ(ki);
 s=F(f/F(F(2.)+f));
 s2=F(s*s);
 s4=F(s2*s2);
 t1=F(s2*F(F(0.6666666666666735)+F(s4*F(F(0.2857142874366239)+F(s4*F(F(0.1818357216161805)+F(s4*F(0.14798198605116586))))))));
 t2=F(s4*F(F(0.3999999999940942)+F(s4*F(F(0.22222198432149784)+F(s4*F(0.15313837699209373))))));
 R=F(t1+t2);
 hfsq=F(F(F(0.5)*f)*f);
 return F(F(k*F(0.6931471803691238))-F(F(hfsq-F(F(s*F(hfsq+R))+F(k*F(1.9082149292705877e-10))))-f));
}
const modabsfi=function(f){
 let x,e
 if(f<F(1.)){
  return F(0.);
 }
 x=I64reinterpret_f64(f);
 e=K(K(K(x>>K(52n))&K(2047n))-K(1023n));
 if(e<K(52n)){
  x=K(x&~K(K(K(1n)<<K(K(52n)-e))-K(1n)));
 }
 return F64reinterpret_i64(x);
}
const pow=function(x,y){
 let yf,yi,a1,ae,x1,xe,i31
 if((y==F(0.))||(x==F(1.))){
  return F(1.);
 }
 if(y==F(1.)){
  return x;
 }
 if((((x!=x)||(y!=y))||(y>maxfloat))||(y<F(-maxfloat))){
  return na;
 }
 if(x==F(0.)){
  return (y<F(0.))?(inf):(F(0.));
 }
 if(y==F(0.5)){
  return F64sqrt(x);
 }
 if(y==F(-0.5)){
  return F(F(1.)/F64sqrt(x));
 }
 yf=F64abs(y);
 yi=modabsfi(yf);
 yf=F(yf-yi);
 if((yf!=F(0.))&&(x<F(0.))){
  return na;
 }
 if(yi>=F(9.223372036854776e+18)){
  if(x==F(-1.)){
   return F(1.);
  } else {
   return ((F64abs(x)<F(1.))==(y>F(0.)))?(F(0.)):(inf);
  }
 }
 a1=F(1.);
 ae=J(0n);
 if(yf!=F(0.)){
  if(yf>F(0.5)){
   yf=F(yf-F(1.));
   yi=F(yi+F(1.));
  }
  a1=exp(F(yf*log(x)));
 }
 x1=x;
 xe=J(0n);
 if(frexp1(x)!=I(0)){
  x1=frexp2(x);
  xe=frexp3(x);
 }
 {
  i31=_JF(yi);
  for(;(i31!=J(0n));i31=J(i31>>J(1n))){
   if((xe<J(-4096n))||(J(4096n)<xe)){
    ae=J(ae+xe);
    break;
   }
   if(J(i31&J(1n))==J(1n)){
    a1=F(a1*x1);
    ae=J(ae+xe);
   }
   x1=F(x1*x1);
   xe=J(xe<<J(1n));
   if(x1<F(0.5)){
    x1=F(x1+x1);
    xe=J(xe-J(1n));
   }
  }
 }
 if(y<F(0.)){
  a1=F(F(1.)/a1);
  ae=J(-ae);
 }
 return ldexp(a1,ae);
}
const ipow=function(x,y){
 let n2,r2,rp2,xp2,e2
 if(tp(x)==It){
  n2=nn(x);
  r2=mk(It,n2);
  rp2=_IK(r2);
  xp2=_IK(x);
  e2=I(rp2+I(I(4)*n2));
  for(;(rp2<e2);){
   SetI32(rp2,iipow(I32(xp2),y));
   xp2+=4;
   rp2+=4;
  }
  dx(x);
  return r2;
 } else {
  return Ki(iipow(_IK(x),y));
 }
}
const iipow=function(x,y){
 let r
 r=I(1);
 for(;;){
  if(I(y&I(1))==I(1)){
   r=I(r*x);
  }
  y=I(y>>I(1));
  if(y==I(0)){
   break;
  }
  x=I(x*x);
 }
 return r;
}
const Prs=function(x){
 return parse(Tok(x));
}
const parse=function(x){
 let r
 if(tp(x)!=Lt){
  trap(Type);
 }
 pp=_IK(x);
 pe=I(pp+I(I(8)*nn(x)));
 r=es();
 if(pp!=pe){
  trap(Parse);
 }
 lfree(x);
 return r;
}
const es=function(){
 let r,n2,x2
 r=mk(Lt,I(0));
 for(;;){
  n2=next();
  if(n2==K(0n)){
   break;
  }
  if(n2==K(59n)){
   continue;
  }
  pp=I(pp-I(8));
  x2=K(e(t())&~K(1n));
  if(x2==K(0n)){
   break;
  }
  if(nn(r)!=I(0)){
   r=cat1(r,K(256n));
  }
  r=Cat(r,x2);
 }
 return r;
}
const e=function(x){
 let r,xv,xs,y,yv,ev6,a6,ev
 r=K(0n);
 xv=K(x&K(1n));
 x=K(x&~K(1n));
 if(x==K(0n)){
  return K(0n);
 }
 xs=ps;
 y=t();
 yv=K(y&K(1n));
 y=K(y&~K(1n));
 if(y==K(0n)){
  return K(x+xv);
 }
 if((yv!=K(0n))&&(xv==K(0n))){
  r=e(t());
  ev6=K(r&K(1n));
  r=K(r&~K(1n));
  a6=pasn(x,y,r);
  if(a6!=K(0n)){
   return a6;
  }
  if((r==K(0n))||(ev6==K(1n))){
   x=cat1(ucat(cat1(cat1(ucat(l1(K(0n)),x),Ki(I(2))),K(27n)),y),K(92n));
   if(ev6==K(1n)){
    return K(cat1(ucat(r,x),K(91n))+K(1n));
   }
   return K(x+K(1n));
  }
  return dyadic(ucat(r,x),y);
 }
 r=e(K(rx(y)+yv));
 ev=K(r&K(1n));
 r=K(r&~K(1n));
 dx(y);
 if(xv==K(0n)){
  return cat1(ucat(r,x),K(K(83n)|K(_KI(xs)<<K(32n))));
 } else {
  if(((r==y)&&(K(xv+yv)==K(2n)))||(ev==K(1n))){
   return K(cat1(ucat(r,x),K(91n))+K(1n));
  }
 }
 return idiom(monadic(ucat(r,x)));
}
const t=function(){
 let r,verb,rt17,n25,a25,tn25,ks25,p31,s31
 r=next();
 if(r==K(0n)){
  return K(0n);
 }
 if((tp(r)==I(0))&&(_IK(r)<I(127))){
  if(is(_IK(r),I(32))!=I(0)){
   pp=I(pp-I(8));
   return K(0n);
  }
 }
 verb=K(0n);
 if(r==K(40n)){
  r=plist(K(41n));
  r=rlist(K(r&~K(1n)),K(0n));
 } else {
  if(r==K(123n)){
   r=plam(ps);
  } else {
   if(r==K(91n)){
    r=es();
    if(next()!=K(93n)){
     trap(Parse);
    }
    return r;
   } else {
    if(tp(r)==st){
     r=l2(r,K(K(20n)|K(_KI(ps)<<K(32n))));
    } else {
     rt17=tp(r);
     if(rt17==I(0)){
      r=K(quote(r)|K(_KI(ps)<<K(32n)));
      verb=K(1n);
     } else {
      if(rt17==St){
       if(nn(r)==I(1)){
        r=Fst(r);
       }
      }
     }
     r=l1(r);
    }
   }
  }
 }
 for(;;){
  n25=next();
  if(n25==K(0n)){
   break;
  }
  a25=_IK(n25);
  tn25=tp(n25);
  ks25=K(_KI(ps)<<K(32n));
  if(((tn25==I(0))&&(a25>I(20)))&&(a25<I(27))){
   r=cat1(r,n25);
   verb=K(1n);
  } else {
   if(n25==K(91n)){
    verb=K(0n);
    n25=plist(K(93n));
    p31=K(K(84n)+K(K(8n)*K(n25&K(1n))));
    n25=K(n25&~K(1n));
    s31=pspec(r,n25);
    if(s31!=K(0n)){
     return s31;
    }
    if(nn(n25)==I(1)){
     r=cat1(ucat(Fst(n25),r),K(K(83n)|ks25));
    } else {
     n25=rlist(n25,K(2n));
     r=cat1(Cat(n25,r),K(p31|ks25));
    }
   } else {
    pp=I(pp-I(8));
    break;
   }
  }
 }
 return K(r+verb);
}
const pasn=function(x,y,r){
 let l,v,sp,xn2,s4,lp4,s10
 l=_KJ(I64(_IK(y)));
 v=_IK(l);
 sp=I(I(16777215)&_IK(K(l>>K(32n))));
 if((((nn(y)==I(1))&&(tp(l)==I(0)))&&(v==I(449)))||((v>I(544))&&(v<I(565)))){
  dx(y);
  xn2=nn(x);
  if(xn2>I(2)){
   if(v>I(544)){
    l=K(l-K(96n));
   }
   s4=ati(rx(x),I(xn2-I(3)));
   lp4=K(K(BigInt("0xff000000ffffffff"))&lastp(x));
   if(lp4==K(92n)){
    lp4=K(84n);
   }
   x=cat1(cat1(ucat(l1(l),ldrop(I(-2),x)),K(20n)),K(K(_KI(sp)<<K(32n))|K(lp4+K(128n))));
   y=l2(s4,K(448n));
  } else {
   if((v==I(449))||(v==I(545))){
    s10=Fst(x);
    if((loc!=K(0n))&&(v==I(449))){
     loc=Cat(loc,rx(s10));
    }
    x=l1(s10);
    y=l1(K(448n));
   } else {
    y=cat1(l2(unquote(K(l-K(32n))),Fst(rx(x))),K(448n));
   }
  }
  return dyadic(ucat(r,x),y);
 }
 return K(0n);
}
const plam=function(s0){
 let r,slo,ar,n,n2,ln2,c,cn,cp,i12,y15,i,s
 r=K(0n);
 slo=loc;
 loc=K(0n);
 ar=I(-1);
 n=next();
 if(n==K(91n)){
  n2=K(plist(K(93n))&~K(1n));
  ln2=nn(n2);
  loc=Ech(K(4n),l1(n2));
  if((ln2>I(0))&&(tp(loc)!=St)){
   trap(Parse);
  }
  ar=nn(loc);
  if(ar==I(0)){
   dx(loc);
   loc=mk(St,I(0));
  }
 } else {
  pp=I(pp-I(8));
  loc=mk(St,I(0));
 }
 c=es();
 n=next();
 if(n!=K(125n)){
  trap(Parse);
 }
 cn=nn(c);
 cp=_IK(c);
 if(ar<I(0)){
  ar=I(0);
  {
   i12=I(0);
   for(;(i12<cn);i12++){
    r=_KJ(I64(cp));
    if((tp(r)==I(0))&&(_IK(r)==I(20))){
     r=_KJ(I64(I(cp-I(8))));
     y15=I(_IK(r)>>I(3));
     if(((tp(r)==st)&&(y15>I(0)))&&(y15<I(4))){
      ar=maxi(ar,y15);
     }
    }
    cp+=8;
   }
  }
  loc=Cat(ntake(ar,rx(xyz)),loc);
 }
 i=Add(seq(I(I(I(1)+ps)-s0)),Ki(I(s0-I(1))));
 s=atv(rx(src()),i);
 r=l3(c,Unq(loc),s);
 loc=slo;
 return l1(slam(r,ar,s0));
}
const slam=function(r,ar,s0){
 let rp
 rp=_IK(r);
 SetI32(I(rp-I(12)),ar);
 return K(K(_KI(rp)|K(_KI(s0)<<K(32n)))|K(_KI(lf)<<K(59n)));
}
const pspec=function(r,n){
 let ln,v
 ln=nn(n);
 v=_KJ(I64(_IK(r)));
 if((nn(r)==I(1))&&(ln>I(2))){
  if((tp(v)==I(0))&&(_IK(v)==I(465))){
   dx(r);
   return cond(n,ln);
  }
 }
 if(((nn(r)==I(2))&&(ln>I(1)))&&(_IK(v)==I(64))){
  dx(r);
  return whl(n,I(ln-I(1)));
 }
 return K(0n);
}
const whl=function(x,xn){
 let r,p,xp,sum,i1,y2
 r=cat1(Fst(rx(x)),K(0n));
 p=I(nn(r)-I(1));
 r=cat1(r,K(384n));
 r=cat1(r,K(256n));
 xp=_IK(x);
 sum=I(2);
 {
  i1=I(0);
  for(;(i1<xn);i1++){
   if(i1!=I(0)){
    r=cat1(r,K(256n));
   }
   xp+=8;
   y2=x0(_KI(xp));
   sum+=I(1)+nn(y2);
   r=ucat(r,y2);
  }
 }
 r=cat1(cat1(r,Ki(I(I(-8)*I(I(2)+nn(r))))),K(320n));
 SetI64(I(_IK(r)+I(I(8)*p)),_JK(Ki(I(I(8)*sum))));
 dx(x);
 return ucat(l1(K(0n)),r);
}
const cond=function(x,xn){
 let nxt,sum,xp,state,r2
 nxt=I(0);
 sum=I(0);
 xp=I(_IK(x)+I(I(8)*xn));
 state=I(1);
 for(;(xp!=_IK(x));){
  xp=I(xp-I(8));
  r2=_KJ(I64(xp));
  if(sum>I(0)){
   state=I(I(1)-state);
   r2=(state!=I(0))?(cat1(cat1(r2,Ki(nxt)),K(384n))):(cat1(cat1(r2,Ki(sum)),K(320n)));
   SetI64(xp,_JK(r2));
  }
  nxt=I(I(8)*nn(r2));
  sum=I(sum+nxt);
 }
 return flat(x);
}
const plist=function(c){
 let p,r,n,b2,x2
 p=K(0n);
 r=mk(Lt,I(0));
 n=I(0);
 for(;;){
  b2=next();
  if((b2==K(0n))||(b2==c)){
   break;
  }
  if(n==I(0)){
   pp=I(pp-I(8));
  }
  if((n!=I(0))&&(b2!=K(59n))){
   trap(Parse);
  }
  n++;
  x2=K(e(t())&~K(1n));
  if(x2==K(0n)){
   p=K(1n);
  }
  r=cat1(r,x2);
 }
 return K(r+p);
}
const rlist=function(x,p){
 let n
 n=nn(x);
 if(n==I(0)){
  return l1(x);
 }
 if(n==I(1)){
  return Fst(x);
 }
 if(p!=K(2n)){
  p=clist(x,n);
  if(p!=K(0n)){
   return l1(p);
  }
 }
 return cat1(cat1(flat(Rev(x)),Ki(n)),K(27n));
}
const clist=function(x,n){
 let p,i1,xi2,t2
 p=_IK(x);
 {
  i1=I(0);
  for(;(i1<n);i1++){
   xi2=_KJ(I64(p));
   t2=tp(xi2);
   if(t2!=Lt){
    return K(0n);
   }
   if(nn(xi2)!=I(1)){
    return K(0n);
   }
   if(tp(_KJ(I64(_IK(xi2))))==I(0)){
    return K(0n);
   }
   p+=8;
  }
 }
 return uf(flat(x));
}
const next=function(){
 let r
 if(pp==pe){
  return K(0n);
 }
 r=_KJ(I64(pp));
 ps=I(I(16777215)&_IK(K(r>>K(32n))));
 r=K(r&~K(K(16777215n)<<K(32n)));
 pp+=8;
 return r;
}
const lastp=function(x){
 return _KJ(I64(I(_IK(x)+I(I(8)*I(nn(x)-I(1))))));
}
const dyadic=function(x,y){
 let l
 l=lastp(y);
 if(quoted(l)!=I(0)){
  return cat1(ucat(x,ldrop(I(-1),y)),K(K(64n)+unquote(l)));
 }
 return cat1(ucat(x,y),K(128n));
}
const monadic=function(x){
 let l,r2
 l=lastp(x);
 if(quoted(l)!=I(0)){
  r2=cat1(ldrop(I(-1),x),unquote(l));
  return (_IK(l)==I(449))?(cat1(cat1(r2,Ki(I(1048576))),K(320n))):(r2);
 }
 return cat1(x,K(83n));
}
const ldrop=function(n,x){
 return explode(ndrop(n,x));
}
const svrb=function(p){
 let x
 x=_KJ(I64(p));
 return I(I32B(((_IK(x)<I(64))&&(tp(x)==I(0))))*_IK(x));
}
const idiom=function(x){
 let l,i
 l=I(_IK(x)+I(I(8)*I(nn(x)-I(2))));
 i=I(svrb(l)+I(svrb(I(l+I(8)))<<I(6)));
 if((i==I(262))||(i==I(263))){
  i=I(34);
 } else {
  if(i==I(1166)){
   i=I(23);
  } else {
   return x;
  }
 }
 SetI64(l,J(I64(l)+_JI(i)));
 return ndrop(I(-1),x);
}
const rnd=function(){
 let r
 r=rand_;
 r=I(r^I(r<<I(13)));
 r=I(r^I(r>>I(17)));
 r=I(r^I(r<<I(5)));
 rand_=r;
 return r;
}
const roll=function(x){
 let xt,xp,r5
 xt=tp(x);
 xp=_IK(x);
 if(xt==it){
  if(xp>I(0)){
   return kx(I(72),x);
  } else {
   r5=kx(I(80),Ki(I(I(I(1)+I(-xp))/I(2))));
   SetI32(I(_IK(r5)-I(12)),I(-xp));
   return K(_KI(_IK(r5))|K(_KI(Ft)<<K(59n)));
  }
 }
 if(xt==zt){
  dx(x);
  return kx(I(80),Ki(_IF(F64floor(F64(xp)))));
 }
 return trap(Type);
}
const deal=function(x,y){
 let xp,yt,yn4,yp
 if(tp(x)!=it){
  trap(Type);
 }
 xp=_IK(x);
 yt=tp(y);
 if(yt>I(16)){
  yn4=nn(y);
  if(xp<I(0)){
   xp=I(-xp);
   return (xp>=yn4)?(atv(y,shuffle(seq(xp),yn4))):(atv(y,deal(x,Ki(yn4))));
  } else {
   return atv(y,randI(nn(y),xp));
  }
 }
 if(yt==ct){
  return Add(Kc(I(97)),Flr(deal(x,Ki(I(_IK(y)-I(96))))));
 }
 if(yt==st){
  return Ech(K(17n),l2(Ks(I(0)),deal(x,Fst(cs(y)))));
 }
 if(yt!=it){
  trap(Type);
 }
 yp=_IK(y);
 if(xp>I(0)){
  return randI(yp,xp);
 }
 return ntake(I(-xp),shuffle(seq(yp),I(-xp)));
}
const randi=function(n){
 let v,prod,low,thresh2
 v=_UI(rnd());
 prod=K(_KU(v)*_KI(n));
 low=_UK(prod);
 if(low<_UI(n)){
  thresh2=U(_UI(I(-n))%_UI(n));
  for(;(low<thresh2);){
   v=_UI(rnd());
   prod=K(_KU(v)*_KI(n));
   low=_UK(prod);
  }
 }
 return _IK(K(prod>>K(32n)));
}
const randI=function(i,n){
 let r,rp,e
 r=mk(It,n);
 rp=_IK(r);
 e=I(rp+I(I(4)*n));
 if(i==I(0)){
  for(;(rp<e);){
   SetI32(rp,rnd());
   rp+=4;
  }
 } else {
  for(;(rp<e);){
   SetI32(rp,randi(i));
   rp+=4;
  }
 }
 return r;
}
const shuffle=function(r,m){
 let rp,n,i1,ii2,j2,t2
 rp=_IK(r);
 n=nn(r);
 m=mini(I(n-I(1)),m);
 {
  i1=I(0);
  for(;(i1<m);i1++){
   ii2=I(i1+randi(I(n-i1)));
   j2=I(rp+I(I(4)*I(ii2-i1)));
   t2=I32(rp);
   SetI32(rp,I32(j2));
   SetI32(j2,t2);
   rp+=4;
  }
 }
 return r;
}
const rd0=function(x,yp,t,n){
 return K(0n);
}
const min=function(x,yp,t,n){
 let xp,i5,i10,i15,f17,i20
 xp=_IK(x);
 switch(I(t-I(18))){
  case 0:{
   if(x==K(0n)){
    xp=I(127);
   }
   {
    i5=I(0);
    for(;(i5<n);i5++)xp=mini(xp,I8(I(yp+i5)));
   }
   return Kc(xp);
  }
  break;
  case 1:{
   if(x==K(0n)){
    xp=I(2147483647);
   }
   {
    i10=I(0);
    for(;(i10<n);i10++){
     xp=mini(xp,I32(yp));
     yp+=4;
    }
   }
   return Ki(xp);
  }
  break;
  case 2:{
   if(x==K(0n)){
    xp=I(I(nn(_KJ(I64(I(8))))<<I(3))-I(8));
   }
   {
    i15=I(0);
    for(;(i15<n);i15++){
     xp=mini(xp,I32(yp));
     yp+=4;
    }
   }
   return Ks(xp);
  }
  break;
  case 3:{
   f17=F64(xp);
   if(x==K(0n)){
    f17=F64reinterpret_i64(K(BigInt("0x7ff0000000000000")));
   }
   {
    i20=I(0);
    for(;(i20<n);i20++){
     f17=F64min(f17,F64(yp));
     yp+=8;
    }
   }
   return Kf(f17);
  }
  break;
  default:return K(0n);
  break;
 } 
}
const max=function(x,yp,t,n){
 let xp,i5,i10,i13,f15,i18
 xp=_IK(x);
 switch(I(t-I(18))){
  case 0:{
   if(x==K(0n)){
    xp=I(-128);
   }
   {
    i5=I(0);
    for(;(i5<n);i5++)xp=maxi(xp,I8(I(yp+i5)));
   }
   return Kc(xp);
  }
  break;
  case 1:{
   if(x==K(0n)){
    xp=nai;
   }
   {
    i10=I(0);
    for(;(i10<n);i10++){
     xp=maxi(xp,I32(yp));
     yp+=4;
    }
   }
   return Ki(xp);
  }
  break;
  case 2:{
   {
    i13=I(0);
    for(;(i13<n);i13++){
     xp=maxi(xp,I32(yp));
     yp+=4;
    }
   }
   return Ks(xp);
  }
  break;
  case 3:{
   f15=F64(xp);
   if(x==K(0n)){
    f15=F64reinterpret_i64(K(BigInt("0xfff0000000000000")));
   }
   {
    i18=I(0);
    for(;(i18<n);i18++){
     f15=F64max(f15,F64(yp));
     yp+=8;
    }
   }
   return Kf(f15);
  }
  break;
  default:return K(0n);
  break;
 } 
}
const sum=function(x,yp,t,n){
 let xp,i3,f7,re10,im10
 xp=_IK(x);
 switch(I(t-I(18))){
  case 0:{
   {
    i3=I(0);
    for(;(i3<n);i3++)xp=I(xp+I8(I(yp+i3)));
   }
   return Kc(xp);
  }
  break;
  case 1:return Ki(I(xp+sumi(yp,n)));
  break;
  case 2:return K(0n);
  break;
  case 3:{
   f7=F64(xp);
   if(x==K(0n)){
    f7=F(0.);
   }
   return Kf(F(f7+sumf(yp,n,I(8))));
  }
  break;
  case 4:{
   re10=F(0.);
   im10=F(0.);
   if(x!=K(0n)){
    re10=F64(xp);
    im10=F64(I(xp+I(8)));
   }
   return Kz(F(re10+sumf(yp,n,I(16))),F(im10+sumf(I(yp+I(8)),n,I(16))));
  }
  break;
  default:return K(0n);
  break;
 } 
}
const sumf=function(xp,n,s){
 let r,i3,m
 r=F(0.);
 if(n<I(128)){
  {
   i3=I(0);
   for(;(i3<n);i3++){
    r=F(r+F64(xp));
    xp=I(xp+s);
   }
  }
  return r;
 }
 m=I(n/I(2));
 return F(sumf(xp,m,s)+sumf(I(xp+I(s*m)),I(n-m),s));
}
const prd=function(x,yp,t,n){
 let xp,i5,i10,f13,i16
 xp=_IK(x);
 switch(I(t-I(18))){
  case 0:{
   if(x==K(0n)){
    xp=I(1);
   }
   {
    i5=I(0);
    for(;(i5<n);i5++)xp=I(xp*I8(I(yp+i5)));
   }
   return Kc(xp);
  }
  break;
  case 1:{
   if(x==K(0n)){
    xp=I(1);
   }
   {
    i10=I(0);
    for(;(i10<n);i10++){
     xp=I(xp*I32(yp));
     yp+=4;
    }
   }
   return Ki(xp);
  }
  break;
  case 2:return K(0n);
  break;
  case 3:{
   f13=F64(xp);
   if(x==K(0n)){
    f13=F(1.);
   }
   {
    i16=I(0);
    for(;(i16<n);i16++){
     f13=F(f13*F64(yp));
     yp+=8;
    }
   }
   return Kf(f13);
  }
  break;
  default:return K(0n);
  break;
 } 
}
const sums=function(x,yp,t,n){
 let r,rp,s,e
 if(t!=It){
  return K(0n);
 }
 r=mk(It,n);
 rp=_IK(r);
 s=_IK(x);
 e=I(yp+I(I(4)*n));
 do{
  s=I(s+I32(yp));
  SetI32(rp,s);
  rp+=4;
  yp+=4;
 }while(yp<e);
 return r;
}
const prds=function(x,yp,t,n){
 let r,rp,s,e
 if(t!=It){
  return K(0n);
 }
 r=mk(It,n);
 rp=_IK(r);
 s=_IK(x);
 if(x==K(0n)){
  s=I(1);
 }
 e=I(yp+I(I(4)*n));
 do{
  s=I(s*I32(yp));
  SetI32(rp,s);
  rp+=4;
  yp+=4;
 }while(yp<e);
 return r;
}
const Neg=function(x){
 return nm(I(220),x);
}
const negi=function(x){
 return I(-x);
}
const negf=function(x){
 return F(-x);
}
const negz=function(x,y){
 return Kz(F(-x),F(-y));
}
const negC=function(xp,rp,e){
 do{
  SetI8(rp,I(-I8(xp)));
  xp++;
  rp++;
 }while(rp<e);
}
const negI=function(xp,rp,e){
 do{
  SetI32(rp,I(-I32(xp)));
  xp+=4;
  rp+=4;
 }while(rp<e);
}
const negF=function(xp,rp,e){
 do{
  SetF64(rp,F(-F64(xp)));
  xp+=8;
  rp+=8;
 }while(rp<e);
}
const negZ=function(xp,rp,e){
 negF(xp,rp,e);
}
const Abs=function(x){
 let xt,xp4
 xt=tp(x);
 if(xt>Zt){
  return Ech(K(32n),l1(x));
 }
 if(xt==zt){
  xp4=_IK(x);
  dx(x);
  return Kf(hypot(F64(xp4),F64(I(xp4+I(8)))));
 } else {
  if(xt==Zt){
   return absZ(x);
  }
 }
 return nm(I(227),x);
}
const absi=function(x){
 if(x<I(0)){
  return I(-x);
 }
 return x;
}
const absf=function(x){
 return F64abs(x);
}
const absC=function(xp,rp,e){
 do{
  SetI8(rp,absi(I8(xp)));
  xp++;
  rp++;
 }while(rp<e);
}
const absI=function(xp,rp,e){
 do{
  SetI32(rp,absi(I32(xp)));
  xp+=4;
  rp+=4;
 }while(rp<e);
}
const absF=function(xp,rp,e){
 do{
  SetF64(rp,F64abs(F64(xp)));
  xp+=8;
  rp+=8;
 }while(rp<e);
}
const absZ=function(x){
 let n,r,rp,xp,i1
 n=nn(x);
 r=mk(Ft,n);
 rp=_IK(r);
 xp=_IK(x);
 {
  i1=I(0);
  do{
   SetF64(rp,hypot(F64(xp),F64(I(xp+I(8)))));
   xp+=16;
   rp+=8;
   i1++;
  }while(i1<n);
 }
 dx(x);
 return r;
}
const Sqr=function(x){
 if(I(tp(x)&I(15))!=ft){
  x=Add(Kf(F(0.)),x);
 }
 return nm(I(300),x);
}
const sqrf=function(x){
 return F64sqrt(x);
}
const sqrF=function(xp,rp,e){
 do{
  SetF64(rp,F64sqrt(F64(xp)));
  xp+=8;
  rp+=8;
 }while(rp<e);
}
const Hyp=function(x,y){
 let xt,yt,xp6,yp6
 xt=tp(x);
 yt=tp(y);
 if((xt>Zt)||(yt>Zt)){
  return Ech(K(32n),l2(x,y));
 }
 if(xt==zt){
  x=Abs(x);
  xt=ft;
 }
 if(xt==ft){
  xp6=_IK(x);
  yp6=_IK(y);
  dx(x);
  dx(y);
  if(yt==ft){
   return Kf(hypot(F64(xp6),F64(yp6)));
  } else {
   if(yt==zt){
    return Kf(hypot(F64(xp6),hypot(F64(yp6),F64(I(yp6+I(8))))));
   }
  }
 }
 return trap(Nyi);
}
const Img=function(x){
 let xt,xp4,n4,r4,rp4,e4
 xt=tp(x);
 if(xt>Zt){
  return Ech(K(33n),l1(x));
 }
 if(xt==Zt){
  xp4=I(I(8)+_IK(x));
  n4=nn(x);
  r4=mk(Ft,n4);
  rp4=_IK(r4);
  e4=I(rp4+I(I(8)*n4));
  for(;(rp4<e4);){
   SetI64(rp4,I64(xp4));
   xp4+=16;
   rp4+=8;
  }
  dx(x);
  return r4;
 }
 dx(x);
 if(xt==zt){
  return Kf(F64(I(_IK(x)+I(8))));
 }
 return (xt<zt)?(Kf(F(0.))):(ntake(nn(x),Kf(F(0.))));
}
const Cpx=function(x,y){
 return Add(x,Mul(Kz(F(0.),F(1.)),y));
}
const Cnj=function(x){
 let xt,xp,e
 xt=tp(x);
 if(xt>Zt){
  return Ech(K(34n),l1(x));
 }
 if(I(xt&I(15))<zt){
  return x;
 }
 xt=tp(x);
 xp=_IK(x);
 if(xt==zt){
  dx(x);
  return Kz(F64(xp),F(-F64(I(xp+I(8)))));
 }
 x=use(x);
 xp=I(I(8)+_IK(x));
 e=I(xp+I(I(16)*nn(x)));
 for(;(xp<e);){
  SetF64(xp,F(-F64(xp)));
  xp+=16;
 }
 return x;
}
const Add=function(x,y){
 if(tp(y)<I(16)){
  return nd(I(234),I(2),y,x);
 }
 return nd(I(234),I(2),x,y);
}
const addi=function(x,y){
 return I(x+y);
}
const addf=function(x,y){
 return F(x+y);
}
const addz=function(xr,xi,yr,yi,rp){
 SetF64(rp,F(xr+yr));
 SetF64(I(rp+I(8)),F(xi+yi));
}
const addcC=function(x,yp,rp,e){
 do{
  SetI8(rp,I(x+I8(yp)));
  yp++;
  rp++;
 }while(rp<e);
}
const addiI=function(x,yp,rp,e){
 do{
  SetI32(rp,I(x+I32(yp)));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const addfF=function(x,yp,rp,e){
 do{
  SetF64(rp,F(x+F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const addzZ=function(re,im,yp,rp,e){
 do{
  SetF64(rp,F(re+F64(yp)));
  SetF64(I(rp+I(8)),F(im+F64(I(yp+I(8)))));
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const addC=function(xp,yp,rp,e){
 do{
  SetI8(rp,I(I8(xp)+I8(yp)));
  xp++;
  yp++;
  rp++;
 }while(rp<e);
}
const addI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I(I32(xp)+I32(yp)));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const addF=function(xp,yp,rp,e){
 do{
  SetF64(rp,F(F64(xp)+F64(yp)));
  xp+=8;
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const Sub=function(x,y){
 if(tp(y)<I(16)){
  return nd(I(234),I(2),Neg(y),x);
 }
 return nd(I(245),I(3),x,y);
}
const subi=function(x,y){
 return I(x-y);
}
const subf=function(x,y){
 return F(x-y);
}
const subcC=function(x,yp,rp,e){
 do{
  SetI8(rp,I(x-I8(yp)));
  yp++;
  rp++;
 }while(rp<e);
}
const subiI=function(x,yp,rp,e){
 do{
  SetI32(rp,I(x-I8(yp)));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const subfF=function(x,yp,rp,e){
 do{
  SetF64(rp,F(x-F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const subzZ=function(re,im,yp,rp,e){
 do{
  SetF64(rp,F(re-F64(yp)));
  SetF64(I(rp+I(8)),F(im-F64(I(yp+I(8)))));
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const subC=function(xp,yp,rp,e){
 do{
  SetI8(rp,I(I8(xp)-I8(yp)));
  xp++;
  yp++;
  rp++;
 }while(rp<e);
}
const subI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I(I32(xp)-I32(yp)));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const subF=function(xp,yp,rp,e){
 do{
  SetF64(rp,F(F64(xp)-F64(yp)));
  xp+=8;
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const Mul=function(x,y){
 let xt,yt
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((xt<zt)&&(yt==Zt)){
  return scalez(x,y);
 }
 if((yt<zt)&&(xt==Zt)){
  return scalez(y,x);
 }
 if(yt<I(16)){
  return nd(I(256),I(4),y,x);
 }
 return nd(I(256),I(4),x,y);
}
const muli=function(x,y){
 return I(x*y);
}
const mulf=function(x,y){
 return F(x*y);
}
const mulz=function(xr,xi,yr,yi,rp){
 SetF64(rp,F(F(xr*yr)-F(xi*yi)));
 SetF64(I(rp+I(8)),F(F(xr*yi)+F(xi*yr)));
}
const mulcC=function(x,yp,rp,e){
 do{
  SetI8(rp,I(x*I8(yp)));
  yp++;
  rp++;
 }while(rp<e);
}
const muliI=function(x,yp,rp,e){
 do{
  SetI32(rp,I(x*I32(yp)));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const mulfF=function(x,yp,rp,e){
 do{
  SetF64(rp,F(x*F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const mulzZ=function(re,im,yp,rp,e){
 do{
  mulz(re,im,F64(yp),F64(I(yp+I(8))),rp);
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const mulC=function(xp,yp,rp,e){
 do{
  SetI8(rp,I(I8(xp)*I8(yp)));
  xp++;
  yp++;
  rp++;
 }while(rp<e);
}
const mulI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I(I32(xp)*I32(yp)));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const mulF=function(xp,yp,rp,e){
 do{
  SetF64(rp,F(F64(xp)*F64(yp)));
  xp+=8;
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const mulZ=function(xp,yp,rp,e){
 do{
  mulz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))),rp);
  xp+=16;
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const scale=function(s,x){
 let r,e,xp,rp
 if(tp(x)<Ft){
  x=uptype(x,ft);
 }
 r=use1(x);
 if(nn(r)==I(0)){
  dx(x);
  return r;
 }
 e=ep(r);
 {
  xp=_IK(x);
  rp=_IK(r);
 }
 mulfF(s,xp,rp,e);
 dx(x);
 return r;
}
const scalez=function(x,z){
 let s
 if(tp(x)<ft){
  x=uptype(x,ft);
 }
 s=F64(_IK(x));
 dx(x);
 return scale(s,z);
}
const Mod=function(x,y){
 let xt,yt
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((I(xt&I(15))<ft)&&(I(yt&I(15))<ft)){
  return idiv(x,y,I(1));
 }
 return ((xt>=Lt)||(yt>=Lt))?(nd(I(0),I(41),x,y)):(trap(Type));
}
const Div=function(x,y){
 let xt,yt,s4
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((I(xt&I(15))<ft)&&(I(yt&I(15))<ft)){
  return idiv(x,y,I(0));
 }
 if(((yt<I(16))&&(xt>I(16)))&&(xt<Lt)){
  if(yt<ft){
   y=uptype(y,ft);
  } else {
   if(yt==zt){
    return Mul(Div(Kz(F(1.),F(0.)),y),x);
   }
  }
  s4=F(F(1.)/F64(_IK(y)));
  dx(y);
  return scale(s4,x);
 }
 return nd(I(267),I(5),x,y);
}
const divi=function(x,y){
 return I(x/y);
}
const divf=function(x,y){
 return F(x/y);
}
const divz=function(xr,xi,yr,yi,rp){
 let r,d,e,f
 {
  r=F(0.);
  d=F(0.);
  e=F(0.);
  f=F(0.);
 }
 if(F64abs(yr)>=F64abs(yi)){
  r=F(yi/yr);
  d=F(yr+F(r*yi));
  e=F(F(xr+F(xi*r))/d);
  f=F(F(xi-F(xr*r))/d);
 } else {
  r=F(yr/yi);
  d=F(yi+F(r*yr));
  e=F(F(F(xr*r)+xi)/d);
  f=F(F(F(xi*r)-xr)/d);
 }
 SetF64(rp,e);
 SetF64(I(rp+I(8)),f);
}
const divfF=function(x,yp,rp,e){
 do{
  SetF64(rp,F(x/F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const divzZ=function(re,im,yp,rp,e){
 do{
  divz(re,im,F64(yp),F64(I(yp+I(8))),rp);
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const divF=function(xp,yp,rp,e){
 do{
  SetF64(rp,F(F64(xp)/F64(yp)));
  rp+=8;
  xp+=8;
  yp+=8;
 }while(rp<e);
}
const divZ=function(xp,yp,rp,e){
 do{
  divz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))),rp);
  xp+=16;
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const idiv=function(x,y,mod){
 let r,t,av,xp,yp,rp8,e8,xn16,e16,rp23,e23
 r=K(0n);
 t=maxtype(x,y);
 x=uptype(x,t);
 y=uptype(y,t);
 av=conform(x,y);
 if(t!=it){
  trap(Type);
 }
 xp=_IK(x);
 yp=_IK(y);
 switch(av){
  case 0:{
   r=(mod!=I(0))?(Ki(I(xp%yp))):(Ki(I(xp/yp)));
   return r;
  }
  break;
  case 1:{
   r=use(y);
   rp8=_IK(r);
   e8=I(rp8+I(I(4)*nn(r)));
   if(mod!=I(0)){
    for(;(rp8<e8);){
     SetI32(rp8,I(xp%I32(rp8)));
     rp8+=4;
    }
   } else {
    for(;(rp8<e8);){
     SetI32(rp8,I(xp/I32(rp8)));
     rp8+=4;
    }
   }
   return r;
  }
  break;
  case 2:{
   x=use(x);
   xp=_IK(x);
   xn16=nn(x);
   e16=I(xp+I(I(4)*xn16));
   if(((yp>I(0))&&(xn16>I(0)))&&(mod==I(0))){
    divIi(xp,yp,e16);
   }
   if(mod!=I(0)){
    for(;(xp<e16);){
     SetI32(xp,I(I32(xp)%yp));
     xp+=4;
    }
   }
   return x;
  }
  break;
  default:{
   r=use2(x,y);
   rp23=_IK(r);
   e23=I(rp23+I(I(4)*nn(r)));
   if(mod!=I(0)){
    for(;(rp23<e23);){
     SetI32(rp23,I(I32(xp)%I32(yp)));
     xp+=4;
     yp+=4;
     rp23+=4;
    }
   } else {
    for(;(rp23<e23);){
     SetI32(rp23,I(I32(xp)/I32(yp)));
     xp+=4;
     yp+=4;
     rp23+=4;
    }
   }
   dx(x);
   dx(y);
   return r;
  }
  break;
 } 
}
const divIi=function(xp,yp,e){
 let s
 s=I(I(31)-I32clz(yp));
 if(yp==I(I(1)<<s)){
  do{
   SetI32(xp,I(I32(xp)>>s));
   xp+=4;
  }while(xp<e);
  return ;
 }
 for(;(xp<e);){
  SetI32(xp,I(I32(xp)/yp));
  xp+=4;
 }
}
const Min=function(x,y){
 if(tp(y)<I(16)){
  return nd(I(278),I(6),y,x);
 }
 return nd(I(278),I(6),x,y);
}
const mini=function(x,y){
 if(x<y){
  return x;
 }
 return y;
}
const minf=function(x,y){
 return F64min(x,y);
}
const minz=function(xr,xi,yr,yi,rp){
 if(ltz(xr,xi,yr,yi)!=I(0)){
  SetF64(rp,xr);
  SetF64(I(rp+I(8)),xi);
 } else {
  SetF64(rp,yr);
  SetF64(I(rp+I(8)),yi);
 }
}
const mincC=function(x,yp,rp,e){
 do{
  SetI8(rp,mini(x,I8(yp)));
  yp++;
  rp++;
 }while(rp<e);
}
const miniI=function(x,yp,rp,e){
 do{
  SetI32(rp,mini(x,I32(yp)));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const minfF=function(x,yp,rp,e){
 do{
  SetF64(rp,minf(x,F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const minzZ=function(re,im,yp,rp,e){
 do{
  minz(re,im,F64(yp),F64(I(yp+I(8))),rp);
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const minC=function(xp,yp,rp,e){
 do{
  SetI8(rp,mini(I8(xp),I8(yp)));
  xp++;
  yp++;
  rp++;
 }while(rp<e);
}
const minI=function(xp,yp,rp,e){
 do{
  SetI32(rp,mini(I32(xp),I32(yp)));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const minF=function(xp,yp,rp,e){
 do{
  SetF64(rp,minf(F64(xp),F64(yp)));
  xp+=8;
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const minZ=function(xp,yp,rp,e){
 do{
  minz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))),rp);
  xp+=16;
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const Max=function(x,y){
 if(tp(y)<I(16)){
  return nd(I(289),I(7),y,x);
 }
 return nd(I(289),I(7),x,y);
}
const maxi=function(x,y){
 return (x>y)?(x):(y);
}
const maxf=function(x,y){
 return F64max(x,y);
}
const maxz=function(xr,xi,yr,yi,rp){
 if(gtz(xr,xi,yr,yi)!=I(0)){
  SetF64(rp,xr);
  SetF64(I(rp+I(8)),xi);
 } else {
  SetF64(rp,yr);
  SetF64(I(rp+I(8)),yi);
 }
}
const maxcC=function(x,yp,rp,e){
 do{
  SetI8(rp,maxi(x,I8(yp)));
  yp++;
  rp++;
 }while(rp<e);
}
const maxiI=function(x,yp,rp,e){
 do{
  SetI32(rp,maxi(x,I32(yp)));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const maxfF=function(x,yp,rp,e){
 do{
  SetF64(rp,F64max(x,F64(yp)));
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const maxzZ=function(re,im,yp,rp,e){
 do{
  maxz(re,im,F64(yp),F64(I(yp+I(8))),rp);
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const maxC=function(xp,yp,rp,e){
 do{
  SetI8(rp,maxi(I8(xp),I8(yp)));
  xp++;
  yp++;
  rp++;
 }while(rp<e);
}
const maxI=function(xp,yp,rp,e){
 do{
  SetI32(rp,maxi(I32(xp),I32(yp)));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const maxF=function(xp,yp,rp,e){
 do{
  SetF64(rp,F64max(F64(xp),F64(yp)));
  xp+=8;
  yp+=8;
  rp+=8;
 }while(rp<e);
}
const maxZ=function(xp,yp,rp,e){
 do{
  maxz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))),rp);
  xp+=16;
  yp+=16;
  rp+=16;
 }while(rp<e);
}
const Eql=function(x,y){
 return nc(I(338),I(10),x,y);
}
const eqi=function(x,y){
 return I32B((x==y));
}
const eqf=function(x,y){
 return I32B((((x!=x)&&(y!=y))||(x==y)));
}
const eqz=function(xr,xi,yr,yi){
 return I(eqf(xr,yr)&eqf(xi,yi));
}
const eqcC=function(v,yp,rp,e){
 do{
  SetI32(rp,I32B((v==I8(yp))));
  yp++;
  rp+=4;
 }while(rp<e);
}
const eqiI=function(x,yp,rp,e){
 do{
  SetI32(rp,I32B((x==I32(yp))));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const eqfF=function(x,yp,rp,e){
 do{
  SetI32(rp,eqf(x,F64(yp)));
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const eqzZ=function(re,im,yp,rp,e){
 do{
  SetI32(rp,eqz(re,im,F64(yp),F64(I(yp+I(8)))));
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const eqCc=function(xp,y,rp,e){
 eqcC(y,xp,rp,e);
}
const eqIi=function(xp,y,rp,e){
 eqiI(y,xp,rp,e);
}
const eqFf=function(xp,y,rp,e){
 eqfF(y,xp,rp,e);
}
const eqZz=function(xp,re,im,rp,e){
 eqzZ(re,im,xp,rp,e);
}
const eqC=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I8(xp)==I8(yp))));
  xp++;
  yp++;
  rp+=4;
 }while(rp<e);
}
const eqI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I32(xp)==I32(yp))));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const eqF=function(xp,yp,rp,e){
 do{
  SetI32(rp,eqf(F64(xp),F64(yp)));
  xp+=8;
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const eqZ=function(xp,yp,rp,e){
 do{
  SetI32(rp,eqz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8)))));
  xp+=16;
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const Les=function(x,y){
 if((tp(x)==st)&&(tp(y)==Ct)){
  if(_IK(x)==I(0)){
   write(rx(y));
   return y;
  }
  return writefile(cs(x),y);
 }
 return nc(I(308),I(8),x,y);
}
const lti=function(x,y){
 return I32B((x<y));
}
const ltf=function(x,y){
 return I32B(((x<y)||(x!=x)));
}
const ltz=function(xr,xi,yr,yi){
 if(eqf(xr,yr)!=I(0)){
  return ltf(xi,yi);
 }
 return ltf(xr,yr);
}
const ltcC=function(v,yp,rp,e){
 do{
  SetI32(rp,I32B((v<I8(yp))));
  yp++;
  rp+=4;
 }while(rp<e);
}
const ltiI=function(x,yp,rp,e){
 do{
  SetI32(rp,I32B((x<I32(yp))));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const ltfF=function(x,yp,rp,e){
 do{
  SetI32(rp,ltf(x,F64(yp)));
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const ltzZ=function(re,im,yp,rp,e){
 do{
  if(re==F64(yp)){
   SetI32(rp,ltf(im,F64(I(yp+I(8)))));
  } else {
   SetI32(rp,ltf(re,F64(yp)));
  }
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const ltCc=function(xp,v,rp,e){
 do{
  SetI32(rp,I32B((I8(xp)<v)));
  xp++;
  rp+=4;
 }while(rp<e);
}
const ltIi=function(xp,y,rp,e){
 do{
  SetI32(rp,I32B((I32(xp)<y)));
  xp+=4;
  rp+=4;
 }while(rp<e);
}
const ltFf=function(xp,y,rp,e){
 do{
  SetI32(rp,ltf(F64(xp),y));
  xp+=8;
  rp+=4;
 }while(rp<e);
}
const ltZz=function(xp,re,im,rp,e){
 do{
  if(F64(xp)==re){
   SetI32(rp,ltf(F64(I(xp+I(8))),im));
  } else {
   SetI32(rp,ltf(F64(xp),re));
  }
  xp+=16;
  rp+=4;
 }while(rp<e);
}
const ltC=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I8(xp)<I8(yp))));
  xp++;
  yp++;
  rp+=4;
 }while(rp<e);
}
const ltI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I32(xp)<I32(yp))));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const ltF=function(xp,yp,rp,e){
 do{
  SetI32(rp,ltf(F64(xp),F64(yp)));
  xp+=8;
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const ltZ=function(xp,yp,rp,e){
 do{
  SetI32(rp,ltz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8)))));
  xp+=16;
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const Mor=function(x,y){
 return nc(I(323),I(9),x,y);
}
const gti=function(x,y){
 return I32B((x>y));
}
const gtf=function(x,y){
 return I32B(((x>y)||(y!=y)));
}
const gtz=function(xr,xi,yr,yi){
 if(eqf(xr,yr)!=I(0)){
  return gtf(xi,yi);
 }
 return gtf(xr,yr);
}
const gtcC=function(v,yp,rp,e){
 do{
  SetI32(rp,I32B((v>I8(yp))));
  yp++;
  rp+=4;
 }while(rp<e);
}
const gtiI=function(x,yp,rp,e){
 do{
  SetI32(rp,I32B((x>I32(yp))));
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const gtfF=function(x,yp,rp,e){
 do{
  SetI32(rp,gtf(x,F64(yp)));
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const gtzZ=function(re,im,yp,rp,e){
 do{
  if(re==F64(yp)){
   SetI32(rp,gtf(im,F64(I(yp+I(8)))));
  } else {
   SetI32(rp,gtf(re,F64(yp)));
  }
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const gtCc=function(xp,v,rp,e){
 do{
  SetI32(rp,I32B((I8(xp)>v)));
  xp++;
  rp+=4;
 }while(rp<e);
}
const gtIi=function(xp,y,rp,e){
 do{
  SetI32(rp,I32B((I32(xp)>y)));
  xp+=4;
  rp+=4;
 }while(rp<e);
}
const gtFf=function(xp,y,rp,e){
 do{
  SetI32(rp,gtf(F64(xp),y));
  xp+=8;
  rp+=4;
 }while(rp<e);
}
const gtZz=function(xp,re,im,rp,e){
 do{
  if(F64(xp)==re){
   SetI32(rp,gtf(F64(I(xp+I(8))),im));
  } else {
   SetI32(rp,gtf(F64(xp),re));
  }
  xp+=16;
  rp+=4;
 }while(rp<e);
}
const gtC=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I8(xp)>I8(yp))));
  xp++;
  yp++;
  rp+=4;
 }while(rp<e);
}
const gtI=function(xp,yp,rp,e){
 do{
  SetI32(rp,I32B((I32(xp)>I32(yp))));
  xp+=4;
  yp+=4;
  rp+=4;
 }while(rp<e);
}
const gtF=function(xp,yp,rp,e){
 do{
  SetI32(rp,gtf(F64(xp),F64(yp)));
  xp+=8;
  yp+=8;
  rp+=4;
 }while(rp<e);
}
const gtZ=function(xp,yp,rp,e){
 do{
  SetI32(rp,gtz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8)))));
  xp+=16;
  yp+=16;
  rp+=4;
 }while(rp<e);
}
const Ang=function(x){
 let r,xt,xp,n,rp8,e8
 r=K(0n);
 xt=tp(x);
 if(xt>Zt){
  return Ech(K(35n),l1(x));
 }
 if(xt<zt){
  dx(x);
  return Kf(F(0.));
 }
 xp=_IK(x);
 if(xt==zt){
  dx(x);
  return Kf(ang2(F64(I(xp+I(8))),F64(xp)));
 }
 n=nn(x);
 if(xt==Zt){
  r=mk(Ft,n);
  rp8=_IK(r);
  e8=I(rp8+I(I(8)*n));
  for(;(rp8<e8);){
   SetF64(rp8,ang2(F64(I(xp+I(8))),F64(xp)));
   xp+=16;
   rp8+=8;
  }
 } else {
  r=ntake(n,Kf(F(0.)));
 }
 dx(x);
 return r;
}
const Rot=function(x,y){
 let r,yt,yp,yn9,rp9,i10
 r=K(0n);
 if(tp(x)>Zt){
  return Ech(K(35n),l2(x,y));
 }
 x=uptype(x,zt);
 if(y==K(0n)){
  return x;
 }
 if(I(tp(y)&I(15))>ft){
  trap(Type);
 }
 y=uptype(y,ft);
 yt=tp(y);
 yp=_IK(y);
 if(yt==ft){
  r=Kz(F(0.),F(0.));
  cosin(F64(yp),_IK(r));
 } else {
  yn9=nn(y);
  r=mk(Zt,yn9);
  rp9=_IK(r);
  {
   i10=I(0);
   for(;(i10<yn9);i10++){
    cosin(F64(yp),rp9);
    yp+=8;
    rp9+=16;
   }
  }
 }
 dx(y);
 return Mul(r,x);
}
const Sin=function(x){
 return nf(I(44),x,K(0n));
}
const Cos=function(x){
 return nf(I(39),x,K(0n));
}
const Exp=function(x){
 return nf(I(42),x,K(0n));
}
const Log=function(x){
 return nf(I(43),x,K(0n));
}
const Pow=function(y,x){
 if(I(tp(x)&I(15))==it){
  if(tp(y)==it){
   if(_IK(y)>=I(0)){
    return ipow(x,_IK(y));
   }
  }
 }
 return nf(I(106),x,y);
}
const Lgn=function(x,y){
 let xf
 xf=fk(x);
 if(xf==F(10.)){
  xf=F(0.4342944819032518);
 } else {
  xf=(xf==F(2.))?(F(1.4426950408889634)):(F(F(1.)/log(xf)));
 }
 return Mul(Kf(xf),Log(y));
}
const fk=function(x){
 let t
 t=tp(x);
 if(t==it){
  return _FI(_IK(x));
 }
 if(t!=ft){
  trap(Type);
 }
 dx(x);
 return F64(_IK(x));
}
const nf=function(f,x,y){
 let r,yf,xt,xp,xn12
 r=K(0n);
 yf=F(0.);
 xt=tp(x);
 if(xt>=Lt){
  return (y==K(0n))?(Ech(_KI(f),l1(x))):(Ech(_KI(I(f-I(64))),l2(y,x)));
 }
 if(y!=K(0n)){
  yf=fk(y);
 }
 if(I(xt&I(15))<ft){
  x=uptype(x,ft);
  xt=tp(x);
 }
 xp=_IK(x);
 if(xt==ft){
  r=Kf(F(0.));
  ff(f,_IK(r),xp,I(1),yf);
 } else {
  xn12=nn(x);
  r=mk(Ft,xn12);
  if(xn12>I(0)){
   ff(f,_IK(r),xp,xn12,yf);
  }
 }
 dx(x);
 return r;
}
const ff=function(f,rp,xp,n,yf){
 let e
 e=I(xp+I(I(8)*n));
 switch(I(f-I(42))){
  case 0:do{
   SetF64(rp,exp(F64(xp)));
   rp+=8;
   xp+=8;
  }while(xp<e);
  break;
  case 1:do{
   SetF64(rp,log(F64(xp)));
   rp+=8;
   xp+=8;
  }while(xp<e);
  break;
  default:if(f==I(106)){
   do{
    SetF64(rp,pow(F64(xp),yf));
    rp+=8;
    xp+=8;
   }while(xp<e);
  } else {
   do{
    cosin_(F64(xp),rp,I(I(1)+I32B((f==I(39)))));
    rp+=8;
    xp+=8;
   }while(xp<e);
  }
  break;
 } 
}
const nm=function(f,x){
 let r,xt,xp,n4,rp4,i5,rp,e
 r=K(0n);
 xt=tp(x);
 if(xt>Lt){
  r=x0(x);
  return key(r,nm(f,r1(x)),xt);
 }
 xp=_IK(x);
 if(xt==Lt){
  n4=nn(x);
  r=mk(Lt,n4);
  rp4=_IK(r);
  {
   i5=I(0);
   for(;(i5<n4);i5++){
    SetI64(rp4,_JK(nm(f,x0(_KI(xp)))));
    xp+=8;
    rp4+=8;
   }
  }
  dx(x);
  return uf(r);
 }
 if(xt<I(16)){
  switch(I(xt-I(2))){
   case 0:return Kc(I(_F[f](xp)));
   break;
   case 1:return Ki(I(_F[f](xp)));
   break;
   case 2:return trap(Type);
   break;
   case 3:{
    r=Kf(F(_F[I(I(1)+f)](F64(xp))));
    dx(x);
    return r;
   }
   break;
   case 4:{
    r=K(_F[I(I(2)+f)](F64(xp),F64(I(xp+I(8)))));
    dx(x);
    return r;
   }
   break;
   default:return trap(Type);
   break;
  }
 }
 r=use1(x);
 rp=_IK(r);
 e=ep(r);
 if(e==rp){
  dx(x);
  return r;
 }
 switch(I(xt-I(18))){
  case 0:(_F[I(I(3)+f)](xp,rp,e));break;
  case 1:(_F[I(I(4)+f)](xp,rp,e));break;
  case 2:trap(Type);break;
  case 3:(_F[I(I(5)+f)](xp,rp,e));break;
  default:(_F[I(I(6)+f)](xp,rp,e));break;
 } 
 dx(x);
 return r;
}
const nd=function(f,ff,x,y){
 let r,t,av,xp,yp,e14,yp14,rp14,rp23,xp23,yp23,e23
 r=K(0n);
 t=dtypes(x,y);
 if(t>Lt){
  r=dkeys(x,y);
  return key(r,K(_F[I(I(64)+ff)](dvals(x),dvals(y))),t);
 }
 if(t==Lt){
  return Ech(_KI(ff),l2(x,y));
 }
 t=maxtype(x,y);
 x=uptype(x,t);
 y=uptype(y,t);
 av=conform(x,y);
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 if(av==I(0)){
  switch(I(t-I(2))){
   case 0:return Kc(I(_F[f](xp,yp)));
   break;
   case 1:return Ki(I(_F[f](xp,yp)));
   break;
   case 2:return trap(Type);
   break;
   case 3:{
    dx(x);
    dx(y);
    return Kf(F(_F[I(I(1)+f)](F64(xp),F64(yp))));
   }
   break;
   default:{
    r=Kz(F(0.),F(0.));
    dx(x);
    dx(y);
    (_F[I(I(2)+f)](F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))),_IK(r)));
    return r;
   }
   break;
  }
 }
 if(av==I(1)){
  r=use1(y);
  if(nn(r)==I(0)){
   dx(x);
   dx(y);
   return r;
  }
  e14=ep(r);
  {
   yp14=_IK(y);
   rp14=_IK(r);
  }
  switch(I(t-I(2))){
   case 0:(_F[I(I(3)+f)](xp,yp14,rp14,e14));break;
   case 1:(_F[I(I(4)+f)](xp,yp14,rp14,e14));break;
   case 2:trap(Type);break;
   case 3:(_F[I(I(5)+f)](F64(xp),yp14,rp14,e14));break;
   default:(_F[I(I(6)+f)](F64(xp),F64(I(xp+I(8))),yp14,rp14,e14));break;
  } 
  dx(x);
  dx(y);
  return r;
 } else {
  r=use2(x,y);
  if(nn(r)==I(0)){
   dx(x);
   dx(y);
   return r;
  }
  {
   rp23=_IK(r);
   xp23=_IK(x);
   yp23=_IK(y);
  }
  e23=ep(r);
  switch(I(t-I(2))){
   case 0:(_F[I(I(7)+f)](xp23,yp23,rp23,e23));break;
   case 1:(_F[I(I(8)+f)](xp23,yp23,rp23,e23));break;
   case 2:trap(Type);break;
   case 3:(_F[I(I(9)+f)](xp23,yp23,rp23,e23));break;
   default:(_F[I(I(10)+f)](xp23,yp23,rp23,e23));break;
  } 
  dx(x);
  dx(y);
  return r;
 }
}
const nc=function(f,ff,x,y){
 let r,t,av,xp,yp,yn14,rp14,e14,xn24,rp24,e24,n33
 r=K(0n);
 t=dtypes(x,y);
 if(t>Lt){
  r=dkeys(x,y);
  return key(r,nc(f,ff,dvals(x),dvals(y)),t);
 }
 if(t==Lt){
  return Ech(_KI(ff),l2(x,y));
 }
 t=maxtype(x,y);
 x=uptype(x,t);
 y=uptype(y,t);
 av=conform(x,y);
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 if(av==I(0)){
  switch(I(t-I(2))){
   case 0:return Ki(I(_F[f](xp,yp)));
   break;
   case 1:return Ki(I(_F[f](xp,yp)));
   break;
   case 2:return Ki(I(_F[f](xp,yp)));
   break;
   case 3:{
    dx(x);
    dx(y);
    return Ki(I(_F[I(I(1)+f)](F64(xp),F64(yp))));
   }
   break;
   default:{
    dx(x);
    dx(y);
    return Ki(I(_F[I(I(2)+f)](F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))))));
   }
   break;
  }
 } else {
  if(av==I(1)){
   yn14=nn(y);
   r=mk(It,yn14);
   if(yn14==I(0)){
    dx(x);
    dx(y);
    return r;
   }
   rp14=_IK(r);
   e14=ep(r);
   switch(I(t-I(2))){
    case 0:(_F[I(I(3)+f)](xp,yp,rp14,e14));break;
    case 1:(_F[I(I(4)+f)](xp,yp,rp14,e14));break;
    case 2:(_F[I(I(4)+f)](xp,yp,rp14,e14));break;
    case 3:{
     dx(x);
     (_F[I(I(5)+f)](F64(xp),yp,rp14,e14));
    }
    break;
    default:{
     dx(x);
     (_F[I(I(6)+f)](F64(xp),F64(I(xp+I(8))),yp,rp14,e14));
    }
    break;
   } 
   dx(y);
   return r;
  }
 }
 if(av==I(2)){
  xn24=nn(x);
  r=mk(It,xn24);
  if(xn24==I(0)){
   dx(x);
   dx(y);
   return r;
  }
  rp24=_IK(r);
  e24=ep(r);
  switch(I(t-I(2))){
   case 0:(_F[I(I(7)+f)](xp,yp,rp24,e24));break;
   case 1:(_F[I(I(8)+f)](xp,yp,rp24,e24));break;
   case 2:(_F[I(I(8)+f)](xp,yp,rp24,e24));break;
   case 3:{
    dx(y);
    (_F[I(I(9)+f)](xp,F64(yp),rp24,e24));
   }
   break;
   default:{
    dx(y);
    (_F[I(I(10)+f)](xp,F64(yp),F64(I(yp+I(8))),rp24,e24));
   }
   break;
  } 
  dx(x);
  return r;
 } else {
  n33=nn(x);
  r=(t==it)?(use2(x,y)):(mk(It,nn(x)));
  if(n33==I(0)){
   dx(x);
   dx(y);
   return r;
  }
  (_F[I(I(I(f+I(11))+I32B((t==zt)))+I(I(t-I(1))/I(2)))](xp,yp,_IK(r),ep(r)));
  dx(x);
  dx(y);
  return r;
 }
}
const conform=function(x,y){
 let r
 r=I(I(I(2)*I32B((tp(x)>I(16))))+I32B((tp(y)>I(16))));
 if(r==I(3)){
  if(nn(x)!=nn(y)){
   trap(Length);
  }
 }
 return r;
}
const dtypes=function(x,y){
 let xt,yt
 {
  xt=tp(x);
  yt=tp(y);
 }
 return maxi(xt,yt);
}
const dkeys=function(x,y){
 if(tp(x)>Lt){
  return x0(x);
 }
 return x0(y);
}
const dvals=function(x){
 if(tp(x)>Lt){
  return r1(x);
 }
 return x;
}
const maxtype=function(x,y){
 let xt,yt,t
 {
  xt=I(tp(x)&I(15));
  yt=I(tp(y)&I(15));
 }
 t=maxi(xt,yt);
 if(t==I(0)){
  t=it;
 }
 return t;
}
const uptype=function(x,dst){
 let xt,xp,f12,xn,r,rp,i22,i26,i30
 xt=tp(x);
 xp=_IK(x);
 if(I(xt&I(15))==dst){
  return x;
 }
 if(xt<I(16)){
  if(dst==ct){
   return Kc(xp);
  } else {
   if(dst==it){
    return Ki(xp);
   } else {
    if(dst==ft){
     return Kf(_FI(xp));
    } else {
     if(dst==zt){
      f12=_FI(xp);
      if(xt==ft){
       f12=F64(xp);
       dx(x);
      }
      return Kz(f12,F(0.));
     } else {
      return trap(Type);
     }
    }
   }
  }
 }
 if((xt<It)&&(dst==ft)){
  x=uptype(x,it);
  xt=It;
 }
 if((xt<Ft)&&(dst==zt)){
  x=uptype(x,ft);
  xt=Ft;
 }
 xn=nn(x);
 xp=_IK(x);
 r=mk(I(dst+I(16)),xn);
 rp=_IK(r);
 if(dst==it){
  i22=I(0);
  for(;(i22<xn);i22++){
   SetI32(rp,I8(xp));
   xp++;
   rp+=4;
  }
 } else {
  if(dst==ft){
   i26=I(0);
   for(;(i26<xn);i26++){
    SetF64(rp,_FI(I32(xp)));
    xp+=4;
    rp+=8;
   }
  } else {
   if(dst==zt){
    i30=I(0);
    for(;(i30<xn);i30++){
     SetF64(rp,F64(xp));
     SetF64(I(rp+I(8)),F(0.));
     xp+=8;
     rp+=16;
    }
   } else {
    trap(Type);
   }
  }
 }
 dx(x);
 return r;
}
const use2=function(x,y){
 if(I32(I(_IK(y)-I(4)))==I(1)){
  return rx(y);
 }
 return use1(x);
}
const use1=function(x){
 if(I32(I(_IK(x)-I(4)))==I(1)){
  return rx(x);
 }
 return mk(tp(x),nn(x));
}
const use=function(x){
 let xt,nx,r
 xt=tp(x);
 if((xt<I(16))||(xt>Lt)){
  trap(Type);
 }
 if(I32(I(_IK(x)-I(4)))==I(1)){
  return x;
 }
 nx=nn(x);
 r=mk(xt,nx);
 Memorycopy(_IK(r),_IK(x),I(sz(xt)*nx));
 if(xt==Lt){
  rl(r);
 }
 dx(x);
 return r;
}
const Srt=function(x){
 let r,xt,i4,xn
 r=K(0n);
 xt=tp(x);
 if(xt<I(16)){
  trap(Type);
 }
 if(xt==Dt){
  r=x0(x);
  x=r1(x);
  i4=rx(Asc(rx(x)));
  return Key(atv(r,i4),atv(x,i4));
 }
 xn=nn(x);
 if(xn<I(2)){
  return x;
 }
 switch(I(xt-I(18))){
  case 0:r=srtC(x,xn);
  break;
  case 1:r=srtI(x,xn);
  break;
  case 2:r=srtI(x,xn);
  break;
  case 3:r=srtF(x,xn);
  break;
  default:r=atv(x,Asc(rx(x)));
  break;
 } 
 return r;
}
const Asc=function(x){
 if(tp(x)==st){
  return readfile(cs(x));
 }
 return grade(x,I(343));
}
const Dsc=function(x){
 return grade(x,I(336));
}
const grade=function(x,f){
 let r,xt,n,rp,xp,w11,wp11
 r=K(0n);
 xt=tp(x);
 if(xt<I(16)){
  trap(Type);
 }
 if(xt==Dt){
  r=x0(x);
  return Atx(r,grade(r1(x),f));
 }
 n=nn(x);
 if(xt==Tt){
  return kxy(I(104),x,Ki(I32B((f==I(336)))));
 }
 if(n<I(2)){
  dx(x);
  return seq(n);
 }
 r=seq(n);
 rp=_IK(r);
 xp=_IK(x);
 if(n<I(16)){
  igrd(rp,xp,n,sz(xt),I(f+xt));
 } else {
  w11=mk(It,n);
  wp11=_IK(w11);
  Memorycopy(wp11,rp,I(I(4)*n));
  msrt(wp11,rp,I(0),n,xp,sz(xt),I(f+xt));
  dx(w11);
 }
 dx(x);
 return r;
}
const srtC=function(x,n){
 let r,y,yp,xp,i1,p2,rp,i3,s4
 r=mk(Ct,n);
 y=ntake(I(256),Ki(I(0)));
 yp=_IK(y);
 xp=_IK(x);
 {
  i1=I(0);
  do{
   p2=I(yp+I(I(4)*I8(I(xp+i1))));
   SetI32(p2,I(I(1)+I32(p2)));
   i1++;
  }while(i1<n);
 }
 rp=_IK(r);
 {
  i3=I(0);
  do{
   s4=I32(I(yp+I(I(4)*i3)));
   Memoryfill(rp,i3,s4);
   rp=I(rp+s4);
   i3++;
  }while(i3<I(256));
 }
 dx(x);
 dx(y);
 return r;
}
const srtI=function(x,n){
 if(n<I(32)){
  x=use(x);
  isrtsI(_IK(x),n);
  return x;
 }
 return radixI(x,n);
}
const srtF=function(x,n){
 if(n<I(32)){
  return atv(x,Asc(rx(x)));
 }
 return radixF(x,n);
}
const isrtsI=function(xp,n){
 let i1,x2,j2,jj4
 i1=I(1);
 do{
  x2=I32(I(xp+I(I(4)*i1)));
  j2=I(i1-I(1));
  for(;((j2>=I(0))&&(I32(I(xp+I(I(4)*j2)))>x2));){
   jj4=I(xp+I(I(4)*j2));
   SetI32(I(I(4)+jj4),I32(jj4));
   j2=I(j2-I(1));
  }
  SetI32(I(I(xp+I(4))+I(I(4)*j2)),x2);
  i1++;
 }while(i1<n);
}
const msrt=function(x,r,a,b,p,s,f){
 let c
 if(I(b-a)<I(2)){
  return ;
 }
 c=I(I(a+b)>>I(1));
 msrt(r,x,a,c,p,s,f);
 msrt(r,x,c,b,p,s,f);
 mrge(x,r,I(I(4)*a),I(I(4)*b),I(I(4)*c),p,s,f);
}
const mrge=function(x,r,a,b,c,p,s,f){
 let q,i,j,k1
 q=I(0);
 {
  i=a;
  j=c;
 }
 {
  k1=a;
  for(;(k1<b);k1+=4){
   q=((i<c)&&(j<b))?(I(_F[f](I(p+I(s*I32(I(x+i)))),I(p+I(s*I32(I(x+j))))))):(I(0));
   if((i>=c)||(q!=I(0))){
    SetI32(I(r+k1),I32(I(x+j)));
    j+=4;
   } else {
    SetI32(I(r+k1),I32(I(x+i)));
    i+=4;
   }
  }
 }
}
const igrd=function(rp,xp,n,s,f){
 let i1,x2,j2,jj4
 i1=I(1);
 do{
  x2=I32(I(rp+I(I(4)*i1)));
  j2=I(i1-I(1));
  for(;(j2>=I(0));){
   if(I(_F[f](I(xp+I(s*I32(I(rp+I(I(4)*j2))))),I(xp+I(s*x2))))==I(0)){
    break;
   }
   jj4=I(rp+I(I(4)*j2));
   SetI32(I(I(4)+jj4),I32(jj4));
   j2=I(j2-I(1));
  }
  SetI32(I(I(rp+I(4))+I(I(4)*j2)),x2);
  i1++;
 }while(i1<n);
}
const radixI=function(x,n){
 let b,o,op,fr,to,ko1,s2,prev2,i3,e4,ok4,w2,i14,e15,ok15,t2
 x=use(x);
 b=ntake(n,Ki(I(0)));
 o=mk(It,I(256));
 n=I(n*I(4));
 op=_IK(o);
 fr=_IK(x);
 to=_IK(b);
 {
  ko1=I(0);
  for(;(ko1<I(32));ko1+=8){
   s2=I(1);
   prev2=nai;
   Memoryfill(op,I(0),I(1024));
   {
    i3=I(0);
    do{
     e4=I32(I(fr+i3));
     ok4=I(op+I(I(4)*I(I(255)&I(e4>>ko1))));
     SetI32(ok4,I(I(1)+I32(ok4)));
     if(s2!=I(0)){
      s2=I32B((e4>=prev2));
      prev2=e4;
     }
     i3+=4;
    }while(i3<n);
   }
   if(s2!=I(0)){
    if(I(I(ko1>>I(3))%I(2))==I(1)){
     Memorycopy(to,fr,n);
    }
    break;
   }
   w2=I(0);
   w2=(ko1==I(24))?(radixp(op,I(0),I(128),radixp(op,I(128),I(256),w2))):(radixp(op,I(0),I(256),w2));
   {
    i14=I(0);
    do{
     e15=I32(I(fr+i14));
     ok15=I(op+I(I(4)*I(I(255)&I(e15>>ko1))));
     SetI32(I(to+I(I(4)*I32(ok15))),e15);
     SetI32(ok15,I(I(1)+I32(ok15)));
     i14+=4;
    }while(i14<n);
   }
   t2=to;
   to=fr;
   fr=t2;
  }
 }
 dx(o);
 dx(b);
 return x;
}
const radixp=function(op,a,b,w){
 let i1,c2
 op+=I(4)*a;
 {
  i1=a;
  do{
   c2=I32(op);
   SetI32(op,w);
   w=I(w+c2);
   op+=4;
   i1++;
  }while(i1<b);
 }
 return w;
}
const radixF=function(x,n){
 let u,b,o,op,xp,na,i1,v2,fr,to,ko5,s6,prev6,i7,ok8,v10,i15,v16,ok16,t6
 u=K(0n);
 x=use(x);
 b=ntake(n,Kf(F(0.)));
 o=mk(It,I(256));
 n=I(n*I(8));
 op=_IK(o);
 xp=_IK(x);
 na=I(0);
 {
  i1=I(0);
  for(;(i1<n);i1+=8){
   v2=F64(I(xp+i1));
   if(v2!=v2){
    SetF64(I(xp+i1),F64(I(xp+na)));
    SetF64(I(xp+na),v2);
    na+=8;
   }
  }
 }
 fr=I(_IK(x)+na);
 to=_IK(b);
 n=I(n-na);
 {
  ko5=I(0);
  for(;(ko5<I(64));ko5+=8){
   s6=I(1);
   prev6=F(0.);
   Memoryfill(op,I(0),I(1024));
   {
    i7=I(0);
    for(;(i7<n);i7+=8){
     u=floatflp(_KJ(I64(I(fr+i7))));
     ok8=I(op+I(I(4)*_IK(K(K(255n)&K(u>>_KI(ko5))))));
     SetI32(ok8,I(I(1)+I32(ok8)));
     if(s6!=I(0)){
      v10=F64(I(fr+i7));
      s6=I32B((v10>=prev6));
      prev6=v10;
     }
    }
   }
   if(s6!=I(0)){
    if(I(I(ko5>>I(3))%I(2))==I(1)){
     Memorycopy(to,fr,n);
    }
    break;
   }
   radixp(op,I(0),I(256),I(0));
   {
    i15=I(0);
    for(;(i15<n);i15+=8){
     v16=I64(I(fr+i15));
     u=floatflp(_KJ(v16));
     ok16=I(op+I(I(4)*_IK(K(K(255n)&K(u>>_KI(ko5))))));
     SetI64(I(to+I(I(8)*I32(ok16))),v16);
     SetI32(ok16,I(I(1)+I32(ok16)));
    }
   }
   t6=to;
   to=fr;
   fr=t6;
  }
 }
 dx(o);
 dx(b);
 return x;
}
const floatflp=function(x){
 if(K(x&K(BigInt("0x8000000000000000")))==K(BigInt("0x8000000000000000"))){
  return K(x^K(BigInt("0xffffffffffffffff")));
 }
 return K(x^K(BigInt("0x8000000000000000")));
}
const guC=function(xp,yp){
 return I32B((I8(xp)<I8(yp)));
}
const guI=function(xp,yp){
 return I32B((I32(xp)<I32(yp)));
}
const guF=function(xp,yp){
 return ltf(F64(xp),F64(yp));
}
const guZ=function(xp,yp){
 return ltz(F64(xp),F64(I(xp+I(8))),F64(yp),F64(I(yp+I(8))));
}
const guL=function(xp,yp){
 return ltL(_KJ(I64(xp)),_KJ(I64(yp)));
}
const gdC=function(xp,yp){
 return I32B((I8(xp)>I8(yp)));
}
const gdI=function(xp,yp){
 return I32B((I32(xp)>I32(yp)));
}
const gdF=function(xp,yp){
 return guF(yp,xp);
}
const gdZ=function(xp,yp){
 return guZ(yp,xp);
}
const gdL=function(xp,yp){
 return guL(yp,xp);
}
const ltL=function(x,y){
 let r,xt,xp,yp,a6,b6,xn,yn,n
 r=I(0);
 xt=tp(x);
 if(xt!=tp(y)){
  return I32B((xt<tp(y)));
 }
 if(xt<I(16)){
  return _IK(Les(rx(x),rx(y)));
 }
 {
  xp=_IK(x);
  yp=_IK(y);
 }
 if(xt>Lt){
  {
   a6=_KJ(I64(xp));
   b6=_KJ(I64(yp));
  }
  if(match(a6,b6)==I(0)){
   return ltL(a6,b6);
  }
  return ltL(_KJ(I64(I(xp+I(8)))),_KJ(I64(I(yp+I(8)))));
 }
 {
  xn=nn(x);
  yn=nn(y);
 }
 n=mini(xn,yn);
 switch(I(sz(xt)>>I(2))){
  case 0:r=taoC(xp,yp,n);
  break;
  case 1:r=taoI(xp,yp,n);
  break;
  case 2:r=(xt==Lt)?(taoL(xp,yp,n)):(taoF(xp,yp,n));
  break;
  default:r=taoZ(xp,yp,n);
  break;
 } 
 return (r==I(2))?(I32B((xn<yn))):(r);
}
const taoC=function(xp,yp,n){
 let e
 e=I(xp+n);
 for(;(xp<e);){
  if(I8(xp)!=I8(yp)){
   return I32B((I8(xp)<I8(yp)));
  }
  yp++;
  xp++;
 }
 return I(2);
}
const taoI=function(xp,yp,n){
 let e
 e=I(xp+I(I(4)*n));
 for(;(xp<e);){
  if(I32(xp)!=I32(yp)){
   return I32B((I32(xp)<I32(yp)));
  }
  yp+=4;
  xp+=4;
 }
 return I(2);
}
const taoL=function(xp,yp,n){
 let e,x2,y2
 e=I(xp+I(I(8)*n));
 for(;(xp<e);){
  {
   x2=_KJ(I64(xp));
   y2=_KJ(I64(yp));
  }
  if(match(x2,y2)==I(0)){
   return ltL(x2,y2);
  }
  yp+=8;
  xp+=8;
 }
 return I(2);
}
const taoF=function(xp,yp,n){
 let e,x2,y2
 e=I(xp+I(I(8)*n));
 for(;(xp<e);){
  {
   x2=F64(xp);
   y2=F64(yp);
  }
  if(eqf(x2,y2)==I(0)){
   return ltf(x2,y2);
  }
  yp+=8;
  xp+=8;
 }
 return I(2);
}
const taoZ=function(xp,yp,n){
 let e,xr2,xi2,yr2,yi2
 e=I(xp+I(I(16)*n));
 for(;(xp<e);){
  {
   xr2=F64(xp);
   xi2=F64(I(xp+I(8)));
   yr2=F64(yp);
   yi2=F64(I(yp+I(8)));
  }
  if(eqz(xr2,xi2,yr2,yi2)==I(0)){
   return ltz(xr2,xi2,yr2,yi2);
  }
  yp+=16;
  xp+=16;
 }
 return I(2);
}
const Kst=function(x){
 return Atx(Ks(I(32)),x);
}
const Lst=function(x){
 return Atx(Ks(I(40)),x);
}
const Str=function(x){
 let r,xt,xp,p7,f11,l11,i11,ft11,ip19
 r=K(0n);
 xt=tp(x);
 if(xt>I(16)){
  return Ech(K(17n),l1(x));
 }
 xp=_IK(x);
 if(xt>dt){
  switch(I(xt-cf)){
   case 0:{
    rx(x);
    r=ucats(Rev(Str(K(_KI(xp)|K(_KI(Lt)<<K(59n))))));
   }
   break;
   case 1:{
    r=Str(x0(x));
    p7=x1(x);
    p7=(I(_IK(p7)%I(2))!=I(0))?(cat1(Str(K(K(20n)+p7)),Kc(I(58)))):(Str(K(K(21n)+p7)));
    r=ucat(r,p7);
   }
   break;
   case 2:{
    f11=x0(x);
    l11=x1(x);
    i11=x2(x);
    ft11=tp(f11);
    f11=Str(f11);
    dx(i11);
    r=(((nn(i11)==I(1))&&(I32(_IK(i11))==I(1)))&&((ft11==I(0))||(ft11==df)))?(ucat(Kst(Fst(l11)),f11)):(ucat(f11,emb(I(91),I(93),ndrop(I(-1),ndrop(I(1),Kst(l11))))));
   }
   break;
   case 3:r=x2(x);
   break;
   default:r=x1(x);
   break;
  } 
  dx(x);
  return r;
 } else {
  switch(xt){
   case 0:{
    if(xp>I(448)){
     return Str(K(_KI(xp)-K(448n)));
    }
    ip19=xp;
    switch(I(xp>>I(6))){
     case 0:if(xp==I(0)){
      return mk(Ct,I(0));
     }
     break;
     case 1:ip19=I(ip19-I(64));
     break;
     case 2:ip19=I(ip19-I(128));
     break;
     case 3:ip19=I(ip19-I(192));
     break;
    } 
    if((ip19>I(25))||(ip19==I(0))){
     return ucat(Ku(K(96n)),si(xp));
    }
    r=Ku(_KI(I8(I(I(227)+ip19))));
   }
   break;
   case 1:r=K(0n);
   break;
   case 2:r=Ku(_KI(xp));
   break;
   case 3:r=si(xp);
   break;
   case 4:r=cs(x);
   break;
   case 5:r=sf(F64(xp));
   break;
   default:r=sfz(F64(xp),F64(I(xp+I(8))));
   break;
  }
 }
 dx(x);
 return r;
}
const emb=function(a,b,x){
 return cat1(Cat(Kc(a),x),Kc(b));
}
const si=function(x){
 let r
 if(x==I(0)){
  return Ku(K(48n));
 } else {
  if(x==nai){
   return Ku(K(20016n));
  } else {
   if(x<I(0)){
    return ucat(Ku(K(45n)),si(I(-x)));
   }
  }
 }
 r=mk(Ct,I(0));
 for(;(x!=I(0));){
  r=cat1(r,Kc(I(I(48)+I(x%I(10)))));
  x=I(x/I(10));
 }
 return Rev(r);
}
const sf=function(x){
 let c,u,r,i,i15,n,rp,i17
 c=I(0);
 if(x!=x){
  return Ku(K(28208n));
 }
 u=I64reinterpret_f64(x);
 if(u==K(BigInt("0x7ff0000000000000"))){
  return Ku(K(30512n));
 } else {
  if(u==K(BigInt("0xfff0000000000000"))){
   return Ku(K(7811117n));
  }
 }
 if(x<F(0.)){
  return ucat(Ku(K(45n)),sf(F(-x)));
 }
 if((x>F(0.))&&((x>=F(1.e6))||(x<=F(1e-06)))){
  return se(x);
 }
 r=mk(Ct,I(0));
 i=_JF(x);
 if(i==J(0n)){
  r=cat1(r,Kc(I(48)));
 }
 for(;(i!=J(0n));){
  r=cat1(r,Kc(_IJ(J(J(48n)+J(i%J(10n))))));
  i=J(i/J(10n));
 }
 r=Rev(r);
 r=cat1(r,Kc(I(46)));
 x=F(x-F64floor(x));
 {
  i15=I(0);
  do{
   x=F(x*F(10.));
   r=cat1(r,Kc(I(I(48)+I(_IF(x)%I(10)))));
   i15++;
  }while(i15<I(6));
 }
 n=nn(r);
 rp=_IK(r);
 {
  i17=I(0);
  for(;(i17<n);i17++){
   if(I8(rp)==I(48)){
    c++;
   } else {
    c=I(0);
   }
   rp++;
  }
 }
 return ndrop(I(-c),r);
}
const se=function(x){
 let f,e,ei
 f=x;
 e=J(0n);
 if(frexp1(x)!=I(0)){
  f=frexp2(x);
  e=frexp3(x);
 }
 x=F(F(0.3010299956639812)*_FJ(e));
 ei=_IF(F64floor(x));
 x=F(x-_FI(ei));
 return ucat(cat1(sf(F(f*pow(F(10.),x))),Kc(I(101))),si(ei));
}
const sfz=function(re,im){
 let z,a,r
 if((re!=re)||(im!=im)){
  return Ku(K(6385200n));
 }
 z=hypot(re,im);
 a=ang2(im,re);
 r=cat1(trdot(sf(z)),Kc(I(97)));
 if(a!=F(0.)){
  r=ucat(r,trdot(sf(a)));
 }
 return r;
}
const trdot=function(x){
 let n
 n=nn(x);
 if(I8(I(I(_IK(x)+n)-I(1)))==I(46)){
  return ndrop(I(-1),x);
 }
 return x;
}
const Cst=function(x,y){
 let yt
 yt=tp(y);
 if(yt>Zt){
  return Ecr(K(17n),l2(x,y));
 }
 if(yt==ct){
  y=Enl(y);
  yt=Ct;
 }
 if((tp(x)!=st)||(yt!=Ct)){
  trap(Type);
 }
 if(_IK(x)==I(0)){
  return sc(y);
 }
 return prs(ts(x),y);
}
const prs=function(t,y){
 let r,yp,yn,p,e,tt
 r=K(0n);
 {
  yp=_IK(y);
  yn=nn(y);
 }
 {
  p=pp;
  e=pe;
 }
 pp=yp;
 pe=I(yp+yn);
 tt=I(t&I(15));
 if(tt==I(2)){
  return (t==Ct)?(y):(Fst(y));
 }
 if(t==I(4)){
  r=Fst(tsym());
 } else {
  if((t>I(2))&&(t<=I(6))){
   r=tnum();
   if((tp(r)<t)&&(r!=K(0n))){
    r=uptype(r,t);
   }
  }
 }
 if((t>Ct)&&(t<Lt)){
  if(pp==pe){
   r=mk(t,I(0));
  } else {
   if(t==I(20)){
    r=tsym();
   } else {
    r=tnms();
    if((I(tp(r)&I(15))<I(t&I(15)))&&(r!=K(0n))){
     r=uptype(r,I(t&I(15)));
    }
   }
   if(tp(r)==I(t-I(16))){
    r=Enl(r);
   }
  }
 }
 if((tp(r)!=t)||(pp<pe)){
  dx(r);
  r=K(0n);
 }
 {
  pp=p;
  pe=e;
 }
 dx(y);
 return r;
}
const ts=function(x){
 let c,i1
 c=_IK(Fst(cs(x)));
 {
  i1=I(521);
  do{
   if(I8(i1)==c){
    return I(i1-I(520));
   }
   i1++;
  }while(i1<I(546));
 }
 trap(Value);
 return I(0);
}
const Rtp=function(y,x){
 let t,xt,n,s
 t=ts(y);
 xt=tp(x);
 t+=I(16)*I32B((t<I(16)));
 if(((xt<I(16))||(t<I(17)))||(t>Zt)){
  trap(Type);
 }
 n=I(nn(x)*sz(xt));
 s=sz(t);
 if(I(n%s)!=I(0)){
  trap(Length);
 }
 x=use(x);
 SetI32(I(_IK(x)-I(12)),I(n/s));
 x=K(K(_KI(t)<<K(59n))|_KI(_IK(x)));
 return x;
}
const store=function(){
 let g
 g=I(I(I(1)<<I(I32(I(128))-I(16)))-Memorysize2());
 if(g>I(0)){
  Memorygrow2(g);
 }
 Memorycopy2(I(0),I(0),I(I(1)<<I32(I(128))));
}
const catch_=function(){
 Memorycopy3(I(0),I(0),I(I(65536)*Memorysize2()));
}
const try_=function(x){
 try{;
  repl(x);
  store();
 }catch{catch_();}
}
const repl=function(x){
 let n,xp,s,c4
 n=nn(x);
 xp=_IK(x);
 s=I(0);
 if(n>I(0)){
  s=I8(xp);
  if((I8(xp)==I(92))&&(n>I(1))){
   c4=I8(I(I(1)+xp));
   if(I8(I(I(1)+xp))==I(92)){
    Exit(I(0));
   } else {
    if(c4==I(109)){
     dx(x);
     dx(Out(Ki(I32(I(128)))));
    }
   }
   return ;
  }
 }
 x=val(x);
 if(x!=K(0n)){
  if(s==I(32)){
   dx(Out(x));
  } else {
   write(cat1(join(Kc(I(10)),Lst(x)),Kc(I(10))));
  }
 }
}
const doargs=function(){
 let a,an,ee,i1,x2
 a=ndrop(I(1),getargv());
 an=nn(a);
 ee=Ku(K(25901n));
 {
  i1=I(0);
  for(;(i1<an);i1++){
   x2=x0(a);
   if(match(x2,ee)!=I(0)){
    if(i1<I(an-I(1))){
     dx(x2);
     x2=x1(a);
     dx(ee);
     repl(x2);
    }
    Exit(I(0));
   }
   dofile(x2,readfile(rx(x2)));
   a=K(a+K(8n));
  }
 }
 dx(ee);
}
const dofile=function(x,c){
 let kk,tt,xe
 kk=Ku(K(27438n));
 tt=Ku(K(29742n));
 xe=ntake(I(-2),rx(x));
 if(match(xe,kk)!=I(0)){
  dx(val(c));
 } else {
  if(match(xe,tt)!=I(0)){
   test(c);
  } else {
   dx(Asn(sc(rx(x)),c));
  }
 }
 dx(xe);
 dx(x);
 dx(tt);
 dx(kk);
}
const Out=function(x){
 write(cat1(Kst(rx(x)),Kc(I(10))));
 return x;
}
const Otu=function(x,y){
 write(cat1(Kst(x),Kc(I(58))));
 return Out(y);
}
const read=function(){
 let r
 r=mk(Ct,I(504));
 return ntake(ReadIn(_IK(r),I(504)),r);
}
const write=function(x){
 Write(I(0),I(0),_IK(x),nn(x));
 dx(x);
}
const getargv=function(){
 let n,r,rp,i1,s2
 n=Args();
 r=mk(Lt,n);
 rp=_IK(r);
 {
  i1=I(0);
  for(;(i1<n);i1++){
   s2=mk(Ct,Arg(i1,I(0)));
   Arg(i1,_IK(s2));
   SetI64(rp,_JK(s2));
   rp+=8;
  }
 }
 return r;
}
const readfile=function(x){
 let r,n
 r=K(0n);
 if(nn(x)==I(0)){
  r=mk(Ct,I(496));
  r=ntake(ReadIn(_IK(r),I(496)),r);
  return r;
 }
 n=Read(_IK(x),nn(x),I(0));
 if(n<I(0)){
  dx(x);
  return mk(Ct,I(0));
 }
 r=mk(Ct,n);
 Read(_IK(x),nn(x),_IK(r));
 dx(x);
 return r;
}
const writefile=function(x,y){
 let r
 r=Write(_IK(x),nn(x),_IK(y),nn(y));
 if(r!=I(0)){
  trap(Io);
 }
 dx(x);
 return y;
}
const test=function(x){
 let l,n,i3
 if(tp(x)!=Ct){
  trap(Type);
 }
 l=ndrop(I(-1),split(Kc(I(10)),rx(x)));
 n=nn(l);
 dx(l);
 {
  i3=I(0);
  for(;(i3<n);i3++)testi(rx(x),i3);
 }
 dx(x);
}
const testi=function(l,i){
 let x,y
 x=split(Ku(K(12064n)),ati(split(Kc(I(10)),l),i));
 if(nn(x)!=I(2)){
  trap(Length);
 }
 y=x1(x);
 x=r0(x);
 dx(Out(ucat(ucat(rx(x),Ku(K(12064n))),rx(y))));
 x=Kst(val(x));
 if(match(x,y)==I(0)){
  x=Out(x);
  trap(Err);
 }
 dx(x);
 dx(y);
}
const tok=function(x){
 let s,r,i5,y6
 s=cat1(src(),Kc(I(10)));
 pp=nn(s);
 s=Cat(s,x);
 pp=I(pp+_IK(s));
 pe=I(pp+nn(x));
 r=mk(Lt,I(0));
 for(;;){
  ws();
  if(pp==pe){
   break;
  }
  {
   i5=I(193);
   for(;(i5<I(199));i5++){
    y6=K(_F[i5]());
    if(y6!=K(0n)){
     y6=K(y6|_KJ(J(_JI(I(pp-_IK(s)))<<J(32n))));
     r=cat1(r,y6);
     break;
    }
    if(i5==I(198)){
     trap(Parse);
    }
   }
  }
 }
 SetI64(I(552),_JK(s));
 return r;
}
const src=function(){
 return _KJ(I64(I(552)));
}
const tchr=function(){
 let r,q,c8
 if((I8(pp)==I(48))&&(pp<pe)){
  if(I8(I(I(1)+pp))==I(120)){
   pp+=2;
   return thex();
  }
 }
 if(I8(pp)!=I(34)){
  return K(0n);
 }
 pp++;
 r=mk(Ct,I(0));
 q=U(0n);
 for(;;){
  if(pp==pe){
   trap(Parse);
  }
  c8=I8(pp);
  pp++;
  if((c8==I(34))&&(q==U(0n))){
   break;
  }
  if((c8==I(92))&&(q==U(0n))){
   q=U(1n);
   continue;
  }
  if(q!=U(0n)){
   c8=cq(c8);
   q=U(0n);
  }
  r=cat1(r,Kc(c8));
 }
 if(nn(r)==I(1)){
  return Fst(r);
 }
 return r;
}
const cq=function(c){
 if(c==I(116)){
  return I(9);
 }
 if(c==I(110)){
  return I(10);
 }
 if(c==I(114)){
  return I(13);
 }
 return c;
}
const thex=function(){
 let r,c2
 r=mk(Ct,I(0));
 for(;(pp<I(pe-I(1)));){
  c2=I8(pp);
  if(is(c2,I(128))==I(0)){
   break;
  }
  r=cat1(r,Kc(I(I(hx(c2)<<I(4))+hx(I8(I(I(1)+pp))))));
  pp+=2;
 }
 if(nn(r)==I(1)){
  return Fst(r);
 }
 return r;
}
const hx=function(c){
 return (is(c,I(4))!=I(0))?(I(c-I(48))):(I(c-I(87)));
}
const tnms=function(){
 let r,x2
 r=tnum();
 for(;((pp<I(pe-I(1)))&&(I8(pp)==I(32)));){
  pp++;
  x2=tnum();
  if(x2==K(0n)){
   break;
  }
  r=ncat(r,x2);
 }
 return r;
}
const tnum=function(){
 let c,r6
 c=I8(pp);
 if((c==I(45))||(c==I(46))){
  if(is(I8(I(pp-I(1))),I(64))!=I(0)){
   return K(0n);
  }
 }
 if((c==I(45))&&(pp<I(I(1)+pe))){
  pp++;
  r6=tunm();
  if(r6==K(0n)){
   pp=I(pp-I(1));
   return K(0n);
  }
  return Neg(r6);
 }
 return tunm();
}
const tunm=function(){
 let p,r,c8,q22
 p=pp;
 r=pu();
 if((r==J(0n))&&(p==pp)){
  if(I8(p)==I(46)){
   if(is(I8(I(I(1)+p)),I(4))!=I(0)){
    return pflt(r);
   }
  }
  return K(0n);
 }
 if(pp<pe){
  c8=I8(pp);
  if(c8==I(46)){
   return pflt(r);
  }
  if(c8==I(112)){
   return ppi(_FJ(r));
  }
  if(c8==I(97)){
   return pflz(_FJ(r));
  }
  if((c8==I(101))||(c8==I(69))){
   return Kf(pexp(_FJ(r)));
  }
  if(r==J(0n)){
   if(c8==I(78)){
    pp++;
    return missing(it);
   }
   if((c8==I(110))||(c8==I(119))){
    q22=Kf(F(0.));
    SetI64(_IK(q22),J(J(BigInt("0x7ff8000000000001"))));
    if(c8==I(119)){
     SetF64(_IK(q22),inf);
    }
    pp++;
    if((pp<pe)&&(I8(pp)==I(97))){
     dx(q22);
     return pflz(F64(_IK(q22)));
    }
    return q22;
   }
  }
 }
 return Ki(_IJ(r));
}
const pu=function(){
 let r,c2
 r=J(0n);
 for(;(pp<pe);){
  c2=I8(pp);
  if(is(c2,I(4))==I(0)){
   break;
  }
  r=J(J(J(10n)*r)+_JI(I(c2-I(48))));
  pp++;
 }
 return r;
}
const pexp=function(f){
 let e,c2
 pp++;
 e=J(1n);
 if(pp<pe){
  c2=I8(pp);
  if((c2==I(45))||(c2==I(43))){
   if(c2==I(45)){
    e=J(-1n);
   }
   pp++;
  }
 }
 e=J(e*pu());
 return F(f*pow(F(10.),_FJ(e)));
}
const pflt=function(i){
 let c,d,f
 c=I(0);
 d=F(1.);
 f=_FJ(i);
 pp++;
 for(;(pp<pe);){
  c=I8(pp);
  if(is(c,I(4))==I(0)){
   break;
  }
  d=F(d/F(10.));
  f=F(f+F(d*_FI(I(c-I(48)))));
  pp++;
 }
 if(pp<pe){
  c=I8(pp);
  if((c==I(101))||(c==I(69))){
   f=pexp(f);
  }
 }
 if(pp<pe){
  c=I8(pp);
  if(c==I(97)){
   return pflz(f);
  }
  if(c==I(112)){
   return ppi(f);
  }
 }
 return Kf(f);
}
const pflz=function(f){
 let r
 r=K(0n);
 pp++;
 if(pp<pe){
  r=tunm();
 }
 return Rot(Kf(f),r);
}
const ppi=function(f){
 pp++;
 return Kf(F(pi*f));
}
const tvrb=function(){
 let c,o
 c=I8(pp);
 if(is(c,I(1))==I(0)){
  return K(0n);
 }
 pp++;
 if((c==I(92))&&(I8(I(pp-I(2)))==I(32))){
  return K(29n);
 }
 o=I(1);
 if(pp<pe){
  if(I8(pp)==I(58)){
   pp++;
   o=(is(c,I(8))!=I(0))?(I(2)):(I(97));
  }
 }
 return _KI(I(o+idx(c,I(228),I(253))));
}
const tpct=function(){
 let c
 c=I8(pp);
 if(is(c,I(48))!=I(0)){
  pp++;
  return _KI(c);
 }
 if(c==I(10)){
  pp++;
  return K(59n);
 }
 return K(0n);
}
const tvar=function(){
 let c,r
 c=I8(pp);
 if(is(c,I(2))==I(0)){
  return K(0n);
 }
 pp++;
 r=Ku(_KI(c));
 for(;(pp<pe);){
  c=I8(pp);
  if(is(c,I(6))==I(0)){
   break;
  }
  r=cat1(r,K(_KI(c)|K(_KI(ct)<<K(59n))));
  pp++;
 }
 return sc(r);
}
const tsym=function(){
 let r,s2
 r=K(0n);
 for(;(I8(pp)==I(96));){
  pp++;
  if(r==K(0n)){
   r=mk(St,I(0));
  }
  s2=K(0n);
  if(pp<pe){
   s2=tchr();
   if(tp(s2)==ct){
    s2=sc(Enl(s2));
   } else {
    s2=(s2!=K(0n))?(sc(s2)):(tvar());
   }
  }
  if(s2==K(0n)){
   s2=K(_KI(st)<<K(59n));
  }
  r=cat1(r,s2);
  if(pp==pe){
   break;
  }
 }
 return r;
}
const ws=function(){
 let c
 c=I(0);
 for(;(pp<pe);){
  c=I8(pp);
  if((c==I(10))||(c>I(32))){
   break;
  }
  pp++;
 }
 for(;(pp<pe);){
  c=I8(pp);
  if((c==I(47))&&(I8(I(pp-I(1)))<I(33))){
   pp++;
   for(;(pp<pe);){
    c=I8(pp);
    if(c==I(10)){
     break;
    }
    pp++;
   }
  } else {
   return ;
  }
 }
}
const is=function(x,m){
 return I(m&I8(I(I(100)+x)));
}
const nyi=function(x){
 return trap(Nyi);
}
const Idy=function(x){
 return x;
}
const Dex=function(x,y){
 dx(x);
 return y;
}
const Flp=function(x){
 let xt,n2,xp2,m2,t4
 xt=tp(x);
 switch(I(xt-Lt)){
  case 0:{
   n2=nn(x);
   xp2=_IK(x);
   m2=Ki(maxcount(xp2,n2));
   x=Atx(Rdc(K(13n),l1(Ecr(K(15n),l2(m2,x)))),Ecl(K(2n),l2(Til(m2),Mul(m2,Til(Ki(n2))))));
   return x;
  }
  break;
  case 1:return td(x);
  break;
  case 2:{
   t4=x0(x);
   return Key(t4,r1(x));
  }
  break;
  default:return x;
  break;
 } 
}
const maxcount=function(xp,n){
 let r,i1,x2
 r=I(0);
 {
  i1=I(0);
  for(;(i1<n);i1++){
   x2=_KJ(I64(xp));
   xp+=8;
   r=(tp(x2)<I(16))?(maxi(I(1),r)):(maxi(nn(x2),r));
  }
 }
 return r;
}
const Fst=function(x){
 let t
 t=tp(x);
 if(t<I(16)){
  return x;
 }
 if(t==Dt){
  return Fst(Val(x));
 }
 return ati(x,I(0));
}
const Las=function(x){
 let t,n
 t=tp(x);
 if(t<I(16)){
  return x;
 }
 if(t==Dt){
  x=Val(x);
 }
 n=nn(x);
 if(n==I(0)){
  return Fst(x);
 }
 return ati(x,I(n-I(1)));
}
const Cnt=function(x){
 let t
 t=tp(x);
 dx(x);
 if(t<I(16)){
  return Ki(I(1));
 }
 return Ki(nn(x));
}
const Til=function(x){
 let xt,t2
 xt=tp(x);
 if(xt>Lt){
  t2=x0(x);
  dx(x);
  return t2;
 }
 if(xt==it){
  return seq(_IK(x));
 }
 if(xt==It){
  return kx(I(120),x);
 }
 return trap(Type);
}
const seq=function(n){
 let r
 n=maxi(n,I(0));
 r=mk(It,n);
 if(n==I(0)){
  return r;
 }
 seqi(_IK(r),ep(r));
 return r;
}
const seqi=function(p,e){
 let i
 i=I(0);
 do{
  SetI32(p,i);
  i++;
  p+=4;
 }while(p<e);
}
const Unq=function(x){
 let r,xt,xn,i9,xi10
 r=K(0n);
 xt=tp(x);
 if(xt<I(16)){
  return roll(x);
 }
 if(xt>=Lt){
  if(xt==Dt){
   trap(Type);
  }
  if(xt==Tt){
   r=x0(x);
   x=r1(x);
   return key(r,Flp(Unq(Flp(x))),xt);
  }
  return kx(I(96),x);
 }
 xn=nn(x);
 r=mk(xt,I(0));
 {
  i9=I(0);
  for(;(i9<xn);i9++){
   xi10=ati(rx(x),i9);
   if(_IK(In(rx(xi10),rx(r)))==I(0)){
    r=cat1(r,xi10);
   } else {
    dx(xi10);
   }
  }
 }
 dx(x);
 return r;
}
const Uqs=function(x){
 let xt
 xt=tp(x);
 if(xt<I(16)){
  trap(Type);
 }
 return kx(I(88),x);
}
const Grp=function(x){
 return kx(I(128),x);
}
const grp=function(x,y){
 x=rx(x);
 y=rx(y);
 return Atx(Drp(x,y),Grp(Atx(y,x)));
}
const Key=function(x,y){
 return key(x,y,Dt);
}
const key=function(x,y,t){
 let xt,yt,xn
 {
  xt=tp(x);
  yt=tp(y);
 }
 if((xt<I(16))||(xt==Dt)){
  if((yt<I(16))||(yt==Dt)){
   return Key(Enl(x),Enl(y));
  } else {
   if((xt==st)&&(yt==Tt)){
    return keyt(x,y);
   }
   x=ntake(nn(y),x);
  }
 }
 xn=nn(x);
 if((yt<I(16))||(yt==Dt)){
  y=ntake(nn(x),y);
 }
 if(xn!=nn(y)){
  trap(Length);
 }
 if(t==Tt){
  if(xn>I(0)){
   xn=nn(_KJ(I64(_IK(y))));
  }
 }
 x=l2(x,y);
 SetI32(I(_IK(x)-I(12)),xn);
 return K(_KI(_IK(x))|K(_KI(t)<<K(59n)));
}
const keyt=function(x,y){
 x=rx(x);
 y=rx(y);
 return Key(Tak(x,y),Drp(x,y));
}
const Tak=function(x,y){
 let xt,yt,r4
 xt=tp(x);
 yt=tp(y);
 if(yt==Dt){
  x=rx(x);
  if(xt==it){
   r4=x0(y);
   y=r1(y);
   r4=Tak(x,r4);
   y=Tak(x,y);
   return Key(r4,y);
  } else {
   return Key(x,Atx(y,x));
  }
 } else {
  if(yt==Tt){
   if(I(xt&I(15))==st){
    if(xt==st){
     x=Enl(x);
    }
    x=rx(x);
    return key(x,Atx(y,x),yt);
   } else {
    return Ecr(K(15n),l2(x,y));
   }
  }
 }
 if(xt==it){
  return ntake(_IK(x),y);
 }
 y=rx(y);
 if((xt>I(16))&&(xt==yt)){
  return atv(y,Wer(In(y,x)));
 }
 return Atx(y,Wer(Cal(x,l1(y))));
}
const ntake=function(n,y){
 let r,t,yp,s13,rp13,i17,rp20,f20,i21,rp24,re24,im24,i25,rp28,i29,yn
 r=K(0n);
 t=tp(y);
 if(n==nai){
  n=(t<I(16))?(I(1)):(nn(y));
 }
 if(n<I(0)){
  if(tp(y)<I(16)){
   return ntake(I(-n),y);
  }
  n=I(n+nn(y));
  if(n<I(0)){
   return ucat(ntake(I(-n),missing(I(t-I(16)))),y);
  }
  return ndrop(n,y);
 }
 yp=_IK(y);
 if(t<I(5)){
  t+=16;
  r=mk(t,n);
  s13=sz(t);
  rp13=_IK(r);
  if(s13==I(1)){
   Memoryfill(rp13,yp,n);
  } else {
   i17=I(0);
   for(;(i17<n);i17++){
    SetI32(rp13,yp);
    rp13+=4;
   }
  }
  return r;
 } else {
  if(t==ft){
   r=mk(Ft,n);
   rp20=_IK(r);
   f20=F64(yp);
   {
    i21=I(0);
    for(;(i21<n);i21++){
     SetF64(rp20,f20);
     rp20+=8;
    }
   }
   dx(y);
   return r;
  } else {
   if(t==zt){
    r=mk(Zt,n);
    rp24=_IK(r);
    {
     re24=F64(yp);
     im24=F64(I(yp+I(8)));
    }
    {
     i25=I(0);
     for(;(i25<n);i25++){
      SetF64(rp24,re24);
      SetF64(I(rp24+I(8)),im24);
      rp24+=16;
     }
    }
    dx(y);
    return r;
   } else {
    if(t<I(16)){
     r=mk(Lt,n);
     rp28=_IK(r);
     {
      i29=I(0);
      for(;(i29<n);i29++){
       SetI64(rp28,_JK(rx(y)));
       rp28+=8;
      }
     }
     dx(y);
     return r;
    }
   }
  }
 }
 r=seq(n);
 yn=nn(y);
 if((n>yn)&&(yn>I(0))){
  r=idiv(r,Ki(yn),I(1));
 }
 return atv(y,r);
}
const Drp=function(x,y){
 let xt,yt,r4
 xt=tp(x);
 yt=tp(y);
 if(yt>Lt){
  if((yt==Dt)||((yt==Tt)&&(I(xt&I(15))==st))){
   r4=x0(y);
   y=r1(y);
   if(xt<I(16)){
    x=Enl(x);
   }
   x=rx(Wer(Not(In(rx(r4),x))));
   return key(Atx(r4,x),Atx(y,x),yt);
  } else {
   return Ecr(K(16n),l2(x,y));
  }
 }
 if(xt==it){
  return ndrop(_IK(x),y);
 }
 if((xt>I(16))&&(xt==yt)){
  return atv(y,Wer(Not(In(rx(y),x))));
 }
 if(yt==it){
  return atv(x,Wer(Not(Eql(y,seq(nn(x))))));
 }
 return Atx(y,Wer(Not(Cal(x,l1(rx(y))))));
}
const ndrop=function(n,y){
 let r,yt,yn,rn,s,yp,rp
 r=K(0n);
 yt=tp(y);
 if((yt<I(16))||(yt>Lt)){
  trap(Type);
 }
 yn=nn(y);
 if(n<I(0)){
  return ntake(maxi(I(0),I(yn+n)),y);
 }
 rn=I(yn-n);
 if(rn<I(0)){
  dx(y);
  return mk(yt,I(0));
 }
 s=sz(yt);
 yp=_IK(y);
 if(((I32(I(yp-I(4)))==I(1))&&(bucket(I(s*yn))==bucket(I(s*rn))))&&(yt<Lt)){
  r=rx(y);
  SetI32(I(yp-I(12)),rn);
 } else {
  r=mk(yt,rn);
 }
 rp=_IK(r);
 Memorycopy(rp,I(yp+I(s*n)),I(s*rn));
 if(yt==Lt){
  rl(r);
  r=uf(r);
 }
 dx(y);
 return r;
}
const Cut=function(x,y){
 let yt,xt,xp,r,rp,e,n
 yt=tp(y);
 if((yt==it)||(yt==ft)){
  return Pow(y,x);
 }
 xt=tp(x);
 if(xt==It){
  return cuts(x,y);
 }
 if((xt==Ct)&&(yt==Ct)){
  x=rx(Wer(In(rx(y),x)));
  return rcut(y,Cat(Ki(I(0)),Add(Ki(I(1)),x)),Cat(x,Ki(nn(y))));
 }
 if((xt!=it)||(yt<I(16))){
  trap(Type);
 }
 xp=_IK(x);
 if(xp<=I(0)){
  xp=I(nn(y)/I(-xp));
 }
 r=mk(Lt,xp);
 rp=_IK(r);
 e=ep(r);
 n=I(nn(y)/xp);
 x=seq(n);
 do{
  SetI64(rp,_JK(atv(rx(y),rx(x))));
  x=Add(Ki(n),x);
  rp+=8;
 }while(rp<e);
 dx(x);
 dx(y);
 return r;
}
const cuts=function(x,y){
 return rcut(y,x,cat1(ndrop(I(1),rx(x)),Ki(nn(y))));
}
const rcut=function(x,a,b){
 let n,ap,bp,r,rp,i1,o2,n2
 n=nn(a);
 {
  ap=_IK(a);
  bp=_IK(b);
 }
 r=mk(Lt,n);
 rp=_IK(r);
 {
  i1=I(0);
  for(;(i1<n);i1++){
   o2=I32(ap);
   n2=I(I32(bp)-o2);
   if(n2<I(0)){
    trap(Value);
   }
   SetI64(rp,_JK(atv(rx(x),Add(Ki(o2),seq(n2)))));
   rp+=8;
   ap+=4;
   bp+=4;
  }
 }
 dx(a);
 dx(b);
 dx(x);
 return r;
}
const split=function(x,y){
 let xt,yt,xn
 {
  xt=tp(x);
  yt=tp(y);
 }
 xn=I(1);
 if(yt==I(xt+I(16))){
  x=Wer(Eql(x,rx(y)));
 } else {
  if((xt==yt)&&(xt==Ct)){
   xn=nn(x);
   x=Find(x,rx(y));
  } else {
   trap(Type);
  }
 }
 x=rx(x);
 return rcut(y,Cat(Ki(I(0)),Add(Ki(xn),x)),cat1(x,Ki(nn(y))));
}
const join=function(x,y){
 let xt,yt,yp,yn,r,i5,v6
 xt=tp(x);
 if(xt<I(16)){
  x=Enl(x);
  xt=tp(x);
 }
 yt=tp(y);
 if(yt!=Lt){
  trap(Type);
 }
 yp=_IK(y);
 yn=nn(y);
 r=mk(xt,I(0));
 {
  i5=I(0);
  for(;(i5<yn);i5++){
   v6=x0(_KI(yp));
   if(tp(v6)!=xt){
    trap(Type);
   }
   if(i5>I(0)){
    r=ucat(r,rx(x));
   }
   r=ucat(r,v6);
   yp+=8;
  }
 }
 dx(x);
 dx(y);
 return r;
}
const lin=function(x,y,z){
 return cal(Val(Ks(I(112))),l3(x,y,z));
}
const Bin=function(x,y){
 let r,xt,yt
 r=K(0n);
 xt=tp(x);
 yt=tp(y);
 if((xt<I(16))||(xt>Ft)){
  return ((xt==it)&&(yt>I(16)))?(win(_IK(x),y)):(trap(Type));
 }
 if((xt==yt)||(yt==Lt)){
  return Ecr(K(40n),l2(x,y));
 } else {
  if(xt==I(yt+I(16))){
   r=Ki(ibin(x,y,xt));
  } else {
   trap(Type);
  }
 }
 dx(x);
 dx(y);
 return r;
}
const ibin=function(x,y,t){
 let h,k,n,xp,yp,j,s,f18
 h=I(0);
 k=I(0);
 n=nn(x);
 xp=_IK(x);
 yp=_IK(y);
 j=I(n-I(1));
 s=sz(t);
 switch(I(s>>I(2))){
  case 0:for(;;){
   if(k>j){
    return I(k-I(1));
   }
   h=I(I(k+j)>>I(1));
   if(I8(I(xp+h))>yp){
    j=I(h-I(1));
   } else {
    k=I(h+I(1));
   }
  }
  break;
  case 1:for(;;){
   if(k>j){
    return I(k-I(1));
   }
   h=I(I(k+j)>>I(1));
   if(I32(I(xp+I(I(4)*h)))>yp){
    j=I(h-I(1));
   } else {
    k=I(h+I(1));
   }
  }
  break;
  default:{
   f18=F64(yp);
   for(;;){
    if(k>j){
     return I(k-I(1));
    }
    h=I(I(k+j)>>I(1));
    if(F64(I(xp+I(I(8)*h)))>f18){
     j=I(h-I(1));
    } else {
     k=I(h+I(1));
    }
   }
  }
  break;
 } 
 return I(0);
}
const win=function(n,x){
 let y,r,m,i1
 y=seq(n);
 r=mk(Lt,I(0));
 m=I(I(I(1)+nn(x))-n);
 {
  i1=I(0);
  for(;(i1<m);i1++){
   r=ucat(r,l1(atv(rx(x),rx(y))));
   y=Add(Ki(I(1)),y);
  }
 }
 dx(x);
 dx(y);
 return r;
}
const Flr=function(x){
 let r,rp,xt,xp,xn,e12,i17,i20
 r=K(0n);
 rp=I(0);
 xt=tp(x);
 xp=_IK(x);
 if(xt<I(16)){
  switch(I(xt-I(2))){
   case 0:return Kc(lc(xp));
   break;
   case 1:return Kc(xp);
   break;
   case 2:return Ki(xp);
   break;
   case 3:{
    dx(x);
    return Ki(_IF(F64floor(F64(xp))));
   }
   break;
   case 4:{
    dx(x);
    return Kf(F64(xp));
   }
   break;
   default:return x;
   break;
  }
 }
 xn=nn(x);
 switch(I(xt-I(18))){
  case 0:return lower(x);
  break;
  case 1:{
   r=mk(Ct,xn);
   rp=_IK(r);
   e12=I(rp+xn);
   for(;(rp<e12);){
    SetI8(rp,I32(xp));
    xp+=4;
    rp++;
   }
  }
  break;
  case 2:{
   x=use(x);
   return K(_KI(_IK(x))|K(_KI(It)<<K(59n)));
  }
  break;
  case 3:{
   r=mk(It,xn);
   rp=_IK(r);
   {
    i17=I(0);
    for(;(i17<xn);i17++){
     SetI32(rp,_IF(F64floor(F64(xp))));
     xp+=8;
     rp+=4;
    }
   }
  }
  break;
  case 4:{
   r=mk(Ft,xn);
   rp=_IK(r);
   {
    i20=I(0);
    for(;(i20<xn);i20++){
     SetI64(rp,I64(xp));
     xp+=16;
     rp+=8;
    }
   }
  }
  break;
  default:return Ech(K(16n),l1(x));
  break;
 } 
 dx(x);
 return r;
}
const lower=function(x){
 let p,e
 x=use(x);
 p=_IK(x);
 e=I(p+nn(x));
 for(;(p<e);){
  SetI8(p,lc(I8(p)));
  p++;
 }
 return x;
}
const lc=function(x){
 return ((x>=I(65))&&(x<=I(90)))?(I(x+I(32))):(x);
}
const Rev=function(x){
 let r,t,xn,rp,i7
 r=K(0n);
 t=tp(x);
 if(t<I(16)){
  return x;
 }
 if(t==Dt){
  r=x0(x);
  return Key(Rev(r),Rev(r1(x)));
 }
 xn=nn(x);
 if(xn<I(2)){
  return x;
 }
 r=mk(It,xn);
 rp=I(_IK(r)+I(I(4)*xn));
 {
  i7=I(0);
  for(;(i7<xn);i7++){
   rp=I(rp-I(4));
   SetI32(rp,i7);
  }
 }
 return atv(x,r);
}
const Wer=function(x){
 let r,t,xn,xp,n6,rp6,i7,j8,k9
 r=K(0n);
 t=tp(x);
 if(t<I(16)){
  x=Enl(x);
  t=tp(x);
 }
 if(t==Dt){
  r=x0(x);
  return Atx(r,Wer(r1(x)));
 }
 xn=nn(x);
 xp=_IK(x);
 if(t==It){
  n6=sumi(xp,xn);
  r=mk(It,n6);
  rp6=_IK(r);
  {
   i7=I(0);
   for(;(i7<xn);i7++){
    j8=I32(xp);
    {
     k9=I(0);
     for(;(k9<j8);k9++){
      SetI32(rp6,i7);
      rp6+=4;
     }
    }
    xp+=4;
   }
  }
 } else {
  r=(xn==I(0))?(mk(It,I(0))):(trap(Type));
 }
 dx(x);
 return r;
}
const Fwh=function(x){
 let t
 t=tp(x);
 if(t==It){
  dx(x);
  return Ki(fwh(_IK(x),nn(x)));
 }
 return Fst(Wer(x));
}
const fwh=function(xp,n){
 let p,e
 p=xp;
 e=I(xp+I(I(4)*n));
 for(;(p<e);){
  if(I8(p)!=I(0)){
   return I(I(p-xp)>>I(2));
  }
  p+=4;
 }
 return nai;
}
const Typ=function(x){
 dx(x);
 return sc(Enl(Kc(I8(I(I(520)+tp(x))))));
}
const Tok=function(x){
 return (tp(x)==Ct)?(tok(x)):(x);
}
const Val=function(x){
 let r,xt
 r=K(0n);
 xt=tp(x);
 if(xt==st){
  return lup(x);
 }
 if(xt==Ct){
  return val(x);
 }
 if((xt==lf)||(xt==xf)){
  r=l2(x0(x),x1(x));
  if(xt==lf){
   r=cat1(r,x2(x));
  }
  r=cat1(r,Ki(nn(x)));
  dx(x);
  return r;
 }
 if(xt==Lt){
  return exec(x);
 }
 if(xt>Lt){
  r=x1(x);
  dx(x);
  return r;
 } else {
  return trap(Type);
 }
}
const val=function(x){
 let xn,xp,a
 x=parse(tok(x));
 xn=nn(x);
 xp=I(_IK(x)+I(I(8)*I(xn-I(1))));
 a=I(0);
 if((xn>I(2))&&(I64(xp)==J(64n))){
  a=I(1);
 }
 x=exec(x);
 if(a!=I(0)){
  dx(x);
  return K(0n);
 }
 return x;
}
const Enc=function(x,y){
 let xt,n,r,yn,xi4
 xt=tp(x);
 n=I(0);
 if(xt==It){
  n=nn(x);
 }
 r=mk(It,I(0));
 yn=_IK(Cnt(rx(y)));
 for(;;){
  n=I(n-I(1));
  xi4=ati(rx(x),n);
  r=Cat(r,Enl(idiv(rx(y),xi4,I(1))));
  y=idiv(y,xi4,I(0));
  if((n==I(0))||((n<I(0))&&(_IK(y)==I(0)))){
   break;
  }
  if((tp(y)>I(16))&&(n<I(0))){
   if(sumi(_IK(y),yn)==I(0)){
    break;
   }
  }
 }
 dx(x);
 dx(y);
 return Rev(r);
}
const Dec=function(x,y){
 let r,n,i3
 if(tp(y)<I(16)){
  trap(Type);
 }
 r=Fst(rx(y));
 n=nn(y);
 {
  i3=I(1);
  for(;(i3<n);i3++)r=Add(ati(rx(y),i3),Mul(ati(rx(x),i3),r));
 }
 dx(x);
 dx(y);
 return r;
}
const sumi=function(xp,xn){
 let r,e
 r=I(0);
 e=I(xp+I(I(4)*xn));
 for(;(xp<e);){
  r=I(r+I32(xp));
  xp+=4;
 }
 return r;
}
const zk=function(){
 let zn,x
 zn=I(1678);
 x=mk(Ct,zn);
 Memorycopy(_IK(x),I(600),zn);
 dx(Val(x));
}
const init=function(){
 Memory(1);
 Memory2(1);
 _I8.set([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,64,1,1,1,1,9,16,96,1,1,1,1,1,9,-60,-60,-60,-60,-60,-60,-60,-60,-60,-60,1,32,1,1,1,1,1,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,16,9,96,1,1,0,-62,-62,-62,-62,-62,-62,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,66,16,1,96,1,0,58,43,45,42,37,38,124,60,62,61,126,33,44,94,35,95,36,63,64,46,39,58,47,58,92,58,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,118,98,99,105,115,102,122,108,100,116,109,100,112,108,120,48,48,66,67,73,83,70,90,76,68,84,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,96,120,96,121,96,122,96,107,96,108,96,97,96,98,96,119,104,105,108,101,96,34,114,102,46,34,96,34,114,122,46,34,96,34,117,113,115,46,34,96,34,117,113,102,46,34,96,34,103,100,116,46,34,96,34,108,105,110,46,34,96,34,111,100,111,46,34,96,34,103,114,112,46,34,10,96,34,120,46,34,58,123,44,47,43,34,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,34,64,40,120,37,49,54,59,49,54,47,120,58,50,53,54,47,50,53,54,43,120,41,125,10,96,34,116,46,34,58,96,52,53,10,96,34,112,46,34,58,96,52,54,10,96,34,99,46,34,58,40,96,52,54,41,91,96,99,59,93,10,96,34,105,46,34,58,40,96,52,54,41,91,96,105,59,93,10,96,34,115,46,34,58,40,96,52,54,41,91,96,115,59,93,10,96,34,102,46,34,58,40,96,52,54,41,91,96,102,59,93,10,96,34,122,46,34,58,40,96,52,54,41,91,96,122,59,93,10,96,34,117,113,115,46,34,58,123,120,64,38,126,48,126,39,58,120,58,94,120,125,10,96,34,117,113,102,46,34,58,123,120,64,38,40,33,35,120,41,61,120,63,120,125,10,96,34,103,100,116,46,34,58,123,91,116,59,103,93,40,33,35,116,41,40,36,91,103,59,123,120,64,62,121,32,120,125,59,123,120,64,60,121,32,120,125,93,41,47,124,46,116,125,10,96,34,111,100,111,46,34,58,123,123,121,64,40,35,121,41,47,33,120,125,47,58,91,42,47,120,59,38,39,120,35,39,124,42,92,45,49,95,49,44,124,120,93,125,10,96,34,103,114,112,46,34,58,123,40,120,64,42,39,103,41,33,103,58,40,38,126,120,126,39,58,120,32,105,41,94,105,58,60,120,125,10,97,98,115,58,96,51,50,59,115,105,110,58,96,52,52,59,99,111,115,58,96,51,57,59,102,105,110,100,58,96,51,49,59,105,109,97,103,58,96,51,51,59,99,111,110,106,58,96,51,52,59,97,110,103,108,101,58,96,51,53,59,101,120,112,58,96,52,50,59,108,111,103,58,96,52,51,10,96,34,112,97,100,46,34,58,123,120,64,92,58,33,124,47,35,39,120,125,10,96,34,108,120,121,46,34,58,123,10,107,116,58,123,91,120,59,121,59,107,59,84,93,120,58,36,91,96,84,126,64,120,59,84,91,120,59,107,93,59,96,112,97,100,40,34,34,59,34,45,34,41,44,36,120,93,59,40,120,44,39,34,124,34,41,44,39,84,91,121,59,107,93,125,10,100,58,123,91,120,59,107,59,107,116,59,84,93,114,58,33,120,59,120,58,46,120,59,36,91,96,84,126,64,120,59,107,116,91,114,59,120,59,107,59,84,93,59,44,39,91,44,39,91,96,112,97,100,40,107,39,114,41,59,34,124,34,93,59,107,39,120,93,93,125,10,84,58,123,91,120,59,107,93,36,91,96,76,39,58,64,39,46,120,59,44,107,32,120,59,40,44,42,120,41,44,40,44,40,35,42,120,41,35,34,45,34,41,44,49,95,120,58,34,32,34,47,58,39,43,96,112,97,100,64,39,36,40,33,120,41,44,39,46,120,93,125,10,116,58,64,121,59,107,58,96,107,120,121,64,42,120,59,104,58,42,124,120,10,100,100,58,40,34,34,59,44,34,46,46,34,41,104,60,35,121,58,36,91,40,64,121,41,39,58,96,76,96,68,96,84,59,121,59,121,126,42,121,59,121,59,91,116,58,96,76,59,44,121,93,93,10,121,58,36,91,121,126,42,121,59,121,59,40,104,38,35,121,41,35,121,93,10,36,91,96,68,126,116,59,100,91,121,59,107,59,107,116,59,84,93,59,96,84,126,116,59,84,91,121,59,107,93,59,121,126,42,121,59,44,107,32,121,59,107,39,121,93,44,100,100,125,10,96,34,108,46,34,58,96,108,120,121,32,55,48,32,50,48,10,96,34,115,116,114,46,34,58,123,113,58,123,99,44,40,34,92,92,34,47,58,40,48,44,105,41,94,64,91,120,59,105,59,40,113,115,33,34,116,110,114,92,34,92,92,34,41,120,32,105,58,38,120,39,58,113,115,58,34,92,116,92,110,92,114,92,34,92,92,34,93,41,44,99,58,95,51,52,125,10,36,91,124,47,120,39,58,34,92,116,92,110,92,114,34,95,95,33,51,49,59,34,48,120,34,44,96,120,64,120,59,113,32,120,93,125,10,96,34,107,120,121,46,34,58,123,10,97,58,123,116,58,64,120,59,120,58,36,120,59,36,91,96,99,126,116,59,96,115,116,114,32,120,59,96,115,126,116,59,34,96,34,44,120,59,120,93,125,10,100,58,123,91,120,59,107,93,114,58,34,33,34,44,107,64,46,120,59,110,58,35,33,120,59,120,58,107,64,33,120,59,36,91,40,110,60,50,41,124,40,64,46,120,41,39,58,96,68,96,84,59,34,40,34,44,120,44,34,41,34,59,120,93,44,114,125,10,118,58,123,91,120,59,107,59,109,93,116,58,64,120,59,120,58,40,109,38,110,58,35,120,41,35,120,10,120,58,36,91,96,76,126,116,59,107,39,120,59,96,67,126,116,59,120,59,36,120,93,10,120,58,36,91,96,67,126,116,59,96,115,116,114,32,120,59,96,83,126,116,59,99,44,40,99,58,34,96,34,41,47,58,120,59,96,76,126,116,59,36,91,49,126,110,59,42,120,59,34,40,34,44,40,34,59,34,47,58,120,41,44,34,41,34,93,59,34,32,34,47,58,120,93,10,36,91,109,60,35,120,58,40,40,34,34,59,34,44,34,41,40,49,126,110,41,41,44,120,59,40,40,109,45,50,41,35,120,41,44,34,46,46,34,59,120,93,125,10,116,58,64,121,59,107,58,96,107,120,121,32,120,10,36,91,96,84,126,116,59,34,43,34,44,100,91,43,121,59,107,93,59,96,68,126,116,59,100,91,121,59,107,93,59,48,126,35,121,59,40,46,96,34,46,107,115,116,48,34,41,64,116,59,121,126,42,121,59,97,32,121,59,118,91,121,59,107,59,120,93,93,125,10,96,34,46,107,115,116,48,34,58,96,67,96,73,96,83,96,70,96,90,96,76,33,40,99,44,99,58,95,51,52,59,34,33,48,34,59,34,48,35,96,34,59,34,48,35,48,46,34,59,34,48,35,48,97,34,59,34,40,41,34,41,10,96,34,107,46,34,58,96,107,120,121,32,49,48,48,48,48,48,48,10,96,34,114,102,46,34,58,32,123,46,53,43,40,120,63,48,41,37,52,50,57,52,57,54,55,50,57,53,46,125,10,96,34,114,102,49,46,34,58,123,46,53,43,40,49,46,43,120,63,48,41,37,52,50,57,52,57,54,55,50,57,53,46,125,32,32,32,32,32,32,32,32,10,96,34,114,122,46,34,58,32,123,40,37,45,50,42,108,111,103,32,96,114,102,49,32,120,41,64,51,54,48,46,42,96,114,102,32,120,125,10,96,34,108,105,110,46,34,58,123,36,91,96,76,126,64,122,59,40,46,96,34,108,105,110,46,34,41,91,120,59,121,93,39,122,59,91,100,120,58,48,46,43,49,95,45,39,58,120,59,100,121,58,48,46,43,49,95,45,39,58,121,59,98,58,40,45,50,43,35,120,41,38,48,124,120,39,122,59,40,121,32,98,41,43,40,100,121,32,98,41,42,40,122,45,120,32,98,41,37,100,120,32,98,93,93,125,10])
 _F=Array(379);
 _F[0]=nul;
 _F[1]=Idy;
 _F[2]=Flp;
 _F[3]=Neg;
 _F[4]=Fst;
 _F[5]=Sqr;
 _F[6]=Wer;
 _F[7]=Rev;
 _F[8]=Asc;
 _F[9]=Dsc;
 _F[10]=Grp;
 _F[11]=Not;
 _F[12]=Til;
 _F[13]=Enl;
 _F[14]=Srt;
 _F[15]=Cnt;
 _F[16]=Flr;
 _F[17]=Str;
 _F[18]=Unq;
 _F[19]=Typ;
 _F[20]=Val;
 _F[21]=ech;
 _F[22]=ecp;
 _F[23]=rdc;
 _F[24]=ecr;
 _F[25]=scn;
 _F[26]=ecl;
 _F[27]=lst;
 _F[28]=Kst;
 _F[29]=Out;
 _F[30]=nyi;
 _F[31]=nyi;
 _F[32]=Abs;
 _F[33]=Img;
 _F[34]=Cnj;
 _F[35]=Ang;
 _F[36]=nyi;
 _F[37]=Uqs;
 _F[38]=nyi;
 _F[39]=Cos;
 _F[40]=Fwh;
 _F[41]=Las;
 _F[42]=Exp;
 _F[43]=Log;
 _F[44]=Sin;
 _F[45]=Tok;
 _F[46]=Prs;
 _F[64]=Asn;
 _F[65]=Dex;
 _F[66]=Add;
 _F[67]=Sub;
 _F[68]=Mul;
 _F[69]=Div;
 _F[70]=Min;
 _F[71]=Max;
 _F[72]=Les;
 _F[73]=Mor;
 _F[74]=Eql;
 _F[75]=Mtc;
 _F[76]=Key;
 _F[77]=Cat;
 _F[78]=Cut;
 _F[79]=Tak;
 _F[80]=Drp;
 _F[81]=Cst;
 _F[82]=Fnd;
 _F[83]=Atx;
 _F[84]=Cal;
 _F[85]=Ech;
 _F[86]=Ecp;
 _F[87]=Rdc;
 _F[88]=Ecr;
 _F[89]=Scn;
 _F[90]=Ecl;
 _F[91]=com;
 _F[92]=prj;
 _F[93]=Otu;
 _F[94]=In;
 _F[95]=Find;
 _F[96]=Hyp;
 _F[97]=Cpx;
 _F[98]=nyi;
 _F[99]=Rot;
 _F[100]=Enc;
 _F[101]=Dec;
 _F[102]=nyi;
 _F[103]=nyi;
 _F[104]=Bin;
 _F[105]=Mod;
 _F[106]=Pow;
 _F[107]=Lgn;
 _F[108]=nyi;
 _F[109]=nyi;
 _F[110]=Rtp;
 _F[193]=tchr;
 _F[194]=tnms;
 _F[195]=tvrb;
 _F[196]=tpct;
 _F[197]=tvar;
 _F[198]=tsym;
 _F[211]=Amd;
 _F[212]=Dmd;
 _F[220]=negi;
 _F[221]=negf;
 _F[222]=negz;
 _F[223]=negC;
 _F[224]=negI;
 _F[225]=negF;
 _F[226]=negZ;
 _F[227]=absi;
 _F[228]=absf;
 _F[229]=nyi;
 _F[230]=absC;
 _F[231]=absI;
 _F[232]=absF;
 _F[233]=absZ;
 _F[234]=addi;
 _F[235]=addf;
 _F[236]=addz;
 _F[237]=addcC;
 _F[238]=addiI;
 _F[239]=addfF;
 _F[240]=addzZ;
 _F[241]=addC;
 _F[242]=addI;
 _F[243]=addF;
 _F[244]=addF;
 _F[245]=subi;
 _F[246]=subf;
 _F[247]=nyi;
 _F[248]=subcC;
 _F[249]=subiI;
 _F[250]=subfF;
 _F[251]=subzZ;
 _F[252]=subC;
 _F[253]=subI;
 _F[254]=subF;
 _F[255]=subF;
 _F[256]=muli;
 _F[257]=mulf;
 _F[258]=mulz;
 _F[259]=mulcC;
 _F[260]=muliI;
 _F[261]=mulfF;
 _F[262]=mulzZ;
 _F[263]=mulC;
 _F[264]=mulI;
 _F[265]=mulF;
 _F[266]=mulZ;
 _F[267]=divi;
 _F[268]=divf;
 _F[269]=divz;
 _F[270]=nyi;
 _F[271]=nyi;
 _F[272]=divfF;
 _F[273]=divzZ;
 _F[274]=nyi;
 _F[275]=nyi;
 _F[276]=divF;
 _F[277]=divZ;
 _F[278]=mini;
 _F[279]=minf;
 _F[280]=minz;
 _F[281]=mincC;
 _F[282]=miniI;
 _F[283]=minfF;
 _F[284]=minzZ;
 _F[285]=minC;
 _F[286]=minI;
 _F[287]=minF;
 _F[288]=minZ;
 _F[289]=maxi;
 _F[290]=maxf;
 _F[291]=maxz;
 _F[292]=maxcC;
 _F[293]=maxiI;
 _F[294]=maxfF;
 _F[295]=maxzZ;
 _F[296]=maxC;
 _F[297]=maxI;
 _F[298]=maxF;
 _F[299]=maxZ;
 _F[300]=nyi;
 _F[301]=sqrf;
 _F[302]=nyi;
 _F[303]=nyi;
 _F[304]=nyi;
 _F[305]=sqrF;
 _F[306]=nyi;
 _F[308]=lti;
 _F[309]=ltf;
 _F[310]=ltz;
 _F[311]=ltcC;
 _F[312]=ltiI;
 _F[313]=ltfF;
 _F[314]=ltzZ;
 _F[315]=ltCc;
 _F[316]=ltIi;
 _F[317]=ltFf;
 _F[318]=ltZz;
 _F[319]=ltC;
 _F[320]=ltI;
 _F[321]=ltF;
 _F[322]=ltZ;
 _F[323]=gti;
 _F[324]=gtf;
 _F[325]=gtz;
 _F[326]=gtcC;
 _F[327]=gtiI;
 _F[328]=gtfF;
 _F[329]=gtzZ;
 _F[330]=gtCc;
 _F[331]=gtIi;
 _F[332]=gtFf;
 _F[333]=gtZz;
 _F[334]=gtC;
 _F[335]=gtI;
 _F[336]=gtF;
 _F[337]=gtZ;
 _F[338]=eqi;
 _F[339]=eqf;
 _F[340]=eqz;
 _F[341]=eqcC;
 _F[342]=eqiI;
 _F[343]=eqfF;
 _F[344]=eqzZ;
 _F[345]=eqCc;
 _F[346]=eqIi;
 _F[347]=eqFf;
 _F[348]=eqZz;
 _F[349]=eqC;
 _F[350]=eqI;
 _F[351]=eqF;
 _F[352]=eqZ;
 _F[353]=guC;
 _F[354]=guC;
 _F[355]=guI;
 _F[356]=guI;
 _F[357]=guF;
 _F[358]=guZ;
 _F[359]=guL;
 _F[360]=gdC;
 _F[361]=gdC;
 _F[362]=gdI;
 _F[363]=gdI;
 _F[364]=gdF;
 _F[365]=gdZ;
 _F[366]=gdL;
 _F[367]=sum;
 _F[368]=rd0;
 _F[369]=prd;
 _F[370]=rd0;
 _F[371]=min;
 _F[372]=max;
 _F[374]=sums;
 _F[375]=rd0;
 _F[376]=prds;
 _F[377]=rd0;
 _F[378]=rd0;
}
