/* from SnappyJs 0.7.0 Zhipeng Jia (MIT) https://github.com/zhipeng-jia/snappyjs */
function uncompress(x){
 let uclen=function(x){let p=0,r=0,s=0,c,v
  while(s<32&&p<x.length){c=x[p];p+=1;v=c&0x7f;
   if(((v<<s)>>>s)!==v)return -1;r|=v<<s;if(c<128)return[r,p];s+=7
  };return -1}
 let cp=function(x,a,y,b,n){for(let i=0;i<n;i++)y[b+i]=x[a+i]}
 let scb=function(x,p,o,n){for(let i=0;i<n;i++)x[p+i]=x[p-o+i]}
 let dectob=function(r,x,p){let n=x.length,q=0,c,l,s,o,W=[0,0xff,0xffff,0xffffff,0xffffffff]
  while(p<n){c=x[p];p++
   if((c&0x3)===0){l=(c>>>2)+1
    if(l>60){if(p+3>=n)return false;s=l-60;l=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);l=(l&W[s])+1;p+=s}
    if(p+l>n)return false;cp(x,p,r,q,l);p+=l;q+=l
   }else{switch(c&0x3){
    case 1:l=((c>>>2)&0x7)+4;o=x[p]+((c>>>5)<<8);p+=1;break
    case 2:if(p+1>=n)return false;l=(c>>>2)+1;o=x[p]+(x[p+1]<<8);p+=2;break
    case 3:if(p+3>=n)return false;l=(c>>>2)+1;o=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);p+=4;break
    default:break}
    if(o===0||o>q)return false
    scb(r,q,o,l);q+=l
  }};return true}
 let [n,p]=uclen(x);let r=new Uint8Array(n);dectob(r,x,p);return r}
