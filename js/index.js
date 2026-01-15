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
      text: '2022薪资走势',
      top: 10,
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

// 获取统计数据
async function getData() {

    const res = await axios({
      url:'/dashboard',
    })
    console.log(res);

    const {overview, year} = res.data

    renderOverview(overview)
    renderYearSalary(year)
}
getData()