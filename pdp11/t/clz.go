package main

import . "github.com/ktye/wg/module"

func main() {
	add(I32clz(100000), I32clz(13)) //43 (15+28)
}
func add(x, y int32) int32 {
	return x + y
}
