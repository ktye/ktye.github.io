// go run mksrc.go dir/*.[hc] > dir/src.json
package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	p := make(map[string][]string)
	for _, s := range os.Args[1:] {
		b, e := os.ReadFile(s)
		fatal(e)
		p[filepath.Base(s)] = strings.Split(string(b), "\n")
	}
	fatal(json.NewEncoder(os.Stdout).Encode(p))
}
func fatal(e error) {
	if e != nil {
		panic(e)
	}
}
