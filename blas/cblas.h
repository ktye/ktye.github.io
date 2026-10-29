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
#define Re(A,i) ((D*)A)[2*(i)]
#define Im(A,i) ((D*)A)[1+2*(i)]

V cblas_dgemm(I ly,I AT,I BT,I M,I N,I K,D a,D*A,I la,D*B,I lb,D b,D*C,I lc){I i,j,k;
  if(b==0.0){Nij(N,M,C[lc*i+j]=0)}else if(b!=1.0){Nij(N,M,C[lc*i+j]*=b)}if(a==0.0)return;
  if(BT0&&AT0){Nij(K,N,const D t=a*B[lb*j+i];if(t){Nx(k,M,C[lc*j+k]+=t*A[la*i+k])})}
  else if(BT0&&AT1){Nij(N,M,D t=0.0;Nx(k,K,t+=B[lb*i+k]*A[la*j+k])C[lc*i+j]+=a*t)}
  else if(BT1&&AT0){Nij(K,N,const D t=a*B[lb*i+j];if(t)Nx(k,M,C[lc*j+k]+=t*A[la*i+k]))}
  else{Nij(N,M,D t=0.0;Nx(k,K,t+=B[lb*k+i]*A[la*j+k])C[lc*i+j]+=a*t)}}

V cblas_zgemm(I ly,I AT,I BT,I M,I N,I K,V*a,V*A,I la,V*B,I lb,V*b,V*C,I lc){I i,j,k;
  I n1, n2;
  I ldf, ldg;
  I conjF, conjG, TransF, TransG;
  const D *F, *G;

  D ar=Re(a,0),ai=Im(a,0),br=Re(b,0),bi=Im(b,0);
  D AH=AT==CblasConjTrans?-1:1,BH=BT==CblasConjTrans?-1:1;

      n1 = N;
      n2 = M;
      F = (D*)B;
      ldf = lb;
      conjF = (BT== CblasConjTrans) ? -1 : 1;
      TransF = (BT== CblasNoTrans) ? CblasNoTrans : CblasTrans;
      G = (D*)A;
      ldg = la;
      conjG = (AT == CblasConjTrans) ? -1 : 1;
      TransG = (AT == CblasNoTrans) ? CblasNoTrans : CblasTrans;

    if(br==0.0&&bi==0.0){Nij(N,M,Re(C,lc*i+j)=0.0;Im(C,lc*i+j)=0.0)}
    else if(!(br==1.0&&bi==0.0))Nij(N,M,D cr=Re(C,lc*i+j);D ci=Im(C,lc*i+j);Re(C,lc*i+j)=br*cr-bi*ci;Im(C,lc*i+j)=br*ci+bi*cr)
    if(ar==0.0&&ai==0.0)return;
    if(BT0&&AT0){Nij(K,N,D r=Re(B,lb*j+i);D s=BH*Im(B,lb*j+i);D t=ar*r-ai*s;D u=ar*s+ai*r;if(t||u){Nx(k,M,D v=Re(A,la*i+k);D w=AH*Im(A,la*i+k);Re(C,lc*j+k)+=t*v-u*w;Im(C,lc*j+k)+=t*w+u*v)})}

    else if (TransF == CblasNoTrans && TransG == CblasTrans) {
      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          D temp_real = 0.0;
          D temp_imag = 0.0;
          for (k = 0; k < K; k++) {
            D Fik_real = Re(F, ldf * i + k);
            D Fik_imag = conjF * Im(F, ldf * i + k);
            D Gjk_real = Re(G, ldg * j + k);
            D Gjk_imag = conjG * Im(G, ldg * j + k);
            temp_real += Fik_real * Gjk_real - Fik_imag * Gjk_imag;
            temp_imag += Fik_real * Gjk_imag + Fik_imag * Gjk_real;
          }
          Re(C, lc * i + j) += ar * temp_real - ai * temp_imag;
          Im(C, lc * i + j) += ar * temp_imag + ai * temp_real;
        }
      }

    } else if (TransF == CblasTrans && TransG == CblasNoTrans) {

      for (k = 0; k < K; k++) {
        for (i = 0; i < n1; i++) {
          D Fki_real = Re(F, ldf * k + i);
          D Fki_imag = conjF * Im(F, ldf * k + i);
          D temp_real = ar * Fki_real - ai * Fki_imag;
          D temp_imag = ar * Fki_imag + ai * Fki_real;
          if (!(temp_real == 0.0 && temp_imag == 0.0)) {
            for (j = 0; j < n2; j++) {
              D Gkj_real = Re(G, ldg * k + j);
              D Gkj_imag = conjG * Im(G, ldg * k + j);
              Re(C, lc * i + j) += temp_real * Gkj_real - temp_imag * Gkj_imag;
              Im(C, lc * i + j) += temp_real * Gkj_imag + temp_imag * Gkj_real;
            }
          }
        }
      }

    } else if (TransF == CblasTrans && TransG == CblasTrans) {

      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          D temp_real = 0.0;
          D temp_imag = 0.0;
          for (k = 0; k < K; k++) {
            D Fki_real = Re(F, ldf * k + i);
            D Fki_imag = conjF * Im(F, ldf * k + i);
            D Gjk_real = Re(G, ldg * j + k);
            D Gjk_imag = conjG * Im(G, ldg * j + k);

            temp_real += Fki_real * Gjk_real - Fki_imag * Gjk_imag;
            temp_imag += Fki_real * Gjk_imag + Fki_imag * Gjk_real;
          }
          Re(C, lc * i + j) += ar * temp_real - ai * temp_imag;
          Im(C, lc * i + j) += ar * temp_imag + ai * temp_real;
        }
      }
  }
}

#undef BLAS_IMPL
#endif
#undef I
#undef D
#undef V



/*
{
  INDEX i, j, k;
  INDEX n1, n2;
  INDEX ldf, ldg;
  int conjF, conjG, TransF, TransG;
  const BASE *F, *G;

  {
    const BASE alpha_real = CONST_REAL0(alpha);
    const BASE alpha_imag = CONST_IMAG0(alpha);

    const BASE beta_real = CONST_REAL0(beta);
    const BASE beta_imag = CONST_IMAG0(beta);

    if ((alpha_real == 0.0 && alpha_imag == 0.0)
        && (beta_real == 1.0 && beta_imag == 0.0))
      return;

    if (Order == CblasRowMajor) {
      n1 = M;
      n2 = N;
      F = (const BASE *)A;
      ldf = lda;
      conjF = (TransA == CblasConjTrans) ? -1 : 1;
      TransF = (TransA == CblasNoTrans) ? CblasNoTrans : CblasTrans;
      G = (const BASE *)B;
      ldg = ldb;
      conjG = (TransB == CblasConjTrans) ? -1 : 1;
      TransG = (TransB == CblasNoTrans) ? CblasNoTrans : CblasTrans;
    } else {
      n1 = N;
      n2 = M;
      F = (const BASE *)B;
      ldf = ldb;
      conjF = (TransB == CblasConjTrans) ? -1 : 1;
      TransF = (TransB == CblasNoTrans) ? CblasNoTrans : CblasTrans;
      G = (const BASE *)A;
      ldg = lda;
      conjG = (TransA == CblasConjTrans) ? -1 : 1;
      TransG = (TransA == CblasNoTrans) ? CblasNoTrans : CblasTrans;
    }

    if (beta_real == 0.0 && beta_imag == 0.0) {
      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          REAL(C, ldc * i + j) = 0.0;
          IMAG(C, ldc * i + j) = 0.0;
        }
      }
    } else if (!(beta_real == 1.0 && beta_imag == 0.0)) {
      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          const BASE Cij_real = REAL(C, ldc * i + j);
          const BASE Cij_imag = IMAG(C, ldc * i + j);
          REAL(C, ldc * i + j) = beta_real * Cij_real - beta_imag * Cij_imag;
          IMAG(C, ldc * i + j) = beta_real * Cij_imag + beta_imag * Cij_real;
        }
      }
    }

    if (alpha_real == 0.0 && alpha_imag == 0.0)
      return;

    if (TransF == CblasNoTrans && TransG == CblasNoTrans) {
      for (k = 0; k < K; k++) {
        for (i = 0; i < n1; i++) {
          const BASE Fik_real = CONST_REAL(F, ldf * i + k);
          const BASE Fik_imag = conjF * CONST_IMAG(F, ldf * i + k);
          const BASE temp_real = alpha_real * Fik_real - alpha_imag * Fik_imag;
          const BASE temp_imag = alpha_real * Fik_imag + alpha_imag * Fik_real;
          if (!(temp_real == 0.0 && temp_imag == 0.0)) {
            for (j = 0; j < n2; j++) {
              const BASE Gkj_real = CONST_REAL(G, ldg * k + j);
              const BASE Gkj_imag = conjG * CONST_IMAG(G, ldg * k + j);
              REAL(C, ldc * i + j) += temp_real * Gkj_real - temp_imag * Gkj_imag;
              IMAG(C, ldc * i + j) += temp_real * Gkj_imag + temp_imag * Gkj_real;
            }
          }
        }
      }

    } else if (TransF == CblasNoTrans && TransG == CblasTrans) {

      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          BASE temp_real = 0.0;
          BASE temp_imag = 0.0;
          for (k = 0; k < K; k++) {
            const BASE Fik_real = CONST_REAL(F, ldf * i + k);
            const BASE Fik_imag = conjF * CONST_IMAG(F, ldf * i + k);
            const BASE Gjk_real = CONST_REAL(G, ldg * j + k);
            const BASE Gjk_imag = conjG * CONST_IMAG(G, ldg * j + k);
            temp_real += Fik_real * Gjk_real - Fik_imag * Gjk_imag;
            temp_imag += Fik_real * Gjk_imag + Fik_imag * Gjk_real;
          }
          REAL(C, ldc * i + j) += alpha_real * temp_real - alpha_imag * temp_imag;
          IMAG(C, ldc * i + j) += alpha_real * temp_imag + alpha_imag * temp_real;
        }
      }

    } else if (TransF == CblasTrans && TransG == CblasNoTrans) {

      for (k = 0; k < K; k++) {
        for (i = 0; i < n1; i++) {
          const BASE Fki_real = CONST_REAL(F, ldf * k + i);
          const BASE Fki_imag = conjF * CONST_IMAG(F, ldf * k + i);
          const BASE temp_real = alpha_real * Fki_real - alpha_imag * Fki_imag;
          const BASE temp_imag = alpha_real * Fki_imag + alpha_imag * Fki_real;
          if (!(temp_real == 0.0 && temp_imag == 0.0)) {
            for (j = 0; j < n2; j++) {
              const BASE Gkj_real = CONST_REAL(G, ldg * k + j);
              const BASE Gkj_imag = conjG * CONST_IMAG(G, ldg * k + j);
              REAL(C, ldc * i + j) += temp_real * Gkj_real - temp_imag * Gkj_imag;
              IMAG(C, ldc * i + j) += temp_real * Gkj_imag + temp_imag * Gkj_real;
            }
          }
        }
      }

    } else if (TransF == CblasTrans && TransG == CblasTrans) {

      for (i = 0; i < n1; i++) {
        for (j = 0; j < n2; j++) {
          BASE temp_real = 0.0;
          BASE temp_imag = 0.0;
          for (k = 0; k < K; k++) {
            const BASE Fki_real = CONST_REAL(F, ldf * k + i);
            const BASE Fki_imag = conjF * CONST_IMAG(F, ldf * k + i);
            const BASE Gjk_real = CONST_REAL(G, ldg * j + k);
            const BASE Gjk_imag = conjG * CONST_IMAG(G, ldg * j + k);

            temp_real += Fki_real * Gjk_real - Fki_imag * Gjk_imag;
            temp_imag += Fki_real * Gjk_imag + Fki_imag * Gjk_real;
          }
          REAL(C, ldc * i + j) += alpha_real * temp_real - alpha_imag * temp_imag;
          IMAG(C, ldc * i + j) += alpha_real * temp_imag + alpha_imag * temp_real;
        }
      }

    } else {
      BLAS_ERROR("unrecognized operation");
    }
  }
}
*/
