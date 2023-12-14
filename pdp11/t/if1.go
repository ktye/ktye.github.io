package main

func main() {
	if1(13) //26
}
func if1(x int32) int32 {
	if x < 20 && x > 3 {
		x = 2 * x
	}
	return x
}
