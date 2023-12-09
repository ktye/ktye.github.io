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
 case 1:return D+(M[r]>>1)               //  (r)
 case 2:let q=M[r]>>1;M[r]+=2;return D+q //  (r)+
 case 3:nyi()                            // @(r)+
 case 4:
  M[r]-=2;return D+(      M[r] >>1)// -(r)
 case 6:        return D+((S(y)+M[r])>>1)// x(r)
 default:nyi()                           //@x(r)
}}
let F=x=>{sign=x&0x8000;zero=x==0;return x}

let step=()=>{ let l=x=>console.log(x)
 let x=M[M[7]>>1],a=[0]
 show(M[7])             ;   //console.log("step", "pc", oct(M[7]), "inst", oct(x))
 M[7]+=2

 let o=x&0xff
 switch(x&0177400){ //br before reading addr
 case 0000400:                              br(o);l("br") ;return //br
 case 0001000:if(!zero)                     br(o);l("bne");return //bne
 case 0001400:if( zero)                     br(o);l("beq");return //beq
 case 0002000:if( !xor(zero,sign))          br(o);l("bge");return //bge
 case 0002400:if(  xor(zero,sign))          br(o);l("blt");return //blt
 case 0003000:if((!xor(zero,sign))&&(!zero))br(o);l("bgt");return //bgt
 case 0003400:if(( xor(zero,sign))||( zero))br(o);l("ble");return //ble
 case 0100000:if(!sign)                     br(o);l("bpl");return //bpl
 case 0101000:if((!carry)&&(!zero))         br(o);l("bhi");return //bhi
 case 0101400:if(  carry ||  zero )         br(o);l("blos");return//blos
 case 0100400:if( sign)                     br(o);l("bmi");return //bmi
 case 0103000:if(!carry)                    br(o);l("bcc");return //bcc bhis
 case 0103400:if( carry)                    br(o);l("bcs");return //bcs
 }


 let r,d=A(x&077,a);
 M[7]+=a[0];a[0]=0
 if(0200==(x&01777770)){M[7]=M[d];M[7]=po();return} //rts
 switch(x&077700){ //clr,com,inc,dec,neg,adc,sbc,tst,ror,rol,asr,asl,sxt
 case 05000:M[d]=F(0)                        ;l("clr");return //clr
 case 05100:M[d]=F(~M[d])                    ;l("com");return //com
 case 05200:M[d]++;F(M[d])                   ;l("inc");return //inc
 case 05300:M[d]--;F(M[d])                   ;l("dec");return //dec
 case 05400:M[d]=F(-M[d]);carry=M[d]!=0      ;l("neg");return //neg
 case 05500:M[d]+=carry                      ;l("adc");return //adc  //todo F..vv
 case 05600:M[d]-=carry                      ;l("sbc");return //sbc
 case 05700:sign=!!(M[d]&0x8000);zero=M[d]==0;l("tst");return //tst
 case 06300:M[d]<<=1;F(M[d])                 ;l("asl");return //asl
 case 06700:M[d]=sign?-1:0                   ;l("sxt");return //sxt
 }

 let s=(x&07700)>>6 //s:src/dest reg
 switch(x&0177000){ //jsr,mul,div,ash,ashc,xor,sob
 case 0004000:pu(((x&07700)==04700)?M[7]:nyi());M[7]=M[d] ;l("jsr"); return //jsr
 case 0070000:r=M[s]*M[d];M[s]=r>>16;M[1+s]=r&0xffff;sign=+((r&0x80000000)!=0);zero=+(r==0);carry=+((r<(1<<15))||r>=((1<<15)-1));l("mul");return //mul
 case 0072000:s&=7;M[s]=(0x8000&M[d])?(M[s]>>(0xffff&-M[d])):(M[s]<<M[d]);F(M[s]); l("ash"); return //ash  todo:carry
 case 0073000:s&=7;let u=(M[s]<<16)|M[1+s];u=F((0x8000&M[d])?(u>>(0xffff&-M[d])):(u<<M[d]))
  M[s]=0xffff&(u>>16);M[1+s]=0xffff&u                     ;l("ashc");return //ashc
 case 0074000:M[d]^=M[s&7];F(M[d])                        ;l("xor"); return //xor
 }
 switch(x&0177700){ //jmp,swab,mark,mfpi,mtpi
 case 0100:M[7]=M[d]   ;l("jmp"); return //jmp
 }


 s=A((x&07700)>>6,a);M[7]+=a[0]
 switch(x&0170000){ //add,sub
 case 0010000:M[d]=F(M[s])                         ;l("mov");return //mov
 case 0060000:carry=(M[d]+M[s])>=0xffff;M[d]+=M[s] ;l("add");return //add
 case 0160000:carry=M[s]>M[d];M[d]-=M[s];l("sub")  ;l("sub");return //sub
 }
 switch(x&070000){ //mov,cmp,bit,bic,bis
 case 0020000:F(M[s]-M[d]);carry=M[s]<M[d]         ;l("cmp");return //cmp
 case 0040000:M[d]&=~M[s];F(M[d])                  ;l("bic");return //bic
 case 0050000:M[d]|= M[s];F(M[d])                  ;l("bis");return //bis
 }
}
let br=x=>{if(x&0x80)x=-(((~x)+1)&0xff);x<<=1;M[7]+=x}    //branch
let pu=x=>{M[6]-=2;M[D+(M[6]>>1)]=x}               //mov x,-(sp)
let po=()=>{M[6]+=2;return M[D+(M[6]>>1)-1]}       //mov (sp)+,r
let xor=(x,y)=>((x||y)&&!(x&&y))

let run=(x)=>{ge("runbut").disabled=true;ge("stepbut").disabled=true;
 if(x!="")return runtest(x)
 let f=t=>{step();if((!wait)&&(M[7]!=brk))requestAnimationFrame(f);else{ge("runbut").disabled=false;ge("stepbut").disabled=false}}
 if(!wait)requestAnimationFrame(f)
}

function oct(x){return"0"+x.toString(8)}
function Oct(x){let r=x.toString(8);return"000000".slice(0,6-r.length)+r}
function nyi(){throw("nyi")}
