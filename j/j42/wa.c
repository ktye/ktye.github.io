#ifdef WASM

#include"wa.h"

int memcmp(const void *vl, const void *vr, size_t n){
 const unsigned char *l=vl, *r=vr;
 for (; n && *l == *r; n--, l++, r++);
 return n ? *l-*r : 0;
}
int strcmp(const char *l, const char *r){
 for (; *l==*r && *l; l++, r++);
 return *(unsigned char *)l - *(unsigned char *)r;
}
void *memchr(const void *src, int c, size_t n){
 const unsigned char *s = src;
 c = (unsigned char)c;
 for (; n && *s != c; s++, n--);
 return n ? (void *)s : 0;
}
size_t strlen(const char *s){
 const char *a = s;
 for (; *s; s++);
 return s-a;
}
char *strchr(const char *s, int c){
 do{ if(*s == c){return (char*)s;} }while(*s++); return 0;
}
char *strcpy(char *d, const char *s){int i;
 for(i=0;;i++){d[i]=s[i];if(s[i]==0)break;}
 return d;
}
size_t strspn(const char *s1, const char *s2){
 const char *s = s1;
 const char *c;
 while(*s1){
  for (c = s2; *c; c++){
   if (*s1==*c)break;
  }
  if (*c=='\0')break;
  s1++;
 }
 return s1-s;
}
int clock(void){ return 0; }
void exit(int x){ }
int system(char *s){ return 1; }

#endif
