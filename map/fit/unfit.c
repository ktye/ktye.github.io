#include<stdio.h>
#include<io.h>
#include<fcntl.h>
#define U getchar()
#define H (U|U<<8)
#define I (H|H<<16)
int main(){
 _setmode(_fileno(stdin),_O_BINARY);
 int d[64];
 int h,t,m,n;while(0<=(h=U)){t=h&15;printf("%d %d\n",h&64,t);
  if(h&64){n=H,H;d[t]=0;n=U;while(n--){U;d[t]+=255&H;}
  }else{n=d[t];while(n--)U;
  }
 }
}


/*
let
unfit=b=>{let p=0,d=[],l=[],B=_=>b[p++],h,t,n,m,z,
s=11930465,H=_=>B()|B()<<8,I=_=>H()|H()<<16;p=B()
while(p<b.length-2){h=B();t=h&15;if(h&64){H()
if(20==(m=H()))z=t;d[t]=0;n=B();while(n--){p++;d[t]+=255&H()}}
else{if(t==z)I(),l.push(I()/s,I()/s),p-=12;p+=d[t]}}
return l}

//invalids: I()==2147483647 lalo==179.99999555759143
console.log(unfit(Deno.readFileSync(Deno.args[0])))
*/
