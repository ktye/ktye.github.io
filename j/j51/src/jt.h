/* ----------------------------------------------------------------------- */
/* J-Source Version 5.1 - COPYRIGHT 1992 Iverson Software Inc.             */
/* 33 Major Street, Toronto, Ontario, Canada, M5S 2K9, (416) 925 6096      */
/*                                                                         */
/* J-Source is provided "as is" without warranty of any kind.              */
/*                                                                         */
/* J-Source Version 5.1 license agreement:  You may use, copy, and         */
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
typedef struct {A k,v;} K;

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

#if (SYS_DOUBLE)
#define AV(a)           ((I*)(a)+AH+AR(a)+(1&AR(a)))
#else
#define AV(a)           ((I*)(a)+AH+AR(a)) /* (AH+AR(a)+(I*)(a)) bombs SGI */
#endif

#define VAV(f)          ((V*)AV(f))
#define ID(f)           (VAV(f)->id)

#define BOOL            1L              /* B  Boolean                      */
#define CHAR            2L              /* C  literal (character)          */
#define INT             4L              /* I  integer                      */
#define FL              8L              /* D  floating point (double)      */
#define CMPX            16L             /* Z  complex                      */
#define BOX             32L             /* A  boxed                        */
#define BOXK            64L             /* K  box with key                 */
#define VERB            128L            /* V  verb                         */
#define ADV             256L            /* V  adverb                       */
#define CONJ            512L            /* V  conjunction                  */
#define NAME            1024L           /* C  pronoun                      */
#define LPAR            2048L           /* I  left  parenthesis            */
#define RPAR            4096L           /* I  right parenthesis            */
#define ASGN            8192L           /* I  assignment                   */
#define MARK            16384L          /* I  end-of-stack marker          */
#define SYMB            32768L          /* SY symbol table                 */

#define ANY             -1L
#define NUMERIC         (BOOL+INT+FL+CMPX)
#define NOUN            (NUMERIC+CHAR+BOX+BOXK)
#define FUNC            (VERB+ADV+CONJ)
#define RHS             (NOUN+FUNC)
#define IS1BYTE         (BOOL+CHAR+NAME)

#if (SYS_DOUBLE)
#define WP(t,n,r)       (1+AH+r+((n)*bp(t)+!!(IS1BYTE&t)+3)/4)
#else
#define WP(t,n,r)       (  AH+r+((n)*bp(t)+!!(IS1BYTE&t)+3)/4)
#endif


#if (SYS & SYS_PC+SYS_MACINTOSH)        /* for use by the session manager  */
typedef S SI;
#else
typedef I SI;
#endif

#if !(SYS & SYS_MACINTOSH)
typedef void* Ptr;
#endif

typedef A(*AF)();
typedef void(*SF)();

typedef struct {I type;AF f1,f2;UC mr,lr,rr,inv;} P;
typedef struct {A name,val;} SY;
typedef struct {AF f1,f2;A f,g,h;I mr,lr,rr;C id;} V;


typedef struct {SF f;I cv;} VA2;
typedef struct {C id,bf;VA2 fcv[6];} VA;

#define V0000           0               /* bf - boolean function           */
#define V0001           1
#define V0010           2
#define V0011           3
#define V0100           4
#define V0101           5
#define V0110           6
#define V0111           7
#define V1000           8
#define V1001           9
#define V1010           10
#define V1011           11
#define V1100           12
#define V1101           13
#define V1110           14
#define V1111           15

#define VBB             1L              /* argument type B                 */
#define VII             2L              /* argument type I                 */
#define VDD             4L              /* argument type D                 */
#define VZZ             8L              /* argument type Z                 */
#define VB              16L             /* result   type B                 */
#define VI              32L             /* result   type I                 */
#define VD              64L             /* result   type D                 */
#define VZ              128L            /* result   type Z                 */
#define VRD             256L            /* convert result to D             */
#define VRI             512L            /* convert result to I             */
#define VRJ             1024L           /* convert result to I from Z      */
#define VASS            2048L           /* associative                     */
