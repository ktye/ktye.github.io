package main

func main() {
	//  lo      hi (octal)
	//a 112107  3
	//b 2017    177766
	//c 146051  41700 //a*b
	f(234567,-654321) //1136708649
}
func f(x, y int32) int32 {
	return x*y
}
