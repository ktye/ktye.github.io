let plotjs=(()=>{

let ge=function(x){return document.getElementById(x)}
let pd=function(e){e.preventDefault();e.stopPropagation()}
//let ct=(x,y)=>x.classList.contains(y)
let vmin=x=>Math.min(...x),vmax=x=>Math.max(...x),min=Math.min,max=Math.max,floor=Math.floor,ceil=Math.ceil

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
  let np=p.plots.length,nc=Math.abs(p.cols);nc=nc?nc:np
  let nr=ceil(np/nc),w=width/nc,h=height/nr
  for(let i=0,j=0;i<np;i++){
   c.save()
   c.translate(w*(i%nc),j*h)
   let r=[w*(i%nc),j*h,w,h]
   r.push(...plot(p.plots[/*(p.cols<0)?j+nr*(i%nc):i*/ i],i,c,w,h,p))
   rects.push(r)
   c.restore()
   if(0==(1+i)%nc)j++;if((j==nr-1)&&(np%nc))w=width/(np%nc)
  }
 }
 
 canvas.plots=p;canvas.slider=slider;canvas.listbx=listbx;canvas.legend=legend
 //let replot=function(force){if((canvas.clientWidth!=width)||(canvas.clientHeight!=height)||force===true)plots(p,canvas,slider,listbx)}
 //{let r;window.addEventListener("resize",function(){clearTimeout(r);r=setTimeout(replot, 200)})}

 if(p.hi.point!==null){
  let pl=p.plots[p.hi.plot].lines[p.hi.lines[0]],pt=p.hi.point
  let d={
   x:("undefined"!=typeof pl.x)?pl.x[pt]:null,
   y:("undefined"!=typeof pl.y)?pl.y[pt]:null,
   z:("undefined"!=typeof pl.z)?pl.z[pt]:null}
  d.r=Math.hypot(d.y,d.z);d.a=180/Math.PI*Math.atan2(d.z,d.y);if(d.a<0)d.a+=360
  let s=((d.x!==null)?("x:"+sn(d.x)+";"):"")+((d.z!==null)?("z:"+sn(d.r)+"a"+d.a.toFixed(0)):("y:"+sn(d.y)))
  if("function"==typeof legend ) legend(s)
  else console.log(s)
 }
 let clickpos=e=>{let r=e.target.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,ri=targetRect(x,y,rects);return[x,y,ri]}
 canvas.ondblclick=function(e){pd(e);let[x,y,ri]=clickpos(e)
  let [line,point]=snapPoint(x,y,rects[ri],p.plots[ri])
  p.hi={plot:ri,lines:[line],point:point}
  if(slider!==undefined){
   slider.min=0;slider.max=p.plots[ri].lines[line].y.length-1
   slider.value=point
  }
  replot(canvas)
 }
 if(slider!==undefined){
  let I=Math.ceil(slider.max/5)
  slider.f.style.display=(p.hi.point===null)?"none":""
  slider.b.style.display=(p.hi.point===null)?"none":""
  let f=x=>e=>{p.hi.point+=x*(1+1000*(e.shiftKey||e.ctrlKey));p.hi.point=(p.hi.point<0)?0:(p.hi.point>slider.max)?slider.max:p.hi.point;replot(canvas)}
  slider.f.onclick   =f( 1)
  slider.b.onclick   =f(-1)
  slider.f.ondblclick=f( I)
  slider.b.ondblclick=f(-I)
  /* slider.onchange=function(e){ p.hi.point=slider.value;replot(canvas) } */
 }
 if(listbx!==undefined){
  //rm(listbox)
  //let empty=(!"table"in p)
  //listbox.style.hidden==empty
  //if(empty)return
  listbx.onchange=function(e){
   p.hi.lines=Array.from(e.target.selectedOptions).map(x=>x.index)
   p.hi.point=null
   replot(canvas)
  }
 }
 let zoom=null
 let outside=(l,x,y)=>x<l[0]||x>l[1]||y<l[2]||y>l[3]
 let mousecoords=e=>{let[x,y,ri]=clickpos(e);if(ri==null){zoom=null;return[]};let rri=rects[ri],pi=p.plots[ri],[X,Y]=rects[ri][5](x-rri[0],y-rri[1]);return[x,y,X,Y,ri,false]}
 let drawzoom=(x0,y0,x1,y1,ri)=>{ c.putImageData(zoom.d,0,0);if(zoom.pan){c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()}else c.strokeRect(x0,y0,x1-x0,y1-y0)}
 let startzoom=(pan,x0,y0,X,Y,ri)=>{if(ri==undefined)return;zoom={x0:x0,y0:y0,X:X,Y:Y,ri:ri,d:c.getImageData(0,0,canvas.width,canvas.height),pan:pan};c.strokeStyle="red";canvas.style.cursor=pan?"grab":"crosshair"}
 let endzoom=(_x,_y,X,Y,ri)=>{canvas.style.cursor="";c.putImageData(zoom.d,0,0);if(zoom.ri!=ri){zoom=null;return}; let x=zoom.X,y=zoom.Y,dx=x-X,dy=y-Y,l=p.plots[ri].limits;if(outside(l,x,y)&&outside(l,X,Y)){zoom=null;return};if(zoom.pan){l[0]+=dx;l[1]+=dx;l[2]+=dy;l[3]+=dy}else p.plots[ri].limits=[min(x,X),max(x,X),min(y,Y),max(y,Y)];zoom=null;replot(canvas)}
 
 //canvas.onmousedown=e=>{console.log(mousecoords(e))}
 canvas.onmousemove=e=>{pd(e);if(1==e.which){return(zoom===null)?startzoom(e.shiftKey||e.ctrlKey,...mousecoords(e)):drawzoom(zoom.x0,zoom.y0,...clickpos(e))};if(zoom===null)return;if(e.which==0)endzoom(...mousecoords(e)) }
 canvas.onwheel=e=>{let[x,y,X,Y,ri]=mousecoords(e);if(e.deltaY==0)return;let z=(e.deltaY>0)?2:0.5,pi=p.plots[ri],l=pi.limits,xm=(l[0]+l[1])/2,ym=(l[2]+l[3])/2,DX=(l[1]-l[0])/2*z,DY=(l[3]-l[2])/2*z
  if(pi.type=="polar"){if(DX>Math.abs(xm)&&DY>Math.abs(ym)){xm=0;ym=0};l[0]=xm-DX;l[1]=xm+DX;l[2]=ym-DY;l[3]=ym+DY}else{let xo=(X-xm)*z,yo=(Y-ym)*z;if(X>l[0]){l[0]=X-xo-DX;l[1]=X-xo+DX};if(Y>l[2]){l[2]=Y-yo-DY;l[3]=Y-yo+DY}}
  replot(canvas)}
}



function plot(p,i,c,w,h,plts){p.i=i
 p.type  =("type"   in p)?p.type: "xy"
 p.title =("title"  in p)?p.title: ""
 p.xlabel=("xlabel" in p)?p.xlabel:""
 p.ylabel=("ylabel" in p)?p.ylabel:""
 p.square=("square" in p)?p.square:false
 
 //c.translate(floor(w/2),floor(h/2))
 c.fillStyle=c.strokeStyle="black";c.lineWidth=2
 switch(p.type){
 case"xy":    return     xyplot(p,c,w,h,plts)
 case"polar": return  polarplot(p,c,w,h,plts)
 case"ampang":return ampangplot(p,c,w,h,plts)
 default:throw new Error("unknown plot type: "+p.type)
}}

function xyplot(p,c,w,h,plts){if(!p.lines)return;w=min(w,1.5*h),h=min(1.5*w,h)
 p.lines=p.lines.map(l=>{l.x=("undefined"==typeof l.x)?iota(l.y.length):l.x;return l})
 let sq=(w,h)=>p.square?[min(w,h),min(w,h)]:[w,h],[aw,ah]=sq(max(0,w-plts.xyw),max(0,h-plts.xyh)),li=limits(p),[x0,x1,y0,y1]=autoxy(p.lines,li),xs=aw/(x1-x0),ys=ah/(y1-y0),xx=x=>xs*(x-x0),yy=y=>ys*(y0-y)
 p.limits=[x0,x1,y0,y1];
 let ln=(l,i)=>{let x=l.x,y=l.y;if(!x.length)return
  if("undefined"==typeof l.style||l.style.includes("-")){
   c.beginPath();c.moveTo(xx(x[0]),yy(y[0]));for(let j=0;j<x.length;j++){c.lineTo(xx(x[j]),yy(y[j]))}
   c.strokeStyle=plts.colors[i%plts.colors.length];c.lineWidth=hiline(plts,i)*(l.size?l.size:2)
   c.stroke()}
  let hp=plts.hi.point;if((hp!==null)&&(p.i==plts.hi.plot)&&(i==plts.hi.lines[0])&&(hp>=0)&&(hp<x.length)){c.beginPath();c.arc(xx(x[hp]),yy(y[hp]),5,0,2*Math.PI);c.fillStyle=c.strokeStyle;c.fill()}
 }
 c.strokeRect(plts.xyx,plts.xyy,aw,ah)
 align(c,1)
 c.fillText(p.title, plts.xyx+center(aw),0)
 align(c,7);c.fillText(p.xlabel,plts.xyx+center(aw),h)
 align(c,1);text90(c,0,center(h),p.ylabel)
 c.translate(plts.xyx,ah+plts.xyy);
 c.lineWidth=2;c.font=plts.font2
 align(c,1);ncTic(x0,x1).map(x=>{let t=sn(x);x=xx(x);c.beginPath();c.moveTo(x,0);c.lineTo(x,plts.tl);c.stroke();c.fillText(t,x,plts.tl)})
 align(c,5);ncTic(y0,y1).map(y=>{let t=sn(y);y=yy(y);c.beginPath();c.moveTo(-plts.tl,y);c.lineTo(0,y);c.stroke();c.fillText(t,-plts.tl,y)})
 c.beginPath();c.rect(0,-ah,aw,ah);c.clip();p.lines.map(ln);return[(l,j)=>[plts.xyx+xx(l.x[j]),ah+plts.xyy+yy(l.y[j])],(x,y)=>[(x-plts.xyx)/xs+x0,y0-(y-ah-plts.xyy)/ys]]
}
function polarplot(p,c,w,h,plts){if(!p.lines)return;
 let ra=floor(min(w-plts.pw,h-plts.ph-plts.tih)/2),raa=ra+plts.tl,al=[7,6,3,3,0,0,1,2,2,5,5,8],
 li=autop(p.lines,limits(p)),r1=(li[1]-li[0])/2,sc=ra/r1,xm=floor(w/2),ym=floor(ra+plts.ph/2+plts.tih),X,Y
 ln=(l,i)=>{let x=l.y,y=l.z;if(!x.length)return
  let s=hiline(plts,i)*(l.size?l.size:3);c.fillStyle=plts.colors[i%plts.colors.length]
  let hp=j=>hipoint(plts,i,j,p.i)
  x.map((x,i)=>{c.beginPath();c.arc(sc*(x-X),sc*(y[i]-Y),s*hp(i),0,2*Math.PI);c.fill()})}
 p.limits=li;X=(li[0]+li[1])/2,Y=(li[2]+li[3])/2
 c.translate(xm,ym)
 circle(c,0,0,ra)
 c.textAlign="center";c.textBaseline="bottom"
 c.fillText(p.title,0,-ra-plts.tl-plts.tlh)
 align(c,0);c.fillText("↖"/*"⮤"*/+sn(r1),floor(0.74*ra),floor(0.67*ra));if(X!=0||Y!=0)c.fillText("-"+absang(X,Y),floor(0.74*ra),floor(plts.tih+0.67*ra))
 if(p.ylabel){align(c,0);c.fillText(p.ylabel,floor(0.74*ra),plts.tih+floor(0.67*ra))}
 c.font=plts.font2;iota(12).map(i=>{let p=30*i*Math.PI/180,x=Math.sin(p),y=-Math.cos(p);align(c,al[i]);c.beginPath();c.moveTo(ra*x,ra*y);c.lineTo(raa*x,raa*y);c.stroke();c.fillText(""+30*i,raa*x,raa*y)})
 c.strokeStyle="#ccc";ncTic(0,r1).slice(1,-1).map(t=>circle(c,0,0,sc*t))
 c.beginPath();c.moveTo(-ra,0);c.lineTo(ra,0);c.stroke();c.beginPath();c.moveTo(0,-ra);c.lineTo(0,ra);c.stroke()
 c.beginPath();c.arc(0,0,ra,0,2*Math.PI);c.clip();p.lines.map(ln);return[(l,j)=>[floor(w/2)+sc*l.y[j],floor(h/2)+floor(plts.tih/2)+sc*l.z[j]],(x,y)=>[X+(x-xm)/sc,Y+(y-ym)/sc]]
}
function ampangplot(p,c,w,h,plts){if(!p.lines)return;let l=p.lines
 for(let i=0;i<l.length;i++)if(l[i].z!==null){for(let j=0;j<l[i].y.length;j++)l[i].y[j]=Math.hypot(l[i].y[j],l[i].z[i]);l[i].z=null}
 p.lines=l;xyplot(p,c,w,h,plts)
}
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

function hiline(p,i){return(p.hi.lines.includes(i)&&p.hi.point===null)?2:1}
function hipoint(p,i,j,k){return(k==p.hi.plot&&p.hi.lines.length==1&&p.hi.lines[0]==i&&p.hi.point==j)?2:1}
function absang(x,y){let p=180/Math.PI*Math.atan2(x,-y);p=(p<0)?p+360:p;return Math.hypot(x,y).toPrecision(4)+"@"+p.toPrecision(4)}
function targetRect(x,y,rects){for(let i=0;i<rects.length;i++){let R=rects[i];if((x>=R[0])&&(y>=R[1])&&(x<=R[0]+R[2])&&(y<=R[1]+R[3])){return i}};return null}
function snapPoint(x,y,rect,p){x-=rect[0];y-=rect[1]
 let line=0,point=0,dist=Infinity,f=rect[4]
 for(let i=0;i<p.lines.length;i++){
  let l=p.lines[i]
  for(let j=0;j<l.y.length;j++){
   let [X,Y]=f(l,j);X-=x;Y-=y
   let d=X*X+Y*Y
   if(d<dist){dist=d;line=i;point=j}
  }
 }
 return [line,point]
}

function align(c,x){c.textBaseline=["top","middle","bottom"][floor(x/3)];c.textAlign=["left","center","right"][x%3]}
function center(x){return floor(x/2)}
function circle(c,x,y,r){c.beginPath();c.arc(x,y,r,0,2*Math.PI);c.stroke()}
function text90(c,x,y,t){c.save();c.translate(x,y);c.rotate(-Math.PI/2);c.fillText(t,0,0);c.restore()}
function limits(p){let r=[0,0,0,0,0,0],l=p.limits;if("undefined"===typeof l)return r
 switch(l.length){case 0:return r;case 1:return[0,0,0,l[0],0,0];case 2:return[l[0],l[1],0,0,0,0];
 case 3:return[l[0],l[1],0,l[2],0,0];case 4:return l.concat([0,0]);default:return l}}
function autoxy(L,a){let r=a.slice(0,4)
 if(r[0]==r[1]){[r[0],r[1]]=ncLim(vmin(L.map(l=>vmin(l.x))),vmax(L.map(l=>vmax(l.x)))).slice(0,2)}
 if(r[2]==r[3]){[r[2],r[3]]=ncLim(vmin(L.map(l=>vmin(l.y))),vmax(L.map(l=>vmax(l.y)))).slice(0,2)}
 return r}
function autop(L,r){if(r[1]!=r[0])return squarelimits(r);r=ncLim(0,vmax(L.map(l=>Math.sqrt(vmax(l.y.map((y,i)=>y*y+l.z[i]*l.z[i]))))))[1];return[-r,r,-r,r]}
function squarelimits(l){let dx=(l[1]-l[0])/2,dy=(l[3]-l[2])/2,xm=(l[0]+l[1])/2,ym=(l[2]+l[3])/2;dx=max(dx,dy),dy=dx;return[xm-dx,xm+dx,ym-dy,ym+dy]}
function iota(n){return[...Array(n).keys()]}

function sn(x){let a=Math.abs(x),r=(a==0)?"0":(a>10000||a<0.00009)?x.toExponential(2):String(Math.round(10000*x)/10000);return r.replace(/\.0+e/,"e")}
function ncNum(ext,rnd){let e=floor(Math.log10(ext)),f=ext/(10**e),r;return(rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
function ncLim(x,y){let e=ncNum(y-x,false),s=ncNum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
function ncTic(x,y){let [p,_,s]=ncLim(x,y),r=[],i=0;while(p+i*s<=y){if(p+i*s>=x)r.push(p+i*s);i++};return r}
//function ncTic(x,y){let i,t,e=ncNum(y-x,false),[m,_,s]=ncLim(x,y),p=m,n=ceil(e/s+0.5),r=[]
// for(i=0;i<n;i++)if(((p=m+i*s)>=x)&&p<y)r.push(p);return r}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots,replot:replot}
})()
