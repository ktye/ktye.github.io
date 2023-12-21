package main

func main() {
	bh1(1, 0) //5
}
func bh1(n, i int32) int32 {
	if uint32(i) >= uint32(n) {
		return 10
	}
	return 5
}
