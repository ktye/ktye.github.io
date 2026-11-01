typedef enum CBLAS_LAYOUT{/*CblasRowMajor=101,*/CblasColMajor=102} CBLAS_LAYOUT;
typedef enum CBLAS_TRANSPOSE{CblasNoTrans=111,CblasTrans=112, CblasConjTrans=113} CBLAS_TRANSPOSE;
typedef enum CBLAS_UPLO{CblasUpper=121,CblasLower=122} CBLAS_UPLO;
typedef enum CBLAS_DIAG{CblasNonUnit=131,CblasUnit=132} CBLAS_DIAG;
typedef enum CBLAS_SIDE{CblasLeft=141,CblasRight=142} CBLAS_SIDE;
#ifndef BLAS_IMPL
double cblas_dcabs1(void*z);
double cblas_ddot(int N,double*X,int dx,double*Y,int dy);
void cblas_zdotu_sub(int N,void*X,int dx,void*Y,int dy,void*dotu);
void cblas_zdotc_sub(int N,void*X,int dx,void*Y,int dy,void*dotc);
double cblas_dnrm2(int N,double*X,int dx);
double cblas_dasum(int N,double*X,int dx);
double cblas_dznrm2(int N,void*X,int dx);
double cblas_dzasum(int N,void*X,int dx);
int cblas_idamax(int N,double*X,int dx);
int cblas_izamax(int N,void*X,int dx);
void cblas_dswap(int N,double*X,int dx,double*Y,int dy);
void cblas_dcopy(int N,double*X,int dx,double*Y,int dy);
void cblas_daxpy(int N,double a,double*X,int dx,double*Y,int dy);
void cblas_daxpby(int N,double a,double*X,int dx,double b,double*Y,int dy);
void cblas_zswap(int N,void*X,int dx,void*Y,int dy);
void cblas_zcopy(int N,void*X,int dx,void*Y,int dy);
void cblas_zaxpy(int N,void*a,void*X,int dx,void*Y,int dy);
void cblas_zaxpby(int N,void*a,void*X,int dx,void*b,void*Y,int dy);
void cblas_drotmg(double*d1,double*d2,double*b1,double b2,double*P);
void cblas_drotm(int N,double*X,int dx,double*Y,int dy,double*P);
void cblas_dscal(int N,double a,double*X,int dx);
void cblas_zscal(int N,void*a,void*X,int dx);
void cblas_zdscal(int N,double a,void*X,int dx);
void cblas_drotg(double*a,double*b,double*c,double*s);
void cblas_zrotg(void*a,void*b,double*c,void*s);
void cblas_drot(int N,double*X,int dx,double*Y,int dy,double c,double s);
void cblas_zdrot(int N,void*X,int dx,void*Y,int dy,double c,double s);
void cblas_dgemv(int ly,int AT,int M,int N,double a,double*A,int la,double*X,int dx,double b,double*Y,int dy);
void cblas_dgbmv(int ly,int AT,int M,int N,int KL,int KU,double a,double*A,int la,double*X,int dx,double b,double*Y,int dy);
void cblas_dtrmv(int ly,int ul,int AT,int d,int N,double*A,int la,double*X,int dx);
void cblas_dtbmv(int ly,int ul,int AT,int d,int N,int K,double*A,int la,double*X,int dx);
void cblas_dtpmv(int ly,int ul,int AT,int d,int N,double*Ap,double*X,int dx);
void cblas_dtrsv(int ly,int ul,int AT,int d,int N,double*A,int la,double*X,int dx);
void cblas_dtbsv(int ly,int ul,int AT,int d,int N,int K,double*A,int la,double*X,int dx);
void cblas_dtpsv(int ly,int ul,int AT,int d,int N,double*Ap,double*X,int dx);
void cblas_zgemv(int ly,int AT,int M,int N,void*a,void*A,int la,void*X,int dx,void*b,void*Y,int dy);
void cblas_zgbmv(int ly,int AT,int M,int N,int KL,int KU,void*a,void*A,int la,void*X,int dx,void*b,void*Y,int dy);
void cblas_ztrmv(int ly,int ul,int AT,int d,int N,void*A,int la,void*X,int dx);
void cblas_ztbmv(int ly,int ul,int AT,int d,int N,int K,void*A,int la,void*X,int dx);
void cblas_ztpmv(int ly,int ul,int AT,int d,int N,void*Ap,void*X,int dx);
void cblas_ztrsv(int ly,int ul,int AT,int d,int N,void*A,int la,void*X,int dx);
void cblas_ztbsv(int ly,int ul,int AT,int d,int N,int K,void*A,int la,void*X,int dx);
void cblas_ztpsv(int ly,int ul,int AT,int d,int N,void*Ap,void*X,int dx);
void cblas_dsymv(int ly,int ul,int N,double a,double*A,int la,double*X,int dx,double b,double*Y,int dy);
void cblas_dsbmv(int ly,int ul,int N,int K,double a,double*A,int la,double*X,int dx,double b,double*Y,int dy);
void cblas_dspmv(int ly,int ul,int N,double a,double*Ap,double*X,int dx,double b,double*Y,int dy);
void cblas_dskewsymv(int ly,int ul,int N,double a,double*A,int la,double*X,int dx,double b,double*Y,int dy);
void cblas_dger(int ly,int M,int N,double a,double*X,int dx,double*Y,int dy,double*A,int la);
void cblas_dsyr(int ly,int ul,int N,double a,double*X,int dx,double*A,int la);
void cblas_dspr(int ly,int ul,int N,double a,double*X,int dx,double*Ap);
void cblas_dsyr2(int ly,int ul,int N,double a,double*X,int dx,double*Y,int dy,double*A,int la);
void cblas_dspr2(int ly,int ul,int N,double a,double*X,int dx,double*Y,int dy,double*A);
void cblas_dskewsyr2(int ly,int ul,int N,double a,double*X,int dx,double*Y,int dy,double*A,int la);
void cblas_zhemv(int ly,int ul,int N,void*a,void*A,int la,void*X,int dx,void*b,void*Y,int dy);
void cblas_zhbmv(int ly,int ul,int N,int K,void*a,void*A,int la,void*X,int dx,void*b,void*Y,int dy);
void cblas_zhpmv(int ly,int ul,int N,void*a,void*Ap,void*X,int dx,void*b,void*Y,int dy);
void cblas_zgeru(int ly,int M,int N,void*a,void*X,int dx,void*Y,int dy,void*A,int la);
void cblas_zgerc(int ly,int M,int N,void*a,void*X,int dx,void*Y,int dy,void*A,int la);
void cblas_zher(int ly,int ul,int N,double a,void*X,int dx,void*A,int la);
void cblas_zhpr(int ly,int ul,int N,double a,void*X,int dx,void*A);
void cblas_zher2(int ly,int ul,int N,void*a,void*X,int dx,void*Y,int dy,void*A,int la);
void cblas_zhpr2(int ly,int ul,int N,void*a,void*X,int dx,void*Y,int dy,void*Ap);
void cblas_dgemm(int ly,int AT,int BT,int M,int N,int K,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dgemmtr(int ly,int ul,int AT,int BT,int N,int K,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dsymm(int ly,int Si,int ul,int M,int N,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dskewsymm(int ly,int Si,int ul,int M,int N,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dsyrk(int ly,int ul,int T,int N,int K,double a,double*A,int la,double b,double*C,int lc);
void cblas_dsyr2k(int ly,int ul,int T,int N,int K,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dskewsyr2k(int ly,int ul,int T,int N,int K,double a,double*A,int la,double*B,int lb,double b,double*C,int lc);
void cblas_dtrmm(int ly,int Si,int ul,int AT,int d,int M,int N,double a,double*A,int la,double*B,int lb);
void cblas_dtrsm(int ly,int Si,int ul,int AT,int d,int M,int N,double a,double*A,int la,double*B,int lb);
void cblas_zgemm(int ly,int AT,int BT,int M,int N,int K,void*a,void*A,int la,void*B,int lb,void*b,void*C,int lc);
void cblas_zgemmtr(int ly,int ul,int AT,int BT,int N,int K,void*a,void*A,int la,void*B,int lb,void*b,void*C,int lc);
void cblas_zsymm(int ly,int Si,int ul,int M,int N,void*a,void*A,int la,void*B,int lb,void*b,void*C,int lc);
void cblas_zsyrk(int ly,int ul,int T,int N,int K,void*a,void*A,int la,void*b,void*C,int lc);
void cblas_zsyr2k(int ly,int ul,int T,int N,int K,void*a,void*A,int la,void*B,int lb,void*b,void*C,int lc);
void cblas_ztrmm(int ly,int Si,int ul,int AT,int d,int M,int N,void*a,void*A,int la,void*B,int lb);
void cblas_ztrsm(int ly,int Si,int ul,int AT,int d,int M,int N,void*a,void*A,int la,void*B,int lb);
void cblas_zhemm(int ly,int Si,int ul,int M,int N,void*a,void*A,int la,void*B,int lb,void*b,void*C,int lc);
void cblas_zherk(int ly,int ul,int T,int N,int K,double a,void*A,int la,double b,void*C,int lc);
void cblas_zher2k(int ly,int ul,int T,int N,int K,void*a,void*A,int la,void*B,int lb,double b,void*C,int lc);
#else //BLAS_IMPL
#define I int
#define D double
#define V void
D fabs(D);D sqrt(D);
#define es else
#define ef es if
#define Nx(i,N,e) for(i=0;i<(N);i++){e;}
#define Ny(i,N,e) for(i=(N);i-->0;){e;}
#define Ni(N,e) Nx(i,N,e)
#define Ni_(N,e) Ny(i,N,e)
#define Nj_(N,e) Ny(j,N,e)
#define Nj(N,e) Nx(j,N,e)
#define Njj(a,b,e) for(j=(a);j<(b);j++){e;}
#define Nkk(a,b,e) for(k=(a);k<(b);k++){e;}
#define Nk(N,e) Nx(k,N,e)
#define Nij(N,J,e) Nx(i,N,Nx(j,J,e))
#define Dx0 D x=0.0
#define Dy0 D y=0.0
#define AT0 AT==CblasNoTrans
#define BT0 BT==CblasNoTrans
#define AT1 (AT==CblasTrans||AT==CblasConjTrans)
#define BT1 (BT==CblasTrans||BT==CblasConjTrans)
#define LO (ul==CblasLower)
#define UP (ul==CblasUpper)
#define LE (Si==CblasLeft)
#define RI (Si==CblasRight)
#define Aii A[la*i+i]
#define Aij A[la*i+j]
#define Aik A[la*i+k]
#define Aji A[la*j+i]
#define Ajj A[la*j+j]
#define Ajk A[la*j+k]
#define Aki A[la*k+i]
#define Akj A[la*k+j]
#define Bij B[lb*i+j]
#define Bik B[lb*i+k]
#define Bji B[lb*j+i]
#define Bki B[lb*k+i]
#define Bkj B[lb*k+j]
#define Cij C[lc*i+j]
#define Cjk C[lc*j+k]
#define Re(A,i) ((D*)A)[2*(i)]
#define Im(A,i) ((D*)A)[1+2*(i)]
#define XRj Re(X,j)
#define XIj Im(X,j)
#define XRk Re(X,k)
#define XIk Im(X,k)
#define YRk Re(Y,k)
#define YIk Im(Y,k)
#define ARii Re(A,la*i+i)
#define AIii Im(A,la*i+i)
#define ARij Re(A,la*i+j)
#define AIij Im(A,la*i+j)
#define ARik Re(A,la*i+k)
#define AIik Im(A,la*i+k)
#define ARji Re(A,la*j+i)
#define AIji Im(A,la*j+i)
#define ARjj Re(A,la*j+j)
#define AIjj Im(A,la*j+j)
#define ARjk Re(A,la*j+k)
#define AIjk Im(A,la*j+k)
#define ARki Re(A,la*k+i)
#define AIki Im(A,la*k+i)
#define ARkj Re(A,la*k+j)
#define AIkj Im(A,la*k+j)
#define BRij Re(B,lb*i+j)
#define BIij Im(B,lb*i+j)
#define BRik Re(B,lb*i+k)
#define BIik Im(B,lb*i+k)
#define BRkj Re(B,lb*k+j)
#define BIkj Im(B,lb*k+j)
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
D cblas_dnrm2(I N,D*X,I dx){I i,k=0;D x,u,s=0.0,t=1.0;if(N<=0||dx<=0)return 0;if(N==1)return fabs(X[0]);
  Ni(N,x=X[k];if(x){u=fabs(x);if(s<u){t=1.0+t*(s/u)*(s/u);s=u;}else t+=(u/s)*(u/s);}k+=dx)return s*sqrt(t);}
D cblas_dznrm2(I N,V*X,I dx){I i,k=0;D x,y,u,v,s=0.0,t=1.0;if(!N||dx<1)return 0;
  Ni(N,x=Re(X,k);y=Im(X,k);if(x){u=fabs(x);if(s<u){t=1.0+t*(s/u)*(s/u);s=u;}else t+=(u/s)*(u/s);}if(y){v=fabs(y);if(s<v){t=1.0+t*(s/v)*(s/v);s=v;}else t+=(v/s)*(v/s);}k+=dx);return s*sqrt(t);}

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

V cblas_dgemv(I ly,I AT,I M,I N,D a,D*A,I la,D*X,I dx,D b,D*Y,I dy){I i,j,k,l,LX,LY;D t;
  if(!M||!N)return;if(!a&&b==1.0)return;if(AT0){LX=N;LY=M;}else{LX=M;LY=N;}
  if(!b){k=OF(LY,dy);Ni(LY,Y[k]=0.0;k+=dy)}ef(b!=1.0){k=OF(LY,dy);Ni(LY,Y[k]*=b;k+=dy)}if(!a)return;
  if(AT1){l=OF(LY,dy);Ni(LY,t=0.0;k=OF(LX,dx);Nj(LX,t+=X[k]*Aij;k+=dx);Y[l]+=a*t;l+=dy)}
  es{k=OF(LX,dx);Nj(LX,t=a*X[k];if(t){l=OF(LY,dy);Ni(LY,Y[l]+=t*Aji;l+=dy)}k+=dx)}}

V cblas_zgemv(I ly,I AT,I M,I N,V*a,V*A,I la,V*X,I dx,V*b,V*Y,I dy){I i,j,k,l,LX,LY;D ar=Re(a,0),ai=Im(a,0),br=Re(b,0),bi=Im(b,0),x,y,u,v,s,t;
  if(!M||!N)return;if((!ar&&!ai)&&(br==1.0&&!bi))return;if(AT0){LX=N;LY=M;}else{LX=M;LY=N;}
  if(!br&&!bi){k=OF(LY, dy);Ni(LY,YRk=0.0;YIk=0.0;k+=dy)}
  ef(!(br==1.0&&!bi)){k=OF(LY,dy);Ni(LY,x=YRk;y=YIk;u=x*br-y*bi;v=x*bi+y*br;YRk=u;YIk=v;k+=dy)}if(!ar&&!ai)return;
  if(AT==CblasTrans){l=OF(LY,dy);Ni(LY,u=0.0;v=0.0;k=OF(LX,dx);Nj(LX,x=XRk;y=XIk;s=ARij;t=AIij;u+=s*x-t*y;v+=s*y+t*x;k+=dx)Re(Y,l)+=ar*u-ai*v;Im(Y,l)+=ar*v+ai*u;l+=dy)}
  ef(AT0){k=OF(LX,dx);Nj(LX,x=XRk;y=XIk;u=ar*x-ai*y;v=ar*y+ai*x;l=OF(LY,dy);Ni(LY,s=Re(A,la*j+i);t=Im(A,la*j+i);Re(Y,l)+=s*u-t*v;Im(Y,l)+=s*v+t*u;l+=dy)k+=dx)}
  es{l=OF(LY,dy);Ni(LY,u=0.0;v=0.0;k=OF(LX,dx);Nj(LX,x=XRk;y=XIk;s=ARij;t=AIij;u+=s*x+t*y;v+=s*y-t*x;k+=dx)Re(Y,l)+=ar*u-ai*v;Im(Y,l)+=ar*v+ai*u;l+=dy)}}

V cblas_dger(I ly,I M,I N,D a,D*X,I dx,D*Y,I dy,D*A,I la){I i,j,k,l=OF(N,dy);D t;Nj(N,t=a*Y[l];k=OF(M,dx);Ni(M,Aji+=X[k]*t;k+=dx)l+=dy)}
V cblas_zgerc(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la){I i,j,k,l=OF(N,dy);D ar=Re(a,0),ai=Im(a,0),x,y,u,v,s,t;
  Nj(N,u=Re(Y,l);v=-Im(Y,l);s=ar*u-ai*v;t=ai*u+ar*v;k=OF(M,dx);Ni(M,x=Re(X,k);y=Im(X,k);ARji+=x*s-y*t;AIji+=y*s+x*t;k+=dx)l+=dy)}
V cblas_zgeru(I ly,I M,I N,V*a,V*X,I dx,V*Y,I dy,V*A,I la){I i,j,k,l=OF(N,dy); D ar=Re(a,0),ai=Im(a,0),x,y,u,v,s,t;
  Nj(N,u=Re(Y,l);v=Im(Y,l);s=ar*u-ai*v;t=ai*u+ar*v;k=OF(M,dx);Ni(M,x=XRk;y=XIk;ARji+=x*s-y*t;AIji+=y*s+x*t;k+=dx)l+=dy)}

V cblas_dtrmv(I ly,I ul,I AT,I d,I N,D*A,I la,D*X,I dx){I i,j,k,l,u,v,nu=(d==CblasNonUnit);D t;
  if(AT1&&LO){k=OF(N,dx);Ni(N,t=0.0;u=i+1;v=N;l=OF(N,dx)+u*dx;Njj(u,v,t+=X[l]*Aij;l+=dx)if(nu)X[k]=t+X[k]*Aii;else X[k]+=t;k+=dx)}
  ef(AT1&&UP){k=OF(N,dx)+(N-1)*dx;Ni_(N,t=0.0;u=0;v=i;l=OF(N,dx)+u*dx;Njj(u,v,t+=X[l]*Aij;l+=dx)if(nu)X[k]=t+X[k]*Aii;else X[k]+=t;k-=dx)}
  ef(AT0&&LO){k=OF(N,dx)+(N-1)*dx;Ni_(N,t=0.0;u=0;v=i;l=OF(N,dx)+u*dx;Njj(u,v,t+=X[l]*Aji;l+=dx)if(nu)X[k]=t+X[k]*Aii;else X[k]+=t;k-=dx)}
  es{k=OF(N,dx);Ni(N,t=0.0;u=i+1;v=N;l=OF(N,dx)+(i+1)*dx;Njj(u,v,t+=X[l]*Aji;l+=dx;)if(nu)X[k]=t+X[k]*Aii;else X[k]+=t;k+=dx)}}

V cblas_ztrmv(I ly,I ul,I AT,I d,I N,V*A,I la,V*X,I dx){I i,j,k,l,u,v,nu=(d==CblasNonUnit);
 D x,y,s,t,ar,ai,AH=AT==CblasConjTrans?-1:1;
 if(AT1&&LO){k=OF(N,dx);Ni(N,s=0.0;t=0.0;u=i+1;l=OF(N,dx)+dx*u;Njj(u,N,x=Re(X,l);y=Im(X,l);ar=ARij;ai=AH*AIij;s+=ar*x-ai*y;t+=ar*y+ai*x;l+=dx)if(nu){x=Re(X,k);y=Im(X,k);ar=ARii;ai=AH*AIii;Re(X,k)=s+(ar*x-ai*y);Im(X,k)=t+(ar*y+ai*x);}else{Re(X,k)+=s;Im(X,k)+=t;}k+=dx)}
 ef(AT1&&UP){k=OF(N,dx)+(N-1)*dx;Ni_(N,s=0.0;t=0.0;v=i;l=OF(N,dx);Nj(v,x=Re(X,l);y=Im(X,l);ar=ARij;ai=AH*AIij;s+=ar*x-ai*y;t+=ar*y+ai*x;l+=dx)if(nu){x=Re(X,k);y=Im(X,k);ar=ARii;ai=AH*AIii;Re(X,k)=s+ar*x-ai*y;Im(X,k)=t+ar*y+ai*x;}else{Re(X,k)+=s;Im(X,k)+=t;}k-=dx)}
 ef(AT0&&LO){k=OF(N,dx)+(N-1)*dx;Ni_(N,s=0.0;t=0.0;v=i;l=OF(N,dx);Nj(v,x=Re(X,l);y=Im(X,l);ar=ARji;ai=AH*AIji;s+=ar*x-ai*y;t+=ar*y+ai*x;l+=dx)if(nu){x=Re(X,k);y=Im(X,k);ar=ARii;ai=AH*AIii;Re(X,k)=s+ar*x-ai*y;Im(X,k)=t+ar*y+ai*x;}else{Re(X,k)+=s;Im(X,k)+=t;}k-=dx;)}
 es{k=OF(N,dx);Ni(N,s=0.0;t=0.0;u=i+1;l=OF(N,dx)+u*dx;Njj(u,N,x=Re(X,l);y=Im(X,l);ar=ARji;ai=AH*AIjk;s+=ar*x-ai*y;t+=ar*y+ai*x;l+=dx)if(nu){x=Re(X,k);y=Im(X,k);ar=ARii;ai=AH*AIii;Re(X,k)=s+ar*x-ai*y;Im(X,k)=t+ar*y+ai*x;}else{Re(X,k)+=s;Im(X,k)+=t;}k+=dx)}}

V cblas_dtrmm(I ly,I Si,I ul,I AT,I d,I M,I N,D a,D*A,I la,D*B,I lb){I i,j,k,nu=(d==CblasNonUnit);D t;
  if(RI&&LO&&AT0){Nij(N,M,t=0.0;if(nu)t=A[i*la+i]*B[i*lb+j];else t=B[i*lb+j];Nkk(1+i,N,t+=A[la*i+k]*B[k*lb+j])B[lb*i+j]=a*t)}
  ef(RI&&LO&&AT1){Ni_(N,Nj(M,t=0.0;Nk(i,t+=Aki*Bkj)if(nu)t+=Aii*Bij;else t+=Bij;Bij=a*t))}
  ef(RI&&UP&&AT0){Ni_(N,Nj(M,t=0.0;Nk(i,t+=Aik*Bkj)if(nu)t+=Aii*Bij;else t+=Bij;Bij=a*t))}
  ef(RI&&UP&&AT1){Nij(N,M,t=0.0;if(nu)t=Aii*Bij;else t=Bij;Nkk(1+i,N,t+=Aki*Bkj)Bij=a*t)}
  ef(LE&&LO&&AT0){Ni(N,Nj_(M,t=0.0;Nk(j,t+=Akj*Bik)if(nu)t+=Ajj*Bij;else t+=Bij;Bij=a*t))}
  ef(LE&&LO&&AT1){Nij(N,M,t=0.0;if(nu)t=Ajj*Bij;else t=Bij;Nkk(1+j,M,t+=Ajk*Bik)Bij=a*t)}
  ef(LE&&UP&&AT0){Nij(N,M,t=0.0;if(nu)t=Ajj*Bij;else t=Bij;Nkk(1+j,M,t+=Akj*Bik)Bij=a*t)}
  es{Ni(N,Nj_(M,t=0.0;Nk(j,t+=Ajk*Bik)if(nu)t+=Ajj*Bij;else t+=Bij;Bij=a*t;))}}

V cblas_ztrmm(I ly,I Si,I ul,I AT,I d,I M,I N,V*a,V*A,I la,V*B,I lb){I i,j,k,nu=(d==CblasNonUnit);D x,y,u,v,s,t,AH=(AT==CblasConjTrans)?-1:1,ar=Re(a,0),ai=Im(a,0);
  if(RI&&LO&&AT0){Nij(N,M,x=0.0;y=0.0;if(nu){u=ARii;v=AH*AIii;s=BRij;t=BIij;x=u*s-v*t;y=u*t+v*s;}else{x=BRij;y=BIij;}Nkk(1+k,N,u=ARik;v=AH*AIik;s=BRkj;t=BIkj;x+=u*s-v*t;y+=u*t+v*s)BRij=ar*x-ai*y;BIij=ar*y+ai*x)}
  ef(RI&&LO&&AT1){Ni_(N,Nj(M,x=0.0;y=0.0;Nk(i,u=ARki;v=AH*AIki;s=BRkj;t=BIkj;x+=u*s-v*t;y+=u*t+v*s)if(nu){u=ARii;v=AH*AIii;s=BRij;t=BIij;x+=u*s-v*t;y+=u*t+v*s;}else{x+=BRij;y+=BIij;}BRij=ar*x-ai*y;BIij=ar*y+ai*x))}
  ef(RI&&UP&&AT0){Ni_(N,Nj(M,x=0.0;y=0.0;Nk(i,u=ARik;v=AH*AIik;s=BRkj;t=BIkj;x+=u*s-v*t;y+=u*t+v*s)if(nu){u=ARii;v=AH*AIii;s=BRij;t=BIij;x+=u*s-v*t;y+=u*t+v*s;}else{x+=BRij;y+=BIij;}BRij=ar*x-ai*y;BIij=ar*y+ai*x))}
  ef(RI&&UP&&AT1){Nij(N,M,x=0.0;y=0.0;if(nu){u=ARii;v=AH*AIii;s=BRij;t=BIij;x=u*s-v*t;y=u*t+v*s;}else{x=BRij;y=BIij;}Nkk(1+i,N,u=ARki;v=AH*AIki;s=BRkj;t=BIkj;x+=u*s-v*t;y+=u*t+v*s)BRij=ar*x-ai*y;BIij=ar*y+ai*x)}
  ef(LE&&LO&&AT0){Ni(N,Nj_(M,x=0.0;y=0.0;Nk(j,u=ARkj;v=AH*AIkj;s=BRik;t=BIik;x+=u*s-v*t;y+=u*t+v*s)if(nu){u=ARjj;v=AH*AIjj;s=BRij;t=BIij;x+=u*s-v*t;y+=u*t+v*s;}else{x+=BRij;y+=BIij;}BRij=ar*x-ai*y;BIij=ar*y+ai*x))}
  ef(LE&&LO&&AT1){Nij(N,M,x=0.0;y=0.0;if(nu){u=ARjj;v=AH*AIjj;s=BRij;t=BIij;x=u*s-v*t;y=u*t+v*s;}else{x=Re(B,i*lb+j);y=Im(B,i*lb+j);}Nkk(1+j,M,u=ARjk;v=AH*AIjk;s=BRik;t=BIik;x+=u*s-v*t;y+=u*t+v*s)BRij=ar*x-ai*y;BIij=ar*y+ai*x)}
  ef(LE&&UP&&AT0){Nij(N,M,x=0.0;y=0.0;if(nu){u=ARjj;v=AH*AIjj;s=BRij;t=BIij;x=u*s-v*t;y=u*t+v*s;}else{x=BRij;y=BIij;}Nkk(1+j,M,u=ARkj;v=AH*AIkj;s=BRik;t=BIik;x+=u*s-v*t;y+=u*t+v*s;)BRij=ar*x-ai*y;BIij=ar*y+ai*x)}
  es{Ni(N,Nj_(M,x=0.0;y=0.0;Nk(j,u=ARjk;v=AH*AIjk;s=BRik;t=BIik;x+=u*s-v*t;y+=u*t+v*s)if(nu){u=ARjj;v=AH*AIjj;s=BRij;t=BIij;x+=u*s-v*t;y+=u*t+v*s;}else{x+=BRij;y+=BIij;}BRij=ar*x-ai*y;BIij=ar*y+ai*x;}))}

#undef I
#undef D
#undef V
#undef BLAS_IMPL
#endif

