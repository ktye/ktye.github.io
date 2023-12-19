package main

import . "github.com/ktye/wg/module"

func main() {
	minit(12, 16) //16384
}

func minit(a, b int32) int32 {
        p := int32(1 << a)
        for a < b {
                SetI32(4*a, p)
                SetI32(p, 0)
                p *= 2
                a++
        }
        SetI32(128, b)
	return I32(56)
}

