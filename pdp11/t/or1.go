package main

func main() {
	or1(13) //26
}
func or1(x int32) int32 {
	if x < 20 || x == 0 {
		x = 2 * x
	}
	return x
}
