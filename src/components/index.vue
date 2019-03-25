<template>
  <div id="index">
    <div id="userHeader">
      <span id="welcomeUser">亲爱的 {{userName}} ,欢迎回来<u style="margin-left: 40px;cursor: pointer" @click="unLogin">退出登录</u></span>
      <span id="myNowTime">
        <span id="myD">{{myDay}}</span>
        <span id="myM">{{myMonth}}</span>
        <span id="shuxian"></span>
        <span id="myH">{{myHour}}：</span>
        <span id="myMin">{{myMin}}</span>
      </span>
    </div>
    <div id="userList">
      <div id="userImg">上传头像</div>
      <div id="list">
        <ul>
          <li @click="myChange" class="changeColor" id="mymain">主页</li>
          <li @click="myChange" class="changeColor" id="fangkuan">放款管理</li>
          <li @click="myChange" class="changeColor" id="kehu">客户管理</li>
          <li @click="myChange" class="changeColor" id="chanpinguanli">产品管理</li>
          <li @click="myChange" class="changeColor" id="yuangongguanli">员工管理</li>
          <li @click="myChange" class="changeColor" id="tongzhigonggao">通知公告</li>
        </ul>
      </div>
    </div>
    <!--<div id="main">-->
      <!--<router-view/>-->
      <!--<component :is="componentName"></component>-->
    <!--</div>-->
  </div>
</template>

<script>
// import mymain from './mymain'
// import fangkuan from './fangkuan'
// import kehu from './kehu'
// import chanpinguanli from './chanpinguanli'
// import yuangongguanli from './yuangongguanli'
// import tongzhigonggao from './tongzhigonggao'
export default {
  name: 'index',
  // components: {
    // mymain: mymain,
    // fangkuan: fangkuan,
    // kehu: kehu,
    // chanpinguanli: chanpinguanli,
    // yuangongguanli: yuangongguanli,
    // tongzhigonggao: tongzhigonggao
  // },
  data () {
    return {
      userName: sessionStorage.username,
      myMonth: '',
      myDay: '',
      myHour: '',
      myMin: '',
      componentName: 'mymain'
    }
  },
  methods: {
    myChange: function (e) {
      var myChoice = e.target.id
      // console.log(e.target.id)
      // this.$data.componentName = myChoice
      if (myChoice === 'mymain'){
        this.$router.push({path: '/index'})
      } else if (myChoice === 'kehu'){
        this.$router.push({path: '/yhgl'})
      } else if (myChoice === 'tongzhigonggao'){
        this.$router.push({path: '/tzgg'})
      } else if (myChoice === 'fangkuan'){
        this.$router.push({path: '/fkgl'})
      } else if (myChoice === 'chanpinguanli'){
        this.$router.push({path: '/cpgl'})
      } else if (myChoice === 'yuangongguanli'){
        this.$router.push({path: '/yggl'})
      }
    },
    unLogin: function () {
      sessionStorage.clear()
      this.$router.push({path: '/login'})
    },
    changeC: function () {
      var myColor = document.getElementById(this.mychoice)
      var allColor = document.getElementsByClassName('changeColor')
      console.log(myColor)
      for (var i = 0; i < allColor.length; i++) {
        allColor[i].style.backgroundColor = 'rgba(0,0,0,0)'
        allColor[i].style.color = '#eee'
      }
      // myColor.style.backgroundColor = '#eee'
      // myColor.style.color = '#333'
    }
  },
  props: [
    'mychoice'
  ],
  created: function () {
    this.changeC()
  },
  mounted: function () {
    var that = this
    let myDate = new Date()
    let myMonth1 = myDate.getMonth() + 1
    let myDay = myDate.getDate()
    let myHour = myDate.getHours()
    let myMin = myDate.getMinutes()
    let myMonth = 1
    if (myMin < 10) {
      myMin = '0' + myMin
    } else if (myHour < 10) {
      myHour = '0' + myHour
    }
    switch (myMonth1) {
      case 1: myMonth = 'Jan'
      case 2: myMonth = 'Feb'
      case 3: myMonth = 'Mar'
      case 4: myMonth = 'Apr'
      case 5: myMonth = 'May'
      case 6: myMonth = 'Jun'
      case 7: myMonth = 'July'
      case 8: myMonth = 'Aug'
      case 9: myMonth = 'Sept'
      case 10: myMonth = 'Oct'
      case 11: myMonth = 'Nov'
      case 12: myMonth = 'Dec'
    }
    that.$data.myMonth = myMonth
    that.$data.myDay = myDay
    that.$data.myHour = myHour
    that.$data.myMin = myMin
    setInterval(function () {
      let myDate = new Date()
      let myMonth1 = myDate.getMonth() + 1
      let myDay = myDate.getDate()
      let myHour = myDate.getHours()
      let myMin = myDate.getMinutes()
      let myMonth = 1
      if (myMin < 10) {
        myMin = '0' + myMin
      } else if (myHour < 10) {
        myHour = '0' + myHour
      }
      switch (myMonth1) {
        case 1: myMonth = 'Jan'
        case 2: myMonth = 'Feb'
        case 3: myMonth = 'Mar'
        case 4: myMonth = 'Apr'
        case 5: myMonth = 'May'
        case 6: myMonth = 'Jun'
        case 7: myMonth = 'July'
        case 8: myMonth = 'Aug'
        case 9: myMonth = 'Sept'
        case 10: myMonth = 'Oct'
        case 11: myMonth = 'Nov'
        case 12: myMonth = 'Dec'
      }
      that.$data.myMonth = myMonth
      that.$data.myDay = myDay
      that.$data.myHour = myHour
      that.$data.myMin = myMin
    }, 60000)
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    font-family: "'PingFangSC-Regular', 'PingFang SC';";
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #eee;
  }
  #userHeader{
    width: 100%;
    height: 45px;
    min-width: 1024px;
    background-color: #333;
    background-image: url("../assets/back.jpg");
    position: fixed;
    overflow: hidden;
    z-index: 999;
  }
  #welcomeUser{
    position: absolute;
    top: 50%;
    left: 220px;
    font-size: 12px;
    display: inline-block;
    color: #cccccc;
    margin-top: -6px;

  }
  #userList{
    width: 200px;
    height: 100%;
    min-height: 768px;
    background-color: #333;
    position: fixed;
    display: flex;
    flex-direction:column;
    align-items: center;
    z-index: 9999;
    background-image: url("../assets/back.jpg");
  }
  #userImg{
    width: 130px;
    height: 130px;
    background-color: #FFF;
    margin: 50px auto 0;
    border-radius: 50%;
    font-size: 20px;
    text-align: center;
    line-height: 130px;
    color: #cbcbcb;
  }
  #list{
    height: 70%;
    margin-top: 12%;
    width: 98%;
    text-align: center;
  }
  #list ul{
    list-style: none;
    color: #cccccc;
    font-size: 14px;
    font-weight: bold;
    height: 100%;
  }
  #list li{
    height: 40px;
    line-height: 40px;
    width: 100%;
    margin-bottom: 20%;
    transition: .2s all;
    border-radius: 3px 10px 10px 3px;
    /*background-image: url("./assets/back.jpg");*/
  }
  #list li:hover{
    cursor: pointer;
    width: 240px;
    background-color: #eeeeee!important;
    color: #333!important;
  }
  #myNowTime,#myNowTime span{
    float: right;
    color: #cccccc;
    font-size: 23px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  #myNowTime{
    margin-right: 60px;
  }
  #shuxian{
    border-right: #ccc 1px solid;
    height: 80%!important;
    margin: 0 30px;
  }
  #myM{
    font-size: 15px!important;
    margin-top: 7px;
  }
  input{
    outline: none;
  }
</style>
