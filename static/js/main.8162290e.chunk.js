(this.webpackJsonppwa=this.webpackJsonppwa||[]).push([[0],{59:function(e,t,n){},61:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var r,a,i=n(0),o=n.n(i),c=n(9),s=n.n(c),u=(n(59),n(28)),d=n(5),l=n(22),p=n.n(l),f=n.p+"static/media/logo.6ce24c58.svg",m=(n(61),n(16)),b=n(34),j=n(20);!function(e){e.Android="Android",e.Ipad="Ipad",e.Iphone="Iphone",e.Blackberry="Blackberry",e.Windows="Windows",e.Mac="Mac",e.Linux="Linux",e.Unknown="Unknown"}(r||(r={})),function(e){e.Edge="Edge",e.Opera="Opera",e.SamsungInternet="Samsung Internet",e.Chrome="Chrome",e.Vivaldi="Vivaldi",e.Yandex="Yandex",e.Firefox="Firefox",e.Safari="Safari",e.InternetExplorer="Internet Explorer",e.Chromium="Chromium",e.Unknown="Unknown"}(a||(a={}));var v=function(){function e(){Object(b.a)(this,e)}return Object(j.a)(e,null,[{key:"isValueMissing",value:function(e){return void 0===e||null===e}},{key:"isDesktop",value:function(){return window.matchMedia("(hover: hover) and (pointer: fine)").matches}},{key:"getOsName",value:function(){var e,t=window.navigator.userAgent,n=(null===(e=window.navigator.userAgentData)||void 0===e?void 0:e.platform)||window.navigator.platform;switch(!0){case[t,n].some((function(e){return/Android/i.test(e)})):return r.Android;case[t,n].some((function(e){return/iPad/i.test(e)})):return r.Ipad;case[t,n].some((function(e){return/iPhone|iPod/i.test(e)})):return r.Iphone;case[t,n].some((function(e){return/BlackBerry/i.test(e)})):return r.Blackberry;case[t,n].some((function(e){return/Win32|Win64|WinCE|Windows/i.test(e)})):return r.Windows;case[t,n].some((function(e){return/Macintosh|MacIntel|MacPPC|Mac68K|Darwin/i.test(e)})):return r.Mac;case[t,n].some((function(e){return/Linux/i.test(e)})):return r.Linux;default:return r.Unknown}}},{key:"getBrowserName",value:function(){var e,t,n=window.navigator.userAgent;switch(!0){case/Edge|Edg|EdgiOS/i.test(n):return a.Edge;case/OPR|Opera/i.test(n)||Boolean(window.opr):return a.Opera;case/SamsungBrowser/i.test(n):return a.SamsungInternet;case/CriOS/i.test(n):case/Chrome/i.test(n)&&(null!==(e=null===(t=navigator.userAgentData)||void 0===t?void 0:t.brands)&&void 0!==e?e:[]).some((function(e){return"Google Chrome"===e.brand})):return a.Chrome;case/Vivaldi/i.test(n):return a.Vivaldi;case/YaBrowser/i.test(n):return a.Yandex;case/Firefox|FxiOS/i.test(n):return a.Firefox;case/Safari/i.test(n):return a.Safari;case/MSIE|Trident|IEMobile|WPDesktop/i.test(n):return a.InternetExplorer;case Boolean(window.chrome):return a.Chromium;default:return a.Unknown}}},{key:"format",value:function(e,t){return e.replace(/%(\d+)/g,(function(e,n){var r;return String(null!==(r=null===t||void 0===t?void 0:t[+n])&&void 0!==r?r:"")}))}},{key:"print",value:function(e){var t,n,r,a=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=3;switch(null===e||void 0===e||null===(t=e.constructor)||void 0===t?void 0:t.name){case"String":return this.format('"%0"',[e]);case"Number":case"Boolean":case void 0:return String(e);case"Array":return i>=o?"[...]":this.format("[%0]",[e.map((function(e){return a.print(e,i+1)})).join(", ")]);case"Set":if(i>=o)return"{...}";var c=Array.from(e).map((function(e){return a.print(e,i+1)})).join(", ");return this.format("{%0}",[c]);default:if(i>=o||e===window||e===document)return"{...}";var s=[].concat(Object(m.a)(Object.entries(Object.getOwnPropertyDescriptors(e)).filter((function(e){var t=Object(d.a)(e,2);t[0];return t[1].enumerable})).map((function(e){var t=Object(d.a)(e,2),n=t[0];t[1];return n}))),Object(m.a)(Object.entries(Object.getOwnPropertyDescriptors(null!==(n=null===(r=e.constructor)||void 0===r?void 0:r.prototype)&&void 0!==n?n:{})).filter((function(e){var t=Object(d.a)(e,2);t[0];return t[1].enumerable})).map((function(e){var t=Object(d.a)(e,2),n=t[0];t[1];return n})))).flat(),u=s.map((function(t){return a.format("%0: %1",[a.print(t,i+1),a.print(e[t],i+1)])})).join(", ");return this.format("{%0}",[u])}}}]),e}(),w=v,O=n(17),h=n(3);function g(){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(p.a.mark((function e(){var t,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!k(t=window.deferredInstallPrompt)){e.next=3;break}return e.abrupt("return");case 3:return t.prompt(),e.next=6,t.userChoice;case 6:return n=e.sent,r=n.outcome,window.deferredInstallPrompt=null,e.abrupt("return",r);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return void 0===e||null===e}window.deferredInstallPrompt=null,window.addEventListener("beforeinstallprompt",(function(e){alert("beforeinstallprompt ".concat(w.print(e))),e.preventDefault(),window.deferredInstallPrompt=e}));var S=function(e){var t=e.defaultData,n=e.getShouldShowAdvert,r=e.getAdvert,a=e.getGuidancePrompt,o=e.forceShowAdvert,c=void 0!==o&&o,s=function(e,t){var n=Object(i.useMemo)((function(){var t=localStorage.getItem("AddToHomeScreen");if(k(t))return e;try{var n=JSON.parse(t);return n.version!==e.version?e:Object(O.a)(Object(O.a)({},e),n)}catch(r){return e}}),[]),r=!t(n),a=Object(i.useState)(Object(O.a)(Object(O.a)({},n),{},{pageVisits:n.pageVisits+(r?1:0)})),o=Object(d.a)(a,2),c=o[0],s=o[1],u=Object(i.useState)(!1),l=Object(d.a)(u,2),p=l[0],f=l[1];return Object(i.useEffect)((function(){console.log("AddToHomeScreen",c),alert("AddToHomeScreenData: ".concat(w.print(c))),localStorage.setItem("AddToHomeScreen",JSON.stringify(c)),f(t(c))}),[c,t]),[c,s,p]}(t,n),l=Object(d.a)(s,3),f=l[0],m=l[1],b=l[2],j=Object(i.useState)(void 0),v=Object(d.a)(j,2),x=v[0],S=v[1],C=Object(i.useCallback)((function(){N(!1)}),[]),y=Object(i.useMemo)((function(){return a(C)}),[a,C]),I=Object(i.useState)(!1),A=Object(d.a)(I,2),P=A[0],M=A[1];Object(i.useEffect)((function(){setTimeout((function(){if(!(window.matchMedia("(hover: hover) and (pointer: fine)").matches||window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches||document.referrer.startsWith("android-app://"))){var e=window.deferredInstallPrompt;S(e);var t=!k(e),n=!k(y);M(t||n)}}),1e3)}));var D=Object(i.useState)(!1),E=Object(d.a)(D,2),B=E[0],N=E[1],F=Object(i.useCallback)((function(){var e=function(){var e=Object(u.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=void 0,k(x)){e.next=7;break}return e.next=4,g();case 4:t=e.sent,e.next=9;break;case 7:N(!0),t="dismissed";case 9:"accepted"===t&&m(Object(O.a)(Object(O.a)({},f),{},{dismissCount:f.dismissCount+1}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[f,m,x]),V=Object(i.useCallback)((function(){m(Object(O.a)(Object(O.a)({},f),{},{dismissCount:f.dismissCount+1}))}),[f,m]);return Object(h.jsxs)(h.Fragment,{children:[(P&&b||c)&&r(F,V),P&&B&&y]})},C=n(85),y=n(88),I=n(89),A=n(48),P=n.n(A),M=n(37),D=n.n(M);var E=function(){var e,t,n,i=this,o={isDesktop:w.isDesktop()},c=new Set(Object.entries(o).filter((function(e){var t=Object(d.a)(e,2);t[0];return t[1]})).map((function(e){var t=Object(d.a)(e,2),n=t[0];t[1];return n})));return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)("img",{src:f,className:"App-logo",alt:"logo"}),Object(h.jsxs)("p",{children:["App version: ",14," ",Object(h.jsx)("br",{}),w.getOsName()," ",w.getBrowserName()," ",w.print(c)," ",Object(h.jsx)("br",{}),"userAgentData.platform: ",w.print(null===(e=window.navigator.userAgentData)||void 0===e?void 0:e.platform)," ",Object(h.jsx)("br",{}),"platform: ",w.print(window.navigator.platform)," ",Object(h.jsx)("br",{}),"window.chrome: ",w.print(!!window.chrome)," ",Object(h.jsx)("br",{}),"window.opr: ",w.print(!!window.opr)," ",Object(h.jsx)("br",{}),"brands: ",w.print((null!==(t=null===(n=navigator.userAgentData)||void 0===n?void 0:n.brands)&&void 0!==t?t:[]).map((function(e){return e.brand})))," ",Object(h.jsx)("br",{}),"userAgent: ",w.print(window.navigator.userAgent)," ",Object(h.jsx)("br",{})]}),Object(h.jsxs)("div",{style:{display:"flex",gap:8},children:[Object(h.jsx)(C.a,{variant:"contained",color:"primary",onClick:Object(u.a)(p.a.mark((function e(){var t,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.deferredInstallPrompt,alert("Install prompt: ".concat(w.print(t))),!i.isValueMissing(t)){e.next=4;break}return e.abrupt("return");case 4:return t.prompt(),e.next=7,t.userChoice;case 7:n=e.sent,r=n.outcome,alert("Install outcome: ".concat(w.print(r))),window.deferredInstallPrompt=null;case 11:case"end":return e.stop()}}),e)}))),children:"Native install"}),Object(h.jsx)(C.a,{variant:"contained",color:"primary",onClick:function(){window.location.href=window.location.href},children:"Reload page"}),Object(h.jsx)(C.a,{variant:"contained",color:"primary",onClick:function(){localStorage.removeItem("AddToHomeScreen")},children:"Reset data"})]})]}),Object(h.jsx)(S,{defaultData:{pageVisits:0,dismissCount:0,version:14},getShouldShowAdvert:function(e){return!(e.dismissCount>=20)&&e.pageVisits>=Math.pow(3,e.dismissCount+1)},getAdvert:function(e,t){return Object(h.jsxs)("div",{style:{boxSizing:"border-box",position:"fixed",bottom:0,width:"100%",display:"flex",justifyContent:"space-between",padding:"8px 4px 8px 20px",background:"#fff"},children:[Object(h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[Object(h.jsx)(P.a,{}),Object(h.jsx)(C.a,{color:"primary",onClick:e,children:"P\u0159idat aplikaci pwa na plochu"})]}),Object(h.jsx)(y.a,{onClick:t,children:Object(h.jsx)(D.a,{})})]})},getGuidancePrompt:function(e){switch(w.getOsName()){case r.Ipad:case r.Iphone:return;default:switch(w.getBrowserName()){case a.Firefox:return Object(h.jsxs)(I.a,{open:!0,children:["Firefox guidance prompt",Object(h.jsx)(y.a,{onClick:e,children:Object(h.jsx)(D.a,{})})]});case a.Opera:return Object(h.jsxs)(I.a,{open:!0,children:["Opera guidance prompt",Object(h.jsx)(y.a,{onClick:e,children:Object(h.jsx)(D.a,{})})]});default:return}}}})]})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),i(e),o(e)}))};s.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(E,{})}),document.getElementById("root")),B()}},[[67,1,2]]]);
//# sourceMappingURL=main.8162290e.chunk.js.map