"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2922],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||i;return n?a.createElement(f,l(l({ref:t},c),{},{components:n})):a.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6909:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const i={title:"Linux"},l="Jan on Linux",o={unversionedId:"install/linux",id:"install/linux",title:"Linux",description:"Installation",source:"@site/docs/install/linux.md",sourceDirName:"install",slug:"/install/linux",permalink:"/install/linux",draft:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/install/linux.md",tags:[],version:"current",lastUpdatedBy:"hiento09",lastUpdatedAt:1700726165,formattedLastUpdatedAt:"Nov 23, 2023",frontMatter:{title:"Linux"},sidebar:"docsSidebar",previous:{title:"Mac",permalink:"/install/mac"},next:{title:"From Source",permalink:"/install/from-source"}},s={},u=[{value:"Installation",id:"installation",level:2},{value:"Uninstall Jan",id:"uninstall-jan",level:2}],c={toc:u},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"jan-on-linux"},"Jan on Linux"),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"To download the lastest version of Jan on Linux, please visit the ",(0,r.kt)("a",{parentName:"li",href:"https://jan.ai/"},"Jan's homepage"),"."),(0,r.kt)("li",{parentName:"ol"},"For Debian/Ubuntu-based distributions, the recommended installation method is through the ",(0,r.kt)("inlineCode",{parentName:"li"},".deb")," package (64-bit). This can be done either through the graphical software center, if available, or via the command line using the following:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install ./jan-linux-amd64-<version>.deb\n# sudo apt install ./jan-linux-arm64-0.3.1.deb\n")),(0,r.kt)("h2",{id:"uninstall-jan"},"Uninstall Jan"),(0,r.kt)("p",null,"To uninstall VS Code on Linux, you should use your package manager's uninstall or remove option. For Debian/Ubuntu-based distributions, if you installed Jan via the ",(0,r.kt)("inlineCode",{parentName:"p"},".deb")," package, you can uninstall Jan using the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get remove jan`\n# where jan is the name of Jan package\n")),(0,r.kt)("p",null,"In case you wish to completely remove all user data associated with Jan after uninstallation, you can delete the user data folders located at ",(0,r.kt)("inlineCode",{parentName:"p"},"$HOME/.config/Jan")," and ~/.jan. This will return your system to its state prior to the installation of Jan. This method can also be used to reset all settings if you are experiencing any issues with Jan."))}d.isMDXComponent=!0}}]);