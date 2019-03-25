<template>
  <div id="fangkuanapp">
    <myindex id="myindex" mychoice="tongzhigonggao"></myindex>
    <div id="kuangzi">
    <fangkuanxiangqing id="xiangqing" @close="caozuo" :compData="compData" :refund="refund" :periods="periods" :btnStyle="btnS1" :shenF="shenSF"></fangkuanxiangqing>
    <div id="myAdd">
      <img src="../assets/home.png" alt="">
      <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > 放款管理</span>
    </div>
    <div id="dingdantongji">
      <div id="dingdanhead">放款中订单</div>
      <div id="dingdanbody">
        <div><p class="numS">{{orders1.order_number}}</p><p>放款订单数</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.lending}}</p><p>已放款金额</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.payment}}</p><p>已还款金额</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.should}}</p><p>本月应还金额</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.overdue}}</p><p>当前逾期金额</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.overdue_number}}</p><p>逾期人数</p></div><span class="shuxian"></span>
        <div><p class="numS">{{orders1.yuqilv}}%</p><p>逾期率</p></div>
      </div>
    </div>
    <div id="shuju">
      <div id="search">
        <input type="text" placeholder="输入用户姓名/身份证/手机号" v-model="searchT" @keyup="search">
        <img src="../assets/search.png" alt="">
      </div>
      <div>
        <div class="c-table-list auth-list m-bottom-20">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="440" :default-sort="{prop:'value4',order:'descending'}" stripe>
            <el-table-column label="序号" width="50" align="left" type="index"></el-table-column>
            <el-table-column label="用户姓名" align="center" prop="trname"></el-table-column>
            <el-table-column label="身份证号" align="center" prop="card_id"></el-table-column>
            <el-table-column label="放款时间" align="center" prop="lending_time" sortable></el-table-column>
            <el-table-column label="放款金额" align="center" prop="loan_amount"></el-table-column>
            <el-table-column label="放款期数" align="center" prop="lending_period"></el-table-column>
            <el-table-column label="每期应还金额" align="center" prop="payable"></el-table-column>
            <el-table-column label="已还期数" align="center" prop="also"></el-table-column>
            <el-table-column label="已还金额" align="center" prop="refund"></el-table-column>
            <el-table-column label="是否逾期" align="center" prop="sfyq"></el-table-column>
            <el-table-column label="审核" align="center" prop="status" :formatter="formatSH"></el-table-column>
            <el-table-column label="操作" align="center" prop="id">
              <template slot-scope="scope">
                <div>
                  <a @click="caozuo(scope.$index, scope.row,$event)" class="show-underline a-click" href="#">查看</a>
                  <a @click="caozuo(scope.$index, scope.row,$event)" class="show-underline a-click" href="#">编辑</a>
                  <!--<a @click="onSubmit" class="show-underline a-click" href="#">删除</a>-->
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
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            :total="tableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import fangkuanxiangqing from './fangkuanxiangqing'
import index from './index'
export default {
  name: 'fangkuan',
  methods: {
    caozuo: function (a, b, e) {
      var xiangqing = document.getElementById('xiangqing')
      var that = this
      if (xiangqing.style.display === 'block') {
        xiangqing.style.display = 'none'
      } else if (xiangqing.style.display === '' || xiangqing.style.display === 'none') {
        this.btnS1 = e.target.innerText
        xiangqing.style.display = 'block'
        var myID = b.id
        this.shenSF = b.status
        var data = this.$qs.stringify({
          la_id: myID
        })
        this.$axios.post('https://www.ispccn.com/Finance-Index-ajaxloaninfo', data).then(function (res) {
          that.compData = res.data.user
          that.refund = res.data.refund
          that.periods = res.data.periods
        }).catch(function (err) {
          that.fetchError = err
        })
      }
    },
    formatSH: function (row, column, cellValue) {
      if (cellValue === '1') {
        return '审核通过'
      } else if (cellValue === '0') {
        return '未审核'
      } else {
        return '审核未通过'
      }
    },
    controlPage: function () {

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
    mydata: function () {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-Index-loan').then(function (data) {
        that.orders1 = data.data.orders
        that.tableData = data.data.list
        that.searchData = data.data.list
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    onSubmit () {
      alert('Have not been done!')
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    }
  },
  components: {
    fangkuanxiangqing: fangkuanxiangqing,
    myindex: index
  },
  mounted () {
    this.mydata()
  },
  data () {
    return {
      orders1: '',
      cClass: 'controlA',
      currentPage: 1,
      pagesize: 5,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      compData: '',
      periods: '',
      refund: '',
      btnS1: '',
      shenSF: '',
      searchT: '',
      searchData: ''
    }
  }
}
</script>

<style scoped>
  #fangkuanapp{
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
  #dingdantongji{
    width: 90%;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 2%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
  }
  .numS{
    font-size: 23px;
    font-weight: bold;
  }
  #dingdanhead{
    background: linear-gradient(to bottom,#333,#666,#333);
    height: 35px;
    text-align: center;
    color: white;
    line-height: 35px;
  }
  #dingdanbody{
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
    border: 1px #333 solid;
    height: 90px;
  }
  #dingdanbody div{
    height: 90px;
  }
  #dingdanbody div p:first-child{
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  #dingdanbody div p:last-child{
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }
  .shuxian{
    float: right;
    height: 70px;
    border-right: 1px #cdcdcd solid;
    margin-top: 10px;
  }
  #search{
    width: 90%;
    margin: 0 auto;
    margin-top: 25px;
    position: relative;
    height: 45px;
  }
  #search img{
    height: 20px;
    position: absolute;
    right: 3%;
    top: 50%;
    margin-top: -15px;
  }
  #search input{
    height: 30px;
    width: 280px;
    float: right;
    margin-right: 2%;
    text-indent: 1em;
  }
  #shuju{
    height: 72%;
  }
  #xiangqing{
    position: fixed;
    background-color: white;
    width: 84%;
    height: 87.5%;
    z-index: 999;
    display: none;
    overflow: auto;
  }
</style>
