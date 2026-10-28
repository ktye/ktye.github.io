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

#define Nx(i,N,e) for(i=0;i<(N);i++){e;}
#define Nij(N,J,e) Nx(i,N,Nx(j,J,e))
#define AT0 AT==CblasNoTrans
#define BT0 BT==CblasNoTrans
#define AT1 AT==CblasTrans
#define BT1 BT==CblasTrans

V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc){I i,j,k;
  if(b==0.0){Nij(N,M,C[lc*i+j]=0)}else if(b!=1.0){Nij(N,M,C[lc*i+j]*=b)}if(a==0.0)return;
  if(BT0&&AT0){Nij(K,N,const D t=a*B[lb*j+i];if(t){Nx(k,M,C[lc*j+k]+=t*A[la*i+k])})}
  else if(BT0&&AT1){Nij(N,M,D t=0.0;Nx(k,K,t+=B[lb*i+k]*A[la*j+k])C[lc*i+j]+=a*t)}
  else if(BT1&&AT0){Nij(K,N,const D t=a*B[lb*i+j];if(t)Nx(k,M,C[lc*j+k]+=t*A[la*i+k]))}
  else{Nij(N,M,D t=0.0;Nx(k,K,t+=B[lb*k+i]*A[la*j+k])C[lc*i+j]+=a*t)}}

V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc){}

#undef BLAS_IMPL
#endif
#undef I
#undef D
#undef V

