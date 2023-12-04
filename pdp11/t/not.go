package main

import . "github.com/ktye/wg/module"

func main() {
	f(1, 2)
}
func f(x, y int32) int32 {
	return I32B(!(x == y))
}
