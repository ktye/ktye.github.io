
package main

func main() {
	maxi(5, 3) //5
}
func maxi(x, y int32) int32 {
	if x > y {
		return x
	} else {
		return y
	}
}
//func bucket(size int32) int32 { return maxi(5, int32(32)-I32clz(15+size)) }
//import . "github.com/ktye/wg/module"
