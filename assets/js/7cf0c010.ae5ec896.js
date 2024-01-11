"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8830],{42298:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var r=n(85893),i=n(11151),s=n(52991);const a={title:"Engineering Specs",slug:"/docs/engineering",description:"Jan is a ChatGPT-alternative that runs on your own computer, with a local API server.",keywords:["Jan AI","Jan","ChatGPT alternative","local AI","private AI","conversational AI","no-subscription fee","large language model","spec","engineering"]},o=void 0,c={id:"docs/engineering/README",title:"Engineering Specs",description:"Jan is a ChatGPT-alternative that runs on your own computer, with a local API server.",source:"@site/docs/docs/03-engineering/README.mdx",sourceDirName:"docs/03-engineering",slug:"/docs/engineering",permalink:"/docs/engineering",draft:!1,unlisted:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/docs/03-engineering/README.mdx",tags:[],version:"current",lastUpdatedBy:"0xSage",lastUpdatedAt:1704974711,formattedLastUpdatedAt:"Jan 11, 2024",frontMatter:{title:"Engineering Specs",slug:"/docs/engineering",description:"Jan is a ChatGPT-alternative that runs on your own computer, with a local API server.",keywords:["Jan AI","Jan","ChatGPT alternative","local AI","private AI","conversational AI","no-subscription fee","large language model","spec","engineering"]},sidebar:"docsSidebar",previous:{title:"TensorRT-LLM",permalink:"/docs/integrations/tensorrt"},next:{title:"Assistants",permalink:"/docs/engineering/assistants"}},l={},d=[];function u(e){const t={p:"p",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{className:"DocCardList--no-description"}),"\n",(0,r.jsx)(t.p,{children:"Talk about CoreSDK here"})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},52991:(e,t,n)=>{n.d(t,{Z:()=>x});n(67294);var r=n(36905),i=n(53438),s=n(33692),a=n(13919),o=n(95999),c=n(92503);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=n(85893);function u(e){let{href:t,children:n}=e;return(0,d.jsx)(s.Z,{href:t,className:(0,r.Z)("card padding--lg",l.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:i,description:s}=e;return(0,d.jsxs)(u,{href:t,children:[(0,d.jsxs)(c.Z,{as:"h2",className:(0,r.Z)("text--truncate",l.cardTitle),title:i,children:[n," ",i]}),s&&(0,d.jsx)("p",{className:(0,r.Z)("text--truncate",l.cardDescription),title:s,children:s})]})}function g(e){let{item:t}=e;const n=(0,i.LM)(t);return n?(0,d.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,o.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function m(e){let{item:t}=e;const n=(0,a.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.xz)(t.docId??void 0);return(0,d.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return(0,d.jsx)(m,{item:t});case"category":return(0,d.jsx)(g,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function f(e){let{className:t}=e;const n=(0,i.jA)();return(0,d.jsx)(x,{items:n.items,className:t})}function x(e){const{items:t,className:n}=e;if(!t)return(0,d.jsx)(f,{...e});const s=(0,i.MN)(t);return(0,d.jsx)("section",{className:(0,r.Z)("row",n),children:s.map(((e,t)=>(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(h,{item:e})},t)))})}},11151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var r=n(67294);const i={},s=r.createContext(i);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);