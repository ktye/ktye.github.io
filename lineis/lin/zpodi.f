      subroutine zpodi(a,lda,n,det,job)
      integer lda,n,job
      complex*16 a(lda,1)
      double precision det(2)
c
c     zpodi computes the determinant and inverse of a certain
c     complex*16 hermitian positive definite matrix (see below)
c     using the factors computed by zpoco, zpofa or zqrdc.
c
c     on entry
c
c        a       complex*16(lda, n)
c                the output  a  from zpoco or zpofa
c                or the output  x  from zqrdc.
c
c        lda     integer
c                the leading dimension of the array  a .
c
c        n       integer
c                the order of the matrix  a .
c
c        job     integer
c                = 11   both determinant and inverse.
c                = 01   inverse only.
c                = 10   determinant only.
c
c     on return
c
c        a       if zpoco or zpofa was used to factor  a  then
c                zpodi produces the upper half of inverse(a) .
c                if zqrdc was used to decompose  x  then
c                zpodi produces the upper half of inverse(ctrans(x)*x)
c                where ctrans(x) is the conjugate transpose.
c                elements of  a  below the diagonal are unchanged.
c                if the units digit of job is zero,  a  is unchanged.
c
c        det     double precision(2)
c                determinant of  a  or of  ctrans(x)*x  if requested.
c                otherwise not referenced.
c                determinant = det(1) * 10.0**det(2)
c                with  1.0 .le. det(1) .lt. 10.0
c                or  det(1) .eq. 0.0 .
c
c     error condition
c
c        a division by zero will occur if the input factor contains
c        a zero on the diagonal and the inverse is requested.
c        it will not occur if the subroutines are called correctly
c        and if zpoco or zpofa has set info .eq. 0 .
c
c     linpack.  this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     blas zaxpy,zscal
c     fortran dconjg,mod
c
c     internal variables
c
      complex*16 t
      double precision s
      integer i,j,jm1,k,kp1
      double precision dreal
      complex*16 zdumr
      dreal(zdumr) = zdumr
c
c     compute determinant
c
      if (job/10 .eq. 0) go to 70
         det(1) = 1.0d0
         det(2) = 0.0d0
         s = 10.0d0
         do 50 i = 1, n
            det(1) = dreal(a(i,i))**2*det(1)
c        ...exit
            if (det(1) .eq. 0.0d0) go to 60
   10       if (det(1) .ge. 1.0d0) go to 20
               det(1) = s*det(1)
               det(2) = det(2) - 1.0d0
            go to 10
   20       continue
   30       if (det(1) .lt. s) go to 40
               det(1) = det(1)/s
               det(2) = det(2) + 1.0d0
            go to 30
   40       continue
   50    continue
   60    continue
   70 continue
c
c     compute inverse(r)
c
      if (mod(job,10) .eq. 0) go to 140
         do 100 k = 1, n
            a(k,k) = (1.0d0,0.0d0)/a(k,k)
            t = -a(k,k)
            call zscal(k-1,t,a(1,k),1)
            kp1 = k + 1
            if (n .lt. kp1) go to 90
            do 80 j = kp1, n
               t = a(k,j)
               a(k,j) = (0.0d0,0.0d0)
               call zaxpy(k,t,a(1,k),1,a(1,j),1)
   80       continue
   90       continue
  100    continue
c
c        form  inverse(r) * ctrans(inverse(r))
c
         do 130 j = 1, n
            jm1 = j - 1
            if (jm1 .lt. 1) go to 120
            do 110 k = 1, jm1
               t = dconjg(a(k,j))
               call zaxpy(k,t,a(1,j),1,a(1,k),1)
  110       continue
  120       continue
            t = dconjg(a(j,j))
            call zscal(j,t,a(1,j),1)
  130    continue
  140 continue
      return
      end
