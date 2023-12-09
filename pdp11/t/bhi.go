package main

func main() {
	bhi(-5) //10
}
func bhi(x int32) int32 {
	if uint32(x) > 3 {
		x = x * 2
	}
	if x > 3 {
		x = x * 3
	}
	return -x
}
