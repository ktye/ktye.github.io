package main

func main() {
	ret(13) //26
}
func ret(x int32) int32 {
	if x >= 5 {
		return 2*x
	} else {
		return 3*x
	}
	return -x
}
