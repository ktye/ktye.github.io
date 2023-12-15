package main

import . "github.com/ktye/wg/module"

func main() {
	SetI32(8, 1635018082)
	wrt(4)
}
func wrt(n int32) int32 {
	return Write(0, 0, 8, n)
}
