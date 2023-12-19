package main

func main() {
	bge(15, 15) //3
}
func bge(x, y int32) int32 {
	if x >= y {
	 	if -x >= y {
			return 3
		}
		return 5
	}
	return 4
}

