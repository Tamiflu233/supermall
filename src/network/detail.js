// 详细页的数据请求
import {request} from './request';
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}