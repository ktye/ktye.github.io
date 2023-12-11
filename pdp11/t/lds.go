package main

import . "github.com/ktye/wg/module"

func main() {
	sto(4, 3)
	lod(4) //-4293732861: 1234435 -1
}
func sto(a, v int32) {
	SetI64(a, int64(-1))
	SetI32(a, 1234567)
	SetI8(a, v)
}
func lod(a int32) int64 { return I64(a) }
