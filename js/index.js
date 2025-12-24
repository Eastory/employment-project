// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()
// 获取统计数据
async function getData() {
  try {
    const res = await axios({
      url:'/dashboard',
      // 在请求头上添加token已配置在请求拦截器
      // headers: {
      //   Authorization: localStorage.getItem('token')
      // }
    })

    const overview = res.data.data.overview
    Object.keys(overview).forEach(key => {
      document.querySelector(`.${key}`).innerText = overview[key]
    });

  }catch(error) {
    // 判断token失效已配置在响应拦截器
    // if (error.response.status === 401) {
    //   showToast('登录过期，请重新登录')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('username')
    //   setTimeout(() => {
    //     location.href = './login.html'
    //   }, 1500);
    // }
  }
}
getData()