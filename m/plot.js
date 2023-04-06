let plotjs=(()=>{

let ge=function(x){return document.getElementById(x)}
let pd=function(e){e.preventDefault();e.stopPropagation()}
let ct=(x,y)=>x.classList.contains(y)
let vmin=x=>Math.min(...x),vmax=x=>Math.max(...x),min=Math.min,max=Math.max,floor=Math.floor,ceil=Math.ceil

function replot(canvas){plots(canvas.plots,canvas,canvas.slider,canvas.listbx)}

function plots(p,canvas,slider,listbx){
 canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight
 let width,height;[width,height]=[canvas.width,canvas.height]
 let c=canvas.getContext("2d")
 
 p=(p===null)?{}:p
 p.equal  =("equal" in p)?p.equal :false
 p.colors =("colors"in p)?p.colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(",")
 p.cols   =("cols"  in p)?p.cols  :0
 p.font1  =("font1" in p)?p.font1 :"20px monospace"
 p.font2  =("font2" in p)?p.font2 :"16px monospace"
 p.hi     =("hi"    in p)?p.hi    :{lines:[],point:null}
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
   r.push(plot(p.plots[(p.cols<0)?j+nr*(i%nc):i],c,w,h,p))
   rects.push(r)
   c.restore()
   if(0==(1+i)%nc)j++;if((j==nr-1)&&(np%nc))w=width/(np%nc)
  }
 }
 
 canvas.plots=p;canvas.slider=slider;canvas.listbx=listbx
 //let replot=function(force){if((canvas.clientWidth!=width)||(canvas.clientHeight!=height)||force===true)plots(p,canvas,slider,listbx)}
 //{let r;window.addEventListener("resize",function(){clearTimeout(r);r=setTimeout(replot, 200)})}
 
 canvas.ondblclick=function(e){
  let r=e.target.getBoundingClientRect()
  let x=e.clientX-r.left, y=e.clientY-r.top
  let ri=targetRect(x,y,rects)
  let [line,point]=snapPoint(x,y,rects[ri],p.plots[ri])
  p.hi={lines:[line],point:point}
  if(slider!==undefined){
   slider.min=0;slider.max=p.plots[ri].lines[line].y.length-1
   slider.value=point
  }
  replot(canvas)
 }
 if(slider!==undefined){
  slider.ondblclick=function(e){
   slider.setAttribute("orient",ct(slider,"plot-slider-v")?"vertical":"horizontal")
   canvas.classList.toggle("plot-canvas-h");canvas.classList.toggle("plot-canvas-v")
   slider.classList.toggle("plot-slider-h");slider.classList.toggle("plot-slider-v")
   listbx.classList.toggle("plot-listbx-h");listbx.classList.toggle("plot-listbx-v")
   replot(canvas)
  }
  slider.onchange=function(e){
   p.hi.point=slider.value
   replot(canvas)
  }
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
 //..
}



function plot(p,c,w,h,plts){
 p.type  =("type"   in p)?p.type: "xy"
 p.title =("title"  in p)?p.title: ""
 p.xlabel=("xlabel" in p)?p.xlabel:""
 p.ylabel=("ylabel" in p)?p.ylabel:""
 
 //c.translate(floor(w/2),floor(h/2))
 c.fillStyle=c.strokeStyle="black";c.lineWidth=2
 switch(p.type){
 case"xy":    return     xyplot(p,c,w,h,plts)
 case"polar": return  polarplot(p,c,w,h,plts)
 case"ampang":return ampangplot(p,c,w,h,plts)
 default:throw new Error("unknown plot type: "+p.type)
}}

function xyplot(p,c,w,h,plts){if(!p.lines)return;w=min(w,1.5*h),h=min(h,w);
 p.lines=p.lines.map(l=>{l.x=("undefined"==typeof l.x)?iota(l.y.length):l.x;return l})
 let aw=max(0,w-plts.xyw),ah=max(0,h-plts.xyh),li=limits(p),[x0,x1,y0,y1]=autoxy(p.lines,li),
 xs=aw/(x1-x0),ys=ah/(y1-y0),xx=x=>xs*(x-x0),yy=y=>ys*(y0-y),t,
 mark=(x,y)=>{align(c,6+2*+(xx(x)>w/2));c.beginPath();c.fillText(x+", "+y,xx(x),yy(y))}
 ln=(l,i)=>{let x=l.x,y=l.y;if(!x.length)return
  if("undefined"==typeof l.style||l.style.includes("-")){
   c.beginPath();c.moveTo(xx(x[0]),yy(y[0]));for(let j=0;j<x.length;j++){c.lineTo(xx(x[j]),yy(y[j]))}
   c.strokeStyle=plts.colors[i%plts.colors.length];c.lineWidth=hiline(plts,i)*(l.size?l.size:2)
   c.stroke()}
  let hp=plts.hi.point;if((hp!==null)&&(i==plts.hi.lines[0])&&(hp>=0)&&(hp<x.length)){c.beginPath();c.arc(xx(x[hp]),yy(y[hp]),5,0,2*Math.PI);c.fillStyle=c.strokeStyle;c.fill();mark(x[hp],y[hp])}
 }
 c.strokeRect(plts.xyx,plts.xyy,aw,ah)
 align(c,1)
 c.fillText(p.title, plts.xyx+center(aw),0)
 align(c,7);c.fillText(p.xlabel,plts.xyx+center(aw),h)
 align(c,1);text90(c,0,center(h),p.ylabel)
 c.translate(plts.xyx,ah+plts.xyy);
 c.lineWidth=2;c.font=plts.font2
 align(c,1);ncTic(x0,x1).map(x=>{t=String(x);x=xx(x);c.beginPath();c.moveTo(x,0);c.lineTo(x,plts.tl);c.stroke();c.fillText(t,x,plts.tl)})
 align(c,5);ncTic(y0,y1).map(y=>{t=String(y);y=yy(y);c.beginPath();c.moveTo(-plts.tl,y);c.lineTo(0,y);c.stroke();c.fillText(t,-plts.tl,y)})
 c.beginPath();c.rect(0,-ah,aw,ah);c.clip();p.lines.map(ln);return(l,j)=>[plts.xyx+xx(l.x[j]),ah+plts.xyy+yy(l.y[j])]
}
function polarplot(p,c,w,h,plts){if(!p.lines)return;c.translate(floor(w/2),floor(h/2))
 let ra=floor(min(w-plts.pw,h-plts.ph-plts.tih)/2),raa=ra+plts.tl,al=[7,6,3,3,0,0,1,2,2,5,5,8],
 li=limits(p),r1=autop(p.lines,li[3]),sc=ra/r1,
 ln=(l,i)=>{let x=l.y,y=l.z;if(!x.length)return
  let mark=j=>{c.beginPath();c.fillText(absang(x[j],y[j]),sc*x[j],sc*y[j])}
  let s=hiline(plts,i)*(l.size?l.size:3);c.fillStyle=plts.colors[i%plts.colors.length]
  let hp=j=>hipoint(plts,i,j)
  x.map((x,i)=>{c.beginPath();c.arc(sc*x,sc*y[i],s*hp(i),0,2*Math.PI);c.fill()})
  x.map((x,i)=>{if(hp(i)>1)mark(i)})}
 c.translate(0,floor(plts.tih/2))
 circle(c,0,0,ra)
 c.textAlign="center";c.textBaseline="bottom"
 c.fillText(p.title,0,-ra-plts.tl-plts.tlh)
 align(c,0);c.fillText("⮤"+r1,floor(0.74*ra),floor(0.67*ra))
 if(p.ylabel){align(c,0);c.fillText(p.ylabel,floor(0.74*ra),plts.tih+floor(0.67*ra))}
 c.font=plts.font2;iota(12).map(i=>{let p=30*i*Math.PI/180,x=Math.sin(p),y=-Math.cos(p);align(c,al[i]);c.beginPath();c.moveTo(ra*x,ra*y);c.lineTo(raa*x,raa*y);c.stroke();c.fillText(""+30*i,raa*x,raa*y)})
 c.strokeStyle="#ccc";ncTic(0,r1).slice(1,-1).map(t=>circle(c,0,0,sc*t))
 c.beginPath();c.moveTo(-ra,0);c.lineTo(ra,0);c.stroke();c.beginPath();c.moveTo(0,-ra);c.lineTo(0,ra);c.stroke()
 c.beginPath();c.arc(0,0,ra,0,2*Math.PI);c.clip();p.lines.map(ln);return(l,j)=>[floor(w/2)+sc*l.y[j],floor(h/2)+floor(plts.tih/2)+sc*l.z[j]]
}
function ampangplot(p,c,w,h,plts){if(!p.lines)return;let l=p.lines
 for(let i=0;i<l.length;i++)if(l[i].z!==null){for(let j=0;j<l[i].y.length;j++)l[i].y[j]=Math.hypot(l[i].y[j],l[i].z[i]);l[i].z=null}
 p.lines=l;xyplot(p,c,w,h,plts)
}
function h1(plts){let h=parseFloat(plts.font1);return isNaN(h)?20:ceil(h)}
function h2(plts){let h=parseFloat(plts.font2);return isNaN(h)?14:ceil(h)}
function layout(c,plts){                           //computed sizes depending on fontsize
 plts.tih=ceil(1.2*h1(plts))                       //title height
 c.font=plts.font2;let t=c.measureText('-1.234');
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

function hiline(p,i){return (p.hi.lines.includes(i)&&p.hi.point===null) ? 2 : 1}
function hipoint(p,i,j){return (p.hi.lines.length==1&&p.hi.lines[0]==i&&p.hi.point==j) ? 2 : 1}
function absang(x,y){let p=180/Math.PI*Math.atan2(x,-y);p=(p<0)?p+360:p;return Math.hypot(x,y).toPrecision(4)+"@"+p.toPrecision(4)}
function targetRect(x,y,rects){for(let i=0;i<rects.length;i++){let R=rects[i];if((x>=R[0])&&(y>=R[1])&&(x<=R[0]+R[2])&&(y<=R[1]+R[3])){return i}};return null}
function snapPoint(x,y,rect,p){x-=rect[0];y-=rect[1]
 let line=0,point=0,dist=Infinity,f=rect[4]
 for(let i=0;i<p.lines.length;i++){
  let l=p.lines[i]
  for(let j=0;j<l.y.length;j++){
   let [X,Y]=f(l,j);X-=x;Y-=y
   let d=X*X+Y*Y
   if((i==0)&&(j==0))console.log("i/j",i,j,"XY",X,Y,"xy",x,y,"d",d)
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
 switch(l.length){case 0:return r;case 1:return[0,0,0,r[0],0,0];case 2:return[r[0],r[1],0,0,0,0];
 case 3:return[r[0],r[1],0,r[2],0,0];case 4:return l.concat([0,0]);default:return l}}
function autoxy(L,a){let r=a.slice(0,4)
 if(r[0]==r[1]){[r[0],r[1]]=ncLim(vmin(L.map(l=>vmin(l.x))),vmax(L.map(l=>vmax(l.x)))).slice(0,2)}
 if(r[2]==r[3]){[r[2],r[3]]=ncLim(vmin(L.map(l=>vmin(l.y))),vmax(L.map(l=>vmax(l.y)))).slice(0,2)}
 return r}
function autop(L,r){return ncLim(0,vmax(L.map(l=>Math.sqrt( vmax(l.y.map((y,i)=>y*y+l.z[i]*l.z[i]))))))[1]}
function iota(n){return[...Array(n).keys()]}

function ncNum(ext,rnd){let e=floor(Math.log10(ext)),f=ext/(10**e),r
 return (rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
function ncLim(x,y){let e=ncNum(y-x,false),s=ncNum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
function ncTic(x,y){let [p,_,s]=ncLim(x,y),r=[];while(p<=y){if(p>=x)r.push(p);p+=s};return r}
//function ncTic(x,y){let i,t,e=ncNum(y-x,false),[m,_,s]=ncLim(x,y),p=m,n=ceil(e/s+0.5),r=[]
// for(i=0;i<n;i++)if(((p=m+i*s)>=x)&&p<y)r.push(p);return r}

function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

return{plots:plots,replot:replot}
})()
