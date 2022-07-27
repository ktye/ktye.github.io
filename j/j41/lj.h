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
/* LinkJ:  Declarations and Definitions                                    */


typedef char B;
typedef char C;
typedef long I;
typedef struct {I t,c,n,r,s[1];} *A;
typedef A(*AF)();


 /* Fields of Type A */

#define AT(a)   ((a)->t)        /* Type.  One of the constants below.      */
#define AC(a)   ((a)->c)        /* Reference count.  Do not touch.         */
#define AN(a)   ((a)->n)        /* Number of elements.                     */
#define AR(a)   ((a)->r)        /* Rank (number of elements in the shape). */
#define AH      4L              /* Number of header words in A.            */
#define AS(a)   ((a)->s)        /* Ptr to the first element of the shape.  */
#define AV(a)   ((I*)(a)+AH+AR(a))  /* Ptr to the first array element.     */


 /* Values for AT(a) */

#define BOOL            1L      /* Boolean           B                     */
#define CHAR            2L      /* Character         C                     */
#define INT             4L      /* Integer           I                     */
#define FL              8L      /* Floating point    D                     */
#define CMPX            16L     /* Complex           Z                     */
#define BOX             32L     /* Boxed             void*                 */


 /* Event Codes */

#define EVBREAK         1       /* break                                   */
#define EVDEFN          2       /* defn error                              */
#define EVDOMAIN        3       /* domain error                            */
#define EVILNAME        4       /* ill-formed name                         */
#define EVILNUM         5       /* ill-formed number                       */
#define EVINDEX         6       /* index error                             */
#define EVFACE          7       /* interface error                         */
#define EVLENGTH        8       /* length error                            */
#define EVLIMIT         9       /* limit error                             */
#define EVNONCE         10      /* nonce error                             */
#define EVNOTASGN       11      /* not reassignable                        */
#define EVOPENQ         12      /* open quote                              */
#define EVRANK          13      /* rank error                              */
#define EVSPELL         14      /* spelling error                          */
#define EVSYNTAX        15      /* syntax error                            */
#define EVSYSTEM        16      /* system error                            */
#define EVVALUE         17      /* value error                             */
#define EVWSFULL        18      /* ws full                                 */

#define NEVM            18      /* number of event codes                   */


 /* Useful Definitions */

#define ASSERT(b,e)     {if(!(b)){jerr=e; R 0;}}
#define F1(f)           A f(y)A y;
#define F2(f)           A f(x,y)A x,y;
#define R               return
#define RZ(exp)         {if(!(exp))R 0;}


 /* External Declarations */

extern B asgn;
extern C jerr;

extern C jc();                  /* C jc(I,AF*,AF*);                        */
extern C jfr();                 /* C jfr(A);                               */
extern C jinit();               /* C jinit(void);                          */
extern A jma();                 /* A jma(I,I,I);                           */
extern A jpr();                 /* A jpr(A);                               */
extern A jset();                /* A jset(C*,A);                           */
extern A jx();                  /* A jx(C*);                               */
