#ifdef WASM

#include<stddef.h> /* size_t */

#define time_t int
#define FILE int
#define fabs __builtin_fabs
#define stdin 0
#define stdout 1

extern void jstime(int*); /* see DF1(ts) */


#endif
