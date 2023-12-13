package main

import . "github.com/ktye/wg/module"

func main() {
	SetI64(1000, int64(123456789123)) //-1097262461 28
	get(1000)
}
func get(x int32) int64 {
	return I64(1000)
}
