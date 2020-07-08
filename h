2020.07.08
01234567   xt:x>>29       xn:x&536870911 (-1+1<<29)
Fcifzsld   xt~0(function) x<256(basic) x<128(dyadic)
4148x444   xn~2(derived)  adv  verb
	   xn~3(proj)     verb argv empty-index
	   xn~4(lambda)   str  tree args arity

+  add abx                 abs:+z              memory
-  sub neg                                     0..  7   type sizes   0 1 4 8 16 4 4 0
*  mul fst                                     8.. 11   parse cur (pp)
%  div sqr                 conj:%z            12.. 15   rng state
&  min wer   prs flp       ang:&z             16..127   free pointers (4*i) for bt i, i:4..31
|  max rev                                   128..131   memsize log2
<  les grd                                   132..135   k-tree keys
>  mor gdn                                   136..139   k-tree values
=  eql grp                                   140..143   trp line
~  mtc not   match                           144..147   trp col
!  mkd til   seq           z:re!im  im:!z    148..151   `x`y`z
,  cat enl                                   152..155   
^  exc asc                                   156..159   
$  str cst   sc cs                           160..255   char map az|AZ|NM|VB|AD|TE
#  rsh cnt   take                            256.....   buckets/heap
_  drp flr   drop          re:_z            
?  fnd unq   fnd fnx                         (:;`x;y)          assign      x:y
@  atx typ                 z:abs@ang  z@ang  (+;(`x;a;b;c);y)  assign(m/i) s[a;b;c]+:y
.  cal val                 im:. z            (;a;b;c)   (*128) sequence    a;b;c      ::x(last) 
                                             ((/;+);1 2 3)     adverbs     +/1 2 3  :[x;y](dex)                 
+'x  ech(168)      x+'y  ecd(40)        x'y  bin            b:A/x  x:A\b  qr:A\0   x:qr\b  (fz)    
+/x  ovr(251),fxp  x+/y  ecr(123),n/whl x/y  mod,mmul(L)?     
+\x  scn(219),fxp  x+\y  ecl(91),n/whl  x\y  y%x,solve(L)?  \(help)  \\(exit) \d(dump) \w(k.ws)
+':x ecp(169)      x+':y epi(41)        x':y win?           \c(clear console)       
+/:x ?(253)        x+/:y ovi(125)       x/:y join           \L100 F  (loop F[ui] with delay ms)
+\:x ?(221)        x+\:y sci(93)        x\:y split          \e(edit)  \eFILE  \e`VAR (ESC quit) 
