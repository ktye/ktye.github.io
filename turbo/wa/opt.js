/*asm simplifier

 set .   tee .
 get .

 tee .   set .
 drp

 i .     j .
 joi

 i .     fold
 i .
 sli/adi/mli/*

 todo: - dont assign 0 at first set: (i 0;set x)->()  (i 0;tee x)->(i 0)
*/

/*
let opt=(a,A)=>{ //input flat array (nonformatted), A:ai module exports
 if(a<1)return a
 let C="eqi nei lti ltu gti gtu lei leu gei geu adi sui mui dvi dvu moi mou ani ori xoi sli sri sru rli rri" //all(i:ii)
 let r=[a[0]],j=0,k=1,o
 for(let i=1;i<a.length;i++){ let ai=a[i]

  o=r[j].slice(0,3)
  c=ai.slice(0,3)
  if("set"==o&&"get"==c&&(r[j].slice(3)==(s=ai.slice(3)))){
   r[j]="tee"+s; continue }
  
  if("tee"==o&&"drp"==c){ r[j]="set "+r[j].slice(4); continue }

  o=r[j].slice(0,2)
  if("i "==o&&"joi"==c){ r[j]="j "+r[j].slice(2); continue }

  if("i "==o&&"i "==r[j-1].slice(0,2)&&-1<(s=C.indexOf(ai))){
   s=A[C.slice(s,s+3)]( Number(r[j-1].slice(2)), Number(r[j].slice(2)) )
   r[j-1]="i "+s;r.pop();j--;continue;}

  r[++j]=ai}
 return r}
*/

let opt=a=>{ //format
 let s=""
 for(let i=0;i<a.length;i++){let b=a[i]
  if(b.includes(":")){s="";continue}
   if(b.startsWith("else")||b.startsWith("do")||b.startsWith("end"))s=s.slice(1)
   a[i]=s+b
   if(b.startsWith("else")||b.startsWith("if")||b.startsWith("while")||b.startsWith("do"))s+=" "
 }
 return a
}
