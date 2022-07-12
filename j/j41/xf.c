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
/* Xenos: File stuff                                                       */

#include "j.h"
#include "a.h"
#include "x.h"


#if (SYS & SYS_ARCHIMEDES)
#define Wimp_StartTask 0x400DE
static int unlink(s)C*s;{R remove(s);}
extern int os_swi1(I,I);
#endif

#if (!LINKJ && SYS & SYS_MACINTOSH)
void setftype(A w,OSType type,OSType crea){C p[256];FInfo f;
 __c2p((C*)AV(w),p);
 GetFInfo(p,0,&f);
 f.fdType=type; f.fdCreator=crea;
 SetFInfo(p,0,&f);
}
#endif

#if (SYS & SYS_MACINTOSH)

DF1(host  ){ASSERT(0,EVDOMAIN);}
DF1(hostne){ASSERT(0,EVDOMAIN);}

#else

#ifdef WASM
DF1(host  ){ASSERT(0,EVDOMAIN);}
DF1(hostne){ASSERT(0,EVDOMAIN);}
#else

DF1(host){A t,z;C*fname,*s;FILE*f;I n;
 PREF1(host);
 ASSERT(CHAR&AT(w),EVDOMAIN);
 n=AN(w);
 GA(t,CHAR,n+7+L_tmpnam,1,0); s=(C*)AV(t); fname=5+n+s;
 memcpy(s,AV(w),n);
#if (SYS & SYS_ARCHIMEDES)
 memcpy(n+s," { > ",5L); strcpy(fname,"<J$Dir>.Temp"); strcat(s," }");
 unlink(fname);
 ASSERT(sesm?!os_swi1(Wimp_StartTask,(I)s):!system(s),EVFACE);
#endif
#if (SYS & SYS_ATARIST)
 memcpy(n+s,"   > ",5L); memcpy(fname,"jxxhost",8L); ASSERT(!system(s),EVFACE);
#endif
#if !(SYS & SYS_ARCHIMEDES+SYS_ATARIST)
 memcpy(n+s,"   > ",5L); tmpnam(fname);              ASSERT(!system(s),EVFACE);
#endif
 f=fopen(fname,FREAD); z=rd(f,-1L,fsize(f)); fclose(f);
 unlink(fname);
 R z;
}

DF1(hostne){C*s;
 PREF1(hostne);
 ASSERT(CHAR&AT(w),EVDOMAIN);
 s=(C*)AV(w);
#if (SYS & SYS_ARCHIMEDES)
 ASSERT(sesm?!os_swi1(Wimp_StartTask,(I)s):!system(s),EVFACE);
#else
 ASSERT(!system(s),EVFACE);
#endif
 R mtv;
}

#endif
#endif


I fsize(f)FILE*f;{I z; RZ(f); fseek(f,0L,SEEK_END); z=ftell(f); rewind(f); R z;}

DF2(jfappend){FILE*f;
 PREF2(jfappend);
 if(NUMERIC&AT(w)){ASSERT(2==i0(w),EVDOMAIN); R jpr(a);}
 RZ(f=jfopen(w,FAPPEND)); 
#if (!LINKJ && SYS & SYS_MACINTOSH)
 setftype(*(A*)AV(w),'TEXT','    ');
#endif
 wa(f,-1L,vs(a)); 
 fclose(f); 
 R mtv;
}

DF1(jfdir){ASSERT(0,EVNONCE);}

DF1(jferase){A t;FILE*f;
 PREF1(jferase);
 RZ(f=jfopen(w,FREAD)); fclose(f);
 t=*(A*)AV(w);
 R unlink((C*)AV(t))?zero:one;
}

FILE*jfopen(w,mode)A w;C*mode;{A t;FILE*f;
 RZ(w);
 ASSERT(BOX&AT(w),EVDOMAIN);
 RZ(t=vs(*(A*)AV(w)));
 ASSERT(AN(t),EVLENGTH);
 f=fopen((C*)AV(t),mode); ASSERT(f,EVFACE);
 R f;
}

DF1(jfread){A z;FILE*f;
 PREF1(jfread);
 if(BOX&AT(w)){RZ(f=jfopen(w,FREAD)); z=rd(f,-1L,fsize(f)); fclose(f); R z;}
 else{ASSERT(1==i0(w),EVDOMAIN); prompt(""); R jgets();}
}

DF1(jfsize){FILE*f;I m;
 PREF1(jfsize);
 RZ(f=jfopen(w,FREAD)); m=fsize(f); fclose(f);
 R sc(m);
}

DF2(jfwrite){A t;FILE*f;
 PREF2(jfwrite);
 if(NUMERIC&AT(w)){ASSERT(2==i0(w),EVDOMAIN); R jpr(a);}
 RZ(t=vs(a)); 
 RZ(f=jfopen(w,FWRITE)); 
#if (!LINKJ && SYS & SYS_MACINTOSH)
 setftype(*(A*)AV(w),'TEXT','    ');
#endif
 wa(f,-1L,t); 
 fclose(f); 
 R mtv;
}

static C vfin(w,f,i,n,rd)A w;FILE**f;I*i,*n;B rd;{A in;I j,k,m,s,*u;
 *f=0;
 ASSERT(BOX&AT(w),EVDOMAIN);
 ASSERT(2==AN(w),EVLENGTH);
 in=vi(*(1+(A*)AV(w))); k=AN(in);
 ASSERT(1>=AR(in),EVRANK);
 ASSERT(1==k||2==k,EVLENGTH);
 u=AV(in); j=u[0]; m=1==k?-1:u[1];
 ASSERT(1==k||0<=m,EVLENGTH);
 RZ(*f=jfopen(w,rd?FREAD:FUPDATE));
 s=fsize(*f);
 ASSERT(-s<=j&&j<s,EVINDEX);
 *i=j=0>j?s+j:j;
 if(!rd)ASSERT(j+*n<=s,EVINDEX);
 *n=m=0>m?s-j:m;
 ASSERT(j+m<=s,EVINDEX);
 R 1;
}

DF1(jiread){A z;FILE*f;I i,n;
 PREF1(jiread);
 if(vfin(w,&f,&i,&n,1))z=rd(f,i,n);
 if(f)fclose(f);
 R z;
}

DF2(jiwrite){FILE*f;I i,n;
 PREF2(jiwrite);
 RZ(a=vs(a)); n=AN(a);
 if(vfin(w,&f,&i,&n,0)){
#if (!LINKJ && SYS & SYS_MACINTOSH)
  setftype(*(A*)AV(w),'TEXT','    ');
#endif
  wa(f,i,a);
 }
 if(f)fclose(f);
 R mtv;
}

A rd(f,j,n)FILE*f;I j,n;{A z;C*x;I p=0;size_t q=1;
 RZ(f);
 GA(z,CHAR,n,1,0); x=(C*)AV(z);
 if(0<=j)fseek(f,j,SEEK_SET);
 while(q&&n>p)p+=q=fread(p+x,sizeof(C),(size_t)(n-p),f);
#ifndef WASM
 ASSERT(!ferror(f),EVFACE);
#endif
 R z;
}

A wa(f,j,w)FILE*f;I j;A w;{C*x;I n,p=0;size_t q=1;
 RZ(w&&f);
 n=AN(w); x=(C*)AV(w);
 if(0<=j)fseek(f,j,SEEK_SET);
 while(q&&n>p)p+=q=fwrite(p+x,sizeof(C),(size_t)(n-p),f);
#ifndef WASM
 ASSERT(!ferror(f),EVFACE);
#endif
 R mtv;
} /* Write or append string w to file f */
