NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. #:y -----------------------------------------------------------------

max    =. >./@|@,
bits   =. >:@<.@(2&^.)@(1&>.)
abase1 =. #:~ $&2@bits@max

NB. Boolean
(#: -: abase1) ?2 3 4$2
(#: -: abase1) ?2

NB. integer
(#: -: abase1) _6000+?2 3 4$12345
(#: -: abase1) _500+?1000

NB. floating point
(#: -: abase1) o._5000+?2 3 4$10000
(#: -: abase1) o._500+?1000

NB. complex
(#: -: abase1) j./?2 3 4$1000
(#: -: abase1) r.?12345 6789

(,0)    -: #: 0
(,1)    -: #: 1
1 0     -: #: 2
1 0 0   -: #: 4
1 0 0 0 -: #: 8
1 0 0 0 -: #: _8
1 1 0 1 -: #: 13

(70{.1) -: #: 2^69

f =. ([,-.@(0&e.))@$ $ ,
(f t) -: #:t=.?(>:?7$3)$2
(f t) -: #:t=.(?32$2)$2
(f t) -: #:t=.(?32$2)$2.4
(f t) -: #:t=.(?32$2)$2j4


NB. x#:y ----------------------------------------------------------------

abase2 =. ([ | i.@#@$@] |: ([%~]-|)/\.@}.@,)"1 0
f =. *./@,@:(#: -: abase2)

NB. Boolean
(?4$2) f ?2 3 4$2
(?4$2) f ?2

NB. integer
(?4$100)         f _6000+?2 5$12345
(_4+?2 4$10)     f _6000+?2 1 3$12345
(?4$10)          f _500+?1000
(_40+?3 2 4$100) f _6000+?3$12345

NB. floating point
(_15+?1 2 4$30)  f o._5000+?1 2$10000
(_4+?7$9)        f o._500+?10000

NB. complex
(_15+3 4$30)     f r.?3 1 1 4$1000
(_4+?3 1 1 7$9)  f r.?3 1$12345

(?2)     (|-:#:) ?2
(?100)   (|-:#:) ?100
(o.?100) (|-:#:) o.?100
(r.?100) (|-:#:) r.?100

1 2 3 4   -: 10 10 10 10#:1234
0 0 _1 _1 -: _2 _2 _2 _2#:1
