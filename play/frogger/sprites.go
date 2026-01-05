package main

import (
	"os"
	"fmt"
	"strings"
	"strconv"
	"bytes"
	"image"
	"image/png"
)

var palette []uint32
var img []uint8
var w, h int
func do(file string) {
	palette = make([]uint32, 0)
	img = make([]uint8, 0)
	if !strings.HasSuffix(file,".png") {
		fmt.Println(file, "must end with .png")
		os.Exit(1);
	}
	b, e := os.ReadFile(file)
	fatal(e)
	m, e := png.Decode(bytes.NewReader(b))
	fatal(e)
	hist(m)

	out(file[:len(file)-4])
}
func rle(b string) (r string) {
	r = b[:1]
	n := 0
	for i := 1; i<len(b); i++ {
		c := b[i]
		if c == b[i-1] {
			n++
		} else {
			if n > 0 {
				r += strconv.Itoa(n)
				n = 0
			}
			r += string(c)
		}
	}
	if n > 0 {
		r += strconv.Itoa(n)
	}
	return r
}
func out(file string) {
	alpha := []byte("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]byte, len(img))
	for i, c := range img {
		b[i] = alpha[int(c)]
	}
	s := rle(string(b))
	fmt.Printf("pa=[",)
	for _, c := range palette {
		fmt.Printf("%d,", c)
	}
	fmt.Printf("]\n")
	fmt.Printf("%s=sprite(%d,%d,\"%s\")\n", file, w, h, s)
}
func find(c uint32) uint8 {
	for i := range palette {
		if c == palette[i] {
			return uint8(i)
		}
	}
	return 255
}
func hist(m image.Image) {
	b := m.Bounds()
	w, h = b.Max.X, b.Max.Y
	for j := range b.Max.Y {
		for i := range b.Max.X {
			r, g, b, a := m.At(i,j).RGBA()
			R := uint8(r>>8)
			G := uint8(g>>8)
			B := uint8(b>>8)
			if a != 0xffff {
				panic("alpha")
			}
			c := (uint32(B)<<16)|(uint32(G)<<8)|(uint32(R))
			i := find(c)
			if i == 255 {
				i = uint8(len(palette))
				palette = append(palette, c)
			}
			img = append(img, i)
		}
	}
}
func main() {
	for _, a := range os.Args[1:] {
		do(a)
	}
}
func fatal(e error) {
	if e != nil {
		fmt.Println(e)
		os.Exit(1)
	}
}
