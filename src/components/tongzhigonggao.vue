<template>
  <div id="tongzhiapp">
    <myindex id="myindex" mychoice="tongzhigonggao"></myindex>
    <div id="kuangzi">
    <div id="myAdd">
      <img src="../assets/home.png" alt="">
      <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > 通知公告</span>
    </div>
    <div id="kehuhead">
      <button id="xinzengBtn" @click="xinzenggonggao1($event)">新增通知</button>
      <!--@click="chanpinxiangqing1"-->
      <input type="text" placeholder="输入通知标题" v-model="searchT" @keyup="search">
      <img src="../assets/search.png" alt="">
    </div>
    <div>
      <div>
        <div class="c-table-list auth-list m-bottom-20">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="575" :default-sort="{prop:'value4',order:'descending'}" stripe>
            <el-table-column label="序号" width="60" align="left" type="index"></el-table-column>
            <el-table-column label="标题" align="center" prop="title"></el-table-column>
            <el-table-column label="时间" align="center" prop="creatime"></el-table-column>
            <el-table-column label="操作" align="center" prop="id">
              <template slot-scope="scope">
                <div>
                  <a @click="xinzenggonggao1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">查看</a>
                  <a @click="xinzenggonggao1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">编辑</a>
                  <a @click="shanchu($event,scope.$index, scope.row)" class="show-underline a-click" href="#">删除</a>
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
            :page-sizes="[5, 8, 10, 20, 30, 40]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            :total="tableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
    <xinzenggonggao id="xinzengG" @close="xinzenggonggao1" v-bind:fenlei1="gongBtn" :mylist1="gonggaoList"></xinzenggonggao>
  </div>
  </div>
</template>

<script>
import xinzenggonggao from './xinzenggonggao'
import index from './index'
export default {
  name: 'tongzhigonggao',
  methods: {
    onSubmit () {
      alert('Have not been done!')
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    mydata: function () {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-Message-index').then(function (data) {
        that.tableData = data.data.list
        that.searchData = data.data.list
        console.log(data.data.list)
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    xinzenggonggao1: function (e, a, b) {
      var xiangqing = document.getElementById('xinzengG')
      var that = this
      if (xiangqing.style.display === 'block') {
        xiangqing.style.display = 'none'
        this.mydata()
      } else if (xiangqing.style.display === '' || xiangqing.style.display === 'none') {
        xiangqing.style.display = 'block'
        var xx = e.target.innerText
        if (xx === '编辑' || xx === '查看') {
          var data = {
            id: b.id
          }
          this.$data.gongBtn = xx + '公告'
          this.$axios.post('https://www.ispccn.com/Finance-Message-ajaxinfo', this.$qs.stringify(data)).then(function (res) {
            that.gonggaoList = res.data.message
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          this.$data.gongBtn = '新增公告'
        }
      }
    },
    shanchu: function (e, a, b) {
      var that = this
      this.$confirm('确认删除  '+b.title+'  ？删除后将不可恢复')
        .then(_ => {
          this.$axios.post('https://www.ispccn.com/Finance-Message-del', this.$qs.stringify({id: b.id})).then(function (res) {
            that.mydata()
          }).catch(function (err) {
            that.fetchError(err)
          })
        })
        .catch(_ => {
          done()
        })
    },
    search: function () {
      let searchD = this.searchT
      let resultData = this.searchData.filter(data => {
        if (data.title.indexOf(searchD) !== -1) {
          return true
        }
      })
      this.tableData = resultData
    }
  },
  mounted: function () {
    this.mydata()
  },
  data () {
    return {
      orders1: '',
      cClass: 'controlA',
      currentPage: 1,
      pagesize: 10,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      gongBtn: '',
      gonggaoList: {
        'id': '',
        'title': '',
        'content': '',
        'c_uid': '',
        'addtime': '',
        'creatime': ''
      },
      searchT: '',
      searchData: ''
    }
  },
  components: {
    xinzenggonggao: xinzenggonggao,
    myindex: index
  }
}
</script>

<style scoped>
  #tongzhiapp{
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
  table{
    font-size: 14px;
    width: 96%;
    margin: 20px auto;
    border: 1px #aaa solid;
    text-align: center;
  }
  th,td{
    height: 35px;
    border-right: 1px #aaa solid;
    border-bottom: 1px #aaa solid;
  }
  #tableControl{
    display: flex;
    justify-content: center;
    color: #333;
    font-size: 14px;
    margin-top: 25px;
  }
  .controlA{
    height: 18px;
    width: 18px;
    display: inline-block;
    text-align: center;
    line-height: 17px;
    margin: 10px;
    text-decoration: none;
    border:1px #333 solid;
    color: #333;
    border-radius: 10%;
    transition: .1s all;
  }
  #xinzengG{
    position: fixed;
    background-color: white;
    width: 640px;
    height: 480px;
    top:49%;
    left: 57%;
    margin-top: -240px;
    margin-left: -320px;
    z-index: 999;
    display: none;
    border:1px #333 solid;
    border-radius: 5px;
    overflow: hidden;
  }
</style>
