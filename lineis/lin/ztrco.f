      subroutine ztrco(t,ldt,n,rcond,z,job)
      integer ldt,n,job
      complex*16 t(ldt,1),z(1)
      double precision rcond
c
c     ztrco estimates the condition of a complex*16 triangular matrix.
c
c     on entry
c
c        t       complex*16(ldt,n)
c                t contains the triangular matrix. the zero
c                elements of the matrix are not referenced, and
c                the corresponding elements of the array can be
c                used to store other information.
c
c        ldt     integer
c                ldt is the leading dimension of the array t.
c
c        n       integer
c                n is the order of the system.
c
c        job     integer
c                = 0         t  is lower triangular.
c                = nonzero   t  is upper triangular.
c
c     on return
c
c        rcond   double precision
c                an estimate of the reciprocal condition of  t .
c                for the system  t*x = b , relative perturbations
c                in  t  and  b  of size  epsilon  may cause
c                relative perturbations in  x  of size  epsilon/rcond .
c                if  rcond  is so small that the logical expression
c                           1.0 + rcond .eq. 1.0
c                is true, then  t  may be singular to working
c                precision.  in particular,  rcond  is zero  if
c                exact singularity is detected or the estimate
c                underflows.
c
c        z       complex*16(n)
c                a work vector whose contents are usually unimportant.
c                if  t  is close to a singular matrix, then  z  is
c                an approximate null vector in the sense that
c                norm(a*z) = rcond*norm(a)*norm(z) .
c
c     linpack. this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     blas zaxpy,zdscal,dzasum
c     fortran dabs,dmax1,dcmplx,dconjg
c
c     internal variables
c
      complex*16 w,wk,wkm,ek
      double precision tnorm,ynorm,s,sm,dzasum
      integer i1,j,j1,j2,k,kk,l
      logical lower
      complex*16 zdum,zdum1,zdum2,csign1
      double precision cabs1
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
      cabs1(zdum) = dabs(dreal(zdum)) + dabs(dimag(zdum))
      csign1(zdum1,zdum2) = cabs1(zdum1)*(zdum2/cabs1(zdum2))
c
      lower = job .eq. 0
c
c     compute 1-norm of t
c
      tnorm = 0.0d0
      do 10 j = 1, n
         l = j
         if (lower) l = n + 1 - j
         i1 = 1
         if (lower) i1 = j
         tnorm = dmax1(tnorm,dzasum(l,t(i1,j),1))
   10 continue
c
c     rcond = 1/(norm(t)*(estimate of norm(inverse(t)))) .
c     estimate = norm(z)/norm(y) where  t*z = y  and  ctrans(t)*y = e .
c     ctrans(t)  is the conjugate transpose of t .
c     the components of  e  are chosen to cause maximum local
c     growth in the elements of y .
c     the vectors are frequently rescaled to avoid overflow.
c
c     solve ctrans(t)*y = e
c
      ek = (1.0d0,0.0d0)
      do 20 j = 1, n
         z(j) = (0.0d0,0.0d0)
   20 continue
      do 100 kk = 1, n
         k = kk
         if (lower) k = n + 1 - kk
         if (cabs1(z(k)) .ne. 0.0d0) ek = csign1(ek,-z(k))
         if (cabs1(ek-z(k)) .le. cabs1(t(k,k))) go to 30
            s = cabs1(t(k,k))/cabs1(ek-z(k))
            call zdscal(n,s,z,1)
            ek = dcmplx(s,0.0d0)*ek
   30    continue
         wk = ek - z(k)
         wkm = -ek - z(k)
         s = cabs1(wk)
         sm = cabs1(wkm)
         if (cabs1(t(k,k)) .eq. 0.0d0) go to 40
            wk = wk/dconjg(t(k,k))
            wkm = wkm/dconjg(t(k,k))
         go to 50
   40    continue
            wk = (1.0d0,0.0d0)
            wkm = (1.0d0,0.0d0)
   50    continue
         if (kk .eq. n) go to 90
            j1 = k + 1
            if (lower) j1 = 1
            j2 = n
            if (lower) j2 = k - 1
            do 60 j = j1, j2
               sm = sm + cabs1(z(j)+wkm*dconjg(t(k,j)))
               z(j) = z(j) + wk*dconjg(t(k,j))
               s = s + cabs1(z(j))
   60       continue
            if (s .ge. sm) go to 80
               w = wkm - wk
               wk = wkm
               do 70 j = j1, j2
                  z(j) = z(j) + w*dconjg(t(k,j))
   70          continue
   80       continue
   90    continue
         z(k) = wk
  100 continue
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
c
      ynorm = 1.0d0
c
c     solve t*z = y
c
      do 130 kk = 1, n
         k = n + 1 - kk
         if (lower) k = kk
         if (cabs1(z(k)) .le. cabs1(t(k,k))) go to 110
            s = cabs1(t(k,k))/cabs1(z(k))
            call zdscal(n,s,z,1)
            ynorm = s*ynorm
  110    continue
         if (cabs1(t(k,k)) .ne. 0.0d0) z(k) = z(k)/t(k,k)
         if (cabs1(t(k,k)) .eq. 0.0d0) z(k) = (1.0d0,0.0d0)
         i1 = 1
         if (lower) i1 = k + 1
         if (kk .ge. n) go to 120
            w = -z(k)
            call zaxpy(n-kk,w,t(i1,k),1,z(i1),1)
  120    continue
  130 continue
c     make znorm = 1.0
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
      ynorm = s*ynorm
c
      if (tnorm .ne. 0.0d0) rcond = ynorm/tnorm
      if (tnorm .eq. 0.0d0) rcond = 0.0d0
      return
      end
