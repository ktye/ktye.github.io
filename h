2020.10.09
01234567   xt:x>>29      xt~0(function)  x<256(basic) x<128(dyadic)
Fcifzsld   xn:x&^7<<29   xn~2(derived)   adv  verb
4148x444                 xn~3(proj)      verb argv empty-index             
                         xn~4(lambda)    str  tree args arity   
                                              
+  add abx               abs:+z          bytes
-  sub neg                                 0..  7  type sizes   0 1 4 8 16 4 4 0
*  mul fst                                 8.. 11  parse cur (pp)
%  div sqr               conj:%z          12.. 15  rng state
&  min wer   prs flp     ang:&z           16..127  free pointers (4*i) for 4..31
|  max rev                               128..131  memsize log2
<  les grd                               132..135  k-tree keys
>  mor gdn                               136..139  k-tree values
=  eql grp                               140..143  trp line
~  mtc not               ~f              144..147  trp col
!  mkd til   seq         z:re!im im:!z   148..151  `x`y`z
,  cat enl                               152..155  
^  exc asc                               156..159  
$  str cst   sc cs                       160..255  char map az|AZ|NM|VB|AD|TE
#  rsh cnt   take                        256.....  buckets/heap
_  drp flr   drop        re:_z f:__i i:_f
?  fnd unq   fnd fnx                     (:;`x;y)          assign      x:y
@  atx typ               z:abs@ang z@ang (+;(`x;a;b;c);y)  assign(m/i) s[a;b;c]+:y
.  cal val               im:. z          (;a;b;c)   (*128) sequence    a;b;c     
                                         ((/;+);1 2 3)     adverbs     +/1 2 3 
+'x  ech(168)  x+'y  ecd(40)             x'y  bin          ::x(last)   :[x;y](dex)
+/x  ovr(251)  x+/y  ovi(123)  whl nlp   x/y  mod
+\x  scn(219)  x+\y  sci(91)  (c;f)/:x   x\y  y%x   \(help)  \\(exit)  \d(dump)
+':x ecp(169)  x+':y epi(41)  (c;f)\:x   x':y win?  dropfile(fs[name]) \lm(ld m.k)
+/:x fxp(253)  x+/:y ecl(125) (n;f)/:x   x/:y join  \wFILE(download)   \w(k.ws)
+\:x fxp(221)  x+\:y ecr(93)  (n;f)\:x   x\:y split \c(clear console)  \e var(edt)
