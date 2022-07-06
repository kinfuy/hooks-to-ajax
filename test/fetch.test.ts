import { expect, test, vi } from 'vitest';
import { fetchHook } from '../src/hook/fetchHook';
import type {
  AfterFetchRequest,
  AfterFetchResponse,
  BeforeFetchRequest,
  BeforeFetchResponse,
} from '../src/hook/fetchHook';
const originFetch = window.fetch;
const beforeFetchRequest: BeforeFetchRequest = (body) => {
  return Promise.resolve(body);
};
const afterFetchRequest: AfterFetchRequest = (body) => {
  return Promise.resolve(body);
};

const beforeFetchResponse: BeforeFetchResponse = () => {};
const afterFetchResponse: AfterFetchResponse = (body) => {
  return Promise.resolve(body);
};

const timeout = (ms, promise) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
};

test('fecth success', async () => {
  const spyBeforeFetchRequest = vi.fn(beforeFetchRequest);
  const spyAfterFetchRequest = vi.fn(afterFetchRequest);
  const spyBeforeFetchResponse = vi.fn(beforeFetchResponse);
  const spyAfterFetchResponse = vi.fn(afterFetchResponse);
  const fetch = fetchHook({
    originFetch,
    beforeFetchRequest: spyBeforeFetchRequest,
    afterFetchRequest: spyAfterFetchRequest,
    beforeFetchResponse: spyBeforeFetchResponse,
    afterFetchResponse: spyAfterFetchResponse,
  });

  await timeout(4000, fetch('https://github.com/')).catch(() => {});
  expect(spyBeforeFetchRequest).toHaveBeenCalled();
  expect(spyAfterFetchRequest).toHaveBeenCalled();
  expect(spyBeforeFetchResponse).toHaveBeenCalled();
  expect(spyAfterFetchResponse).toHaveBeenCalled();
}, 10000);

test('fecth fail', async () => {
  const spyBeforeFetchRequest = vi.fn(beforeFetchRequest);
  const spyAfterFetchRequest = vi.fn(afterFetchRequest);
  const spyBeforeFetchResponse = vi.fn(beforeFetchResponse);
  const spyAfterFetchResponse = vi.fn(afterFetchResponse);
  const fetch = fetchHook({
    originFetch,
    beforeFetchRequest: spyBeforeFetchRequest,
    afterFetchRequest: spyAfterFetchRequest,
    beforeFetchResponse: spyBeforeFetchResponse,
    afterFetchResponse: spyAfterFetchResponse,
  });

  await timeout(4000, fetch('https://tess.com/')).catch(() => {});
  expect(spyBeforeFetchRequest).toHaveBeenCalled();
  expect(spyAfterFetchRequest).toHaveBeenCalled();
  expect(spyBeforeFetchResponse).toHaveBeenCalled();
  expect(spyAfterFetchResponse).toHaveBeenCalled();
}, 10000);
