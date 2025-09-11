double fabs(double);
double _Complex __divdc3(double xr,double xi,double yr,double yi){
 double _Complex z;
 double r,d,e,f;
 if(fabs(yr)>=fabs(yi)){ r=yi/yr; d=yr+r*yi; e=(xr+xi*r)/d; f=(xi-xr*r)/d; }
 else{                   r=yr/yi; d=yi+r*yr; e=(xr*r+xi)/d; f=(xi*r-xr)/d; }
 __real__ z = e;
 __imag__ z = f;
 return z;
}
