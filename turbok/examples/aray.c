int*iota(int*x,int n){while(n --> 0)x[n]=n;return x;}
int suma(int*x,int n){int r;while(n --> 0)r+=x[n];return r;}
int main(int x){return suma(iota(0,x),x);}

int expect(int a,int b);
int test(){expect(6,suma(iota(0,3),3));}
