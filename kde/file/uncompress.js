/* from SnappyJs 0.7.0 Zhipeng Jia (MIT) https://github.com/zhipeng-jia/snappyjs */
function uncompress(x){ //trusted input
 let L=function(x){let p=0,r=0,s=0,c,v
  while(s<32&&p<x.length){c=x[p];p+=1;v=c&127;r|=v<<s;if(c<128)return[r,p];s+=7}}
 let D=function(r,x,p){let n=x.length,q=0,c,l,s,o,W=[0,255,0xffff,0xffffff,0xffffffff]
  while(p<n){c=x[p];p++
   if((c&3)===0){l=(c>>>2)+1
    if(l>60){s=l-60;l=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);l=(l&W[s])+1;p+=s}
    r.set(x.subarray(p,p+l),q);p+=l;q+=l
   }else{switch(c&3){
    case 1:l=((c>>>2)&7)+4;o=x[p]+((c>>>5)<<8);p+=1;break
    case 2:l=(c>>>2)+1;o=x[p]+(x[p+1]<<8);p+=2;break
    case 3:l=(c>>>2)+1;o=x[p]+(x[p+1]<<8)+(x[p+2]<<16)+(x[p+3]<<24);p+=4;break
    default:break}
    for(let i=0;i<l;i++)r[q+i]=r[q+i-o];q+=l}};return r}
 let [n,p]=L(x);return D(new Uint8Array(n),x,p)}
