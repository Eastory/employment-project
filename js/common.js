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
// showToast("hahahahaha");

