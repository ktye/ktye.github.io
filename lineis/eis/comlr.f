      subroutine comlr(nm,n,low,igh,hr,hi,wr,wi,ierr)
c
      integer i,j,l,m,n,en,ll,mm,nm,igh,im1,itn,its,low,mp1,enm1,ierr
      double precision hr(nm,n),hi(nm,n),wr(n),wi(n)
      double precision si,sr,ti,tr,xi,xr,yi,yr,zzi,zzr,tst1,tst2
c
c     this subroutine is a translation of the algol procedure comlr,
c     num. math. 12, 369-376(1968) by martin and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 396-403(1971).
c
c     this subroutine finds the eigenvalues of a complex
c     upper hessenberg matrix by the modified lr method.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        low and igh are integers determined by the balancing
c          subroutine  cbal.  if  cbal  has not been used,
c          set low=1, igh=n.
c
c        hr and hi contain the real and imaginary parts,
c          respectively, of the complex upper hessenberg matrix.
c          their lower triangles below the subdiagonal contain the
c          multipliers which were used in the reduction by  comhes,
c          if performed.
c
c     on output
c
c        the upper hessenberg portions of hr and hi have been
c          destroyed.  therefore, they must be saved before
c          calling  comlr  if subsequent calculation of
c          eigenvectors is to be performed.
c
c        wr and wi contain the real and imaginary parts,
c          respectively, of the eigenvalues.  if an error
c          exit is made, the eigenvalues should be correct
c          for indices ierr+1,...,n.
c
c        ierr is set to
c          zero       for normal return,
c          j          if the limit of 30*n iterations is exhausted
c                     while the j-th eigenvalue is being sought.
c
c     calls cdiv for complex division.
c     calls csroot for complex square root.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 0
c     .......... store roots isolated by cbal ..........
      do 200 i = 1, n
         if (i .ge. low .and. i .le. igh) go to 200
         wr(i) = hr(i,i)
         wi(i) = hi(i,i)
  200 continue
c
      en = igh
      tr = 0.0d0
      ti = 0.0d0
      itn = 30*n
c     .......... search for next eigenvalue ..........
  220 if (en .lt. low) go to 1001
      its = 0
      enm1 = en - 1
c     .......... look for single small sub-diagonal element
c                for l=en step -1 until low d0 -- ..........
  240 do 260 ll = low, en
         l = en + low - ll
         if (l .eq. low) go to 300
         tst1 = dabs(hr(l-1,l-1)) + dabs(hi(l-1,l-1))
     x            + dabs(hr(l,l)) + dabs(hi(l,l))
         tst2 = tst1 + dabs(hr(l,l-1)) + dabs(hi(l,l-1))
         if (tst2 .eq. tst1) go to 300
  260 continue
c     .......... form shift ..........
  300 if (l .eq. en) go to 660
      if (itn .eq. 0) go to 1000
      if (its .eq. 10 .or. its .eq. 20) go to 320
      sr = hr(en,en)
      si = hi(en,en)
      xr = hr(enm1,en) * hr(en,enm1) - hi(enm1,en) * hi(en,enm1)
      xi = hr(enm1,en) * hi(en,enm1) + hi(enm1,en) * hr(en,enm1)
      if (xr .eq. 0.0d0 .and. xi .eq. 0.0d0) go to 340
      yr = (hr(enm1,enm1) - sr) / 2.0d0
      yi = (hi(enm1,enm1) - si) / 2.0d0
      call csroot(yr**2-yi**2+xr,2.0d0*yr*yi+xi,zzr,zzi)
      if (yr * zzr + yi * zzi .ge. 0.0d0) go to 310
      zzr = -zzr
      zzi = -zzi
  310 call cdiv(xr,xi,yr+zzr,yi+zzi,xr,xi)
      sr = sr - xr
      si = si - xi
      go to 340
c     .......... form exceptional shift ..........
  320 sr = dabs(hr(en,enm1)) + dabs(hr(enm1,en-2))
      si = dabs(hi(en,enm1)) + dabs(hi(enm1,en-2))
c
  340 do 360 i = low, en
         hr(i,i) = hr(i,i) - sr
         hi(i,i) = hi(i,i) - si
  360 continue
c
      tr = tr + sr
      ti = ti + si
      its = its + 1
      itn = itn - 1
c     .......... look for two consecutive small
c                sub-diagonal elements ..........
      xr = dabs(hr(enm1,enm1)) + dabs(hi(enm1,enm1))
      yr = dabs(hr(en,enm1)) + dabs(hi(en,enm1))
      zzr = dabs(hr(en,en)) + dabs(hi(en,en))
c     .......... for m=en-1 step -1 until l do -- ..........
      do 380 mm = l, enm1
         m = enm1 + l - mm
         if (m .eq. l) go to 420
         yi = yr
         yr = dabs(hr(m,m-1)) + dabs(hi(m,m-1))
         xi = zzr
         zzr = xr
         xr = dabs(hr(m-1,m-1)) + dabs(hi(m-1,m-1))
         tst1 = zzr / yi * (zzr + xr + xi)
         tst2 = tst1 + yr
         if (tst2 .eq. tst1) go to 420
  380 continue
c     .......... triangular decomposition h=l*r ..........
  420 mp1 = m + 1
c
      do 520 i = mp1, en
         im1 = i - 1
         xr = hr(im1,im1)
         xi = hi(im1,im1)
         yr = hr(i,im1)
         yi = hi(i,im1)
         if (dabs(xr) + dabs(xi) .ge. dabs(yr) + dabs(yi)) go to 460
c     .......... interchange rows of hr and hi ..........
         do 440 j = im1, en
            zzr = hr(im1,j)
            hr(im1,j) = hr(i,j)
            hr(i,j) = zzr
            zzi = hi(im1,j)
            hi(im1,j) = hi(i,j)
            hi(i,j) = zzi
  440    continue
c
         call cdiv(xr,xi,yr,yi,zzr,zzi)
         wr(i) = 1.0d0
         go to 480
  460    call cdiv(yr,yi,xr,xi,zzr,zzi)
         wr(i) = -1.0d0
  480    hr(i,im1) = zzr
         hi(i,im1) = zzi
c
         do 500 j = i, en
            hr(i,j) = hr(i,j) - zzr * hr(im1,j) + zzi * hi(im1,j)
            hi(i,j) = hi(i,j) - zzr * hi(im1,j) - zzi * hr(im1,j)
  500    continue
c
  520 continue
c     .......... composition r*l=h ..........
      do 640 j = mp1, en
         xr = hr(j,j-1)
         xi = hi(j,j-1)
         hr(j,j-1) = 0.0d0
         hi(j,j-1) = 0.0d0
c     .......... interchange columns of hr and hi,
c                if necessary ..........
         if (wr(j) .le. 0.0d0) go to 580
c
         do 540 i = l, j
            zzr = hr(i,j-1)
            hr(i,j-1) = hr(i,j)
            hr(i,j) = zzr
            zzi = hi(i,j-1)
            hi(i,j-1) = hi(i,j)
            hi(i,j) = zzi
  540    continue
c
  580    do 600 i = l, j
            hr(i,j-1) = hr(i,j-1) + xr * hr(i,j) - xi * hi(i,j)
            hi(i,j-1) = hi(i,j-1) + xr * hi(i,j) + xi * hr(i,j)
  600    continue
c
  640 continue
c
      go to 240
c     .......... a root found ..........
  660 wr(en) = hr(en,en) + tr
      wi(en) = hi(en,en) + ti
      en = enm1
      go to 220
c     .......... set error -- all eigenvalues have not
c                converged after 30*n iterations ..........
 1000 ierr = en
 1001 return
      end
