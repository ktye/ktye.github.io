package main

func main() {
	bgt(15, 15) //3
}
func bgt(x, y int32) int32 {
	if x > y {
		return 3
	}
	if 1+x > y {
		return 5
	}
	return 4
}

