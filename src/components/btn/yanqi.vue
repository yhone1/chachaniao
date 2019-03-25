<template>
  <div id="yanqi">
    <div id="guanbilan">
      <button @click="closexiangqing"><img src="../../assets/close.png" alt="" id="closeXQ"></button>
    </div>
    <div id="xinxitop">
      <h6>申请延期</h6>
      <form action="">
        <p id="yujihuankuan"><span style="display: inline-block;width: 50%">预计还款时间：</span><span>{{needhuan}}</span></p>
        <label for="yanqishijian"><span>延期还款时间：</span><input type="date" id="yanqishijian"></label>
        <label for="zhinajin"><span>滞纳金：</span><input type="number" id="zhinajin"></label>
        <label for="tepiedu"><span>特批额度：</span><input type="number" id="tepiedu"></label>
        <button @click="closexiangqing" style="background-color: white;color: #333;border:#333 solid 1px">取消</button>
        <button @click="queren">
          确认
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'yanqi',
  data () {
    return {
      dataUrl1: ''
    }
  },
  methods: {
    closexiangqing: function () {
      this.$emit('close', 'none')
    },
    queren: function () {
      var that = this
      var id = this.myid
      var periods = this.periods1
      var yanqishijian = document.getElementById('yanqishijian').value
      var tepiedu = document.getElementById('tepiedu').value
      var zhinajin = document.getElementById('zhinajin').value
      // 下面逻辑处理
      var data = {
        la_id: id,
        periods: periods,
        delay_time: yanqishijian,
        limit: tepiedu,
        overdue: zhinajin
      }
      var d = this.$qs.stringify(data)
      if (id === '' || periods === '' || yanqishijian === '' || zhinajin === '') {
        alert('请填入必须数据（除特批额度）！')
      } else {
        that.$axios.post('https://www.ispccn.com/Finance-Index-postpone', d).then(function () {
          that.closexiangqing()
        }).catch(function (err) {
          that.fetchError(err)
        })
      }
    }
  },
  props: [
    'fenlei1',
    'myid',
    'needhuan',
    'periods1',
    'qishu'
  ]
}
</script>

<style scoped>
  #guanbilan{
    border-bottom: 1px #333 solid;
    height: 30px;
    background-image: url("../../assets/back.jpg");
  }
  #guanbilan button{
    float: right;
    color: white;
    border:none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    margin-top: 2px;
    font-size: 12px;
    background-color: white;
    outline: none;
    margin-right: 10px;
  }
  #guanbilan button img{
    transition: .2s all;
  }
  #guanbilan button:hover img{
    transform: scale(0.7);
  }
  #guanbilan button img{
    height: 70%;
    margin-top: 15%;
  }
  #xinxitop{
    background: white;
    height: 100%;
    overflow: hidden;
  }
  h6{
    margin: 10px 25px;
    font-size: 24px;
    text-align: center;
  }
  form{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  label,p{
    font-size: 14px;
    width: 90%;
    margin: 15px 4%;
  }
  label span{
    display: inline-block;
    width: 48%;
  }
  p{
    font-size: 14px;
  }
  form button{
    background-color: #0095C9;
    display: inline-block;
    border: none;
    width: 120px;
    height: 35px;
    color: white;
    border-radius: 10px;
    font-size: 14px;
    margin: 40px 5%;
    outline: none;
    transition: .1s all;
  }
  form button:hover{
    transform: translate(1px,1px);
  }
</style>
