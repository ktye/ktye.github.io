int add(int x,int y){return x+y;}
int sub(int x,int y){return x-y;}
int mul(int x,int y){return x*y;}

//c-function pointer syntax is not supported:
//int(*f[3])(int,int)={add,sub,mul};

//indirect call table
void f[]={add,sub,mul};

int main(int x){

 // to compute the function signature of the indirect call,
 // it needs an explicit cast for the return type.
 // argument types are derived.

 return 2*(int)f(x,3,4); //call f[x] with arguments (3,4)

}

