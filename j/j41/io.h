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

#if (SYS & SYS_PCAT)
extern S                jstedit(S,S,C*);
#endif

extern void             jsti(S,C*);
extern void             jstinit(Ptr);
extern void             jstkiav(void);
extern void             jsto(S,S,C*);
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
/* jstkiav(void)                                                           */
/*  "Keyboard input available?"; invoked by j periodically to pass control */
/*  to sesm (e.g. to implement typeahead).                                 */
/* jsto(S code, S n, C*s)                                                  */
/*  Output string s, length n.  code is MTYOUT (more output to follow) or  */
/*  MTYOIN (last line of output, i.e. output is prompt)                    */
/* jststop(void)                                                           */
/*  Called before j terminates, to let sesm shut down gracefully.          */
