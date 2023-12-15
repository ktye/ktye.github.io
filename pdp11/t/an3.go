package main

func main() {
	an3(13) //-26
}
func an3(x int32) int32 {
	if x > 2 && x < 20 {
		x = 2 * x
	}
	return -x
}
