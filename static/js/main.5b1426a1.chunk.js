(this.webpackJsonpalgorithmd=this.webpackJsonpalgorithmd||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(4),c=a.n(o),l=(a(3),a(1)),u=function(){var e=Object(n.useState)(10),t=Object(l.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(41260),u=Object(l.a)(c,2),i=u[0],s=u[1],m=Object(n.useState)(3),p=Object(l.a)(m,2),h=p[0],f=p[1],g=Object(n.useState)([]),v=Object(l.a)(g,2),b=v[0],j=v[1],d=Object(n.useState)(),E=Object(l.a)(d,2),O=E[0],y=E[1],k=Object(n.useState)(),w=Object(l.a)(k,2),M=w[0],S=w[1],z=Object(n.useState)(),N=Object(l.a)(z,2),C=N[0],I=N[1],F=Object(n.useState)(.1),x=Object(l.a)(F,2),B=x[0],P=x[1],J=Object(n.useState)(.75),K=Object(l.a)(J,2),A=K[0],W=K[1],q=function(e){"number"===e.target.id&&o(e.target.value),"result"===e.target.id&&s(e.target.value),"iterations"===e.target.id&&f(e.target.value),"mutations"===e.target.id&&P(e.target.value),"cross"===e.target.id&&W(e.target.value)};function D(e){for(var t=0,a=e,n="";t<32;t++,n+=String(a>>>31),a<<=1);return(n=n.replace(/\B(?=(.{8})+(?!.))/g," ")).slice(-5)}var G=function(e){var t=[];return e.map((function(e){var a=Math.log(32)/Math.log(2)+4*Math.pow(e,2)-9*e;t.push(a)})),console.log("wynik adaptacji: "+t),t},H=function(e){var t=0;return e.map((function(e){t+=e})),console.log("suma adaptacji populacji: "+t),t},L=function(e,t){var a=[];return e.map((function(e){var n=e/t*100;a.push(n)})),console.log("wartosc procentowa przystosowania: "+a),a},Q=function(e,t){var a=[],n=0;e.map((function(e){n+=e,a.push(n)}));for(var r=[],o=0;o<t.length;o++)for(var c=100*Math.random(),l=0;l<t.length;l++)0===l&&c<a[l]?r.push(t[l]):l>0&&c>a[l-1]&&c<a[l]&&r.push(t[l]);return console.log("populacja po selekcji"+r),r},R=function(e){for(var t=e.length/2,a=[],n=0,r=0;r<t;r++)a.push({1:e[n],2:e[n+1]}),n+=2;var o="",c="",l=[];a.map((function(e,t){if(Math.random()<=A){var n=Math.floor(4*Math.random())+1,r=D(e[1]),u=D(e[2]);a.splice(t,1);var i=r.substr(n),s=u.substr(n);o=r.slice(0,n)+s,c=u.slice(0,n)+i,l.push(parseInt(o,2),parseInt(c,2))}}));for(var u=0;u<a.length;u++)l.push(a[u][1]),l.push(a[u][2]);return console.log("Populacja po krzyzowaniu: "+l,A),l},T=function(e){return e.map((function(t,a){if(Math.random()<=B){var n=Math.floor(5*Math.random())+1,r=D(t),o=r.slice(0,n-1),c=r.substring(n),l=r.charAt(n-1);0==l?l=1:1==l&&(l=0);var u=o+l+c;e.splice(a,1,parseInt(u,2))}})),console.log("Populacja po mutacji: "+e,B),e},U=function(e,t){var a=0,n=0,r=[];return e.map((function(e,t){return e>=a&&(a=e,n=t),e})),r.push(a,",",t[n]),console.log("Najlepszy chromoson: "+r),r},V=function(e,t,a){for(var n,r=function(e){for(var t=[],a=0;a<e;a++)t.push(Math.floor(32*Math.random()));return console.log("Startowa poulacja: "+t),t}(e),o=G(r),c=H(o),l=0;c<t&&l<a;){var u=L(o,c),i=Q(u,r),s=R(i),m=T(s);r=m,o=G(m),l++,console.log("Iteracja numer: "+l),c=H(o),n=U(o,r)}j(n),y(o),I(c),S(l)};return r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"inputs"},r.a.createElement("label",{htmlFor:"number"}," Wielko\u015b\u0107 populacji",r.a.createElement("input",{type:"number",id:"number",value:a,onChange:function(e){return q(e)}})),r.a.createElement("label",{htmlFor:"resut"}," Oczekiwany wynik",r.a.createElement("input",{type:"number",id:"result",value:i,onChange:function(e){return q(e)}})),r.a.createElement("label",{htmlFor:"iterations"}," Pokolenia",r.a.createElement("input",{type:"number",id:"iterations",value:h,onChange:function(e){return q(e)}})),r.a.createElement("label",{htmlFor:"cross"}," Krzyzowanie",r.a.createElement("input",{type:"number",id:"cross",value:A,min:"0",max:"1",onChange:function(e){return q(e)}})),r.a.createElement("label",{htmlFor:"mutations"}," Mutacja",r.a.createElement("input",{type:"number",id:"mutations",value:B,min:"0",max:"1",onChange:function(e){return q(e)}}))),r.a.createElement("button",{onClick:function(){return V(a,i,h)}},"Oblicz"),r.a.createElement("div",{className:"result"},r.a.createElement("h5",null," Najlepszy chromoson: ",b&&b.map((function(e,t){return r.a.createElement("span",{key:t},e," ")}))," "),C===i?r.a.createElement("h5",{style:{color:"green"}},"Suma adaptacji:  ",C," "):r.a.createElement("h5",null,"Suma adaptacji: ",C),r.a.createElement("h5",null,"Ko\u0144cowa populacja: ",O&&O.map((function(e,t){return r.a.createElement("p",{key:t},"  ",e," ")}))),M>=h?r.a.createElement("h5",{style:{color:"green"}},"Ilosc pokole\u0144:  ",M," "):r.a.createElement("h5",null,"Ilosc pokole\u0144: ",M)))};var i=function(){return r.a.createElement("div",{className:"Background"},r.a.createElement("div",{className:"Frame"},r.a.createElement(u,{className:"Content"})))};c.a.render(r.a.createElement(i,null),document.getElementById("root"))},3:function(e,t,a){},5:function(e,t,a){e.exports=a(10)}},[[5,1,2]]]);
//# sourceMappingURL=main.5b1426a1.chunk.js.map