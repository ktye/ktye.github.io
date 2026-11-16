let LAPACK,SLV,LSQ,SVD,lapack=()=>{let U=()=>new Uint8Array(LAPACK.memory.buffer),I=()=>new Int32Array(LAPACK.memory.buffer),F=()=>new Float64Array(LAPACK.memory.buffer)
 let M,reset=()=>M=Number(LAPACK.__heap_base),ma=x=>{let r=M;let y=LAPACK.memory.buffer.byteLength;if(M+x>=y)console.log("overflow");M+=x;return r};
 let cha=x=>{let r=ma(8);let u=U();u[r]=x.charCodeAt(0);return r},int=x=>{let r=ma(8);let i=I();i[r>>>2]=x;return r},mat=x=>{let r=ma(8*x.length);let f=F();f.set(x,r>>>3);return r};
 SLV=(A,B)=>{reset();A=trans(A);B=trans(B),z=A.z,fn=z?LAPACK.zgesv_:LAPACK.dgesv_
  let n=int(A.n),nr=int(B.m),a=mat(A),la=int(A.n),ip=ma(8*A.n),b=mat(B),lb=int(B.n),r=int(0);
  let f=F(),i=I();fn(n,nr,a,la,ip,b,lb,r);errif(i[r>>>2],"slv");
  let x=z?zeroz(B.m,B.n):zeros(B.m,B.n);x.set(f.subarray(b>>>3,(z?2:1)*B.n*B.m+(b>>>3)))
  return trans(x)}
 LSQ=(A,B)=>{reset();A=trans(A);B=trans(B),z=A.z,fn=z?LAPACK.zgels_:LAPACK.dgels_
  let t=cha("N"),m=int(A.n),n=int(A.m),nr=int(B.m),a=mat(A),la=m,b=mat(B),lb=int(B.n),w=int(0),lw=int(-1),r=int(0);
  let u=U(),f=F(),i=I();fn(t,m,n,nr,a,la,b,lb,w,lw,r,1);errif(i[r>>>2],"lsq");let s=f[w>>>3];i[lw>>>2]=s;w=ma(f[w>>>3]);i=I();f=F();
  fn(t,m,n,nr,a,la,b,lb,w,lw,r,1);errif(i[r>>>2],"lsq");
  let x=z?zeroz(B.m,B.n):zeros(B.m,B.n);x.set(f.subarray(b>>>3,(z?2:1)*B.n*B.m+(b>>>3)))
  return trans(col(x,til(A.m)))}
 SVD=(A,S)=>{reset();A=trans(A),z=A.z,fn=z?LAPACK.zgesvd_:LAPACK.dgesvd_
  let ju=cha(S?"N":"O"),jv=cha(S?"N":"S"),m=int(A.n),n=int(A.m),a=mat(A),la=m,k=min(A.m,A.n),s=ma(8*k),u=0,lu=la
  let v=S?0:ma((z?16:8)*A.m*k),lv=int(k),w=ma(8),lw=int(-1),rw=z?ma(8*5*k):0,r=int(0),i=I(),f=F();
  fn(ju,jv,m,n,a,la,s,u,lu,v,lv,w,lw,...(z?[rw,r,1,1]:[r,1,1]));errif(i[r>>>2],"svd: "+i[r>>>2]);i[lw>>>2]=f[w>>>3];w=ma(f[w>>>3]);f=F();i=I();
  fn(ju,jv,m,n,a,la,s,u,lu,v,lv,w,lw,...(z?[rw,r,1,1]:[r,1,1]));errif(i[r>>>2],"svd: "+i[r>>>2]);
  let sigma=zeros(k,1);sigma.set(f.subarray(s>>>3,(s>>>3)+k));if(S)return sigma;
  let VT=z?zeroz(A.m,k):zeros(A.m,k);VT.set(f.subarray(v>>>3,VT.length+(v>>>3)));
  A.set(f.subarray(a>>>3,(a>>>3)+A.length));
  return[trans(row(A,til(k))),sigma,z?conj(VT):VT]}
 let sn=(x,n)=>{let u=U();return new TextDecoder().decode(u.subarray(x,x+n))}
 let e={env:{pow:Math.pow,logf:Math.log,xerbla_:(x,y,z)=>{let i=I();errif(1,"xerbla "+sn(x,z)+" "+i[y>>>2])}}};
 fetch("http://localhost:3000/mat/lapack.wasm").then(r=>r.arrayBuffer()).then(r=>{LAPACK=new WebAssembly.Instance(new WebAssembly.Module(r),e).exports;reset();
  LSQ(randn(4,3),randn(4,5))})}
let testlapack=()=>{let x,A,X,U,S,V,e0,e1,e2,e3,e4,e5,e6,e7
 A=randn(5,5),X=randn(5,3),B=dot(A,X),x=SLV(A,B),e0=Max(Abs(sub(x,X)))
 A=randz(5,5),X=randz(5,3),B=dot(A,X),x=SLV(A,B),e1=Max(Abs(sub(x,X)))
 A=randn(9,5),X=randn(5,3),B=dot(A,X),x=LSQ(A,B),e2=Max(Abs(sub(x,X)))
 A=randz(9,5),X=randz(5,3),B=dot(A,X),x=LSQ(A,B),e3=Max(Abs(sub(x,X)))
 A=randn(5,3),[U,S,V]=SVD(A),e4=Max(Abs(sub(A,dot(dot(U,diag(S)),trans(V)))))
 A=randn(3,5),[U,S,V]=SVD(A),e5=Max(Abs(sub(A,dot(dot(U,diag(S)),trans(V)))))
 A=randz(5,3),[U,S,V]=SVD(A),e6=Max(Abs(sub(A,dot(dot(U,diag(S)),herm(V)))))
 A=randz(3,5),[U,S,V]=SVD(A),e7=Max(Abs(sub(A,dot(dot(U,diag(S)),herm(V)))))
 return max(e0,e1,e2,e3,e4,e5,e6,e7)}
 