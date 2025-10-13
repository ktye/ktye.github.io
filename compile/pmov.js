
let pmov=(dst,src)=>{
 let M=[]
 let n=src.length
 let status=Array(n).fill(0)
 let f=i=>{
  let s=[0,i],g
  while(s.length){
   i=s.pop();g=s.pop()
   console.log("i",i,"g",g)
   if(src[i]!=dst[i]){
    if(0==g){
     if(0==status[i]){status[i]=1; s.push(2);s.push(i) 
      for(let j=n-1;j>=0;j--){
       if(src[j]==dst[i]){s.push(0);s.push(j)}
      }
     }else if(1==status[i]){console.log("i",i);M.push(-1);M.push(src[i]);src[i]=-1}
    }else{
     M.push(dst[i]);M.push(src[i])
     status[i]=2
    }
   }
  }
 }
 for(let i=0;i<n;i++)if(0==status[i])f(i)
 return M
}

/*
let pmov=(dst,src)=>{
 let M=[]
 let n=src.length,tmp=-1
 let status=Array(n).fill(0)
 let f=i=>{
  if(src[i]!=dst[i]){
   status[i]=1
   for(let j=0;j<n;j++){
    if(src[j]==dst[i]){let sj=status[j]
     if(0==sj)f(j)
     else if(1==sj){M.push(tmp);M.push(src[j]);src[j]=tmp}
    }
   }
   M.push(dst[i]);M.push(src[i])
   status[i]=2
  }
 }
 for(let i=0;i<n;i++)if(0==status[i])f(i)
 console.log("M",M)
}
*/
//https://xavierleroy.org/publi/parallel-move.pdf
//https://compiler.club/parallel-moves/
//https://gist.github.com/contificate/87377cd9f451891b58d5b9b24906720b
