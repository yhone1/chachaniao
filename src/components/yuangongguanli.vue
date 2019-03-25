<template>
    <div id="yuangongapp">
      <myindex id="myindex" mychoice="tongzhigonggao"></myindex>
      <div id="kuangzi">
      <div id="myAdd">
        <img src="../assets/home.png" alt="">
        <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > 员工管理</span>
      </div>
      <div id="kehuhead">
        <button id="xinzengBtn" @click="xinzengyuangong1">新增员工</button>
        <input type="text" placeholder="输入员工姓名/身份证/手机号" v-model="searchT" @keyup="search">
        <img src="../assets/search.png" alt="">
      </div>
      <div>
        <div class="c-table-list auth-list m-bottom-20">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="560" :default-sort="{prop:'value4',order:'descending'}" stripe>
            <el-table-column label="序号" width="100" align="left" type="index"></el-table-column>
            <el-table-column label="员工姓名" align="center" prop="username"></el-table-column>
            <el-table-column label="身份证号" align="center" prop="car_id"></el-table-column>
            <el-table-column label="手机号" align="center" prop="photo"></el-table-column>
            <el-table-column label="入职时间" align="center" prop="addtime" sortable></el-table-column>
            <el-table-column label="在职状态" align="center" prop="status"></el-table-column>
            <el-table-column label="离职时间" align="center" prop="dimission"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div>
                  <a @click="xinzengyuangong1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">查看</a>
                  <a @click="xinzengyuangong1($event,scope.$index, scope.row)" class="show-underline a-click" href="#">编辑</a>
                  <a @click="shanchuyuangong($event,scope.$index, scope.row)" class="show-underline a-click" href="#">删除</a>
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
      <xinzengyuangong id="xinzengY" @close="xinzengyuangong1" v-bind:fenlei1="xinzengYG" :mylist1="yuangonglist"></xinzengyuangong>
    </div>
    </div>
</template>

<script>
import xinzengyuangong from './xinzengyuangong'
import index from './index'
export default {
  name: 'yuangongguanli',
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
      },
      searchT: '',
      searchData: ''
    }
  },
  methods: {
    xinzengyuangong1: function (e, a, b) {
      var xiangqing = document.getElementById('xinzengY')
      var that = this
      if (xiangqing.style.display === 'block') {
        xiangqing.style.display = 'none'
        this.yuangongmain()
      } else if (xiangqing.style.display === '' || xiangqing.style.display === 'none') {
        xiangqing.style.display = 'block'
        var xx = e.target.innerText
        if (xx === '编辑' || xx === '查看') {
          var data = {
            id: b.id
          }
          this.$data.xinzengYG = xx + '员工'
          this.$axios.post('https://www.ispccn.com/Finance-Employee-ajaxinfo', this.$qs.stringify(data)).then(function (res) {
            that.yuangonglist = res.data.list
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          this.$data.xinzengYG = '新增员工'
        }
      }
    },
    shanchuyuangong (e, a, b) {
      var that = this
      this.$confirm('确认删除  '+b.username+'  ？删除后将不可恢复')
        .then(_ => {
          this.$axios.post('https://www.ispccn.com/Finance-Employee-del', this.$qs.stringify({uid: b.id})).then(function (res) {
            that.yuangongmain()
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
    },
    yuangongmain: function () {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-Employee-index').then(function (data) {
        that.tableData = data.data.list
        that.searchData = data.data.list
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    search: function () {
      let searchD = this.searchT
      let resultData = this.searchData.filter(data => {
        if (data.username.indexOf(searchD) !== -1 || data.car_id.indexOf(searchD) !== -1 || data.photo.indexOf(searchD) !== -1) { // 此处根据具体需求判断
          return true
        }
      })
      this.tableData = resultData
    }
  },
  mounted: function () {
    this.yuangongmain()
  },
  components: {
    xinzengyuangong: xinzengyuangong,
    myindex: index
  }
}
</script>

<style scoped>
  #yuangongapp{
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
  #xinzengY{
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
