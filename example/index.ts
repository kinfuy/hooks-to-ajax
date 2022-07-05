import { fetchHook, xmlHttpReauestHook } from '../dist';
import type {
  AfterFetchResponse,
  AfterXmlResponese,
  BeforeFetchRequest,
  BeforeXmlOpen,
  BeforeXmlResponse,
  BeforeXmlSend,
  FetchHooks,
  XMLHttpHooks,
} from '../dist';
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
