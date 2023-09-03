/ race.csv,npb.csv,spiriev500,wr.csv,track.k

//.
d:800 1000 1500 1609 3000 5000 10000 21097 42195.
k:{x(*<x`time)}'`dist?race
t:(k d)`time
v:d%t
plot(log d)!v

npb:^npb
d:npb`dist
v:d%npb`time
plot(log d)!v

t:spiriev500
d:t`dist
v:d%t`time
plot(log d)!v

k:{x(*<x`rec)}'`dist?wr
d:!k
v:d%(.k)`rec
plot(log d)!v
