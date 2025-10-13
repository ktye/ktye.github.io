pmov:{[x;y]q:(n:#y)#0;m:!0
 q0:{[i]q[i]:1;r:2,i,,/{0,j x}'&x[i]=y j:|!n ;r}
 q1:{[i]m,:-1,y i;y[i]:-1;!0}
 g0:{[i]$[q i;q1 i;q0 i]}
 g1:{[i]m,:x[i],y[i];q[i]:2;!0}
 f:{[i]s:0,i;while[0>l:-1+#s;g:s l-1;i:s l;s:-2_s;$[x[i]~y i;0;s,:$[g;g0 i;g1 i]]]}
 {$[q x;0;f x]}'!n;m}
