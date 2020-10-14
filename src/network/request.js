/* 封装axios(可能有很多axios实例要导出，故不用export default) */
import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);

    return config //必须返回，不然组件里request的时候then里面拿不到，就会去err报错
  }, err => {
    // console.log(err);
    // return err
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data //会拦截响应，所以要把data返回
  }, err => {
    // console.log(err);
    // return err
  })

  //3. 发送真正的网络请求
  return instance(config)

}