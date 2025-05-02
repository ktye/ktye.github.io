int g(int x, int y){
 if(x)return 1+y;
 return y;
}
int h(int x, int y){
 if(x)return 1+y;
 else return 2+y;
}
int tern(int x, int y){ return x?1+y:2+y; }
int main(int x){
 if(x==g(x,x)){
  x=h(x,x);
 }
 return tern(x>3,x);
}
