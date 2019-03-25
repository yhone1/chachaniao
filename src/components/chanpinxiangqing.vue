<template>
    <div id="chanpinxiangqingapp">
      <div id="guanbilan">
        <button @click="closexiangqing"><img src="../assets/close.png" alt="" id="closeXQ"></button>
      </div>
      <div id="xinxitop">
        <h6>{{xinbian1}}</h6>
        <form action="">
          <label for="chanpinname"><span><span class="red">*</span>产品名称</span><input type="text" id="chanpinname" v-model="chanpinlist.name"></label>
          <label for="chanpinlilv"><span><span class="red">*</span>利率</span><input type="number" id="chanpinlilv" v-model="chanpinlist.interest" placeholder="请输入小写数字，不加%"></label>
          <label for="caozuoSXF" v-if="xinbian1==='新增产品'"><span><span class="red">*</span>操作手续费</span><input type="number" id="caozuoSXF" v-model="chanpinlist.sxf" placeholder="请输入小写数字，不加%"></label>
          <label for="chanpinzhouqi"><span><span class="red">*</span>贷款期限</span>
            <select name="" id="chanpinzhouqi" v-model="chanpinlist.detail">
              <option value="12个月">12个月</option>
              <option value="6个月">6个月</option>
              <option value="9个月">9个月</option>
              <option value="3个月">3个月</option>
              <option value="30天">30天</option>
              <option value="7天">7天</option>
              <option value="1天">1天</option>
            </select>
          </label>
          <label for="huankuanriqi" v-if="xinbian1==='新增产品'"><span>还款日期</span><input type="number" id="huankuanriqi" v-model="chanpinlist.hkrz" placeholder="每月几号还款"></label>
          <label for="daikuanqishu" v-if="xinbian1==='新增产品'"><span><span class="red">*</span>贷款期数</span><input type="number" id="daikuanqishu" v-model="chanpinlist.dkqx" placeholder="该产品贷多少期"></label>
          <label for="daikuanjine"><span><span class="red">*</span>贷款金额</span><input type="number" id="daikuanjine" v-model="chanpinlist.dkje"></label>
          <label for="meiqihuankuan" v-if="xinbian1==='编辑产品'"><span>每期应还</span><input type="text" id="meiqihuankuan" v-model="chanpinlist.terminally"></label>
          <label for="chanpinbeizhu"><span>产品备注</span><input type="text" id="chanpinbeizhu" v-model="chanpinlist.remark"></label>
          <button id="xinbianBtn" @click="fasongData($event)">
            {{xinbian1}}
          </button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'chanpinxiangqing',
  data () {
    return {
      chanpinlist: {
        'id': '',
        'name': '',
        'sxf': '',
        'dkqx': '',
        'hkze': '',
        'hksj': '',
        'interest': '',
        'addtime': '',
        'creatime': '',
        'hkrz': '',
        'types': '',
        'remark': '',
        'dkje': '',
        'terminally': '',
        'detail': ''
      }
    }
  },
  methods: {
    closexiangqing: function () {
      this.$emit('close', 'none')
    },
    fasongData: function (e) {
      var fasongStyle = e.target.innerText
      var that = this
      var det = this.chanpinlist.detail
      var detType = ''
      if (det === '1天' || det === '7天') {
        detType = 1
      } else if (det === '30天' || det === '3个月' || det === '6个月' || det === '9个月') {
        detType = 2
      } else {
        detType = 3
      }
      var data = {
        id: this.chanpinlist.id,
        name: this.chanpinlist.name,
        interest: this.chanpinlist.interest,
        sxf: this.chanpinlist.sxf,
        dkqx: this.chanpinlist.dkqx,
        hkrz: this.chanpinlist.hkrz,
        detail: this.chanpinlist.detail,
        types: detType,
        remark: this.chanpinlist.remark,
        dkje: this.chanpinlist.dkje
      }
      var dataNew = {
        name: this.chanpinlist.name,
        interest: this.chanpinlist.interest,
        sxf: this.chanpinlist.sxf,
        dkqx: this.chanpinlist.dkqx,
        hkrz: this.chanpinlist.hkrz,
        detail: this.chanpinlist.detail,
        types: detType,
        remark: this.chanpinlist.remark,
        dkje: this.chanpinlist.dkje
      }
      if (fasongStyle === '编辑产品') {
        if (data.name !== '' && data.interest !== '' && data.dkje !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Product-update', that.$qs.stringify(data)).then(function (res) {
            that.closexiangqing()
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          alert('请输入正确的数据')
        }
      } else {
        if (dataNew.name !== '' && dataNew.interest !== '' && dataNew.dkje !== '' && dataNew.sxf !== '' && dataNew.dkqx !== '' && dataNew.detail !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Product-add', that.$qs.stringify(dataNew)).then(function (res) {
            that.closexiangqing()
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          alert('请输入正确的数据')
        }
      }
    }
  },
  props: [
    'xinbian1',
    'mylist'
  ],
  watch: {
    mylist (a, b) {
      this.chanpinlist = this.mylist
    }
  }
}
</script>

<style scoped>
#guanbilan{
  border-bottom: 1px #333 solid;
  height: 30px;
  background-image: url("../assets/back.jpg");
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
    background: linear-gradient(to bottom right,#fff,#eee,#ddd);
    height: 100%;
    overflow: hidden;
  }
  h6{
    margin: 10px 25px;
    font-size: 24px;
  }
  form{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  label{
    font-size: 14px;
    width: 40%;
    margin: 30px 4%;
  }
  label>span{
    display: inline-block;
    width: 31%;
  }
#chanpinname,#chanpinzhouqi,#chanpinbeizhu,#daikuanjine,#meiqihuankuan,#caozuoSXF,#huankuanriqi,#daikuanqishu,#chanpinlilv{
  width: 67%;
}
  form button{
    background-color: #0095C9;
    border: none;
    width: 180px;
    height: 35px;
    color: white;
    border-radius: 10px;
    float: right;
    font-size: 14px;
    margin: 40px 0 0 65%;
    outline: none;
    transition: .1s all;
  }
form button:hover{
  transform: translate(1px,1px);
}
  .red{
    color: #a20000;
  }
</style>
