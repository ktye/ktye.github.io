/golub-kahan-lanczos

bi:{n:#x;xt:+conj x;A:B:U:V:()
 b:0.;v:@[0a+&n;0;1a];u:0a+&n
 while[n>#U
  V,:,v
  u:(x(+/*)\v)-b*u
  A,:a:abs/u
  U,:,u%:a
  v:(xt(+/*)\u)-a*v
  B,:b:abs/v
  v%:b]
 (U;V)
}
