import{c as a,j as s,B as i,a as o}from"./index-Di7uXOd8.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=a("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=a("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function b({value:e,min:c=1,max:r=99,onChange:t,className:n}){const d=()=>t==null?void 0:t(Math.max(c,e-1)),l=()=>t==null?void 0:t(Math.min(r,e+1));return s.jsxs("div",{className:o("inline-flex items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/70",n),children:[s.jsx(i,{variant:"ghost",size:"icon",type:"button",onClick:d,"aria-label":"Decrease quantity",children:s.jsx(m,{className:"h-4 w-4"})}),s.jsx("span",{className:"min-w-[2ch] text-center text-sm font-semibold tabular-nums text-zinc-900 dark:text-white",children:e}),s.jsx(i,{variant:"ghost",size:"icon",type:"button",onClick:l,"aria-label":"Increase quantity",children:s.jsx(u,{className:"h-4 w-4"})})]})}export{b as Q};
