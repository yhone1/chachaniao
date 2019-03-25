<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import index from './components/index'
import login from './components/login'
import mymain from './components/mymain'
import fangkuan from './components/fangkuan'
import kehu from './components/kehu'
import chanpinguanli from './components/chanpinguanli'
import yuangongguanli from './components/yuangongguanli'
import tongzhigonggao from './components/tongzhigonggao'
export default {
  name: 'App',
  components: {
    mymain: mymain,
    fangkuan: fangkuan,
    kehu: kehu,
    chanpinguanli: chanpinguanli,
    yuangongguanli: yuangongguanli,
    tongzhigonggao: tongzhigonggao,
    index: index,
    login: login
  },
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
      var myColor = e.target
      var allColor = document.getElementsByClassName('changeColor')
      this.$data.componentName = myChoice
      for (var i = 0; i < allColor.length; i++) {
        allColor[i].style.backgroundColor = 'rgba(0,0,0,0)'
        allColor[i].style.color = '#eee'
      }
      myColor.style.backgroundColor = '#eee'
      myColor.style.color = '#333'
    }
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
      let myHour = myDate.getHours();
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
    font-family: MicrosoftYaHei;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #eee;
  height: 100%;
}
</style>
