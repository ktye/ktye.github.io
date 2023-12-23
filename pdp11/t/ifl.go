package main

func main() {
	f(100) //100
}
func f(x int32) int32 {
	i := int32(0)
	for i < x {
		if(i == 0) {
			i++
		}
		i++
	}
	return i
}
