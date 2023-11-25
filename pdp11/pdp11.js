let M,D=32*1024 //M:I,D; D:data offset 
let wait=false
let rst=(c)=>{M=new Uint16Array(64*1024);M[7]=01000;c.forEach((x,i)=>M[256+i]=x)}

let A=(x,a)=>{let r=x&7,y=(6==x&070)?M[-1+M[7]>>1]:0
 //todo pc: if((m&7)==7){..}      //pc see 3-18
 if(x==027){a[0]=2;return M[7]>>1}
 a[0]=2*+(5<((x&070)>>3))
 switch((x&070)>>3){          //addressing mode
 case 0: return r                        //   r
 case 1: nyi()                           //  (r)
 case 2: let q=M[r];M[r]+=2;return q     //  (r)+
 case 3: nyi()                           // @(r)+
 case 4: M[r]-=2;return M[r]>>1          // -(r)
 case 5: return y+M[D+r]                 // x(r)
 default:nyi();                          //@x(r)
}}

let step=()=>{ let l=x=>x //console.log(x)
 //console.log("step", "pc", oct(M[7]))
 let x=M[M[7]>>1],a=[0]
 show(M[7])             ;   //console.log("step", "pc", oct(M[7]), "inst", oct(x))
 M[7]+=2
 let d=A(x&077,a);M[7]+=a[0];a[0]=0
 if(0200==(x&01777770)){
  M[7]=M[d];M[7]=po();console.log("rts to", M[7]);return} //rts
 switch(x&077700){
 case 05000: M[d]=0     ;l("clr"); return //clr
 case 05200: M[d]++     ;l("inc"); return //inc
 case 05300: M[d]--     ;l("dec"); return //dec
 case 05400: M[d]=-M[d] ;l("neg"); return //neg
 }
 switch(x&0177000){ //jsr,mul,div,ash,ashc,xor,sob
 case 0004000:pu(((x&07700)==04700)?M[7]:nyi());M[7]=M[d] ; return //jsr
 }

 let s=A((x&07700)>>6,a);M[7]+=a[0]
 switch(x&070000){ //mov,cmp,bit,bic,bis
 case 010000: M[d] =M[s] ;l("mov "+oct(s));return  //mov
 case 060000: M[s]+=M[d] ;l("add");return  //add
 }
 console.log(x&0170000)
 switch(x&0170000){ //add,sub
 case 0060000: nyi() //add
 case 0160000: nyi() //sub
 }
}
let pu=x=>{console.log("push",Oct(x));M[6]-=2;M[M[6]>>1]=x} //mov x,-(sp)
let po=()=>{M[6]+=2;return M[M[6]>>1]}       //mov (sp)+,r

let run=()=>{ge("runbut").disabled=true;ge("stepbut").disabled=true;ge("stopbut").disabled=false
 let f=t=>{step();if(!wait)requestAnimationFrame(f)}
 if(!wait)requestAnimationFrame(f)
}

function oct(x){return"0"+x.toString(8)}
function Oct(x){let r=x.toString(8);return"000000".slice(0,6-r.length)+r}
function nyi(){throw("nyi")}
