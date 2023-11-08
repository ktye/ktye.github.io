package main

// assemble
//   as11 movb #153,@#177566
// disassemble
//   as11 0112737 0153 0177566

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"rsc.io/unix/pdp11"
)

func main() {
	s := strings.Join(os.Args[1:], " ")

	//numbers: disassemble
	if s[0] >= '0' && s[0] <= '9' {
		v := strings.Split(s, " ")
		u := make([]uint16, len(v))
		for i := range v {
			x, e := strconv.ParseUint(v[i], 8, 16)
			fatal(e)
			u[i] = uint16(x)
		}
		disasm(u)
		return
	}

	//text: assemble
	v, e := pdp11.Asm(0, s)
	if e != nil {
		fmt.Println(e)
	} else {
		for _, x := range v {
			fmt.Printf("0%o ", x)
		}
		fmt.Println()
	}
}

func disasm(u []uint16) {
	var cpu pdp11.CPU
	mem := new(pdp11.ArrayMem)
	cpu.Mem = mem
	const basePC = 0o010000
	for i := range mem {
		mem[i] = 0o375
	}
	for i, c := range u {
		cpu.Mem.WriteW(basePC+2*uint16(i), c)
	}
	asm, _, e := cpu.Disasm(basePC)
	fatal(e)
	fmt.Println(asm)
}
func fatal(e error) {
	if e != nil {
		fmt.Println(e)
		os.Exit(1)
	}
}

var cpu pdp11.CPU

func init() {
	mem := new(pdp11.ArrayMem)
	cpu.Mem = mem
}
