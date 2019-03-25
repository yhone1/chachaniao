<template>
  <div id="mainapp">
    <myindex id="myindex" mychoice="mymain"></myindex>
    <div id="kuangzi">
    <h5>代办事项</h5>
    <div id="daiban">
      <div id="daibanhead">
        <div class="dingdanmen">
          <div class="dingdanzuo">
            <h6 class="dingdan">待审核订单</h6>
            <p class="dingdanshu">{{myData.audit}}</p>
          </div>
          <div class="dingdanyou" style="background-color: rgba(232, 175, 59, 1)">
          </div>
        </div>
        <div class="dingdanmen">
          <div class="dingdanzuo">
            <h6 class="dingdan">待还款订单</h6>
            <p class="dingdanshu">{{myData.reimbursement}}</p>
          </div>
          <div class="dingdanyou" style="background-color: rgba(0, 204, 204, 1)">
          </div>
        </div>
        <div class="dingdanmen">
          <div class="dingdanzuo">
            <h6 class="dingdan">逾期订单</h6>
            <p class="dingdanshu">{{myData.audit}}</p>
          </div>
          <div class="dingdanyou" style="background-color: rgba(153, 204, 51, 1)">
          </div>
        </div>
      </div>
    </div>
    <div id="shuju">
      <div id="shujuzuo">
        <div id="tubiaokongzhi">
          <span @click="tubiaoqiehuan" id="yewuyuan">按业务员</span><span @click="tubiaoqiehuan" id="yuefen">按月份</span>
        </div>
        <div style="width: 100%;height: 96%;position: relative">
          <div id="yewuyuanbiao">
          </div>
          <div id="yuefenbiao">
          </div>
        </div>

      </div>
      <div id="shujuyou">
        <h4 id="shujuyoutitle">通知公告</h4>
        <div id="shujuyoubottom">
          <div>
            <p id="gonggaotitle">{{myData.messages.title}}</p>
            <p id="gonggaocontent">
              {{myData.messages.content}}
            </p>
          </div>
        </div>
        <button id="preBtn" @click="nextMsg">
          上一条<span style="display: none">{{myData.messages.id}}</span>
        </button>
        <button id="nextBtn" @click="nextMsg">
          下一条<span style="display: none">{{myData.messages.id}}</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import index from './index'
var a = 0
var myData = {
  tubiaoName: {
    a: '申请人数', b: '放款人数'
  },
  monthData: [],
  lending1: [],
  messages: '',
  audit: '',
  reimbursement: '',
  overdue: '',
  applications1: [],
  yewuyuan: [],
  shenqing: [],
  fangkuan: []
}
export default {
  name: 'mymain',
  data () {
    return {
      myData,
      lending: [],
      myA: []
    }
  },
  mounted () {
  },
  created () {
    this.mainopen()
    a = 0
  },
  components: {
    myindex: index
  },
  methods: {
    nextMsg: function (e) {
      var that = this
      var url
      var id = myData.messages.id
      var btn = e.target.innerText
      var gonggaocontent = document.getElementById('shujuyoubottom')
      var data = this.$qs.stringify({
        id: id
      })
      if (btn === '上一条') {
        url = 'https://www.ispccn.com/Finance-Index-ajaxArticlesyt'
        a = a - 360
        if (a < -360) {
          a = 0
        }
      } else {
        url = 'https://www.ispccn.com/Finance-Index-ajaxArticle'
        a = a + 360
        if (a > 360) {
          a = 0
        }
      }
      this.$axios.post(url, data).then(function (response) {
        that.$data.myData.messages = response.data
        gonggaocontent.style.transform = 'rotateY(' + a + 'deg)'
      }).catch(function (err) {
        that.fetchError = err
      })
    },
    tubiaoqiehuan: function (e) {
      var tu = e.target
      var tuID = e.target.id
      var yewuyuan = document.getElementById('yewuyuan')
      var yuefen = document.getElementById('yuefen')
      var wwybiao = document.getElementById('yewuyuanbiao')
      var yfbiao = document.getElementById('yuefenbiao')
      if (tuID === 'yewuyuan') {
        wwybiao.style.zIndex = '999'
        yfbiao.style.zIndex = '888'
      } else {
        wwybiao.style.zIndex = '888'
        yfbiao.style.zIndex = '999'
      }
      yewuyuan.setAttribute('style', 'background-color:white;color:#333;border:1px solid #bbb')
      yuefen.setAttribute('style', 'background-color:white;color:#333;border:1px solid #bbb')
      tu.setAttribute('style', 'background-color:rgba(0, 153, 255, 1);color:white;border:1px solid rgba(0, 153, 255, 1)')
    },
    drawLine: function () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('yuefenbiao'))
      // 绘制图表
      myChart.setOption({
        title: {text: '放款数据统计(月份)'},
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          left: 'center',
          data: [this.myData.tubiaoName.a, this.myData.tubiaoName.b],
          top: 0
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#333'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '放款人数' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              show: false,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '申请人数' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: ['', '', '', '', '', '', '', '', '', '', '', '']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            // 申请人数
            name: this.myData.tubiaoName.a,
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: this.myData.applications1.split(',')
          },
          {
            name: this.myData.tubiaoName.b,
            type: 'line',
            smooth: true,
            data: this.myData.lending1.split(',')
          }
        ]
      })
    },
    drawLine1: function () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('yewuyuanbiao'))
      var that = this
      // 绘制图表
      myChart.setOption({
        title: {text: '放款数据统计（业务员）'},
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          left: 'center',
          data: [this.myData.tubiaoName.a, this.myData.tubiaoName.b],
          top: 0
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#333'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return params.value + '-放款人数' + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: this.myData.yewuyuan.split(',')
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return params.value + '-申请人数' + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                }
              }
            },
            data: this.myData.yewuyuan.split(',')
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            // 申请人数
            name: this.myData.tubiaoName.a,
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: this.myData.shenqing.split(',')
          },
          {
            name: this.myData.tubiaoName.b,
            type: 'line',
            smooth: true,
            data: this.myData.fangkuan.split(',')
          }
        ]
      })
    },
    mainopen: function () {
      var that = this
      this.$axios.get('https://www.ispccn.com/Finance-Index-index')
        .then(function (response) {
          var massages = response.data.message
          // 待审核
          var audit = response.data.audit
          // 待还款
          var reimbursement = response.data.reimbursement
          // 逾期
          var overdue = response.data.overdue
          that.$data.myData.messages = massages
          that.$data.myData.audit = audit
          that.$data.myData.reimbursement = reimbursement
          that.$data.myData.overdue = overdue
          that.myData.applications1 = response.data.loan.applications
          that.myData.lending1 = response.data.loan.lending
          that.myData.yewuyuan = response.data.salesman.month
          that.myData.shenqing = response.data.salesman.applications
          that.myData.fangkuan = response.data.salesman.lending
          that.drawLine()
          that.drawLine1()
        })
        .catch(function (error) {
          that.fetchError = error
        })
    }
  }
}
</script>

<style scoped>
  h5{
    font-size: 24px;
  }
#mainapp{
  background-color: #eee;
  width: 100%;
  height: 100%;
  overflow: auto;
}
  #kuangzi{
    width: 83%;
    margin-left: 220px;
    margin-top: 50px;
    height: 93%;
    /*border:1px red solid*/
  }
#daiban{
  height: 13%;
  margin-top: 3%;
}
#daibanhead{
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 93%;
}
.dingdanmen{
  background-color: #fff;
  border-radius: 10px;
  width: 27%;
  height: 100%;
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dingdanzuo{
  height: 100%;
}
.dingdan{
  font-size: 18px;
  font-weight: bolder!important;
  height: 50%;
  display: flex;
  align-items: center;
  color: #9F9F9F;
}
.dingdanshu{
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #c40000;
}
  .dingdanyou{
    height: 65px;
    width: 65px;
    border-radius: 10%;
  }
  #shuju{
    height: 52%;
    margin-top: 30px;
  }
  #shujuzuo,#shujuyou{
    height: 100%;
    background-color: white;
    display: inline-block;
    border-radius: 10px;
    padding: 1%;
  }
  #shujuzuo{
    width: 59%;
    margin-right: 3%;
    overflow: auto;
    float: left;
    position: relative;
  }
  #yewuyuanbiao,#yuefenbiao{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    background-color: white;
  }
  #yuefenbiao{
    z-index: 1000;
  }
  #tubiaokongzhi{
    font-size: 14px;
    height: 6%;
    text-align: right;
  }
  #tubiaokongzhi span{
    display: inline-block;
    width: 60px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    margin-right: 3px;
    border: 1px #bbb solid;
    cursor: pointer;
  }
  #yuefen{
    background-color: rgba(0, 153, 255, 1);
    color: white;
    border: 1px solid  rgba(0, 153, 255, 1);
  }
  #shujuyou{
    width: 28%;
    overflow: auto;
  }
  h4{
    font-size: 20px;
    color: black;
  }
  #gonggaotitle{
    font-size:16px;
    margin: 8% 0;
  }
  #gonggaocontent{
    font-size: 14px;
    width:60%;
  }
  #shujuyoutitle{
    height: 12%;
    display: flex;
    align-items: center;
    text-indent: 1.5em;
    border-bottom: 1px #d0d0d0 solid;
  }
  #shujuyoubottom{
    background-color: #f3f3f3;
    height: 65%;
    width: 80%;
    margin: 6% 10% 3%;
    border-radius: 10px;
    overflow: auto;
    transform: rotateY(0deg);
    transition: .8s all;
  }
  #shujuyoubottom p{
    width: 90%;
    margin-left: 5%;
  }
  #preBtn{
    background-color: white;
    border:1px #c4c4c4 solid;
    float: left;
    margin-left: 10%;
    width: 25%;
    height: 8%;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
  #nextBtn{
    background-color: white;
    border:1px #c4c4c4 solid;
    float: right;
    margin-right: 10%;
    width: 25%;
    height: 8%;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
</style>
