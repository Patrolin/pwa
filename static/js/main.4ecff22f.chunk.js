(this.webpackJsonppwa=this.webpackJsonppwa||[]).push([[0],{59:function(e,t,n){},61:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var r,i=n(0),a=n.n(i),o=n(8),s=n.n(o),c=(n(59),n(25)),u=n(12),d=n(16),l=n.n(d),p=n.p+"static/media/logo.6ce24c58.svg",f=(n(61),n(34)),v=n(21);window.deferredInstallPrompt=null,window.addEventListener("beforeinstallprompt",(function(e){alert("beforeinstallprompt ".concat(m.print(e))),e.preventDefault(),window.deferredInstallPrompt=e})),function(e){e.Edge="Edge",e.Opera="Opera",e.SamsungInternet="Samsung Internet",e.Chrome="Chrome",e.Vivaldi="Vivaldi",e.Yandex="Yandex",e.Firefox="Firefox",e.Safari="Safari",e.InternetExplorer="Internet Explorer",e.Unknown="Unknown"}(r||(r={}));var m=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,null,[{key:"isValueMissing",value:function(e){return void 0===e||null===e}},{key:"isAppInstalled",value:function(){return!!window.navigator.standalone||!!window.matchMedia("(display-mode: standalone)").matches}},{key:"getNativeInstallPrompt",value:function(){return window.deferredInstallPrompt}},{key:"showNativeInstallPromptIfExists",value:function(){var t=Object(c.a)(l.a.mark((function t(){var n,r,i,a,o=arguments;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=o.length>0&&void 0!==o[0]&&o[0],r=this.getNativeInstallPrompt(),alert("Install prompt: ".concat(e.print(r))),!this.isValueMissing(r)){t.next=5;break}return t.abrupt("return");case 5:return r.prompt(),t.next=8,r.userChoice;case 8:return i=t.sent,a=i.outcome,n&&alert("Install outcome: ".concat(e.print(a))),window.deferredInstallPrompt=null,t.abrupt("return",a);case 13:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"isDesktop",value:function(){return window.matchMedia("(hover: hover) and (pointer: fine)").matches}},{key:"isChromium",value:function(){var e,t;return Boolean(window.chrome||(null!==(e=null===(t=navigator.userAgentData)||void 0===t?void 0:t.brands)&&void 0!==e?e:[]).some((function(e){return"Google Chrome"===e.brand})))}},{key:"isIos",value:function(){return Boolean(/iPad|iPhone|iPod/i.test(window.navigator.userAgent))}},{key:"isIpad",value:function(){return Boolean(/iPad/i.test(window.navigator.userAgent))}},{key:"isIphone",value:function(){return Boolean(/iPhone|iPod/i.test(window.navigator.userAgent))}},{key:"isAndroid",value:function(){return Boolean(/Android/i.test(window.navigator.userAgent))}},{key:"isSamsung",value:function(){return Boolean(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i.test(window.navigator.userAgent))}},{key:"getBrowserName",value:function(){var e=window.navigator.userAgent,t=window.navigator.vendor;switch(!0){case/Edge|Edg|EdgiOS/i.test(e):return r.Edge;case/OPR|Opera/i.test(e)&&Boolean(window.opr):return r.Opera;case/SamsungBrowser/i.test(e):return r.SamsungInternet;case/CriOS/i.test(e):case/Chrome/i.test(e)&&"Google Inc."===t&&this.isChromium():return r.Chrome;case/Vivaldi/i.test(e):return r.Vivaldi;case/YaBrowser/i.test(e):return r.Yandex;case/Firefox|FxiOS/i.test(e):return r.Firefox;case/Safari/i.test(e):return r.Safari;case/MSIE|Trident|IEMobile|WPDesktop/i.test(e):return r.InternetExplorer;default:return r.Unknown}}},{key:"format",value:function(e,t){return e.replace(/%(\d+)/g,(function(e,n){var r;return String(null!==(r=null===t||void 0===t?void 0:t[+n])&&void 0!==r?r:"")}))}},{key:"print",value:function(e){var t,n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(r>=3)return"";switch(null===e||void 0===e||null===(t=e.constructor)||void 0===t?void 0:t.name){case"String":return this.format('"%0"',[e]);case"Number":case"Boolean":case void 0:return String(e);case"Array":return this.format("[%0]",[e.map((function(e){return n.print(e,r+1)})).join(", ")]);case"Set":var i=Array.from(e).map((function(e){return n.print(e,r+1)})).join(", ");return this.format("{%0}",[i]);default:if(e===window||e===document)return"";var a=Object.keys(e).map((function(t){return n.format("%0: %1",[n.print(t,r+1),n.print(e[t],r+1)])})).join(", ");return this.format("{%0}",[a])}}}]),e}(),j=m,b=n(17),g=n(3);var w=function(e){var t=e.defaultData,n=e.getShouldShowAdvert,r=e.getAdvert,a=e.getGuidancePrompt,o=e.forceShowAdvert,s=void 0!==o&&o,d=function(e,t){var n=Object(i.useMemo)((function(){var t=localStorage.getItem("AddToHomeScreen");if(j.isValueMissing(t))return e;try{var n=JSON.parse(t);return n.version!==e.version?e:Object(b.a)(Object(b.a)({},e),n)}catch(r){return e}}),[]),r=!t(n),a=Object(i.useState)(Object(b.a)(Object(b.a)({},n),{},{pageVisits:n.pageVisits+(r?1:0)})),o=Object(u.a)(a,2),s=o[0],c=o[1],d=Object(i.useState)(!1),l=Object(u.a)(d,2),p=l[0],f=l[1];return Object(i.useEffect)((function(){console.log("AddToHomeScreen",s),alert("AddToHomeScreenData: ".concat(j.print(s))),localStorage.setItem("AddToHomeScreen",JSON.stringify(s)),f(t(s))}),[s,t]),[s,c,p]}(t,n),p=Object(u.a)(d,3),f=p[0],v=p[1],m=p[2],w=Object(i.useState)(void 0),h=Object(u.a)(w,2),O=h[0],x=h[1],S=Object(i.useCallback)((function(){M(!1)}),[]),I=Object(i.useMemo)((function(){return a(S)}),[a,S]),k=Object(i.useState)(!1),A=Object(u.a)(k,2),y=A[0],C=A[1];Object(i.useEffect)((function(){setTimeout((function(){var e=j.getNativeInstallPrompt();x(e);var t=!j.isValueMissing(e),n=!j.isValueMissing(I),r=!j.isDesktop()&&(t||n)&&!j.isAppInstalled();C(r)}),1e3)}));var P=Object(i.useState)(!1),N=Object(u.a)(P,2),E=N[0],M=N[1],B=Object(i.useCallback)((function(){var e=function(){var e=Object(c.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=void 0,j.isValueMissing(O)){e.next=7;break}return e.next=4,j.showNativeInstallPromptIfExists();case 4:t=e.sent,e.next=9;break;case 7:M(!0),t="dismissed";case 9:"accepted"===t&&v(Object(b.a)(Object(b.a)({},f),{},{dismissCount:f.dismissCount+1}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[f,v,O]),V=Object(i.useCallback)((function(){v(Object(b.a)(Object(b.a)({},f),{},{dismissCount:f.dismissCount+1}))}),[f,v]);return Object(g.jsxs)(g.Fragment,{children:[(y&&m||s)&&r(B,V),y&&E&&I]})},h=n(85),O=n(88),x=n(89),S=n(48),I=n.n(S),k=n(37),A=n.n(k);var y=function(){var e,t,n={isDesktop:j.isDesktop(),isAndroid:j.isAndroid(),isIos:j.isIos(),isIpad:j.isIpad(),isIphone:j.isIphone(),isSamsung:j.isSamsung(),isChromium:j.isChromium()},i=new Set(Object.entries(n).filter((function(e){var t=Object(u.a)(e,2);t[0];return t[1]})).map((function(e){var t=Object(u.a)(e,2),n=t[0];t[1];return n})));return Object(g.jsxs)("div",{className:"App",children:[Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("img",{src:p,className:"App-logo",alt:"logo"}),Object(g.jsxs)("p",{children:["App version: ",12," ",Object(g.jsx)("br",{}),j.getBrowserName()," ",j.print(i)," ",Object(g.jsx)("br",{}),"window.chrome: ",j.print(!!window.chrome)," ",Object(g.jsx)("br",{}),"window.opr: ",j.print(!!window.opr)," ",Object(g.jsx)("br",{}),"brands: ",j.print((null!==(e=null===(t=navigator.userAgentData)||void 0===t?void 0:t.brands)&&void 0!==e?e:[]).map((function(e){return e.brand})))," ",Object(g.jsx)("br",{}),"vendor: ",j.print(window.navigator.vendor)," ",Object(g.jsx)("br",{}),"userAgent: ",j.print(window.navigator.userAgent)," ",Object(g.jsx)("br",{})]}),Object(g.jsxs)("div",{style:{display:"flex",gap:8},children:[Object(g.jsx)(h.a,{variant:"contained",color:"primary",onClick:Object(c.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j.showNativeInstallPromptIfExists(!0);case 1:case"end":return e.stop()}}),e)}))),children:"Native install"}),Object(g.jsx)(h.a,{variant:"contained",color:"primary",onClick:function(){window.location.href=window.location.href},children:"Reload page"}),Object(g.jsx)(h.a,{variant:"contained",color:"primary",onClick:function(){localStorage.removeItem("AddToHomeScreen")},children:"Reset data"})]})]}),Object(g.jsx)(w,{defaultData:{pageVisits:0,dismissCount:0,version:12},getShouldShowAdvert:function(e){return!(e.dismissCount>=20)&&e.pageVisits>=Math.pow(3,e.dismissCount+1)},getAdvert:function(e,t){return Object(g.jsxs)("div",{style:{boxSizing:"border-box",position:"fixed",bottom:0,width:"100%",display:"flex",justifyContent:"space-between",padding:"8px 4px 8px 20px",background:"#fff"},children:[Object(g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[Object(g.jsx)(I.a,{}),Object(g.jsx)(h.a,{onClick:e,children:"P\u0159idat aplikaci pwa na plochu"})]}),Object(g.jsx)(O.a,{onClick:t,children:Object(g.jsx)(A.a,{})})]})},getGuidancePrompt:function(e){if(!j.isIos())switch(j.getBrowserName()){case r.Firefox:return Object(g.jsxs)(x.a,{open:!0,children:["Firefox guidance prompt",Object(g.jsx)(O.a,{onClick:e,children:Object(g.jsx)(A.a,{})})]});case r.Opera:return alert("Opera guidance"),Object(g.jsxs)(x.a,{open:!0,children:["Opera guidance prompt",Object(g.jsx)(O.a,{onClick:e,children:Object(g.jsx)(A.a,{})})]});default:return}}})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),r(e),i(e),a(e),o(e)}))};s.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(y,{})}),document.getElementById("root")),C()}},[[67,1,2]]]);
//# sourceMappingURL=main.4ecff22f.chunk.js.map