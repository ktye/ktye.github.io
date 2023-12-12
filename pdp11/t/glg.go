package main

var nai int32 = -2147483648
var abc uint64 = 123456789123456

func main() {
	f(uint64(1)) //123456789123456: -2045800064 28744
}
func f(x uint64) uint64 {
	x = abc
	return x
}
