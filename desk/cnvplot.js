let JS=JSON.stringify

let cnvplot=(p,caption,cnv,sld,det,txt,cap,...a)=>{let c=cnv.getContext("2d"),id=cnv.id,w=cnv.width,h=cnv.height,cols=0,single=0;
 let min=Math.min,max=Math.max,exp=Math.exp,log=Math.log,abs=Math.abs,sqrt=Math.sqrt,hypot=Math.hypot,sin=Math.sin,cos=Math.cos,atan2=Math.atan2,floor=Math.floor,ceil=Math.ceil,round=Math.round;const pi=Math.PI,_pi=180/pi,pi_=pi/180
 let scale=(x,x0,x1,y0,y1)=>y0+(x-x0)*(y1-y0)/(x1-x0),clamp=(x,a,b)=>x<a?a:x>b?b:x
 let FA=x=>new Float64Array(x),JS=JSON.stringify
 let Abs=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=hypot(x[2*i],x[2*i+1]);return r}
 let ReIm=(x,o)=>{let r=FA(x.length/2),i=-1;for(;o<x.length;o+=2)r[++i]=x[o];return r},Real=x=>ReIm(x,0),Imag=x=>ReIm(x,1)
 let Ang=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=atan2(x[2*i+1],x[2*i])*_pi;return r}//-180,180
 let shortnum=x=>{let s=String(x),t=x.toPrecision(4).replace("e+","e"),g=String(Number(t)),a=[s,t,g];a.sort((x,y)=>x.length-y.length);return a[0]}
 let iota=n=>{let r=Array(n);for(let i=0;i<n;i++)r[i]=i;return r}
 let Sum=x=>{let a=0,b=0,n=x.length>>1;for(let i=0;i<x.length;i+=2){a+=x[i];b+=x[1+i]};return[a,b]},sum=x=>{let r=0,i;for(i=0;i<x.length;i++)r+=x[i];return r}
 let Mean=u=>{let re=0,im=0,n=u.length/2;for(let i=0;i<u.length;i+=2){re+=u[i];im+=u[1+i]};return[re/n,im/n]},mean=x=>{let s=0,n=x.length,i;for(i=0;i<n;i++)s+=x[i];return s/n}
 
 let font1="12px monospace",font2="10px monospace";for(let i=0;i<a;i++){let x=a[i];x=="font1"?(font1=a[++i]):x=="font2"?(font2=a[++i]):x=="cols"?(cols=a[++i]):0}
 let fontheight=f=>{c.font=f;let m=c.measureText("AQ");return m.fontBoundingBoxAscent+m.fontBoundingBoxDescent},textwidth=t=>c.measureText(t).width
 let fh1=fontheight(font1),fh2=fontheight(font2),border=1,ticLength=6
 let titleHeight=t=>t?2+ceil(fh1):2,xlabelHeight=l=>2+(l.length?fh1:0),ylabelWidth=2+ceil(fh2)/*rotated*/,ticLabelWidth=yl=>(c.font=font2,max(...yl.map(textwidth))),ticLabelHeight=2+fh2,rightXYWidth=l=>7+textwidth(l)
 let colors=p.length?(p[0]?.Style?.Order?p[0].Style.Order.split(","):[]):[];colors=(colors.length?colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(","));
 let ncolors=colors.length;
 
 let err=x=>{throw new Error(x)}
 let mima=a=>{let mi=Infinity,ma=-Infinity;a.forEach(x=>x.forEach(x=>(mi=min(mi,isNaN(x)?mi:x),ma=max(ma,isNaN(x)?ma:x))));return[mi,ma]}

 let axscale=(a,X,Y)=>([X.map(x=>(x=scale(x,a.xmin,a.xmax,0,a.w),clamp(x,-a.w,2*a.w))),Y.map(y=>(y=scale(y,a.ymax,a.ymin,0,a.h),clamp(y,-a.h,2*a.h)))])
 let nicenum=(ext,rnd)=>{let e=floor(Math.log10(ext)),f=ext/(10**e),r;return(rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
 let nicelim=(x,y)=>{let e=nicenum(y-x,false),s=nicenum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
 let nicetics=(x,y)=>{let [p,_,s]=nicelim(x,y),r=[],i=0;while(p+i*s<=y){if(p+i*s>=x)r.push(p+i*s);i++};return{Pos:r,Labels:r.map(shortnum)}}   
 let autoscale=a=>nicelim(...mima(a)),autoscalr=a=>{let[x,y]=mima(a);return nicelim(0,y)}
 let polarlimits=(p,ring)=>{let l=p.Limits;if(ring)err("todo ring-limits");let y0,y1=l.Ymax;if(p.Limits.Ymax<=0)[y0,y1]=autoscalr(p.Lines.map(l=>Abs(l.C)));[l.Xmin,l.Xmax,l.Ymin,l.Ymax]=[-y1,y1,-y1,y1];return l}
 let xxlimits=p=>{let l=p.Limits;if(l.Xmin==l.Xmax)[p.Limits.Xmin,p.Limits.Xmax]=autoscale(p.Lines.map(l=>l.X))}
 let xylimits=p=>{xxlimits(p);let l=p.Limits;if(l.Ymin==l.Ymax){[l.Ymin,l.Ymax]=autoscale(p.Lines.map(l=>l.Y?l.Y:l.C));if(p.Square){l.Xmin=l.Ymin=min(l.Xmin,l.Ymin);l.Xmax=l.Ymax=max(l.Xmax,l.Ymax)}};return l} //todo raster
 let aalimits=p=>{xxlimits(p);let l=p.Limits,x_;if(l.Ymax==l.Ymin){l.Ymin=0;[x_,l.Ymax]=autoscale(p.Lines.map(l=>Abs(l.C)))};return l}
 let deflimits=l=>{if("undefined"==typeof l)l={};"Equal Xmin Xmax Ymin Ymax Zmin Zmax".split(" ").forEach(s=>{if(!(s in l))l[s]=0});return l}
 let limits=p=>{for(let i=0;i<p.length;i++){p[i].Limits=deflimits(p[i].Limits);let t=p[i].Type;p[i].Limits="xy"==t?xylimits(p[i]):"ampang"==t?aalimits(p[i]):"polar"==t?polarlimits(p[i],0):"ring"==t?polarlimits(p[i],1):{}};if(p[0].Limits.equal)console.log("todo equal-limits")}
 let labels=p=>{for(let i=0;i<p.length;i++){"Xlabel Ylabel Xunit Yunit".split(" ").forEach(x=>x in p[i]?0:p[i][x]="")}}
 let axes=(pi,xy,x,y,w,h,xmin,xmax,ymin,ymax)=>({pi:pi,xy:xy,x:x,y:y,w:w,h:h,xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax})
 let hs=s=>{const m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};return s.replace(/[&<>"]/g,c=>m[c])}
 let phjmp=(x,y)=>{let n=0,i=1;for(;i<y.length;i++)if(abs(y[i]-y[i-1])>280)++n;if(!n)return[x,y];let X=FA(x.length+3*n),Y=FA(x.length+3*n),j=1;X[0]=x[0];Y[0]=y[0];
  for(i=1;i<y.length;i++)abs(y[i]-y[i-1])>280? (X[j]=x[i],Y[j]=y[i]+(y[i]<0?360:-360),X[1+j]=NaN,Y[1+j]=NaN,X[2+j]=X[j-1],Y[2+j]=Y[j-1]+(Y[j-1]<0?360:-360),X[3+j]=x[i],Y[3+j]=y[i],j+=4):(X[j]=x[i],Y[j++]=y[i]);return[X,Y]}
 let xenv=x=>{let r=FA(2*x.length);r.set(x);let j=x.length;for(let i=x.length-1;i>=0;i--)r[j++]=x[i];return r}
 let xyxy=l=>[l.Y?l.X:xenv(l.X),l.Y?l.Y:l.C,!l.Y],xyamp=l=>[l.X,Abs(l.C),0],xyang=l=>[...phjmp(l.X,Ang(l.C)),0],xypolar=l=>[Imag(l.C),Real(l.C),0]
 
 let drawLines=(a,p,f,t)=>{c.save();c.translate(a.x,a.y);if(p.Lines[0]?.Style?.Marker?.Marker=="bar")drawBars(a,p,f);else{p.Lines.forEach((l,i)=>drawLine(a,p,l,i,f,t));/*marker?*/drawLabels(a,p,f,t)}c.restore()}
 let drawLine=(a,p,l,i,f,t)=>{let[lw,ps,cl]=linestyle(p,l,i),r="",em="",[x,y]=axscale(a,...f(l));x=Array.from(x);
  //todo if(t!="an"&&l?.Style?.Line?.EndMarks){let h=abs(x[0]-x[1])>abs(y[0]-y[1]),dx=h?0:300,dy=h?300:0;em=`M${x[0]-dx} ${y[0]-dy} L${x[0]+dx} ${y[0]+dy} M${x[1]-dx} ${y[1]-dy} L${x[1]+dx} ${y[1]+dy}`}
  if(lw>0&&x.length){c.beginPath();x.forEach((x,i)=>(isNaN(y[i])?0:(i==0||isNaN(y[i-1])?c.moveTo(x,y[i]):c.lineTo(x,y[i]))));t!="xy"||l.Y?0:c.closePath();l.Y||t!="xy"?lineclass(lw,cl):linefill(cl);if(l?.Style?.Line?.Arrow)arrow();}
  if(ps)x.forEach((x,i)=>fillCircle(x,y[i],ps,cl))}
 let drawBars=(a,p,f)=>{let r="",i,l,n=p.Lines.length,X0=[],X1=[],Y0=[],Y1=[],I=[]; //draw short bars last
  for(i=0;i<n;i++){l=p.Lines[i];let[x,y]=axscale(a,...f(l)),j;for(j=0;j<x.length;j+=2){X0.push(x[j]);X1.push(x[1+j]);Y0.push(y[j]);Y1.push(y[1+j]);I.push(l?.Id?l.Id:-1)}}
  let atx=(x,y)=>y.map(i=>x[i]),j=Array(X0.length).fill(0).map((_,i)=>i);j.sort((a,b)=>(a=Y1[a])<(b=Y1[b])?-1:a>b?1:0);X0=atx(X0,j);X1=atx(X1,j);Y0=atx(Y0,j);Y1=atx(Y1,j);I=atx(I,j);
  for(i=0;i<X0.length;i++)r+=`<rect x="${X0[i]}" y="${Y1[i]}" width="${X1[i]-X0[i]}" height="${Y0[i]-Y1[i]}" data-id="${I[i]}" class="C${I[i]}" ></rect>`;return r}
 let linestyle=(p,l,i)=>{let lw=l?.Style?.Line?.Width?l.Style.Line.Width:0,ps=l?.Style?.Marker?.Size?l.Style.Marker.Size:0;[lw,ps]=(!(lw||ps))?(p.Type=="polar"?[0,3]:[2,0]):[lw,ps];return[lw,ps,l?.Style?.Color?l.Style.Color:l?.Id?l.Id:1+i]}
 let lineclass=(lw,cl)=>{c.strokeStyle=cl?colors[(cl-1)%ncolors]:"black";c.lineWidth=lw;c.stroke()},linefill=cl=>{c.fillStyle=cl?colors[(cl-1)%ncolors]:"black";c.lineWidth=1;c.fill()}
 let drawLabels=(a,p,f,t)=>{p.Lines.forEach((l,i)=>drawLineLabels(a,p,l,i,f,t))}
 let drawLineLabels=(a,p,l,i,f,t)=>{if("an"==t||!l.Label)return;let X,Y,L=p.Limits,[x,y]=f(l),q=atan2(y[1]-y[0],x[1]-x[0])*_pi,Q={a:[5,1],b:[6,2],c:[4,0],d:[7,3]};x=scale(X=0.5*(x[0]+x[1]),L.Xmin,L.Xmax,a.x,a.x+a.w);y=scale(Y=0.5*(y[0]+y[1]),L.Ymax,L.Ymin,a.y,a.y+a.h);q=(q<-170?"a":q<-100?"b":q<-80?"c":q<-10?"d":q<10?"a":q<80?"b":q<100?"c":q<170?"d":"a")
  let left=(X-L.Xmin)/(L.Xmax-L.Xmin)>0.6,down=(Y-L.Ymin)/(L.Ymax-L.Ymin)>0.8,[al,dx,dy]=q=="a"?(down?[5,0,10]:[1,0,-10]):q=="b"?(left?[2,-1,-1]:[6,3,1]):q=="c"?(left?[3,-5,0]:[7,5,0]):(left?[0,0,0]:[4,0,0]);text(x+dx,y+dy,l.Label,al,1,1)}
 
 let textalign=a=>{c.textAlign="185".includes(a)?"center":"234".includes(a)?"right":"left";c.textBaseline="012".includes(a)?"bottom":"378".includes(a)?"middle":"top"}
 let text=(x,y,s,a,f2)=>{if(!s)return;textalign(a);c.font=f2?font2:font1;c.fillText(s,x,y)}
 let vtext=(x,y,s)=>{if(!s)return;c.save();c.translate(x,y);c.rotate(270*pi_);textalign(1);c.fillText(s,0,0);c.restore()}
 let black=_=>{c.strokeStyle="black";c.fillStyle="black";c.lineWidth=1}
 let line=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke()},strokeCircle=(x,y,r)=>{c.beginPath();c.arc(x,y,r,0,2*pi);c.stroke()},fillCircle=(x,y,r,cl)=>{c.beginPath();c.arc(x,y,r,0,2*pi);linefill(cl)}
 let drawTitle=(a,t,yo)=>{if(t)text(a.x+a.w/2,a.y-ticLength-3-(yo?yo:0),t,1,0)}
 let drawXYTics=(a,xp,yp,xl,yl)=>{let l=ticLength;line(a.x,a.y-l,a.x+a.w,a.y-l);line(a.x,a.y+a.h+l,a.x+a.w,a.y+a.h+l);line(a.x-l,a.y,a.x-l,a.y+a.h);line(a.x+a.w+l,a.y,a.x+a.w+l,a.y+a.h);htics(a,yp,yl,a.x-l,a.x);htics(a,yp,[],a.x+a.w,a.x+a.w+l);vtics(a,xp,[],a.y-l,a.y);vtics(a,xp,xl,a.y+a.h,a.y+a.h+l)}
 let htics=(a,Y,L,x1,x2)=>{Y.forEach((y,i)=>{y=round(scale(y,a.ymax,a.ymin,a.y,a.y+a.h));line(x1,y,x2,y);if(L.length)text(x1-3,y+1,L[i],3,1 /*,i==0?editlimit(Ymin):i==Y.length-1?editlimit(Ymax)*/)})} //todo store callback areas
 let vtics=(a,X,L,y1,y2)=>{X.forEach((x,i)=>{x=round(scale(x,a.xmin,a.xmax,a.x,a.x+a.w));line(x,y1,x,y2);if(L.length)text(x,  y2+2,L[i],5,1 /*,i==0?editlimit(Xmin):i==X.length-1?editlimit(Xmax)*/)})} //todo store callback areas
 let drawXlabel=(a,l,u)=>text(a.x+round(a.w/2),a.y+a.h+ticLength+ticLabelHeight,(l+" "+u).trim(),5,0)
 let drawYlabel=(a,l,u,ylw)=>vtext(a.x-2*ticLength-ylw,a.y+round(a.h/2),(l+" "+u).trim())
 let drawPolar=(a,rt,unit)=>{let r=floor(a.w/2),cx=a.x+r,cy=a.y+r,r1=r+ticLength/2,r2=r-ticLength/2,r3=r+2*ticLength,al=[1,0,0,7,6,6,5,4,4,3,2,2],cs=cos(40*pi_),sn=sin(40*pi_);
  line(cx+r*cs,cy+r*sn,cx+r3*cs,cy+r3*sn);text(cx+r3*cs,cy+r3*sn,shortnum(a.ymax),6,0/*todo editlimit(Ymax)*/);text(cx+r3*cs,cy+r3*sn+fh1,""+unit,6);
  Array(12).fill(0).map((_,i)=>30*i).forEach((p,i)=>{let cs=cos(p*pi_),sn=sin(p*pi_);line(cx+r1*cs,cy+r1*sn,cx+r2*cs,cy+r2*sn);text(cx+r1*cs,cy+r1*sn+1,((90+p)%360)+"",al[(3+i)%12],1)});
  rt.map(R=>strokeCircle(cx,cy,R/a.ymax*r));line(cx-r,cy,cx+r,cy)+line(cx,cy-r,cx,cy+r);c.lineWidth=2;strokeCircle(cx,cy,r);
 }

 let empty=(p,pi,w,h)=>{};
 let xy=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:"")
  let vfix=2*border+2*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit);
  let hs=w-hfix,vs=h-vfix,x0=0,y0=0;if(vs>2*hs){y0=floor((vs-2*hs)/2);vs=2*hs;};
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  if(p.Square){let d=hs-vs;d>0?(x0+=d/2):(y0-=d/2);vs=hs=floor(min(hs,vs))}
  let ax=axes(pi,"xy",x0,y0,hs,vs,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  drawLines(ax,p,xyxy,"xy");black();drawXYTics(ax,xt.Pos,yt.Pos,xt.Labels,yt.Labels);drawTitle(ax,p.Title);drawXlabel(ax,p.Xlabel,p.Xunit);drawYlabel(ax,p.Ylabel,p.Yunit,ylw)}
 let polar=(p,pi,w,h)=>{let rt=nicetics(0,p.Limits.Ymax),ylw=ticLabelWidth(["270"]),hfix=2*border+2*ylw,vfix=2*border+titleHeight(p.Title)+2*ticLabelHeight
  let hs=w-hfix,vs=h-vfix,d=hs<0&&vs<0?0:hs<vs?hs:vs;d-=1-(1&d);if(d<0)return;
  let x0=floor((w-hfix-d)/2),y0=floor((h-vfix-d)/2),ax=axes(pi,"po",x0+ylw+border,y0+titleHeight(p.Title)+ticLabelHeight+border,d,d,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  black();drawPolar(ax,rt.Pos,p.Yunit);drawTitle(ax,p.Title,ticLabelHeight-ticLength);drawLines(ax,p,xypolar,"po")}
 let ring=(p,pi,w,h)=>{}
 let ampang=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:""),vfix=2*border+4*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit)
  let x0=0,y0=0,hs=w-hfix,vs=h-vfix,aw=hs,h1=ceil(2*vs/3),h2=vs-h1;
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  let amp=axes(pi,"am",x0,y0,hs,h1,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax)
  let ang=axes(pi,"an",x0,y0+h1+2*ticLength,hs,h2,p.Limits.Xmin,p.Limits.Xmax,-180,180),angs="-180 -90 0 90 180".split(" ")
  drawLines(amp,p,xyamp,"am");drawLines(ang,p,xyang,"an");black();drawXYTics(amp,xt.Pos,yt.Pos,[],yt.Labels);drawXYTics(ang,xt.Pos,angs.map(Number),xt.Labels,angs);drawTitle(amp,p.Title);drawXlabel(ang,p.Xlabel,p.Xunit);drawYlabel(amp,p.Ylabel,p.Yunit,ylw)}
 let foto=(p,w,h)=>{}
 let textplot=(p,w,h)=>{}
 
 let grid=(n,c, g)=>{g={n:n};c<0?(g.colmajor=1,-c):(!c)?c=((n<13)?[4,4,4,4,4,3,3,4,4,5,5,4,4][n]:5):0;g.r=1;g.c=(n<c?n:(g.r=0|n/c,c));g.r=(g.r*g.c<n)?1+g.r:g.r;g.w=w/g.c;g.h=h/g.r;g.width=w;return g}
 let xyi=(g,n, i,k,x,y,m)=>{x=0;i=0|n/g.c;k=n%g.c;if(g.colmajor)[i,k]=[k,i];if(i==0|(g.n-1)/g.c){m=1+((g.n-1)%g.c);x=(g.width-m*g.w)/2}x+=k*g.w;y=i*g.h;return[x,y]}
 let P={"":empty,"xy":xy,"raster":xy,"polar":polar,"ring":ring,"ampang":ampang,"foto":foto,"text":textplot}
 let plots=p=>{let g=grid(p.length,cols);limits(p);labels(p);p.forEach((p,i)=>{let[x,y]=xyi(g,i),pi=i+(single?single-1:0);c.save();c.translate(x+0.5,y+0.5);P[p.Type](p,pi,g.w,g.h);c.restore()})}
 
 plots(single?[p[single-1]]:p)
 
 cnv.addEventListener('dblclick',e=>console.log("dblickclick "+id))
}