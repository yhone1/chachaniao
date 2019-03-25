<template>
  <div id="xinzengyuangongapp">
    <div id="guanbilan">
      <button @click="closexiangqing"><img src="../assets/close.png" alt="" id="closeXQ"></button>
    </div>
    <div id="xinxitop">
      <h6>{{fenlei1}}</h6>
      <form action="">
        <label for="yuangongName"><span><span class="red">*</span>员工姓名</span><input type="text" id="yuangongName" v-model="yuangonglist.username"></label>
        <label for="yuangongID"><span><span class="red">*</span>身份证号</span><input type="text" id="yuangongID" v-model="yuangonglist.car_id"></label>
        <label for="yuangongPhone"><span><span class="red">*</span>手机号</span><input type="number" id="yuangongPhone" v-model="yuangonglist.photo"></label>
        <label for="ruzhiTime"><span>入职时间</span><input type="text" id="ruzhiTime" v-model="yuangonglist.addtime" placeholder="例：2016-02-13"></label>
        <label for="jiatingAdd"><span>家庭住址</span><input type="text" id="jiatingAdd" v-model="yuangonglist.address"></label>
        <label for="zaizhizhuangtai" v-if="fenlei1 === '编辑员工'"><span>在职状态</span><input type="text" id="zaizhizhuangtai" v-model="yuangonglist.status" placeholder="1：在职状态，2：离职状态"></label>
        <button @click="zenggaiyuangong" v-if="fenlei1 !== '查看员工'">
          {{fenlei1}}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xinzengyuangong',
  data () {
    return {
      yuangonglist: {
        'id': '',
        'username': '',
        'password': '',
        'power': '',
        'addtime': '',
        'lasttime': '',
        'trname': '',
        'car_id': '',
        'dimission': '',
        'address': '',
        'photo': '',
        'status': ''
      }
    }
  },
  methods: {
    closexiangqing: function () {
      this.yuangonglist = {
        'id': '',
        'username': '',
        'password': '',
        'power': '',
        'addtime': '',
        'lasttime': '',
        'trname': '',
        'car_id': '',
        'dimission': '',
        'address': '',
        'photo': '',
        'status': ''
      }
      this.$emit('close', 'none')
    },
    zenggaiyuangong: function (e) {
      var btn = e.target.innerText
      var that = this
      var data = {
        id: this.yuangonglist.id,
        username: this.yuangonglist.username,
        car_id: this.yuangonglist.car_id,
        photo: this.yuangonglist.photo,
        address: this.yuangonglist.address,
        status: this.yuangonglist.status,
        addtime: this.yuangonglist.addtime
      }
      var dataNew = {
        username: this.yuangonglist.username,
        car_id: this.yuangonglist.car_id,
        photo: this.yuangonglist.photo,
        address: this.yuangonglist.address,
        addtime: this.yuangonglist.addtime
      }
      if (btn === '编辑员工') {
        if (data.username !== '' && data.car_id !== '' && data.photo !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Employee-update', this.$qs.stringify(data)).then(function (data) {
            that.closexiangqing()
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          alert('请输入正确的内容')
        }
      } else {
        if (dataNew.username !== '' && dataNew.car_id !== '' && dataNew.photo !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Employee-add', this.$qs.stringify(dataNew)).then(function (data) {
            that.closexiangqing()
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          alert('请输入正确的内容')
        }
      }
    }
  },
  props: [
    'fenlei1',
    'mylist1'
  ],
  watch: {
    mylist1 (a, b) {
      this.yuangonglist = a
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
    width: 25%;
  }
  #yuangongName,#yuangongID,#yuangongPhone,#ruzhiTime,#jiatingAdd,#zaizhizhuangtai{
    width: 70%;
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
    color: #a00000;
  }
</style>
