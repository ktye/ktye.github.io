void csroot_(double*,double*,double*,double*);
double pythag_(double*,double*);
double _Complex csqrt(double _Complex x){
	double xr=__real__ x, xi=__imag__ x;
	double yr, yi;
	csroot_(&xr,&xi,&yr,&yi);
	return __builtin_complex(yr,yi);
}
double cabs(double _Complex x){
	double xr=__real__ x, xi=__imag__ x;
	return pythag_(&xr,&xi);
}
