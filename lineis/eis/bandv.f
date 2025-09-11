      subroutine bandv(nm,n,mbw,a,e21,m,w,z,ierr,nv,rv,rv6)
c
      integer i,j,k,m,n,r,ii,ij,jj,kj,mb,m1,nm,nv,ij1,its,kj1,mbw,m21,
     x        ierr,maxj,maxk,group
      double precision a(nm,mbw),w(m),z(nm,m),rv(nv),rv6(n)
      double precision u,v,uk,xu,x0,x1,e21,eps2,eps3,eps4,norm,order,
     x       epsilon,pythag
c
c     this subroutine finds those eigenvectors of a real symmetric
c     band matrix corresponding to specified eigenvalues, using inverse
c     iteration.  the subroutine may also be used to solve systems
c     of linear equations with a symmetric or non-symmetric band
c     coefficient matrix.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        mbw is the number of columns of the array a used to store the
c          band matrix.  if the matrix is symmetric, mbw is its (half)
c          band width, denoted mb and defined as the number of adjacent
c          diagonals, including the principal diagonal, required to
c          specify the non-zero portion of the lower triangle of the
c          matrix.  if the subroutine is being used to solve systems
c          of linear equations and the coefficient matrix is not
c          symmetric, it must however have the same number of adjacent
c          diagonals above the main diagonal as below, and in this
c          case, mbw=2*mb-1.
c
c        a contains the lower triangle of the symmetric band input
c          matrix stored as an n by mb array.  its lowest subdiagonal
c          is stored in the last n+1-mb positions of the first column,
c          its next subdiagonal in the last n+2-mb positions of the
c          second column, further subdiagonals similarly, and finally
c          its principal diagonal in the n positions of column mb.
c          if the subroutine is being used to solve systems of linear
c          equations and the coefficient matrix is not symmetric, a is
c          n by 2*mb-1 instead with lower triangle as above and with
c          its first superdiagonal stored in the first n-1 positions of
c          column mb+1, its second superdiagonal in the first n-2
c          positions of column mb+2, further superdiagonals similarly,
c          and finally its highest superdiagonal in the first n+1-mb
c          positions of the last column.
c          contents of storages not part of the matrix are arbitrary.
c
c        e21 specifies the ordering of the eigenvalues and contains
c            0.0d0 if the eigenvalues are in ascending order, or
c            2.0d0 if the eigenvalues are in descending order.
c          if the subroutine is being used to solve systems of linear
c          equations, e21 should be set to 1.0d0 if the coefficient
c          matrix is symmetric and to -1.0d0 if not.
c
c        m is the number of specified eigenvalues or the number of
c          systems of linear equations.
c
c        w contains the m eigenvalues in ascending or descending order.
c          if the subroutine is being used to solve systems of linear
c          equations (a-w(r)*i)*x(r)=b(r), where i is the identity
c          matrix, w(r) should be set accordingly, for r=1,2,...,m.
c
c        z contains the constant matrix columns (b(r),r=1,2,...,m), if
c          the subroutine is used to solve systems of linear equations.
c
c        nv must be set to the dimension of the array parameter rv
c          as declared in the calling program dimension statement.
c
c     on output
c
c        a and w are unaltered.
c
c        z contains the associated set of orthogonal eigenvectors.
c          any vector which fails to converge is set to zero.  if the
c          subroutine is used to solve systems of linear equations,
c          z contains the solution matrix columns (x(r),r=1,2,...,m).
c
c        ierr is set to
c          zero       for normal return,
c          -r         if the eigenvector corresponding to the r-th
c                     eigenvalue fails to converge, or if the r-th
c                     system of linear equations is nearly singular.
c
c        rv and rv6 are temporary storage arrays.  note that rv is
c          of dimension at least n*(2*mb-1).  if the subroutine
c          is being used to solve systems of linear equations, the
c          determinant (up to sign) of a-w(m)*i is available, upon
c          return, as the product of the first n elements of rv.
c
c     calls pythag for  dsqrt(a*a + b*b) .
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 0
      if (m .eq. 0) go to 1001
      mb = mbw
      if (e21 .lt. 0.0d0) mb = (mbw + 1) / 2
      m1 = mb - 1
      m21 = m1 + mb
      order = 1.0d0 - dabs(e21)
c     .......... find vectors by inverse iteration ..........
      do 920 r = 1, m
         its = 1
         x1 = w(r)
         if (r .ne. 1) go to 100
c     .......... compute norm of matrix ..........
         norm = 0.0d0
c
         do 60 j = 1, mb
            jj = mb + 1 - j
            kj = jj + m1
            ij = 1
            v = 0.0d0
c
            do 40 i = jj, n
               v = v + dabs(a(i,j))
               if (e21 .ge. 0.0d0) go to 40
               v = v + dabs(a(ij,kj))
               ij = ij + 1
   40       continue
c
            norm = dmax1(norm,v)
   60    continue
c
         if (e21 .lt. 0.0d0) norm = 0.5d0 * norm
c     .......... eps2 is the criterion for grouping,
c                eps3 replaces zero pivots and equal
c                roots are modified by eps3,
c                eps4 is taken very small to avoid overflow ..........
         if (norm .eq. 0.0d0) norm = 1.0d0
         eps2 = 1.0d-3 * norm * dabs(order)
         eps3 = epsilon(norm)
         uk = n
         uk = dsqrt(uk)
         eps4 = uk * eps3
   80    group = 0
         go to 120
c     .......... look for close or coincident roots ..........
  100    if (dabs(x1-x0) .ge. eps2) go to 80
         group = group + 1
         if (order * (x1 - x0) .le. 0.0d0) x1 = x0 + order * eps3
c     .......... expand matrix, subtract eigenvalue,
c                and initialize vector ..........
  120    do 200 i = 1, n
            ij = i + min0(0,i-m1) * n
            kj = ij + mb * n
            ij1 = kj + m1 * n
            if (m1 .eq. 0) go to 180
c
            do 150 j = 1, m1
               if (ij .gt. m1) go to 125
               if (ij .gt. 0) go to 130
               rv(ij1) = 0.0d0
               ij1 = ij1 + n
               go to 130
  125          rv(ij) = a(i,j)
  130          ij = ij + n
               ii = i + j
               if (ii .gt. n) go to 150
               jj = mb - j
               if (e21 .ge. 0.0d0) go to 140
               ii = i
               jj = mb + j
  140          rv(kj) = a(ii,jj)
               kj = kj + n
  150       continue
c
  180       rv(ij) = a(i,mb) - x1
            rv6(i) = eps4
            if (order .eq. 0.0d0) rv6(i) = z(i,r)
  200    continue
c
         if (m1 .eq. 0) go to 600
c     .......... elimination with interchanges ..........
         do 580 i = 1, n
            ii = i + 1
            maxk = min0(i+m1-1,n)
            maxj = min0(n-i,m21-2) * n
c
            do 360 k = i, maxk
               kj1 = k
               j = kj1 + n
               jj = j + maxj
c
               do 340 kj = j, jj, n
                  rv(kj1) = rv(kj)
                  kj1 = kj
  340          continue
c
               rv(kj1) = 0.0d0
  360       continue
c
            if (i .eq. n) go to 580
            u = 0.0d0
            maxk = min0(i+m1,n)
            maxj = min0(n-ii,m21-2) * n
c
            do 450 j = i, maxk
               if (dabs(rv(j)) .lt. dabs(u)) go to 450
               u = rv(j)
               k = j
  450       continue
c
            j = i + n
            jj = j + maxj
            if (k .eq. i) go to 520
            kj = k
c
            do 500 ij = i, jj, n
               v = rv(ij)
               rv(ij) = rv(kj)
               rv(kj) = v
               kj = kj + n
  500       continue
c
            if (order .ne. 0.0d0) go to 520
            v = rv6(i)
            rv6(i) = rv6(k)
            rv6(k) = v
  520       if (u .eq. 0.0d0) go to 580
c
            do 560 k = ii, maxk
               v = rv(k) / u
               kj = k
c
               do 540 ij = j, jj, n
                  kj = kj + n
                  rv(kj) = rv(kj) - v * rv(ij)
  540          continue
c
               if (order .eq. 0.0d0) rv6(k) = rv6(k) - v * rv6(i)
  560       continue
c
  580    continue
c     .......... back substitution
c                for i=n step -1 until 1 do -- ..........
  600    do 630 ii = 1, n
            i = n + 1 - ii
            maxj = min0(ii,m21)
            if (maxj .eq. 1) go to 620
            ij1 = i
            j = ij1 + n
            jj = j + (maxj - 2) * n
c
            do 610 ij = j, jj, n
               ij1 = ij1 + 1
               rv6(i) = rv6(i) - rv(ij) * rv6(ij1)
  610       continue
c
  620       v = rv(i)
            if (dabs(v) .ge. eps3) go to 625
c     .......... set error -- nearly singular linear system ..........
            if (order .eq. 0.0d0) ierr = -r
            v = dsign(eps3,v)
  625       rv6(i) = rv6(i) / v
  630    continue
c
         xu = 1.0d0
         if (order .eq. 0.0d0) go to 870
c     .......... orthogonalize with respect to previous
c                members of group ..........
         if (group .eq. 0) go to 700
c
         do 680 jj = 1, group
            j = r - group - 1 + jj
            xu = 0.0d0
c
            do 640 i = 1, n
  640       xu = xu + rv6(i) * z(i,j)
c
            do 660 i = 1, n
  660       rv6(i) = rv6(i) - xu * z(i,j)
c
  680    continue
c
  700    norm = 0.0d0
c
         do 720 i = 1, n
  720    norm = norm + dabs(rv6(i))
c
         if (norm .ge. 0.1d0) go to 840
c     .......... in-line procedure for choosing
c                a new starting vector ..........
         if (its .ge. n) go to 830
         its = its + 1
         xu = eps4 / (uk + 1.0d0)
         rv6(1) = eps4
c
         do 760 i = 2, n
  760    rv6(i) = xu
c
         rv6(its) = rv6(its) - eps4 * uk
         go to 600
c     .......... set error -- non-converged eigenvector ..........
  830    ierr = -r
         xu = 0.0d0
         go to 870
c     .......... normalize so that sum of squares is
c                1 and expand to full order ..........
  840    u = 0.0d0
c
         do 860 i = 1, n
  860    u = pythag(u,rv6(i))
c
         xu = 1.0d0 / u
c
  870    do 900 i = 1, n
  900    z(i,r) = rv6(i) * xu
c
         x0 = x1
  920 continue
c
 1001 return
      end
