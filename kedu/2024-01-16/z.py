from numpy import*;import timeit
def t(n,a):print(int(1e3*timeit.timeit(a,number=int(n),globals=globals())))
def r(n,m):return random.randint(m,size=int(n))if int==type(m) else m*random.rand(int(n)).astype('f4')if float==type(m)else n*"a"
e=2.3
t(1e6,'----------e')
e=r(1000,1.0)
g=(2+3j)+e
t(1e6,'-e')
t(1e6,'1/e')
t(1e6,'sqrt(e)')
t(1e6,'g*g')
