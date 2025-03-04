"use strict";(self.webpackChunklime_lib=self.webpackChunklime_lib||[]).push([[3518],{31555:function(u,n,e){var s;e.r(n),e.d(n,{demos:function(){return v}});var l=e(90228),a=e.n(l),_=e(87999),c=e.n(_),d=e(75271),I=e(43991),m=e(65977),t=e(44290),v={"src-hooks-use-boolean-demo-basic":{component:d.memo(d.lazy(function(){return e.e(2433).then(e.bind(e,55941))})),asset:{type:"BLOCK",id:"src-hooks-use-boolean-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(15538).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.23.0"},"...ts":{type:"FILE",value:e(25246).Z}},entry:"index.tsx"},context:{"...ts":t,react:s||(s=e.t(d,2)),antd:m,"/home/runner/work/frontend-docs/frontend-docs/src/hooks/useBoolean/index.ts":t},renderOpts:{compile:function(){var r=c()(a()().mark(function i(){var p,x=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.e(5364).then(e.bind(e,95364));case 2:return o.abrupt("return",(p=o.sent).default.apply(p,x));case 3:case"end":return o.stop()}},i)}));function f(){return r.apply(this,arguments)}return f}()}}}},44290:function(u,n,e){e.r(n),e.d(n,{default:function(){return _}});var s=e(48305),l=e.n(s),a=e(75271);function _(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,d=(0,a.useState)(c),I=l()(d,2),m=I[0],t=I[1],v={setTrue:(0,a.useCallback)(function(){return t(!0)},[]),setFalse:(0,a.useCallback)(function(){return t(!1)},[]),toggle:(0,a.useCallback)(function(){return t(function(r){return!r})},[]),set:(0,a.useCallback)(function(r){return t(r)},[])};return[m,v]}},88326:function(u,n,e){e.r(n),e.d(n,{texts:function(){return l}});var s=e(43991);const l=[{value:"\u4E00\u4E2A\u4F18\u96C5\u5730\u7BA1\u7406 boolean \u72B6\u6001\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:"\u9700\u8981\u7BA1\u7406\u5E03\u5C14\u72B6\u6001\u65F6",paraId:1,tocIndex:1},{value:"\u9700\u8981\u4FBF\u6377\u7684\u5207\u6362\u3001\u8BBE\u7F6E\u72B6\u6001\u65B9\u6CD5\u65F6",paraId:1,tocIndex:1},{value:"\u9002\u7528\u4E8E\u7BA1\u7406\u5F00\u5173\u3001\u663E\u793A\u9690\u85CF\u3001\u52A0\u8F7D\u7B49\u72B6\u6001",paraId:1,tocIndex:1},{value:"\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002",paraId:2,tocIndex:3},{value:`import { useBoolean } from 'lime-lib';

const [state, { toggle, setTrue, setFalse, set }] = useBoolean(false);

// \u5207\u6362\u72B6\u6001
toggle();

// \u8BBE\u7F6E\u4E3A true
setTrue();

// \u8BBE\u7F6E\u4E3A false
setFalse();

// \u8BBE\u7F6E\u4EFB\u610F\u503C
set(true);
`,paraId:3,tocIndex:4},{value:`const [state, { toggle, setTrue, setFalse, set }] = useBoolean(defaultValue?: boolean);
`,paraId:4,tocIndex:5},{value:"\u53C2\u6570",paraId:5,tocIndex:6},{value:"\u8BF4\u660E",paraId:5,tocIndex:6},{value:"\u7C7B\u578B",paraId:5,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:5,tocIndex:6},{value:"defaultValue",paraId:5,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:5,tocIndex:6},{value:"boolean",paraId:5,tocIndex:6},{value:"false",paraId:5,tocIndex:6},{value:"\u53C2\u6570",paraId:6,tocIndex:7},{value:"\u8BF4\u660E",paraId:6,tocIndex:7},{value:"\u7C7B\u578B",paraId:6,tocIndex:7},{value:"state",paraId:6,tocIndex:7},{value:"\u5F53\u524D\u72B6\u6001\u503C",paraId:6,tocIndex:7},{value:"boolean",paraId:6,tocIndex:7},{value:"actions",paraId:6,tocIndex:7},{value:"\u64CD\u4F5C\u96C6\u5408\uFF0C\u5305\u542B\u4EE5\u4E0B\u64CD\u4F5C\u65B9\u6CD5",paraId:6,tocIndex:7},{value:"UseBooleanActions",paraId:6,tocIndex:7},{value:"\u53C2\u6570",paraId:7,tocIndex:8},{value:"\u8BF4\u660E",paraId:7,tocIndex:8},{value:"\u7C7B\u578B",paraId:7,tocIndex:8},{value:"toggle",paraId:7,tocIndex:8},{value:"\u5207\u6362\u72B6\u6001\u503C",paraId:7,tocIndex:8},{value:"() => void",paraId:7,tocIndex:8},{value:"setTrue",paraId:7,tocIndex:8},{value:"\u8BBE\u7F6E\u4E3A true",paraId:7,tocIndex:8},{value:"() => void",paraId:7,tocIndex:8},{value:"setFalse",paraId:7,tocIndex:8},{value:"\u8BBE\u7F6E\u4E3A false",paraId:7,tocIndex:8},{value:"() => void",paraId:7,tocIndex:8},{value:"set",paraId:7,tocIndex:8},{value:"\u8BBE\u7F6E\u4E3A\u6307\u5B9A\u503C",paraId:7,tocIndex:8},{value:"(value: boolean) => void",paraId:7,tocIndex:8},{value:"useBoolean \u63D0\u4F9B\u4E86\u4E00\u7EC4\u8BED\u4E49\u5316\u7684\u64CD\u4F5C\u65B9\u6CD5\uFF0C\u4F7F\u5F97\u5E03\u5C14\u72B6\u6001\u7684\u7BA1\u7406\u66F4\u52A0\u76F4\u89C2\u548C\u4FBF\u6377\u3002\u76F8\u6BD4\u76F4\u63A5\u4F7F\u7528 useState\uFF0C\u5B83\u80FD\u8BA9\u4EE3\u7801\u66F4\u5177\u53EF\u8BFB\u6027\u548C\u53EF\u7EF4\u62A4\u6027\u3002",paraId:8,tocIndex:10},{value:"useBoolean \u4E3B\u8981\u7528\u4E8E\u7EC4\u4EF6\u5185\u90E8\u72B6\u6001\u7BA1\u7406\uFF0C\u5982\u679C\u9700\u8981\u53D7\u63A7\u6A21\u5F0F\uFF0C\u5EFA\u8BAE\u76F4\u63A5\u4F7F\u7528 useState \u6216\u5176\u4ED6\u72B6\u6001\u7BA1\u7406\u65B9\u6848\u3002",paraId:9,tocIndex:11}]},15538:function(u,n){n.Z=`import React from 'react';
import { Button, Space } from 'antd';
import useBoolean from '..';

const Demo: React.FC = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <p>\u5F53\u524D\u72B6\u6001: {JSON.stringify(state)}</p>
      <Space>
        <Button onClick={toggle}>\u5207\u6362</Button>
        <Button type="primary" onClick={setTrue}>
          \u8BBE\u7F6E\u4E3A True
        </Button>
        <Button danger onClick={setFalse}>
          \u8BBE\u7F6E\u4E3A False
        </Button>
      </Space>
    </>
  );
};

export default Demo; `},25246:function(u,n){n.Z=`import { useCallback, useState } from 'react';

export interface UseBooleanActions {
  /** \u8BBE\u7F6E\u4E3A true */
  setTrue: () => void;
  /** \u8BBE\u7F6E\u4E3A false */
  setFalse: () => void;
  /** \u5207\u6362\u503C */
  toggle: () => void;
  /** \u8BBE\u7F6E\u4EFB\u610F\u503C */
  set: (value: boolean) => void;
}

/**
 * \u7BA1\u7406 boolean \u503C\u7684 Hook
 * @param defaultValue - \u53EF\u9009\u7684\u9ED8\u8BA4\u503C
 * @returns [boolean, UseBooleanActions]
 * @example
 * \`\`\`ts
 * const [visible, { toggle, setTrue, setFalse }] = useBoolean(false);
 * \`\`\`
 */
export default function useBoolean(defaultValue = false): [boolean, UseBooleanActions] {
  const [state, setState] = useState(defaultValue);

  const actions: UseBooleanActions = {
    setTrue: useCallback(() => setState(true), []),
    setFalse: useCallback(() => setState(false), []),
    toggle: useCallback(() => setState(v => !v), []),
    set: useCallback((value: boolean) => setState(value), []),
  };

  return [state, actions];
}
`}}]);
