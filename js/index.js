// 判断有没有token，无token不能访问主页，跳转登录
checkLogin()
// 渲染主页的用户名
renderUsername()
// 退出登录功能
registerLogout()
// 渲染顶部数据
function renderOverview(overview) {
  Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerText = overview[key]
  });
}
// 渲染薪资走势
function renderYearSalary(year) {
  const myChart = echarts.init(document.querySelector('#line'))

  const option = {
    title: {
      text: '2022年薪资走势',
      top: 15,
      left: 10
    },
    tooltip: {
      show: 'true',
      trigger: 'axis'
    },
    grid: {
      top: 80
    },
    xAxis: {
      data: year.map(ele => ele.month),
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: '#bbb'
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '薪资',
        data: year.map(ele => ele.salary),
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#668FE9'
        },
        lineStyle: {
          width: 6,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
                offset: 0, color: '#5CA0E7' // 0% 处的颜色
            }, {
                offset: 1, color: '#657EEB' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        areaStyle: {
          origin: 'auto',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#89B9F1' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        symbolSize: 10
      }
    ]
  };

  myChart.setOption(option)

}
// 渲染班级薪资分布
function renderClassSalary(salaryData) {
  const myChart = echarts.init(document.querySelector('#salary'))

  const option = {
    title: {
      text: '班级薪资分布',
      top: 15,
      left: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        radius: ['50%', '65%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 25,
            fontWeight: 'bold'
          }
        },
        avoidLabelOverlap: false,
        data: salaryData.map(ele =>  ({value: ele.b_count + ele.g_count, name: ele.label}) )
      }
    ],
    color: ['#FCA42F','#5799F8','#F17B70','#36C09D']
  };

  myChart.setOption(option)
}
// 渲染每组薪资
function renderGroupSalary(groupData, groupNumber = 1) {

  const myChart = echarts.init(document.querySelector('#lines'))

  const option = {
    grid: {
      left:78,
      top: 30,
      right: 30,
      bottom: 50
    },
    xAxis: {
      type: 'category',
      data: groupData[1].map(ele => ele.name),
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: '#bbb'
        }
      },
      // 横轴标签相关设置
      axisLabel: {
        // 横轴文字颜色，默认和 lineStyle 颜色一样
        color: '#888'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    tooltip:{},
    series: [
      {
        name: '期望薪资',
        data: groupData[groupNumber].map(ele => ele.hope_salary),
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#34D39A' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(52,211,154,0.2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: '实际薪资',
        data: groupData[groupNumber].map(ele => ele.salary),
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#499FEE' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(73,159,238,0.2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ]
  };

  myChart.setOption(option)
}
// 渲染男女薪资分布
function renderGenderSalary(salaryData) {
  const myChart = echarts.init(document.querySelector('#gender'))

  const option = {
    title: [
      {
        text: '男女薪资分布',
        top: '15',
        left: '10'
      },
      {
        subtext: '男生',
        bottom: '49%',
        left: 'center',
        subtextStyle: {
          color: '#333',
          fontWeight: 'bold'
        }
      },
      {
        subtext: '女生',
        bottom: '4%',
        left: 'center',
        subtextStyle: {
          color: '#333',
          fontWeight: 'bold'
        }
      },
    ],
    tooltip: {},
    series: [
      {
        name: '男生',
        type: 'pie',
        radius: ['30%', '45%'],
        center: ['50%', '30%'],
        data: salaryData.map(ele => ({value: ele.b_count, name: ele.label})),
      },
      {
        name: '女生',
        type: 'pie',
        radius: ['30%', '45%'],
        center: ['50%', '75%'],
        data: salaryData.map(ele => ({value: ele.g_count, name: ele.label})),
      }
    ],
    color: ['#FCA42F','#5799F8','#F17B70','#36C09D']
  };

  myChart.setOption(option)
}
// 渲染籍贯分布
function renderProvince(provinceData) {
  const dataset = [{
                name: '北京',
                value: 0
            },
            {
                name: '天津',
                value: 0
            },
            {
                name: '上海',
                value: 0
            },
            {
                name: '重庆',
                value: 0
            },
            {
                name: '河北',
                value: 0
            },
            {
                name: '河南',
                value: 0
            },
            {
                name: '云南',
                value: 0
            },
            {
                name: '辽宁',
                value: 0
            },
            {
                name: '黑龙江',
                value: 0
            },
            {
                name: '湖南',
                value: 0
            },
            {
                name: '安徽',
                value: 0
            },
            {
                name: '山东',
                value: 0
            },
            {
                name: '新疆',
                value: 0
            },
            {
                name: '江苏',
                value: 0
            },
            {
                name: '浙江',
                value: 0
            },
            {
                name: '江西',
                value: 0
            },
            {
                name: '湖北',
                value: 0
            },
            {
                name: '广西',
                value: 0
            },
            {
                name: '甘肃',
                value: 0
            },
            {
                name: '山西',
                value: 0
            },
            {
                name: '内蒙古',
                value: 0
            },
            {
                name: '陕西',
                value: 0
            },
            {
                name: '吉林',
                value: 0
            },
            {
                name: '福建',
                value: 0
            },
            {
                name: '贵州',
                value: 0
            },
            {
                name: '广东',
                value: 0
            },
            {
                name: '青海',
                value: 0
            },
            {
                name: '西藏',
                value: 0
            },
            {
                name: '四川',
                value: 0
            },
            {
                name: '宁夏',
                value: 0
            },
            {
                name: '海南',
                value: 0
            },
            {
                name: '台湾',
                value: 0
            },
            {
                name: '香港',
                value: 0
            },
            {
                name: '澳门',
                value: 0
            },
        ]
  dataset.forEach(ele1 => {
    const res = provinceData.find(ele2 => ele2.name.includes(ele1.name))
    if (res)
      ele1.value = res.value
  })
  const myChart = echarts.init(document.querySelector('#map'))
  const option = {
    title: {
      text: '籍贯分布',
      top: 15,
      left: 10
    },
    visualMap: {
        min: 0,
        max: 6,
        left: 20,
        top: 'bottom',
        text: ['高', '低'],
        inRange: {
            color: ['#e0ffff', '#006edd'],
        }
    },
    tooltip: {},
    series: [{
        name: '学院数量',
        type: 'map',
        mapType: 'china',
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            color: '#e0ffff',
          },
          emphasis: {
            areaColor: '#34D39A',
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          normal: { //静态的时候展示样式
            show: true, //是否显示地图省份得名称
            textStyle: {
              color: 'rgba(0,0,0,0.7)',
              fontSize: 10
            }
          },
          emphasis: { //动态展示的样式
            color: '#fff',
          },
        },
        data: dataset
    }, ]
  }
  myChart.setOption(option)
}
// 获取统计数据
async function getData() {

    const res = await axios({
      url:'/dashboard',
    })
    console.log(res);

    const {overview, year, salaryData, groupData, provinceData} = res.data

    renderOverview(overview)
    renderYearSalary(year)
    renderClassSalary(salaryData)
    renderGroupSalary(groupData)
    renderGenderSalary(salaryData)
    renderProvince(provinceData)

    document.querySelector('.card-header').addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON' || e.target.classList.contains('btn-blue')) {
        return
      }
      document.querySelector('.btn-blue').classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
      renderGroupSalary(groupData, e.target.innerText)
    })
}
getData()