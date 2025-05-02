int main(int i){
 while(i<10)i++;
 return i;
}
int g(int x){
 while(x<5){
  if(x<0){x=-x;continue;}
  if(x%2)break;
  x++;
 }
 return x;
}
