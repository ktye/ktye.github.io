package main

func main() {
	an1(13) //-13
}
func an1(x int32) int32 {
	if x < 20 && x == 0 {
		x = 2 * x
	}
	return -x
}
