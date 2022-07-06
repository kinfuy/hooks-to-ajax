export interface GlobalFetchContext {
  initCOntent?: FetchInit;
  resContent?: Response;
}

export type FetchInit = {
  input: RequestInfo | URL;
  init?: RequestInit | undefined;
};

export type BeforeFetchRequest = (
  body: FetchInit,
  context: GlobalFetchContext
) => Promise<FetchInit>;
export type AfterFetchRequest = (
  body: FetchInit,
  context: GlobalFetchContext
) => void;
export type BeforeFetchResponse = (context: GlobalFetchContext) => void;

export type AfterFetchResponse = (
  body: Response,
  context: GlobalFetchContext
) => Promise<Response>;

export interface FetchHooks {
  beforeFetchRequest?: BeforeFetchRequest;
  afterFetchRequest?: AfterFetchRequest;
  beforeFetchResponse?: BeforeFetchResponse;
  afterFetchResponse?: AfterFetchResponse;
}
export interface FetchParameter extends FetchHooks {
  originFetch: typeof window.fetch;
}

/**
 * fetch hook
 * @param FetchParameter
 * @returns fetch
 */
export const fetchHook = ({
  originFetch,
  beforeFetchRequest,
  afterFetchRequest,
  beforeFetchResponse,
  afterFetchResponse,
}: FetchParameter) => {
  const globalContext: GlobalFetchContext = {};
  const selfFetchproxy = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => {
    const originFetchInit = { input, init };
    globalContext.initCOntent = originFetchInit;
    const fetchInit = beforeFetchRequest
      ? await beforeFetchRequest(originFetchInit, globalContext)
      : originFetchInit;
    afterFetchRequest && afterFetchRequest(originFetchInit, globalContext);
    beforeFetchResponse && beforeFetchResponse(globalContext);
    const originResponse = await originFetch(
      fetchInit.input as any,
      fetchInit.init
    );
    globalContext.resContent = originResponse;
    const response =
      afterFetchResponse && afterFetchResponse(originResponse, globalContext);
    if (response) return response;
    return originResponse;
  };
  return selfFetchproxy;
};
