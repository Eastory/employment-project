// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()
// 获取数据
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

// Modal
const modalDom = document.querySelector('#modal')
const modal = new bootstrap.Modal(modalDom)

// Modal 表单中可直接处理的数据
const keyArr = ['name', 'age', 'group', 'hope_salary', 'salary']
// Modal 表单中需要转换为int类型的数据
const keyInt = ['age', 'gender', 'group', 'hope_salary', 'salary']

// 重置 modal
function resetModal() {
  document.querySelector('.modal-title').innerText = '添加学员'

  keyArr.forEach(ele => {
    document.querySelector(`[name ="${ele}"]`).value = ''
  })

  loadProvince()
  city.innerHTML = `<option value="">--城市--</option>`
  area.innerHTML = `<option value="">--地区--</option>`
}

// 新增学员时打开 Modal
document.querySelector('#openModal').addEventListener('click', async function() {
  resetModal()
  modal.show()
})

// 省市区联动
const province = document.querySelector('[name ="province"]')
const city = document.querySelector('[name ="city"]')
const area = document.querySelector('[name ="area"]')

// 加载可选省份
async function loadProvince() {
  const provinceData = await axios.get('/api/province')
  province.innerHTML = `<option value="">--省份--</option>${provinceData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
}
// 加载可选地市
async function loadCity() {
  const cityData = await axios.get('/api/city', {params: {pname: province.value}})
  city.innerHTML = `<option value="">--城市--</option>${cityData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
  
  // 如果都选完了再去改省份，要把地区也先清空
  area.innerHTML = `<option value="">--地区--</option>`
}
// 加载可选地区
async function loadArea() {
  const areaData = await axios.get('/api/area', {params: {pname: province.value, cname: city.value}})
  area.innerHTML = `<option value="">--地区--</option>${areaData.data.map(ele => `<option value="${ele}">${ele}</option>`).join('')}`
}

// 省市区初始化
async function initSelect() {

  loadProvince()
  province.addEventListener('change', loadCity)
  city.addEventListener('change', loadArea)
}
initSelect()

// 绑定Modal确定按钮事件
document.querySelector('#submit').addEventListener('click', function () {
  if (modalDom.dataset.id) {
    updateStudent('put', modalDom.dataset.id)
  } else {
    updateStudent('post')
  }
})

// 增加或修改学生数据
async function updateStudent(method, id) {
  const form = document.querySelector('form')
  const data = serialize(form, { empty: true, hash: true });

  // 转换数据格式
  keyInt.forEach(ele => {data[ele] = +data[ele]})

  let res
  if (method === 'post')
    res = await axios[method]('/students', data);
  else {
    res = await axios[method](`/students/${id}`, data);
  }
  showToast(res.message)
  modal.hide()
  getData()
}

// 绑定编辑和删除点击事件
document.querySelector('.list').addEventListener('click', function(e) {
  if (e.target.classList.contains('bi-trash')) {
    deleteStudent(e.target.parentNode.parentNode.dataset.id)
  }
  if (e.target.classList.contains('bi-pen')) {
    editStudent(e.target.parentNode.parentNode.dataset.id)
  }
})

// 删除学生数据
async function deleteStudent(id) {
  await axios.delete(`students/${id}`)
  getData()
}

// 修改学生数据
async function editStudent(id) {
  document.querySelector('.modal-title').innerText = '修改学员'

  const {data} = await axios.get(`/students/${id}`)
  console.log(data);
  
  // 姓名 年龄 组 期望薪资 薪资
  keyArr.forEach(ele => {
    document.querySelector(`[name ="${ele}"]`).value = data[ele]
  })

  // 性别
  document.querySelectorAll(`[name =gender]`)[`${data.gender}`].checked = true

  // 省市区
  province.value = data.province
  await loadCity()
  city.value = data.city
  await loadArea() 
  area.value = data.area

  modal.show()
  modalDom.dataset.id = id
}
