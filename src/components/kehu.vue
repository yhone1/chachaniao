<template>
  <div id="kehuapp">
    <myindex id="myindex" mychoice="kehu"></myindex>
    <div id="kuangzi">
      <xinzengyonghu id="xinzeng" @close="xinzengyonghu1" :yhList="yonghuList" :myBtn="btnStyle"></xinzengyonghu>
      <div id="myAdd">
        <img src="../assets/home.png" alt="">
        <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > 客户管理</span>
      </div>
      <div id="kehuhead">
        <button id="xinzengBtn" @click="xinzengyonghu1">新增用户</button>
        <input type="text" placeholder="输入用户姓名/身份证/手机号"  v-model="searchT" @keyup="search">
        <img src="../assets/search.png" alt="">
      </div>
      <div>
        <div class="c-table-list auth-list m-bottom-20">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="575" :default-sort="{prop:'value4',order:'descending'}" stripe>
            <el-table-column label="序号" width="60" align="left" type="index"></el-table-column>
            <el-table-column label="用户姓名" align="center" prop="trname"></el-table-column>
            <el-table-column label="身份证号" align="center" prop="card_id"></el-table-column>
            <el-table-column label="手机号" align="center" prop="photo"></el-table-column>
            <el-table-column label="大数据得分" align="center" prop="fenshu"></el-table-column>
            <el-table-column label="放款金额" align="center" prop="fkjl"></el-table-column>
            <el-table-column label="是否逾期" align="center" prop="sfyq"></el-table-column>
            <!--sortable-->
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div>
                  <a @click="xinzengyonghu1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">查看</a>
                  <a @click="xinzengyonghu1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">编辑</a>
                  <a @click="onSubmit($event,scope.$index, scope.row)" class="show-underline a-click" href="#">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="t-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            :total="tableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xinzengyonghu from './xinzengyonghu'
import index from './index'
export default {
  name: 'kehu',
  methods: {
    xinzengyonghu1: function (e, a, b) {
      var xinzeng = document.getElementById('xinzeng')
      if (xinzeng.style.display === 'block') {
        xinzeng.style.display = 'none'
        this.mydata()
      } else if (xinzeng.style.display === '' || xinzeng.style.display === 'none') {
        var btn = e.target.innerHTML
        xinzeng.style.display = 'block'
        this.btnStyle = btn
        if (btn !== '新增用户') {
          var that = this
          var id = this.$qs.stringify({uid: b.id})
          this.$axios.post('https://www.ispccn.com/Finance-User-ajaxinfo', id).then(function (res) {
            that.yonghuList = res.data.list
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          this.yonghuList = {
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
      }
    },
    mydata: function () {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-User-index').then(function (data) {
        that.tableData = data.data.list
        that.searchData = data.data.list
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    search: function () {
      let searchD = this.searchT
      let resultData = this.searchData.filter(data => {
        if (data.trname.indexOf(searchD) !== -1 || data.card_id.indexOf(searchD) !== -1 || data.photo.indexOf(searchD) !== -1) { // 此处根据具体需求判断
          return true
        }
      })
      this.tableData = resultData
    },
    onSubmit (e, a, b) {
      var that = this
      this.$confirm('确认删除  '+b.trname+'  ？删除后将不可恢复')
        .then(_ => {
          that.$axios.post('https://www.ispccn.com/Finance-User-del', that.$qs.stringify({uid: b.id})).then(function (res) {
            that.mydata()
          })
        })
        .catch(_ => {
          done()
        })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    }
  },
  created: function () {
    this.mydata()
  },
  components: {
    xinzengyonghu: xinzengyonghu,
    myindex: index
  },
  data () {
    return {
      xinzengYG: '新增员工',
      currentPage: 1,
      pagesize: 10,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      yonghuList: '',
      btnStyle: '',
      searchT: '',
      searchData: ''
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #kehuapp{
    background-color: white;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  #kuangzi{
    width: 85%;
    margin-left: 220px;
    margin-top: 50px;
    height: 93%;
  }
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
  #xinzengBtn{
    background-color: #0095c9;
    border: none;
    width: 180px;
    height: 35px;
    color: white;
    border-radius: 10px;
    font-size: 14px;
    margin: 0 20px;
    outline: none;
    transition: .2s all;
  }
  #xinzengBtn:hover{
    transform: translate(2px,2px);
  }
  #kehuhead img{
    height: 20px;
    position: absolute;
    right: 4%;
  }
  #kehuhead input{
    height: 28px;
    width: 280px;
    float: right;
    margin-right: 2%;
    text-indent: 1em;
    border-radius: 5px;
  }
  #kehuhead{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  th,td{
    min-height: 35px!important;
    border-right: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    text-align: center;
  }
  tr{
    height: 35px;
  }
  #xinzeng{
    position: fixed;
    background-color: white;
    width: 84%;
    height: 87.5%;
    z-index: 999;
    display: none;
    overflow: auto;
  }

</style>
