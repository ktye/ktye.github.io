/rigid rotor properties

/same inputs
/per shaft element: L D d E rho
/per node:          m J Q cx cy U

/output:            M Z j q nx ny (all scalar, except nx ny: 1st/2nd critical speed per direction)

M:(+/m)++/ms:.25p*rho*L*(D*D)-d*d  /M(total mass) ms(shaft element mass)
Z:((+/ms*s)++/m*z)%M               /center of mass
z:(0,+\L;s:(+\L)-0.5*L)-Z          /node and shaft(center) positions, from com
j:J++/.125*ms*dd:(D*D)+d*d         /moments of inertia j(around rotation axis) 
q:Q++/ ms*(zs*zs)+(.75*dd)*L*L)%12 /                   q(perpendicular)

/bearing criticals
/ mẍ++/ci*xi   =0  x:displacement at center of mass, xi:at spring positions zi, xi:x+zi*φ
/ Jφ++/zi*ci*xi=0  φ(with dots). 𝜈:%J/m radius of inertia, let y:φ𝜈 to get rid of rotations
/ →𝜈mÿ+(+/zi*ci*x)++/zi²*ci*y%𝜈=0
/
/ ẍ + (c0    c1%𝜈 )(x) = 0    with c0:+/xi; c1:+/xi*zi; c2:+/xi*zi²
/ ÿ + (c1%𝜈  v2%𝜈²)(y) = 0
/ matrix A:(a b;b d)
/ critical frequencies are the sqrts of the eigenvalues of A
/ eigs:mean±%mean²-det, mean:0.5*a+d; det:(a*d)-b²
crit:{[m;J;c;z];c%:m;v:%m/J;a:+/c;b:v*+/c*z;d:(v*v)*+/c*z*z;me:.5*a+b;(30%pi)*%(me+s;me-s:%(me*me)-(a*d)+b*b)}

nx:crit[M;j;cx;z]
ny:crit[M;j;cy;z]
