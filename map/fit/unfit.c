#include<stdio.h>
#include<io.h>
#include<fcntl.h>
#define U getchar()
#define H (U|U<<8)
#define I (H|H<<16)
#define F (double)I/11930465
int main(){
_setmode(_fileno(stdin),_O_BINARY);
int d[32],t,z,n=U;while(--n)U;
while(0<=(n=U)){t=n&15;
if(n&64){H;z=20==(n=H)?t:z;d[t]=0;n=U;while(n--){U;d[t]+=U;U;}
}else{n=d[t];if(t==z){I;printf("%g %g\n",F,F);n-=12;}while(n--)U;}}}

#include<stdio.h>
#define U getchar()
#define H (U|U<<8)
#define F (double)(H|H<<16)/11930465
int main(){int d[32],t,z,n=U;
while(--n)U;while(0<=(n=U)){t=n&15;
if(n&64){H;z=20==(n=H)?t:z;d[t]=0;
n=U;while(n--){U;d[t]+=U;U;}}
else{n=d[t];if(t==z){F;
printf("%g %g\n",F,F);n-=12;}
while(n--)U;}}}
