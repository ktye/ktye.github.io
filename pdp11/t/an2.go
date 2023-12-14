package main

func main() {
	an2(13) //-13
}
func an2(x int32) int32 {
	if x > 20 && x < 50 {
		x = 1 + x
	}
	return -x
}
