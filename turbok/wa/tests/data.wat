(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 local.get 0
 i32.load)
(data (i32.const 4) "\01\02\03\04\05\06\07\08")
(data (i32.const 20) "\de\ad\be\af"))