<template>
    <div id="chanpinapp">
      <myindex id="myindex" mychoice="tongzhigonggao"></myindex>
      <div id="kuangzi">
      <chanpinxiangqing id="xiangqing" @close="chanpinxiangqing1" :xinbian1="xinzengCP" :mylist="xiangqinglist"></chanpinxiangqing>
      <div id="myAdd">
        <img src="../assets/home.png" alt="">
        <span id="firstspan"><span>&nbsp;&nbsp;首页</span> > 产品管理</span>
      </div>
      <div id="kehuhead">
        <button id="xinzengBtn" @click="chanpinxiangqing1">新增产品</button>
      </div>
      <div id="chanpinbody">
        <div class="chanpinmen" v-for="(item,key,index) in proData" :key="index">
          <div class="chanpinshang">
            <div class="chanpinshangzuo">
              <h6 class="chanpinname">{{item.name}}</h6>
              <p class="chanpinbeizhu">备注：{{item.remark}}</p>
            </div>
            <div class="chanpinshangyou">
              <button @click="chanpinxiangqing1($event,item.id)" id="bianjichanpin" style="right: 100px">编辑</button>
              <button @click="shanchu(item.name,item.id)" id="shanchuchanpin">删除</button>
            </div>
          </div>
          <div class="chanpinxia">
            <div class="chanpinbiaoti"><span>贷款金额</span><span>期数</span><span>每期还款</span></div>
            <div class="chanpinshuju"><span>{{item.dkje}}元</span><span>{{item.detail}}</span><span>{{item.terminally}}元</span></div>
          </div>
        </div>
      </div>
      <div id="tableControl" style="display: flex;align-items: center">
        <a id="left" class="controlA" @click="fanye($event,'left')">&lt;</a>
        <div v-for="(item,key,index) in totalPage" :key="index">
          <a class="controlA" @click="fanye($event,'middle')">{{item}}</a>
          <!--<a href="" class="controlA" v-else-if="0">{{index}}</a>-->
        </div>
        <a id="right" class="controlA" @click="fanye($event,'right')">&gt;</a>
      </div>
      </div>
    </div>
</template>

<script>
import chanpinxiangqing from './chanpinxiangqing'
import index from './index'
export default {
  name: 'chanpinguanli',
  data () {
    return {
      xinzengCP: '新增员工',
      proData: [],
      totalPage: [],
      tolalPor: 0,
      nowPage: 1,
      xiangqinglist: ''
    }
  },
  components: {
    chanpinxiangqing: chanpinxiangqing,
    myindex: index
  },
  mounted: function () {
    this.getData()
    var chanpinmen = document.getElementsByClassName('chanpinmen')
    for (var i = 0; i < chanpinmen.length; i++) {
      if (i === 0) {
        chanpinmen[i].style.borderColor = 'rgba(204, 153, 102, 1)'
      } else if (i === 1) {
        chanpinmen[i].style.borderColor = 'rgba(0, 204, 255, 1)'
      } else if (i === 2) {
        chanpinmen[i].style.borderColor = 'rgba(0, 153, 102, 1)'
      } else if (i === 3) {
        chanpinmen[i].style.borderColor = 'rgba(255, 0, 51, 1)'
      } else if (i === 4) {
        chanpinmen[i].style.borderColor = 'rgba(255, 204, 102, 1)'
      } else if (i === 5) {
        chanpinmen[i].style.borderColor = 'rgba(204, 153, 102, 1)'
      }
    }
  },
  methods: {
    chanpinxiangqing1: function (e, id) {
      var xiangqing = document.getElementById('xiangqing')
      var that = this
      if (xiangqing.style.transform === 'rotateY(0deg) scale(1)') {
        xiangqing.style.transform = 'rotateY(180deg) scale(0)'
        this.getData()
      } else if (xiangqing.style.transform === '' || xiangqing.style.transform === 'rotateY(180deg) scale(0)') {
        xiangqing.style.transform = 'rotateY(0deg) scale(1)'
        var xx = e.target.id
        if (xx === 'bianjichanpin') {
          this.$data.xinzengCP = '编辑产品'
          this.$axios.post('https://www.ispccn.com/Finance-Product-ajaxinfo', that.$qs.stringify({id: id})).then(function (res) {
            that.xiangqinglist = res.data.list
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          this.$data.xinzengCP = '新增产品'
          this.xiangqinglist = {
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
      }
    },
    getData: function () {
      var that = this
      this.$axios.post('https://www.ispccn.com/Finance-Product-index').then(function (data) {
        that.proData = data.data.list
        // that.totalPage = data.data.page.curpage
        that.tolalPor = data.data.page.count
        that.mytotal()
      }).catch(function (err) {
        that.fetchError(err)
      })
    },
    shanchu: function (b, a) {
      var that = this
      this.$confirm('确认删除  '+b+'  ？删除后将不可恢复')
        .then(_ => {
          this.$axios.post('https://www.ispccn.com/Finance-Product-del', this.$qs.stringify({id: a})).then(function (res) {
            that.getData()
          })
        })
        .catch(_ => {
          done()
        })
    },
    mytotal: function () {
      var t = this.tolalPor
      this.totalPage = parseInt(t / 6 + 1)
    },
    fanye: function (e, a) {
      var btn = e.target.innerText
      var nowP = parseInt(this.nowPage)
      var total = parseInt(this.totalPage)
      var needTo = parseInt(this.nowPage)
      var that = this
      if (a === 'left') {
        if (nowP > 1) {
          needTo = nowP - 1
          this.nowPage = needTo
        }
      } else if (a === 'right') {
        if (nowP < total) {
          needTo = nowP + 1
          this.nowPage = needTo
        }
      } else if (a === 'middle') {
        needTo = parseInt(btn)
        this.nowPage = needTo
      }
      this.$axios.post('https://www.ispccn.com/Finance-Product-ajaxproductpage', this.$qs.stringify({keywords: '', page: needTo})).then(function (res) {
        that.proData = res.data.list
        that.tolalPor = res.data.page.count
        that.mytotal()
      }).catch(function (err) {
        that.fetchError(err)
      })
    }
  }
}
</script>

<style scoped>
  #chanpinapp{
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
  #chanpinbody{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .chanpinmen{
    border:1px black solid;
    width: 40%;
    margin: 2% 3% 2% 3%;
    padding: 1%;
  }
  .chanpinshangzuo,.chanpinshangyou{
    display: inline-block;
    width: 48%;
    height: 70px;
    vertical-align: top;
  }
  .chanpinshangyou{
    position: relative;
  }
  .chanpinshangyou>button{
    background-color: #0095c9;
    position: absolute;
    border: none;
    width: 80px;
    height: 30px;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    right: 0;
    top:50%;
    margin-top: -15px;
  }
  .chanpinname{
    font-size: 26px;
    height: 58%;
  }
  .chanpinbeizhu{
    font-size: 12px;
  }
  .chanpinxia{
    width: 100%;
  }
  .chanpinbiaoti{
    font-size: 14px;
    color: #aaa;

  }
  .chanpinshuju{
    font-size: 14px;
    color: #555;
  }
  .chanpinbiaoti span,.chanpinshuju span{
    display: inline-block;
    width: 33%;
    text-align: center;
  }
  .chanpinshuju span:nth-of-type(2){
    border-right: 1px #555 solid;
    border-left: 1px #555 solid;
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
  #left,#right,.controlA{
    cursor: pointer;
  }
  .controlA:hover{
    background-color: #333;
    color: white;
    border-radius: 50%;
    transform: scale(1.2);
  }
  #xiangqing{
    position: fixed;
    background-color: white;
    width: 640px;
    height: 530px;
    top:49%;
    left: 57%;
    margin-top: -220px;
    margin-left: -320px;
    z-index: 999;
    /*display: none;*/
    border:1px #333 solid;
    border-radius: 5px;
    transform: rotateY(180deg) scale(0);
    transition: .3s all;
    overflow: hidden;
  }
</style>
