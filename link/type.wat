(module
 (import "ext" "memory" (memory 0))
 (import "ext" "tp" (func $tp (param i64) (result i32)))
 (func (export "type") (param i64) (result i64)
  local.get 0
  call $tp
  i64.extend_i32_u
  i64.const 3
  i64.const 59
  i64.shl
  i64.or
 )
)
