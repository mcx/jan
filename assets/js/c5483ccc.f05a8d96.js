"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3780],{50810:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>d,default:()=>a,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var t=n(85893),i=n(11151);const r={title:"Cloud vs. Self-hosting Your AI"},d=void 0,o={id:"hardware/overview/cloud-vs-self-hosting",title:"Cloud vs. Self-hosting Your AI",description:"The choice of how to run your AI - on GPU cloud services, on-prem, or just using an API provider - involves various trade-offs. The following is a naive exploration of the pros and cons of renting vs self-hosting.",source:"@site/docs/hardware/overview/cloud-vs-self-hosting.md",sourceDirName:"hardware/overview",slug:"/hardware/overview/cloud-vs-self-hosting",permalink:"/hardware/overview/cloud-vs-self-hosting",draft:!1,unlisted:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/hardware/overview/cloud-vs-self-hosting.md",tags:[],version:"current",lastUpdatedBy:"Hieu",lastUpdatedAt:1704781530,formattedLastUpdatedAt:"Jan 9, 2024",frontMatter:{title:"Cloud vs. Self-hosting Your AI"}},l={},c=[{value:"Cost Comparison",id:"cost-comparison",level:2},{value:"Low Usage",id:"low-usage",level:3},{value:"High Usage",id:"high-usage",level:3},{value:"Incremental Costs",id:"incremental-costs",level:3},{value:"Business Considerations",id:"business-considerations",level:2},{value:"Conclusion",id:"conclusion",level:2}];function h(e){const s={blockquote:"blockquote",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.p,{children:"The choice of how to run your AI - on GPU cloud services, on-prem, or just using an API provider - involves various trade-offs. The following is a naive exploration of the pros and cons of renting vs self-hosting."}),"\n",(0,t.jsx)(s.h2,{id:"cost-comparison",children:"Cost Comparison"}),"\n",(0,t.jsx)(s.p,{children:"The following estimations use these general assumptions:"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{}),(0,t.jsx)(s.th,{children:"Self-Hosted"}),(0,t.jsx)(s.th,{children:"GPT 4.0"}),(0,t.jsx)(s.th,{children:"GPU Rental"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Unit Costs"}),(0,t.jsx)(s.td,{children:"$10k upfront for 2x4090s (5 year amort.)"}),(0,t.jsx)(s.td,{children:"$0.00012/token"}),(0,t.jsx)(s.td,{children:"$4.42 for 1xH100/h"})]})})]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"800 average tokens (input & output) in a single request"}),"\n",(0,t.jsx)(s.li,{children:"Inference speed is at 24 tokens per second"}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"low-usage",children:"Low Usage"}),"\n",(0,t.jsx)(s.p,{children:"When operating at low capacity:"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{}),(0,t.jsx)(s.th,{children:"Self-Hosted"}),(0,t.jsx)(s.th,{children:"GPT 4.0"}),(0,t.jsx)(s.th,{children:"GPU Rental"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Cost per Request"}),(0,t.jsx)(s.td,{children:"$2.33"}),(0,t.jsx)(s.td,{children:"$0.10"}),(0,t.jsx)(s.td,{children:"$0.04"})]})})]}),"\n",(0,t.jsx)(s.h3,{id:"high-usage",children:"High Usage"}),"\n",(0,t.jsx)(s.p,{children:"When operating at high capacity, i.e. 24 hours in a day, ~77.8k requests per month:"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{}),(0,t.jsx)(s.th,{children:"Self-Hosted"}),(0,t.jsx)(s.th,{children:"GPT 4.0"}),(0,t.jsx)(s.th,{children:"GPU Rental"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Cost per Month"}),(0,t.jsx)(s.td,{children:"$166 (fixed)"}),(0,t.jsx)(s.td,{children:"$7465"}),(0,t.jsx)(s.td,{children:"$3182"})]})})]}),"\n",(0,t.jsx)(s.h3,{id:"incremental-costs",children:"Incremental Costs"}),"\n",(0,t.jsx)(s.p,{children:'Large context use cases are also interesting to evaluate. For example, if you had to write a 500 word essay summarizing Tolstoy\'s "War and Peace":'}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{}),(0,t.jsx)(s.th,{children:"Self-Hosted"}),(0,t.jsx)(s.th,{children:"GPT 4.0"}),(0,t.jsx)(s.th,{children:"GPU Rental"})]})}),(0,t.jsx)(s.tbody,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:'Cost of "War and Peace"'}),(0,t.jsx)(s.td,{children:"(upfront fixed cost)"}),(0,t.jsx)(s.td,{children:"$94"}),(0,t.jsx)(s.td,{children:"$40"})]})})]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Takeaway"}),": Renting on cloud or using an API is great for initially scaling. However, it can quickly become expensive when dealing with large datasets and context windows. For predictable costs, self-hosting is an attractive option."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"business-considerations",children:"Business Considerations"}),"\n",(0,t.jsx)(s.p,{children:"Other business level considerations may include:"}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{}),(0,t.jsx)(s.th,{children:"Self-Hosted"}),(0,t.jsx)(s.th,{children:"GPT 4.0"}),(0,t.jsx)(s.th,{children:"GPU Rental"})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Data Privacy"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u274c"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Offline Mode"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u274c"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Customization & Control"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u2705"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Auditing"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u2705"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Setup Complexity"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u2705"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Setup Cost"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u2705"})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:"Maintenance"}),(0,t.jsx)(s.td,{children:"\u274c"}),(0,t.jsx)(s.td,{children:"\u2705"}),(0,t.jsx)(s.td,{children:"\u274c"})]})]})]}),"\n",(0,t.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsx)(s.p,{children:"The decision to run LLMs in the cloud or on in-house servers is not one-size-fits-all. It depends on your business's specific needs, budget, and security considerations. Cloud-based LLMs offer scalability and cost-efficiency but come with potential security concerns, while in-house servers provide greater control, customization, and cost predictability."}),"\n",(0,t.jsx)(s.p,{children:"In some situations, using a mix of cloud and in-house resources can be the best way to go. Businesses need to assess their needs and assets carefully to pick the right method for using LLMs in the ever-changing world of AI technology."})]})}function a(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>o,a:()=>d});var t=n(67294);const i={},r=t.createContext(i);function d(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);