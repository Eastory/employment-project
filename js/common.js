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
