//Jos Stam:A Simple Fluid Solver based on the FFT
//www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/jgt01.pdf

//#include <srfftw.h>
#include<math.h>
#include"rfftw.h"

#define N 4
typedef double F; //float
static rfftwnd_plan plan_rc, plan_cr;

void init_FFT(int n){
 plan_rc=rfftw2d_create_plan(n,n,FFTW_REAL_TO_COMPLEX, FFTW_IN_PLACE);
 plan_cr=rfftw2d_create_plan(n,n,FFTW_COMPLEX_TO_REAL, FFTW_IN_PLACE);
} 

#define FFT(s,u) if(s==1)rfftwnd_one_real_to_complex(plan_rc,(fftw_real *)u, (fftw_complex *)u);else rfftwnd_one_complex_to_real(plan_cr,(fftw_complex *)u, (fftw_real *)u)

#define floor(x) ((x)>=0.0?((int)(x)):(-((int)(1-(x)))))

void P(char *s,F*x){
 printf("%s\n",s);for(int j=0;j<N;j++){
  for(int i=0;i<N;i++)printf(" %7.4f",x[i*N+j]);printf("\n");}}

void flow(int n,F*u,F*v,F*u0,F*v0,F visc,F dt){
 F x, y, x0, y0, f, r, U0, U1, V0, V1, s, t;
 int i, j, i0, j0, i1, j1;

 //for(i=0;i<n*n;i++){
 // u[i]+=dt*u0[i];u0[i]=u[i];
 // v[i]+=dt*v0[i];v0[i]=v[i];
 //}
//
 //for( x=0.5/n,i=0;i<n;i++,x+=1.0/n){
 // for(y=0.5/n,j=0;j<n;j++,y+=1.0/n ){
 //  x0 = n*(x-dt*u0[i+n*j])-0.5; y0 = n*(y-dt*v0[i+n*j])-0.5;
 //  i0 = floor(x0); s = x0-i0; i0 = (n+(i0%n))%n; i1 = (i0+1)%n;
 //  j0 = floor(y0); t = y0-j0; j0 = (n+(j0%n))%n; j1 = (j0+1)%n;
 //  u[i+n*j] = (1-s)*((1-t)*u0[i0+n*j0]+t*u0[i0+n*j1])+s*((1-t)*u0[i1+n*j0]+t*u0[i1+n*j1]);
 //  v[i+n*j] = (1-s)*((1-t)*v0[i0+n*j0]+t*v0[i0+n*j1])+s*((1-t)*v0[i1+n*j0]+t*v0[i1+n*j1]);
 // }
 //}
 
 //printf("x0\n");for(y=0.5/n,j=0;j<n;j++,y+=1.0/n ){
 // for( x=0.5/n,i=0;i<n;i++,x+=1.0/n){
 //  x0 = n*(x-dt*u0[i+n*j])-0.5; y0 = n*(y-dt*v0[i+n*j])-0.5;
 //  printf(" %f",x0);
 // };printf("\n");
 //}
 
 //P("u",u);
 //P("v",v);
 
 for(i=0;i<n;i++)for(j=0;j<n;j++){u0[i+(n+2)*j]=u[i+n*j];v0[i+(n+2)*j]=v[i+n*j];}
 FFT(1,u0);FFT(1,v0);

printf("ui\n");
 for(i=0;i<=n;i+=2){
  x = 0.5*i;
  for(j=0;j<n;j++){
   y = j<=n/2 ? j : j-n;
   r = x*x+y*y;
//printf(" %lf", u0[i+1 +(n+2)*j]);
   if(r==0.0)printf(" ?????");
   if(r==0.0)continue;
   f = exp(-r*dt*visc);
   U0=u0[i  +(n+2)*j];V0=v0[i  +(n+2)*j];
   U1=u0[i+1+(n+2)*j];V1=v0[i+1+(n+2)*j];
   //u0[i  +(n+2)*j]=f*((1-x*x/r)*U0   -x*y/r *V0);
   //u0[i+1+(n+2)*j]=f*((1-x*x/r)*U1   -x*y/r *V1);
   //v0[i  +(n+2)*j]=f*(-y*x/r   *U0+(1-y*y/r)*V0);
   //v0[i+1+(n+2)*j]=f*(-y*x/r   *U1+(1-y*y/r)*V1);
   u0[i  +(n+2)*j]=((1-x*x/r)*U0   -x*y/r *V0);
   u0[i+1+(n+2)*j]=((1-x*x/r)*U1   -x*y/r *V1);
   v0[i  +(n+2)*j]=(-y*x/r   *U0+(1-y*y/r)*V0);
   v0[i+1+(n+2)*j]=(-y*x/r   *U1+(1-y*y/r)*V1);
printf(" %lf", u0[i+1+(n+2)*j]);
   //u0[i  +(n+2)*j]*=f;
   //u0[i+1+(n+2)*j]*=f;
   //v0[i  +(n+2)*j]*=f;
   //v0[i+1+(n+2)*j]*=f;
  }
printf("\n");
 }
 FFT(-1,u0);FFT(-1,v0);
 f=1.0/(n*n);
 for(i=0;i<n;i++)for(j=0;j<n;j++){u[i+n*j]=f*u0[i+(n+2)*j];v[i+n*j]=f*v0[i+(n+2)*j];}
}

void main(){
 F *u =malloc(sizeof(F)*N*(N+2));
 F *v =malloc(sizeof(F)*N*(N+2));
 F *u0=malloc(sizeof(F)*N*(N+2));
 F *v0=malloc(sizeof(F)*N*(N+2));
 for(int i=0;i<N*N;i++){u[i]=0.0;v[i]=0.0;u0[i]=0.0;v0[i]=0.0;}
 
 FILE *fp=fopen("data","rb");
 fread(u,8,N*N,fp);fread(v,8,N*N,fp);fread(u0,8,N*N,fp);fread(v0,8,N*N,fp);
 //printf("data:");for(int i=0;i<2*N;i++)printf(" %lf", u[i]);printf("\n");
 fclose(fp); 
 
 init_FFT(N);
 //P("u",u);
 //P("v",v);
 //P("u0",u0);
 //P("v0",v0);
 printf("project\n");
 flow(N,u,v,u0,v0,0.5,0.1);
 //P("u",u);
 //P("v",v);
 
 
}
