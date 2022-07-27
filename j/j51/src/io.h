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
/* Input/Output                                                            */


#define JFOPEN          'o'
#define JFPRINT         'p'
#define JFPROF          'f'
#define JFSAVE          's'

typedef struct{I vol,type;C act,name[256];} JF;

extern JF              *jstf;

#if (!LINKJ && SYS & SYS_SESM)

#define MTYOUT          1
#define MTYOIN          2
#define NLOG            16348           /* size of session log             */
#define NINB            224             /* size of type-ahead buffer       */
#define NFKD            5               /* size of fn key defn buffer      */
#define NEDB            12000           /* size of edit buffer             */
#define NWINB           10000           /* size of MS Windows AP buffer    */

#if (SYS & SYS_PC)
extern C*               edbuf;
#endif

#if (SYS & SYS_PC386)
extern C*               edbuf;
extern I                tsrinit(I);
extern void             tsrshut(void);
extern void             xiquad(void);
#endif

extern I                jbrk;           /* needed by session manager       */

extern void             jsti(SI,C*);
extern void             jstinit(Ptr);
extern void             jsto(SI,SI,C*);
extern void             jstpoll(void);
extern void             jstsbrk(void);  /* break handling for j /s         */
extern void             jststop(void);

#endif

/* jstf                                                                    */
/*  Pointer to file selected during jsti() cycle.                          */
/* jsti(S n, C*s)                                                          */
/*  Put input line into 0-terminated string s, maximum n chars.            */
/* jstinit(Ptr v)                                                          */
/*  Initialize sesm. v=&in and is ignored on the Mac.                      */
/*  struct{C*vlog;short nlog;C*vinb;short ninb;C*vfkd;short nfkd;}in;      */
/*  nlog: length of session log;       vlog: session log space             */
/*  ninb: length of typeahead buffer;  vinb: typeahead buffer              */
/*  nfkd: length of fnkey defn buffer; vfkd: fnkey defn buffer             */
/* jstpoll(void)                                                           */
/*  "Keyboard input available?"; invoked by j periodically to pass control */
/*  to sesm.                                                               */
/* jsto(S code, S n, C*s)                                                  */
/*  Output string s, length n.  code is MTYOUT (more output to follow) or  */
/*  MTYOIN (last line of output, i.e. output is prompt)                    */
/* jststop(void)                                                           */
/*  Called before j terminates, to let sesm shut down gracefully.          */
/* I tsrinit(I n)                                                          */
/*  Initializes the MS Windows AP with a buffer size of n bytes.           */
/*  Result is 0 if OK, 1 if failed.                                        */
/* void tsrshut(void)                                                      */
/*  Called before j terminates, to let Windows AP shut down gracefully     */
/*  (free buffer, etc.).                                                   */
/* void xiquad(void)                                                       */
/*   Sends commands to Windows AP and returns result, through tsrbuf.      */
