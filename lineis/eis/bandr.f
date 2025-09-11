      subroutine bandr(nm,n,mb,a,d,e,e2,matz,z)
C  REFORMULATED S2 IN LOOP 500 TO AVOID OVERFLOW. (9/29/89 BSG)
c
      integer j,k,l,n,r,i1,i2,j1,j2,kr,mb,mr,m1,nm,n2,r1,ugl,maxl,maxr
      double precision a(nm,mb),d(n),e(n),e2(n),z(nm,n)
      double precision g,u,b1,b2,c2,f1,f2,s2,dmin,dminrt
      logical matz
c
c     this subroutine is a translation of the algol procedure bandrd,
c     num. math. 12, 231-241(1968) by schwarz.
c     handbook for auto. comp., vol.ii-linear algebra, 273-283(1971).
c
c     this subroutine reduces a real symmetric band matrix
c     to a symmetric tridiagonal matrix using and optionally
c     accumulating orthogonal similarity transformations.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        mb is the (half) band width of the matrix, defined as the
c          number of adjacent diagonals, including the principal
c          diagonal, required to specify the non-zero portion of the
c          lower triangle of the matrix.
c
c        a contains the lower triangle of the symmetric band input
c          matrix stored as an n by mb array.  its lowest subdiagonal
c          is stored in the last n+1-mb positions of the first column,
c          its next subdiagonal in the last n+2-mb positions of the
c          second column, further subdiagonals similarly, and finally
c          its principal diagonal in the n positions of the last column.
c          contents of storages not part of the matrix are arbitrary.
c
c        matz should be set to .true. if the transformation matrix is
c          to be accumulated, and to .false. otherwise.
c
c     on output
c
c        a has been destroyed, except for its last two columns which
c          contain a copy of the tridiagonal matrix.
c
c        d contains the diagonal elements of the tridiagonal matrix.
c
c        e contains the subdiagonal elements of the tridiagonal
c          matrix in its last n-1 positions.  e(1) is set to zero.
c
c        e2 contains the squares of the corresponding elements of e.
c          e2 may coincide with e if the squares are not needed.
c
c        z contains the orthogonal transformation matrix produced in
c          the reduction if matz has been set to .true.  otherwise, z
c          is not referenced.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated september 1989.
c
c     ------------------------------------------------------------------
c
      dmin = 2.0d0**(-64)
      dminrt = 2.0d0**(-32)
c     .......... initialize diagonal scaling matrix ..........
      do 30 j = 1, n
   30 d(j) = 1.0d0
c
      if (.not. matz) go to 60
c
      do 50 j = 1, n
c
         do 40 k = 1, n
   40    z(j,k) = 0.0d0
c
         z(j,j) = 1.0d0
   50 continue
c
   60 m1 = mb - 1
      if (m1 - 1) 900, 800, 70
   70 n2 = n - 2
c
      do 700 k = 1, n2
         maxr = min0(m1,n-k)
c     .......... for r=maxr step -1 until 2 do -- ..........
         do 600 r1 = 2, maxr
            r = maxr + 2 - r1
            kr = k + r
            mr = mb - r
            g = a(kr,mr)
            a(kr-1,1) = a(kr-1,mr+1)
            ugl = k
c
            do 500 j = kr, n, m1
               j1 = j - 1
               j2 = j1 - 1
               if (g .eq. 0.0d0) go to 600
               b1 = a(j1,1) / g
               b2 = b1 * d(j1) / d(j)
               IF (ABS(B1) .GT. 1.0D0) THEN
                  U = 1.0D0 / B1
                  S2 = U / (U + B2)
               ELSE 
                  S2 = 1.0D0 / (1.0D0 + B1 * B2)
               ENDIF
c
               if (s2 .ge. 0.5d0 ) go to 450
               b1 = g / a(j1,1)
               b2 = b1 * d(j) / d(j1)
               c2 = 1.0d0 - s2
               d(j1) = c2 * d(j1)
               d(j) = c2 * d(j)
               f1 = 2.0d0 * a(j,m1)
               f2 = b1 * a(j1,mb)
               a(j,m1) = -b2 * (b1 * a(j,m1) - a(j,mb)) - f2 + a(j,m1)
               a(j1,mb) = b2 * (b2 * a(j,mb) + f1) + a(j1,mb)
               a(j,mb) = b1 * (f2 - f1) + a(j,mb)
c
               do 200 l = ugl, j2
                  i2 = mb - j + l
                  u = a(j1,i2+1) + b2 * a(j,i2)
                  a(j,i2) = -b1 * a(j1,i2+1) + a(j,i2)
                  a(j1,i2+1) = u
  200          continue
c
               ugl = j
               a(j1,1) = a(j1,1) + b2 * g
               if (j .eq. n) go to 350
               maxl = min0(m1,n-j1)
c
               do 300 l = 2, maxl
                  i1 = j1 + l
                  i2 = mb - l
                  u = a(i1,i2) + b2 * a(i1,i2+1)
                  a(i1,i2+1) = -b1 * a(i1,i2) + a(i1,i2+1)
                  a(i1,i2) = u
  300          continue
c
               i1 = j + m1
               if (i1 .gt. n) go to 350
               g = b2 * a(i1,1)
  350          if (.not. matz) go to 500
c
               do 400 l = 1, n
                  u = z(l,j1) + b2 * z(l,j)
                  z(l,j) = -b1 * z(l,j1) + z(l,j)
                  z(l,j1) = u
  400          continue
c
               go to 500
c
  450          u = d(j1)
               d(j1) = s2 * d(j)
               d(j) = s2 * u
               f1 = 2.0d0 * a(j,m1)
               f2 = b1 * a(j,mb)
               u = b1 * (f2 - f1) + a(j1,mb)
               a(j,m1) = b2 * (b1 * a(j,m1) - a(j1,mb)) + f2 - a(j,m1)
               a(j1,mb) = b2 * (b2 * a(j1,mb) + f1) + a(j,mb)
               a(j,mb) = u
c
               do 460 l = ugl, j2
                  i2 = mb - j + l
                  u = b2 * a(j1,i2+1) + a(j,i2)
                  a(j,i2) = -a(j1,i2+1) + b1 * a(j,i2)
                  a(j1,i2+1) = u
  460          continue
c
               ugl = j
               a(j1,1) = b2 * a(j1,1) + g
               if (j .eq. n) go to 480
               maxl = min0(m1,n-j1)
c
               do 470 l = 2, maxl
                  i1 = j1 + l
                  i2 = mb - l
                  u = b2 * a(i1,i2) + a(i1,i2+1)
                  a(i1,i2+1) = -a(i1,i2) + b1 * a(i1,i2+1)
                  a(i1,i2) = u
  470          continue
c
               i1 = j + m1
               if (i1 .gt. n) go to 480
               g = a(i1,1)
               a(i1,1) = b1 * a(i1,1)
  480          if (.not. matz) go to 500
c
               do 490 l = 1, n
                  u = b2 * z(l,j1) + z(l,j)
                  z(l,j) = -z(l,j1) + b1 * z(l,j)
                  z(l,j1) = u
  490          continue
c
  500       continue
c
  600    continue
c
         if (mod(k,64) .ne. 0) go to 700
c     .......... rescale to avoid underflow or overflow ..........
         do 650 j = k, n
            if (d(j) .ge. dmin) go to 650
            maxl = max0(1,mb+1-j)
c
            do 610 l = maxl, m1
  610       a(j,l) = dminrt * a(j,l)
c
            if (j .eq. n) go to 630
            maxl = min0(m1,n-j)
c
            do 620 l = 1, maxl
               i1 = j + l
               i2 = mb - l
               a(i1,i2) = dminrt * a(i1,i2)
  620       continue
c
  630       if (.not. matz) go to 645
c
            do 640 l = 1, n
  640       z(l,j) = dminrt * z(l,j)
c
  645       a(j,mb) = dmin * a(j,mb)
            d(j) = d(j) / dmin
  650    continue
c
  700 continue
c     .......... form square root of scaling matrix ..........
  800 do 810 j = 2, n
  810 e(j) = dsqrt(d(j))
c
      if (.not. matz) go to 840
c
      do 830 j = 1, n
c
         do 820 k = 2, n
  820    z(j,k) = e(k) * z(j,k)
c
  830 continue
c
  840 u = 1.0d0
c
      do 850 j = 2, n
         a(j,m1) = u * e(j) * a(j,m1)
         u = e(j)
         e2(j) = a(j,m1) ** 2
         a(j,mb) = d(j) * a(j,mb)
         d(j) = a(j,mb)
         e(j) = a(j,m1)
  850 continue
c
      d(1) = a(1,mb)
      e(1) = 0.0d0
      e2(1) = 0.0d0
      go to 1001
c
  900 do 950 j = 1, n
         d(j) = a(j,mb)
         e(j) = 0.0d0
         e2(j) = 0.0d0
  950 continue
c
 1001 return
      end
