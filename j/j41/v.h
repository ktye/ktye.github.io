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
/* Macros and Defined-Constants for Verbs                                  */


#define SF1(f,Tv,Tx,exp)        B f(v,x)Tv*v;Tx*x;{*x=(exp); R!jerr;}
#define SF2(f,Tv,Tx,exp)        B f(u,v,x)Tv*u,*v;Tx*x;{*x=(exp); R!jerr;}

extern Z        zcir();
extern Z        zconjug();
extern Z        zdiv();
extern B        zeq();
extern Z        zexp();
extern Z        zfloor();
extern Z        zgcd();
extern Z        zlcm();
extern Z        zlog();
extern D        zmag();
extern Z        zminus();
extern Z        znonce1();
extern Z        znonce2();
extern Z        zplus();
extern Z        zpow();
extern Z        zrem();
extern Z        zsqrt();
extern Z        ztymes();
extern Z        ztrend();
