package main

func main() {
	slp(3) //1
}
func slp(x int32) int32 {
	for x > 1 {
		x--
		continue
	}
	return x
}