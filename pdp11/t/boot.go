package main

import (
	. "github.com/ktye/wg/module"
	"os"
)

func kwrite(){ os.WriteFile("k.img", Bytes, 0744); os.Exit(0) }
func kload() {
	b, e := os.ReadFile("k.img")
	if e != nil {
		panic(e)
	}
	copy(Bytes, b)
}
