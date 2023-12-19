package main

func main() {
	blt(15, 15) //3
}
func blt(x, y int32) int32 {
	if x < y {
		return 3
	}
	if -x < y {
		return 5
	}
	return 4
}

