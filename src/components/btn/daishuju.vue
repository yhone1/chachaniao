<template>
    <div id="dashujuApp">
      <el-button type="text" @click="dialogVisible = true" style="display:block;margin: 20px auto"  v-if="haveDSJ === 2 || haveDSJ === ''">更新用户大数据</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
        :before-close="handleClose">
        <span>仅首次获取该用户大数据记录需要支付5元，请确认（<span style="color: #ad0000">获取后请刷新页面</span>，再次选择该用户将自动展示大数据）</span>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
            <el-button @click="dialogVisible = false" style="width: 80px">取 消</el-button>
             <el-button type="primary" @click="shujuqueren" style="width: 80px">确 定</el-button>
        </span>
      </el-dialog>
      <div id="wrong" :visible.sync="wrongMsgTF" style="font-size: 24px;color: #ac0000;text-align: center">{{wrongMsg}}</div>
      <div id="dashujuHead" v-if="haveDSJ === 1">
        <img src="../../assets/ping.png" alt="">
        <p>信用评分： {{myDSJData.list.fenshu}}分</p>
      </div>
      <div id="jiekuantongji" v-if="haveDSJ === 1">
        <div class="caidan">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;借款统计</div>
        <div>
          <table>
            <tr>
              <th>申请平台数</th>
              <th>7天内</th>
              <th>1个月内</th>
              <th>3个月内</th>
            </tr>
            <!--v-for="(item,index,key) in arrName" :key="index"-->
            <tr v-for="(item,index,key) in jiekuanTable" :key="index">
              <td v-for="(val,index,key) in item" :key="index">{{val}}</td>
            </tr>
            <tr>
              <td>第三方服务平台</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div id="buliangxingwei" v-if="haveDSJ === 1">
        <div class="caidan">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;不良行为</div>
        <p>身份证是否命中法院失信名单: <span v-if="myDSJData.sfz===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfz===1" v-for="(item,index,key) in myDSJData.sfzarr" :key="index">
          <b>时间：{{item.case_date}}</b>——类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>身份证是否命中信贷逾期名单: <span v-if="myDSJData.xdyq===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.xdyq===1" v-for="(item,index,key) in myDSJData.xdyqarr" :key="index">
          <b>时间：{{item.overdue_time}}</b>——<b>金额：{{item.overdue_amount_range}}元</b><br>
        </p>
        <p>身份证是否命中法院执行名单: <span v-if="myDSJData.sfzxmmhmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfzxmmhmd===1" v-for="(item,index,key) in myDSJData.zxmd" :key="index">
          <b>时间：{{item.case_date}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>身份证是否命中犯罪通缉名单: <span v-if="myDSJData.tjmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.tjmd===1" v-for="(item,index,key) in myDSJData.tjmd" :key="index">
          <b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>身份证_姓名是否命中法院执行模糊名单: <span v-if="myDSJData.sfzxmmhmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfzxmmhmd===1" v-for="(item,index,key) in myDSJData.sfzxmmhmd" :key="index">
          <b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>身份证_姓名命中法院结案模糊名单: <span v-if="myDSJData.sfjammhmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfjammhmd===1" v-for="(item,index,key) in myDSJData.sfjammhmd" :key="index">
          <b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>身份证是否命中欠税公司法人代表名单: <span v-if="myDSJData.sfzqsgs===1" class="shide">是</span><span v-else>否</span></p>
      </div>
      <div id="fengxianxingwei" v-if="haveDSJ === 1">
        <div class="caidan">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;风险行为</div>
        <p>手机号网贷逾期风险检测: <span v-if="myDSJData.wdyq===1" class="shide">是</span><span v-else>否</span></p>
        <p>身份证是否命中网贷欺诈黑名单: <span v-if="myDSJData.sfzxdyq===1" class="shide">是</span><span v-else>否</span></p>
        <p>身份证命中法院结案名单: <span v-if="myDSJData.sfzjamd===1" class="shide">是</span><span v-else>否</span></p>
        <p>身份证是否存在信贷逾期历史记录:<span v-if="myDSJData.xdyq===1" class="shide">是</span><span v-else>否</span></p>
        <p>身份证是否命中高风险关注名单: <span v-if="myDSJData.sfzgfx===1||myDSJData.sfzhzfxgzmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfzgfx===1" v-for="(item,index,key) in myDSJData.sjmzfxdzmd" :key="index">
          <b>等级：{{item.risk_level}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p class="red" v-if="myDSJData.sfzhzfxgzmd===1" v-for="(item,index,key) in myDSJData.sjmzfxdzmd" :key="index">
          <b>等级：{{item.risk_level}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>手机是否命中低风险关注名单: <span v-if="myDSJData.sjmzfxdzmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sjmzfxdzmd===1" v-for="(item,index,key) in myDSJData.sjmzfxdzmd" :key="index">
          <b>等级：{{item.risk_level}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>手机号是否命中高风险关注名单: <span v-if="myDSJData.cxsjhsf===1||myDSJData.sjmzfxgzmd===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.cxsjhsf===1" v-for="(item,index,key) in myDSJData.cxsjhsf" :key="index">
          <b>等级：{{item.risk_level}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p class="red" v-if="myDSJData.sjmzfxgzmd===1" v-for="(item,index,key) in myDSJData.sjmzfxgzmd" :key="index">
          <b>等级：{{item.risk_level}}</b>——<b>类型：{{item.fraud_type_display_name}}</b><br>
        </p>
        <p>手机号是否命中虚假号码库: <span v-if="myDSJData.xjhmk===1" class="shide">是</span><span v-else>否</span></p>
        <p>身份证是否命中车辆租赁违约名单: <span v-if="myDSJData.sfzcl===1" class="shide">是</span><span v-else>否</span></p>
      </div>
      <div id="yuqijilu" v-if="haveDSJ === 1">
        <div class="caidan">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;逾期记录</div>
        <p>身份证命中信贷逾期还款名单: <span v-if="myDSJData.sfz_overdue_details_count===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sfz_overdue_details_count===1" v-for="(item,index,key) in myDSJData.sfz_overdue_details" :key="index">
          <b>逾期日期：{{item.overdue_time}}</b>——<b>逾期金额：{{item.overdue_amount_range}}元</b><br>
        </p>
        <p>手机号命中信贷逾期还款名单: <span v-if="myDSJData.sjh_overdue_details_count===1" class="shide">是</span><span v-else>否</span></p>
        <p class="red" v-if="myDSJData.sjh_overdue_details_count===1" v-for="(item,index,key) in myDSJData.sjh_overdue_details" :key="index">
          <b>逾期日期：{{item.overdue_time}}</b>——<b>逾期金额：{{item.overdue_amount_range}}元</b><br>
        </p>
      </div>
      <div id="jiekuanjilu" v-if="haveDSJ === 1">
        <div class="caidan">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;借款记录</div>
        <p>贷款放款总订单数: <span>{{myDSJData.zfarr.data.ptb0001}}</span></p>
        <p>贷款已结清订单数: <span>{{myDSJData.zfarr.data.ptb0002}}</span></p>
        <p>历史贷款机构成功扣款次数: <span>{{myDSJData.zfarr.data.ptb0010}}</span></p>
        <p>历史贷款机构失败扣款次数: <span>{{myDSJData.zfarr.data.ptb0011}}</span></p>
        <p>近1个月贷款机构成功扣款次数: <span>{{myDSJData.zfarr.data.ptb0012}}</span></p>
        <p>近1个月贷款机构失败扣款次数: <span>{{myDSJData.zfarr.data.ptb0013}}</span></p>
        <p>信用贷款时长: <span>{{myDSJData.zfarr.data.ptb0014}}天</span></p>
        <p>最近一次贷款放款时间（年月日）: <span>{{myDSJData.zfarr.data.ptb0015}}</span></p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'daishuju',
  data () {
    return {
      dialogVisible: false,
      haveDSJ: '',
      jiekuanTable: '',
      buliangarr: '',
      fengxianarr: '',
      yuqiarr: '',
      jiekuanarr: '',
      myDSJData: '',
      userID: '',
      wrongMsg: '',
      wrongMsgTF: false,
      reportID: ''
    }
  },
  props: [
    'myidD', 'userName', 'cardID', 'phone', 'report_id'
  ],
  methods: {
    shujuqueren () {
      this.dialogVisible = false
      var that = this
      var data = {
        uid: this.myidD,
        name: this.userName,
        card_id: this.cardID,
        phone: this.phone,
        report_id: this.reportID
      }
      this.$axios.post('https://www.ispccn.com/Finance-Bigdata-index', this.$qs.stringify({data})).then(function (res) {
        if (res.data.status !== 1) {
          that.wrongMsg = res.data.msg
          that.wrongMsgTF = true
        }
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  watch: {
    myidD (a, b) {
      this.userID = a
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-User-bigdata', this.$qs.stringify({uid: a})).then(function (res) {
        if (res.data.bigdate === 1) {
          that.haveDSJ = 1
          that.myDSJData = res.data
          that.jiekuanTable = res.data.terrace
          that.reportID = res.data.list.id
        } else {
          that.haveDSJ = 2
          that.wrongMsg = ''
          that.wrongMsgTF = false
        }
      }).catch(function (err) {
        that.fetchError(err)
      })
    }
  }
}
</script>

<style scoped>
  p,span{
    font-size: 14px;
  }
#dashujuHead{
  text-align: center;
  margin-top: 20px;
}
  #dashujuHead p{
    color: #1987fb;
    font-size: 24px;
  }
  .caidan{
    background-color: #80a0d0;
    width: 280px;
    height: 30px;
    border-radius: 0 15px 15px 0;
    font-size: 16px;
    color: white;
    font-weight: bold;
    line-height: 30px;
    margin: 30px 0;
  }
  table{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    border: 1px #ccc solid
  }
  td,th{
    font-size: 14px;
    border-right:  1px #ccc solid;
    border-bottom:  1px #ccc solid;
    height: 30px;
  }
  #buliangxingwei p,#fengxianxingwei p,#yuqijilu p,#jiekuanjilu p{
    width: 90%;
    margin: 10px auto;
    border-bottom: #ccc 1px solid;
  }
  #buliangxingwei span,#fengxianxingwei span,#yuqijilu span,#jiekuanjilu span{
    float: right;
  }
  .shide{
    color: #aa0000;
  }
  .red{
    color: #aa0000;
    font-size: 12px;
    line-height: 12px;
    border-bottom:none!important;
    text-align: right;
  }
  button{
    background-color: #0095c9;
    border: none;
    width: 180px;
    height: 35px;
    color: white;
    border-radius: 10px;
    font-size: 14px;
    margin: 0 20px;
    outline: none;
  }
</style>
