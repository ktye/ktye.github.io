package main

func main() {
	ife(13) //39
}
func ife(x int32) int32 {
	if x < 5 {
		x = 2*x
	} else {
		x = 3*x
	}
	return x
}
