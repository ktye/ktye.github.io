   _32{.'ALPHABET A'
                       ALPHABET A
   $ a.
 256
   j=. a. i. 'aA'
   j
 97 65
   j +/ i. 9
 97 98 99 100 101 102 103 104 105
 65 66 67  68  69  70  71  72  73
   (j+/i.30){a.
 abcdefghijklmnopqrstuvwxyz{|}~
 ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^
   a.{~j+/i.30
 abcdefghijklmnopqrstuvwxyz{|}~
 ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^
   3 + 125 * 6 % 100
 10.5
   i. 2 5
 0 1 2 3 4
 5 6 7 8 9
   */~0j1 _1 0j_1 1
   _1 0j_1    1  0j1
 0j_1    1  0j1   _1
    1  0j1   _1 0j_1
  0j1   _1 0j_1    1
   _32{.'SPELLING B'
                       SPELLING B
   sentence=.'index=. a.i.''aA'''

   ;:sentence
 �������������������Ŀ
 �index�=.�a.�i.�'aA'�
 ���������������������
   $ ;:sentence
 5
   >;:sentence
 index
 =.
 a.
 i.
 'aA'

   ". sentence
 97 65

   ". 'abc =. 3 1 4 2'
 3 1 4 2
   abc
 3 1 4 2
   _32{.'GRAMMAR C'
                        GRAMMAR C
   fahrenheit =. 50
   (fahrenheit - 32) * 5 % 9
 10
   prices =. 3 1 4 2
   orders =. 2 0 2 1
   orders * prices
 6 0 8 2
   +/ orders * prices
 16
   +/ \ 1 2 3 4 5
 1 3 6 10 15
   2 3 * / 1 2 3 4 5
 2 4 6  8 10
 3 6 9 12 15
   decr=. - & 1
   decr _1 0 1 2 3
 _2 _1 0 1 2
          PARTS OF SPEECH
   50 fahrenheit  Nouns/Pronouns
   + - * % decr   Verbs/Proverbs
   / \            Adverbs
   &              Conjunction
   =.             Verb-to-be
   ( )            Punctuation
   _32{.'TABLES Da'
                        TABLES Da
   prices=. 3 1 4 2
   orders=. 2 0 2 1
   prices * orders
 6 0 8 2
   prices */ orders
 6 0 6 3
 2 0 2 1
 8 0 8 4
 4 0 4 2

    TO READ A TABLE,
    BORDER IT BY ITS ARGUMENTS:

   over=.({.;@;}.)&":@,
   by=.(,~"_1 ' '&;&;)~
   prices by orders over prices */ orders
 ���������Ŀ
 � �2 0 2 1�
 ���������Ĵ
 �3�6 0 6 3�
 �1�2 0 2 1�
 �4�8 0 8 4�
 �2�4 0 4 2�
 �����������
   _32{.'TABLES Db'
                        TABLES Db
   n=. 0 1 2 3
   n +/ n
 0 1 2 3
 1 2 3 4
 2 3 4 5
 3 4 5 6
   */ ~ n
 0 0 0 0
 0 1 2 3
 0 2 4 6
 0 3 6 9
   ^/ ~ i. 4
 1 0 0  0
 1 1 1  1
 1 2 4  8
 1 3 9 27
   +./~ 0 1
 0 1
 1 1
   +:/~ 0 1
 1 0
 0 0
   _32{.'TABLES Dc'
                        TABLES Dc
   |/ ~ 1+i. 5
 0 0 0 0 0
 1 0 1 0 1
 1 2 0 1 2
 1 2 3 0 1
 1 2 3 4 0

   +/ 0= |/ ~ j=. 1+i. 15
 1 2 2 3 2 4 2 4 3 4 2 6 2 4 4
   2=+/0=|/ ~ j
 0 1 1 0 1 0 1 0 0 0 1 0 1 0 0
   (2=+/0=|/~ j) # j
 2 3 5 7 11 13

   =/~i. 4
 1 0 0 0
 0 1 0 0
 0 0 1 0
 0 0 0 1
   <:/~i. 4
 1 1 1 1
 0 1 1 1
 0 0 1 1
 0 0 0 1
   _32{.'TABLES Dd'
                        TABLES Dd
   text=. ' i sing of olaf '
   text=. text,'glad and big'

   alph=. ' abcdefghijklmno'
   alph=. alph,'pqrstuvwxyz'

   '01'{~10{.alph=/text
 1010000100100001000010001000
 0000000000000100001001000000
 0000000000000000000000000100
 0000000000000000000000000000
 0000000000000000000100010000
 0000000000000000000000000000
 0000000001000010000000000000
 0000001000000000100000000001
 0000000000000000000000000000
 0100100000000000000000000010

   2 13$+/"1 alph=/text
 7 3 1 0 2 0 2 3 0 3 0 0 2
 0 2 2 0 0 0 1 0 0 0 0 0 0
   _32{.'CLASSIFICATION Ea'
                CLASSIFICATION Ea
   x=. 1 2 3 4 5 6 7
   y=. (x-3) * (x-5)
   y
 8 3 0 _1 0 3 8

   range=. m-i. 1+(m=. >./y)-<./y
   range
 8 7 6 5 4 3 2 1 0 _1

   bc=. range <:/ y
   bc
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 1 0 0 0 1 1
 1 1 0 0 0 1 1
 1 1 0 0 0 1 1
 1 1 1 0 1 1 1
 1 1 1 1 1 1 1
   _32{.'CLASSIFICATION Eb'
                CLASSIFICATION Eb
   x=. 1 2 3 4 5 6 7
   y=. (x-3) * (x-5)
   y
 8 3 0 _1 0 3 8
   range=. m-i. >:(m=. >./y)-<./y
   range
 8 7 6 5 4 3 2 1 0 _1
   bc=. range <:/ y
   bc { ' *'
 *     *
 *     *
 *     *
 *     *
 *     *
 **   **
 **   **
 **   **
 *** ***
 *******
   </\ 0 0 0 1 0 1 1 0 1
 0 0 0 1 0 0 0 0 0
   _32{.'CLASSIFICATION: graphs Ec'
        CLASSIFICATION: graphs Ec
   bc
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 0 0 0 0 0 1
 1 1 0 0 0 1 1
 1 1 0 0 0 1 1
 1 1 0 0 0 1 1
 1 1 1 0 1 1 1
 1 1 1 1 1 1 1
   </\ bc
 1 0 0 0 0 0 1
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 1 0 0 0 1 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 1 0 1 0 0
 0 0 0 1 0 0 0
   _32{.'CLASSIFICATION: graphs Ed'
        CLASSIFICATION: graphs Ed
   </\bc
 1 0 0 0 0 0 1
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 1 0 0 0 1 0
 0 0 0 0 0 0 0
 0 0 0 0 0 0 0
 0 0 1 0 1 0 0
 0 0 0 1 0 0 0
   ' *' {~ </\bc
 *     *
 
 
 
 
  *   *
 
 
   * *
    *
   _32{.'CLASSIFICATION +,* on subsets Ee'
 CLASSIFICATION +,* on subsets Ee

   a=. 0 0 0 0 1 1 1 1
   b=. 0 0 1 1 0 0 1 1
   c=. 0 1 0 1 0 1 0 1
   cct=. a,b,,:c
   cct
 0 0 0 0 1 1 1 1
 0 0 1 1 0 0 1 1
 0 1 0 1 0 1 0 1

   2 3 5 +/..* cct
 0 5 3 8 2 7 5 10
   2 3 5 */..^ cct
 1 5 3 15 2 10 6 30
   +/cct
 0 1 1 2 1 2 2 3
   {:c2=.(2=+/cct)#"1 cct
 0 1 1
 1 0 1
 1 1 0
   2 3 5 >./ .. * c2
 5 5 3
   _32{.'CLASSIFICATION dot products Ef'
   CLASSIFICATION dot products Ef

        2 3 5 | 0 5 3 8 2 7 5 10
        4 2 1 | 0 1 2 3 4 5 6 7
        ------|-----------------
              | 0 0 0 0 1 1 1 1
              | 0 0 1 1 0 0 1 1
              | 0 1 0 1 0 1 0 1

   row0 =. 2 3 5 }: col5=. 1 0 1

   row0 * col5
 2 0 5
   +/ row0 * col5
 7

   row0 +/..* cct
 0 5 3 8 2 7 5 10
   row0 */..^ cct
 1 5 3 15 2 10 6 30

   row0 ^ col5
 2 1 5
   */ row0 ^ col5
 10
   _32{.'STRUCTURES: box Fa'
               STRUCTURES: box Fa
   text
  i sing of olaf glad and big
   |. text
 gib dna dalg falo fo gnis i
   < 'glad'
 ����Ŀ
 �glad�
 ������
   u=. (<'glad'),(<'and'),<'big'
   u
 ������������Ŀ
 �glad�and�big�
 ��������������
   |. u
 ������������Ŀ
 �big�and�glad�
 ��������������
   # u
 3
   'glad';'and';'big'
 ������������Ŀ
 �glad�and�big�
 ��������������
   _32{.'STRUCTURES: each Fb'
              STRUCTURES: each Fb
   text
  i sing of olaf glad and big

   words=. ;: text
   words
 ���������������������������Ŀ
 �i�sing�of�olaf�glad�and�big�
 �����������������������������

   1 0 2 3 { words
 ��������������Ŀ
 �sing�i�of�olaf�
 ����������������
   |. " > 1 0 2 3 { words
 ��������������Ŀ
 �gnis�i�fo�falo�
 ����������������

   <;._1 text
 ���������������������������Ŀ
 �i�sing�of�olaf�glad�and�big�
 �����������������������������
   _32{.'STRUCTURES open Fc'
               STRUCTURES open Fc

   words
 ���������������������������Ŀ
 �i�sing�of�olaf�glad�and�big�
 �����������������������������

   tt=. > words
   tt
 i
 sing
 of
 olaf
 glad
 and
 big

   $ tt
 7 4
   _32{.'PROGRAMS: simple Ga'
              PROGRAMS: simple Ga
   root=. 'y. ^ %2'::'y. ^ %x.'
   root 64
 8
   3 root 64
 4
   rPr=. '% y.'::'x. + % y.'
   3 rPr 4
 3.25
   rPr / 1 2 2 2 2 2 2
 1.4142
   rPr/ \ 1 2 2 2 2
 1 1.5 1.4 1.41667 1.41379
   rPr/ \ 3 7 15
 3 3.14286 3.14151
   triple=. '3*y.'::''
   triple i.5
 0 3 6 9 12
   3 triple 6
 domain error
   tr=. '3*y.'::*
   tr i. 5
 0 3 6 9 12
   3 5 7 tr i. 3
 0 5 14
   _32{.'PROGRAMS: conditional Gb'
         PROGRAMS: conditional Gb
   p=. '$.=. 1+y.<0'
   q=. 'y. ^ %2'
   r=. '''DOMAIN ERROR'''

   conditional=. (p;q;r)::''

   conditional -49
 DOMAIN ERROR

   conditional 49
 7

   tozero=.(p;'y.-1';'y.+1')::''

   tozero 3
 2
   tozero _3
 _2
   tozero "0 (_2 _1 0 1 2 3)
 _1 0 _1 0 1 2
   _32{.'PROGRAMS: iterative Gc'
           PROGRAMS: iterative Gc
   a=. 'r=. 1 }: $.=. y. # 1'
   b=. 'r=. r * 1+ # $.'
   factorial=. (a;b)::''
   factorial 5
 120
   factorial"0 i. 6
 1 1 2 6 24 120
   > a;b
 r=. 1 }: $.=. y. # 1
 r=. r * 1+ # $.
   c=. 'r=. (0,r) + (r,0)'
   binomials=. (a;c)::''
   binomials 4
 1 4 6 4 1
   fib=.(a;'r=.r,+/_2{.r')::''
   fib 10
 1 1 2 3 5 8 13 21 34 55 89
   d=. 'r=. 1 }: $.=. x. # 1'
   e=. 'r=. (r*1+y.=.y.-1)%1+#$.'
   outof=. ''::(d;e)
   3 outof 5
 10
   _32{.'PROGRAMS: recursive Gd'
           PROGRAMS: recursive Gd
   a=. '$.=. 2-0=y.' ; '1'
   b=. 'y. * $: y.-1'
   factorial=. (a,<b)::''
   factorial 5
 120

   d=. '(r,0)+0,r=. $: y.-1'
   binomial=. (a,<d)::''
   binomial 4
 1 4 6 4 1

   f=. 'r,+/_2{.r=. $: y.-1'
   fibonacci=. (a,<f)::''
   fibonacci 10
 1 1 2 3 5 8 13 21 34 55 89

   g=. '$.=. 2-0=x.' ; '1'
   h=. 'y.*x.%~x.$:&<:y.'
   outof=. ''::(g,<h)
   outof"0/~i. 4
 1 1 1 1
 0 1 2 3
 0 0 1 3
 0 0 0 1
   _32{.'PROGRAMS: recursive Ge'
           PROGRAMS: recursive Ge
   a=.'$.=.1+0<n=.x.-1'
   b=.',:2{.y.'
   c=.'(n$:0 2 1{y.),(1$:y.),'
   hanoi=.''::(a;b;c,'n$:|.y.')
   2 hanoi 'ABC'
 AC
 AB
 CB
   |: 4 hanoi 0 1 2
 0 0 2 0 1 1 0 0 2 2 1 2 0 0 2
 2 1 1 2 0 2 2 1 1 0 0 1 2 1 1

   |: 'ABC'{~ 4 hanoi 0 1 2
 AACABBAACCBCAAC
 CBBCACCBBAABCBB

   c=.'r=.0#$.=.y.#1+n=.0'
   d=.'r=.r,(n=.1+n),r'
   h=.(c;d)::''
   h 4
 1 2 1 3 1 2 1 4 1 2 1 3 1 2 1
   h 3
 1 2 1 3 1 2 1
   _32{.'PROGRAMS: recursive Gf'
           PROGRAMS: recursive Gf
   {:a=.3 3$'abcdefghi'
 abc
 def
 ghi
   (f=.f-."1 0 f=.i.&#) a
 1 2
 0 2
 0 1
   <"2 (minors=.f { 1&}."1) a
 ��������Ŀ
 �ef�bc�bc�
 �hi�hi�ef�
 ����������
   p=.'$.=. 1+1=#y.' }: r=.'0{,y.'
   q=.'(0{"1 y.)-/..*$:"2 minors y.'
   {:b=.?3 3$9
 1 6 4
 4 1 0
 6 6 8
   (det=.(p;q;r)::'') b
 _112
   s=.'(0{"1 y.)+/..*$:"2 minors y.'
   (permanent=.(p;s;r)::'') b
 320
   _32{.'GEOMETRY: 2-space Ha'
             GEOMETRY: 2-space Ha
   length=. '%:+/y.^2'::''
   length 12 5
 13
   {: tri=. ? 2 3 $ 9
 3 4 7
 0 0 4
   1 |."1 tri
 4 7 3
 0 4 0
   {:lsides=.length tri-1|."1 tri
 1 5 5.65685
   {: semiper=. 2 %~ +/lsides
 5.82843
   area=. %:*/semiper-0,lsides
   area
 2
   tri,1
 3 4 7
 0 0 4
 1 1 1
   2 %~ det tri,1
 2
   _32{.'GEOMETRY: 3-space Hb'
             GEOMETRY: 3-space Hb
   tri,1
 3 4 7
 0 0 4
 1 1 1
   2%~ det tri,1
 2
   2%~ det 1 0 2 {"1 tri,1
 _2
   {: tetrahedron=. 0,"1 =/~ i. 3
 0 1 0 0
 0 0 1 0
 0 0 0 1

   volume=. det&(,&1) % !&#
   volume tetrahedron
 _0.166667

   {: tet=. ? 3 4 $ 9
 6 0 3 0
 3 6 5 8
 7 4 0 5
   volume tet
 11.5
