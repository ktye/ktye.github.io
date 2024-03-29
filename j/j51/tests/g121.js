NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. -.y -----------------------------------------------------------------

not =. 1&-

NB. Boolean
(-. -: not) 1=?2 3 4$2
(-. -: not) 1=?2
(-. -: not) 1=i.2 3 0

NB. integer
(-. -: not) ?2 3 4$2123
(-. -: not) _1000+?1 2 3 4$2123
(-. -: not) ?22334
(-. -: not) i.2 3 0

NB. floating point
(-. -: not) o.?2 3 4$2123
(-. -: not) o._1000+?1 2 3 4$2123
(-. -: not) o.?22334
(-. -: not) o.i.2 3 0

NB. complex
(-. -: not) ^j.?2 3 4$2123
(-. -: not) ^j._1000+?1 2 3 4$2123
(-. -: not) ^j.?22334
(-. -: not) ^j.i.2 3 0

(-. -: not) ''


NB. x-.y ----------------------------------------------------------------

rank =. #@$
dr   =. rank@] - 0&>.@<:@rank@[
res  =. (dr (*/@{. , }.) $@]) $ ,@]
less =. [`(([ -.@e. res) # [)@.((<: >:)&rank)

NB. Boolean
t (-. -: less) (?30   $#t){t=.1=?100 2 3$3
t (-. -: less) (?2 15 $#t){t=.1=?100 2 $2
t (-. -: less) (?4 3 2$#t){t=.1=?100 $2
(3 2$1 0) (-. -: less) 3 4$1 0
(3 2 5 4$1 0) (-. -: less) 5 4$1 0
(3 2 5 4$1 0) (-. -: less) 2 5 4$1 0
(,1) -: 1 -. 2 0 4 0
''   -: 1 -. i.2 3

NB. literal
t (-. -: less) (?30   $#t){t=.(?100 2 3$256){a.
t (-. -: less) (?2 15 $#t){t=.(?100 2  $256){a.
t (-. -: less) (?4 3 2$#t){t=.(?100    $256){a.
(3 2$'abc') (-. -: less) 3 4$'abc'
(3 2 5 1$'abdef') (-. -: less) 5 1$'abdef'
(3 2 5 1$'abdef') (-. -: less) 2 5 1$'abdef'
(,'&') -: '&' -. 'adsfb=12as'
''     -: '&' -. 2 3$'=1&2];'

NB. integer
t (-. -: less) (?30   $#t){t=.?100 2 3$1233
t (-. -: less) (?2 15 $#t){t=._1000+?100 2 $2123
t (-. -: less) (?4 3 2$#t){t=.?100 $212312
(3 2$4 5) (-. -: less) 3 4$4 5
(i.3 2 5 1) (-. -: less) i.5 1
(i.3 2 5 1) (-. -: less) i.2 5 1
(,_17) -: _17 -. 2 0 4 0 3j4
''     -: _17 -. 2 3$99 _17 0 9.7 _12

NB. floating point
t (-. -: less) (?30   $#t){t=.o.?100 2 3$1233
t (-. -: less) (?2 15 $#t){t=.o._1000+?100 2 $2123
t (-. -: less) (?4 3 2$#t){t=.o.?100 $212312
(3 2$4.5) (-. -: less) 3 4$4.5
(o.i.3 2 4 5) (-. -: less) o.i.4 5
(o.i.3 2 4 5) (-. -: less) o.i.2 4 5
(,2.7) -: 2.7 -. 2 0 4 0 3j4
''     -: 2.7 -. 2 3$99 2.7 _17 0 3j4 7 1

NB. complex
t (-. -: less) (?30   $#t){t=.^j.?100 2 3$1233
t (-. -: less) (?2 15 $#t){t=.^j.?100 2 $2123
t (-. -: less) (?4 3 2$#t){t=.^j.?100 $212312
(3 2$4j5) (-. -: less) 3 4$4j5
(j.i.3 2 4 5) (-. -: less) j.i.4 5
(j.i.3 2 4 5) (-. -: less) j.i.2 4 5
(,2j7) -: 2j7 -. 2 0 4 0 6
''     -: 2j7 -. 2 3 4$99 2j7 _17 0 3j4 7 1

NB. empties
(3 0$'') (-. -: less) i.3 2
(4 0$'') (-. -: less) i.0 0
(4 0$'') (-. -: less) i.1 0
(9 0$'') (-. -: less) i.2 3 4 0
