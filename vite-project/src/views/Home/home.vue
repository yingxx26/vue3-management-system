<template>
  <el-row class="home"
          :gutter="20">
    <el-col :span="8">
      <el-card class="box-card"
               style="height: 252px;">
        <div class="user">
          <img src="@/assets/images/header.jpg"
               alt=''>
          <div class="userinfo">
            <p class="name">轨迹</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-3-29</span></p>
          <p>上次登录地点：<span>西安</span></p>
        </div>
      </el-card>
      <el-card shadow="hover"
               style="margin-top:20px">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel"
                           :key="key"
                           :prop="key"
                           :label="val">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="hover"
               style="height: 230px;margin-top: 20px;">
        <template #header>
          <div class="clearfix">
            <span>语言详情</span>
          </div>
        </template>
        Vue
        <el-progress :percentage="79.4"
                     :stroke-width="10"
                     color="#42b983"></el-progress>
        TypeScript
        <el-progress :percentage="14"
                     :stroke-width="9"
                     color="#f1e05a"></el-progress>
        CSS
        <el-progress :percentage="5.6"
                     :stroke-width="9"></el-progress>
        HTML
        <el-progress :percentage="1"
                     color="#f56c6c"
                     :stroke-width="9"></el-progress>
      </el-card>
    </el-col>
    <el-col :span="16"
            style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData"
                 :key="item.name"
                 :body-style="{ display: 'flex', padding: 15 }">
          <component class="icons"
                     :is="item.icon"
                     :style="{ background: item.color }">
          </component>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <div ref="echarts1"
             style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="echarts2"
               style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="echarts3"
               style="height: 260px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance, reactive } from 'vue';
import * as echarts from 'echarts';
export default defineComponent({
  setup () {
    const { proxy } = getCurrentInstance()
    //  console.log(getCurrentInstance())
    //代表着当前组件的实例相当于this，但是违背了vue3中setup中不使用this的意愿，尽量不用，官方文档已经找不到此api，此处作为学习
    let tableData = ref([])
    let countData = ref([])
    //获取表格模拟值
    const getMockTableData = async () => {
      let result = await proxy.$api.getMockTableData()
      //let result = await api.getMockTableData() 可以单文件导入api获取值
      tableData.value = result
    }
    /*  获取统计数据 */
    const getcountData = async () => {
      let result = await proxy.$api.getCountData()
      countData.value = result
    }
    /*  echarts表格渲染配置 */
    /* x轴配置 */
    let XOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      //横坐标轴
      xAxis: {
        type: "category", // 类目轴
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      //纵坐标轴
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "8d98b3"],
      series: [
        {
          name: '新增用户',
          type: 'bar'
        },
        {
          name: '活跃用户',

          type: 'bar'
        }
      ],
    })
    /* 饼状图配置 */
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    })
    /* 折线图渲染 */
    let orderData = {
      series: [],
      xData: []
    }
    /* 柱状图渲染 */
    let userData = reactive({
      xData: [],
      series: []
    })
    /* 饼状图渲染 */
    let videoData = reactive({
      series: []
    })
    /* 获取不同Echarts图表数据 */
    const getEchartsData = async () => {
      let result = await proxy.$api.getEchartsData()//发送请求获取数据
      // console.log(result)
      /* 得到各图表数据 */
      let resOrder = result.orderData
      let resUser = result.userData
      let resVideo = result.videoData
      orderData.xData = resOrder.date
      const keyArray = Object.keys(resOrder.data[0])//获取对象的属性名['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']
      // console.log(keyArray)
      const series = []
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: resOrder.data.map((item) => item[key]),//这里补充一个知识array.map()  遍历数组，结果返回新数组,这里获取品牌对应每天的销量
          // test:console.log( resOrder.data.map((item) => item[key])),
          type: "line"
        })
      })
      orderData.series = series
      /* 折线图渲染 */
      XOptions.xAxis.data = orderData.xData
      XOptions.series = orderData.series
      let OrderEcharts = echarts.init(proxy.$refs['echarts1'])
      OrderEcharts.setOption(XOptions)
      /* 柱状图渲染 */
      userData.xData = resUser.map((item) => item.date)
      userData.series = [
        {
          name: '新增用户',
          data: resUser.map((item) => item.new),
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: resUser.map((item) => item.active),
          type: 'bar'
        },
      ]
      XOptions.xAxis.data = userData.xData
      XOptions.series = userData.series
      let UserEcharts = echarts.init(proxy.$refs['echarts2'])
      UserEcharts.setOption(XOptions)
      /* 饼状图渲染 */
      videoData.series = [
        {
          data: resVideo,
          type: 'pie'
        }
      ]
      pieOptions.series = videoData.series
      let VideoEcharts = echarts.init(proxy.$refs['echarts3'])
      VideoEcharts.setOption(pieOptions)
    }
    onMounted(() => {
      getMockTableData()
      getcountData()
      getEchartsData()
    })
    const tableLabel = {
      name: "手机",
      todayBuy: '今日购买',
      monthBuy: "本月购买",
      totalBuy: '总共购买'
    }
    return {
      tableData,
      tableLabel,
      countData,

    }
  }

})
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icons {
    width: 80px;
    height: 80px;
    font-size: 26px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 26px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>