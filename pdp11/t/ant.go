package main

func main() {
	ant(0x234567, 0xb2c3d4) //66595
}
func ant(x, y uint32) uint32 { return x &^ y }

