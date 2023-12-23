package main

func main() {
	re1(0) //10
}

func re1(x int32) int32 {
	for x < 1000 {
		no(x)
		x++
	}
	return x
}

func no(x int32) { x = 1-x }
