int*iota(int n){
 int*x;
 x=0;
 while(n-->0)x[n]=n;
 return x;
}
int sum(int*x,int n){
 int r;
 r=0;
 while(n --> 0)r+=x[n];
 return r;
}
int main(int n){ return sum(iota(n),n); }
