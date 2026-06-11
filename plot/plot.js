/* svgplot(x)
   svgplot(x,y)            ampang if (#y)=2*#x
   svgplot(x,y,x,y,..)
   svgplot(z,z,z,"polar")  no x if polar
   svgplot(..,"xy|polar|ampang|ring|foto|text")
   svgplot({Type:"polar",Lines:[..]},{Type:..})
   svgplot([{Type:..},{Type:..}])
   svgplot(..,"width",800,"height",400,"cols",2) */

let min=Math.min,max=Math.max,exp=Math.exp,log=Math.log,abs=Math.abs,sqrt=Math.sqrt,hypot=Math.hypot,sin=Math.sin,cos=Math.cos,atan2=Math.atan2,floor=Math.floor,ceil=Math.ceil,round=Math.round;const pi=Math.PI
let scale=(x,x0,x1,y0,y1)=>y0+(x-x0)*(y1-y0)/(x1-x0)

let FA=x=>new Float64Array(x),JS=JSON.stringify
let Abs=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=hypot(x[2*i],x[2*i+1]);return r}
let ReIm=(x,o)=>{let r=FA(x.length/2),i=-1;for(;o<x.length;o+=2)r[++i]=x[o];return r},Real=x=>ReIm(x,0),Imag=x=>ReIm(x,1)
let Ang=x=>{let r=FA(x.length/2);for(let i=0;i<r.length;i++)r[i]=atan2(x[2*i+1],x[2*i])*180/Math.PI;return r}//-180,180
let shortnum=x=>{let s=String(x),t=x.toPrecision(4).replace("e+","e"),g=String(Number(t)),a=[s,t,g];a.sort((x,y)=>x.length-y.length);return a[0]}
let iota=n=>{let r=Array(n);for(let i=0;i<n;i++)r[i]=i;return r}
let Sum=x=>{let a=0,b=0,n=x.length>>1;for(let i=0;i<x.length;i+=2){a+=x[i];b+=x[1+i]};return[a,b]},sum=x=>{let r=0,i;for(i=0;i<x.length;i++)r+=x[i];return r}
let Mean=u=>{let re=0,im=0,n=u.length/2;for(let i=0;i<u.length;i+=2){re+=u[i];im+=u[1+i]};return[re/n,im/n]},mean=x=>{let s=0,n=x.length,i;for(i=0;i<n;i++)s+=x[i];return s/n}

let svgplot=(...a)=>{ //plots
 let p=[],d=[],w=800,h=600,c=0,ncolors,t="xy",fontratio=0.5455/*roughly font tahoma numbers*/
 let font1=16,font2=12,border=1,ticLength=6,single=0
 if(Array.isArray(a[0])&&a[0][0].Type){single=a[0].single,a=[...a[0],...a.slice(1)]};  //plot([{Type:..},{Type:..}],"width",..) => plot({Type:..},{Type:..},"width",..)
 for(let i=0;i<a.length;i++){let x=a[i];x.constructor==Float64Array?d.push(x):Array.isArray(x)?d.push(FA(x)):x.Type?p.push(x):"width"==x?w=a[++i]:"height"==x?h=a[++i]:"cols"==x?c=a[++i]:"font1"==x?font1=a[++i]:"font2"==x?font1=a[++i]:"string"==typeof x?t=a[++i]:0}
 let titleHeight=t=>t?2+Math.ceil(font1):2,xlabelHeight=l=>2+(l.length?font1:0),ylabelWidth=2+Math.ceil(font2)/*h for rotated y-axis*/,ticLabelWidth=yl=>max(...yl.map(x=>ceil(fontratio*font2*x.length))),ticLabelHeight=2+font2,rightXYWidth=l=>ceil(7+font2*fontratio*l.length/2)
 if(1==d.length)d.splice(0,0,FA(d[0].length).map((_,i)=>i))
 if(d.length){p={Lines:[]}
  if(t=="polar")d.forEach((z,i)=>p.Lines.push({Id:i,C:z}))
  else{for(let i=0;i<d.length;i+=2){let l={Id:i/2,x:d[i]};l[(d[1+i].length==2*d[i].length)?(t="ampang","C"):"Y"]=d[1+i];p.Lines.push(l)}}
  p.Type=t;p=[p]}

 let err=x=>{throw new Error(x)}
 let mima=a=>{let mi=Infinity,ma=-Infinity;a.forEach(x=>x.forEach(x=>(mi=min(mi,isNaN(x)?mi:x),ma=max(ma,isNaN(x)?ma:x))));return[mi,ma]}

 let axscale=(a,X,Y)=>([X.map(x=>(x=scale(x,a.xmin,a.xmax,0,10000),x<-10000?-10000:x>20000?20000:round(x))),Y.map(y=>(y=scale(y,a.ymax,a.ymin,0,10000),y<-10000?-10000:y>20000?20000:round(y)))])
 let nicenum=(ext,rnd)=>{let e=floor(Math.log10(ext)),f=ext/(10**e),r;return(rnd?((f<1.5)?1:(f<3)?2:(f<7)?5:10):((f<=1)?1:(f<=2)?2:(f<=5)?5:10))*10**e}
 let nicelim=(x,y)=>{let e=nicenum(y-x,false),s=nicenum(e/4,true);return[s*floor(x/s),s*ceil(y/s),s]}
 let nicetics=(x,y)=>{let [p,_,s]=nicelim(x,y),r=[],i=0;while(p+i*s<=y){if(p+i*s>=x)r.push(p+i*s);i++};return{Pos:r,Labels:r.map(shortnum)}}   
 let autoscale=a=>nicelim(...mima(a)),autoscalr=a=>{let[x,y]=mima(a);return nicelim(0,y)}
 let polarlimits=(p,ring)=>{let l=p.Limits;if(ring)console.log("todo ring-limits");let y0,y1=l.Ymax;if(p.Limits.Ymax<=0)[y0,y1]=autoscalr(p.Lines.map(l=>Abs(l.C)));[l.Xmin,l.Xmax,l.Ymin,l.Ymax]=[-y1,y1,-y1,y1];return l}
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
 
 let text=(x,y,s,a,f2,extra)=>`<text x="${x}" y="${y-2+(f2?font2:font1)*([0,0,0,0.5,1,1,1,0.5,0.5][a])}" class="${(f2?'s ':'')+('185'.includes(a)?'a1':'234'.includes(a)?'a2':'')}" ${extra?extra:""} >${hs(s)}</text>`
 let vtext=(x,y,s)=>`<g transform="translate(${x} ${y}) rotate(270)"><text class="a1">${hs(s)}</text></g>`
 let line=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
 let drawTitle=(a,t,yo)=>t?text(a.x+a.w/2,a.y-ticLength-3-(yo?yo:0),t,1,0,"ondblclick='togglesingleplot(this)'"):""
 let drawXYTics=(a,xp,yp,xl,yl, l)=>(l=ticLength,line(a.x,a.y-l,a.x+a.w,a.y-l)+line(a.x,a.y+a.h+l,a.x+a.w,a.y+a.h+l)+line(a.x-l,a.y,a.x-l,a.y+a.h)+line(a.x+a.w+l,a.y,a.x+a.w+l,a.y+a.h) +htics(a,yp,yl,a.x-l,a.x)+htics(a,yp,[],a.x+a.w,a.x+a.w+l)+vtics(a,xp,[],a.y-l,a.y)+vtics(a,xp,xl,a.y+a.h,a.y+a.h+l))
 let htics=(a,Y,L,x1,x2)=>Y.map((y,i)=>(y=round(scale(y,a.ymax,a.ymin,a.y,a.y+a.h)),line(x1,y,x2,y)+(L.length?text(x1-3,y,L[i],3,1,i==0?`ondblclick="editlimit(this,'Ymin')"`:i==Y.length-1?`ondblclick="editlimit(this,'Ymax')"`:undefined):""))).join("")
 let vtics=(a,X,L,y1,y2)=>X.map((x,i)=>(x=round(scale(x,a.xmin,a.xmax,a.x,a.x+a.w)),line(x,y1,x,y2)+(L.length?text(x,y2+2,L[i],5,1,i==0?`ondblclick="editlimit(this,'Xmin')"`:i==X.length-1?`ondblclick="editlimit(this,'Xmax')"`:undefined):""))).join("")
 let drawXlabel=(a,l,u)=>text(a.x+round(a.w/2),a.y+a.h+ticLength+ticLabelHeight,(l+" "+u).trim(),5,0)
 let drawYlabel=(a,l,u,ylw)=>vtext(a.x-2*ticLength-ylw,a.y+round(a.h/2),(l+" "+u).trim())
 let drawPolar=(a,rt,unit, r,al)=>(r=floor(a.w/2),cx=a.x+r,cy=a.y+r,r1=r+ticLength/2,r2=r-ticLength/2,r3=r+2*ticLength,al=[1,0,0,7,6,6,5,4,4,3,2,2],p4=x=>x.toPrecision(4),
  cs=cos(40*pi/180),sn=sin(40*pi/180),scl=line(p4(cx+r*cs),p4(cy+r*sn),p4(cx+r3*cs),p4(cy+r3*sn))+text(p4(cx+r3*cs),p4(cy+r3*sn),shortnum(a.ymax),6,0,`ondblclick="editlimit(this,'Ymax')"`)+text(p4(cx+r3*cs),p4(cy+r3*sn+font1),""+unit,6),
  Array(12).fill(0).map((_,i)=>30*i).map((p,i)=>{let cs=cos(p*pi/180),sn=sin(p*pi/180);return line(p4(cx+r1*cs),p4(cy+r1*sn),p4(cx+r2*cs),p4(cy+r2*sn))+text(p4(cx+r1*cs),p4(cy+r1*sn),((90+p)%360)+"",al[(3+i)%12],1)}).join("")
  +rt.map(R=>`<circle cx="${cx}" cy="${cy}" r="${R/a.ymax*r}" stroke-width="1" stroke="black" fill="none"/>`).join("")+line(cx-r,cy,cx+r,cy)+line(cx,cy-r,cx,cy+r)+scl+`<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="2" stroke="black" fill="none"/>`)
 let linestyle=(p,l,i)=>{let lw=l?.Style?.Line?.Width?l.Style.Line.Width:0,ps=l?.Style?.Marker?.Size?l.Style.Marker.Size:0;[lw,ps]=(!(lw||ps))?(p.Type=="polar"?[0,3]:[2,0]):[lw,ps];return[lw,ps,l?.Style?.Color?l.Style.Color:l?.Id?l.Id:1+i]}
 let lineclass=(lw,c)=>`class="c${1+(c-1)%ncolors}"`+(2!=lw?`stroke-width="${lw}"`:""),linefill=c=>`class="C${1+(c-1)%ncolors} c${1+(c-1)%ncolors}" style="stroke-width:1"`
 let textmarker=xy=>`<rect x="0" y="0" width="0" height="0" fill="white" class="marker hidden ${xy}"/><text x="0" y="0" class="marker hidden ${xy}">TTT</text>`
 let marker=(rx,ry)=>`<ellipse cx="-10000" cy="-10000" rx="${6*rx}" ry="${6*ry}" fill="none" class="marker hidden"/>` //
 let zoompanel=a=>`<rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" data-pi="${a.pi}" data-xy="${a.xy}" data-xmin="${a.xmin}" data-xmax="${a.xmax}" data-ymin="${a.ymin}" data-ymax="${a.ymax}" fill="white" opacity="0" onmousedown="zoomdown(this,event)" onmousemove="zoommove(this,event)" onmouseleave="zoomleave(this,event)" onmouseup="zoomup(this,event)" ondblclick="clickpoint(this,event)" onwheel="zoomwheel(this,event)" />`
 let zoomrect=_=>`<rect x="0" y="0" width="0" height="0" fill="none" stroke="black" vector-effect="non-scaling-stroke" class="zoom"/>`
 let vector=t=>"po"!=t?"":`<line x1="0" y1="0" x2="0" y2="0" class="vector" marker-end="url(#arrow0)" style="display:none"/>`
 let drawLines=(a,p,f,t)=>`<g transform="translate(${a.x} ${a.y}) scale(${a.w/10000} ${a.h/10000})" data-xy=${t} data-xmin="${p.Limits.Xmin}" data-xmax="${p.Limits.Xmax}" data-ymin="${p.Limits.Ymin}" data-ymax="${p.Limits.Ymax}" clip-path="url(#A)" >`+(p.Lines[0]?.Style?.Marker?.Marker=="bar"?drawBars(a,p,f):p.Lines.map((l,i)=>drawLine(a,p,l,i,f,t)).join(""))+marker(10000/a.w,10000/a.h)+`</g>`+drawLabels(a,p,f,t)+textmarker(t)+vector(t)+zoomrect()+zoompanel(a)
 let scalepoint=(ps,w)=>round(10000*ps/w)
 let drawLine=(a,p,l,i,f,t)=>{let[lw,ps,c]=linestyle(p,l,i),r="",em="",[x,y]=axscale(a,...f(l));x=Array.from(x);
  if(t!="an"&&l?.Style?.Line?.EndMarks){let h=abs(x[0]-x[1])>abs(y[0]-y[1]),dx=h?0:300,dy=h?300:0;em=`M${x[0]-dx} ${y[0]-dy} L${x[0]+dx} ${y[0]+dy} M${x[1]-dx} ${y[1]-dy} L${x[1]+dx} ${y[1]+dy}`}
  if(lw>0&&x.length)r+=`<path d="`+ x.map((x,i)=>(isNaN(y[i])?"":(i==0||isNaN(y[i-1])?"M":"L")+x+" "+y[i])).join("")+(t!="xy"||l.Y?"":"Z")+em+`" data-id="${l?.Id?l.Id:-1}" ${l.Y||t!="xy"?lineclass(lw,c):linefill(c)} ${l?.Style?.Line?.Arrow?'marker-end="url(#arrow'+max(0,(1+(c-1)%ncolors))+')"':''}/>`
  if(ps)r+=`<g data-id="${'Id'in l?l.Id:-1}" class="C${1+(c-1)%ncolors} c${1+(c-1)%ncolors}">`+x.map((x,i)=>`<circle cx="${x}" cy="${y[i]}" r="${scalepoint(ps,a.w)}"/>`).join("")+`</g>`;return r}
 let drawBars=(a,p,f)=>{let r="",i,l,n=p.Lines.length,X0=[],X1=[],Y0=[],Y1=[],I=[]; //draw short bars last
  for(i=0;i<n;i++){l=p.Lines[i];let[x,y]=axscale(a,...f(l)),j;for(j=0;j<x.length;j+=2){X0.push(x[j]);X1.push(x[1+j]);Y0.push(y[j]);Y1.push(y[1+j]);I.push(l?.Id?l.Id:-1)}}
  let atx=(x,y)=>y.map(i=>x[i]),j=Array(X0.length).fill(0).map((_,i)=>i);j.sort((a,b)=>(a=Y1[a])<(b=Y1[b])?-1:a>b?1:0);X0=atx(X0,j);X1=atx(X1,j);Y0=atx(Y0,j);Y1=atx(Y1,j);I=atx(I,j);
  for(i=0;i<X0.length;i++)r+=`<rect x="${X0[i]}" y="${Y1[i]}" width="${X1[i]-X0[i]}" height="${Y0[i]-Y1[i]}" data-id="${I[i]}" class="C${I[i]}" ></rect>`;return r}
 let drawLabels=(a,p,f,t)=>p.Lines.map((l,i)=>drawLineLabels(a,p,l,i,f,t)).join("")
 let drawLineLabels=(a,p,l,i,f,t)=>{if("an"==t||!l.Label)return"";let X,Y,L=p.Limits,[x,y]=f(l),q=Math.atan2(y[1]-y[0],x[1]-x[0])*180/Math.PI,Q={a:[5,1],b:[6,2],c:[4,0],d:[7,3]};x=scale(X=0.5*(x[0]+x[1]),L.Xmin,L.Xmax,a.x,a.x+a.w);y=scale(Y=0.5*(y[0]+y[1]),L.Ymax,L.Ymin,a.y,a.y+a.h);q=(q<-170?"a":q<-100?"b":q<-80?"c":q<-10?"d":q<10?"a":q<80?"b":q<100?"c":q<170?"d":"a")
  let left=(X-L.Xmin)/(L.Xmax-L.Xmin)>0.6,down=(Y-L.Ymin)/(L.Ymax-L.Ymin)>0.8,[al,dx,dy]=q=="a"?(down?[5,0,10]:[1,0,-10]):q=="b"?(left?[2,-1,-1]:[6,3,1]):q=="c"?(left?[3,-5,0]:[7,5,0]):(left?[0,0,0]:[4,0,0]);return `<rect x="0" y="0" width="0" height="0" class="labelbg"/>`+text(x+dx,y+dy,l.Label,al,1,1)}
  
 let empty=(p,pi,w,h)=>""
 let xy=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:"")
  let vfix=2*border+2*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit);
  let hs=w-hfix,vs=h-vfix,x0=0,y0=0;if(vs>2*hs){y0=floor((vs-2*hs)/2);vs=2*hs;};
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  if(p.Square){let d=hs-vs;d>0?(x0+=d/2):(y0-=d/2);vs=hs=floor(min(hs,vs))}
  let ax=axes(pi,"xy",x0,y0,hs,vs,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  return drawLines(ax,p,xyxy,"xy")+drawXYTics(ax,xt.Pos,yt.Pos,xt.Labels,yt.Labels)+drawTitle(ax,p.Title)+drawXlabel(ax,p.Xlabel,p.Xunit)+drawYlabel(ax,p.Ylabel,p.Yunit,ylw)}
 let polar=(p,pi,w,h)=>{let rt=nicetics(0,p.Limits.Ymax),ylw=ticLabelWidth(["270"]);
  let hfix=2*border+2*ylw
  let vfix=2*border+titleHeight(p.Title)+2*ticLabelHeight
  let hs=w-hfix,vs=h-vfix,d=hs<0&&vs<0?0:hs<vs?hs:vs;d-=1-(1&d);if(d<0)return"";
  let x0=floor((w-hfix-d)/2),y0=floor((h-vfix-d)/2),ax=axes(pi,"po",x0+ylw+border,y0+titleHeight(p.Title)+ticLabelHeight+border,d,d,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  return drawPolar(ax,rt.Pos,p.Yunit)+drawTitle(ax,p.Title,ticLabelHeight-ticLength)+drawLines(ax,p,xypolar,"po")}
 let ring=(p,pi,w,h)=>""
 let ampang=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:"")
  let vfix=2*border+4*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit)
  let x0=0,y0=0,hs=w-hfix,vs=h-vfix;  //if(hs>1.5*vs){x0=floor(hs-(1.5*vs)/2);hs=ceil(1.5*vs)}else if(vs>2*hs){y0=floor(hs-(2*vs)/2);vs=2*hs}
  let aw=hs,h1=ceil(2*vs/3),h2=vs-h1;
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  let amp=axes(pi,"am",x0,y0,hs,h1,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax)
  let ang=axes(pi,"an",x0,y0+h1+2*ticLength,hs,h2,p.Limits.Xmin,p.Limits.Xmax,-180,180),angs="-180 -90 0 90 180".split(" ")
  return drawLines(amp,p,xyamp,"am")+drawLines(ang,p,xyang,"an")+drawXYTics(amp,xt.Pos,yt.Pos,[],yt.Labels)+drawXYTics(ang,xt.Pos,angs.map(Number),xt.Labels,angs)+drawTitle(amp,p.Title)+drawXlabel(ang,p.Xlabel,p.Xunit)+drawYlabel(amp,p.Ylabel,p.Yunit,ylw)
 }
 let foto=(p,w,h)=>""
 let textplot=(p,w,h)=>""
 let grid=(n,w,h,c, g)=>{g={n:n}
  c<0?(g.colmajor=1,-c):(!c)?c=((n<13)?[4,4,4,4,4,3,3,4,4,5,5,4,4][n]:5):0
  g.r=1;g.c=(n<c?n:(g.r=0|n/c,c));
  g.r=(g.r*g.c<n)?1+g.r:g.r;
  g.w=w/g.c;g.h=h/g.r;g.width=w;return g}
 let xyi=(g,n, i,k,x,y,m)=>{x=0;i=0|n/g.c;k=n%g.c;if(g.colmajor)[i,k]=[k,i]             //{n: 2, r: 1, c: 2, w: 600, h: 500}
  if(i==0|(g.n-1)/g.c){m=1+((g.n-1)%g.c);x=(g.width-m*g.w)/2}
  x+=k*g.w;y=i*g.h;return[x,y]}
 let plots=(p,w,h,c)=>{let colors=p.length?(p[0]?.Style?.Order?p[0].Style.Order.split(","):[]):[];colors=(colors.length?colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(","));ncolors=colors.length;
  limits(p);labels(p);let g=grid(p.length,w,h,c),r=`<style>text{font-family:Tahoma,sans-serif;font-size:${font1}px}.a1{text-anchor:middle}.a2{text-anchor:end}.s{font-size:${font2}px}.v{writing-mode:sideways-lr;font-size:${font1}px}
  ${colors.map((x,i)=>`.c${1+i}{stroke:${x}}`).join("")}${colors.map((x,i)=>`.C${1+i}{fill:${x}}`).join("")}
  .vector{vector-effect:non-scaling-stroke}
  .hiline{stroke-width:4;vector-effect:non-scaling-stroke}
  .hipoint{stroke-width:300}
  .hidden{display:none}
  .labelbg{fill:white}
  line{stroke:black}
  path{fill:none;stroke:black;stroke-width:2;vector-effect:non-scaling-stroke}
  </style>
  <defs>${["black",...colors].map((c,i)=>`<marker id="arrow${i}" markerWidth="10" markerHeight="5" refX="10" refY="2.5" orient="auto" fill="${c}"><polygon points="0 0,10 2.5,0 5"/></marker>`).join("\n")}</defs>
  <!--clipPath id="B"><rect width="${g.w}" height="${g.h}"/></clipPath-->
  <clipPath id="A"  clipPathUnits="userSpaceOnUse"><rect width="10000" height="10000"/></clipPath>`
  let P={"":empty,"xy":xy,"raster":xy,"polar":polar,"ring":ring,"ampang":ampang,"foto":foto,"text":textplot}
  plotlay_=g.r+"x"+g.c
  p.forEach((p,i, x,y)=>{[x,y]=xyi(g,i);let pi=i+(single?single-1:0);r+=`<g data-i="${pi}" transform="translate(${x+0.5},${y+0.5})" >`+((p.Type in P)?(P[p.Type](p,pi,g.w,g.h)):err("no such plot type:"+p.Type))+"</g>"});return r}
 return plots(single?[p[single-1]]:p,w,h,c)}
 

/*callbacks
  double-click:        search closest point, mark line (thick, bring to top), select caption row, show slider, mark point, show coords legend
  select caption rows: mark line(s)
  caption doubleclick: mark line and show first point
  dblclick-title:      toggle highlight single axes
  dblclick:            reset limits
  draw-rect:           show rectange (xy/amp/ang snap to hor/ver), set limits on mouseup, replot
  ***draw-rect+shift|ctrl|alt:     measure hor/ver, polar: draw vector
 */
let plotsvg_,plotsld_,plotcap_,plottab_,plotopts_,plot_,plotlay_
let replot=_=>{let r=plotsvg_.getBoundingClientRect();plotsvg_.innerHTML=svgplot(plot_,"width",r.width,"height",r.height,...plotopts_);setbackgrounds(plotsvg_);/*setlineclicks(plot_)*/;if(plotsld_)plotsld_.style.display="none"}
let capchange=c=>(unmark(),marklines(Array.from(c.selectedOptions).map(x=>x.dataset.id)))
let capdblclick=(e,id)=>(id=e.target.dataset.id,id?hiline(id,0):0)    //{let id=e.target.dataset.id;if(!id)return;let p=plotsvg_.querySelector(`[data-id="${id}"]`);if(p&&p.onclick)p.onclick({target:"path"==p.nodeName?p:p.firstChild/*circle*/})}

let zoomreset=e=>{e.preventDefault();e.stopPropagation();plot_.forEach(p=>p.Limits={});/*zoomclear(r);*/replot()}
let zoomcoords=(r,e)=>{let b=r.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top,w=b.width,h=b.height,xy=r.dataset.xy,xmin=+r.dataset.xmin,xmax=+r.dataset.xmax,ymin=+r.dataset.ymin,ymax=+r.dataset.ymax;
 let X=x=>scale(x,0,w,xmin,xmax),Y=y=>scale(y,0,h,"an"==xy?180:ymax,"an"==xy?-180:ymin),xx=scale(x,0,w,0,10000),yy=scale(y,0,h,0,10000);
 return[x+r.x.baseVal.value,y+r.y.baseVal.value,xx,yy,X(x),Y(y),r.parentElement.querySelector(".zoom"),r.parentElement.querySelector(".vector")]}    //px(rel to parent), axis 0..10000 and xmin/xmax..  //let M=r.getScreenCTM(),x=e.clientX,y=e.clientY,p=plotsvg_.createSVGPoint();p.x=x;p.y=y;p=p.matrixTransform(M.inverse());return[x,y/*p.x,p.y*/...]
let zoomwheel=(r,e)=>{let z=e.deltaY<0?0.5:2,xy=r.dataset.xy,i=+r.dataset.pi,xmin=+r.dataset.xmin,xmax=+r.dataset.xmax,ymin=+r.dataset.ymin,ymax=+r.dataset.ymax     
 let[,,,,x,y,zoom]=zoomcoords(r,e);if(xy=="po")[x,y]=[0,0];let f=(x,mi,ma)=>{let d=ma-mi,c=(x-mi)/d;mi=x-z*c*d;return[mi,mi+z*d]};[plot_[i].Limits.Xmin,plot_[i].Limits.Xmax]=f(x,xmin,xmax);if(xy!="an")[plot_[i].Limits.Ymin,plot_[i].Limits.Ymax]=f(y,ymin,ymax);  replot()}
let zoomdown=(r,e)=>{if(1!=e.buttons)return;let[x,y,,,X,Y,zoom,vect]=zoomcoords(r,e);r.dataset.snap="";r.dataset.zoomstate="0";r.dataset.x0=x;r.dataset.y0=y;r.dataset.X0=X;r.dataset.Y0=Y;  zoom.width.baseVal.value=0;zoom.height.baseVal.value=0;if(vect){vect.x1.baseVal.value=x;vect.y1.baseVal.value=y;vect.x2.baseVal.value=x;vect.y2.baseVal.value=y};pd(e)}
let zoommove=(r,e)=>{if(1!=e.buttons||!r.dataset.zoomstate)return; r.dataset.zoomstate="1";let[x1,y1,,,X,Y,zoom,vect]=zoomcoords(r,e),xy=r.dataset.xy,x0=r.dataset.x0,y0=r.dataset.y0,xx=x1,yy=y1,key=e.altKey||e.shiftKey||e.ctrlKey; r.dataset.X1=X,r.dataset.Y1=Y; (vect?vect:zoom).style.display="";  //x0=+zoom.dataset.x,y0=+zoom.dataset.y,newx=x1,newy=y1,
 r.dataset.d2=(x1-x0)*(x1-x0)+(y1-y0)*(y1-y0);if(vect){vect.x2.baseVal.value=x1;vect.y2.baseVal.value=y1;(key?zoom:vect).style.display="none"}
 [x0,x1]=x0>x1?[x1,x0]:[x0,x1]; [y0,y1]=y0>y1?[y1,y0]:[y0,y1];
 if(xy!="po"){let X0=r.x.baseVal.value,Y0=r.y.baseVal.value,W=r.width.baseVal.value,H=r.height.baseVal.value,snap=x1-x0>y1-y0?"x":"y";r.dataset.snap=snap;[x0,x1,y0,y1]=snap=="y"?[key?xx:X0,key?1+xx:X0+W,y0,y1]:[x0,x1,key?yy:Y0,key?1+yy:Y0+H]} //snap hor/ver full-rect or line
 zoom.x.baseVal.value=x0;zoom.y.baseVal.value=y0;zoom.width.baseVal.value=x1-x0;zoom.height.baseVal.value=y1-y0}
let zoomleave=(r,e)=>{if(1!=e.buttons||"1"!=r.dataset.zoomstate)return; 
 let[x,y,,,X,Y,zoom,vect]=zoomcoords(r,e),xmin=+r.dataset.xmin,xmax=+r.dataset.xmax,ymin=+r.dataset.ymin,ymax=+r.dataset.ymax,clamp=(x,a,b)=>x<a?a:x>b?b:x;
 r.dataset.X1=clamp(X,+r.dataset.xmin,+r.dataset.xmax);r.dataset.Y1=clamp(Y,+r.dataset.ymin,+r.dataset.ymax); return zoomup(r,e)}
let zoomup=(r,e)=>{
 if("1"==r.dataset.zoomstate){ if(17>+r.dataset.d2){zoomclear(r);return};
  let pi=r.dataset.pi,xy=r.dataset.xy,x0=+r.dataset.X0,y0=+r.dataset.Y0,x1=+r.dataset.X1,y1=+r.dataset.Y1,key=e.altKey||e.shiftKey||e.ctrlKey
  if(key&&"po"==xy){let dx=y1-y0,dy=x1-x0;[x0,y0]=[y0,x0]/*polar*/;let R=Math.hypot(dy,dx),a=(360+180/Math.PI*Math.atan2(dy,dx))%360,s=R.toPrecision(3)+"a"+a.toFixed(0); plot_[pi].Lines.push({Id:-1,C:[x0,y0,x0+dx,y0+dy],Label:s,Style:{Line:{Arrow:1,Width:2}}});zoomclear(r);replot();return}
  [x0,x1]=x0>x1?[x1,x0]:[x0,x1];[y0,y1]=y0>y1?[y1,y0]:[y0,y1];
  if(key){let xdir="x"==r.dataset.snap;[x0,x1,y0,y1]=xdir?[x0,x1,y1,y1]:[x1,x1,y0,y1];let cc=[y0,0,y1,0],em={Line:{EndMarks:1}};let d=(xdir?x1-x0:y1-y0),s=shortnum(d),R=60/d;if(xdir&&"s"==plot_[pi].Xunit)s+="s ("+(R>10000?shortnum(0.001*R)+"k":shortnum(R))+"rpm)";plot_[pi].Lines.push(xy=="xy"?{Id:-1,X:[xdir?x0:x1,x1],Y:[xdir?y1:y0,y1],Style:em,Label:s}:{Id:-1,X:[x0,x1],C:cc,Style:em,Label:s});zoomclear(r);replot();return}
  [x0,x1]=("y"==r.dataset.snap)?[+r.dataset.xmin,+r.dataset.xmax]:[x0,x1];[y0,y1]=("x"==r.dataset.snap)?[+r.dataset.ymin,+r.dataset.ymax]:[y0,y1];
  plot_[pi].Limits.Xmin=x0;plot_[pi].Limits.Xmax=x1;if(xy!="an"){plot_[pi].Limits.Ymin=y0;plot_[pi].Limits.Ymax=y1}; zoomclear(r); replot()  }}
let zoomclear=r=>{r.dataset.zoomstate="";let re=r.parentElement.querySelector(".zoom"),ln=r.parentElement.querySelector(".vector");if(re)re.style.display="none";if(ln)ln.style.display="none"}
let clickpoint=(r,e)=>{let[xc,yc,,,,]=zoomcoords(r,e),xy=r.dataset.xy,i=r.dataset.pi,pi=plot_[+i],xmin=+r.dataset.xmin,xmax=+r.dataset.xmax,ymin=+r.dataset.ymin,ymax=+r.dataset.ymax,xa=r.x.baseVal.value,ya=r.y.baseVal.value,w=r.width.baseVal.value,h=r.height.baseVal.value,far=17;
 let g=Array.from(plotsvg_.querySelectorAll(`[data-xy="${xy}"]`)).filter(x=>x.nodeName=="g"&&x.parentNode.dataset.i==i);if(g.length!=1)return;g=g[0];
 let a=Array.from(g.childNodes).filter(x=>"id"in x.dataset&&(+x.dataset.id)>=0),ids=a.map(x=>x.dataset.id).toReversed(),sc=(X,Y)=>([X.map(x=>scale(x,xmin,xmax,xa,xa+w)),Y.map(y=>scale(y,ymin,ymax,ya+h,ya))]);
 for(id of ids){let l=pi.Lines.find(l=>l.Id==id);if(!l)continue;let[xx,yy]=xy=="po"?[Imag(l.C),Real(l.C)]:"am"?[l.X,Abs(l.C)]:"an"?[l.X,Ang(l.C)]:[l.X,l.Y];if(xx){let[X,Y]=sc(xx,yy);for(let i in X){let x=X[i],y=Y[i],d=(x-xc)*(x-xc)+(y-yc)*(y-yc); if(d<far){hiline(id,i);hirow(id);return}}}}} 
let editlimit=(t,xy)=>{let r=prompt(`new ${xy} value:`,t.textContent);let v=parseFloat(r),i=+t.parentNode.dataset.i;if(r===null)return;if(!isNaN(v)){plot_[i].Limits[xy]=v}else{plot_[i].Limits={}}; replot()}


let hirow=id=>{if(plotcap_){Array.from(plotcap_.options).forEach(x=>x.selected=false);Array.from(plotcap_.querySelectorAll(`[data-id="${id}"]`)).forEach(x=>x.selected=true)}}
let unmark=_=>{plotsld_.style.display="none";setcapheight();Array.from(plotsvg_.querySelectorAll(".marker")).forEach(x=>x.classList.add("hidden"))}
let marklines=ids=>{Array.from(plotsvg_.querySelectorAll("path")).forEach(x=>x.classList.remove("hiline"));Array.from(plotsvg_.querySelectorAll("g")).forEach(x=>x.classList.remove("hipoint"));ids.forEach(x=>hiline(x))}
let hiline=(id,pt)=>{id=String(id); //highlight line by id (and mark point if not undefined)
 let p=Array.from(plotsvg_.querySelectorAll("path")).filter(p=>p.dataset?.id===id);p.forEach(x=>{x.classList.add("hiline" );x.parentNode.appendChild(x)}) //paint last
 let g=Array.from(plotsvg_.querySelectorAll("g"   )).filter(p=>p.dataset?.id===id);g.forEach(x=>{x.classList.add("hipoint");x.parentNode.appendChild(x)})
 let slider=(i,n)=>{let s=plotsld_;if(!s)return;s.style.display="";s.min=0;s.max=n-1;s.step=1;s.value=i; s.onchange=e=>hiline(id,+e.target.value);setcapheight();}
 let markcircle=(g,i)=>{let a=af(g.childNodes);g.parentNode.appendChild(g); if(a.length>i)a[i].classList.add("hipoint")
    let g1=g.parentNode,g0=g1.parentNode,pi=g0.dataset.i,m1=g1.transform.baseVal.getItem(0).matrix,x0=m1.e,y0=m1.f,r=+g1.dataset.ymax,w=g1.getBoundingClientRect().width,li=Number(id);
    let l=plot_[pi].Lines.filter(l=>l.Id==li);if(l.length>0){l=l[0]; if(l.C.length>2*i){ let rpm=l.X&&l.X.length>i?l.X[i]:NaN,x=l.C[2*i],y=l.C[2*i+1],ang=(360+180/Math.PI*Math.atan2(y,x))%360,s=(rpm>1000?(rpm/1000).toFixed(0)+"kprm ":rpm?rpm.toFixed(0)+"rpm ":"")+Math.hypot(x,y).toPrecision(3)+"a"+ang.toFixed(0)
     let[al,dy]=Math.hypot(y,x)/r<0.5?["a1",0]:ang<20||ang>340?["a1",30]:ang<45?["a2",30]:ang<140?["a2",0]:ang<220?["a1",0]:["",0];
     let T=g0.querySelector("text.marker.po");T.removeAttribute("class");T.classList.add("marker","po","s","C"+(1+Number(id)));if(al)T.classList.add(al);T.setAttribute("x",scale(y,-r,r,x0,x0+w));T.setAttribute("y",-10+dy+scale(x,-r,r,y0+w,y0));T.textContent=s
     let R=g0.querySelector("rect.marker.po");R.removeAttribute("class");R.classList.add("marker","po");
     whiteTextRect(T,R);slider(i,l.C.length/2)}}}
 let marklinepoint=(t,i)=>{
  let g1=t.parentElement,m1=g1.transform.baseVal.getItem(0).matrix,s1=g1.transform.baseVal.getItem(1).matrix,xy=g1.dataset.xy,[xmin,xmax,ymin,ymax]=[g1.dataset.xmin,g1.dataset.xmax,"an"==xy?-180:g1.dataset.ymin,"an"==xy?180:g1.dataset.ymax].map(Number)
  let g0=g1.parentElement,pi=Number(g0.dataset.i);
  let sx=s1.a,sy=s1.d,x1=m1.e,y1=m1.f;
  let l=plot_[pi].Lines.filter(l=>l.Id==id);if(l.length>0){l=l[0];
     let sc=(X,Y)=>([X.map(x=>sx*(x=scale(x,xmin,xmax,0,10000),x<-10000?-10000:x>20000?20000:Math.round(x))),Y.map(y=>sy*(y=scale(y,ymax,ymin,0,10000),y<-10000?-10000:y>20000?20000:Math.round(y)))])
     let[xx,yy]=xy=="xy"?[l.X,l.Y]:xy=="am"?[l.X,Abs(l.C)]:xy=="an"?[l.X,Ang(l.C)]:[0,0];let[X,Y]=sc(xx,yy);if(i>=xx.length)return;
     let tt=[xx[i],yy[i]].map(x=>x.toPrecision(3)).join(", ");
     let m=g1.querySelector("ellipse");m.removeAttribute("class");m.classList.add("marker",t.classList[0].toUpperCase());
     let R=g0.querySelector("rect.marker."+xy);R.removeAttribute("class");R.classList.add("marker",xy);
     let T=g0.querySelector("text.marker."+xy);T.removeAttribute("class");T.classList.add("marker",xy,"s","a1",t.classList[0].toUpperCase());
     m.cx.baseVal.value=X[i]/sx;m.cy.baseVal.value=Y[i]/sy;m.parentNode.appendChild(m);
     T.setAttribute("x",X[i]+x1);T.setAttribute("y",Y[i]+y1<50?Y[i]+y1+25:Y[i]+y1-10);T.textContent=tt;
     let r=T.getBBox();R.setAttribute("x",r.x);R.setAttribute("y",r.y);R.setAttribute("width",r.width);R.setAttribute("height",r.height);slider(i,xx.length)}}
 unmark();Array.from(plotsvg_.querySelectorAll(".hipoint")).forEach(x=>x.classList.remove("hipoint"));
 if(pt!=undefined){p.forEach(p=>marklinepoint(p,pt));g.forEach(g=>markcircle(g,pt))}}
let togglesingleplot=t=>{plot_.single=plot_.single?0:1+(+t.parentNode.dataset.i);replot()}
let whiteTextRect=(t,r)=>{let re=t.getBBox();r.setAttribute("x",re.x);r.setAttribute("y",re.y);r.setAttribute("width",re.width);r.setAttribute("height",re.height)}
let setbackgrounds=svg=>{let a=Array.from(svg.querySelectorAll(".labelbg"));a.forEach(r=>whiteTextRect(r.nextElementSibling,r))  //calculate label backgrounds dynamically
 Array.from(svg.querySelectorAll("text")).filter(x=>x.ondblclick).forEach(x=>x.parentNode.appendChild(x))                        //bring clickable axis limits to front
 if(plotsld_)plotsld_.onwheel=e=>(e.target.value=Math.min(+e.target.max,Math.max(0,(+e.target.value)-Math.sign(e.deltaY))),e.target.onchange(e));
}
let setcapheight=_=>{} //overwrite to adjust height of select 


let plot=(p,c,svg,sld,det,txt,cap,...a)=>{ //svg(svg) sld(range-input) det(details) txt(pre) cap(select multiple)
 plotsvg_=svg;plotsld_=sld;plotcap_=cap;plotopts_=a,plot_=p;p.single=0 //psld pdet ptxt pcap
 let hs=t=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),ce=x=>document.createElement(x)
 let colors="#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(","),ncolors=colors.length
 let caption=c=>{if(c.text){if(txt)txt.textContent=c.text;if(det){det.open=1;det.style.display=""}}else{if(det){det.open=0;det.style.display="none"}}
  let fill=x=>{let n=Math.max(...x.map(x=>x.length)),f=x=>x+" ".repeat(n-x.length);return x.map(f)},tr=(x,i)=>(i=x.indexOf("\\"))<0?x:x.slice(0,i)
  let icol=n=>fill(["#","",...Array(n).fill(0).map((_,i)=>String(1+i))]) //todo custom numbers
  let q=Object.keys(c).filter(x=>x!="text"),t=q.map(x=>fill([tr(x),...c[x]]));t=[icol(t[0].length-2),...t];r=[]
  for(let i=0;i<t[0].length;i++)r.push(t.map(x=>x[i]).join("│"))
  let rowb="border-left:.5em solid black;padding-left:.2em;background:black;color:white;position:sticky;top:0"
  let roww="border-left:.5em solid white;padding-left:.2em"
  let rowi=i=>`border-left:.5em solid ${colors[i%colors.length]};padding-left:.2em`
  cap.innerHTML=r.map((s,i)=>`<option data-id="${i>1?i-2:''}" style="${1==i?roww:i?rowi(i-2):rowb}">${hs(s).replaceAll(" ","&nbsp;")}</option>`).join("\n")
  setcapheight()}
 let captiontab=c=>{let q=Object.keys(c).filter(x=>x!="text"),n=c[q[0]].length,r="",h="<th>#</th>"+q.map(x=>`<th>${hs(x)}</th>`).join("")
  for(let i=0;i<n;i++)r+=`<tr><td><span style="color:${i?colors[(i-1)%ncolors]:'black'}">${i?'&#8226; ':''}</span>${0==i?"":i-1}</td>`+q.map(x=>`<td>${hs(c[x][i])}</td>`).join("")+`</tr>`
  return`<html><body><table style="font-family:Consolas,monospace"><tr>${h}</tr>${r}</table></body></html>`};plottab_=c?captiontab(c):""
 
 let r=svg.getBoundingClientRect();
 svg.innerHTML=svgplot(p,"width",r.width,"height",r.height,...a);
 svg.setAttribute("viewBox",`0 0 ${r.width} ${r.height}`)
 setbackgrounds(svg);/*setlineclicks(p);*/if(sld)sld.style.display="none";if(c&&cap)caption(c);
}
