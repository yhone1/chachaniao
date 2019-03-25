<template>
    <div id="fangkuanxiangqing">
      <huankuanqueren1 id="huankuanque" class="littleW" @close="xinzengyuangong1" v-bind:fenlei1="xinzengYG" :myid="compData.id" :needhuan="needhuan1"></huankuanqueren1>
      <yanqi1 id="yanqi" class="littleW" @close="yanqi" v-bind:fenlei1="xinzengYG" :myid="compData.id" :periods1="qishu" :needhuan="needhuan1"></yanqi1>
      <div id="myAdd">
        <img src="../assets/home.png" alt="">
        <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > <u @click="closexiangqing">放款管理</u> > 放款详情</span>
        <button @click="closexiangqing" id="closeXQ">关闭</button>
      </div>
      <div id="topZone">
        <div id="texts">
          <span class="names">用户姓名：</span><span class="datas">{{compData.trname}}</span>
          <span class="names">身份证号：</span><span class="datas">{{compData.card_id}}</span>
          <span class="names">手机号：</span><span class="datas">{{compData.photo}}</span>
          <span class="names">籍贯：</span><span class="datas">{{compData.address}}</span>
          <span class="names">家庭住址：</span><span class="datas">{{compData.detailed}}</span>
          <span class="names">工作单位：</span><span class="datas">{{compData.company}}</span>
          <span class="names">工作地址：</span><span class="datas">{{compData.com_address}}</span>
          <span class="names">社保：</span><span class="datas"><u v-if="compData.social!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'"><span v-if="compData.fund!=null">更新凭证</span><span v-else>上传凭证</span>
              <input type="file" name="" @change="imgs($event,'social')">
            </a></span>
          <!--<img :src="dataUrl" alt=""/>-->
          <span class="names">公积金：</span><span class="datas"><u v-if="compData.fund!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'">
            <a v-if="compData.fund!=null">更新凭证</a><a v-else>上传凭证</a>
              <input type="file" name="" @change="imgs($event,'fund')">
          </a></span>
          <span class="names">房产：</span><span class="datas"><u v-if="compData.house!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'">
            <a v-if="compData.house!=null">更新凭证</a><a v-else>上传凭证</a>
              <input type="file" name="" @change="imgs($event,'house')">
          </a></span>
          <span class="names">车产：</span><span class="datas"><u v-if="compData.vehicle!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'">
            <a v-if="compData.vehicle!=null">更新凭证</a><a v-else>上传凭证</a>
              <input type="file" name="" @change="imgs($event,'vehicle')">
          </a></span>
          <span class="names">手持身份证照片：</span><span class="datas"><u v-if="compData.hold!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'">
            <a v-if="compData.hold!=null">更新凭证</a><a v-else>上传凭证</a>
              <input type="file" name="" @change="imgs($event,'hold')">
          </a></span>
          <span class="names">合同：</span><span class="datas"><u v-if="compData.contract!=null">有</u><u v-else>无</u>
          <a href="javascript:;" class="file" v-if="btnStyle==='编辑'">
            <a v-if="compData.contract!=null">更新凭证</a><a v-else>上传凭证</a>
              <input type="file" name="" @change="imgs($event,'contract')">
          </a></span>
        </div>
        <div id="righttable">
          <div id="righttable-top">
            <span class="rightnames">贷款金额</span><span class="rightdatas">{{compData.loan_amount}}元</span>
            <span class="rightnames">手续费率</span><span class="rightdatas">{{compData.lv}}%</span>
            <span class="rightnames">实际放款金额</span><span class="rightdatas">{{compData.credit}}元</span>
            <span class="rightnames">还款总额</span><span class="rightdatas">{{compData.fkze}}</span>
            <span class="rightnames">手续费</span><span class="rightdatas">{{compData.charge}}元</span>
            <span class="rightnames">每期应还金额</span><span class="rightdatas">{{compData.payable}}元</span>
            <span class="rightnames">贷款期限</span><span class="rightdatas">{{compData.vehicle}}</span>
            <span class="rightnames">还款时间</span><span class="rightdatas">{{compData.repayment}}</span>
          </div>
          <div class="myline" style="width: 100%"></div>
          <div id="righttable-bottom">
            <span class="rightnames">首次还款时间</span><span class="rightdatas">{{refund.start_time}}</span>
            <span class="rightnames">已还期数</span><span class="rightdatas">{{refund.number}}</span>
            <span class="rightnames">最近还款时间</span><span class="rightdatas">{{refund.end_time}}</span>
            <span class="rightnames">已还金额</span><span class="rightdatas">{{refund.total}}元</span>
            <span class="rightnames">逾期时间</span><span class="rightdatas">{{refund.yqsj}}</span>
            <span class="rightnames">滞纳金</span><span class="rightdatas">{{refund.yqznj}}元</span>
          </div>
          <button class="jieqingBtn" @click="jieqing" v-if="shenF==='1'">用户结清</button>
          <button class="jieqingBtn" @click="shenhe" v-if="shenF==='0'">审核通过</button>
          <button class="jieqingBtn" @click="shenhe" style="background-color: #b73100" v-if="shenF==='0'">审核失败</button>
          <button class="jieqingBtn" style="background-color: white" v-if="shenF==='2'">未通过审核</button>
        </div>
      </div>
      <div class="myline"></div>
      <div id="huankuanjihua">
        <h5 class="jihuaname">还款计划</h5>
        <div class="jihuatable">
          <table cellspacing="0">
            <tr>
              <th>还款期数</th>
              <th>应还金额（元）</th>
              <th>预计还款时间</th>
              <th>是否逾期</th>
              <th>滞纳金</th>
              <th>实际还款时间</th>
              <th>操作</th>
              <th>转账记录</th>
            </tr>
            <tr v-for="(item,index,key) in periods" :key="index">
              <td>{{item.periods}}</td>
              <td>{{item.money}}</td>
              <td>{{item.predict}}</td>
              <td>{{item.sfyq}}</td>
              <td>{{item.overdue}}</td>
              <td>{{item.practical}}</td>
              <td><span v-if="item.operation===2">已结清</span><span v-else><span v-if="btnStyle==='查看'">未结清</span><a href="javascript:;" class="quehuan" @click="xinzengyuangong1" v-if="btnStyle==='编辑'">确认还款</a> <span v-if="btnStyle==='编辑'">|</span><a href="javascript:;" class="quehuan" @click="yanqi" v-if="btnStyle==='编辑'">延期</a></span></td>
              <td><span v-if="item.voucher===''">未上传凭证</span><span v-else><img :src=item.voucher alt=""></span></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import huankuanqueren from './btn/huankuanqueren'
import yanqi from './btn/yanqi'
export default {
  name: 'fangkuanxiangqing',
  data () {
    return {
      dataUrl: '',
      needhuan1: '',
      xinzengYG: '',
      qishu: ''
    }
  },
  components: {
    huankuanqueren1: huankuanqueren,
    yanqi1: yanqi
  },
  methods: {
    shenhe: function (e) {
      var btn = e.target.innerText
      var that = this
      var st
      var id = this.compData.id
      if (btn === '审核通过') {
        st = 1
      } else {
        st = 2
      }
      var data = {
        la_id: id,
        status: st
      }
      this.$axios.post('https://www.ispccn.com/Finance-Index-audit',this.$qs.stringify(data)).then(function () {
        that.closexiangqing()
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    xinzengyuangong1: function (e) {
      var xiangqing = document.getElementById('huankuanque')
      if (xiangqing.style.display === 'block') {
        xiangqing.style.display = 'none'
      } else if (xiangqing.style.display === '' || xiangqing.style.display === 'none') {
        xiangqing.style.display = 'block'
        this.needhuan1 = e.target.parentElement.parentElement.parentElement.children[1].innerHTML
        this.shenSF = e.target.parentElement.parentElement.parentElement.children[10].innerHTML
      }
    },
    yanqi: function (e) {
      var xiangqing = document.getElementById('yanqi')
      if (xiangqing.style.display === 'block') {
        xiangqing.style.display = 'none'
      } else if (xiangqing.style.display === '' || xiangqing.style.display === 'none') {
        xiangqing.style.display = 'block'
        this.qishu = e.target.parentElement.parentElement.parentElement.children[0].innerHTML
        this.needhuan1 = e.target.parentElement.parentElement.parentElement.children[2].innerHTML
      }
    },
    closexiangqing: function () {
      this.$emit('close', 'none')
    },
    jieqing: function () {
      var that = this
      var data = this.$qs.stringify({la_id: this.compData.id})
      this.$axios.post('https://www.ispccn.com/Finance-Index-settle', data).then(function (res) {
        that.closexiangqing()
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    imgs: function (e, btnname) {
      var that = this
      var file = e.target.files[0]
      var imgSize = file.size / 1024
      var name = btnname
      if (imgSize > 500) {
        alert('请上传大小不要超过200KB的图片')
      } else {
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          // 下面逻辑处理
          var data
          if (name === 'social') {
            data = {
              social: dataURL,
              name: name,
              uid: that.compData.uid
            }
          } else if (name === 'fund') {
            data = {
              fund: dataURL,
              name: name,
              uid: that.compData.uid
            }
          } else if (name === 'house') {
            data = {
              house: dataURL,
              name: name,
              uid: that.compData.uid
            }
          } else if (name === 'vehicle') {
            data = {
              vehicle: dataURL,
              name: name,
              uid: that.compData.uid
            }
          } else if (name === 'hold') {
            data = {
              hold: dataURL,
              name: name,
              uid: that.compData.uid
            }
          } else if (name === 'contract') {
            data = {
              contract: dataURL,
              name: name,
              uid: that.compData.uid
            }
          }
          var d = that.$qs.stringify(data)
          that.$axios.post('https://www.ispccn.com/Finance-Index-upload', d).then(function () {
            that.dataUrl = dataURL
            alert('修改成功')
          }).catch(function (err) {
            that.fetchError(err)
          })
        }
      }
    }
  },
  props: [
    'compData', 'refund', 'periods', 'btnStyle', 'shenF'
  ]
}
</script>

<style scoped>
  #myAdd{
    height: 50px;
    border-left: 6px solid #333;
    display: flex;
    position: relative;
    align-items: center;
    border-bottom: 1px rgba(0, 0, 0, 0.16) solid;
  }
  #myAdd img{
    height: 30px;
    margin-left: 20px;
  }
  #myAdd span{
    font-size: 14px;
  }
  #myAdd>button{
    position: absolute;
    right: 20px;
    color: #333;
    border:none;
    height: 100%;
    font-size: 14px;
    background-color: white;
    outline: none;
  }
  #myAdd button{
    transition: .1s all;
    height: 22px;
  }
  #myAdd button:hover{
    transform: scale(0.9);
  }
  #topZone{
    display: flex;
  }
  #texts{
    display: flex;
    font-size: 14px;
    width: 40%;
    flex: 1;
    flex-wrap: wrap;
    margin: 20px;
    height: 400px;
  }
  u:hover{
    cursor: pointer;
  }
  .names{
    margin: 1% 3%;
    width: 33%;
    text-align: right;
  }
  .datas{
    display: flex;
    align-items: center;
    width: 60%;
    position: relative;
    justify-content: space-between;
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
  #righttable{
    width: 55%;
    margin: 20px 20px 20px 0;
    padding: 2%;
    background-color: #f2f2f2;
    font-size: 14px;
  }
  #righttable-top,#righttable-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  #righttable span{
    width: 21%;
    height: 35px;
    margin-bottom: 8px;
    line-height: 35px;
  }
  .rightnames{
    text-align: right;
  }
  .rightdatas{
    background-color: #e1e1e1;
    text-indent: 1em;
  }
  .myline{
    width: 96%;
    border-top: 1px #919191 solid;
    margin: 0 auto 8px;
  }
  .jieqingBtn{
    background-color: #0095C9;
    border: none;
    width: 160px;
    height: 35px;
    color: white;
    border-radius: 10px;
    float: right;
    font-size: 14px;
    margin-right: 15px;
  }
  #huankuanjihua{
    width: 96%;
    margin: 0 auto;
    height: 30%;
  }
  .jihuaname{
    font-size: 26px;
  }
  .jihuatable{
    font-size: 14px;
    background-color: #eeeeee;
    overflow: auto;
    height: 90%;
  }
  .jihuatable table {
    width: 95%;
    border:1px #aaa solid;
    background-color: white;
    margin: 20px auto;
    font-weight: normal;
    text-align: center;
  }
  .jihuatable table td,.jihuatable table th{
    border-right: 1px #aaa solid;
    border-bottom: 1px #aaa solid;
  }
  .quehuan{
    color: #0099FF;
    text-decoration: none;
  }
  .littleW{
    position: fixed;
    background-color: white;
    width: 320px;
    height: 480px;
    top:49%;
    left: 57%;
    margin-top: -240px;
    margin-left: -160px;
    z-index: 999;
    display: none;
    border:1px #333 solid;
    border-radius: 5px;
    overflow: hidden;
  }
</style>
