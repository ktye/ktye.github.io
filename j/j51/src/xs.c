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
/* Script Handling                                                         */

#include "j.h"
#include "a.h"
#include "io.h"
#include "x.h"

static FILE*oldout;

static FILE*ropen(w,md)A w;S md;{A x;B b;FILE*z;
 RZ(w);
 b=md==WREAD;
 ASSERT(BOX&AT(w),EVDOMAIN);
 ASSERT(!AR(w),EVRANK);
 x=*(A*)AV(w);
 if(!AN(x)){if(b&&oldout&&oldout!=stdout)fclose(oldout); R b?stdin:stdout;}
 ASSERT(CHAR&AT(x),EVDOMAIN);
 z=fopen((C*)AV(x),b?SREAD:SAPPEND);
 ASSERT(z,EVFACE);
#if (!LINKJ && SYS & SYS_MACINTOSH)
 if(!b)setftype(x,'TEXT','ISIj');
#endif
 R z;
}

static A scpt(no,ni)FILE*ni,*no;{FILE*xi,*xo;
 RZ(ni);
 xi=infile;  infile =ni;
 xo=outfile; outfile=no;
 immloop(); jputc(CNL);
 if(infile &&infile !=stdin )fclose(infile ); infile =xi;
 if(outfile&&outfile!=stdout)fclose(outfile); outfile=xo;
 R mtv;
}

static F1(scpt1){F1RANK(0,scpt1,0); oldout=outfile; R scpt(0L,ropen(w,WREAD));}

static F2(scpt2){FILE*t;
 F2RANK(0,0,scpt2,0);
 oldout=outfile; RZ(t=ropen(a,WUPDATE)); R scpt(t,ropen(w,WREAD));
}

DF1(script1 ){A z;B b=tostdout; tostdout=1; z=scpt1(  w); tostdout=b; R z;}

DF2(script2 ){A z;B b=tostdout; tostdout=1; z=scpt2(a,w); tostdout=b; R z;}

DF1(sscript1){A z;B b=tostdout; tostdout=0; z=scpt1(  w); tostdout=b; R z;}

DF2(sscript2){A z;B b=tostdout; tostdout=0; z=scpt2(a,w); tostdout=b; R z;}


static JF               jstfrec={0,0L,0,0};
JF                     *jstf=&jstfrec;

#if (!LINKJ && SYS & SYS_MACINTOSH)

static C appf1(act,w)C act;A w;{A t;C*s;fileParam f;
 RZ(w);
 t=*(A*)AV(w); s=(C*)AV(t);
 if(act==JFSAVE){
  save1(w);
  JSPR("\rws %s saved 1991-xx-xx xx:xx:xx\r",s);
 }else if(act==JFOPEN){
  f.ioNamePtr=(StringPtr)s;
  f.ioVRefNum=jstf->vol;
  f.ioFDirIndex=0;
  if('WKSP'==jstf->type){JSPR("\rws %s saved 1991-xx-xx xx:xx:xx\r",s); copy1(w);}
  else{JSPR("\rscript %s saved 1991-xx-xx xx:xx:xx\r",s); script1(w,0L);}
}}

B appf(){C a;
 if(a=jstf->act){ioParam pb,pb0;
  jstf->act=0; pb.ioNamePtr=NULL; pb0.ioNamePtr=NULL;
  PBGetVol(&pb0,false);
  if(a==JFPROF){AppFile f;C*t;S i,msg,n;
   CountAppFiles(&msg,&n);
   n=msg==appOpen?n:0;
   for(i=1;i<=n;++i){
    GetAppFiles(i,&f); jstf->type=f.fType; t=(C*)&f.fName;
    pb.ioNamePtr=NULL; pb.ioVRefNum=f.vRefNum; PBSetVol(&pb,false);
    appf1(JFOPEN,box(str((I)*t,1+t)));
  }}else{
   pb.ioNamePtr=NULL;  pb.ioVRefNum=jstf->vol; PBSetVol(&pb,false);
   appf1(a,box(cstr(jstf->name)));
  }
  PBSetVol(&pb0,false);
 }
 R a;
}

#else

static C appf1(act,w)C act;A w;{
 RZ(w);
 if(act==JFSAVE)save1(w);
 else if(act==JFOPEN)'W'==jstf->type ? copy1(w) : script1(w,0L);
}

B appf(){C a;
 if(a=jstf->act){
  jstf->act=0;
  if(a==JFPROF){static C*prof="profile.js";
   if(fopen(prof,"rt")){
    jstf->type='T';
    appf1(JFOPEN,box(cstr(prof)));
  }} else appf1(a,box(cstr(jstf->name)));
 }
 R a;
}

#endif
