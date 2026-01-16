axios.defaults.baseURL = "http://ajax-api.itheima.net";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // 处理token失效
  if (error.response.status === 401) {
    showToast('登录过期，请重新登录')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  }
  return Promise.reject(error)
})

// 抽取轻提示函数
function showToast(msg) {
  const toastDom = document.querySelector(".my-toast");
  toastDom.style.zIndex = 1100 // 让他显示在新增学生数据的Modal上面
  // 实例化toast组件
  const toast = new bootstrap.Toast(toastDom);
  // 修改内容并显示
  document.querySelector(".toast-body").innerText = msg;
  toast.show();
}

// 抽取校验函数 判断token
function checkLogin() {
  const token = localStorage.getItem('token')
  if (!token) {
    showToast('请先登录')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  }
}

// 抽取渲染函数（渲染用户名）
function renderUsername() {
  const username = localStorage.getItem('username')
  document.querySelector('.username').innerText = username
}

// 抽取退出登录函数
function registerLogout() {
  document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = './login.html'
  })
}