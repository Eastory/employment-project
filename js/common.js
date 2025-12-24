axios.defaults.baseURL = "http://ajax-api.itheima.net";
// 抽取轻提示函数
function showToast(msg) {
  const toastDom = document.querySelector(".my-toast");
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