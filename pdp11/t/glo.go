package main

var nai int32 = -2147483648
var abc int32
var xyz uint64

func main() {
	f(nai) //2147483635
}
func f(x int32) int32 {
	abc = x
	return -13 + abc
}
