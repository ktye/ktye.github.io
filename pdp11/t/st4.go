package main

import . "github.com/ktye/wg/module"

func main() {
	st4(56) //16384
}
func st4(x int32) int32 {
 	i := int32(0)
	for i < 1 {
		SetI32(x, 16384)
		i++
	}
	return I32(x)
}
