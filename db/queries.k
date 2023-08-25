
/ examples are split with //
/ these can also be run as
/ $k load.k queries.k
/----------------------------|

//prolog
/ the first query(prolog) runs 
/ each time at startup and 
/ contains initialization code
/
/ this example uses 1 table: t
/  symbol type what 
/  ---------------------------
/  id     int  start time unix
/  type   sym  r|b|s
/  time   flt  hours
/  dist   flt  km
/  coords int  #gps points na.

type:t`type;time:t`time
dist:t`dist
r:&`r=type  /run
b:&`b=type  /bike

/calendar
date:(t`id)-y7:1167609600
y:date%z:31563000
year:2007+z\(86400*0=4/y)+z*y
day: date%24*60*60
week:day %7
hms: +60 60 60\\_3600*

avg:{(+/x)%#x}
med:  **|2^^

utf:{(&x>-65)^x}
blk:utf" ▁▂▃▄▅▆▇█" 
hist:{[d]
 n:_8*n-m:_n:(15*x)%|/x:0.+.d
 f:{(x#8),((!8)y),&15-x}
 `<"\n"/:,/'blk@|+f'[m;n]}

/braille:{[w;h;x;y]
/ p:@[&w*h;x+w*y;1]
/ i:0 3 1 2
/ s:(r:h%4;2;w%2;4)
/ p@:(s i)//(s\\!#p)i
/ q:,/64#'(192*!4)
/ b:`c 14852224+(!256)+q
/ b:|-3^|b@&~0=b
/ d:1 2 4 64 8 16 32 128
/ ,/,[;"\n"]'r^,/(b@+/d*)'-8^p}

//input table
t

//yearly totals
(+/`time`dist#)'t@=year

//collected gps data
p:+/t`coords
m:8*p%1024^2.
`points`mb!p,m

//pace histogram 0..12:50 min/km
pace:60*(time r)%dist r
p:0|(#'=(xp:6.\!78)'pace)@!78
/jn:{,/x,\:"\n"}
/x:`<jn@|+15#'(p#\:"#"),\:_32+&15
/x:`<jn@,/'$10 10 6\\!78
x:hist(!78)!p

/shows run/walk clusters

//long rides per year
#'=year@&200<dist


//count triathlons
/ by definition:
/ swim then bike then run
/ within one day
m:(`b=type 1+i)&i:&`s=type
m&:`r=type 2+i
m&:(day 2+i)=day i
#tri:&m

//when were 100k km exceeded?
i:*&100000<+\dist
(year;week;day)@\:i

//fastest 10k/half/marathon
d:9.9 21 42<\:dist r
t:(hms@*^(time r)@&)'d
`ten`half`full!t

//rest days per year
+/'(0|-1+-':day)@=year

//knockouts
/more than 6 offdays in a row

rd:0|-1+-':day
+/'((6<rd)*rd)@=year

//distance histogram
,/'$!6 10   /..

