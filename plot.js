let plotjs=(()=>{

let ge=function(x){return document.getElementById(x)}
let pd=function(e){e.preventDefault();e.stopPropagation()}
let vmin=x=>{x=x.filter(x=>!isNaN(x));let r=Infinity;x.forEach(x=>r=(x<r)?x:r);return r},vmax=x=>{x=x.filter(x=>!isNaN(x));let r=-Infinity;x.forEach(x=>r=(x>r)?x:r);return r},min=Math.min,max=Math.max,floor=Math.floor,ceil=Math.ceil,abs=Math.abs

let half=x=>x.filter((_,i)=>!(i%2))
let minmax=(x,y,Y,x0,x1)=>{let n=x.length,dx=x[n-1]-x[0],i0=max(0,Math.floor(n*(x0-x[0])/dx)),ni=min(n,Math.ceil(n*(x1-x0)/dx));x=x.slice(i0,i0+ni),y=y.slice(i0,i0+ni),Y=Y.slice(i0,i0+ni)
 n=x.length;if(n<=512)return[x,y,null];while(n>512){x=half(x);for(let i=1;i<n;i+=2){y[i-1]=min(y[i],y[i-1]);Y[i-1]=max(Y[i],Y[i-1])};y=half(y);Y=half(Y);n/=2};return[x,y,Y]}

function replot(canvas){plots(canvas.plots,canvas,canvas.slider,canvas.listbx,canvas.legend)}

function plots(p,canvas,slider,listbx,legend){const z=devicePixelRatio //zoom scale
 canvas.width=z*canvas.clientWidth;canvas.height=z*canvas.clientHeight
 let width,height;[width,height]=[canvas.width,canvas.height]
 let c=canvas.getContext("2d")

 p=(p===null)?{}:p
 p.equal  =("equal" in p)?p.equal :false
 p.colors =("colors"in p)?p.colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(",")
 p.cols   =("cols"  in p)?p.cols  :0
 p.font1  =("font1" in p)?p.font1 :"16px monospace"
 p.font2  =("font2" in p)?p.font2 :"14px monospace"
 p.hi     =("hi"    in p)?p.hi    :{plot:null,lines:[],point:null}
 p=layout(c,p)
 
 let rects=[]
 c.fillStyle="white";c.fillRect(0,0,width,height);c.font=p.font1
 if(p.plots){
  let np=p.plots.length,nc=abs(p.cols);nc=nc?nc:np
  let nr=ceil(np/nc),w=width/nc,h=height/nr,r
  for(let i=0,j=0;i<np;i++){c.save();c.translate(w*(i%nc),j*h);r=[w*(i%nc),j*h,w,h];r.push(...plot(p.plots[i],i,c,w,h,p));rects.push(r);c.restore();if(0==(1+i)%nc)j++;if((j==nr-1)&&(np%nc))w=width/(np%nc)}}
 canvas.plots=p;canvas.slider=slider;canvas.listbx=listbx;canvas.legend=legend
 if(p.hi.point!==null){
  let hip=p.plots[p.hi.plot],li=p.hi.lines[0],pl=hip.lines[li],pt=p.hi.point,po=hip.type=="polar",st=hip.stacked
  let d={x:("undefined"!=typeof pl.x)?pl.x[pt]:null,y:("undefined"!=typeof pl.y)?(pl.y[pt]-((st&&li)?hip.lines[li-1].y[pt]:0)):null,z:("undefined"!=typeof pl.z)?pl.z[pt]:null}
  d.r=po?Math.hypot(d.y,d.z):d.y;d.a=po?(180/Math.PI*Math.atan2(d.y,d.z)):d.z;if(d.a<0)d.a+=360
  let s=((d.x!==null)?("x:"+sn(d.x)+";"):"")+((d.z!==null)?("z:"+sn(d.r)+"a"+d.a.toFixed(0)):("y:"+sn(d.y)))
  legend(s,pt)
 }
 let clickpos=e=>{let r=e.target.getBoundingClientRect(),z=devicePixelRatio,x=z*(e.clientX-r.left),y=z*(e.clientY-r.top),ri=targetRect(x,y,rects);return[x,y,ri]}
 canvas.ondblclick=function(e){pd(e);zoom=null;canvas.style.cursor="";let[x,y,ri]=clickpos(e),l=p.plots[ri].limits,rri=rects[ri],[X,Y]=rects[ri][5](x-rri[0],y-rri[1])
  if(outside(l,X,Y)){delete p.plots[ri].limits;replot(canvas);return}
  let[line,point]=snapPoint(x,y,rects[ri],p.plots[ri])
  p.hi={plot:ri,lines:[line],point:point}
  if(slider!==undefined){
   slider.min=0;slider.max=p.plots[ri].lines[line].y.length-1
   slider.value=point
  }
  replot(canvas)
 }
 if(slider!==undefined){
  let I=Math.ceil(slider.max/10);slider.f.style.display=(p.hi.point===null)?"none":"";slider.b.style.display=(p.hi.point===null)?"none":""
  let f=x=>e=>{p.hi.point+=(e.deltaY===undefined)?x:(e.deltaY<0)?x:-x;p.hi.point=(p.hi.point<0)?0:(p.hi.point>slider.max)?slider.max:p.hi.point;replot(canvas)}
  slider.f.onclick=f(1);slider.b.onclick=f(-1);slider.f.onwheel=f(I);slider.b.onwheel=f(I)}
 if(listbx!==undefined){
  //rm(listbox)
  //let empty=(!"table"in p)
  //listbox.style.hidden==empty
  //if(empty)return
  let o=listbx.options,nl=p.plots[0].lines.length,n=-1;if(o.length>1&&o[o.length-1].dataset.i!==undefined){n=1+Number(o[o.length-1].dataset.i);if(n==nl)Array.from(o).forEach(x=>{x.style.borderLeft="0.5em solid "+((x.dataset.i!==undefined)?color((+x.dataset.i),nl,p):"black");x.style.paddingLeft="0.2em"})}
  listbx.onchange=function(e){
   p.hi.lines=Array.from(e.target.selectedOptions).filter(x=>x.dataset.i!==undefined).map(x=>+x.dataset.i)
   p.hi.point=null
   replot(canvas)
  }
 }
 let zoom=null
 let outside=(l,x,y)=>x<l[0]||x>l[1]||y<l[2]||y>l[3]
 let mousecoords=e=>{let[x,y,ri]=clickpos(e);if(ri==null){zoom=null;return[]};let rri=rects[ri],pi=p.plots[ri],[X,Y]=rects[ri][5](x-rri[0],y-rri[1]);return[x,y,X,Y,ri,false]}
 let drawzoom=(x0,y0,x1,y1,ri)=>{if(zoom.hv)[x1,y1,zoom.hor]=(abs(x1-x0)>abs(y1-y0))?[x1,y0,true]:[x0,y1,false];  c.putImageData(zoom.d,0,0);zoom.pan?LN(c,x0,y0,x1,y1):c.strokeRect(x0,y0,x1-x0,y1-y0)}
 let startzoom=(pan,hv,meas,x0,y0,X,Y,ri)=>{if(ri==undefined)return;zoom={x0:x0,y0:y0,X:X,Y:Y,ri:ri,d:c.getImageData(0,0,canvas.width,canvas.height),pan:pan,hv:hv&&p.plots[ri].type!="polar",meas:meas};c.strokeStyle="red";canvas.style.cursor=pan?"grab":"crosshair"}
 let endzoom=(_x,_y,X,Y,ri)=>{
  canvas.style.cursor="";c.putImageData(zoom.d,0,0);if(zoom.ri!=ri){zoom=null;return};
  let x=zoom.X,y=zoom.Y,dx=x-X,dy=y-Y,l=p.plots[ri].limits;if(outside(l,x,y)&&outside(l,X,Y)){zoom=null;return};
  if(zoom.pan){if(zoom.hv){let h=zoom.hor;[dx,dy]=h?[dx,0]:[0,dy];if(zoom.meas){zoom=null;legend(["dy","dx"][+h]+": "+abs(dx+dy));return}};
  if(zoom.meas){legend("dz: "+absang(-dx,dy));zoom=null;return};l[0]+=dx;l[1]+=dx;l[2]+=dy;l[3]+=dy}
  else p.plots[ri].limits=[min(x,X),max(x,X),min(y,Y),max(y,Y)];zoom=null;replot(canvas)
 }
 canvas.onmousemove=e=>{pd(e);if(1==e.which){return(zoom===null)?startzoom(e.shiftKey||e.ctrlKey,e.ctrlKey,e.shiftKey&&e.ctrlKey,...mousecoords(e)):drawzoom(zoom.x0,zoom.y0,...clickpos(e))};if(zoom===null)return;if(e.which==0)endzoom(...mousecoords(e)) }
 canvas.onwheel=e=>{let[x,y,X,Y,ri]=mousecoords(e);if(e.deltaY==0)return;let z=(e.deltaY>0)?2:0.5,pi=p.plots[ri],l=pi.limits,xm=(l[0]+l[1])/2,ym=(l[2]+l[3])/2,DX=(l[1]-l[0])/2*z,DY=(l[3]-l[2])/2*z
  let xo=(X-xm)*z,yo=(Y-ym)*z;if(X>l[0]){l[0]=X-xo-DX;l[1]=X-xo+DX};if(Y>l[2]){l[2]=Y-yo-DY;l[3]=Y-yo+DY}
  replot(canvas)}
}


function plot(p,i,c,w,h,plts){p.i=i
 p.type  =("type"   in p)?p.type:(p.lines.length>0&&"z"in p.lines[0]&&p.lines[0].z)?"ampang":"xy"
 p.title =("title"  in p)?p.title: ""
 p.xlabel=("xlabel" in p)?p.xlabel:""
 p.ylabel=("ylabel" in p)?p.ylabel:""
 p.square=("square" in p)?p.square:false
 p.styles=("styles" in p)?p.styles:" " // "-=#>.oO08"
 
 c.fillStyle=c.strokeStyle="black";c.lineWidth=2
 switch(p.type){
 case"xy":      return       xyplot(p,c,w,h,plts)
 case"envelope":return envelopeplot(p,c,w,h,plts)
 case"polar":   return    polarplot(p,c,w,h,plts)
 case"ampang":  return   ampangplot(p,c,w,h,plts)
 case"bar":     return      barplot(p,c,w,h,plts)
 case"stacked": return  stackedplot(p,c,w,h,plts)
 default:throw new Error("unknown plot type: "+p.type)
}}

function barwidth(L,st){let x=L[0].x,dx=x[x.length-1]-x[0],n=x.length*(st?L.length:1);return(n<2)?1:dx/(n-1)}
function xyplot(p,c,w,h,plts){if(!p.lines)return;let nl=p.lines.length,z=(p.lines[0].z)?true:false;w=min(w,1.5*h),h=min((z?2:1.5)*w,h) //ah clip bw wb nl xs hp hi
 p.lines=p.lines.map(l=>{l.x=("undefined"==typeof l.x)?iota(l.y.length):("number"==typeof l.x)?rate(l.x,l.y.length):l.x;return l})
 if((p.bar||p.stacked)&&"undefined"==typeof p.lines[0].senti)p.lines.map((l,i)=>{l.senti=true; l.y=l.y.map((y,j)=>y+((i&&p.stacked)?p.lines[i-1].y[j]:0));return l})
 let lnc=i=>color(i,p.lines.length,plts),sq=(w,h)=>p.square?[min(w,h),min(w,h)]:[w,h],[aw,ah]=sq(max(0,w-plts.xyw),max(0,h-plts.xyh)),li=limits(p),[x0,x1,y0,y1]=autoxy(p.lines,li,p.bar||p.stacked),aH=z?Math.round(0.3*ah):0;ah-=aH;if(z)y0=max(0,y0)
 let xs=aw/(x1-x0),ys=ah/(y1-y0),zs=aH/360,xx=x=>xs*(x-x0),yy=y=>ys*(y0-y),zz=z=>aH-zs*z,bw=barwidth(p.lines,!p.stacked);p.limits=[x0,x1,y0,y1]
 let pt=(i,x,y)=>{let hp=plts.hi.point;if((hp!==null)&&(p.i==plts.hi.plot)&&(i==plts.hi.lines[0])&&(hp>=0)&&(hp<x.length)){c.beginPath();c.arc(xx(x[hp]),yy(y[hp]),5,0,2*Math.PI);c.fillStyle=c.strokeStyle;c.fill()}}
 let a=true,ln=(l,i)=>{let x=l.x,y=l.y,ps=pointsize(p,i),lw=linewidth(p,i);if(!x.length)return
  if(ps){x.forEach((x,j)=>{c.beginPath();c.arc(xx(x),yy(y[j]),ps,0,2*Math.PI);c.fillStyle=lnc(i);c.fill()})}
  else{c.strokeStyle=lnc(i);c.lineWidth=hiline(plts,i)*(lw?lw:2);c.beginPath()
   if(a){c.moveTo(xx(x[0]),yy(y[0]));x.forEach((x,j)=>c.lineTo(xx(x),yy(y[j])))}else{c.moveTo(xx(x[0]),zz(l.z[0]));x.forEach((x,j)=>{let z=l.z[j],s=z-l.z[j-1],d=((s>180)?-360:(s<-180)?360:0);c.lineTo(xx(x),zz(z+d));if(d){c.stroke();c.beginPath();c.moveTo(xx(x),zz(z))}})}c.stroke()};pt(i,p.lines[i].x,p.lines[i].y)},
 br=(l,i)=>{ let hp=j=>hipoint(plts,i,j,p.i); c.fillStyle=lnc(i);c.strokeStyle=c.fillStyle;l.x.forEach((x,j)=>{let a=[1+xx(p.stacked?(x-bw/2):(x+(i-nl/2)*bw)),1+yy((p.stacked&&i)?p.lines[i-1].y[j]:0),bw*xs-2,2+yy(l.y[j])-yy((p.stacked&&i)?p.lines[i-1].y[j]:0)];(2==hp(j))?c.strokeRect(...a):c.fillRect(...a)}) },
 st=(l,i)=>{ br(l,i) },
 le=(l,i)=>{ let[x,y,Y]=minmax(l.x,l.y,l.y,x0,x1),n=x.length;if(Y===null)return ln({x:x,y:y},i);let pa=new Path2D;x=x.map(xx);y=y.map(yy);Y=Y.map(yy);pa.moveTo(x[0],y[0]);for(let i=1;i<n;i++)pa.lineTo(x[i],y[i]);while(n--)pa.lineTo(x[n],Y[n]);pa.closePath();c.strokeStyle=lnc(i);c.fillStyle=lnc(i);c.stroke(pa);c.fill(pa);pt(i,l.x,l.y)}
 c.strokeRect(plts.xyx,plts.xyy,aw,ah);if(z)c.strokeRect(plts.xyx,plts.xyy+ah,aw,aH)
 align(c,1)
 c.fillText(p.title, plts.xyx+center(aw),0)
 align(c,7);c.fillText(p.xlabel,plts.xyx+center(aw),plts.xyy+ah+aH+plts.tl+plts.tlh+plts.tih)
 align(c,1);text90(c,0,center(plts.xyy+ah+aH),p.ylabel)
 c.translate(plts.xyx,ah+plts.xyy);
 c.lineWidth=2;c.font=plts.font2
 align(c,1);ncTic(x0,x1).map(x=>{let t=sn(x);x=xx(x);LN(c,x,  -plts.tl/2,x,   plts.tl/2);c.fillText(t,x,aH+plts.tl)})
       if(z)ncTic(x0,x1).map(x=>{let t=sn(x);x=xx(x);LN(c,x,aH-plts.tl/2,x,aH+plts.tl/2)                           })
 align(c,5);ncTic(y0,y1).map(y=>{let t=sn(y);y=yy(y);LN(c,-plts.tl/2,y,plts.tl/2,y);c.fillText(t,-plts.tl,y)})
 if(z){let t=["0°","180°"],y=[aH,aH/2];y.map((y,i)=>{LN(c,-plts.tl/2,y,plts.tl/2,y);c.fillText(t[i],-plts.tl,y)})}
 c.save();c.beginPath();c.rect(0,-ah,aw,ah);c.clip();p.lines.forEach(p.bar?br:p.stacked?st:p.ep?le:ln);c.restore();if(z){a=false;c.beginPath();c.rect(0,0,aw,aH);c.clip();p.lines.map(ln)}
 return[(l,j)=>[plts.xyx+xx(l.x[j]),ah+plts.xyy+yy(l.y[j])],(x,y)=>[(x-plts.xyx)/xs+x0,y0-(y-ah-plts.xyy)/ys]]
}
function envelopeplot(p,c,w,h,plts){p.ep=true;p.type="xy";return xyplot(p,c,w,h,plts)}
function polarplot(p,c,w,h,plts){if(!p.lines)return;
 let ra=floor(min(w-plts.pw,h-plts.ph-plts.tih)/2),raa=ra+plts.tl,al=[7,6,3,3,0,0,1,2,2,5,5,8],lnc=i=>color(i,p.lines.length,plts),
 li=autop(p.lines,limits(p)),r1=(li[1]-li[0])/2,sc=ra/r1,xm=floor(w/2),ym=floor(ra+plts.ph/2+plts.tih),X,Y,xx=x=>sc*(x-X),yy=y=>-sc*(y-Y)
 ln=(l,i)=>{let x=l.y,y=l.z,ps=pointsize(p,i),lw=linewidth(p,i);if(!x.length)return
  let s=hiline(plts,i)*(ps?ps:3);c.fillStyle=lnc(i) //color(i,p.lines.length,plts)
  let hp=j=>hipoint(plts,i,j,p.i)
  if(lw){c.beginPath();c.strokeStyle=lnc(i);c.lineWidth=lw;c.moveTo(xx(x[0]),yy(y[0]));x.forEach((x,j)=>{if(j)c.lineTo(xx(x),yy(y[j]))});c.stroke();
   if(arrow(p,i)){let x0=xx(x[0]),y0=yy(y[0]),x1=xx(x[1]),y1=yy(y[1]),dx=x1-x0,dy=y1-y0,d=0.05*Math.hypot(dx,dy);dx/=d;dy/=d;c.beginPath();c.fillStyle=lnc(i);c.moveTo(x1,y1);c.lineTo(x1-dx+0.25*dy,y1-dy-0.25*dx);c.lineTo(x1-dx-0.25*dy,y1-dy+0.25*dx);c.closePath();c.fill()  }}
  else x.map((x,i)=>{c.beginPath();c.arc(xx(x),yy(y[i]),s*hp(i),0,2*Math.PI);c.fill()}
 )}
 p.limits=li;X=(li[0]+li[1])/2,Y=(li[2]+li[3])/2
 c.translate(xm,ym)
 circle(c,0,0,ra)
 c.textAlign="center";c.textBaseline="bottom"
 c.fillText(p.title,0,-ra-plts.tl-plts.tlh)
 align(c,0);c.fillText("↖"/*"⮤"*/+sn(r1),floor(0.74*ra),floor(0.67*ra));if(X!=0||Y!=0)c.fillText("-"+absang(X,-Y),floor(0.74*ra),floor(plts.tih+0.67*ra))
 if(p.ylabel){align(c,0);c.fillText(p.ylabel,floor(0.74*ra),plts.tih+floor(0.67*ra))}
 c.font=plts.font2;iota(12).map(i=>{let p=30*i*Math.PI/180,x=Math.sin(p),y=-Math.cos(p);align(c,al[i]);c.beginPath();c.moveTo(ra*x,ra*y);c.lineTo(raa*x,raa*y);c.stroke();c.fillText(""+30*i,raa*x,raa*y)})
 c.strokeStyle="#ccc";ncTic(0,r1).slice(1,-1).map(t=>circle(c,0,0,sc*t))
 c.beginPath();c.moveTo(-ra,0);c.lineTo(ra,0);c.stroke();c.beginPath();c.moveTo(0,-ra);c.lineTo(0,ra);c.stroke()
 c.beginPath();c.arc(0,0,ra,0,2*Math.PI);c.clip();p.lines.map(ln);return[(l,j)=>[xm+sc*(l.y[j]-X),ym-sc*(l.z[j]-Y)],(x,y)=>[X+(x-xm)/sc,Y+(ym-y)/sc]]
}
function ampangplot(p,c,w,h,plts){
 p.lines.forEach((l,i)=>{l.y.forEach((y,j)=>{let z=l.z[j],a=Math.atan2(y,z)*180/Math.PI;l.y[j]=Math.hypot(y,z);l.z[j]=(a<0)?(a+360):a});p.lines[i]=l});p.type="xy";return xyplot(p,c,w,h,plts)
}
function barplot(p,c,w,h,plts){p.bar=true;p.type="xy";return xyplot(p,c,w,h,plts)}
function stackedplot(p,c,w,h,plts){p.stacked=true;p.type="xy";return xyplot(p,c,w,h,plts)}
function h1(plts){let h=parseFloat(plts.font1);return isNaN(h)?20:ceil(h)}
function h2(plts){let h=parseFloat(plts.font2);return isNaN(h)?14:ceil(h)}
function layout(c,plts){                           //computed sizes depending on fontsize
 plts.tih=ceil(1.2*h1(plts))                       //title height
 c.font=plts.font2;let t=c.measureText('-1.23');
 plts.tlw=t.width                                  //tic label width (y-axis)
 plts.tlh=ceil(1.2*h2(plts))                       //tic label height e.g. x-axis
 plts.ylw=ceil(1.1*h1(plts))                       //y label width (rotated height)
 plts.tl =ceil(0.6*h2(plts))                       //major tic length
 plts.rmw=ceil(0.5*plts.tlw)                       //right margin width
 plts.xyx=plts.tlw+plts.ylw+plts.tl                //xy-plot x-inset
 plts.xyy=plts.tih                                 //xy-plot y-inset
 plts.xyw=plts.xyx+ 0 +plts.rmw                    //xy-plot sum of h margins
 plts.xyh=plts.tih+ 0 +plts.tl+plts.tlh+plts.tih   //xy-plot sum of v margins
 t=c.measureText("270")
 plts.pw =2*t.width+2*plts.tl                      //polar sum of h margins
 plts.ph =2*plts.tl+2*plts.tlh                     //polar sum of v margins (sym without tih)
 return plts
}
function pointsize(p,i){return[0,1,3,5,7,10][1+".oO08".indexOf(p.styles[i%p.styles.length])]}
function linewidth(p,i){return[0,2,2,3,4][1+"->=#".indexOf(p.styles[i%p.styles.length])]}
function arrow(p,i){return">"==p.styles[i%p.styles.length]}
function LN(c,x0,y0,x1,y1){c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}
function hiline(p,i){return(p.hi.lines.includes(i)&&p.hi.point===null)?2:1}
function hipoint(p,i,j,k){return(k==p.hi.plot&&p.hi.lines.length==1&&p.hi.lines[0]==i&&p.hi.point==j)?2:1}
function absang(x,y){let p=180/Math.PI*Math.atan2(x,-y);p=(p<0)?p+360:p;return Math.hypot(x,y).toPrecision(4)+"a"+p.toPrecision(4)}
function targetRect(x,y,rects){for(let i=0;i<rects.length;i++){let R=rects[i];if((x>=R[0])&&(y>=R[1])&&(x<=R[0]+R[2])&&(y<=R[1]+R[3])){return i}};return null}
function snapPoint(x,y,rect,p){x-=rect[0];y-=rect[1]
 let line=0,point=0,dist=Infinity,f=rect[4]
 for(let i=0;i<p.lines.length;i++){
  let l=p.lines[i]
  for(let j=0;j<l.y.length;j++){
   let [X,Y]=f(l,j);X-=x;Y-=y;let d=X*X+Y*Y
   if(d<dist){dist=d;line=i;point=j}}}
 return[line,point]}

function color(i,n,plts){return(n>1)?plts.colors[i%n]:"black"}
function align(c,x){c.textBaseline=["top","middle","bottom"][floor(x/3)];c.textAlign=["left","center","right"][x%3]}
function center(x){return floor(x/2)}
function circle(c,x,y,r){c.beginPath();c.arc(x,y,r,0,2*Math.PI);c.stroke()}
function text90(c,x,y,t){c.save();c.translate(x,y);c.rotate(-Math.PI/2);c.fillText(t,0,0);c.restore()}
function limits(p){let r=[0,0,0,0,0,0],l=p.limits;if("undefined"===typeof l)return r
 switch(l.length){case 0:return r;case 1:return[0,0,0,l[0],0,0];case 2:return[l[0],l[1],0,0,0,0];
 case 3:return[l[0],l[1],0,l[2],0,0];case 4:return l.concat([0,0]);default:return l}}
function autoxy(L,a,bar){let r=a.slice(0,4);
 if(r[0]==r[1]){[r[0],r[1]]=ncLim(vmin(L.map(l=>vmin(l.x))),vmax(L.map(l=>vmax(l.x)))).slice(0,2);if(bar){let bw=barwidth(L);r[0]-=bw/2;r[1]+=bw/2}}
 if(r[2]==r[3]){[r[2],r[3]]=ncLim(vmin(L.map(l=>vmin(l.y))),vmax(L.map(l=>vmax(l.y)))).slice(0,2);if(bar){r[2]=min(0,r[2]);r[3]=max(0,r[3])}}
 return r}
function autop(L,r){if(r[1]!=r[0])return squarelimits(r);r=ncLim(0,vmax(L.map(l=>Math.sqrt(vmax(l.y.map((y,i)=>y*y+l.z[i]*l.z[i]))))))[1];return[-r,r,-r,r]}
function squarelimits(l){let dx=(l[1]-l[0])/2,dy=(l[3]-l[2])/2,xm=(l[0]+l[1])/2,ym=(l[2]+l[3])/2;dx=max(dx,dy),dy=dx;return[xm-dx,xm+dx,ym-dy,ym+dy]}
function iota(n){return[...Array(n).keys()]}
function rate(r,n){r=1/r;return iota(n).map(x=>r*x)}

function sn(x){let a=abs(x),r=(a==0)?"0":(a>10000||a<0.00009)?x.toExponential(2):String(Math.round(10000*x)/10000);return r.replace(/\.0+e/,"e")}
function ncNum(ext,rnd){let e=floor(Math.log10(ext)),f=ext/(10**e),r;return(rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
function ncLim(x,y){let e=ncNum(y-x,false),s=ncNum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
function ncTic(x,y){let [p,_,s]=ncLim(x,y),r=[],i=0;while(p+i*s<=y){if(p+i*s>=x)r.push(p+i*s);i++};return r}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots,replot:replot}
})()
