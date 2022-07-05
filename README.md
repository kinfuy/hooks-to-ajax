<p align="center">
  <img width="100px" src="./public/logo.png">
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/hooks-to-ajax">
  <img src="https://img.shields.io/npm/v/hooks-to-ajax.svg">
  </a>
  <a href="https://npmcharts.com/compare/hooks-to-ajax?minimal=true">
  <img src="https://img.shields.io/npm/dm/hooks-to-ajax.svg?color=357C3C">
  </a>
  <a href="https://npmcharts.com/compare/hooks-to-ajax?minimal=true">
  <img src="https://img.shields.io/npm/l/hooks-to-ajax.svg?color=blue">
  </a>
   <a href="https://github.com/alqmc/hooks-to-ajax" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/alqmc/hooks-to-ajax?style=social">
  
  </a>

  <br>
</p>

<p align="center">hooks-to-ajax</p>

### Features

- 提供 fetch 执行期间钩子函数

- 提供 xmlhttprequest 执行期间钩子函数

- typescript 支持

### Fetch

```ts
export interface FetchHooks {
  beforeFetchRequest?: BeforeFetchRequest;
  afterFetchRequest?: AfterFetchRequest;
  beforeFetchResponse?: BeforeFetchResponse;
  afterFetchResponse?: AfterFetchResponse;
}
```

### Xmlhttprequest

```ts
export interface XMLHttpHooks {
  beforeXmlOpen?: BeforeXmlOpen;
  afterXmlOpen?: AfterXmlOpen;
  beforeXmlSend?: BeforeXmlSend;
  afterXmlSend?: AfterXmlSend;
  beforeXmlResponse?: BeforeXmlResponse;
  afterXmlResponese?: AfterXmlResponese;
}
```

### fetchUtils

- createStream 将字符串转为可读流
- replaceFetchDate 篡改 fetch 可读流数据

### Getting Started

```shell
pnpm add hooks-to-ajax

```

### Usage

```ts
import { fetchHook, xmlHttpReauestHook } from 'hooks-to-ajax';
import type {
  AfterFetchResponse,
  AfterXmlResponese,
  BeforeFetchRequest,
  BeforeXmlOpen,
  BeforeXmlResponse,
  BeforeXmlSend,
  FetchHooks,
  XMLHttpHooks,
} from 'hooks-to-ajax';
const originXML = window.XMLHttpRequest;
const originFetch = window.fetch;

const createXmlHooks = (): XMLHttpHooks => {
  const beforeXmlOpen: BeforeXmlOpen = (body, conetnt) => {
    console.log('beforeXmlOpen', body);
    return body;
  };
  const beforeXmlSend: BeforeXmlSend = (body, conetnt) => {
    console.log('beforeXmlSend', body);
    return body;
  };
  const beforeXmlResponse: BeforeXmlResponse = (conetnt) => {
    console.log('beforeXmlResponse');
    return {};
  };
  const afterXmlResponese: AfterXmlResponese = (body, context) => {
    console.log('afterXmlResponese', body);
  };

  return {
    beforeXmlOpen,
    beforeXmlSend,
    beforeXmlResponse,
    afterXmlResponese,
  };
};

const createFetchHooks = (): FetchHooks => {
  const beforeFetchRequest: BeforeFetchRequest = (body, context) => {
    console.log('beforeFetchRequest', body);
    return Promise.resolve(body);
  };
  const afterFetchResponse: AfterFetchResponse = (body, context) => {
    console.log('afterFetchResponse', body);
    // const response = replaceFetchDate(body);
    return Promise.resolve(body);
  };
  return {
    beforeFetchRequest,
    afterFetchResponse,
  };
};

const initProxy = (xmlHooks: XMLHttpHooks, fetchHooks: FetchHooks) => {
  const selfFetchproxy = fetchHook({
    originFetch,
    ...fetchHooks,
  });
  const SelfXmlHttpRequest = xmlHttpReauestHook({ originXML, ...xmlHooks });
  window.XMLHttpRequest = SelfXmlHttpRequest;
  window.fetch = selfFetchproxy;
};

const xmlHooks = createXmlHooks();
const fetchHooks = createFetchHooks();
initProxy(xmlHooks, fetchHooks);
```

### BeCareful

- 重写了 fetch 和 xml，可能会和其他重写的库冲突 如：mockjs

### License

MIT License © 2021 [阿乐去买菜（alqmc）](https://github.com/alqmc)
