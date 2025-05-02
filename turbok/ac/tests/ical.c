int add(int x, int y){return x+y;}
int f[2]={add,add};

int add(int x,int y){return x+y;}
int sub(int x,int y){return x-y;}
int mul(int x,int y){return x*y;}
int(*f[3])(int,int)={add,sub,mul};
int main(int x){
 return f[x](3,4);
}

