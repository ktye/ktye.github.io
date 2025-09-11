      subroutine zhidi(a,lda,n,kpvt,det,inert,work,job)
      integer lda,n,job
      complex*16 a(lda,1),work(1)
      double precision det(2)
      integer kpvt(1),inert(3)
c
c     zhidi computes the determinant, inertia and inverse
c     of a complex*16 hermitian matrix using the factors from zhifa.
c
c     on entry
c
c        a       complex*16(lda,n)
c                the output from zhifa.
c
c        lda     integer
c                the leading dimension of the array a.
c
c        n       integer
c                the order of the matrix a.
c
c        kpvt    integer(n)
c                the pivot vector from zhifa.
c
c        work    complex*16(n)
c                work vector.  contents destroyed.
c
c        job     integer
c                job has the decimal expansion  abc  where
c                   if  c .ne. 0, the inverse is computed,
c                   if  b .ne. 0, the determinant is computed,
c                   if  a .ne. 0, the inertia is computed.
c
c                for example, job = 111  gives all three.
c
c     on return
c
c        variables not requested by job are not used.
c
c        a      contains the upper triangle of the inverse of
c               the original matrix.  the strict lower triangle
c               is never referenced.
c
c        det    double precision(2)
c               determinant of original matrix.
c               determinant = det(1) * 10.0**det(2)
c               with 1.0 .le. dabs(det(1)) .lt. 10.0
c               or det(1) = 0.0.
c
c        inert  integer(3)
c               the inertia of the original matrix.
c               inert(1)  =  number of positive eigenvalues.
c               inert(2)  =  number of negative eigenvalues.
c               inert(3)  =  number of zero eigenvalues.
c
c     error condition
c
c        a division by zero may occur if the inverse is requested
c        and  zhico  has set rcond .eq. 0.0
c        or  zhifa  has set  info .ne. 0 .
c
c     linpack. this version dated 08/14/78 .
c     james bunch, univ. calif. san diego, argonne nat. lab
c
c     subroutines and functions
c
c     blas zaxpy,zcopy,zdotc,zswap
c     fortran dabs,cdabs,dcmplx,dconjg,iabs,mod
c
c     internal variables.
c
      complex*16 akkp1,zdotc,temp
      double precision ten,d,t,ak,akp1
      integer j,jb,k,km1,ks,kstep
      logical noinv,nodet,noert
      double precision dreal
      complex*16 zdumr
      dreal(zdumr) = zdumr
c
      noinv = mod(job,10) .eq. 0
      nodet = mod(job,100)/10 .eq. 0
      noert = mod(job,1000)/100 .eq. 0
c
      if (nodet .and. noert) go to 140
         if (noert) go to 10
            inert(1) = 0
            inert(2) = 0
            inert(3) = 0
   10    continue
         if (nodet) go to 20
            det(1) = 1.0d0
            det(2) = 0.0d0
            ten = 10.0d0
   20    continue
         t = 0.0d0
         do 130 k = 1, n
            d = dreal(a(k,k))
c
c           check if 1 by 1
c
            if (kpvt(k) .gt. 0) go to 50
c
c              2 by 2 block
c              use det (d  s)  =  (d/t * c - t) * t  ,  t = cdabs(s)
c                      (s  c)
c              to avoid underflow/overflow troubles.
c              take two passes through scaling.  use  t  for flag.
c
               if (t .ne. 0.0d0) go to 30
                  t = cdabs(a(k,k+1))
                  d = (d/t)*dreal(a(k+1,k+1)) - t
               go to 40
   30          continue
                  d = t
                  t = 0.0d0
   40          continue
   50       continue
c
            if (noert) go to 60
               if (d .gt. 0.0d0) inert(1) = inert(1) + 1
               if (d .lt. 0.0d0) inert(2) = inert(2) + 1
               if (d .eq. 0.0d0) inert(3) = inert(3) + 1
   60       continue
c
            if (nodet) go to 120
               det(1) = d*det(1)
               if (det(1) .eq. 0.0d0) go to 110
   70             if (dabs(det(1)) .ge. 1.0d0) go to 80
                     det(1) = ten*det(1)
                     det(2) = det(2) - 1.0d0
                  go to 70
   80             continue
   90             if (dabs(det(1)) .lt. ten) go to 100
                     det(1) = det(1)/ten
                     det(2) = det(2) + 1.0d0
                  go to 90
  100             continue
  110          continue
  120       continue
  130    continue
  140 continue
c
c     compute inverse(a)
c
      if (noinv) go to 270
         k = 1
  150    if (k .gt. n) go to 260
            km1 = k - 1
            if (kpvt(k) .lt. 0) go to 180
c
c              1 by 1
c
               a(k,k) = dcmplx(1.0d0/dreal(a(k,k)),0.0d0)
               if (km1 .lt. 1) go to 170
                  call zcopy(km1,a(1,k),1,work,1)
                  do 160 j = 1, km1
                     a(j,k) = zdotc(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k),1)
  160             continue
                  a(k,k) = a(k,k)
     *                     + dcmplx(dreal(zdotc(km1,work,1,a(1,k),1)),
     *                              0.0d0)
  170          continue
               kstep = 1
            go to 220
  180       continue
c
c              2 by 2
c
               t = cdabs(a(k,k+1))
               ak = dreal(a(k,k))/t
               akp1 = dreal(a(k+1,k+1))/t
               akkp1 = a(k,k+1)/t
               d = t*(ak*akp1 - 1.0d0)
               a(k,k) = dcmplx(akp1/d,0.0d0)
               a(k+1,k+1) = dcmplx(ak/d,0.0d0)
               a(k,k+1) = -akkp1/d
               if (km1 .lt. 1) go to 210
                  call zcopy(km1,a(1,k+1),1,work,1)
                  do 190 j = 1, km1
                     a(j,k+1) = zdotc(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k+1),1)
  190             continue
                  a(k+1,k+1) = a(k+1,k+1)
     *                         + dcmplx(dreal(zdotc(km1,work,1,
     *                                              a(1,k+1),1)),0.0d0)
                  a(k,k+1) = a(k,k+1) + zdotc(km1,a(1,k),1,a(1,k+1),1)
                  call zcopy(km1,a(1,k),1,work,1)
                  do 200 j = 1, km1
                     a(j,k) = zdotc(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k),1)
  200             continue
                  a(k,k) = a(k,k)
     *                     + dcmplx(dreal(zdotc(km1,work,1,a(1,k),1)),
     *                              0.0d0)
  210          continue
               kstep = 2
  220       continue
c
c           swap
c
            ks = iabs(kpvt(k))
            if (ks .eq. k) go to 250
               call zswap(ks,a(1,ks),1,a(1,k),1)
               do 230 jb = ks, k
                  j = k + ks - jb
                  temp = dconjg(a(j,k))
                  a(j,k) = dconjg(a(ks,j))
                  a(ks,j) = temp
  230          continue
               if (kstep .eq. 1) go to 240
                  temp = a(ks,k+1)
                  a(ks,k+1) = a(k,k+1)
                  a(k,k+1) = temp
  240          continue
  250       continue
            k = k + kstep
         go to 150
  260    continue
  270 continue
      return
      end
