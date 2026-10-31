#define I int
#define D double
#define V void
#ifndef BLAS_H
#define BLAS_H
typedef enum CBLAS_LAYOUT{/*CblasRowMajor=101,*/CblasColMajor=102} CBLAS_LAYOUT;
typedef enum CBLAS_TRANSPOSE{CblasNoTrans=111,CblasTrans=112, CblasConjTrans=113} CBLAS_TRANSPOSE;
typedef enum CBLAS_UPLO{CblasUpper=121,CblasLower=122} CBLAS_UPLO;
typedef enum CBLAS_DIAG{CblasNonUnit=131,CblasUnit=132} CBLAS_DIAG;
typedef enum CBLAS_SIDE{CblasLeft=141,CblasRight=142} CBLAS_SIDE;
D cblas_dcabs1(V*z);
D cblas_ddot(I N,D*X,I dx,D*Y,I dy);
V cblas_zdotu_sub(I N,V*X,I dx,V*Y,I dy,V*dotu);
V cblas_zdotc_sub(I N,V*X,I dx,V*Y,I dy,V*dotc);
D cblas_dnrm2(I N,D*X,I dx);
D cblas_dasum(I N,D*X,I dx);
D cblas_dznrm2(I N,V*X,I dx);
D cblas_dzasum(I N,V*X,I dx);
I cblas_idamax(I N,D*X,I dx);
I cblas_izamax(I N,V*X,I dx);
V cblas_dswap(I N,D*X,I dx,D*Y,I dy);
V cblas_dcopy(I N,D*X,I dx,D*Y,I dy);
V cblas_daxpy(I N,D a,D*X,I dx,D*Y,I dy);
V cblas_daxpby(I N,D a,D*X,I dx,D b,D*Y,I dy);
V cblas_zswap(I N,V*X,I dx,V*Y,I dy);
V cblas_zcopy(I N,V*X,I dx,V*Y,I dy);
V cblas_zaxpy(I N,V*a,V*X,I dx,V*Y,I dy);
V cblas_zaxpby(I N,V*a,V*X,I dx,V*b,V*Y,I dy);
V cblas_drotmg(D*d1,D*d2,D*b1,D b2,D*P);
V cblas_drotm(I N,D*X,I dx,D*Y,I dy,D*P);
V cblas_dscal(I N,D a,D*X,I dx);
V cblas_zscal(I N,V*a,V*X,I dx);
V cblas_zdscal(I N,D a,V*X,I dx);
V cblas_drotg(D*a,D*b,D*c,D*s);
V cblas_zrotg(V*a,V*b,D*c,V*s);
V cblas_drot(I N,D*X,I dx,D*Y,I dy,D c,D s);
V cblas_zdrot(I N,V*X,I dx,V*Y,I dy,D c,D s);
V cblas_dgemv(I ly,I AT,I M,I N,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dgbmv(I ly,I AT,I M,I N,I KL,I KU,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dtrmv(I ly,I ul,I AT,I d,I N,D*A,I la,D*X,I dx);
V cblas_dtbmv(I ly,I ul,I AT,I d,I N,I K,D*A,I la,D*X,I dx);
V cblas_dtpmv(I ly,I ul,I AT,I d,I N,D*Ap,D*X,I dx);
V cblas_dtrsv(I ly,I ul,I AT,I d,I N,D*A,I la,D*X,I dx);
V cblas_dtbsv(I ly,I ul,I AT,I d,I N,I K,D*A,I la,D*X,I dx);
V cblas_dtpsv(I ly,I ul,I AT,I d,I N,D*Ap,D*X,I dx);
V cblas_zgemv(I ly,I AT,I M,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zgbmv(I ly,I AT,I M,I N,I KL,I KU,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_ztrmv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ztbmv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ztpmv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_ztrsv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ztbsv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ztpsv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_dsymv(I ly,I ul,I N,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dsbmv(I ly,I ul,I N,I K,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dspmv(I ly,I ul,I N,D a,D*Ap,D*X,I dx,D b,D*Y,I dy);
V cblas_dskewsymv(I ly,I ul,I N,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dger(I ly,I M,I N,D a,D*X,I dx,D*Y,I dy,D*A,I la);
V cblas_dsyr(I ly,I ul,I N,D a,D*X,I dx,D*A,I la);
V cblas_dspr(I ly,I ul,I N,D a,D*X,I dx,D*Ap);
V cblas_dsyr2(I ly,I ul,I N,D a,D*X,I dx,D*Y,I dy,D*A,I la);
V cblas_dspr2(I ly,I ul,I N,D a,D*X,I dx,D*Y,I dy,D*A);
V cblas_dskewsyr2(I ly,I ul,I N,D a,D*X,I dx,D*Y,I dy,D*A,I la);
V cblas_zhemv(I ly,I ul,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zhbmv(I ly,I ul,I N,I K,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zhpmv(I ly,I ul,I N,V*a,V*Ap,V*X,I dx,V*b,V*Y,I dy);
V cblas_zgeru(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zgerc(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zher(I ly,I ul,I N,D a,V*X,I dx,V*A,I la);
V cblas_zhpr(I ly,I ul,I N,D a,V*X,I dx,V*A);
V cblas_zher2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zhpr2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*Ap);
V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dgemmtr(I ly,I ul,I AT,I BT,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dsymm(I ly,I Si,I ul,I M,I N,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dskewsymm(I ly,I Si,I ul,I M,I N,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dsyrk(I ly,I ul,I T,I N,I K,D a,D*A,I la,D b,D*C,I lc);
V cblas_dsyr2k(I ly,I ul,I T,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dskewsyr2k(I ly,I ul,I T,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dtrmm(I ly,I Si,I ul,I AT,I d,I M,I N,D a,D*A,I la,D*B,I lb);
V cblas_dtrsm(I ly,I Si,I ul,I AT,I d,I M,I N,D a,D*A,I la,D*B,I lb);
V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zgemmtr(I ly,I ul,I AT,I BT,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zsymm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zsyrk(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*b,V*C,I lc);
V cblas_zsyr2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_ztrmm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_ztrsm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_zhemm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zherk(I ly,I ul,I T,I N,I K,D a,V*A,I la,D b,V*C,I lc);
V cblas_zher2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,D b,V*C,I lc);
#endif
#ifdef BLAS_IMPL

#define es else
#define ef es if
#define Nx(i,N,e) for(i=0;i<(N);i++){e;}
#define Ni(N,e) Nx(i,N,e)
#define Nk(N,e) Nx(k,N,e)
#define Nij(N,J,e) Nx(i,N,Nx(j,J,e))
#define Dx0 D x=0.0
#define Dy0 D y=0.0
#define AT0 AT==CblasNoTrans
#define BT0 BT==CblasNoTrans
#define AT1 (AT==CblasTrans||AT==CblasConjTrans)
#define BT1 (BT==CblasTrans||BT==CblasConjTrans)
#define Aik A[la*i+k]
#define Ajk A[la*j+k]
#define Bij B[lb*i+j]
#define Bik B[lb*i+k]
#define Bji B[lb*j+i]
#define Bki B[lb*k+i]
#define Cij C[lc*i+j]
#define Cjk C[lc*j+k]
#define Re(A,i) ((D*)A)[2*(i)]
#define Im(A,i) ((D*)A)[1+2*(i)]
#define XRj Re(X,j)
#define XIj Im(X,j)
#define YRk Re(Y,k)
#define YIk Im(Y,k)
#define ARik Re(A,la*i+k)
#define AIik Im(A,la*i+k)
#define ARjk Re(A,la*j+k)
#define AIjk Im(A,la*j+k)
#define BRij Re(B,lb*i+j)
#define BIij Im(B,lb*i+j)
#define BRik Re(B,lb*i+k)
#define BIik Im(B,lb*i+k)
#define BRji Re(B,lb*j+i)
#define BIji Im(B,lb*j+i)
#define BRki Re(B,lb*k+i)
#define BIki Im(B,lb*k+i)
#define CRij Re(C,lc*i+j)
#define CIij Im(C,lc*i+j)
#define CRjk Re(C,lc*j+k)
#define CIjk Im(C,lc*j+k)
#define OF(N,d) ((d)>0?0:((N)-1)*(-(d)))

V cblas_dcopy(I N,D*X,I dx,D*Y,I dy){I i,j=OF(N,dx),k=OF(N,dy);Ni(N,Y[k]=X[j];j+=dx;k+=dy)}
V cblas_zcopy(I N,V*X,I dx,V*Y,I dy){I i,j=OF(N,dx),k=OF(N,dx);Ni(N,YRk=XRj;YIk=XIj;j+=dx;k+=dy)}
V cblas_dscal(I N,D a,D*X,I dx){I i,j=0;if(dx<=0)return;Ni(N,X[j]*=a;j+=dx)}
V cblas_zscal(I N,V*a,V*X,I dx){I i,j=0;D ar=Re(a,0),ai=Im(a,0);if(dx<=0)return;Ni(N, D x=XRj;D y=XIj;XRj=x*ar-y*ai;XIj=x*ai+y*ar;j+=dx)}
V cblas_zdscal(I N,D a,V*X,I dx){I i,j=0;if(dx<=0)return;Ni(N,XRj*=a;XIj*=a;j+=dx)}

V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc){I i,j,k;
  if(!b      ){Nij(N,M,Cij=0)}ef(b!=1.0){Nij(N,M,Cij*=b)}if(!a)return;
  if(BT0&&AT0){Nij(K,N,D t=a*Bji;if(t){Nx(k,M,Cjk+=t*Aik)})}
  ef(BT0&&AT1){Nij(N,M,D t=0.0;Nx(k,K,t+=Bik*Ajk)C[lc*i+j]+=a*t)}
  ef(BT1&&AT0){Nij(K,N,D t=a*Bij;if(t)Nx(k,M,Cjk+=t*Aik))}
  es{Nij(N,M,D t=0.0;Nx(k,K,t+=Bki*Ajk)Cij+=a*t)}}

V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc){I i,j,k;
  D ar=Re(a,0),ai=Im(a,0),br=Re(b,0),bi=Im(b,0);D AH=AT==CblasConjTrans?-1:1,BH=BT==CblasConjTrans?-1:1;
  if(! br     &&!bi )Nij(N,M,CRij=0.0;CIij=0.0)
  ef(!(br==1.0&&!bi))Nij(N,M,D cr=CRij;D ci=CIij;CRij=br*cr-bi*ci;CIij=br*ci+bi*cr)if(!ar&&!ai)return;
  if(  BT0  &&  AT0 )Nij(K,N,D r=BRji;D s=BH*BIji;D t=ar*r-ai*s;D u=ar*s+ai*r;if(t||u){Nk(M,D v=ARik;D w=AH*AIik;CRjk+=t*v-u*w;CIjk+=t*w+u*v)})
  ef(  BT0  &&  AT1 )Nij(N,M,Dx0;Dy0;Nk(K,D s=BRik;D t=BH*BIik;D u=ARjk;D v=AH*AIjk;x+=s*u-t*v;y+=s*v+t*u)CRij+=ar*x-ai*y;CIij+=ar*y+ai*x)
  ef(  BT1  &&  AT0 )Nij(K,N,D x=BRij;D y=BH*BIij;D u=ar*x-ai*y;D v=ar*y+ai*x;if(!(!u&&!v))Nk(M,D s=ARik;D t=AH*AIik;CRjk+=u*s-v*t;CIjk+=u*t+v*s))
  es Nij(N,M,Dx0;Dy0;Nk(K,D u=BRki;D v=BH*BIki;D s=ARjk;D t=AH*AIjk;x+=u*s-v*t;y+=u*t+v*s);CRij+=ar*x-ai*y;CIij+=ar*y+ai*x)}

V cblas_zgemv(I ly,I AT,I M,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy){}
V cblas_zgerc(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la){}
V cblas_ztrmm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb){}

#undef BLAS_IMPL
#endif
#undef I
#undef D
#undef V
