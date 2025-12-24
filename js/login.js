document.querySelector("#btn-login").addEventListener("click", async () => {
  const form = document.querySelector(".login-form");
  const data = serialize(form, { empty: true, hash: true });

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
    const res = await axios.post("/login", { username, password });
    showToast(res.data.message);
    console.log(res);
    
    // 缓存数据
    localStorage.setItem('token', res.data.data.token)
    localStorage.setItem('username', res.data.data.username)

    // 跳转首页
    setTimeout(() => {    
      location.href = './index.html'
    }, 1500);
  } catch (error) {
    showToast(error.response.data.message)
  }

});