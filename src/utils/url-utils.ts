import qs from 'qs';
import { history } from 'store/history';

export function goBack() {
  history.goBack && history.goBack();
}

/** 结构化 query */
export function qsParse(url?: string) {
  try {
    const href = url || window.location.href;
    if (!href || typeof href !== 'string') {
      return {};
    }
    const query = href.split('?')[1];
    return qs.parse(query, { ignoreQueryPrefix: true });
  } catch (err) {
    console.error('qs parse error', err);
  }
  return {};
}

/** 将对象转为 query 字符串并 encode */
export function qsEncode(data: Record<string, any>) {
  return qs.stringify(data, { encode: true });
}

type NavigateOpts = {
  url: string;
  method?: 'push' | 'replace'; // history method
  query?: Record<string, string | number | undefined | null>; // 参数
}

/** 通用跳转 */
export function navigate({
  method = 'push',
  query,
  url = '',
}: NavigateOpts) {

  const historyMethod = method || 'push';
  const linkTo = history[historyMethod];
  if (typeof url !== 'string' || !linkTo) {
    return;
  }

  const querystring = typeof query === 'object' ? qs.stringify(query, { encode: true }) : '';
  let infix = '';
  if (querystring) {
    infix = url.includes('?') ? '&' : '?';
  }
  const finalUrl = `${url}${infix}${querystring}`;
  return linkTo(finalUrl);
}
