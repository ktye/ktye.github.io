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
/* Macros and Defined Constants for !:                                     */


#define XC(m,n)         (64*m+n)

#if (SYS & SYS_VAX)
#define FAPPEND         "a"
#define FREAD           "r"
#define FUPDATE         "r+"
#define FWRITE          "w"
#define SAPPEND         "a"     /* script output        */
#define SREAD           "r"     /* script input         */
#endif

#if (SYS & SYS_ARCHIMEDES)
#define FAPPEND         "ab"
#define FREAD           "rb"
#define FUPDATE         "r+b"
#define FWRITE          "wb"
#define SAPPEND         "a"
#define SREAD           "r"
#endif

#ifndef FAPPEND
#define FAPPEND         "ab"
#define FREAD           "rb"
#define FUPDATE         "r+b"
#define FWRITE          "wb"
#define SAPPEND         "at"
#define SREAD           "rt"
#endif

#define WREAD           1
#define WUPDATE         2
#define WWRITE          3


#ifndef SEEK_SET
#define SEEK_SET        0
#endif
#ifndef SEEK_CUR
#define SEEK_CUR        1
#endif
#ifndef SEEK_END
#define SEEK_END        2
#endif

#ifndef L_tmpnam
#define L_tmpnam        59
#endif

extern A        copy1();
extern A        copy2();
extern I        fsize();
extern A        host();
extern A        hostne();
extern C        jc();
extern A        jfappend();
extern A        jfdir();
extern A        jferase();
extern FILE    *jfopen();
extern A        jfread();
extern A        jfsize();
extern A        jfwrite();
extern A        jiread();
extern A        jiwrite();
extern A        pcopy1();
extern A        pcopy2();
extern A        psave1();
extern A        psave2();
extern A        rd();
extern A        save1();
extern A        save2();
extern A        script1();
extern A        script2();
extern A        sscript1();
extern A        sscript2();
extern A        wa();
extern A        wex();
extern A        wnc();
extern A        wnl();

#if (!LINKJ && SYS & SYS_MACINTOSH)
extern void     setftype(A,OSType,OSType);
#endif
