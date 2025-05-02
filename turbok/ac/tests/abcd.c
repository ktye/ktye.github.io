//predeclare f
double f(double x);

double F; //global

/*
 main function
 */
int main(int x){
 int a;
 F=3.14;
 a = 1+(int)f(x);
 return a-x;
}
double f(double x){return F+1+x;}
int g(int x, int y){
 if(x){return 1+y;}
 return y;
}
int h(int x, int y){
 if(x){return 1+y;}
 else {return 2+y;}
}
int tern(int x, int y){ return x?1+y:2+y; }
