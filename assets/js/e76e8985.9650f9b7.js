"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[366],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||p[m]||i;return n?r.createElement(f,o(o({ref:t},d),{},{components:n})):r.createElement(f,o({ref:t},d))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},15606:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const i={title:"Overview"},o=void 0,s={unversionedId:"install/overview",id:"install/overview",title:"Overview",description:"Getting up and running open-source AI models on your own computer with Jan is quick and easy. Jan is lightweight and can run on a variety of hardware and platform versions. Specific requirements tailored to your platform are outlined below.",source:"@site/docs/install/overview.md",sourceDirName:"install",slug:"/install/overview",permalink:"/install/overview",draft:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/install/overview.md",tags:[],version:"current",lastUpdatedBy:"hiento09",lastUpdatedAt:1700726165,formattedLastUpdatedAt:"Nov 23, 2023",frontMatter:{title:"Overview"},sidebar:"docsSidebar",previous:{title:"How Jan Works",permalink:"/intro/how-jan-works"},next:{title:"Windows",permalink:"/install/windows"}},l={},c=[{value:"Cross platform",id:"cross-platform",level:2},{value:"Requirements for Jan",id:"requirements-for-jan",level:2},{value:"Hardware",id:"hardware",level:3},{value:"Disk space",id:"disk-space",level:4},{value:"Random Access Memory (RAM) and Graphics Processing Unit Video Random Access Memory (GPU VRAM)",id:"random-access-memory-ram-and-graphics-processing-unit-video-random-access-memory-gpu-vram",level:4},{value:"Relationship between RAM and VRAM Sizes in Relation to LLM Models",id:"relationship-between-ram-and-vram-sizes-in-relation-to-llm-models",level:4},{value:"Architecture",id:"architecture",level:3},{value:"CPU",id:"cpu",level:4},{value:"GPU",id:"gpu",level:4}],d={toc:c},u="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Getting up and running open-source AI models on your own computer with Jan is quick and easy. Jan is lightweight and can run on a variety of hardware and platform versions. Specific requirements tailored to your platform are outlined below."),(0,a.kt)("h2",{id:"cross-platform"},"Cross platform"),(0,a.kt)("p",null,"A free, open-source alternative to OpenAI that runs on the Linux, macOS, and Windows operating systems. Please refer to the specific guides below for your platform"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/install/linux"},"Linux")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/install/mac"},"MacOS (Mac Intel Chip and Mac Apple Silicon Chip)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/install/windows"},"Windows"))),(0,a.kt)("h2",{id:"requirements-for-jan"},"Requirements for Jan"),(0,a.kt)("h3",{id:"hardware"},"Hardware"),(0,a.kt)("p",null,"Jan is a lightweight platform designed for seamless download, storage, and execution of open-source Large Language Models (LLMs). With a small download size of less than 200 MB and a disk footprint of under 300 MB, Jan is optimized for efficiency and should run smoothly on modern hardware."),(0,a.kt)("p",null,"To ensure optimal performance while using Jan and handling LLM models, it is recommended to meet the following system requirements:"),(0,a.kt)("h4",{id:"disk-space"},"Disk space"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Minimum requirement",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"At least 5 GB of free disk space is required to accommodate the download, storage, and management of open-source LLM models."))),(0,a.kt)("li",{parentName:"ul"},"Recommended",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"For an optimal experience and to run most available open-source LLM models on Jan, it is recommended to have 10 GB of free disk space.")))),(0,a.kt)("h4",{id:"random-access-memory-ram-and-graphics-processing-unit-video-random-access-memory-gpu-vram"},"Random Access Memory (RAM) and Graphics Processing Unit Video Random Access Memory (GPU VRAM)"),(0,a.kt)("p",null,"The amount of RAM on your system plays a crucial role in determining the size and complexity of LLM models you can effectively run. Jan can be utilized on traditional computers where RAM is a key resource. For enhanced performance, Jan also supports GPU acceleration, utilizing the VRAM of your graphics card. "),(0,a.kt)("h4",{id:"relationship-between-ram-and-vram-sizes-in-relation-to-llm-models"},"Relationship between RAM and VRAM Sizes in Relation to LLM Models"),(0,a.kt)("p",null,"The RAM and GPU VRAM requirements are dependent on the size and complexity of the LLM models you intend to run. The following are some general guidelines to help you determine the amount of RAM or VRAM you need to run LLM models on Jan"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"8 GB of RAM: Suitable for running smaller models like 3B models or quantized 7B models"),(0,a.kt)("li",{parentName:"ul"},'16 GB of RAM(recommended): This is considered the "minimum usable models" threshold, particularly for 7B models (e.g Mistral 7B, etc)'),(0,a.kt)("li",{parentName:"ul"},"Beyond 16GB of RAM: Required for handling larger and more sophisticated model, such as 70B models.")),(0,a.kt)("h3",{id:"architecture"},"Architecture"),(0,a.kt)("p",null,"Jan is designed to run on muptiple architectures, versatility and widespread usability. The supported architectures include:"),(0,a.kt)("h4",{id:"cpu"},"CPU"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"x86: Jan is well-suited for systems with x86 architecture, which is commonly found in traditional desktops and laptops. It ensures smooth performance on a variety of devices using x86 processors."),(0,a.kt)("li",{parentName:"ul"},"ARM: Jan is optimized to run efficiently on ARM-based systems, extending compatibility to a broad range of devices using ARM processors.")),(0,a.kt)("h4",{id:"gpu"},"GPU"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"NVIDIA: Jan optimizes the computational capabilities of NVIDIA GPUs, achieving efficiency through the utilization of llama.cpp. This strategic integration enhances the performance of Jan, particularly in resource-intensive Language Model (LLM) tasks. Users can expect accelerated processing and improved responsiveness when leveraging the processing capabilities inherent in NVIDIA GPUs."),(0,a.kt)("li",{parentName:"ul"},"AMD: Users with AMD GPUs can seamlessly integrate Jan's GPU acceleration, offering a comprehensive solution for diverse hardware configurations and preferences."),(0,a.kt)("li",{parentName:"ul"},"ARM64 Mac: Jan seamlessly supports ARM64 architecture on Mac systems, leveraging Metal for efficient GPU operations. This ensures a smooth and efficient experience for users with Apple Silicon Chips, utilizing the power of Metal for optimal performance on ARM64 Mac devices.")))}p.isMDXComponent=!0}}]);