//printf must be imported with a fixed signature:
int printf(int x,long int y);

/* 
  it needs a single argument after the format string.
  the argument is converted to long int automatically,
  except for floats, that keeps the bit pattern.

  only the following format strings are recognized by the
  runtime and replaced:
*/

int main(int x){
 char*s;
 s="abc";
 printf("integer: %d\n",3);
 printf("long:    %ld\n",-1l);
 printf("unsigned:%u\n",-2);
 printf("ulong:   %lu\n",-5l);
 printf("hex:     %x\n",-12345l);
 printf("longhex: %lx\n",-12456l);
 printf("string:  %s\n", s);
 printf("double:  %lf\n", -3.14);
 printf("float:   %f\n", 3.14f);
 return 0;
}
