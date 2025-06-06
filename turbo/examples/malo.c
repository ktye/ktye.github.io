void*malloc(int n);
void expect(int a,int b);

/* malloc bump allocates 8byte aligned memory
   and grows the initial 64k buffer if necessary.
   there is no free() equivalent.
   more sophisticated memory allocators can be built on top */

void test(){
 expect(0,malloc(5));
 expect(8,malloc(2));
 expect(16,malloc(0));
 expect(16,malloc(0));
}
