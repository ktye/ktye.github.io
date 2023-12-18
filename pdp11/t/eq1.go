package main

func main() {
	eq1(int64(-1), int64(-1)) //13
}
func eq1(x, y int64) int32 {
	if x == y {
		return 13
	} else {
	 	return 14
	}
}
