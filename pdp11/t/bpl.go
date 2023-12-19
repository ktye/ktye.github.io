package main

func main() {
	bpl(15, -15) //3
}
func bpl(x, y int32) int32 {
 	if uint32(x) > uint32(3) {
		if uint32(y) > uint32(4) {
			return 3
		}
		return 4
	}
	return 5
}

