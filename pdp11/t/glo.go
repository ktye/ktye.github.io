package main

var nai int32 = -21474836
var abc int32
var xyz uint64

func main() {
	f(nai) //-42949685
}
func f(x int32) int32 {
	abc = nai + nai
	return -13 + abc
}
