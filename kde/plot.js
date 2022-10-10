function plot(t,x){
 let cnv=ge("canv");cnv.width=repl.clientWidth;cnv.height=repl.clientHeight
 let c=cnv.getContext("2d")
 if(t=="polar")polarplot(x,c,cnv.width,cnv.height)
 else xyplot(x,c,cnv.width,cnv.height)
 cnv.style.zIndex=10
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
}
function xyplot(x,c,w,h){
 c.fillRect(0, 0, 100, 100);
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