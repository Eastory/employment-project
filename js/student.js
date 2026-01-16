// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()

// 新增学生数据
const modalDom = document.querySelector('#modal')
const modal = new bootstrap.Modal(modalDom)
// 打开Modal
document.querySelector('#openModal').addEventListener('click', async function() {
  modal.show()

  // 省市区联动
  const province = document.querySelector('[name ="province"]')
  const city = document.querySelector('[name ="city"]')
  const area = document.querySelector('[name ="area"]')
  
  if (!province.value) {
    const provinceData = await axios.get('/api/province')
    province.innerHTML = `<option value="">--省份--</option>${provinceData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
  }  

  province.addEventListener('change', async function () {
    const cityData = await axios.get('/api/city', {params: {pname: province.value}})
    city.innerHTML = `<option value="">--城市--</option>${cityData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
    
    // 如果都选完了再去改省份，要把地区也先清空
    area.innerHTML = `<option value="">--地区--</option>`
  })

  city.addEventListener('change', async function () {
    const areaData = await axios.get('/api/area', {params: {pname: province.value, cname: city.value}})
    area.innerHTML = `<option value="">--地区--</option>${areaData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
  })
  
})
// 点击确定，提交数据
document.querySelector('#submit').addEventListener('click', function () {
  addStudent()
})

async function addStudent() {
  const form = document.querySelector('form')
  const data = serialize(form, { empty: true, hash: true });

  // 转换数据格式
  data.age = +data.age
  data.group = +data.group
  data.hope_salary = +data.hope_salary
  data.salary = +data.group
  data.gender = +data.gender

  try {
    const res = await axios.post('/students', data);
    showToast(res.message)
    modal.hide()
    getData()
  } catch (error) {
    showToast(error.response.data.detail[0].field + ' ' + error.response.data.detail[0].message)
  }
}

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