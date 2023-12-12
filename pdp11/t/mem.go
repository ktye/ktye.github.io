package main

import . "github.com/ktye/wg/module"

func main() {
	SetI64(1000, int64(123456789123))
	mem(1001, 2000, 8)
}
func mem(x, y, n int32) int32 {
	Memorycopy(x, y, n)
	return n
}

