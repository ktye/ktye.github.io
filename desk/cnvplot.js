"use strict";let cnvplot=(cnv,p,/*,caption,cnv,sld,det,txt,cap,*/...a)=>{let c=cnv.getContext("2d",{willReadFrequently:true}),id=cnv.id,w=cnv.width,h=cnv.height,single=0;
 let min=Math.min,max=Math.max,exp=Math.exp,log=Math.log,abs=Math.abs,sqrt=Math.sqrt,hypot=Math.hypot,sin=Math.sin,cos=Math.cos,atan2=Math.atan2,floor=Math.floor,ceil=Math.ceil,round=Math.round,sign=Math.sign;const pi=Math.PI,_pi=180/pi,pi_=pi/180
 let scale=(x,x0,x1,y0,y1)=>y0+(x-x0)*(y1-y0)/(x1-x0),clamp=(x,a,b)=>x<a?a:x>b?b:x
 let FA=x=>new Float64Array(x),JS=JSON.stringify
 let Abs=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=hypot(x[2*i],x[2*i+1]);return r}
 let ReIm=(x,o)=>{let r=FA(x.length/2),i=-1;for(;o<x.length;o+=2)r[++i]=x[o];return r},Real=x=>ReIm(x,0),Imag=x=>ReIm(x,1)
 let Ang=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=atan2(x[2*i+1],x[2*i])*_pi;return r}//-180,180
 let shortnum=x=>{let s=String(x),t=x.toPrecision(4).replace("e+","e"),g=String(Number(t)),a=[s,t,g];a.sort((x,y)=>x.length-y.length);return a[0]}
 let sz=(x,y)=>shortnum(hypot(x,y))+"a"+((360+floor(atan2(x,y)*_pi))%360)
 let iota=n=>{let r=Array(n);for(let i=0;i<n;i++)r[i]=i;return r}
 let Sum=x=>{let a=0,b=0,n=x.length>>1;for(let i=0;i<x.length;i+=2){a+=x[i];b+=x[1+i]};return[a,b]},sum=x=>{let r=0,i;for(i=0;i<x.length;i++)r+=x[i];return r}
 let Mean=u=>{let re=0,im=0,n=u.length/2;for(let i=0;i<u.length;i+=2){re+=u[i];im+=u[1+i]};return[re/n,im/n]},mean=x=>{let s=0,n=x.length,i;for(i=0;i<n;i++)s+=x[i];return s/n}

 let font1="12px monospace",font2="10px monospace",cols=0,resize=0,stati=0; //args
 for(let i=0;i<a.length;i++){let x=a[i];x=="font1"?(font1=a[++i]):x=="font2"?(font2=a[++i]):x=="cols"?(cols=a[++i]):x=="resize"?(resize=1):x=="static"?(stati=1):0}
 let fontheight=f=>{c.font=f;let m=c.measureText("AQ");return m.fontBoundingBoxAscent+m.fontBoundingBoxDescent},textwidth=t=>c.measureText(t).width
 let fh1=fontheight(font1),fh2=fontheight(font2),border=1,ticLength=6
 let titleHeight=t=>t?2+ceil(fh1):2,xlabelHeight=l=>2+(l.length?fh1:0),ylabelWidth=2+ceil(fh2)/*rotated*/,ticLabelWidth=yl=>(c.font=font2,max(...yl.map(textwidth))),ticLabelHeight=2+fh2,rightXYWidth=l=>7+textwidth(l)
 let colors=p.length?(p[0]?.Style?.Order?p[0].Style.Order.split(","):[]):[];colors=(colors.length?colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(","));
 let ncolors=colors.length;
 let usrlimits=[],inilimits=[],reslimits=_=>{usrlimits=[];inilimits.forEach((l,i)=>p[i].Limits=JSON.parse(l))};p.forEach(p=>inilimits.push(p.Limits?JS(p.Limits):"{}"))
 
 let err=x=>{throw new Error(x)}
 let ce=x=>document.createElement(x),pd=e=>(e.preventDefault(),e.stopPropagation()),ac=(p,c)=>(p.appendChild(c),p),tc=(t,x)=>(x.textContent=t,x)
 let mima=a=>{let mi=Infinity,ma=-Infinity;a.forEach(x=>x.forEach(x=>(mi=min(mi,isNaN(x)?mi:x),ma=max(ma,isNaN(x)?ma:x))));return[mi,ma]}
 let asc=(x,y)=>x<y?[x,y]:[y,x]
 
 let check=p=>{p.forEach((p,i)=>checkpi(p,i))},checkpi=(p,I)=>{(p.Lines&&Array.isArray(p.Lines))||err(`plot[${I}].Lines missing`);let t=p.Type;p.Lines.forEach((l,i)=>t=="xy"?checkxy(l,I,i):t=="ampang"?checkaa(l,I,i):t=="polar"?checkpo(l,I,i):err(`plot[${I}].Type: unknown plot type: ${t}`))};
 let lerr=(i,j,s)=>err(`plot[${i}].Lines[${j}]: ${s}`),need=(l,i,j,...s)=>{s.forEach(s=>{if(!(s in l))lerr(i,j,s+" missing")})},checklen=(I,J,a,b,s)=>{if(a!=b)lerr(I,J,`length mismatch ${s}: ${a}!=${b}`)}
 let checkaa=(l,I,J)=>(need(l,I,J,"X","C"),checklen(I,J,2*l.X.length,l.C.length,"2*X Y")),
     checkxy=(l,I,J)=>{need(l,I,J,"X");if("Y"in l)checklen(I,J,l.X.length,l.Y.length,"X,Y");else{need(l,I,J,"C");checklen(I,J,2*l.X.length,l.C.length,"2*X,C")}},checkpo=(l,I,J)=>need(l,I,J,"C")
 let axscale=(a,X,Y)=>([X.map(x=>(x=scale(x,a.xmin,a.xmax,0,a.w),clamp(x,-a.w,2*a.w))),Y.map(y=>(y=scale(y,a.ymax,a.ymin,0,a.h),clamp(y,-a.h,2*a.h)))])
 let axcoords=(a,x,y)=>[scale(x-a.x,0,a.w,a.xmin,a.xmax),scale(y-a.y,0,a.h,a.ymax,a.ymin)]
 let axclip=(a,t)=>{c.beginPath();t=="po"?c.arc(a.w/2,a.h/2,4+a.w/2,0,2*pi):c.rect(-2,-2,4+a.w,4+a.h);c.clip()}
 let nicenum=(ext,rnd)=>{let e=floor(Math.log10(ext)),f=ext/(10**e),r;return(rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
 let nicelim=(x,y)=>{if(x==y){[x,y]=(!x)?[-0.1,0.1]:[x-0.1*abs(x),y+0.1*abs(y)]};let e=nicenum(y-x,false),s=nicenum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
 let nicetics=(x,y)=>{let [p,_,s]=nicelim(x,y),r=[],i=0;while(p+i*s<=y+s*1e-12){if(p+i*s>=x)r.push(p+i*s);i++};return{Pos:r,Labels:r.map(shortnum)}}   
 let autoscale=a=>nicelim(...mima(a)),autoscalr=a=>{let[x,y]=mima(a);return nicelim(0,y||1)}
 let polarlimits=(p,ring)=>{let l=p.Limits;if(ring)err("todo ring-limits");let y0,y1=l.Ymax;if(l.Ymax<=l.Ymin||l.Xmax<=l.Xmin){[y0,y1]=autoscalr(p.Lines.map(l=>Abs(l.C)));[l.Xmin,l.Xmax,l.Ymin,l.Ymax]=[-y1,y1,-y1,y1]}; let cx=(l.Xmin+l.Xmax)/2,cy=(l.Ymin+l.Ymax)/2,r=max(l.Ymax-l.Ymin,l.Xmax-l.Ymin)/2;return{Xmin:cx-r,Xmax:cx+r,Ymin:cy-r,Ymax:cy+r}}
 let xxlimits=p=>{let l=p.Limits;if(l.Xmin==l.Xmax)[p.Limits.Xmin,p.Limits.Xmax]=autoscale(p.Lines.map(l=>l.X))}
 let xylimits=p=>{xxlimits(p);let l=p.Limits;if(l.Ymin==l.Ymax){[l.Ymin,l.Ymax]=autoscale(p.Lines.map(l=>l.Y?l.Y:l.C));if(p.Square){l.Xmin=l.Ymin=min(l.Xmin,l.Ymin);l.Xmax=l.Ymax=max(l.Xmax,l.Ymax)}};return l} //todo raster
 let aalimits=p=>{xxlimits(p);let l=p.Limits,x_;if(l.Ymax==l.Ymin){l.Ymin=0;[x_,l.Ymax]=autoscale(p.Lines.map(l=>Abs(l.C)))};return l}
 let deflimits=l=>{if("undefined"==typeof l)l={};"Equal Xmin Xmax Ymin Ymax Zmin Zmax".split(" ").forEach(s=>{if(!(s in l))l[s]=0});return l}
 let limits=p=>{for(let i=0;i<p.length;i++){p[i].Limits=usrlimits[i]||deflimits(p[i].Limits);let t=p[i].Type;p[i].Limits="xy"==t?xylimits(p[i]):"ampang"==t?aalimits(p[i]):"polar"==t?polarlimits(p[i],0):"ring"==t?polarlimits(p[i],1):{}};if(p[0].Limits.equal)console.log("todo equal-limits")}
 let labels=p=>{for(let i=0;i<p.length;i++){"Xlabel Ylabel Xunit Yunit".split(" ").forEach(x=>x in p[i]?0:p[i][x]="")}}
 let axes=(pi,xy,x,y,w,h,xmin,xmax,ymin,ymax)=>{let a={pi:pi,xy:xy,x:x,y:y,w:w,h:h,xmin:xmin,xmax:xmax,ymin:ymin,ymax:ymax};if(xy!="an")Axes.push(a);return a}
 let hs=s=>{const m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};return s.replace(/[&<>"]/g,c=>m[c])}
 let axvisi=(ax,x,y)=>{let A=ax.xmin,B=ax.xmax,C=ax.ymin,D=ax.ymax,n=x.length,N=0,i,j=0,a,b,c,d,o=(x,y)=>x<A||x>B||y<C||y>D,X=FA(n),Y=FA(n),t=!o(a=x[0],b=y[0]);if(t){X[0]=a;Y[j++]=b}
  for(i=1;i<n;i++){c=x[i];d=y[i];if(a<A&&c<A||a>B&&c>B||b<C&&d<C||b>D&&d>D){if(t){X[j]=c;Y[j++]=d;X[j]=NaN;Y[j++]=NaN;t=0}}else{if(!t){X[j]=a;Y[j++]=b;t=1}X[j]=c;Y[j++]=d}a=c;b=d}
  return[X.subarray(0,j),Y.subarray(0,j)]}
 let evvisi=(ax,x,y)=>{let o=[[]],a=ax.xmin,b=ax.xmax,A=ax.ymin,B=ax.ymax,n=x.length,c=x[0],d=x[n-1],I=clamp(floor(scale(a,c,d,0,n)),0,n),J=clamp(ceil(scale(b,c,d,0,n)),0,n);if(J-I<=0)return o;x=x.slice(I,J);y=y.slice(2*I,2*J);return y.every(y=>y<A||y>B)?o:[x,y]}
 let phjmp=(x,y)=>{let n=0,i=1;for(;i<y.length;i++)if(abs(y[i]-y[i-1])>280)++n;if(!n)return[x,y];let X=FA(x.length+3*n),Y=FA(x.length+3*n),j=1;X[0]=x[0];Y[0]=y[0];
  for(i=1;i<y.length;i++)abs(y[i]-y[i-1])>280? (X[j]=x[i],Y[j]=y[i]+(y[i]<0?360:-360),X[1+j]=NaN,Y[1+j]=NaN,X[2+j]=X[j-1],Y[2+j]=Y[j-1]+(Y[j-1]<0?360:-360),X[3+j]=x[i],Y[3+j]=y[i],j+=4):(X[j]=x[i],Y[j++]=y[i]);return[X,Y]}
 let xenv=x=>{let r=FA(2*x.length);r.set(x);let j=x.length;for(let i=x.length-1;i>=0;i--)r[j++]=x[i];return r},yenv=y=>{let r=FA(y.length),n=r.length>>>1,i,j;for(i=0;i<n;i++)r[i]=y[1+2*i];j=2*n-2;for(i=n;i<2*n;j-=2,i++)r[i]=y[j];return r}
 let envl=(a,x,y)=>{let i,j,n=x.length,s=a.w/(a.xmax-a.xmin),dx=(x[n-1]-x[0])/(n-1),D=s*dx;while(D<1&&n>16){D*=2;n>>>=1;for(i=0;i<n;i++){x[i]=x[2*i]};for(i=0;i<2*n;i+=2){j=2*i;y[i]=min(y[j],y[j+2]);y[i+1]=max(y[j+1],y[j+3])}}return[xenv(x.slice(0,n)),yenv(y.slice(0,2*n))]}
 let xyxy=l=>[l.X,l.Y?l.Y:l.C],xyamp=l=>[l.X,Abs(l.C)],xyang=l=>[...phjmp(l.X,Ang(l.C))],xypolar=l=>[Imag(l.C),Real(l.C)]
 
 
 let drawLines=(a,p,f,t)=>{c.save();c.translate(a.x,a.y);axclip(a,t);if(p.Lines[0]?.Style?.Marker?.Marker=="bar")drawBars(a,p,f);else{p.Lines.forEach((l,i)=>drawLine(a,p,l,i,f,t));/*marker?*/drawLabels(a,p,f,t)}c.restore()}
 let drawLine=(a,p,l,i,f,t)=>{let[lw,ps,cl]=linestyle(p,l,i),r="",em="",ev=t=="xy"&&l.C;let[x,y]=f(l);if(!x.length)return;[x,y]=ev?evvisi(a,x,y):axvisi(a,x,y); if(!x.length)return;if(ev)[x,y]=envl(a,x,y);  [x,y]=axscale(a,x,y); 
  if((t=="xy"||t=="am")&&l?.Style?.Line?.EndMarks){let m=l.Style.Line.EndMarks;let h=abs(x[0]-x[1])>abs(y[0]-y[1]),dx=(!h)*m,dy=h*m;lineclass(lw,cl,1);line(x[0]-dx,y[0]-dy,x[0]+dx,y[0]+dy);line(x[1]-dx,y[1]-dy,x[1]+dx,y[1]+dy)}
  if(lw>0&&x.length){c.beginPath();x.forEach((x,i)=>(isNaN(y[i])?0:(i==0||isNaN(y[i-1])?c.moveTo(x,y[i]):c.lineTo(x,y[i]))));t!="xy"||l.Y?0:c.closePath();if(t=="xy"&&!l.Y)linefill(cl);lineclass(lw,cl);if(l?.Style?.Line?.Arrow)arrow(x,y,lw,cl);}
  if(ps)x.forEach((x,i)=>fillCircle(x,y[i],ps,cl))}
 let drawBars=(a,p,f)=>{let r="",i,l,n=p.Lines.length,X0=[],X1=[],Y0=[],Y1=[],I=[]; //draw short bars last
  for(i=0;i<n;i++){l=p.Lines[i];let[x,y]=axscale(a,...f(l)),j;for(j=0;j<x.length;j+=2){X0.push(x[j]);X1.push(x[1+j]);Y0.push(y[j]);Y1.push(y[1+j]);I.push(l?.Id?l.Id:-1)}}
  let atx=(x,y)=>y.map(i=>x[i]),j=Array(X0.length).fill(0).map((_,i)=>i);j.sort((a,b)=>(a=Y1[a])<(b=Y1[b])?-1:a>b?1:0);X0=atx(X0,j);X1=atx(X1,j);Y0=atx(Y0,j);Y1=atx(Y1,j);I=atx(I,j);
  for(i=0;i<X0.length;i++)r+=`<rect x="${X0[i]}" y="${Y1[i]}" width="${X1[i]-X0[i]}" height="${Y0[i]-Y1[i]}" data-id="${I[i]}" class="C${I[i]}" ></rect>`;return r}
 let linestyle=(p,l,i)=>{let lw=l?.Style?.Line?.Width?l.Style.Line.Width:0,ps=l?.Style?.Marker?.Size?l.Style.Marker.Size:0;[lw,ps]=(!(lw||ps))?(p.Type=="polar"?[0,3]:[2,0]):[lw,ps];return[lw,ps,l?.Style?.Line?.Color==0?0:l?.Style?.Line?.Color?l.Style?.Line.Color:l?.Id?l.Id:1+i]}
 let lineclass=(lw,cl,no)=>{c.strokeStyle=cl?colors[(cl-1)%ncolors]:"black";c.lineWidth=lw;if(!no)c.stroke()},linefill=cl=>{c.fillStyle=cl?colors[(cl-1)%ncolors]:"black";c.fill()}
 let drawLabels=(a,p,f,t)=>{p.Lines.forEach((l,i)=>drawLineLabels(a,p,l,i,f,t))}
 let drawLineLabels=(a,p,l,i,f,t)=>{if("an"==t||!l.Label)return;c.fillStyle="black";let dx,dy,al,fw,xx,yy,[x,y]=f(l);[x,y]=axscale(a,x,y);fw=sign(x[0]-x[1])==sign(y[0]-y[1]);dx=abs(x[0]-x[1]);dy=abs(y[0]-y[1]);x=0.5*(x[0]+x[1]);y=0.5*(y[0]+y[1]);
  xx=round(x-a.w/2);yy=round(a.h/2-y);[al,dx,dy]=dy==0&&y>a.y+30?[1,0,0]:dy==0?[5,0,3]:dx==0&&x<a.x+a.w/2?[7,2,0]:dx==0?[3,-2,0]:fw&&xx>-yy?[4,-2,2]:fw?[0,1,-1]:xx>yy?[2,-1,-1]:[6,2,2];text(x+dx,y+dy,l.Label,al,0,1)}
  
 let hitbox=(f,b,pi,s)=>{let x=rects[single?0:pi].x,y=rects[single?0:pi].y;b.l+=x;b.r+=x;b.t+=y;b.b+=y;b.pi=pi;b.s=s;b.f=f;hits.push(b)} //double-click events
 let hitTitle=h=>{single=single?0:1+h.pi;replot()},prmt=(s,x)=>{let r=prompt(s,x);x=+r;return(r===null||isNaN(x))?[0,x]:[1,x]}
 let hitPolimit=h=>{let[o,y]=prmt("polar limit",h.s);if((!o)||y<0)return;usrlimits[h.pi]={Xmin:-y,Xmax:y,Ymin:-y,Ymax:y};replot()}
 let hitPoloffs=h=>{let a=Axes[single?0:h.pi],r=max(abs(a.xmax),abs(a.xmin),abs(a.ymax)-abs(a.ymin));console.log("pi",h.pi,"a",a,"r",r);usrlimits[h.pi]={Xmin:-r,Xmax:r,Ymin:-r,Ymax:r};replot()}
 let hitXmin=h=>{let[o,x]=prmt("xmin",h.s),a=Axes[single?0:h.pi],l={Xmin:a.xmin,Xmax:a.xmax,Ymin:a.ymin,Ymax:a.ymax};if(!o)return;[l.Xmin,l.Xmax]=asc(x,l.Xmax);usrlimits[h.pi]=l;replot()}
 let hitXmax=h=>{let[o,x]=prmt("xmax",h.s),a=Axes[single?0:h.pi],l={Xmin:a.xmin,Xmax:a.xmax,Ymin:a.ymin,Ymax:a.ymax};if(!o)return;[l.Xmin,l.Xmax]=asc(l.Xmin,x);usrlimits[h.pi]=l;replot()}
 let hitYmin=h=>{let[o,y]=prmt("ymin",h.s),a=Axes[single?0:h.pi],l={Xmin:a.xmin,Xmax:a.xmax,Ymin:a.ymin,Ymax:a.ymax};if(!o)return;[l.Ymin,l.Ymax]=asc(y,l.Ymax);usrlimits[h.pi]=l;replot()}
 let hitYmax=h=>{let[o,y]=prmt("ymax",h.s),a=Axes[single?0:h.pi],l={Xmin:a.xmin,Xmax:a.xmax,Ymin:a.ymin,Ymax:a.ymax};if(!o)return;[l.Ymin,l.Ymax]=asc(l.Ymin,y);usrlimits[h.pi]=l;replot()}
 
 
 let textalign=a=>{c.textAlign="185".includes(a)?"center":"234".includes(a)?"right":"left";c.textBaseline="012".includes(a)?"bottom":"378".includes(a)?"middle":"top"}
 let text=(x,y,s,a,f2,w)=>{if(!s)return;textalign(a);c.font=f2?font2:font1;let m=c.measureText(s,x,y),b={l:x-m.actualBoundingBoxLeft-2,r:x+m.actualBoundingBoxRight+2,t:y-m.actualBoundingBoxAscent-2,b:y+m.actualBoundingBoxDescent+2};if(w){let cl=c.fillStyle;c.fillStyle="white";c.fillRect(b.l+1,b.t+1,b.r-b.l-2,b.b-b.t-2);c.fillStyle=cl};c.fillText(s,x,y);return b}
 let vtext=(x,y,s)=>{if(!s)return;c.save();c.translate(x,y);c.rotate(270*pi_);textalign(1);c.fillText(s,0,0);c.restore()}
 let black=_=>{c.strokeStyle="black";c.fillStyle="black";c.lineWidth=1}
 let line=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke()},strokeCircle=(x,y,r)=>{c.beginPath();c.arc(x,y,r,0,2*pi);c.stroke()},fillCircle=(x,y,r,cl)=>{c.beginPath();c.arc(x,y,r,0,2*pi);linefill(cl)}
 let arrow=(x,y,lw,cl)=>{let x0=x[0],x1=x[1],y0=y[0],y1=y[1],dx=x0-x1,dy=y0-y1,p=atan2(dy,dx),p1=p+0.25,p2=p-0.25,l=8*lw;c.beginPath();console.log("cl",cl);linefill(cl);c.moveTo(x1,y1);c.lineTo(x1+l*cos(p1),y1+l*sin(p1));c.lineTo(x1+l*cos(p2),y1+l*sin(p2));c.closePath();c.fill()}
 let drawTitle=(a,t,yo)=>{if(!t)return;let b=text(a.x+a.w/2,a.y-ticLength-3-(yo?yo:0),t,1,0);hitbox(hitTitle,b,a.pi,t)}
 let drawXYTics=(a,xp,yp,xl,yl)=>{let l=ticLength;line(a.x,a.y-l,a.x+a.w,a.y-l);line(a.x,a.y+a.h+l,a.x+a.w,a.y+a.h+l);line(a.x-l,a.y,a.x-l,a.y+a.h);line(a.x+a.w+l,a.y,a.x+a.w+l,a.y+a.h);htics(a,yp,yl,a.x-l,a.x);htics(a,yp,[],a.x+a.w,a.x+a.w+l);vtics(a,xp,[],a.y-l,a.y);vtics(a,xp,xl,a.y+a.h,a.y+a.h+l)}
 let htics=(a,Y,L,x1,x2)=>{Y.forEach((y,i)=>{y=round(scale(y,a.ymax,a.ymin,a.y,a.y+a.h));line(x1,y,x2,y);if(L.length){let b=text(x1-3,y+1,L[i],3,1);(!i)?hitbox(hitYmin,b,a.pi,L[i]):i==Y.length-1?hitbox(hitYmax,b,a.pi,L[i]):0 /*,i==0?editlimit(Ymin):i==Y.length-1?editlimit(Ymax)*/}})} //todo store callback areas
 let vtics=(a,X,L,y1,y2)=>{X.forEach((x,i)=>{x=round(scale(x,a.xmin,a.xmax,a.x,a.x+a.w));line(x,y1,x,y2);if(L.length){let b=text(x,  y2+2,L[i],5,1);(!i)?hitbox(hitXmin,b,a.pi,L[i]):i==X.length-1?hitbox(hitXmax,b,a.pi,L[i]):0 /*,i==0?editlimit(Xmin):i==X.length-1?editlimit(Xmax)*/}})} //todo store callback areas
 let drawXlabel=(a,l,u)=>text(a.x+round(a.w/2),a.y+a.h+ticLength+ticLabelHeight,(l+" "+u).trim(),5,0)
 let drawYlabel=(a,l,u,ylw)=>vtext(a.x-2*ticLength-ylw,a.y+round(a.h/2),(l+" "+u).trim())
 let drawPolar=(a,rt,unit)=>{let r=floor(a.w/2),cx=a.x+r,cy=a.y+r,xo=(a.xmax+a.xmin)/2,yo=(a.ymin+a.ymax)/2,o=(xo||yo)?1:0,r1=r+ticLength/2,r2=r-ticLength/2,r3=r+2*ticLength,al=[1,0,0,7,6,6,5,4,4,3,2,2],cs=cos(40*pi_),sn=sin(40*pi_);
  line(cx+r*cs,cy+r*sn,cx+r3*cs,cy+r3*sn);hitbox(hitPolimit,text(cx+r3*cs,cy+r3*sn,shortnum(a.ymax),6,0),a.pi,String(a.ymax));if(o)hitbox(hitPoloffs,text(cx+r3*cs,cy+r3*sn+o*fh1,"-"+sz(xo,yo),6),a.pi,"");text(cx+r3*cs,cy+r3*sn+(1+o)*fh1,""+unit,6);
  Array(12).fill(0).map((_,i)=>30*i).forEach((p,i)=>{let cs=cos(p*pi_),sn=sin(p*pi_);line(cx+r1*cs,cy+r1*sn,cx+r2*cs,cy+r2*sn);text(cx+r1*cs,cy+r1*sn+1,((90+p)%360)+"",al[(3+i)%12],1)});
  rt.map(R=>strokeCircle(cx,cy,R/a.ymax*r));line(cx-r,cy,cx+r,cy)+line(cx,cy-r,cx,cy+r);c.lineWidth=2;strokeCircle(cx,cy,r)}

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
 
 let Axes,rects,hits,grid=(n,c, g)=>{g={n:n};c=c<0?(g.colmajor=1,-c):(!c)?((n<13)?[4,4,4,4,4,3,3,4,4,5,5,4,4][n]:5):c;g.r=1;g.c=(n<c?n:(g.r=0|n/c,c));g.r=(g.r*g.c<n)?1+g.r:g.r;g.w=w/g.c;g.h=h/g.r;g.width=w;return g}
 let xyi=(g,n, i,k,x,y,m)=>{x=0;i=0|n/g.c;k=n%g.c;if(g.colmajor){k=0|n/g.r;i=n%g.r};if(i==(0|(g.n-1)/g.c)){m=1+((g.n-1)%g.c);x=(g.width-m*g.w)/2}x+=k*g.w;y=i*g.h;return[x,y]}
 let P={"":empty,"xy":xy,"raster":xy,"polar":polar,"ring":ring,"ampang":ampang,"foto":foto,"text":textplot}
 let plots=p=>{let g=grid(p.length,cols);c.reset();c.fillStyle="white";c.fillRect(0,0,w,h);rects=[];Axes=[];hits=[];check(p);limits(p);labels(p);p.forEach((p,i)=>{let[x,y]=xyi(g,i),pi=i+(single?single-1:0);rects.push({i:pi,x:x,y:y,w:g.w,h:g.h});c.save();c.translate(x+0.5,y+0.5);P[p.Type](p,pi,g.w,g.h);c.restore()})}
 
 let replot=_=>{w=cnv.width;h=cnv.height;plots(single?[p[single-1]]:p)},reset=_=>(single=0,noanno(),reslimits(),replot())
 replot();if(stati)return;
 
 //draggable corner: canvas parent: div with overflow:hidden; display:block; cnv:display:inline-block;
 let debounce=f=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>{f.apply(this,a)},100)}},deferplot=debounce(replot)
 let rsz=_=>{let bb=pa.getBoundingClientRect();if(bb.width==cnv.width&&bb.height==cnv.height)return;cnv.width=bb.width;cnv.height=bb.height;deferplot()}
 let ro,pa;if(resize){pa=cnv.parentElement;ro=new ResizeObserver(rsz);ro.observe(pa);}
 
 // double-click:        search closest point, mark line (thick, bring to top), select caption row, show slider, mark point, show coords legend
 // select caption rows: mark line(s)
 // caption doubleclick: mark line and show first point
 // dblclick-title:      toggle highlight single axes
 // menu-reset:          reset limits
 // draw-rect:           show rectange (xy/amp/ang snap to hor/ver), set limits on mouseup, replot
 // draw-rect+shift|ctrl|alt:     measure hor/ver, polar: draw vector
 let x0=0,y0=0,curect,curax,drawing=0,bg,pan,mea,menu;
 let copypng=e=>{cnv.toBlob(b=>navigator.clipboard.write([new ClipboardItem({"image/png":b})]).then(r=>r))}
 let noanno=_=>{p.forEach(p=>{for(let i=0;i<p.Lines.length;i++)if(p.Lines[i].anno){p.Lines.length=i;break}})}
 let cursor=x=>cnv.style.cursor=x=="pan"?"grabbing":x=="zoom"?"crosshair":""
 let gethit=(x,y)=>{for(let h of hits)if(x>=h.l&&x<=h.r&&y>=h.t&&y<=h.b)return h;return 0}
 let dblclick=e=>{pd(e);let[x,y]=exy(e),h=gethit(x,y);if(!h)return console.log("todo find nearest point");h.f(h)};cnv.addEventListener("dblclick",dblclick)
 let exy=e=>[e.offsetX,e.offsetY],findrect=(x,y)=>{if(single)return 0;for(let r of rects)if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h)return r.i;return -1},findaxes=ri=>{if(single)return Axes.length?Axes[0]:0;for(let a of Axes)if(a.pi==ri)return a;return 0}
 let posnap=(x0,x1,y0,y1)=>{let dx=abs(x1-x0),dy=abs(y1-y0),cx=(x0+x1)/2,cy=(y0+y1)/2,r=max(dx,dy)/2;if(hypot(cx,cy)<0.1*r){cx=0;cy=0};return[cx-r,cx+r,cy-r,cy+r]}
 let drawsta=e=>{pan=e.altKey;mea=e.shiftKey||e.ctrlKey;let ri=findrect(x0,y0),a=findaxes(ri);if(ri<0||!a)return;curax=a;drawing=1;curect=rects[ri];bg=c.getImageData(0,0,w,h);cursor(pan?"pan":mea?"mea":"zoom");c.lineWidth=1;c.setLineDash(pan?[5,5]:[]);c.strokeStyle=pan||mea?"black":"red";}
 let drawend=e=>{let[x,y]=exy(e),a=curax,pi=a.pi,rx=curect.x,ry=curect.y,xy=a.xy,po=xy=="po",am=xy=="am",dx=abs(x0-x),dy=abs(y0-y);if(!(pan||mea)){[x0,x]=asc(x0,x);[y,y0]=asc(y,y0);}
  [x0,y0]=axcoords(a,x0-rx,y0-ry);[x,y]=axcoords(a,x-rx,y-ry);
  if(pan){ [x0,x,y0,y]=po?[x0,x,y0,y]:dx>dy?[x0,x,y0,y0]:[x0,x0,y0,y]; dx=x-x0;dy=y-y0;             usrlimits[pi]={Xmin:a.xmin-dx,Xmax:a.xmax-dx,Ymin:a.ymin-dy,Ymax:a.ymax-dy} }
  else if(mea){let l={Id:-1,anno:1,Style:{Line:{Width:2,Color:0,Arrow:+po}}};po?(l.C=[y0,x0,y,x],l.Label=sz(x-x0,y-y0)):dx>dy?(l.X=asc(x0,x),l.Y=[y0,y0],l.Label=shortnum(abs(x0-x))):(l.X=[x0,x0],l.Y=asc(y0,y),l.Label=shortnum(abs(y0,y)));if(!po)l.Style.Line.EndMarks=5;console.log("am",am,xy);if(am){l.C=[l.Y[0],0,l.Y[1],0]; delete l.Y};p[pi].Lines.push(l) } //Lines
  else{[x0,x,y0,y]=po?[x0,x,y0,y]=posnap(x0,x,y0,y):dx>dy?[x0,x,a.ymin,a.ymax]:[a.xmin,a.xmax,y0,y];usrlimits[pi]={Xmin:x0,Xmax:x,Ymin:y0,Ymax:y}};
  x0=0;y0=0;pan=0;mea=0;cursor("zoom");replot()}
 let drawovr=(x,y)=>{let dx=abs(x-x0),dy=abs(y-y0),xy=curax.xy,po=xy=="po";c.putImageData(bg,0,0);c.save();c.beginPath();c.rect(curect.x,curect.y,curect.w,curect.h);c.clip();
  if(pan||mea){ if(po)line(x0,y0,x,y);else if(dx>dy)line(x0,y0,x,y0);else line(x0,y0,x0,y) }
  else{ if(po)c.strokeRect(min(x0,x),min(y0,y),dx,dy);else if(dx>dy){line(x0,0,x0,h);line(x,0,x,h)}else{line(0,y0,w,y0);line(0,y,w,y)} }  ;c.restore()}
 let mousedown=e=>{let[x,y]=exy(e);if(gethit(x,y))return;[x0,y0]=[x,y];};cnv.addEventListener("mousedown",mousedown)
 let mousemove=e=>{if(menu)menu.remove();if(!(x0||y0)){cursor(gethit(...exy(e))?"":"zoom");return};let[x1,y1]=exy(e),dx=abs(x1-x0),dy=abs(y1-y0);if(dx+dy<4)return;if(!drawing)drawsta(e);if(drawing)drawovr(x1,y1)};cnv.addEventListener("mousemove",mousemove)
 let mouseup=e=>mouseout(e);cnv.addEventListener("mouseup",mouseup)
 let mouseout=e=>{if(drawing)drawend(e);drawing=0;x0=0;y0=0;};cnv.addEventListener("mouseout",mouseout);
 let zoomat=(a,x,y,out)=>{let z=out?2:0.5,l={Xmin:a.xmin,Xmax:a.xmax,Ymin:a.ymin,Ymax:a.ymax},f=(x,mi,ma, d,c)=>(d=ma-mi,c=(x-mi)/d,mi=x-z*c*d,[mi,mi+z*d]),po=a.xy=="po",xonly=y<a.ymin||a.ymax;if(po||xonly)[l.Xmin,l.Xmax]=f(x,l.Xmin,l.Xmax);if(po||!xonly)[l.Ymin,l.Ymax]=f(y,l.Ymin,l.Ymax);if(po)[l.Xmin,l.Xmax,l.Ymin,l.Ymax]=posnap(l.Xmin,l.Xmax,l.Ymin,l.Ymax);usrlimits[single?0:a.pi]=l;replot()}
 let wheel=e=>{if(!(e.shiftKey||e.ctrlKey))return;pd(e);let[x,y]=exy(e),ri=findrect(x,y),r=rects[ri],a=findaxes(ri);if(ri<0||!a)return;[x,y]=axcoords(a,x-r.x,y-r.y);zoomat(a,x,y,e.deltaY>0)};cnv.addEventListener("wheel",wheel);
 let contextmenu=e=>{pd(e);if(menu)menu.remove();let x=e.clientX+window.scrollX,y=e.clientY+window.scrollY,s=ce("select"),opt=(t,f)=>{let o=tc(t,ce("option"));o.onclick=e=>{s.remove();f()};ac(s,o)};opt("reset",reset);opt("copy png",copypng);s.size=s.childElementCount;s.style.cssText=`position:absolute;top:${y-5}px;left:${x-5}px;background=#ffe;border:1px solid;z-index:99;padding:0px;outline:none;overflow:hidden;font-family:monospace`;ac(document.body,s);s.value="";menu=s};cnv.addEventListener("contextmenu",contextmenu);
 cursor("zoom");
}
