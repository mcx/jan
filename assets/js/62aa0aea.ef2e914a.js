"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2800],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),f=o,m=u["".concat(l,".").concat(f)]||u[f]||d[f]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},82940:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(87462),o=(n(67294),n(3905));const a={title:"Introduction",slug:"/intro"},i=void 0,s={unversionedId:"intro/introduction",id:"intro/introduction",title:"Introduction",description:"Jan is a ChatGPT-alternative that runs on your own computer, with a local API server.",source:"@site/docs/intro/introduction.md",sourceDirName:"intro",slug:"/intro",permalink:"/intro",draft:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/intro/introduction.md",tags:[],version:"current",lastUpdatedBy:"hiento09",lastUpdatedAt:1700726165,formattedLastUpdatedAt:"Nov 23, 2023",frontMatter:{title:"Introduction",slug:"/intro"},sidebar:"docsSidebar",next:{title:"Quickstart",permalink:"/intro/quickstart"}},l={},c=[{value:"Why Jan?",id:"why-jan",level:2},{value:"\ud83d\udcbb Own your AI",id:"-own-your-ai",level:4},{value:"\ud83c\udfd7\ufe0f Extensions",id:"\ufe0f-extensions",level:4},{value:"\ud83d\uddc2\ufe0f Open File Formats",id:"\ufe0f-open-file-formats",level:4},{value:"\ud83c\udf0d Open Source",id:"-open-source",level:4}],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Jan is a ChatGPT-alternative that runs on your own computer, with a ",(0,o.kt)("a",{parentName:"p",href:"/api"},"local API server"),". "),(0,o.kt)("p",null,"Jan uses ",(0,o.kt)("a",{parentName:"p",href:"/docs/models"},"open-source AI models"),", stores data in ",(0,o.kt)("a",{parentName:"p",href:"/specs/data-structures"},"open file formats"),", is highly customizable via ",(0,o.kt)("a",{parentName:"p",href:"/docs/extensions"},"extensions"),". "),(0,o.kt)("p",null,"Jan believes in the need for an open source AI ecosystem. We aim to build infra and tooling to allow open source AIs to compete on a level playing field with proprietary offerings. "),(0,o.kt)("h2",{id:"why-jan"},"Why Jan?"),(0,o.kt)("h4",{id:"-own-your-ai"},"\ud83d\udcbb Own your AI"),(0,o.kt)("p",null,"Jan runs 100% on your own machine, ",(0,o.kt)("a",{parentName:"p",href:"https://www.reddit.com/r/LocalLLaMA/comments/17mghqr/comment/k7ksti6/?utm_source=share&utm_medium=web2x&context=3"},"predictably"),", privately and even offline. No one else can see your conversations, not even us. "),(0,o.kt)("h4",{id:"\ufe0f-extensions"},"\ud83c\udfd7\ufe0f Extensions"),(0,o.kt)("p",null,"Jan ships with a powerful ",(0,o.kt)("a",{parentName:"p",href:"/docs/extensions"},"extension framework"),", which allows developers to extend and customize Jan's functionality. In fact, most core modules of Jan are ",(0,o.kt)("a",{parentName:"p",href:"/specs/architecture"},"built as extensions")," and use the same extensions API. "),(0,o.kt)("h4",{id:"\ufe0f-open-file-formats"},"\ud83d\uddc2\ufe0f Open File Formats"),(0,o.kt)("p",null,"Jan stores data in a ",(0,o.kt)("a",{parentName:"p",href:"/specs/data-structures"},"local folder of non-proprietary files"),". You're never locked-in and can do what you want with your data with extensions, or even a different app. "),(0,o.kt)("h4",{id:"-open-source"},"\ud83c\udf0d Open Source"),(0,o.kt)("p",null,"Both Jan and ",(0,o.kt)("a",{parentName:"p",href:"https://nitro.jan.ai"},"Nitro"),", our lightweight inference engine, are licensed via the open source ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/janhq/jan/blob/main/LICENSE"},"AGPLv3 license"),". "))}d.isMDXComponent=!0}}]);