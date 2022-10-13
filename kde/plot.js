function plot(t,x,axis){ //click(show-xy) dblclick(toggle-fullscreen) right-click(close)
 let cnv=ge("canv");cnv.width=cnv.clientWidth;cnv.height=cnv.clientHeight
 let c=cnv.getContext("2d")
 c.fillStyle="#fff"
 c.fillRect(0,0,cnv.width,cnv.height)
 if(t=="polar")polarplot(x,c,cnv.width,cnv.height)
 else xyplot(x,c,cnv.width,cnv.height,axis)
 cnv.style.zIndex=10
 cnv.zoom=false
 
 cnv.bak=c.getImageData(0,0,cnv.width,cnv.height)
 
 cnv.clearZoom=function(){c.clearRect(0,0,cnv.width,cnv.height);c.putImageData(cnv.bak,0,0) }
 cnv.oncontextmenu=function(e){pd(e);ge("legn").textContent="";cnv.style.zIndex=-1;repl.lastChild.focus()}
 cnv.ondblclick=function(e){cnv.classList.toggle("can1");plot(t,x)}
 cnv.onmousedown=function(e){cnv.zoom=[e.offsetX, e.offsetY, 0, 0];cnv.style.cursor="crosshair"}
 cnv.onmouseup=function(e){
  cnv.clearZoom();
  cnv.style.cursor=""
  if(Math.abs(cnv.zoom[2])< 5||Math.abs(cnv.zoom[3])<5){cnv.zoom=false;return}
  let xy0=cnv.coords(cnv.zoom[0],cnv.zoom[1])
  let xy1=cnv.coords(e.offsetX,e.offsetY)
  let axis=[Math.min(xy0[0],xy1[0]),Math.max(xy0[0],xy1[0]),Math.min(xy0[1],xy1[1]),Math.max(xy0[1],xy1[1])]
  cnv.zoom=false
  plot(t,x,axis)
 }
 cnv.onmousemove=function(e){
  if(cnv.zoom!==false){
  cnv.zoom=[cnv.zoom[0],cnv.zoom[1],e.offsetX-cnv.zoom[0],e.offsetY-cnv.zoom[1]]
  cnv.clearZoom();c.beginPath();c.rect(...cnv.zoom);c.strokeStyle='red';c.stroke()
 }}
}
function polarplot(x,c,w,h){
 let r=(w>h)?h/2:w/2
 let o=function(r){c.beginPath();c.arc(w/2,h/2,r,0,2*Math.PI);c.stroke()}
 let m=0
 let ma=function(x){
  let r2=0
  for(let i=0;i<x.length;i+=2){
   let v=x[i]*x[i]+x[1+i]*x[1+i]
   if(v>r2)r2=v
  }
  return Math.sqrt(r2)
 }
 for(let i=0;i<x.length;i++){let v=ma(x[i]);if(v>m)m=v}
 
 let l=niceLimits(0,m)
 let scale=r/l[1]
 
 c.lineWidth=1;
 c.strokeStyle="gray"
 let t=niceTics(0,m)
 for(let i=0;i<t.length;i++)o(scale*t[i])
 c.lineWidth=2;o(r)
 
 let O=function(x){
  for(let i=0;i<x.length;i+=2){
   c.beginPath();c.arc(w/2+x[1+i]*scale,h/2-x[i]*scale,4,0,2*Math.PI);c.fill()
  }
 }
 for(let i=0;i<x.length;i++){
  c.fillStyle=colornum(i)
  O(x[i])
 }
 
 ge("canv").onclick=function(e){let x=e.offsetX,y=e.offsetY
   let R=(x-w/2)/r,phi=Math.atan2((x-w/2)/r,(h/2-y)/r)/Math.PI*180
   ge("legn").innerText="r: "+String(R)+"\nφ: "+String((phi<0)?360+phi:phi)
  }
}
function xyplot(x,c,w,h,axis){
 let xmin=Infinity,xmax=-Infinity,ymin=Infinity,ymax=-Infinity
 if(axis!==undefined)[xmin,xmax,ymin,ymax]=axis
 else{
  for(let i=0;i<x.length;i++){
   let m=Math.min(...x[i][0]);if(m<xmin)xmin=m
       m=Math.max(...x[i][0]);if(m>xmax)xmax=m
       m=Math.min(...x[i][1]);if(m<ymin)ymin=m
       m=Math.max(...x[i][1]);if(m>ymax)ymax=m
  }
  if(false==(isFinite(xmin)&&isFinite(xmax)&&isFinite(ymin)&&isFinite(ymax)))return
 }
 let v=niceLimits(xmin,xmax);xmin=v[0];xmax=v[1]
     v=niceLimits(ymin,ymax);ymin=v[0];ymax=v[1]
 const xs=w/(xmax-xmin), ys=h/(ymax-ymin)
 let xscale=function(x){return xs*(x-xmin)}
 let yscale=function(x){return ys*(ymax-x)}
 let X=niceTics(xmin,xmax)
 let Y=niceTics(ymin,ymax)
 
 c.beginPath()
 c.lineWidth=1
 c.strokeStyle="gray"
 for(let i=0;i<X.length;i++){c.moveTo(xscale(X[i]),0);c.lineTo(xscale(X[i]),h);c.stroke()}
 for(let i=0;i<Y.length;i++){c.moveTo(0,yscale(Y[i]));c.lineTo(w,yscale(Y[i]));c.stroke()}
 
 c.lineWidth=2
 for(let i=0;i<x.length;i++){let X=x[i][0],Y=x[i][1]
  c.beginPath()
  c.strokeStyle=colornum(i)
  c.moveTo(xscale(X[0]),yscale(Y[0]))
  for(let j=0;j<X.length;j++)c.lineTo(xscale(X[j]),yscale(Y[j]))
  c.stroke()
 
  let coords=function(x,y){return [xmin+(x/w)*(xmax-xmin), ymax-(y/h)*(ymax-ymin)]} // axis x,y from pixels
  ge("canv").onclick=function(e){let x=e.offsetX,y=e.offsetY
   let [X,Y]=coords(x,y)
   //let X=xmin+(x/w)*(xmax-xmin)
   //let Y=ymax-(y/h)*(ymax-ymin)
   ge("legn").innerText="x: "+String(X)+"\ny: "+String(Y)
  }
  ge("canv").coords=coords
 }
}
function colornum(i){
 const  c=["#003FFF","#03ED3A","#E8000B","#8A2BE2","#FFC400","#00D7FF"]
 return c[i%c.length]
}
function niceTics(min,max){
 let t=[]
 let e=niceNumber(max-min,false)
 let v=niceLimits(min,max)
 let p=v[0];let s=v[2]
 let n=Math.ceil(e/s+0.5)
 for(let i=0;i<n;i++){
  p=v[0]+i*s
  if((p>min)&&(p<=max))t.push(p)
 }
 return t
}
function niceLimits(min, max){
 const maxTicks=5
 let extent =niceNumber(max-min,false)
 let spacing=niceNumber(extent/(maxTicks-1),true)
 let niceMin=Math.floor(min/spacing)*spacing
 let niceMax=Math.ceil(max/spacing)*spacing
 return [niceMin,niceMax,spacing]
}
function niceNumber(x, round){
 let e=Math.floor(Math.log10(x)),f=x/10**e,n
 if(round){
  if   (f<1.5)n=1
  else if(f<3)n=2
  else if(f<7)n=5
  else        n=10
 }else{
  if     (f<=1)n=1
  else if(f<=2)n=2
  else if(f<=5)n=5
  else         n=10
 }
 return n*10**e
}