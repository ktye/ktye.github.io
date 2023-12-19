package main

import . "github.com/ktye/wg/module"

func main() {
	minit(12, 16) //4096
}

func minit(a, b int32) int32 {
	SetI32(4*a, 4096)
	return I32(48)
}

