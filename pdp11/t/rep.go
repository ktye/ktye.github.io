package main

import . "github.com/ktye/wg/module"

func main() {
	rep(8)
}
func rep(a int32) int32 {
	n := ReadIn(a, 16)
	Write(0, 0, a, n)
	return n
}
