#define I int
#define F float
#define D double
#define V void
#ifndef BLAS_H
#define BLAS_H
typedef enum CBLAS_LAYOUT{CblasRowMajor=101,CblasColMajor=102} CBLAS_LAYOUT;
typedef enum CBLAS_TRANSPOSE{CblasNoTrans=111,CblasTrans=112, CblasConjTrans=113} CBLAS_TRANSPOSE;
typedef enum CBLAS_UPLO{CblasUpper=121,CblasLower=122} CBLAS_UPLO;
typedef enum CBLAS_DIAG{CblasNonUnit=131,CblasUnit=132} CBLAS_DIAG;
typedef enum CBLAS_SIDE{CblasLeft=141,CblasRight=142} CBLAS_SIDE;
D cblas_dcabs1(V*z);
F cblas_scabs1(V*c);
F cblas_sdsdot(I N,F a,F*X,I dx,F*Y,I dy);
D cblas_dsdot(I N,F*X,I dx,F*Y,I dy);
F cblas_sdot(I N,F*X,I dx,F*Y,I dy);
D cblas_ddot(I N,D*X,I dx,D*Y,I dy);
V cblas_cdotu_sub(I N,V*X,I dx,V*Y,I dy,V*dotu);
V cblas_cdotc_sub(I N,V*X,I dx,V*Y,I dy,V*dotc);
V cblas_zdotu_sub(I N,V*X,I dx,V*Y,I dy,V*dotu);
V cblas_zdotc_sub(I N,V*X,I dx,V*Y,I dy,V*dotc);
F cblas_snrm2(I N,F*X,I dx);
F cblas_sasum(I N,F*X,I dx);
D cblas_dnrm2(I N,D*X,I dx);
D cblas_dasum(I N,D*X,I dx);
F cblas_scnrm2(I N,V*X,I dx);
F cblas_scasum(I N,V*X,I dx);
D cblas_dznrm2(I N,V*X,I dx);
D cblas_dzasum(I N,V*X,I dx);
I cblas_isamax(I N,F*X,I dx);
I cblas_idamax(I N,D*X,I dx);
I cblas_icamax(I N,V*X,I dx);
I cblas_izamax(I N,V*X,I dx);
V cblas_sswap(I N,F*X,I dx,F*Y,I dy);
V cblas_scopy(I N,F*X,I dx,F*Y,I dy);
V cblas_saxpy(I N,F a,F*X,I dx,F*Y,I dy);
V cblas_saxpby(I N,F a,F*X,I dx,F b,F*Y,I dy);
V cblas_dswap(I N,D*X,I dx,D*Y,I dy);
V cblas_dcopy(I N,D*X,I dx,D*Y,I dy);
V cblas_daxpy(I N,D a,D*X,I dx,D*Y,I dy);
V cblas_daxpby(I N,D a,D*X,I dx,D b,D*Y,I dy);
V cblas_cswap(I N,V*X,I dx,V*Y,I dy);
V cblas_ccopy(I N,V*X,I dx,V*Y,I dy);
V cblas_caxpy(I N,V*a,V*X,I dx,V*Y,I dy);
V cblas_caxpby(I N,V*a,V*X,I dx,V*b,V*Y,I dy);
V cblas_zswap(I N,V*X,I dx,V*Y,I dy);
V cblas_zcopy(I N,V*X,I dx,V*Y,I dy);
V cblas_zaxpy(I N,V*a,V*X,I dx,V*Y,I dy);
V cblas_zaxpby(I N,V*a,V*X,I dx,V*b,V*Y,I dy);
V cblas_srotmg(F*d1,F*d2,F*b1,F b2,F*P);
V cblas_srotm(I N,F*X,I dx,F*Y,I dy,F*P);
V cblas_drotmg(D*d1,D*d2,D*b1,D b2,D*P);
V cblas_drotm(I N,D*X,I dx,D*Y,I dy,D*P);
V cblas_sscal(I N,F a,F*X,I dx);
V cblas_dscal(I N,D a,D*X,I dx);
V cblas_cscal(I N,V*a,V*X,I dx);
V cblas_zscal(I N,V*a,V*X,I dx);
V cblas_csscal(I N,F a,V*X,I dx);
V cblas_zdscal(I N,D a,V*X,I dx);
V cblas_srotg(F*a,F*b,F*c,F*s);
V cblas_drotg(D*a,D*b,D*c,D*s);
V cblas_crotg(V*a,V*b,F*c,V*s);
V cblas_zrotg(V*a,V*b,D*c,V*s);
V cblas_srot(I N,F*X,I dx,F*Y,I dy,F c,F s);
V cblas_drot(I N,D*X,I dx,D*Y,I dy,D c,D s);
V cblas_csrot(I N,V*X,I dx,V*Y,I dy,F c,F s);
V cblas_zdrot(I N,V*X,I dx,V*Y,I dy,D c,D s);
V cblas_sgemv(I ly,I AT,I M,I N,F a,F*A,I la,F*X,I dx,F b,F*Y,I dy);
V cblas_sgbmv(I ly,I AT,I M,I N,I KL,I KU,F a,F*A,I la,F*X,I dx,F b,F*Y,I dy);
V cblas_strmv(I ly,I ul,I AT,I d,I N,F*A,I la,F*X,I dx);
V cblas_stbmv(I ly,I ul,I AT,I d,I N,I K,F*A,I la,F*X,I dx);
V cblas_stpmv(I ly,I ul,I AT,I d,I N,F*Ap,F*X,I dx);
V cblas_strsv(I ly,I ul,I AT,I d,I N,F*A,I la,F*X,I dx);
V cblas_stbsv(I ly,I ul,I AT,I d,I N,I K,F*A,I la,F*X,I dx);
V cblas_stpsv(I ly,I ul,I AT,I d,I N,F*Ap,F*X,I dx);
V cblas_dgemv(I ly,I AT,I M,I N,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dgbmv(I ly,I AT,I M,I N,I KL,I KU,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy);
V cblas_dtrmv(I ly,I ul,I AT,I d,I N,D*A,I la,D*X,I dx);
V cblas_dtbmv(I ly,I ul,I AT,I d,I N,I K,D*A,I la,D*X,I dx);
V cblas_dtpmv(I ly,I ul,I AT,I d,I N,D*Ap,D*X,I dx);
V cblas_dtrsv(I ly,I ul,I AT,I d,I N,D*A,I la,D*X,I dx);
V cblas_dtbsv(I ly,I ul,I AT,I d,I N,I K,D*A,I la,D*X,I dx);
V cblas_dtpsv(I ly,I ul,I AT,I d,I N,D*Ap,D*X,I dx);
V cblas_cgemv(I ly,I AT,I M,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_cgbmv(I ly,I AT,I M,I N,I KL,I KU,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_ctrmv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ctbmv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ctpmv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_ctrsv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ctbsv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ctpsv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_zgemv(I ly,I AT,I M,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zgbmv(I ly,I AT,I M,I N,I KL,I KU,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_ztrmv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ztbmv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ztpmv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_ztrsv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx);
V cblas_ztbsv(I ly,I ul,I AT,I d,I N,I K,V*A,I la,V*X,I dx);
V cblas_ztpsv(I ly,I ul,I AT,I d,I N,V*Ap,V*X,I dx);
V cblas_ssymv(I ly,I ul,I N,F a,F*A,I la,F*X,I dx,F b,F*Y,I dy);
V cblas_ssbmv(I ly,I ul,I N,I K,F a,F*A,I la,F*X,I dx,F b,F*Y,I dy);
V cblas_sspmv(I ly,I ul,I N,F a,F*Ap,F*X,I dx,F b,F*Y,I dy);
V cblas_sskewsymv(I ly,I ul,I N,F a,F*A,I la,F*X,I dx,F b,F*Y,I dy);
V cblas_sger(I ly,I M,I N,F a,F*X,I dx,F*Y,I dy,F*A,I la);
V cblas_ssyr(I ly,I ul,I N,F a,F*X,I dx,F*A,I la);
V cblas_sspr(I ly,I ul,I N,F a,F*X,I dx,F*Ap);
V cblas_ssyr2(I ly,I ul,I N,F a,F*X,I dx,F*Y,I dy,F*A,I la);
V cblas_sspr2(I ly,I ul,I N,F a,F*X,I dx,F*Y,I dy,F*A);
V cblas_sskewsyr2(I ly,I ul,I N,F a,F*X,I dx,F*Y,I dy,F*A,I la);
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
V cblas_chemv(I ly,I ul,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_chbmv(I ly,I ul,I N,I K,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_chpmv(I ly,I ul,I N,V*a,V*Ap,V*X,I dx,V*b,V*Y,I dy);
V cblas_cgeru(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_cgerc(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_cher(I ly,I ul,I N,F a,V*X,I dx,V*A,I la);
V cblas_chpr(I ly,I ul,I N,F a,V*X,I dx,V*A);
V cblas_cher2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_chpr2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*Ap);
V cblas_zhemv(I ly,I ul,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zhbmv(I ly,I ul,I N,I K,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy);
V cblas_zhpmv(I ly,I ul,I N,V*a,V*Ap,V*X,I dx,V*b,V*Y,I dy);
V cblas_zgeru(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zgerc(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zher(I ly,I ul,I N,D a,V*X,I dx,V*A,I la);
V cblas_zhpr(I ly,I ul,I N,D a,V*X,I dx,V*A);
V cblas_zher2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la);
V cblas_zhpr2(I ly,I ul,I N,V*a,V*X,I dx,V*Y,I dy,V*Ap);
V cblas_sgemm(I ly,I AT,I BT,I M,I N,I K,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_sgemmtr(I ly,I ul,I AT,I BT,I N,I K,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_ssymm(I ly,I Si,I ul,I M,I N,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_sskewsymm(I ly,I Si,I ul,I M,I N,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_ssyrk(I ly,I ul,I T,I N,I K,F a,F*A,I la,F b,F*C,I lc);
V cblas_ssyr2k(I ly,I ul,I T,I N,I K,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_sskewsyr2k(I ly,I ul,I T,I N,I K,F a,F*A,I la,F*B,I lb,F b,F*C,I lc);
V cblas_strmm(I ly,I Si,I ul,I AT,I d,I M,I N,F a,F*A,I la,F*B,I lb);
V cblas_strsm(I ly,I Si,I ul,I AT,I d,I M,I N,F a,F*A,I la,F*B,I lb);
V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dgemmtr(I ly,I ul,I AT,I BT,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dsymm(I ly,I Si,I ul,I M,I N,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dskewsymm(I ly,I Si,I ul,I M,I N,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dsyrk(I ly,I ul,I T,I N,I K,D a,D*A,I la,D b,D*C,I lc);
V cblas_dsyr2k(I ly,I ul,I T,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dskewsyr2k(I ly,I ul,I T,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc);
V cblas_dtrmm(I ly,I Si,I ul,I AT,I d,I M,I N,D a,D*A,I la,D*B,I lb);
V cblas_dtrsm(I ly,I Si,I ul,I AT,I d,I M,I N,D a,D*A,I la,D*B,I lb);
V cblas_cgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_cgemmtr(I ly,I ul,I AT,I BT,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_csymm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_csyrk(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*b,V*C,I lc);
V cblas_csyr2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_ctrmm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_ctrsm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zgemmtr(I ly,I ul,I AT,I BT,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zsymm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zsyrk(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*b,V*C,I lc);
V cblas_zsyr2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_ztrmm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_ztrsm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb);
V cblas_chemm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_cherk(I ly,I ul,I T,I N,I K,F a,V*A,I la,F b,V*C,I lc);
V cblas_cher2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,F b,V*C,I lc);
V cblas_zhemm(I ly,I Si,I ul,I M,I N,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc);
V cblas_zherk(I ly,I ul,I T,I N,I K,D a,V*A,I la,D b,V*C,I lc);
V cblas_zher2k(I ly,I ul,I T,I N,I K,V*a,V*A,I la,V*B,I lb,D b,V*C,I lc);
#endif
#ifdef BLAS_IMPL


V cblas_sgemm(I ly,I AT,I BT,I M,I N,I K,F a,F*A,I la,F*B,I lb,F b,F*C,I lc){
  I i, j, k;
  I n1, n2;
  I ldf, ldg;
  I TransF, TransG;
  const F *f,*g;


  if (a== 0.0 && b== 1.0) return;

  if (ly == CblasRowMajor) {
    n1 = M;
    n2 = N;
    f = A;
    ldf = la;
    TransF = (AT == CblasConjTrans) ? CblasTrans : AT;
    g = B;
    ldg = lb;
    TransG = (BT == CblasConjTrans) ? CblasTrans : BT;
  } else {
    n1 = N;
    n2 = M;
    f = B;
    ldf = lb;
    TransF = (BT == CblasConjTrans) ? CblasTrans : BT;
    g = A;
    ldg = la;
    TransG = (AT == CblasConjTrans) ? CblasTrans : AT;
  }

  /* form  y := b*y */
  if (b == 0.0) {
    for (i = 0; i < n1; i++) {
      for (j = 0; j < n2; j++) {
        C[lc * i + j] = 0.0;
      }
    }
  } else if (b != 1.0) {
    for (i = 0; i < n1; i++) {
      for (j = 0; j < n2; j++) {
        C[lc * i + j] *= b;
      }
    }
  }

  if (a == 0.0)
    return;

  if (TransF == CblasNoTrans && TransG == CblasNoTrans) {

    /* form  C := a*A*B + C */

    for (k = 0; k < K; k++) {
      for (i = 0; i < n1; i++) {
        const F temp = a * f[ldf * i + k];
        if (temp != 0.0) {
          for (j = 0; j < n2; j++) {
            C[lc * i + j] += temp * g[ldg * k + j];
          }
        }
      }
    }

  } else if (TransF == CblasNoTrans && TransG == CblasTrans) {

    /* form  C := a*A*B' + C */

    for (i = 0; i < n1; i++) {
      for (j = 0; j < n2; j++) {
        F temp = 0.0;
        for (k = 0; k < K; k++) {
          temp += f[ldf * i + k] * g[ldg * j + k];
        }
        C[lc * i + j] += a * temp;
      }
    }

  } else if (TransF == CblasTrans && TransG == CblasNoTrans) {

    for (k = 0; k < K; k++) {
      for (i = 0; i < n1; i++) {
        const F temp = a * f[ldf * k + i];
        if (temp != 0.0) {
          for (j = 0; j < n2; j++) {
            C[lc * i + j] += temp * g[ldg * k + j];
          }
        }
      }
    }

  } else if (TransF == CblasTrans && TransG == CblasTrans) {

    for (i = 0; i < n1; i++) {
      for (j = 0; j < n2; j++) {
        F temp = 0.0;
        for (k = 0; k < K; k++) {
          temp += f[ldf * k + i] * g[ldg * j + k];
        }
        C[lc * i + j] += a * temp;
      }
    }
  }
}

V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc){}
V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc){}
V cblas_cgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc){}

#undef BLAS_IMPL
#endif
#undef I
#undef F
#undef D
#undef V

