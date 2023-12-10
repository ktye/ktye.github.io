package main

import . "github.com/ktye/wg/module"

func main() {
	f(2) //-1
}
func f(x int32) int32 {
	SetI32(x,255)
	return I8(x) //-1
}
