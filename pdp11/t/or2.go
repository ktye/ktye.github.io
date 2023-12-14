package main

func main() {
	or2(13) //14
}
func or2(x int32) int32 {
	if x < 0 || x < 20 {
		x = 1 + x
	}
	return x
}
