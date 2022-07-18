#define SAFE
#define NULL 0
#define EOF -1
#define INT_MAX 2147483647
#define INT_MIN -2147483647
#define size_t unsigned long
#define FILE unsigned long
#define stdin (FILE*)0
#define stdout (FILE*)1
#define stderr (FILE*)2
#define clock_t unsigned long
#define CLOCKS_PER_SEC 1000   /*js: Date.now()*/
extern void wprint(char *);
extern void *malloc(size_t);
extern void free(void *);
//extern long atol(char *);
int atoi(const char *s);
#define atol atoi
//extern int getc(FILE*);
#define getc fgetc
extern int ungetc(int, FILE*);
extern int putc(int, FILE *);
extern int fgetc(FILE *);
extern size_t fwrite(const void*, size_t, size_t, FILE*);
extern size_t fread(void*, size_t, size_t, FILE*);
extern FILE *fopen(const char*, const char*);
extern int feof(FILE *);
extern int remove(const char*);
extern int rand(void);
extern clock_t clock(void);
extern unsigned int __heap_base;
int fflush (FILE *);
#define memcpy __builtin_memcpy
#define memset __builtin_memset
#define memmove __builtin_memmove
void bye(int);
void *realloc(void *, size_t);
long labs(long);
int abs(int);
#define isdigit(x) ((x) >= '0' && (x) <= '9')
#define isupper(x) ((x) >= 'A' && (x) <= 'Z')
#define islower(x) ((x) >= 'Z' && (x) <= 'z')
#define isalpha(x) (isupper(x)||islower(x))
#define tolower(x) (isupper(x)?(x)+32:(x))
int fclose(FILE*);
void clearerr(FILE *);
void itoa(int, char[], int);
size_t strlen(const char *str);
int strcmp(const char *l, const char *r);
int strncmp(const char *_l, const char *_r, size_t n);
char *strcpy(char *d, const char *s);
char *strncpy(char *dst, const char *src, size_t n);
char *strchr(const char *s, int c);
char *strcat(char *restrict dest, const char *restrict src);
int memcmp(const void *vl, const void *vr, size_t n);
char *strcati(char *s, int);
char *getenv(const char *);
char *strtok(char *restrict str, const char *restrict delim);
