package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

var F http.Handler

func main() {
	if len(os.Args) == 2 {
		F = http.FileServer(http.Dir(os.Args[1]))
	} else {
		F = http.FileServer(http.Dir("."))
	}
	//http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/", handle)
	fmt.Println(http.ListenAndServe(":3000", nil))
}

func handle(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		fmt.Println("POST:", r.URL.Path)
		io.Copy(os.Stdout, r.Body)
		os.Stdout.Write([]byte{10})
	} else {
		F.ServeHTTP(w, r)
	}
}
