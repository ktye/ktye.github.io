/* ----------------------------------------------------------------------- */
/* J-Source Version 4.1 - COPYRIGHT 1992 Iverson Software Inc.             */
/* 33 Major Street, Toronto, Ontario, Canada, M5S 2K9, (416) 925 6096      */
/*                                                                         */
/* J-Source is provided "as is" without warranty of any kind.              */
/*                                                                         */
/* J-Source Version 4.1 license agreement:  You may use, copy, and         */
/* modify the source.  You have a non-exclusive, royalty-free right        */
/* to redistribute source and executable files.                            */
/* ----------------------------------------------------------------------- */
/*                                                                         */
/* Type Definitions                                                        */


#define U unsigned

typedef char   B;
typedef char   C;
typedef U char UC;
typedef short  S;
typedef long   I;
typedef double D;
typedef struct {D re,im;} Z;

typedef struct {I t,c,n,r,s[1];} *A;
typedef A(*AF)();
typedef B(*SF)();

typedef struct {I type;AF f1,f2;UC mr,lr,rr,inv;} P;   /* primitive symbols   */
typedef struct {A name,val;} SY;                       /* symbol table entry  */
typedef struct {AF f1,f2;A f,g,h;I mr,lr,rr;C id;} V;  /* verb value layout   */

#if !(SYS & SYS_MACINTOSH)
typedef void* Ptr;
#endif

#if (SYS & SYS_PC+SYS_MACINTOSH)        /* for use by the session manager  */
typedef S SI;
#else
typedef I SI;
#endif

/* Layout of type A                                                        */
/*                                                                         */
/* t      Type.  One of the defined constants below.                       */
/* c      Reference count.                                                 */
/* n      Number of elements in the ravel of the array.                    */
/* r      Rank.                                                            */
/* AS(s)  Pointer to the first element of shape vector.                    */
/* AV(a)  Pointer to the first array element.                              */

#define AT(a)           ((a)->t)
#define AC(a)           ((a)->c)
#define AN(a)           ((a)->n)
#define AR(a)           ((a)->r)
#define AH              4L              /* # header words in A             */
#define AS(a)           ((a)->s)
#define AV(a)           ((I*)(a)+AH+AR(a))  /* (AH+AR(a)+(I*)(a)) bombs SGI */
#define VAV(f)          ((V*)AV(f))
#define ID(f)           (VAV(f)->id)

#define BOOL            1L
#define CHAR            2L
#define INT             4L
#define FL              8L
#define CMPX            16L             /* complex                      */
#define BOX             32L
#define VERB            64L             /* verb                         */
#define ADV             128L            /* adverb                       */
#define CONJ            256L            /* conjunction                  */
#define NAME            512L            /* pronoun                      */
#define LPAR            1024L           /* left  parenthesis            */
#define RPAR            2048L           /* right parenthesis            */
#define ASGN            4096L           /* assignment                   */
#define MARK            8192L           /* end-of-stack marker          */
#define SYMB            16384L          /* symbols table                */
#define ANY             -1L
#define NUMERIC         (BOOL+INT+FL+CMPX)
#define NOUN            (NUMERIC+CHAR+BOX)
#define FUNC            (VERB+ADV+CONJ)
#define RHS             (NOUN+FUNC)

#define IS1BYTE         (BOOL+CHAR+NAME)
#define HOMO(at,wt)     (at==wt || at&NUMERIC&&wt&NUMERIC)
#define FILL(t)         ((t)&NUMERIC ? (C*)&zeroZ : (t)&CHAR?"        ":(C*)&mtv)

#if (SYS & SYS_MACINTOSH)
#define WP(t,n,r)       (1+AH+r+((n)*bp(t)+!!(IS1BYTE&t)+3)/4)
#else
#define WP(t,n,r)       (  AH+r+((n)*bp(t)+!!(IS1BYTE&t)+3)/4)
#endif
