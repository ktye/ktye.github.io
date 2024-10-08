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
/* Global Definitions                                                      */


#define SYS_AMIGA               1L
#define SYS_ARCHIMEDES          2L
#define SYS_ATARIST             4L
#define SYS_ATT3B1              8L
#define SYS_IBMRS6000           16L
#define SYS_MACINTOSH           32L
#define SYS_MIPSR3000           64L
#define SYS_NEXT                128L
#define SYS_PC                  256L
#define SYS_PC386               512L
#define SYS_SGIIRIX             1024L
#define SYS_SUN3                2048L
#define SYS_SUN386I             4096L
#define SYS_SUN4                8192L
#define SYS_VAX                 16384L
#define SYS_386IX               32768L
#define	SYS_IBMRT		65536L

#ifdef ibm032
#define SYS                     SYS_IBMRT
#elif defined(_IBMR2)
#define	SYS			SYS_IBMRS6000
#elif defined(vax)
#define	SYS			SYS_VAX
#else
#define SYS			SYS_386IX
#endif

#ifdef WASM
#define LINKJ                   1
#else
#define LINKJ                   0
#endif
/* #define WATERLOO                1 */

#define SYS_ANSILIB             (SYS_AMIGA + SYS_ARCHIMEDES + \
                                 SYS_IBMRS6000 + SYS_MACINTOSH + SYS_PC + \
                                 SYS_PC386 + SYS_VMCMS)
#define SYS_SESM                (SYS_ARCHIMEDES + SYS_PC + SYS_PC386 + \
                                 SYS_MACINTOSH)
#define SYS_UNIX                (SYS_ATT3B1 + SYS_IBMRS6000 + \
                                 SYS_MIPSR3000 + SYS_NEXT + SYS_SGIIRIX + \
                                 SYS_SUN3 + SYS_SUN386I + SYS_SUN4 + \
                                 SYS_VAX + SYS_386IX + SYS_IBMRT)
#define SYS_LILENDIAN           (SYS_ARCHIMEDES + SYS_PC + SYS_PC386 + \
                                 SYS_SUN386I + SYS_386IX)


#if (SYS & SYS_ATARIST)
#define __NO_INLINE__           1
#endif

#if (SYS & SYS_UNIX) && !WASM
#include <memory.h>
#include <sys/types.h>
#endif

#if (SYS & SYS_ANSILIB)
#include <float.h>
#include <limits.h>
#include <stdlib.h>
#endif

#ifndef WASM
#include <math.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#else
#include "wa.h"
#endif

#include "jc.h"
#include "jt.h"
#include "je.h"

#if (SYS & SYS_LILENDIAN)
#define XINF            "\000\000\000\000\000\000\360\177"
#define XNAN            "\000\000\000\000\000\000\370\377"
#endif

#if (SYS & SYS_MACINTOSH)
#define XINF            "\177\377\000\000\000\000\000\000\000\000"
#define XNAN            "\377\377\100\000\000\000\000\000\000\000"
#endif

#ifndef XINF
#define XINF            "\177\360\000\000\000\000\000\000"
#define XNAN            "\377\370\000\000\000\000\000\000"
#endif


#ifndef PI
#define PI              3.14159265358979323846
#endif
#ifndef LONG_MAX
#define LONG_MAX        2147483647L
#endif
#ifndef LONG_MIN
#define LONG_MIN        (~2147483647L)
#endif
#ifndef OVERFLOW
#define OVERFLOW        8.988465674311578e307
#endif
#ifndef UNDERFLOW
#define UNDERFLOW       4.450147717014403e-308
#endif


#define NALP            256             /* size of alphabet                */
#define NINPUT          843             /* max # of chars in input line    */
#define NOBUF           100             /* length of obuf                  */
#define NPP             20              /* max value for quad pp           */
#define NPROMPT         20              /* max length of immex prompt      */
#define NTSTACK         2000L           /* size of stack for temps         */
#define RMAX            127             /* max rank                        */
#define RMAXL           127L            /* max rank, long                  */

#ifdef __HIGHC__
#define	ABS(a)		_abs(a)
#else
#define ABS(a)          (0<=(a)?(a):-(a))
#endif
#define DO(n,stm)       {I i=0;I _n=(n); for(;i<_n;i++){stm}}
#define EPILOG(z)       R gc(z,_ttop)
#define F1(f)           A f(  w)A   w;
#define F2(f)           A f(a,w)A a,w;
#define F1RANK(m,f,self)    {RZ(   w); if(m<AR(w))            \
                                 R rank1ex(  w,(A)self,(I)m,     f);}
#define F2RANK(l,r,f,self)  {RZ(a&&w); if(l<AR(a)||r<AR(w))   \
                                 R rank2ex(a,w,(A)self,(I)l,(I)r,f);}
#define GA(v,t,n,r,s)   RZ(v=ga((I)(t),(I)(n),(I)(r),(I*)(s)))
#define IC(w)           (AR(w) ? *AS(w) : 1L)
#define JSPR(fmt,x)     {sprintf(obuf,fmt,x); jouts(obuf);}
#define MAX(a,b)        ((a)>(b)?(a):(b))
#define MIN(a,b)        ((a)<(b)?(a):(b))
#define PROLOG          I _ttop=tbase+ttop
#define R               return
#define RE(exp)         {if((exp),jerr)R 0;}
#define RZ(exp)         {if(!(exp))R 0;}
#define SGN(a)          ((0<(a))-(0>(a)))


#ifndef CLOCKS_PER_SEC
#if (SYS & SYS_UNIX)
#define CLOCKS_PER_SEC  1000000
#endif
#ifdef  CLK_TCK
#define CLOCKS_PER_SEC  CLK_TCK
#endif
#endif

#if (WATERLOO)
#include <mfcf/libc/string.h>			/* added by ljd */
#define CLOCK           (m_cpu())
#else
#define CLOCK           ((D)clock()/CLOCKS_PER_SEC)
#endif


#define ASSERT(b,e)     {if(!(b)){jsignal(e); R 0;}}

#define EVBREAK         1
#define EVDEFN          2
#define EVDOMAIN        3
#define EVILNAME        4
#define EVILNUM         5
#define EVINDEX         6
#define EVFACE          7
#define EVINPRUPT       8
#define EVLENGTH        9
#define EVLIMIT         10
#define EVNONCE         11
#define EVNOTASGN       12
#define EVOPENQ         13
#define EVRANK          14
#define EVSPELL         15
#define EVSYNTAX        16
#define EVSYSTEM        17
#define EVVALUE         18
#define EVWSFULL        19

#define NEVM            19      /* number of event codes                   */
