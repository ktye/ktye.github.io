      subroutine cortb(nm,low,igh,ar,ai,ortr,orti,m,zr,zi)
c
      integer i,j,m,la,mm,mp,nm,igh,kp1,low,mp1
      double precision ar(nm,igh),ai(nm,igh),ortr(igh),orti(igh),
     x       zr(nm,m),zi(nm,m)
      double precision h,gi,gr
c
c     this subroutine is a translation of a complex analogue of
c     the algol procedure ortbak, num. math. 12, 349-368(1968)
c     by martin and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 339-358(1971).
c
c     this subroutine forms the eigenvectors of a complex general
c     matrix by back transforming those of the corresponding
c     upper hessenberg matrix determined by  corth.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        low and igh are integers determined by the balancing
c          subroutine  cbal.  if  cbal  has not been used,
c          set low=1 and igh equal to the order of the matrix.
c
c        ar and ai contain information about the unitary
c          transformations used in the reduction by  corth
c          in their strict lower triangles.
c
c        ortr and orti contain further information about the
c          transformations used in the reduction by  corth.
c          only elements low through igh are used.
c
c        m is the number of columns of zr and zi to be back transformed.
c
c        zr and zi contain the real and imaginary parts,
c          respectively, of the eigenvectors to be
c          back transformed in their first m columns.
c
c     on output
c
c        zr and zi contain the real and imaginary parts,
c          respectively, of the transformed eigenvectors
c          in their first m columns.
c
c        ortr and orti have been altered.
c
c     note that cortb preserves vector euclidean norms.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      if (m .eq. 0) go to 200
      la = igh - 1
      kp1 = low + 1
      if (la .lt. kp1) go to 200
c     .......... for mp=igh-1 step -1 until low+1 do -- ..........
      do 140 mm = kp1, la
         mp = low + igh - mm
         if (ar(mp,mp-1) .eq. 0.0d0 .and. ai(mp,mp-1) .eq. 0.0d0)
     x      go to 140
c     .......... h below is negative of h formed in corth ..........
         h = ar(mp,mp-1) * ortr(mp) + ai(mp,mp-1) * orti(mp)
         mp1 = mp + 1
c
         do 100 i = mp1, igh
            ortr(i) = ar(i,mp-1)
            orti(i) = ai(i,mp-1)
  100    continue
c
         do 130 j = 1, m
            gr = 0.0d0
            gi = 0.0d0
c
            do 110 i = mp, igh
               gr = gr + ortr(i) * zr(i,j) + orti(i) * zi(i,j)
               gi = gi + ortr(i) * zi(i,j) - orti(i) * zr(i,j)
  110       continue
c
            gr = gr / h
            gi = gi / h
c
            do 120 i = mp, igh
               zr(i,j) = zr(i,j) + gr * ortr(i) - gi * orti(i)
               zi(i,j) = zi(i,j) + gr * orti(i) + gi * ortr(i)
  120       continue
c
  130    continue
c
  140 continue
c
  200 return
      end
