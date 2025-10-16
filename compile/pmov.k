pmov:{[x;y;t]q:(n:#y)#0;m:!0
 q0:{[i]q[i]:1;r:2,i,,/0,'n-1+&x[i]=|y;r}
 q1:{[i]m,:t,y i;y[i]:t;!0}
 g0:{[i]((q0;q1;:)[q i])[i]}
 g1:{[i]m,:x[i],y[i];q[i]:2;!0}
 f:{[i]s:0,i;while[0<l:-1+#s;g:s l-1;i:s l;s:-2_s;$[x[i]~y i;0;s,:$[g;g1 i;g0 i]]]}
 {[i]$[~q i;f i;0]}'!n;m}
