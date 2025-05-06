int f(int x);
int h(int x){if(x>10)return x;return f(--x);}
int g(int x){return h(2*x);}
int f(int x){return g(1+x);}
int main(int x){
 return f(3); 
}
