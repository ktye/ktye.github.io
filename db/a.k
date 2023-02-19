/ t(table)                               press shift-enter to execute
/  `id    :start time, unix seconds      (uncomment examples)
/  `type  :r|b|s
/  `time  :hours
/  `dist  :km
/  `coords:#gps points

type:t`type;time:t`time;dist:t`dist
r:&`r=type /run
b:&`b=type /bike

/calendar
date:(t`id)-y7:1167609600   /sec since Mon 2007.01.01 00:00:00
year:2007+sy\(86400*0=4/y)+sy*y:date%sy:31563000  /ignore leap
day: date%24*60*60
week:day %7
hms: +60 60 60\\_3600*      /hour min sec from time(h)

avg:{(+/x)%#x}
med:  **|2^^

utf:{(&x>-65)^x}
blk:utf" ▁▂▃▄▅▆▇█" 
hist:{[d];n:_8*n-m:_n:(15*x)%|/x:0.+.d;
 `<"\n"/:,/'blk@|+{(x#8),((!8)y),&15-x}'[m;n]}

/triathlon by definition swim then bike then run within one day
tri:i@&((day 2+i)=day i)&(`r=type 2+i)&(`b=type 1+i)&i:&`s=type


pace:60*(time r)%dist r   /min/km

/pace histogram 0..12:50 min/km
p:0|(#'=(xp:6.\!78)'pace)@!78
/jn:{,/x,\:"\n"}
/x:`<jn@|+15#'(p#\:"#"),\:_32+&15
/x:`<jn@,/'$10 10 6\\!78
hist(!78)!p


/yearly totals
/ (+/`time`dist#)'t@=year

/amount of gps data
/ `points`mb!(p;8*(p:+/t`coords)%1024*1024.)

/when did the total distance exceed 100k?
/ *(`year`week`day#t)@&100000<+\dist

/long rides per year
/ #'=year@&200<dist

/fastest 10k/half/marathons
/ hms@^(time r)@&9.9<dist r
/ hms@^(time r)@&21<dist r
/ hms@^(time r)@&42<dist r

/rest days per year
/ +/'(0|-1+-':d)@=year

/knockouts (more than 6 offdays in a row)
/ +/'((6<rd)*rd:0|-1+-':d)@=year

/distance histogram
/ ,/'$!6 10   /..

