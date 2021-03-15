// 引入 axios
import axios from 'axios'
import router from './router'
import { Message, Loading } from "element-ui"

let loading;

// 加载动画得开始
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    backgroundColor: "rgba(0,0,0,0,7)"
  })
}
// 关闭动画
function endLoading () {
  loading.close()
}
// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading()
  config.headers.Authorization = localStorage.eleToken //每次发送请求之前自动将在session中的token提取出来当做响应头header
  return config
}, err => {
  return Promise.reject(err)
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束加载动画
  setTimeout(() => {
    endLoading()
  }, 200)
  return response
}, err => {
  Message.error(err.response)
  endLoading();
  // 获取错误状态码
  const { status } = err.response;
  if (status == 401) {
    // 401 是token 值失效
    Message.error("登录过期 请重新登陆!");
    localStorage.removeItem("eleToken");
    // 跳转到登录页
    router.push("/login")
  }
  return Promise.reject(err)
})

export default axios