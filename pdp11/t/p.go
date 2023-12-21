//append to g.go
func P(f string, x interface{}){
 if x == nil {
  fmt.Printf("%s\n", f)
  return
 }
 if reflect.TypeOf(x).Kind() == reflect.Int32{
  i, io := x.(int32)
  t, it := x.(T)
  if io {
   fmt.Printf("%s %d\n", f, i)
  } else if it {
   fmt.Printf("%s %d\n", f, t)
  } else {
   fmt.Printf("%s %T\n", f, x)
   panic(f)
  }
 }else{
  k, ik := x.(K)
  u, uk := x.(uint64)
  if ik {
   fmt.Printf("%s %d %d\n", f, int32(k), int32(k>>32))
  }else if uk{
   fmt.Printf("%s %d %d\n", f, int32(u), int32(u>>32))
  }else{
   fmt.Printf("%s %T\n", f, x)
   panic(f)
  }
}}
func setI32(x, y int32) {
 fmt.Printf("SetI32 %d %d\n", x, y)
 SetI32(x,y)
}
func setI64(x int32, y int64) {
 //	if x == 5176 { panic("set5176") }
 fmt.Printf("SetI64 %d %d %d\n", int32(x), int32(y), int32(y>>32))
 SetI64(x, y)
}
func getI32(x int32) int32 {
 r := I32(x) 
 fmt.Printf("I32 %d %d\n", x, r)
 return r
}
func getI64(x int32) int64 {
 r := I64(x)
 fmt.Printf("I64 %d %d %d\n", x, int32(r), int32(r>>32))
 return r
}
