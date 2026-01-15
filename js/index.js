// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()
// 渲染顶部数据
function renderOverview(overview) {
  Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerText = overview[key]
  });
}

// 获取统计数据
async function getData() {

    const res = await axios({
      url:'/dashboard',
    })
    console.log(res);

    const {overview} = res.data

    renderOverview(overview)
}
getData()