/parent vector
/P:0 0 1 2 1 1 5 1 7 8 8 8 11 11 7 14
P:0 0 0 0 3 3


/number of children per node
n:(&#P){x[y]+:1}/P;n[0]-:1

/initial checked state [+] [-] to open a subtree
/leaves are always open
c:~n

/visiblility from checked vector
/root is always visible (1,1_)
vc:{1,1_&/1_(x@P@)\:!#P}