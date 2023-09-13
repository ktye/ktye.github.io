
/ examples are split with //
/ these can also be run as
/ $k load.k queries.k



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



/----------------------------|

//prolog
/ the first query(prolog) runs 
/ each time at startup and 
/ contains initialization code
/
/ this example uses 1 table:db 
/  symbol type what 
/  ---------------------------
/  id     int  start time unix
/  type   sym  r|b|s
/  time   flt  hours
/  dist   flt  km
/  coords int  #gps points(na)

type:db`type
time:db`time
dist:db`dist
r: &`r=type  /run
b: &`b=type  /bike

hms:+60 60 60\_3600*

/calendar(start at 2007)
start:(db`id)-1167609600
   y:start%z:31563000
leap:86400*0=4!3+y
year:2007+(leap+z*y)%z
day: start%24*60*60
week:day%7

/formatted date: e.g. 20230826
l:-2006+*|year
m:l^(l*12)#"babababbabab"-67
m[;1]:28+0=4!3+!l
m:86400*+\,/m
ym:2+12!i:m'start
md:1+(start-m(m'start))%86400
date:md+(100*ym)+10000*year


avg:{(+/x)%#x}
med:  **|2^^

//input table

db

//yearly totals

(+/`time`dist#)'db@=year

//collected gps data

p:+/db`coords
m:8*p%1024^2.
`points`mb!p,m

//10k progression ?&\

t:?&\(time r)@i:&10<dist r
d:(date r i)(time r i)?t

k:`date`hour`min`sec
+k!(,d),+hms t

//fastest 5k/10k/half/marathon

d:5 10 21 42<\dist r
t:(hms@*^(time r)@&)'d

(":"/$)'`five`ten`half`full!t

//when were 100k km exceeded?

date@*&100000<+\dist

//pace histogram 0..12:50 min/km

pace:60*(time r)%dist r

pace:60*(time r)%dist r
x:(!78)%6.
y:0|(#'=x'pace)@!78

bar x!y

/the bar plot is interactive:
/click to show numbers

/it shows race/run/walk clusters

//bike distance histogram

d:#'=(0.+!40)'(dist b)%10
bar(10*!40)!0|d@!40

//rayleigh distribution

x:(dx:5.)*!80
h:#'=x'd:dist b
bar x!y:(0.|h@!80)%dx*#b


/estimate parameter(sigma)
s:%(+/d*d)%2*#d

f:(x%s*s)*exp(-x*x%2*s*s)
plot x!f

k:`mean`median`q95
k!+`analytic`counted!1_(
 s*(%.5p;%2*log 2;%-2*log .05)
(avg;**|2^^;(^d)@_0.95*#)@\d)

/not a good fit

//long rides per year

#'=year@&200<dist

//rest days per year

+/'(0|-1+`d day)@=year

//count triathlons

/ by definition:
/ swim then bike then run
/ within one day

i:&&/(`s=type
      `b=1_type,`
      `r=2_type,``)
#tri:i@&(day 2+i)=day i

//speed over distance

u:(dist r)%time r
v:(dist b)%time b

//asof

/asof[tabl1;tabl2;timecol]
asof:{x,'(z_y)[(y z)'x z]}


