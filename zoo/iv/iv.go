package main

import (
	"bytes"
	"syscall/js"

	"github.com/ktye/iv/apl"
	"github.com/ktye/iv/apl/big"
	"github.com/ktye/iv/apl/numbers"
	"github.com/ktye/iv/apl/operators"
	"github.com/ktye/iv/apl/primitives"
)

var a *apl.Apl

func main() {
	a = newApl()
	c := make(chan bool)
	js.Global().Set("ivEval", js.FuncOf(ivEval))
	<-c
}

func newApl() *apl.Apl {
	a := apl.New(nil)
	numbers.Register(a)
	big.Register(a, "")
	primitives.Register(a)
	operators.Register(a)
	return a
}

func ivEval(this js.Value, in []js.Value) interface{} {
	var buf bytes.Buffer
	a.SetOutput(&buf)
	if err := a.ParseAndEval(in[0].String()); err != nil {
		return err.Error()+"\n"
	}
	return string(buf.Bytes())
}
