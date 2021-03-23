import axios, { Method } from 'axios';

const noop = () => null;

type RequestConfig = {
  url: string;
  headers?: Record<string, string>;
  data?: any;
  onUploadProgress?: (progressEvent: any) => void;
  noAutoToken?: boolean;
  timeout?: number;
};

/**
 * 通用接口请求
 * @param method http method
 * @param url
 * @param headers
 * @param data post 请求时携带的 request data
 * @param noAutoToken 请求时不需要自动携带 token
 */
const request = (method: Method) => ({
  url = '',
  headers = {},
  data = {},
  onUploadProgress = noop,
  noAutoToken,
  timeout = 10000,
}: RequestConfig) => {
  let accessToken = '';
  if (!noAutoToken) {
    // try {
    //   accessToken = getToken();
    // } catch (error) {
    //   logger.error('get accessToken failed!', JSON.stringify(error));
    // }
  }
  return axios({
    url,
    method,
    headers: {
      accessToken,
      ...headers,
    },
    params: method === 'get' ? data : null,
    data,
    onUploadProgress,
    timeout,
  })
    .then((res) => {
      const result = res.data;
      // 使得返回值中可以取到 status
      if (result && typeof result === 'object') {
        result._status = res.status;
      }
      if (res.status === 200) {
        return result;
      }
      throw result;
    })
    .catch((err) => {
      console.error(`fetch: ${url} error, params: ${JSON.stringify(data)}`, JSON.stringify(err));
      throw err;
    });
};

export const get = request('get');
export const post = request('post');
