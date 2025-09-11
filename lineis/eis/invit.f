      subroutine invit(nm,n,a,wr,wi,select,mm,m,z,ierr,rm1,rv1,rv2)
c
      integer i,j,k,l,m,n,s,ii,ip,mm,mp,nm,ns,n1,uk,ip1,its,km1,ierr
      double precision a(nm,n),wr(n),wi(n),z(nm,mm),rm1(n,n),
     x       rv1(n),rv2(n)
      double precision t,w,x,y,eps3,norm,normv,epsilon,growto,ilambd,
     x       pythag,rlambd,ukroot
      logical select(n)
c
c     this subroutine is a translation of the algol procedure invit
c     by peters and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 418-439(1971).
c
c     this subroutine finds those eigenvectors of a real upper
c     hessenberg matrix corresponding to specified eigenvalues,
c     using inverse iteration.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        a contains the hessenberg matrix.
c
c        wr and wi contain the real and imaginary parts, respectively,
c          of the eigenvalues of the matrix.  the eigenvalues must be
c          stored in a manner identical to that of subroutine  hqr,
c          which recognizes possible splitting of the matrix.
c
c        select specifies the eigenvectors to be found. the
c          eigenvector corresponding to the j-th eigenvalue is
c          specified by setting select(j) to .true..
c
c        mm should be set to an upper bound for the number of
c          columns required to store the eigenvectors to be found.
c          note that two columns are required to store the
c          eigenvector corresponding to a complex eigenvalue.
c
c     on output
c
c        a and wi are unaltered.
c
c        wr may have been altered since close eigenvalues are perturbed
c          slightly in searching for independent eigenvectors.
c
c        select may have been altered.  if the elements corresponding
c          to a pair of conjugate complex eigenvalues were each
c          initially set to .true., the program resets the second of
c          the two elements to .false..
c
c        m is the number of columns actually used to store
c          the eigenvectors.
c
c        z contains the real and imaginary parts of the eigenvectors.
c          if the next selected eigenvalue is real, the next column
c          of z contains its eigenvector.  if the eigenvalue is
c          complex, the next two columns of z contain the real and
c          imaginary parts of its eigenvector.  the eigenvectors are
c          normalized so that the component of largest magnitude is 1.
c          any vector which fails the acceptance test is set to zero.
c
c        ierr is set to
c          zero       for normal return,
c          -(2*n+1)   if more than mm columns of z are necessary
c                     to store the eigenvectors corresponding to
c                     the specified eigenvalues.
c          -k         if the iteration corresponding to the k-th
c                     value fails,
c          -(n+k)     if both error situations occur.
c
c        rm1, rv1, and rv2 are temporary storage arrays.  note that rm1
c          is square of dimension n by n and, augmented by two columns
c          of z, is the transpose of the corresponding algol b array.
c
c     the algol procedure guessvec appears in invit in line.
c
c     calls cdiv for complex division.
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
      uk = 0
      s = 1
c     .......... ip = 0, real eigenvalue
c                     1, first of conjugate complex pair
c                    -1, second of conjugate complex pair ..........
      ip = 0
      n1 = n - 1
c
      do 980 k = 1, n
         if (wi(k) .eq. 0.0d0 .or. ip .lt. 0) go to 100
         ip = 1
         if (select(k) .and. select(k+1)) select(k+1) = .false.
  100    if (.not. select(k)) go to 960
         if (wi(k) .ne. 0.0d0) s = s + 1
         if (s .gt. mm) go to 1000
         if (uk .ge. k) go to 200
c     .......... check for possible splitting ..........
         do 120 uk = k, n
            if (uk .eq. n) go to 140
            if (a(uk+1,uk) .eq. 0.0d0) go to 140
  120    continue
c     .......... compute infinity norm of leading uk by uk
c                (hessenberg) matrix ..........
  140    norm = 0.0d0
         mp = 1
c
         do 180 i = 1, uk
            x = 0.0d0
c
            do 160 j = mp, uk
  160       x = x + dabs(a(i,j))
c
            if (x .gt. norm) norm = x
            mp = i
  180    continue
c     .......... eps3 replaces zero pivot in decomposition
c                and close roots are modified by eps3 ..........
         if (norm .eq. 0.0d0) norm = 1.0d0
         eps3 = epsilon(norm)
c     .......... growto is the criterion for the growth ..........
         ukroot = uk
         ukroot = dsqrt(ukroot)
         growto = 0.1d0 / ukroot
  200    rlambd = wr(k)
         ilambd = wi(k)
         if (k .eq. 1) go to 280
         km1 = k - 1
         go to 240
c     .......... perturb eigenvalue if it is close
c                to any previous eigenvalue ..........
  220    rlambd = rlambd + eps3
c     .......... for i=k-1 step -1 until 1 do -- ..........
  240    do 260 ii = 1, km1
            i = k - ii
            if (select(i) .and. dabs(wr(i)-rlambd) .lt. eps3 .and.
     x         dabs(wi(i)-ilambd) .lt. eps3) go to 220
  260    continue
c
         wr(k) = rlambd
c     .......... perturb conjugate eigenvalue to match ..........
         ip1 = k + ip
         wr(ip1) = rlambd
c     .......... form upper hessenberg a-rlambd*i (transposed)
c                and initial real vector ..........
  280    mp = 1
c
         do 320 i = 1, uk
c
            do 300 j = mp, uk
  300       rm1(j,i) = a(i,j)
c
            rm1(i,i) = rm1(i,i) - rlambd
            mp = i
            rv1(i) = eps3
  320    continue
c
         its = 0
         if (ilambd .ne. 0.0d0) go to 520
c     .......... real eigenvalue.
c                triangular decomposition with interchanges,
c                replacing zero pivots by eps3 ..........
         if (uk .eq. 1) go to 420
c
         do 400 i = 2, uk
            mp = i - 1
            if (dabs(rm1(mp,i)) .le. dabs(rm1(mp,mp))) go to 360
c
            do 340 j = mp, uk
               y = rm1(j,i)
               rm1(j,i) = rm1(j,mp)
               rm1(j,mp) = y
  340       continue
c
  360       if (rm1(mp,mp) .eq. 0.0d0) rm1(mp,mp) = eps3
            x = rm1(mp,i) / rm1(mp,mp)
            if (x .eq. 0.0d0) go to 400
c
            do 380 j = i, uk
  380       rm1(j,i) = rm1(j,i) - x * rm1(j,mp)
c
  400    continue
c
  420    if (rm1(uk,uk) .eq. 0.0d0) rm1(uk,uk) = eps3
c     .......... back substitution for real vector
c                for i=uk step -1 until 1 do -- ..........
  440    do 500 ii = 1, uk
            i = uk + 1 - ii
            y = rv1(i)
            if (i .eq. uk) go to 480
            ip1 = i + 1
c
            do 460 j = ip1, uk
  460       y = y - rm1(j,i) * rv1(j)
c
  480       rv1(i) = y / rm1(i,i)
  500    continue
c
         go to 740
c     .......... complex eigenvalue.
c                triangular decomposition with interchanges,
c                replacing zero pivots by eps3.  store imaginary
c                parts in upper triangle starting at (1,3) ..........
  520    ns = n - s
         z(1,s-1) = -ilambd
         z(1,s) = 0.0d0
         if (n .eq. 2) go to 550
         rm1(1,3) = -ilambd
         z(1,s-1) = 0.0d0
         if (n .eq. 3) go to 550
c
         do 540 i = 4, n
  540    rm1(1,i) = 0.0d0
c
  550    do 640 i = 2, uk
            mp = i - 1
            w = rm1(mp,i)
            if (i .lt. n) t = rm1(mp,i+1)
            if (i .eq. n) t = z(mp,s-1)
            x = rm1(mp,mp) * rm1(mp,mp) + t * t
            if (w * w .le. x) go to 580
            x = rm1(mp,mp) / w
            y = t / w
            rm1(mp,mp) = w
            if (i .lt. n) rm1(mp,i+1) = 0.0d0
            if (i .eq. n) z(mp,s-1) = 0.0d0
c
            do 560 j = i, uk
               w = rm1(j,i)
               rm1(j,i) = rm1(j,mp) - x * w
               rm1(j,mp) = w
               if (j .lt. n1) go to 555
               l = j - ns
               z(i,l) = z(mp,l) - y * w
               z(mp,l) = 0.0d0
               go to 560
  555          rm1(i,j+2) = rm1(mp,j+2) - y * w
               rm1(mp,j+2) = 0.0d0
  560       continue
c
            rm1(i,i) = rm1(i,i) - y * ilambd
            if (i .lt. n1) go to 570
            l = i - ns
            z(mp,l) = -ilambd
            z(i,l) = z(i,l) + x * ilambd
            go to 640
  570       rm1(mp,i+2) = -ilambd
            rm1(i,i+2) = rm1(i,i+2) + x * ilambd
            go to 640
  580       if (x .ne. 0.0d0) go to 600
            rm1(mp,mp) = eps3
            if (i .lt. n) rm1(mp,i+1) = 0.0d0
            if (i .eq. n) z(mp,s-1) = 0.0d0
            t = 0.0d0
            x = eps3 * eps3
  600       w = w / x
            x = rm1(mp,mp) * w
            y = -t * w
c
            do 620 j = i, uk
               if (j .lt. n1) go to 610
               l = j - ns
               t = z(mp,l)
               z(i,l) = -x * t - y * rm1(j,mp)
               go to 615
  610          t = rm1(mp,j+2)
               rm1(i,j+2) = -x * t - y * rm1(j,mp)
  615          rm1(j,i) = rm1(j,i) - x * rm1(j,mp) + y * t
  620       continue
c
            if (i .lt. n1) go to 630
            l = i - ns
            z(i,l) = z(i,l) - ilambd
            go to 640
  630       rm1(i,i+2) = rm1(i,i+2) - ilambd
  640    continue
c
         if (uk .lt. n1) go to 650
         l = uk - ns
         t = z(uk,l)
         go to 655
  650    t = rm1(uk,uk+2)
  655    if (rm1(uk,uk) .eq. 0.0d0 .and. t .eq. 0.0d0) rm1(uk,uk) = eps3
c     .......... back substitution for complex vector
c                for i=uk step -1 until 1 do -- ..........
  660    do 720 ii = 1, uk
            i = uk + 1 - ii
            x = rv1(i)
            y = 0.0d0
            if (i .eq. uk) go to 700
            ip1 = i + 1
c
            do 680 j = ip1, uk
               if (j .lt. n1) go to 670
               l = j - ns
               t = z(i,l)
               go to 675
  670          t = rm1(i,j+2)
  675          x = x - rm1(j,i) * rv1(j) + t * rv2(j)
               y = y - rm1(j,i) * rv2(j) - t * rv1(j)
  680       continue
c
  700       if (i .lt. n1) go to 710
            l = i - ns
            t = z(i,l)
            go to 715
  710       t = rm1(i,i+2)
  715       call cdiv(x,y,rm1(i,i),t,rv1(i),rv2(i))
  720    continue
c     .......... acceptance test for real or complex
c                eigenvector and normalization ..........
  740    its = its + 1
         norm = 0.0d0
         normv = 0.0d0
c
         do 780 i = 1, uk
            if (ilambd .eq. 0.0d0) x = dabs(rv1(i))
            if (ilambd .ne. 0.0d0) x = pythag(rv1(i),rv2(i))
            if (normv .ge. x) go to 760
            normv = x
            j = i
  760       norm = norm + x
  780    continue
c
         if (norm .lt. growto) go to 840
c     .......... accept vector ..........
         x = rv1(j)
         if (ilambd .eq. 0.0d0) x = 1.0d0 / x
         if (ilambd .ne. 0.0d0) y = rv2(j)
c
         do 820 i = 1, uk
            if (ilambd .ne. 0.0d0) go to 800
            z(i,s) = rv1(i) * x
            go to 820
  800       call cdiv(rv1(i),rv2(i),x,y,z(i,s-1),z(i,s))
  820    continue
c
         if (uk .eq. n) go to 940
         j = uk + 1
         go to 900
c     .......... in-line procedure for choosing
c                a new starting vector ..........
  840    if (its .ge. uk) go to 880
         x = ukroot
         y = eps3 / (x + 1.0d0)
         rv1(1) = eps3
c
         do 860 i = 2, uk
  860    rv1(i) = y
c
         j = uk - its + 1
         rv1(j) = rv1(j) - eps3 * x
         if (ilambd .eq. 0.0d0) go to 440
         go to 660
c     .......... set error -- unaccepted eigenvector ..........
  880    j = 1
         ierr = -k
c     .......... set remaining vector components to zero ..........
  900    do 920 i = j, n
            z(i,s) = 0.0d0
            if (ilambd .ne. 0.0d0) z(i,s-1) = 0.0d0
  920    continue
c
  940    s = s + 1
  960    if (ip .eq. (-1)) ip = 0
         if (ip .eq. 1) ip = -1
  980 continue
c
      go to 1001
c     .......... set error -- underestimate of eigenvector
c                space required ..........
 1000 if (ierr .ne. 0) ierr = ierr - n
      if (ierr .eq. 0) ierr = -(2 * n + 1)
 1001 m = s - 1 - iabs(ip)
      return
      end
