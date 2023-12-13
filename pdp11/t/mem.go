package main

import . "github.com/ktye/wg/module"

func main() {
	SetI64(1000, int64(123456789123)) //482253082 0
	mem(1001, 2000, 8)
}
func mem(x, y, n int32) int64 {
	Memorycopy(x, y, n)
	return I64(2000)
}
