import {request} from './request';
/* 
  统一管理首页的各种请求
*/
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}