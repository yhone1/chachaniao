<template>
  <div id="xinzengapp">
    <div id="myAdd">
      <!--<img src="../assets/home.png" alt="">-->
      <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > <u @click="closexinzeng" style="cursor: pointer;">客户管理</u> > {{myBtn}}</span>
    </div>
    <div id="xinzenghead">
      <span @click="choiceForm" class="choiceF" id="ger">个人信息</span>
      <span @click="choiceForm" class="choiceF">联系人信息</span>
      <span @click="choiceForm" class="choiceF">大数据得分</span>
      <span @click="choiceForm" class="choiceF">借条得分</span>
    </div>
    <div id="gerenxinxi">
      <tijiaodaikuan1 id="tijiaoD"  @close="tidai" :chanyedata="chanpinData" :myidD="myList1.uid" :yewuyuandata="yewuyuanData"></tijiaodaikuan1>
      <form action="">
        <div>
          <label><span class="mustWrite">*</span>客户姓名<input type="text" id="userName" value="" v-model="myList1.trname"></label>
          <label><span class="mustWrite">*</span>性别<input type="text" id="userSex" v-model="myList1.sex" placeholder="男/女"></label>
          <label><span class="mustWrite">*</span>年龄<input type="number" id="userAge" v-model="myList1.age"></label>
        </div>
        <div>
          <label><span class="mustWrite">*</span>婚姻状况<input type="text" id="userMarry" v-model="myList1.marriage" placeholder="已婚/离异/丧偶/单身"></label>
          <label><span class="mustWrite">*</span>身份证号<input type="text" id="userID" v-model="myList1.card_id"></label>
          <label><span class="mustWrite">*</span>手机号码<input type="number" id="userFhone" v-model="myList1.photo"></label>
        </div>
        <div>
          <label style="width: 90%;"><span class="mustWrite">*</span>
            户籍所在地
            <input type="text" placeholder="具体地址" style="width: 28%"  v-model="myList1.address"/>
            <input type="text" placeholder="区/县" style="width: 12%" v-model="myList1.district"/>
            <input type="text" placeholder="市" style="width: 12%" v-model="myList1.city"/>
            <input type="text" placeholder="省" style="width: 12%" v-model="myList1.province"/>
          </label>
          <label><span class="mustWrite">*</span>现居住地址<input type="text" id="userAdd" v-model="myList1.present"></label>
          <label>现居住电话<input type="text" id="userAddPhone" v-model="myList1.mobile"></label>
          <label>子女情况<input type="text" id="userChild" v-model="myList1.children"></label>
        </div>
        <div>
          <label>房产状况<input type="text" id="userHouse" v-model="myList1.house"></label>
          <label><span class="mustWrite">*</span>月支付额<input type="text" id="userHousePay" v-model="myList1.monthly"></label>
          <label><span class="mustWrite">*</span>户主名字<input type="text" id="userHouseName" v-model="myList1.household"></label>
        </div>
        <div>
          <label>教育程度<input type="text" id="userEdu" v-model="myList1.education"></label>
          <label>毕业学校<input type="text" id="userSchool" v-model="myList1.graduate"></label>
          <label>是否实名<input type="text" id="userTrueName" v-model="myList1.autonym"></label>
        </div>
        <div>
          <label>直系亲属<input type="text" id="userqinshu" v-model="myList1.direct" placeholder="请填入电话名称"></label>
          <label>同事朋友1<input type="text" id="userpengyou" v-model="myList1.colleague1" placeholder="请填入电话名称"></label>
          <label>同事朋友2<input type="text" id="usertongshi" v-model="myList1.colleague2" placeholder="请填入电话名称"></label>
        </div>
        <div>
          <label><span class="mustWrite">*</span>收款账户<input type="number" id="userCollection" v-model="myList1.gathering"></label>
          <label><span class="mustWrite">*</span>开户行<input type="text" id="userBank" v-model="myList1.opening"></label>
          <label><span class="mustWrite">*</span>推荐人<input type="text" id="userFriend" v-model="myList1.referrer" placeholder="推荐人/业务员"></label>
        </div>
        <div>
          <label>公司名称<input type="text" id="gongsi" v-model="myList1.company" placeholder=""></label>
          <label>公司座机电话<input type="text" id="gongsidianhua" v-model="myList1.telephon" placeholder=""></label>
          <label>职务<input type="text" id="zhiwu" v-model="myList1.duty" placeholder=""></label>
          <label>工作时间<input type="text" id="gongzuoshijian" v-model="myList1.work_time" placeholder=""></label>
        </div>
        <div>
          <label id="textlabel"><span>备注：</span><textarea></textarea></label>
        </div>
        <button id="xiugaiBtn" v-if="myBtn==='编辑'" @click="xiugaiZL">修改资料</button>
        <button id="xinzengBtn" v-if="myBtn==='新增用户'" @click="xiugaiZL">新增用户</button>
        <button v-if="myBtn==='编辑'" @click="tidai">提交贷款申请</button>
        <!--<button v-if="myBtn==='新增'">提交贷款申请</button>-->
      </form>
    </div>
    <div id="lianxiren" style="width: 95%;margin: 0 auto">
      <el-button type="text" @click="dialogVisible = true" style="display:block;margin: 20px auto" v-if="lianxistatus===2">更新用户通话记录</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body='false'
        :before-close="handleClose">
        <span>仅首次获取该用户通话记录需要支付5元，请确认（<span style="color: #ad0000">获取后请刷新页面</span>，再次选择该用户将自动展示通话记录）</span>
        <span slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
            <el-button @click="dialogVisible = false" style="width: 80px">取 消</el-button>
             <el-button type="primary" @click="tonghuaqueren" style="width: 80px">确 定</el-button>
        </span>
      </el-dialog>
      <div id="huoquzhong" v-if="lianxistatus===3"><p style="text-align: center;margin-top: 50px">正在疯狂获取数据中，请稍后再来...</p></div>
      <div id="tonghuajilu">
        <div v-if="lianxistatus===2">
          <iframe :src=srcif frameborder="0" id="ifbox"></iframe>
        </div>
        <div id="tonghuatop"  v-if="lianxistatus === 1"><h6>通话记录</h6><button id="daochu" v-if="1===0">导出</button></div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="440" :default-sort="{prop:'value4',order:'descending'}" stripe  v-if="lianxistatus === 1">
          <el-table-column label="序号" width="60" align="left" type="index"></el-table-column>
          <el-table-column label="电话" align="center" prop="photo"></el-table-column>
          <el-table-column label="通话类型" align="center" prop="types"></el-table-column>
          <el-table-column label="通话时长" align="center" prop="times"></el-table-column>
          <el-table-column label="通话时间" align="center" prop="addtime"></el-table-column>
          <el-table-column label="分类" align="center" prop="status"></el-table-column>
        </el-table>
      </div>
      <div class="t-right"  v-if="lianxistatus === 1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 8, 10, 20, 30, 40]"
          :page-size="8"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <div id="dashuju998">
      <dsj1 id="dashu" :myidD="myList1.uid" :userName="myList1.trname" :cardID="myList1.card_id" :phone="myList1.photo"></dsj1>
    </div>
    <div id="jietiao"></div>
    <jietiao1 id="jiet" :myidD="myList1.uid" :userName="myList1.trname" :cardID="myList1.card_id" :phone="myList1.photo"></jietiao1>
  </div>
</template>

<script>
import dashuju from './btn/daishuju'
import jietiao from './btn/jietiao'
import tijiaodaikuan from './btn/tijiaodaikuan'
export default {
  name: 'xinzengyonghu',
  data () {
    return {
      lianxistatus: '',
      dialogVisible: false,
      myList1: {
        'id': null,
        'uid': null,
        'sex': null,
        'age': null,
        'marriage': null,
        'children': null,
        'house': null,
        'monthly': null,
        'household': null,
        'present': null,
        'photo': null,
        'education': null,
        'graduate': null,
        'autonym': null,
        'gathering': null,
        'opening': null,
        'referrer': null,
        'remark': null,
        'province': null,
        'city': null,
        'district': null,
        'address': null,
        'trname': null,
        'card_id': null,
        'mobile': null,
        'company': null,
        'telephon': null,
        'duty': null,
        'work_time': null,
        'direct': null,
        'colleague1': null,
        'colleague2': null
      },
      currentPage: 1,
      pagesize: 8,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      chanpinData: '',
      yewuyuanData: '',
      srcif: ''
    }
  },
  methods: {
    tonghuaqueren () {
      this.dialogVisible = false
      this.srcif = 'http://operator.lvronghui.com/?secret=0e9bbd03d144c1060b231b8a0b57ebb0&redirect_url=http://www.ispccn.com/Finance-Bigdata-operator-report_id-'
      // this.
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closexinzeng: function () {
      document.getElementById('ger').click()
      this.srcif = ''
      this.$emit('close', 'none')
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    tidai: function () {
      var that = this
      var ti = document.getElementById('tijiaoD')
      if (ti.style.display === 'none' || ti.style.display === '') {
        ti.style.display = 'block'
        this.$axios.post('https://www.ispccn.com/Finance-User-businessProduct').then(function (res) {
          that.chanpinData = res.data.product
          that.yewuyuanData = res.data.salesman
        }).catch(function (err) {
          that.fetchError(err)
        })
      } else {
        ti.style.display = 'none'
      }
    },
    choiceForm: function (e, a) {
      var thisChoice = e.target
      var cf = document.getElementsByClassName('choiceF')
      var gerenxinxi = document.getElementById('gerenxinxi')
      var lianxiren = document.getElementById('lianxiren')
      var dashuju = document.getElementById('dashuju998')
      var jietiao = document.getElementById('jietiao')
      var dashu = document.getElementById('dashu')
      var jiet = document.getElementById('jiet')
      for (var i = 0; i < cf.length; i++) {
        cf[i].style.border = 'none'
      }
      thisChoice.style.border = '1px #333 solid'
      thisChoice.style.borderBottomColor = 'white'
      if (thisChoice.innerText === '个人信息') {
        gerenxinxi.style.display = 'block'
        lianxiren.style.display = 'none'
        dashuju.style.display = 'none'
        jietiao.style.display = 'none'
        dashu.style.display = 'none'
        jiet.style.display = 'none'
      } else if (thisChoice.innerText === '联系人信息') {
        gerenxinxi.style.display = 'none'
        lianxiren.style.display = 'block'
        dashuju.style.display = 'none'
        jietiao.style.display = 'none'
        dashu.style.display = 'none'
        jiet.style.display = 'none'
      } else if (thisChoice.innerText === '大数据得分') {
        gerenxinxi.style.display = 'none'
        lianxiren.style.display = 'none'
        dashuju.style.display = 'block'
        dashu.style.display = 'block'
        jietiao.style.display = 'none'
        jiet.style.display = 'none'
      } else if (thisChoice.innerText === '借条得分') {
        gerenxinxi.style.display = 'none'
        lianxiren.style.display = 'none'
        dashuju.style.display = 'none'
        jietiao.style.display = 'block'
        jiet.style.display = 'block'
        dashu.style.display = 'none'
      }
    },
    xiugaiZL: function (e) {
      var btn = e.target.innerText
      var sex
      var marry = ''
      if (this.myList1.marriage === '已婚') {
        marry = 1
      } else if (this.myList1.marriage === '离婚') {
        marry = 2
      } else if (this.myList1.marriage === '丧偶') {
        marry = 3
      } else if (this.myList1.marriage === '单身') {
        marry = 4
      }
      if (this.myList1.sex === '女') {
        sex = 2
      } else if (this.myList1.sex === '男') {
        sex = 1
      }
      var url
      var that = this
      var data = {
        'id': this.myList1.id,
        'uid': this.myList1.uid,
        'sex': sex,
        'age': this.myList1.age,
        'marriage': marry,
        'children': this.myList1.children,
        'house': this.myList1.house,
        'monthly': this.myList1.monthly,
        'household': this.myList1.household,
        'present': this.myList1.present,
        'photo': this.myList1.photo,
        'education': this.myList1.education,
        'graduate': this.myList1.graduate,
        'autonym': this.myList1.autonym,
        'gathering': this.myList1.gathering,
        'opening': this.myList1.opening,
        'referrer': this.myList1.referrer,
        'remark': this.myList1.remark,
        'province': this.myList1.province,
        'city': this.myList1.city,
        'district': this.myList1.district,
        'address': this.myList1.address,
        'trname': this.myList1.trname,
        'card_id': this.myList1.card_id,
        'mobile': this.myList1.mobile,
        'company':  this.myList1.company,
        'telephon': this.myList1.telephon,
        'duty': this.myList1.duty,
        'work_time': this.myList1.work_time,
        'direct': this.myList1.direct,
        'colleague1': this.myList1.colleague1,
        'colleague2': this.myList1.colleague2
      }
      var dataNew = {
        'sex': sex,
        'age': this.myList1.age,
        'marriage': marry,
        'children': this.myList1.children,
        'house': this.myList1.house,
        'monthly': this.myList1.monthly,
        'household': this.myList1.household,
        'present': this.myList1.present,
        'photo': this.myList1.photo,
        'education': this.myList1.education,
        'graduate': this.myList1.graduate,
        'autonym': this.myList1.autonym,
        'gathering': this.myList1.gathering,
        'opening': this.myList1.opening,
        'referrer': this.myList1.referrer,
        'remark': this.myList1.remark,
        'province': this.myList1.province,
        'city': this.myList1.city,
        'district': this.myList1.district,
        'address': this.myList1.address,
        'trname': this.myList1.trname,
        'card_id': this.myList1.card_id,
        'mobile': this.myList1.mobile,
        'company':  this.myList1.company,
        'telephon': this.myList1.telephon,
        'duty': this.myList1.duty,
        'work_time': this.myList1.work_time,
        'direct': this.myList1.direct,
        'colleague1': this.myList1.colleague1,
        'colleague2': this.myList1.colleague2
      }
      var postData
      if (btn === '修改资料') {
        url = 'https://www.ispccn.com/Finance-User-update'
        postData = data
      } else {
        url = 'https://www.ispccn.com/Finance-User-add'
        postData = dataNew
      }
      if (this.myList1.trname === null || this.myList1.trname === '' || typeof sex !== 'number' || typeof parseInt(marry) !== 'number' || typeof parseInt(this.myList1.card_id) !== 'number' || typeof parseInt(this.myList1.photo) !== 'number' || this.myList1.province === '' || this.myList1.province === null || this.myList1.city === '' || this.myList1.city === null || this.myList1.address === null || this.myList1.address === '' || typeof parseInt(this.myList1.monthly) !== 'number' || this.myList1.household === '' || this.myList1.household === null || this.myList1.present === '' || this.myList1.present === null || typeof parseInt(this.myList1.gathering) !== 'number' || this.myList1.opening === '' || this.myList1.opening === null || this.myList1.referrer === '' || this.myList1.referrer === null) {
        alert('请填写正确的信息，*为必填项')
      } else {
        this.$axios.post(url, this.$qs.stringify(postData)).then(function (res) {
          that.closexinzeng()
        }).catch(function (err) {
          that.fetchError(err)
        })
      }
    }
  },
  components: {
    dsj1: dashuju,
    jietiao1: jietiao,
    tijiaodaikuan1: tijiaodaikuan
  },
  props: [
    'yhList',
    'myBtn'
  ],
  watch: {
    yhList (a, b) {
      var that = this
      var marry
      var sex
      this.myList1 = this.yhList
      if (this.myList1.marriage === '1') {
        marry = '已婚'
      } else if (this.myList1.marriage === '2') {
        marry = '离婚'
      } else if (this.myList1.marriage === '3') {
        marry = '丧偶'
      } else if (this.myList1.marriage === '4') {
        marry = '单身'
      }
      if (this.myList1.sex === '2') {
        sex = '女'
      } else if (this.myList1.sex === '1') {
        sex = '男'
      }
      this.myList1.marriage = marry
      this.myList1.sex = sex
      if (a.uid !== '' && a.uid !== null) {
        this.$axios.post('https://www.ispccn.com/Finance-User-telephone', that.$qs.stringify({uid: a.uid})).then(function (res) {
          console.log(res)
          if (res.data.status === 1) {
            that.tableData = res.data.jqjl
            that.lianxistatus = res.data.status
          } else  if (res.data.status === 2) {
            that.tableData = ''
            that.lianxistatus = res.data.status
            console.log(that.lianxistatus)
          } else  if (res.data.status === 3) {
            that.tableData = ''
            that.lianxistatus = res.data.status
          }
        }).catch(function (err) {
          that.fetchError(err)
        })
      }
    },
    myBtn (a, b) {
      var inp = document.getElementsByTagName('input')
      if (a === '新增用户') {
        this.myList1 = {
          'id': null,
          'uid': null,
          'sex': null,
          'age': null,
          'marriage': null,
          'children': null,
          'house': null,
          'monthly': null,
          'household': null,
          'present': null,
          'photo': null,
          'education': null,
          'graduate': null,
          'autonym': null,
          'gathering': null,
          'opening': null,
          'referrer': null,
          'remark': null,
          'province': null,
          'city': null,
          'district': null,
          'address': null,
          'trname': null,
          'card_id': null,
          'mobile': null,
          'company': null,
          'telephon': null,
          'duty': null,
          'work_time': null,
          'direct': null,
          'colleague1': null,
          'colleague2': null
        }
      }
      for (var i = 0; i < inp.length; i++) {
        if (a === '查看') {
          inp[i].setAttribute('disabled', false)
        } else {
          inp[i].removeAttribute('disabled', false)
        }
      }
    }
  }
}
</script>

<style scoped>
  #myAdd{
    height: 50px;
    border-left: 6px solid #333;
    display: flex;
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
  #xinzenghead{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px #333 solid;
    width: 87%;
    margin: 20px auto 0;
    position: relative;
    height: 35px;
    line-height: 34px;
    padding: 0 4%;
  }
  #xinzenghead span{
    display: inline-block;
    border: none;
    border-radius: 5px 5px 0 0 ;
    border-bottom: none;
    width: 13%;
    height: 34px;
    float: left;
    background-color: white;
    overflow: auto;
    /*margin-top: 1px;*/
  }
  #xinzenghead span:first-child{
    border: 1px #333 solid;
    border-bottom: 1px #fff solid;
  }
  #gerenxinxi{
    width: 95%;
    margin: 10px auto 0;
    height: 50%;
  }
  form{
    font-size: 14px;
  }
  .mustWrite{
    color: #c60000;
  }
  label{
    width: 27%;
    height: 25px;
    display: inline-block;
    margin: 10px 3%;
    overflow: auto;
  }
  label input{
    float: right;
    margin-right: 5%;
    width: 60%;
  }
  #textlabel{
    width: 95%;
    height: auto;
  }
  #textlabel span{
    vertical-align: top;
  }
  #textlabel textarea{
    float: right;
    margin-right: 5%;
    width: 85.5%;
    height: 80px;
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
  #xiugaiBtn,#xinzengBtn{
    margin-left: 12%;
  }
  #lianxiren{
    display: none;
  }
  #tonghuatop{
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 20px auto 0;
    padding: 10px 0;
  }
  #tonghuatop h6{
    font-size: 20px;
    font-weight: normal;
    margin-left: 20px;
  }
  #daochu{
    width: 100px;
  }
  #tonghuatable tr{
    height: 28px;
  }
  #tonghuatable th,  #tonghuatable td{
    border-right: 1px #aaa solid;
    border-bottom: 1px #aaa solid;
  }
  #dashu,#jiet{
    /*border:1px red solid;*/
    width: 95%;
    margin: 0 auto;
    height: 580px;
    overflow: auto;
    background-color: #f2f6fc;
    display: none;
    border-radius: 0 0 15px 15px;
  }
  #tijiaoD{
    width: 32%;
    left: 34%;
    height: 420px;
    overflow: auto;
    position: absolute;
    background-color: #f2f6fc;
    display: none;
    border-radius: 15px;
    border:1px #ccc solid
  }
  #ifbox{
    width: 50%;
    margin-left: 25%;
    height: 400px;
  }
</style>
