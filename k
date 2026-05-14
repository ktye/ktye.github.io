Ki(K:i){i|32\2} Kf(K:f){r:Ktn[1;3];Fr0:x;jr|32\-3} Kz(K:z){r:Ktn[1;4];Zr0:x;jr|32\-4}
Mal(p:i) Mfr(:p) Kfr(:j){t:i.32/j;p:px;c:Ip[-2]-1;!c? if(!t)Ip[-1]/Kfr Jpi; Mfr x; :Ix[-2]:c}
Ktn(K:ii){r:Mal@y\x?[3;0;2;3;4];Ir[-2]:1;Ir[-1]:y;ri|32\x}
Ufy{(!nx)? x: t:tx0; !t? x: nx/if(t~txi){t:0;break};t?[n#c.xi;n#i.xi;n#f.xi;n#z.xi]} 
Exl{r:Ktn[0;xn]tx?[x;xn/Jri:K.Cxi;xn/Jri:K.Ixi;xn/Jri:K.Fxi;xn/Jri:K.Zxi];r}

Fst{x0} Enl{Ufy 1#x} Til{tx~-2? Q :ix#i} Cnt{Ki(Kx<0? 1 :nx)} Rev{Kx<0? x: x@nx#nx-i-1}
Grp{a:Unq x;l2(a;ta? na#!x=ai :na#!x(~~)\ai)}
Drp{if(tx~-2)Q;if(Ky<0)Q;ix<0? (Ki max[0;ix+ny])#y :!nx>ix? Ktn[ty;0] :n:ny-ix;y n#ix+i}
Tak{if(tx~-2)Q;Ky<0? y@!x :ix<0? (Ki nx+max[nx;-ix-1])_y :ix>ny? k:i0;y@x#k<x? +k: 0 :y@!x}
Cut{if(Kx=-2){n:ix<0? ny%-ix :ix; x:(Ki ny%n)*!Ki n};if(tx~2)Q;n:nx;x,:K.nx;n#x Kxi+!Ki x[1+i]-xi}
Wer{if(tx~2)Q;m:s:i0;nx/{s+:xi;m:max[m;Ixi]};r:Ktn[2;s];k:i.-1 m<2? nx/xi? r[+k]:i :nx/{a:Ixi;a/Ir[+k]:i}}
Unq{Kx<0? x: nx<2? x: x:<x;n:i0;(xn-1)/if(xi~xi+1)+n;r:Ktn[tx;n];k:i.-1;(xn-1)/if(xi~xi+1)Ir[+k]:xi;r} /or x@!(nx#i)=x?x 
Fnd{Kx<0? In[x;y] :tx=-ty? {tx?[xn/if(Cxi=iy)break;xn/if(Ixi=iy)break;xn/if(Fxi=Fx0)break;xn/if(Zxi=Zx0)break;Q];Ki(i)} :yt>-1? Ecr[Fnd;x;y]}
Cat{if(Kx<0)x:,x;if(Ky<0)y:,y;r:Ktn[tx=ty? tx :0;(i.Cnt x)+i.Cnt y];if(!rt){nx/+Kxi;ny/+Kyi};Mcp[pr;px;sx\nx];Mcp[pr+sx\nx;py;sy\nx]}
Ati(K:Ki){tx?[x y;K.Cx y;K.Ix y;K.Fx y;K.Zx y]}
Atd{Ky<0? x : !ny? Ktn[tx;0] :1=ny? Atx[x;y0] :Dmd[x y0;1_y]}
Atx{tx>4? x.,y :(!ty)? ny#x yi; ty=-2? Ati[x;iy] :ty~2? Q :tx?[ny#x Iyi;ny#Cx Iyi;ny#Ix Iyi;ny#Fx Iyi;ny#Zx Iyi]}
Cal{if(Ky<0)Q; !tx>4? Atd[x;y] :a:tx-4;ny>a? Q :ny<a? Prj[x;y;!#y] : ny?[K[ix];K[x0;ix];K[x0;x1;ix];K[x0;x1;x2;ix];K[x0;x1;x2;x3;ix];Q]}

Flp
Add
Sub
Neg{0-x} Sqr{x*x}
Mul
Amd(4){if(Kx<0)Q;if((2~ty)&2~-ty)Q;x:Use x;if(Kz)a:z.(x y;a);if((Ky<0)&ta~-tx)x:Exl x;Ky<0? tx?[Kfr jx iy;Jx[iy]:ja; Cx[iy]:ia; Ix[iy]:ia; Fx[iy]:Fa0; Zx[iy]:Za0]
 :if(Ka<0)a:K.ny#a; if(na~ny)Q; if(tx~ta)x:Exl x;a:Exl a; tx?[ny/Kfr jxi;Jx[i]:Ja yi; ny/Cx[yi]:Ca yi; ny/Ix[yi]:Ia yi; ny/Fx[yi]:Fa yi; ny/Fz[yi]:Za yi]}
Dmd(4){1=ny? Amd[x;y0;z;a] :u:@x;v:1_x;Amd[x;u;j.0;Dmd[Atx[x;u];y;z;a]]}
Sum{t?{Sum up[x;2];{s:0i;n/a+:Ixi;Ki s};{s:0f;n/a+:Fxi;Kf s};{s:0z;n/a+:Zxi;Kz s}}}

Ech{Ky<0? x y :ny#x yi} Ecr{Kz<0? x[y;z] :nz#x[y;zi]} Ecl{Ky<0? x[y;z] :ny#x[yi;z]}
Bot{Ky<0? Kz<0? x[y;z] :nz#x[y;zi] Kz<0? ny#x[yi;z] :if(nx~ny)Q; nx#x[yi;zi]}
Pri{if(Ky<0)Q;x[yn#yi;yn#y i-1]} Ovr{s:@x;(ny-1)/s:x[s;y 1+i];s} Scn{s:@x; ny#i? x[s;yi] :s}
Jon{if(Ky<0)Q;r:@y;(ny-1)/{r,:x;r,:y 1+i}; r} Spl{if(!Kx<0)Q; if(Ky<0)Q; r:(0,!y=x)^y;if(nr)r0:1_r0; r}
Fix{r:y;while(r~y:f y)r:y; r} Fxs{r:y;s:,r;while(r~f y)r:y;s,:r; r}
Bin{y} Enc{y} Dec{y} Str{x} Fmt{y} Srt{x}

Add(2){t:tx|ty;x:up(x,t);y:up(y,t);Kx<0? Ky<0? t?{Q;Ki[ix+iy];Kf[Fx0+Fy0];Kz[Fx0+Fy0;Fx1+fy1;Q]} 
 :t? ?{Ecl[Add;x;y];nx#ix+Iyi;nx#fx+Fyi;nx#zx+Zyi;Q} :Ky<0?Add(y,x) :if(nx~ny)Q;t?{Q;nx#Ixi+Iyi;nx#Fxi+Fyi;nx#Zxi+Zyi;Q}}

Add(K:KK){t:max(tx,ty);x:up(x,t);y:up(y,t);x<0?y<0?@[Q;Ki(ix+iy);Kf(Fx0+Fy0);Kz(Fx0+Fy0;Fx1+Fy1)]!t?[Ecl(Add,x,y);nx#ix+Iyi;nx#fx+Fyi;(1<<32)+2nx#fx+Fyi]!
y<0?Add(y,x)     !if(nx!=ny)Q;t?[Q;nx#Ixi+Iyi;nx#Fxi+Fyi;nx#Zxi+Zyi]}

-rx; Ix[-2]-:1

integer ops: < = > ~bitnot ~not %div i\shift/ |or &and ^xor is min[ix;iy]  n/ loop   n# loop&assign to k vector  others are: udiv [u]mod min max clz  ge gt le lt all unsigned

+ abs add ' ech pri bot bin
- neg sub ' bot bin
* sqr mul / ovr fix ecr jon
% sqt div \ scn fxs ecl spl
! til mod
& flp min  $[c;cnd;els] 
| rev max  ?[i;swc;def]
< asc les  if(c)e   {block} ?
> dsc mor  c? x :y     tern
= grp eql  
~ not neq  n#t.e    vec of T
, enl cat  n/ break     loop
^ srt cut  while()     while
# cnt tak
_ flr drp  i. j. K.     cast
$ str fmt  xi x0       index
? unq fnd/in Cxi Ixi Fxi Zxi
@ fst atx  amd    @[x;i;+;y]
. va? cal  dmd    .[x;i;+;y]
