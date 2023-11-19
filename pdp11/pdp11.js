let M,D=32*1024 //M:I,D; D:data offset 
let rst=(c)=>{M=new Uint16Array(64*1024);M[7]=01000;c.forEach((x,i)=>M[256+i]=x)}

let A=x=>{let r=x&7,y=(6==x&070)?M[-1+M[7]>>1]:0
 //     r (r)    (r)+     @(r+) -(r)     @-(r) x(r)     @x(r) //addressing modes
 return[r,M[D+r],M[D+r]++,     ,--M[D+r],     ,y+M[D+r],     ][x&070]}

let step=()=>{
 let x=M[M[7]>>1]
 show(M[7])             ;   console.log("step", "pc", M[7], "inst", x)
 M[7]+=2
 let d=A(x&0377)
 switch(x&077700){
 case 05000: M[d]=0     ; return //clr
 case 05200: M[d]++     ; return //inc
 case 05300: M[d]--     ; return //dec
 case 05400: M[d]=-M[d] ; return //neg
 }
 let s=A((x&07700)>>6)
 switch(x&070000){
 case 010000: M[d] =M[s] ; return  //mov
 case 060000: M[s]+=M[d] ; return  //add
 }
}

