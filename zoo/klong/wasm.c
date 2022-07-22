#include "wasm.h"

void bye(int x){printf("exit %d\n", x); __builtin_unreachable(); }
int abs(int x){return (x<0)?-x:x; }
long int labs(long int x){return (x<0)?-x:x;}
int fflush(FILE *f){ return 0; };
int fclose(FILE *f){ return 0; };
void clearerr(FILE *f){};
int tolower(int x){return isupper(x)?32+x:x;}
int isdigit(int x) { return x >= '0' && x <= '9'; }
int isupper(int x) { return x >= 'A' && x <= 'Z'; }
int islower(int x) { return x >= 'a' && x <= 'z'; }
int isalpha(int x) { return isupper(x) || islower(x); }
size_t strlen(const char *s){
 const char *a = s;
 for (; *s; s++);
 return s-a;
}
int memcmp(const void *vl, const void *vr, size_t n){
 const unsigned char *l=vl, *r=vr;
 for (; n && *l == *r; n--, l++, r++);
 return n ? *l-*r : 0;
}
int strcmp(const char *l, const char *r){
 for (; *l==*r && *l; l++, r++);
 return *(unsigned char *)l - *(unsigned char *)r;
}
int strncmp(const char *_l, const char *_r, size_t n) { //musl
 const unsigned char *l=(void *)_l, *r=(void *)_r;
 if (!n--) return 0;
 for (; *l && *r && n && *l == *r ; l++, r++, n--);
 return *l - *r;
}
char *strcpy(char *d, const char *s){
 for(int i=0;;i++){d[i]=s[i];if(s[i]==0)break;}
 return d;
}
char *strncpy(char *dst, const char *src, size_t n){
	if((int)n<0) __builtin_trap();

	for(int i=0;i<n;i++){
		if(src[i]==0){
			memset(dst+i, 0, n-i);
			return dst;
		}
		dst[i]=src[i];
	}
	return dst;
}
char *strcat(char *restrict dest, const char *restrict src){
 strcpy(dest + strlen(dest), src);
 return dest;
}
char *strchr(const char *s, int c){ do{ if(*s == c){return (char*)s;} }while(*s++); return 0; }
/*
void *memchr(const void *src, int c, size_t n){
 const unsigned char *s = src;
 c = (unsigned char)c;
 for (; n && *s != c; s++, n--);
 return n ? (void *)s : 0;
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
void *realloc(void *ptr, size_t n){
 void *r=malloc(n);
 memcpy(r,ptr,n); 
 free(ptr);
 return r;
}
*/
char *strcati(char *s, int i){
 char b[32];
 itoa(i, b, 10);
 s[0] = '\0';
 return strcat(s, b);
}
void reverse(char s[]){
 int i, j;
 char c;
 for (i = 0, j = strlen(s)-1; i<j; i++, j--){
  c = s[i];
  s[i] = s[j];
  s[j] = c;
 }
}
void itoa(int n, char s[], int radix){
 int i, sign;
 if ((sign = n) < 0) n = -n;
 i = 0;
 do { s[i++] = n % 10 + '0'; } while ((n /= 10) > 0);
 if (sign < 0) s[i++] = '-';
 s[i] = '\0';
 reverse(s);
}
char *getenv(const char *name) { return NULL; }
int atoi(const char *s){
 int r = 0;
 for (int i = 0; s[i] != '\0'; ++i) r = r * 10 + s[i]-'0';
 return r;
}

// https://android.googlesource.com/platform/bionic/+/ics-mr0/libc/string/strtok.c (BSD)
char *strtok_r(char *s, const char *delim, char **last){
	char *spanp;
	int c, sc;
	char *tok;
	if (s == NULL && (s = *last) == NULL)
		return (NULL);
cont:
	c = *s++;
	for (spanp = (char *)delim; (sc = *spanp++) != 0;) {
		if (c == sc)
			goto cont;
	}
	if (c == 0) {
		*last = NULL;
		return (NULL);
	}
	tok = s - 1;
	for (;;) {
		c = *s++;
		spanp = (char *)delim;
		do {
			if ((sc = *spanp++) == c) {
				if (c == 0)
					s = NULL;
				else
					s[-1] = 0;
				*last = s;
				return (tok);
			}
		} while (sc != 0);
	}
}
char *strtok(char *s, const char *delim){
	static char *last;
	return strtok_r(s, delim, &last);
}

int printf(const char *fmt, ...){
 int r;
 va_list ap;
 va_start(ap, fmt);
 r=vfprintf(stdout,fmt,ap);
 va_end(ap);
 return r;
}
int fprintf(FILE *f, const char *fmt, ...){
 int r;
 va_list ap;
 va_start(ap, fmt);
 r=vfprintf(f,fmt,ap);
 va_end(ap);
 return r;
}