      subroutine dtrdi(t,ldt,n,det,job,info)
      integer ldt,n,job,info
      double precision t(ldt,1),det(2)
c
c     dtrdi computes the determinant and inverse of a double precision
c     triangular matrix.
c
c     on entry
c
c        t       double precision(ldt,n)
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
c                = 010       no det, inverse of lower triangular.
c                = 011       no det, inverse of upper triangular.
c                = 100       det, no inverse.
c                = 110       det, inverse of lower triangular.
c                = 111       det, inverse of upper triangular.
c
c     on return
c
c        t       inverse of original matrix if requested.
c                otherwise unchanged.
c
c        det     double precision(2)
c                determinant of original matrix if requested.
c                otherwise not referenced.
c                determinant = det(1) * 10.0**det(2)
c                with  1.0 .le. dabs(det(1)) .lt. 10.0
c                or  det(1) .eq. 0.0 .
c
c        info    integer
c                info contains zero if the system is nonsingular
c                and the inverse is requested.
c                otherwise info contains the index of
c                a zero diagonal element of t.
c
c
c     linpack. this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     blas daxpy,dscal
c     fortran dabs,mod
c
c     internal variables
c
      double precision temp
      double precision ten
      integer i,j,k,kb,km1,kp1
c
c     begin block permitting ...exits to 180
c
c        compute determinant
c
         if (job/100 .eq. 0) go to 70
            det(1) = 1.0d0
            det(2) = 0.0d0
            ten = 10.0d0
            do 50 i = 1, n
               det(1) = t(i,i)*det(1)
c           ...exit
               if (det(1) .eq. 0.0d0) go to 60
   10          if (dabs(det(1)) .ge. 1.0d0) go to 20
                  det(1) = ten*det(1)
                  det(2) = det(2) - 1.0d0
               go to 10
   20          continue
   30          if (dabs(det(1)) .lt. ten) go to 40
                  det(1) = det(1)/ten
                  det(2) = det(2) + 1.0d0
               go to 30
   40          continue
   50       continue
   60       continue
   70    continue
c
c        compute inverse of upper triangular
c
         if (mod(job/10,10) .eq. 0) go to 170
            if (mod(job,10) .eq. 0) go to 120
c              begin block permitting ...exits to 110
                  do 100 k = 1, n
                     info = k
c              ......exit
                     if (t(k,k) .eq. 0.0d0) go to 110
                     t(k,k) = 1.0d0/t(k,k)
                     temp = -t(k,k)
                     call dscal(k-1,temp,t(1,k),1)
                     kp1 = k + 1
                     if (n .lt. kp1) go to 90
                     do 80 j = kp1, n
                        temp = t(k,j)
                        t(k,j) = 0.0d0
                        call daxpy(k,temp,t(1,k),1,t(1,j),1)
   80                continue
   90                continue
  100             continue
                  info = 0
  110          continue
            go to 160
  120       continue
c
c              compute inverse of lower triangular
c
               do 150 kb = 1, n
                  k = n + 1 - kb
                  info = k
c     ............exit
                  if (t(k,k) .eq. 0.0d0) go to 180
                  t(k,k) = 1.0d0/t(k,k)
                  temp = -t(k,k)
                  if (k .ne. n) call dscal(n-k,temp,t(k+1,k),1)
                  km1 = k - 1
                  if (km1 .lt. 1) go to 140
                  do 130 j = 1, km1
                     temp = t(k,j)
                     t(k,j) = 0.0d0
                     call daxpy(n-k+1,temp,t(k,k),1,t(k,j),1)
  130             continue
  140             continue
  150          continue
               info = 0
  160       continue
  170    continue
  180 continue
      return
      end
