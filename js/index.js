checkLogin()

renderUsername()

registerLogout()

async function getData() {
  const res = await axios({
    url:'/dashboard',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  console.log(res);
  
  const overview = res.data.data.overview

  Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerText = overview[key]
  });
}
getData()