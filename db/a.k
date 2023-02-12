/ t(table)                               press shift-enter to execute
/  `id    :start time, unix seconds      (uncomment examples)
/  `type  :r|b|s
/  `year  :2008..
/  `week  :0..52
/  `day   :0..6 (mon..sun)
/  `time  :hours
/  `dist  :km
/  `coords:#gps points

type:t`type;year:t`year;week:t`week;day:t`day;time:t`time;dist:t`dist
r:&`r=type /run
b:&`b=type /bike
y8:1199145600           /01 Jan 2008 00:00:00
d:(24*60*60)\(t`id)-y8  /day number
t:t,'+`d!,d             /add monotonic day column (,' is optmized)
hms:+60 60 60\\_3600*   /hour min sec from time(h)
t

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

