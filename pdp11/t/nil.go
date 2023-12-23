package main

func main() {
	f(0) //3
}
func f(x int32) int32 {
	x = g()
	x = h()
	x = p()
	return x
}
func g() int32 { return 1 } 
func h() int32 { return 2 } 
func p() int32 { return 3 } 
