let
unfit=b=>{let p=0,d=[],B=_=>b[p++],h,t,n,m,z
 H=_=>B()|B()<<8,I=_=>H()|H()<<16;p=B();
 while(p<b.length-2){
	 h=B();t=h&15;
	 console.log("h/t",h,t,h&64);
	 if(h&64){H();if(20==(m=H()))z=t;d[m]=0;n=B();while(n--){p++;d[t]+=255&H()}}
	 else{if(t==z)console.log("rec");p+=d[t]}
 }
// p=U();
}

unfit(Deno.readFileSync(Deno.args[0]))

let parse=b=>{let i,j,r={time:[],dist:[],lat:[],lon:[],bpm:[],alt:[],lap:[]},v=new DataView(b),p=0,e=s=>{throw new Error(p+':'+s)}
 let B=_=>v.getUint8(p++),H=_=>(p+=2,v.getUint16(p-2,1)),U=_=>(p+=4,v.getUint32(p-4,1)),I=_=>(p+=4,v.getInt32(p-4,1))
 let nh=B(),ver=B(),profile=H(),sz=U(),ep=nh+sz,defs=[];U()==1414088238||e(".FIT")
 let p18=f=>{f.forEach(x=>x.i==2?(r.start=U()):x.i==5?(r.sport=B()):x.i==8?(r.secs=U()/1000):x.i==9?(r.meters=0.1*U()):x.i==26?(r.laps=H()):p+=x.s)}//session
 let p19=(f,l)=>{l={};f.forEach(x=>x.i==2?l.start=U():x.i==8?l.secs=U()/1000:x.i==9?l.meters=U()/10:p+=x.s);r.lap.push(l)}//lap
 let p20=f=>{let s=180/2147483648,la=0,lo=0,di=0,bp=0,al=0;f.forEach(x=>x.i==253?ti=U():x.i==0?la=s*I():x.i==1?lo=s*I():x.i==2?al=H()/5-500:x.i==3?bp=B():x.i==5?di=0.01*U():x.i==78?al=U()/5-500:p+=x.s);
  r.time.push(ti);r.lat.push(la);r.lon.push(lo);r.dist.push(di);r.bpm.push(bp);r.alt.push(al)}//record
 p=nh;while(p<ep){let h=B(),lt=h&15;
  if(h&0x40){B();B();let m=H(),nf=B(),f=[],sf=0;for(i=0;i<nf;i++){let fi={i:B(),s:B()};B();sf+=fi.s;f[i]=fi};f.s=sf;defs[lt]=[m,f]}
  else{let d=defs[lt],m=d[0],f=d[1];m==18?p18(f):m==19?p19(f):m==20?p20(f):p+=f.s}};return r}
