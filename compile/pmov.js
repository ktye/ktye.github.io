
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

//https://xavierleroy.org/publi/parallel-move.pdf
//https://compiler.club/parallel-moves/
//https://gist.github.com/contificate/87377cd9f451891b58d5b9b24906720b