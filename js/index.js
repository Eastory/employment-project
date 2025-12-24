checkLogin()

renderUsername()

registerLogout()

async function getData() {
  try {
    const res = await axios({
      url:'/dashboard',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    
    const overview = res.data.data.overview
    Object.keys(overview).forEach(key => {
      document.querySelector(`.${key}`).innerText = overview[key]
    });

  }catch(error) {
    if (error.response.status === 401) {
      showToast('登录过期，请重新登录')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      setTimeout(() => {
        location.href = './login.html'
      }, 1500);
    }
  }
}
getData()