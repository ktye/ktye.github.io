/ plots are created using multiple calls to plot.
/ depending on the type of the argument: 
/  plot 0                    /integer: select current plot (side-by-side)
/  plot\`polar                /symbol : \`xy\`bar\`polar\`ampang\`square
/  plot\`xstr\`ystr\`title      /symbols: 1..3 axis labels
/  plot(x;y0;y1;..)          /list of: x(I|F) y(I|F|Z), multi-line
/  plot(x0;x1;y0;y1)         /floats : axis limits y1|x0,x1|x0,x1,0,y1
/ 
/ calls to plot return the plot id (0 by default) which can be used
/ to index into data.
/ 
/ double click to mark a datapoint, or click and move to zoom
/ or use the mouse wheel, outside the axis (over x or y) zoom
/ shift-click-move(pan),        cntrl-click-move(pan ver/hor)
/ shift-cntrl-click-move            (measure distance/vector)
/ 
/ examples
/  plot(!100;?100)
/  plot'((100;?100);1;(10;?10;1+?10))
/  plot`"ln x"`"ln ln(1/1-F)"`"weibull plot";,/wblplot'(abs@?1000a;abs@2*?1000a)
/  hist[20 0 4;abs@?10000a];plot```"rayleigh distribution"
/  plot'(`bar;(1 2 3 4 5;10 2 5 11 1;2 3 2 1 7;1 2 3 4 5);`class`count`"bar plot")
/  plot'(`stacked;(1 2 3 4 5;10 2 5 11 1;2 3 2 1 7;1 2 3 4 5);`class`count`"stacked bar plot")
/  x:0.02*!n:123;y0:2a30%1-0.5a90+x*x;y1:y0*1.1a165;plot'((x;y0);(x;y1);1;`polar;(x;y0;y1))

hist:{n:_0.+*x:(0.+x),(&/y;|/y);a:x 1;b:x 2;x:a+(w:(b-a)%n)*!n;d:#'=x'y;d[0]+:0|d@-1;plot'(`bar;(x+0.5*w;0|d@!#x))}

fit:{n:#x;u:+/x*x;v:+/x*y;((u*y)-x*v;(n*v)-x*y:+/y)%(n*u)-x*x:+/x}   /(a;b) line-fit y:a+b*x
wbl:{(-10|log x;log log 1%1-cdf:(-1_(1+!n)*d),1-0.5*d:1.%n:#x:^x)}   /(X;Y) weibull transform
qwbl:{[p;k;l]l*(-log 1-p)^1%k}                                       /quantile for p from k l
klwbl:{[XY]ab:fit.XY;(k;exp(-*ab)%k:ab 1)}
wblplot:{plot xy:wbl x;+`shape`scale`q95!,'kl,(qwbl 0.95).kl:klwbl xy}


/interpolation: lin[0 4.;3 4.;0.+!5] /3. 3.25 3.5 3.75 4.
lin:{$[`L~@z;lin[x;y]'z;[dx:0.+1_-'x;dy:0.+1_-'y;b:(-2+#x)&0|x'z;(y b)+(dy b)*(z-x b)%dx b]]}

