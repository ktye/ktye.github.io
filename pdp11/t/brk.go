package main

func main() {
	brk(4) //2
}
func brk(x int32) int32 {
	for x > 0 {
		if x == 2 {
			break
		}
		x--
	}
	return x
}
