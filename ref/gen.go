package main

import (
	"bufio"
	"fmt"
	"html"
	"os"
)

func main() {
	fmt.Println(head)
	var block []string
	s := bufio.NewScanner(os.Stdin)
	var id = 0
	writeBlock := func() {
		if block == nil {
			return
		}
		fmt.Printf("<pre class=\"a\" id=\"a%d\">", id)
		for _, s := range block {
			fmt.Println(s)
		}
		fmt.Print("</pre>\n")
		block = nil
		id++
	}
	for s.Scan() {
		t := s.Text()
		if len(t) == 0 {
			continue
		}
		if t[0] == '\t' {
			block = append(block, html.EscapeString(t[1:]))
		} else {
			writeBlock()
			fmt.Printf("<pre onclick=\"toggle(%d)\">", id)
			fmt.Println(html.EscapeString(t) + "</pre>")
		}
	}
	writeBlock()
	fmt.Println(tail)
}
func fatal(e error) {
	if e != nil {
		panic(e)
	}
}

const head = `<html><body>
<style>
.a { display:none; background:#999 }
pre{ margin:0 }
</style>
<script>
function toggle(x) {
	var e = document.getElementById("a"+x)
	e.style.display = (e.style.display=="block") ? "none" : "block"
	console.log("toggle!")
}
</script>
`
const tail = `</body></html>`
