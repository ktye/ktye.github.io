typedef long I;
typedef struct {I t,c,n,r,s[1];}*A;
#define AT(a) ((a)->t)          // type
#define AC(a) ((a)->c)          // refcount
#define AN(a) ((a)->n)          // number of elements
#define AR(a) ((a)->n)          // rank
#define AS(a) ((a)->s)          // shape list
#define AV(a) ((I*)(a)+4+AR(a)) // array data

#define GA (v,t,n,r,s) RZ(v=ga((I)(t),(I)(n),(I)(r),(I*)(s)))
#define GGA(v,t,n,r)   {GA(v,t,n,r,0); AC(v)=1;}
//#define WP(t,n,r)    ...

#define R        return
#define RZ(exp)  {if(!(exp))R 0;}

#define F1(f) A f (w,self)A w,self;
#define F2(f) A f (a,w,self)A a,w,self;

A one,zero;

A ga(t,n,r,s)I t,n,r,*s;{A z;I m;
 RZ(z=ma(m=4*(4+r+n)))
 AC(z)=1; AN(z)=n; AR(z)=r; AT(z)=t; /* tpush.. */
 R z;
}


F1(lamin1){R reshape(over(one,shape(w)),ravel(w));}
F2(lamin2){R over(a,reshape(over(one,shape(AR(w)?w:a)),ravel(w));}

F1(ravel){R w;}
F2(reshape){R w;}
F2(over){R w;}

main(){
 GGA(zero,BOOL,1,0); *(B*)AV(zero)=0;
 GGA(one, BOOL,1,0); *(B*)AV(one )=1;
}
