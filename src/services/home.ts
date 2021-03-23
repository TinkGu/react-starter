import { get } from 'utils/fetch';
import ApiHost from './api-config';

/**
 * 假设获取首页某个数据列表
 */
export function getHomeData(data: {
  id: number
}) {
  return get({
    url: `${ApiHost.apiHost}/kidsStuApi/home/todoList`,
    data,
  });
}
