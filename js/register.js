// 用户注册

// 收集并校验数据
document.querySelector("#btn-register").addEventListener("click", async () => {
  const form = document.querySelector(".register-form");
  const data = serialize(form, { empty: true, hash: true });
  console.log(data);
// console.log('hi',axios.defaults.baseURL );
  // 校验
  const { username, password } = data;
  if (!username || !password) {
    showToast("用户名和密码不能为空");
    return;
  }
  if (username.length < 8 || password.length < 6) {
    showToast("用户名大于8位，密码大于六位");
    return;
  }
  
  
  // 提交数据
  try {
    const res = await axios.post("/register", { username, password });
    showToast(res.message);
  } catch (error) {
    showToast(error.response.data.message)
  }

});
