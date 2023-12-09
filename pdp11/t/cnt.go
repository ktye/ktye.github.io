package main

func main() {
	cnt(4) //-98
}
func cnt(x int32) int32 {
	for x > 0 {
		x--
		if x > 2 {
			continue
		}
		x = x - 100;
	}
	return x
}
