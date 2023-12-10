package main

import . "github.com/ktye/wg/module"

func main() {
	st1(3, 4)
	st1(2, 5)
	ld4(2) //1029
}
func st1(a, v int32) {
	SetI8(a, v)
}
func ld4(a int32) int32 { return I32(a) }
