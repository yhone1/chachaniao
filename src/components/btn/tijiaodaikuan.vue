<template>
    <div id="tijiaoapp">
      <div id="tihead"><h6>贷款申请</h6></div>
      <div id="tibody">
        <label for="daikuanjine">贷款金额 <input type="number" id="daikuanjine" v-model="daiJE" @keyup="zhanshi"></label>
        <label for="daikuanchanpin">贷款产品&nbsp;&nbsp;<select name="chanpin" id="daikuanchanpin" @change="zhanshi">
          <option :value=0>请选择产品</option>
          <option v-for="(chanpin,index,key) in chanlist" :key="index" :value=chanpin.id>{{chanpin.name}}</option>
        </select></label>
      </div>
      <label for="shouxufei">手续费 <input type="text" id="shouxufei" readonly v-model="chanSXF"></label>
      <label for="daikuanqixian">贷款期限 <input type="text" id="daikuanqixian" readonly v-model="chanQX"></label>
      <label for="lixi">利息 <input type="text" id="lixi" readonly v-model="chanLX"></label>
      <label for="huankuanzonge">还款总额 <input type="text" id="huankuanzonge" readonly v-model="huanzonge"></label>
      <label for="meiqiyinghuan">每期应还金额 <input type="text" id="meiqiyinghuan" readonly v-model="meiqi"></label>
      <label for="huankuanshijian">还款时间 <input type="text" id="huankuanshijian" readonly v-model="huanshijian"></label>
      <label for="yewuyuan">业务员&nbsp;&nbsp;<select name="chanpin" id="yewuyuan">
        <option  v-for="(item,index,key) in yelist" :key="index"  :value=item.id>{{item.username}}</option>
      </select></label>
      <div id="tiBtn">
        <button @click="guanbi">取消</button>
        <button @click="queren1">确认</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tijiaodaikuan',
  data () {
    return {
      chanlist: '',
      yelist: '',
      chanSXF: '',
      chanQX: '',
      chanLX: '',
      huanzonge: '',
      meiqi: '',
      huanshijian: '',
      daiJE: ''
    }
  },
  methods: {
    guanbi: function () {
      this.chanlist = ''
      this.yelist = ''
      this.chanSXF = ''
      this.chanQX = ''
      this.chanLX = ''
      this.huanzonge = ''
      this.meiqi = ''
      this.huanshijian = ''
      this.daiJE = ''
      this.$emit('close', 'none')
    },
    queren1: function () {
      var abb = document.getElementById('daikuanchanpin').value
      var ywy = document.getElementById('yewuyuan').value
      var that = this
      var data = {
        uid: this.myidD,
        pr_id: abb,
        payable: this.meiqi,
        loan_amount: this.daiJE,
        fkze: this.huanzonge,
        c_uid: ywy
      }
      this.$axios.post('https://www.ispccn.com/Finance-User-addloan', this.$qs.stringify(data)).then(function (res) {
        that.guanbi()
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    zhanshi: function (e) {
      var a = e.target.value
      var chan = this.chanlist
      var daiJE = this.daiJE
      for (var i = 0; i < chan.length; i++) {
        if (chan[i].id === a) {
          this.chanSXF = chan[i].sxf
          this.chanQX = chan[i].detail
          this.chanLX = chan[i].interest
          this.meiqi = chan[i].terminally
          this.huanshijian = chan[i].hksj
          this.huanzonge = parseFloat(daiJE) + parseFloat(chan[i].sxf) + parseFloat(daiJE) * parseFloat(chan[i].interest / 100)
          this.meiqi = (this.huanzonge / parseInt(chan[i].detail)).toFixed(2)
        }
      }
    }
  },
  props: [
    'chanyedata', 'myidD', 'yewuyuandata'
  ],
  watch: {
    chanyedata (a, b) {
      this.chanlist = a
    },
    yewuyuandata (a, b) {
      this.yelist = b
    },
    daiJE (a, b) {
      var abb = document.getElementById('daikuanchanpin').value
      var chan = this.chanlist
      var daiJE = this.daiJE
      if (abb !== '0') {
        for (var i = 0; i < chan.length; i++) {
          if (chan[i].id === abb) {
            this.chanSXF = chan[i].sxf
            this.chanQX = chan[i].detail
            this.chanLX = chan[i].interest
            this.meiqi = chan[i].terminally
            this.huanshijian = chan[i].hksj
            this.huanzonge = parseFloat(daiJE) + parseFloat(chan[i].sxf) + parseFloat(daiJE) * parseFloat(chan[i].interest / 100)
            this.meiqi = (this.huanzonge / parseInt(chan[i].detail)).toFixed(2)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  #tihead{
    text-align: center;
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  #tiBtn{
    display: flex;
    justify-content: center;
  }
  label{
    font-size: 14px;
    display: block;
    width: 90%;
    margin: 10px 40px 10px 0;
    text-align: right;
  }
  label input,label select{
    width: 55%;
  }
  button{
    background-color: #0095c9;
    border: none;
    width: 130px;
    height: 35px;
    color: white;
    border-radius: 10px;
    font-size: 14px;
    margin: 10px;
    outline: none;
  }
</style>
