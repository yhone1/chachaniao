<template>
    <div id="huankuanqueren">
      <div id="guanbilan">
        <button @click="closexiangqing"><img src="../../assets/close.png" alt="" id="closeXQ"></button>
      </div>
      <div id="xinxitop">
        <h6>确认还款</h6>
        <form action="">
          <p id="dangqiyinhuan"><span style="display: inline-block;width: 50%">当期应还金额：</span><span>{{needhuan}}</span></p>
          <label for="shijihuankuan"><span>实际还款金额：</span><input type="number" id="shijihuankuan"></label>
          <label for=""><span>上传凭证</span><a href="javascript:;" class="file"><span style="width: auto">点击上传</span>
            <input type="file" name="" @change="chuantu($event,'contract')">
          </a></label>
          <p id="tips">本次还款金额 >  当期应还金额，请选择提前还款方式</p>
          <label><span>还款方式</span>
            <input name="huankuanfangshi" type="radio" checked="" value="1"/>缩短还款期限<br>
            <input name="huankuanfangshi" type="radio" checked="" style="margin-left: 52%" value="2"/>减少月还款额
            <input name="huankuanfangshi" type="radio" checked="checked" style="margin-left: 52%" value="3"/>正常还款</label>
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
  name: 'huankuanqueren',
  data () {
    return {
      dataUrl1: ''
    }
  },
  methods: {
    closexiangqing: function () {
      this.$emit('close', 'none')
    },
    chuantu: function (e) {
      var that = this
      var file = e.target.files[0]
      var imgSize = file.size / 1024
      if (imgSize > 500) {
        alert('请上传大小不要超过200KB的图片')
      } else {
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          that.dataUrl1 = dataURL
        }
      }
    },
    queren: function () {
      var that = this
      var id = this.myid
      var shiji = document.getElementById('shijihuankuan').value
      var types = parseFloat(shiji) > parseFloat(this.needhuan) ? 2 : 1
      var repay_status
      var radio = document.getElementsByName('huankuanfangshi')
      for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked === true) {
          repay_status = radio[i].value
        }
      }
      var voucher = this.dataUrl1
      // 下面逻辑处理
      var data = {
        la_id: id,
        actual_payment: shiji,
        types: types,
        repay_status: repay_status,
        voucher: voucher
      }
      var d = this.$qs.stringify(data)
      if (parseFloat(shiji) < parseFloat(this.needhuan)) {
        alert('请至少保证还款多余应还金额')
      } else if (voucher === '') {
        alert('请上传凭证')
      } else {
        that.$axios.post('https://www.ispccn.com/Finance-Index-refund', d).then(function () {
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
    'needhuan'
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
    width: 50%;
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
  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 1px 6px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 11px;
    font-size: 11px;
  }
  .file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
