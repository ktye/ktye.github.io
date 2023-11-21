package main

// assemble
//   as11 movb #153,@#177566
// disassemble
//   as11 0112737 0153 0177566
// run
//   as11 -r file  (text file with octal numbers)

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"rsc.io/unix/pdp11"
)

func main() {
	//run: -f file
	if len(os.Args) == 3 && os.Args[1] == "-r" {
		run(os.Args[2])
		return
	}

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
	const basePC = 0o01000
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

func run(file string) {
	b, e := os.ReadFile(file)
	fatal(e)
	v := strings.Split(string(b), "\n")
	c := make([]uint16, len(v))
	if len(v) > 0 && v[len(v)-1] == "" {
		v = v[:len(v)-1]
	}
	for i := range v {
		v[i] = strings.TrimSuffix(v[i], ",")
		j, e := strconv.ParseUint(v[i], 8, 16)
		fatal(e)
		c[i] = uint16(j)
	}

	cpu.R[7] = 0o01000
	for i := range c {
		cpu.Mem.WriteW(0o01000+2*uint16(i), c[i])
	}
	fmt.Println("   r0/r1    r2/r3     r4 r5(bp) r6(sp) r7(pc)  instruction")
	for i := 0; i < 1e3; i++ {
		printstate()
		e := cpu.Step(1)
		fatal(e)
	}
}
func printstate() {
	//u32 := func(a, b uint16) uint32 { return uint32(b)<<16 | uint32(a) }
	x, _ := cpu.Mem.ReadW(cpu.R[7])
	asm, _, _ := cpu.Disasm(cpu.R[7])
	//fmt.Printf("%8d %8d %06o %06o %06o %06o: %06o %s\n",
	fmt.Printf("[%5d %5d][%5d %5d] %06o %06o %06o %06o: %06o %s\n",
		cpu.R[0], cpu.R[1], cpu.R[2], cpu.R[3], cpu.R[4], cpu.R[5], cpu.R[6], cpu.R[7], x, asm)
}

var cpu pdp11.CPU

func init() {
	mem := new(pdp11.ArrayMem)
	cpu.Mem = mem
	cpu.PS = 0
	cpu.FPS = 0
}
