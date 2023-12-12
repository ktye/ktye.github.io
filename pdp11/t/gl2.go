package main

var nai int32 = -2147483648

func main() {
	f(nai) //-2147483648
}
func f(x int32) int32 {
	return x
}
