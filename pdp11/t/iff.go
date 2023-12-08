package main

func main() {
	iff(13) //-26
}
func iff(x int32) int32 {
	if x > -14 {
		x = 2*x
	}
	return -x
}
