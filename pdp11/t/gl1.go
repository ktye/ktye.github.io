package main

var nai int32 = -2147483648
var abc int32

func main() {
	f(nai) //-2147483648
}
func f(x int32) int32 {
	abc = x
	return abc
}
