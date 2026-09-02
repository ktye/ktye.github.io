let plot=(p,caption,cnv,sld,det,txt,cap,...a)=>{
 let ctx=cnv.getContext("2d"),id=cnv.id,w=cnv.width,h=cnv.height,cols=0,single=0;
 let min=Math.min,max=Math.max,exp=Math.exp,log=Math.log,abs=Math.abs,sqrt=Math.sqrt,hypot=Math.hypot,sin=Math.sin,cos=Math.cos,atan2=Math.atan2,floor=Math.floor,ceil=Math.ceil,round=Math.round;const pi=Math.PI
 let font1="12px monospace",font2="10px monospace";for(let i=0;i<a;i++){let x=a[i];x=="font1"?(font1=a[++i]):x=="font2"?(font2=a[++i]):x=="cols"?(cols=a[++i]):0}
 let fontheight=f=>{ctx.font=f;let m=ctx.measureText("AQ");return m.fontBoundingBoxAscent+m.fontBoundingBoxDescent},textwidth=t=>ctx.measureText(t).width
 let fh1=fontheight(font1),fh2=fontheight(font2)
 let titleHeight=t=>t?2+ceil(fh1):2,xlabelHeight=l=>2+(l.length?fh1:0),ylabelWidth=2+ceil(fh2)/*rotated*/,ticLabelWidth=yl=>(ctx.font=font2,max(...yl.map(textwidth))),ticLabelHeight=2+fh2,rightXYWidth=l=>7+textwidth(l)
 let colors=p.length?(p[0]?.Style?.Order?p[0].Style.Order.split(","):[]):[];colors=(colors.length?colors:"#003FFF,#03ED3A,#E8000B,#8A2BE2,#FFC400,#00D7FF".split(","));
 let ncolors=colors.length;
 
 let empty=(p,pi,w,h)=>{};
 let xy=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:"")
  let vfix=2*border+2*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit);
  let hs=w-hfix,vs=h-vfix,x0=0,y0=0;if(vs>2*hs){y0=floor((vs-2*hs)/2);vs=2*hs;};
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  if(p.Square){let d=hs-vs;d>0?(x0+=d/2):(y0-=d/2);vs=hs=floor(min(hs,vs))}
  let ax=axes(pi,"xy",x0,y0,hs,vs,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  drawLines(ax,p,xyxy,"xy");drawXYTics(ax,xt.Pos,yt.Pos,xt.Labels,yt.Labels);drawTitle(ax,p.Title);drawXlabel(ax,p.Xlabel,p.Xunit);drawYlabel(ax,p.Ylabel,p.Yunit,ylw)}
 let polar=(p,pi,w,h)=>{let rt=nicetics(0,p.Limits.Ymax),ylw=ticLabelWidth(["270"]),hfix=2*border+2*ylw,vfix=2*border+titleHeight(p.Title)+2*ticLabelHeight
  let hs=w-hfix,vs=h-vfix,d=hs<0&&vs<0?0:hs<vs?hs:vs;d-=1-(1&d);if(d<0)return;
  let x0=floor((w-hfix-d)/2),y0=floor((h-vfix-d)/2),ax=axes(pi,"po",x0+ylw+border,y0+titleHeight(p.Title)+ticLabelHeight+border,d,d,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax);
  drawPolar(ax,rt.Pos,p.Yunit);drawTitle(ax,p.Title,ticLabelHeight-ticLength);drawLines(ax,p,xypolar,"po")}
 let ring=(p,pi,w,h)=>{}
 let ampang=(p,pi,w,h)=>{let xt=nicetics(p.Limits.Xmin,p.Limits.Xmax),yt=nicetics(p.Limits.Ymin,p.Limits.Ymax),ylw=ticLabelWidth(yt.Labels);
  let hfix=2*border+3*ticLength+ylabelWidth+ylw+rightXYWidth(xt.Labels.length?xt.Labels[xt.Labels.length-1]:""),vfix=2*border+4*ticLength+titleHeight(p.Title)+ticLabelHeight+xlabelHeight(p.Xlabel+p.Xunit)
  let x0=0,y0=0,hs=w-hfix,vs=h-vfix,aw=hs,h1=ceil(2*vs/3),h2=vs-h1;
  x0+=ylabelWidth+ylw+2*ticLength+border;y0+=titleHeight(p.Title)+ticLength+border;
  let amp=axes(pi,"am",x0,y0,hs,h1,p.Limits.Xmin,p.Limits.Xmax,p.Limits.Ymin,p.Limits.Ymax)
  let ang=axes(pi,"an",x0,y0+h1+2*ticLength,hs,h2,p.Limits.Xmin,p.Limits.Xmax,-180,180),angs="-180 -90 0 90 180".split(" ")
  drawLines(amp,p,xyamp,"am");drawLines(ang,p,xyang,"an");drawXYTics(amp,xt.Pos,yt.Pos,[],yt.Labels);drawXYTics(ang,xt.Pos,angs.map(Number),xt.Labels,angs);drawTitle(amp,p.Title);drawXlabel(ang,p.Xlabel,p.Xunit);drawYlabel(amp,p.Ylabel,p.Yunit,ylw)}
 let foto=(p,w,h)=>{}
 let textplot=(p,w,h)=>{}
 
 let grid=(n,c, g)=>{g={n:n};c<0?(g.colmajor=1,-c):(!c)?c=((n<13)?[4,4,4,4,4,3,3,4,4,5,5,4,4][n]:5):0;g.r=1;g.c=(n<c?n:(g.r=0|n/c,c));g.r=(g.r*g.c<n)?1+g.r:g.r;g.w=w/g.c;g.h=h/g.r;g.width=w;return g}
 let xyi=(g,n, i,k,x,y,m)=>{x=0;i=0|n/g.c;k=n%g.c;if(g.colmajor)[i,k]=[k,i];if(i==0|(g.n-1)/g.c){m=1+((g.n-1)%g.c);x=(g.width-m*g.w)/2}x+=k*g.w;y=i*g.h;return[x,y]}
 let P={"":empty,"xy":xy,"raster":xy,"polar":polar,"ring":ring,"ampang":ampang,"foto":foto,"text":textplot}
 let plots=p=>{let g=grid(p.length,c);limits(p);p.forEach((p,i))=>{let[x,y]=xyi(g,i),pi=i+(single?single-1:0);ctx.save();ctx.translate(x+0.5,y+0.5);P[p.Type](p,pi,g.w,g.h);ctx.restore()}}
 
 plots(single?[p[single-1]]:p)
 
 cnv.addEventListener('dblclick',e=>console.log("dblickclick "+id))
}