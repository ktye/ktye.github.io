NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. @. ------------------------------------------------------------------

f=.1:`(* $:@<:) @. *
(!i.10) -: f"0 i.10


NB. @. -- all size x partitions of y ------------------------------------

start =. +/@{. >:@i.@<.@%&>: {:@$
mask  =. start <:/ {."1 <. -.@(-/)@(_2&{.)"1
pfx   =. +/"1 # >:@i.@#
ind   =. , # */@$ $ i.@{:@$
decr  =. (>:@(-/)@(_1 0&{) _1} ])"1
form  =. pfx@[ decr@,. ind@[ { ]
recur =. (mask form ])@(part&<:)

test  =. 1&<@[ *. <
basis =. (0&<@] , [) $ (1&=@[ 1&>.@* ])
part  =. basis`recur@.test

x=. 0 0$''
x=.x, 't=.x. part y.'
x=.x, 'z=.$0'
x=.x, 'z=.z, x.={:$t'
x=.x, 'z=.z, (i.#t)-:/:t'
x=.x, 'z=.z, (0=x.)+.y.=+/"1 t'
x=.x, 'z=.z, (/:"1 t) *./ .=i.x.'
x=.x, '*./z'
f =. '':x

f/+/\?5 10
0 f 0
0 f 5
5 f 5
