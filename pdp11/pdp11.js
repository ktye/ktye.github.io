let M,D=32*1024 //M:I,D; D:data offset 
let si=new Int16Array(1),S=x=>{si[0]=x;return si[0]}
let carry=0,sign=0,zero=0 //Z(zero) N(negative) C(carry) V(overflow) T(trap)
let wait=false
let brk=0
let rst=(c)=>{M=new Uint16Array(64*1024);M[7]=01000;c.forEach((x,i)=>M[256+i]=x)}

let A=(x,a)=>{let r=x&7,y=(060==(x&070))?M[M[7]>>1]:0
 //todo pc: if((m&7)==7){..}      //pc see 3-18
 if(x==027){a[0]=2;return M[7]>>1}
 a[0]=2*+(5<((x&070)>>3))
 switch((x&070)>>3){          //addressing mode
 case 0:return r                         //   r
 case 1:nyi()                            //  (r)
 case 2:let q=M[r]>>1;M[r]+=2;return D+q //  (r)+
 case 3:nyi()                            // @(r)+
 case 4:M[r]-=2;return D+(      M[r] >>1)// -(r)
 case 6:        return D+((S(y)+M[r])>>1)// x(r)
 default:nyi();                          //@x(r)
}}

let step=()=>{ let l=x=>console.log(x)
 //console.log("step", "pc", oct(M[7]))
 let x=M[M[7]>>1],a=[0]
 show(M[7])             ;   //console.log("step", "pc", oct(M[7]), "inst", oct(x))
 M[7]+=2
 let r,d=A(x&077,a);M[7]+=a[0];a[0]=0
 if(0200==(x&01777770)){M[7]=M[d];M[7]=po();return} //rts
 switch(x&077700){ //clr,com,inc,dec,neg,adc,sbc,tst,ror,rol,asr,asl,sxt
 case 05000:M[d]=0     ;l("clr"); return //clr
 case 05200:M[d]++     ;l("inc"); return //inc  todo flags
 case 05300:M[d]--     ;l("dec"); return //dec
 case 05400:M[d]=-M[d] ;l("neg"); return //neg
 case 05500:M[d]+=carry;l("adc"); return //adc  todo flags
 }
 switch(x&0177000){ //jsr,mul,div,ash,ashc,xor,sob
 case 0004000:pu(((x&07700)==04700)?M[7]:nyi());M[7]=M[d] ;l("jsr"); return //jsr
 case 0070000:r=M[s]*M[d];M[s]=r>>16;M[1+s]=f&0xffff;sign=+((r&0x80000000)!=0);zero=+(r==0);carry=+((r<(1<<15))||r>=((1<<15)-1));return //mul
 }
 switch(x&0177700){ //jmp,swab,mark,mfpi,mtpi
 case 0100:M[7]=M[d]   ;l("jmp"); return //jmp
 }

 let s=A((x&07700)>>6,a);M[7]+=a[0]
 switch(x&0170000){ //add,sub
 case 0010000:M[d] =M[s];l("mov");return //mov
 case 0060000:M[d]+=M[s];l("add");return //add  todo flags/carry..
 case 0160000:M[d]-=M[s];l("sub");return //sub
 }
 switch(x&070000){ //mov,cmp,bit,bic,bis
 }
}
let pu=x=>{M[6]-=2;M[D+(M[6]>>1)]=x} //mov x,-(sp)
let po=()=>{M[6]+=2; nyi();  return M[D+(M[6]>>1)]}       //mov (sp)+,r

let run=(x)=>{ge("runbut").disabled=true;ge("stepbut").disabled=true;
 if(x!="")return runtest(x)
 let f=t=>{step();if((!wait)&&(M[7]!=brk))requestAnimationFrame(f);else{ge("runbut").disabled=false;ge("stepbut").disabled=false}}
 if(!wait)requestAnimationFrame(f)
}

function oct(x){return"0"+x.toString(8)}
function Oct(x){let r=x.toString(8);return"000000".slice(0,6-r.length)+r}
function nyi(){throw("nyi")}
