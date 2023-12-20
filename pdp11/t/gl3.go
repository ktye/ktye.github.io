package main

var a int32
var xyz int64

func main() {
	f(3) //16
}
func f(x int32) int64 {
	xyz = int64(x)
	xyz = g(17, h(xyz, 4))
	return xyz
}
func g(x, y int32) int64       { return int64(x + y) }
func h(x int64, y int32) int32 { return int32(x) - y }
