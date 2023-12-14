package main

func main() {
	or3(13) //26
}
func or3(x int32) int32 {
	if x > 20 || x < 0 {
		x = 2 * x
	}
	return -x
}
