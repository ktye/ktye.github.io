let M,D=32*1024 //M:I,D; D:data offset 
let si=new Int16Array(1),S=x=>{si[0]=x;return si[0]}
let I=new Int32Array(2)
let carry=0,sign=0,over=0,zero=0 //Z(zero) N(negative) C(carry) V(overflow) T(trap)
let wait=false,test=false
let brk=0
let rst=(c)=>{M=new Uint16Array(64*1024);M[7]=01000;c.forEach((x,i)=>M[256+i]=x)}

let A=(x,a)=>{let r=x&7,y=(060==(x&070))?M[M[7]>>1]:0
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

let step=()=>{ let l=x=>hpush(x)
 let x=M[M[7]>>1],a=[0]
 test?show(M[7]):track(M[7])
 M[7]+=2

 switch(x){
 case 0244:zero=0;l("clz");return //clz
 case 0264:zero=1;l("sez");return //sez
 case 0105727:M[7]+=4;ttw();l("tstb");return //tstb #177560
 }
 
 let o=x&0xff
 switch(x&0177400){ //br before reading addr
 case 0000400:                              br(o);l("br") ;return //br
 case 0001000:if(!zero)                     br(o);l("bne");return //bne
 case 0001400:if( zero)                     br(o);l("beq");return //beq
 case 0002000:if(!xor(sign,over))           br(o);l("bge");return //bge
 case 0002400:if( xor(sign,over))           br(o);l("blt");return //blt
 case 0003000:if((!xor(sign,over))&&(!zero))br(o);l("bgt");return //bgt
 case 0003400:if(( xor(sign,over))||( zero))br(o);l("ble");return //ble
 case 0100000:if(!sign)                     br(o);l("bpl");return //bpl
 case 0101000:if((!carry)&&(!zero))         br(o);l("bhi");return //bhi
 case 0101400:if(  carry ||  zero )         br(o);l("blos");return//blos
 case 0100400:if( sign)                     br(o);l("bmi");return //bmi
 case 0103000:if(!carry)                    br(o);l("bcc");return //bcc bhis
 case 0103400:if( carry)                    br(o);l("bcs");return //bcs
 }
 if(077000==(x&0177000)){if(--M[(x&0700)>>6])br(-o);l("sob");return}//sob


 let r,d=A(x&077,a);
 M[7]+=a[0];a[0]=0
 if(0200==(x&01777770)){M[7]=M[d];M[7]=po();return} //rts
 switch(x&077700){ //clr,com,inc,dec,neg,adc,sbc,tst,ror,rol,asr,asl,sxt
 case 05000:M[d]=F(0);over=0                 ;l("clr");return //clr
 case 05100:M[d]=F(~M[d]);over=0             ;l("com");return //com
 case 05200:M[d]++;F(M[d])                   ;l("inc");return //inc
 case 05300:M[d]--;F(M[d])                   ;l("dec");return //dec
 case 05400:M[d]=F(-M[d]);carry=M[d]!=0;over=M[d]==0x8000 ;l("neg");return //neg
 case 05500:M[d]+=carry;F(M[d]);carry=(M[d]==0)&&carry; l("adc");return //adc  //todo F..vv
 case 05600:r=M[d];M[d]-=carry;F(M[d]);carry=carry&&(0==r);l("sbc");return //sbc
 case 05700:sign=!!(M[d]&0x8000);zero=M[d]==0;over=0;l("tst");return //tst
 case 06300:M[d]<<=1;F(M[d])                 ;l("asl");return //asl
 case 06700:M[d]=sign?-1:0                   ;l("sxt");return //sxt
 }

 let s=(x&07700)>>6 //s:src/dest reg
 switch(x&0177000){ //jsr,mul,div,ash,ashc,xor
 case 0004000:pu(((x&07700)==04700)?M[7]:nyi());M[7]=M[d] ;l("jsr"); return //jsr
 case 0070000:r=M[s]*M[d];M[s]=r>>16;M[1+s]=r&0xffff;sign=+((r&0x80000000)!=0);zero=+(r==0);carry=+((r<(1<<15))||r>=((1<<15)-1));over=0;l("mul");return //mul
 case 0071000:s&=7;I[0]=M[s]|(M[1+s]<<16);I[1]=M[d]|(M[1+d]<<16);r=I[0]%I[1];M[d]=r;M[1+d]=r>>16;I[0]/=I[1];M[s]=I[0];M[1+s]=I[0]>>16;l("div");return //div/mod (simplified)
 case 0072000:s&=7;M[s]=(0x8000&M[d])?(M[s]>>(0xffff&-M[d])):(M[s]<<M[d]);F(M[s]); l("ash"); return //ash  todo:carry
 case 0073000:s&=7;let u=(M[s]<<16)|M[1+s];u=F((0x8000&M[d])?(u>>(0xffff&-M[d])):(u<<M[d]))
  M[s]=0xffff&(u>>16);M[1+s]=0xffff&u                     ;l("ashc");return //ashc
 case 0074000:M[d]^=M[s&7];F(M[d]);over=0                 ;l("xor"); return //xor
 }
 switch(x&0177700){ //jmp,swab,mark,mfpi,mtpi
 case 0100:M[7]=M[d]   ;l("jmp"); return //jmp
 }

 s=A((x&07700)>>6,a);M[7]+=a[0]
 switch(x&0170000){ //mov,add,sub,cmp,bic,bis
 case 0110000:      //only 111000 111610 112021 0112127
  if(x==0112021){M[0]-=2}
  s=M[(x&0700)>>6];r=0xff&(M[D+(s>>1)]>>(8*(s&1)));d
  switch(x){
  case 0111000:         M[d]=F((r&0x80)?r|0xff00:r)                           ;over=0;break //movb(r0),r0   (sign-extend)
  case 0111610:s=M[0]&1;M[d]=(s?(r<<8):r)|(M[d]&(s?0xff:0xff00))              ;over=0;break //movb(sp),(r0)
  case 0112021:s=M[1]&1;M[d]=(s?(r<<8):r)|(M[d]&(s?0xff:0xff00));M[0]++;M[1]--;over=0;break //movb(r0)+,(r1)+
  case 0112127:M[1]-=2;s=M[1]&1;r=M[D+(M[1]>>1)];out(s?(r>>8):r&0xff);M[1]++  ;over=0;break //movb(r1+),#177566
  case 0112721:s=M[1]&1;M[1]--;r=ttc();zero=r==0;
   M[d]=s?((M[d]&0xff)|(r<<8)):((M[d]&0xff00)|r); break //movb(r1)+,#177566
  default: nyi()}                                  ;l("movb");return//movb
 case 0010000:M[d]=F(M[s]);                        ;l("mov");return //mov
 case 0060000:carry=(M[d]+M[s])>=0xffff;M[d]+=M[s] ;l("add");return //add
 case 0160000:carry=M[s]>M[d];M[d]-=M[s];F(M[d]);l("sub")  ;l("sub");return //sub
 }
 switch(x&070000){ //mov,cmp,bit,bic,bis
 case 0020000:F(M[s]-M[d]);carry=M[s]<M[d];over=((M[s]^M[d])&0x8000)&&!((M[d]^M[s])&0x8000);l("cmp");return //cmp
 case 0030000:F(M[d]&M[s])       ;over=0           ;l("bit");return //bit
 case 0040000:M[d]&=~M[s];F(M[d]);over=0           ;l("bic");return //bic
 case 0050000:M[d]|= M[s];F(M[d]);over=0           ;l("bis");return //bis
 }
}
let br=x=>{if(x&0x80)x=-(((~x)+1)&0xff);x<<=1;M[7]+=x}    //branch
let pu=x=>{M[6]-=2;M[D+(M[6]>>1)]=x}               //mov x,-(sp)
let po=()=>{M[6]+=2;return M[D+(M[6]>>1)-1]}       //mov (sp)+,r
let xor=(x,y)=>((x||y)&&!(x&&y))

let run=x=>{ge("runbut").disabled=true;ge("stepbut").disabled=true;
 if(x!="")return runtest(x)
 player()
 let f=t=>{step();if(wait)showhist();if((!wait)&&(M[7]!=brk))requestAnimationFrame(f);else{ge("runbut").disabled=false;ge("stepbut").disabled=false}}
 if(!wait)requestAnimationFrame(f)
}
let Run=x=>{ do{step()}while((!wait)&&(M[7]!=brk)) }
let calls=[]
let hist={}
let hpush=x=>{hist[x]=(x in hist)?1+hist[x]:1}

function ttc( ){if(!keybuf.length)return 0;let r=keybuf[0];keybuf=keybuf.slice(1);return r}
function ttw( ){wait=1;console.log("ttw")}
function out(x){tty.value+=String.fromCharCode(x)}
function oct(x){return"0"+x.toString(8)}
function Oct(x){let r=x.toString(8);return"000000".slice(0,6-r.length)+r}
function nyi(){throw("nyi")}

let keybuf=[]
function key(e){if(!wait)return false
 let k=e.which,c=e.key.charCodeAt(0);
 if(k==8){keybuf=keybuf.slice(0,-1);return true}
 if(k==13){wait=0;tty.value+="\n";Run("");return false}
 if(e.key.length!=1)return
 console.log("c",c,e.key,"keybuf",keybuf,k)
 if((c<32)||(c>126))return false
 keybuf.push(c);return true
}
