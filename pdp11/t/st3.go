package main

import . "github.com/ktye/wg/module"

func main() {
	st3(56) //16384
}
func st3(x int32) int32 {
	SetI32(x, 16384)
	return I32(x)
}
