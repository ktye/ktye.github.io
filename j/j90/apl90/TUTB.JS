   _32{.'CONNECTIONS: arcs Ia'             CONNECTIONS: arcs Ia

   arcs=. ? 22 2 $ 8 8
   8 {. arcs
 3 5
 7 6
 2 0
 5 2
 5 6
 7 2
 1 7
 5 6
   |: n=.arcs{nodes=. 'ABCDEFGH'
 DHCFFHBFFFCGBCDHHEHCHE
 FGACGCHGAHDDCBHAECDAAD
   6{. barcs=. <"1 n
 �����������������Ŀ
 �DF�HG�CA�FC�FG�HC�
 �������������������
   15 {. ,arcs
 3 5 7 6 2 0 5 2 5 6 7 2 1 7 5
   _32{.'CONNECTIONS: conn. matrix Ib'
     CONNECTIONS: conn. matrix Ib

   '01234567' {~ |: arcs
 3725571555261237747274
 5602627607332170423003
   b=. '(i.,~x.)e.'
   cmFarcs=. ''::(b,'y.+/..*x.,1')

   cm=. 8 cmFarcs arcs
   cm
 0 0 0 0 0 0 0 0
 0 0 1 0 0 0 0 1
 1 1 0 1 0 0 0 0
 0 0 0 0 0 1 0 1
 0 0 1 1 0 0 0 0
 1 0 1 0 0 0 1 1
 0 0 0 1 0 0 0 0
 1 0 1 1 1 0 1 0

   +/cm
 3 1 4 4 1 1 2 3
   +/+/cm
 19
   _32{.'CONNECTIONS: family Ic'
           CONNECTIONS: family Ic

   cm
 0 0 0 0 0 0 0 0
 0 0 1 0 0 0 0 1
 1 1 0 1 0 0 0 0
 0 0 0 0 0 1 0 1
 0 0 1 1 0 0 0 0
 1 0 1 0 0 0 1 1
 0 0 0 1 0 0 0 0
 1 0 1 1 1 0 1 0
   points=. 1 0 0 0 0 0 0 1
   points +./ .. *. cm
 1 0 1 1 1 0 1 0
   points+.points+./ .. *.cm
 1 0 1 1 1 0 1 1

   immfam=. ''::'x.+.x.+./..*.y.'
   points immfam cm
 1 0 1 1 1 0 1 1
   fam=.''::'immfam&y.^:(#y.)x.'
   points fam cm
 1 1 1 1 1 1 1 1
   _32{.'CONNECTIONS: closure Id'
          CONNECTIONS: closure Id
   {: cm2=. 0=?8 8 $ 5
 0 0 0 0 0 1 0 0
 0 1 1 0 0 0 0 0
 0 0 0 0 0 0 0 0
 0 0 0 0 0 0 0 1
 1 0 0 1 0 0 0 0
 0 0 0 0 1 0 0 1
 1 0 1 0 1 0 0 0
 1 0 0 0 1 0 0 0
   points=. 1 0 0 0 0 0 0 1
   points fam cm2
 1 0 0 1 1 1 0 1
   cm2 fam cm2
 1 0 0 1 1 1 0 1
 0 1 1 0 0 0 0 0
 0 0 0 0 0 0 0 0
 1 0 0 1 1 1 0 1
 1 0 0 1 1 1 0 1
 1 0 0 1 1 1 0 1
 1 0 1 1 1 1 0 1
 1 0 0 1 1 1 0 1
   _32{.'CONNECTIONS: adjacency Ie'
        CONNECTIONS: adjacency Ie
   a=. 0 0 0 0 1 1 1 1
   b=. 0 0 1 1 0 0 1 1
   c=. 0 1 0 1 0 1 0 1
   $d=. a,b,,:c
 3 8
   adj=. '1=y. +/..~: |: y.'::''
   {: e=. adj |: d
 0 1 1 0 1 0 0 0
 1 0 0 1 0 1 0 0
 1 0 0 1 0 0 1 0
 0 1 1 0 0 0 0 1
 1 0 0 0 0 1 1 0
 0 1 0 0 1 0 0 1
 0 0 1 0 1 0 0 1
 0 0 0 1 0 1 1 0
   e{' *'
  ** *
 *  * *
 *  *  *
  **    *
 *    **
  *  *  *
   * *  *
    * **
   _32{.'SORTING Ja'
                       SORTING Ja

   t=.'i sing of olaf glad and big'
   {: tt=. > ;: t
 i
 sing
 of
 olaf
 glad
 and
 big

   /: tt
 5 6 4 0 2 3 1

   tt /: tt
 and
 big
 glad
 i
 of
 olaf
 sing
   _32{.'SYMBOLICS: reduction and scan Ka'
 SYMBOLICS: reduction and scan Ka
   o=.'('  }:  c=.')'  }:  s=.'-'
   minus=. ''::'o,x.,c,s,y.'
   'a' minus 'b'
 (a)-b
   list=.'defg'
   minus / list
 (d)-(e)-(f)-g
   minus /\ list
 d
 (d)-e
 (d)-(e)-f
 (d)-(e)-(f)-g
   d,e,f,g=.<:f=.<:e=.<:d=.4
 4 3 2 1
   ". minus / list
 2
   ". minus /\ list
 4 1 3 2
   times=. ''::'o,x.,c,''*'',y.'
   list times"0 |. list
 (d)*g
 (e)*f
 (f)*e
 (g)*d
   _32{.'COMPOSITIONS: and (&) La'
         COMPOSITIONS: and (&) La
   ^&2 c=. 1+i.4
 1 4 9 16
   2&^ c
 2 4 8 16
   pow=. ^&2::^
   pow c pow c
 1 16 729 65536
   c +&% c
 2 1 0.666667 0.5
   tr=. 3&*::*
   db=. 2&*::*
   c tr & db c
 4 16 36 64
   c db & tr c
 9 36 81 144
   c +&^. c
 0 1.38629 2.19722 2.77259
   ^ c +&^. c
 1 4 9 16
   db & tr /~ c
  9 18  27  36
 18 36  54  72
 27 54  81 108
 36 72 108 144
   _32{.'COMPOSITIONS: atop (@) Lb'
        COMPOSITIONS: atop (@) Lb
   c |@- / c=. 1+ i. 4
 0 1 2 3
 1 0 1 2
 2 1 0 1
 3 2 1 0

   db=. 2&*::*
   tr=. 3&*::*

   db @ tr / ~ c
 2  4  6  8
 4  8 12 16
 6 12 18 24
 8 16 24 32
   db & tr / ~ c
  9 18  27  36
 18 36  54  72
 27 54  81 108
 36 72 108 144
   _32{.'COMPOSITIONS: under (") Lc'
       COMPOSITIONS: under (") Lc
   +./ \ a=. 0 0 1 0 1 1 0 0 0
 0 0 1 1 1 1 1 1 1
   +./ \ |. a
 0 0 0 1 1 1 1 1 1
   |. +./ \ |. a
 1 1 1 1 1 1 0 0 0
   +./\ " |. a
 1 1 1 1 1 1 0 0 0
   b=. 1 2 3 4  }:  c=. 3 4 5 6
   b +&^. c
 1.09861 2.07944 2.70805 3.17805
   ^ b +&^. c
 3 8 15 24
   b +"^. c
 3 8 15 24
   {:text=.'i';'sing';'of';'olaf'
 ��������������Ŀ
 �i�sing�of�olaf�
 ����������������
   |."> text
 ��������������Ŀ
 �i�gnis�fo�falo�
 ����������������
   _32{.'COMPOSITIONS: fork (f g h) Ld'
    COMPOSITIONS: fork (f g h) Ld

                        g
                       / \
   (f g h) y          f   h
                      |   |
                      y   y

                        g
                       / \
 x (f g h) y          f   h
                     /\   /\
                    x  y x  y


 SEE NEXT FRAME FOR EXAMPLES
   _32{.'COMPOSITIONS: fork (f g h) Le'
    COMPOSITIONS: fork (f g h) Le
   c(+ * -)d=.-.c=. i. 4
 _1 1 3 5
   q=.+*-
   c q / c
 0 _1 _4 _9
 1  0 _3 _8
 4  3  0 _5
 9  8  5  0
   q c
 0 _1 _4 _9
   r=. -,+
   c r d
 _1 1
  1 1
  3 1
  5 1
   db=. 2&*::*
   tr=. 3&*::*
   (db+tr) c
 0 5 10 15
   (db*tr) c
 0 6 24 54
   (db*db+tr) c
 0 10 40 90
   _32{.'COMPOSITIONS: hook (g h) Lf'
      COMPOSITIONS: hook (g h) Lf

                      g
                     / \
   (g h) y          y   h
                         \
                          y

                      g
                     / \
 x (g h) y          x   h
                         \
                          y


 SEE NEXT FRAME FOR EXAMPLES
   _32{.'COMPOSITIONS: hook (g h) Lg'
      COMPOSITIONS: hook (g h) Lg
   a=.5 6 7 8
   b=.1 2 3 4
   (*>:) b
 2 6 12 20
   a (*>:) b
 10 18 28 40
   a (*>:)/ b
 10 15 20 25
 12 18 24 30
 14 21 28 35
 16 24 32 40
   (+%) / 1 2 2 2 2 2 2
 1.4142
   (+%)/\ 1 2 2 2 2
 1 1.5 1.4 1.41667 1.41379
   (+%)/\ 3 7 15
 3 3.14286 3.14151
   (+%)/\ 1 1 1 1 1
 1 2 1.5 1.66667 1.6
   (-%)/\ 1 2 2 2 2 2
 1 0.5 0.333333 0.25 0.2 0.166667
   *~ (+%)/ 1 , 12 $ 1 2
 3
   _32{.'FUNCTIONAL PROGRAMMING Ma'
        FUNCTIONAL PROGRAMMING Ma
   bc=. 0&, + ,&0
   bc 1
 1 1
   bc bc 1
 1 2 1
   bc bc bc 1
 1 3 3 1
   q=. '$.=.1,y.#2'
   r=. 'f=. {:' ; 'f=. x.&f'
   power=. 2::(q;r)
   bc power 3 (1)
 1 3 3 1
   bc ^: 3 (1)
 1 3 3 1
   c3=. (0&,+,&0) ^: 3
   c3 1
 1 3 3 1
   2&* ^: 3"0 i. 5
 0 8 16 24 32
   2&+ ^: 3"0 i. 5
 6 7 8 9 10
   g=. *~::-
   5 g g 4
 _11
   _32{.'SETS: propositions Na'
            SETS: propositions Na
   {: a=. 2%~ i. 11
 0 0.5 1 1.5 2 2.5 3 3.5 4 4.5 5
   (2&<: *. <&5) a
 0 0 0 0 1 1 1 1 1 1 0
   ((2&<: *. <&5) a) # a
 2 2.5 3 3.5 4 4.5
   ((2&<: *. <&5) # {:) a
 2 2.5 3 3.5 4 4.5
   ({: #~ 2&<: *. <&5) a
 2 2.5 3 3.5 4 4.5
   int=. = <.
   int a
 1 0 1 0 1 0 1 0 1 0 1
   ((2&<: *. int) a) # a
 2 3 4 5
   ({: #~ 2&<: *. int) a
 2 3 4 5
   (#~ 2&<: *. int) a
 2 3 4 5
   _32{.'SETS: relations Nb'
               SETS: relations Nb
   i=.i.8  }:  p=. 2 3 5 7 11
   belongsto=. +./"1 @ (=/)
   i belongsto p
 0 0 1 1 0 1 0 1
   e=. belongsto
   p e i
 1 1 1 1 0
   c=. -.@v=. e&'aeiou'
   alph=.  'abcdefghijklmno'
   alph=. alph,'pqrstuvwxyz'
   (v alph)#alph
 aeiou
   (#~ c) alph
 bcdfghjklmnpqrstvwxyz
   _32{.'SETS: union, etc. Nc'
             SETS: union, etc. Nc
   (even=. 0&=&(2&|))a=. i. 16
 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0
   prime=.'2=+/0=y.|~1+i.y.'::''"0
   prime a
 0 0 1 1 0 1 0 1 0 0 0 1 0 1 0 0
   (prime a) # a
 2 3 5 7 11 13
   a#~(prime*.even)a
 2
   a#~(prime>even)a
 3 5 7 11 13
   triple=.0&=&(3&|)
   q=. even+.triple
   (q a) # a
 0 2 3 4 6 8 9 10 12 14 15
   r=. prime +. even *. triple
   (r a) # a
 0 2 3 5 6 7 11 12 13
   _32{.'FAMILIES OF FUNCTIONS Oa'
         FAMILIES OF FUNCTIONS Oa
   x=.1 2 3 4 5 6 7
   x^2
 1 4 9 16 25 36 49
   x^3
 1 8 27 64 125 216 343
   (4*x^2) + (_3*x^3)
 1 _8 _45 _128 _275 _504 _833

   2 3 ^~/ x
 1 4  9 16  25  36  49
 1 8 27 64 125 216 343
   4 _3 +/..*2 3 ^~/x
 1 _8 _45 _128 _275 _504 _833

   e=. 0 1 2 3 4
   vandermonde=. e ^~/ x
   vandermonde
 1  1  1   1   1    1    1
 1  2  3   4   5    6    7
 1  4  9  16  25   36   49
 1  8 27  64 125  216  343
 1 16 81 256 625 1296 2401
   _32{.'FAMILIES OF FUNCTIONS Ob'
         FAMILIES OF FUNCTIONS Ob
   c=. 4 2 _3 2 1
   vandermonde
 1  1  1   1   1    1    1
 1  2  3   4   5    6    7
 1  4  9  16  25   36   49
 1  8 27  64 125  216  343
 1 16 81 256 625 1296 2401
   c+/..*vandermonde
 6 28 118 348 814 1636 2958

   poly=. ''::'x.+/..*|:y.^/i.#x.'
   c poly x
 6 28 118 348 814 1636 2958
   _32{.'INVERSES AND DUALITY Pa'
          INVERSES AND DUALITY Pa
   cFf=.   '(y.-32) * 5%9'::''
   fFc=. '32 + (y. * 9%5)'::''
   dc=. 40 -~ 20 * i. 8
   fFc dc
 _40 _4 32 68 104 140 176 212
   cFf fFc dc
 _40 _20 0 20 40 60 80 100
   % % 1 2 3
 1 2 3
   log =.   '10 ^.y.'::''
   invlog=. '10 ^ y.'::''
   log y=. 24 4 75 7
 1.38021 0.60206 1.87506 0.845098
   +/ log y
 4.70243
   invlog +/ log y
 50400
   _32{.'INVERSES AND DUALITY Pb'
          INVERSES AND DUALITY Pb
   r=. 2 3 4  }:  s=. 2 4 5

   invlog (log r) + (log s)
 4 12 20
   r * s
 4 12 20

   ^ (^. r) + (^. s)
 4 12 20
   r +"^. s
 4 12 20

   r +"% s
 1 1.71429 2.22222
   % (%r) + (%s)
 1 1.71429 2.22222

   +"% / r
 0.923077
   % +/ % r
 0.923077
   _32{.'INVERSES AND DUALITY Pc'
          INVERSES AND DUALITY Pc
   f=. +&3
   g=. -&3

   {: x=. i. 4
 0 1 2 3

   f x
 3 4 5 6
   !f x
 6 24 120 720
   g!f x
 3 21 117 717
   !"f x
 3 21 117 717

   !"(+&3) x
 3 21 117 717
   !"(*&2) x
 0.5 1 12 360
