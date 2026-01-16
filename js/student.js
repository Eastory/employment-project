// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()

async function getData() {
  const res = await axios.get('/students')
  console.log(res.data);

  document.querySelector('.total').innerText = res.data.length
  document.querySelector('.list').innerHTML = res.data.map(ele => 
    `<tr>
      <td>${ele.name}</td>
      <td>${ele.age}</td>
      <td>${ele.gender === 0 ? '男' : '女'}</td>
      <td>第${ele.group}组</td>
      <td>${ele.hope_salary}</td>
      <td>${ele.salary}</td>
      <td>${ele.province + ele.city + ele.area}</td>
      <td data-id="${ele.id}">
        <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
        <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
      </td>
    </tr>`).join('')
}
getData()