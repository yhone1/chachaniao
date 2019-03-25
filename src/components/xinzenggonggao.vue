<template>
    <div id="xinzenggonggao">
      <div id="guanbilan">
        <button @click="closexiangqing"><img src="../assets/close.png" alt="" id="closeXQ"></button>
      </div>
      <div id="xinxitop">
        <h6>{{fenlei1}}</h6>
        <form action="">
          <label for="gonggaobiaoti"><span style="font-weight: bold">标题：</span><input type="text" id="gonggaobiaoti" v-model="gonggaolist.title"></label>
          <label for="gongggaoshijian" v-if="fenlei1!=='新增公告'"><span>发布时间：</span><input type="text" id="gongggaoshijian" v-model="gonggaolist.creatime" placeholder="例：2016-02-13"></label>
          <label for="gonggaoneirong" id="jiesulehaokaixin"><span>公告内容：</span><textarea id="gonggaoneirong" v-model="gonggaolist.content"></textarea></label>
          <button @click="zenggaigonggao" v-if="fenlei1 !== '查看公告'">
            {{fenlei1}}
          </button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'xinzenggonggao',
  data () {
    return {
      gonggaolist: {
        'id': '',
        'title': '',
        'content': '',
        'c_uid': '',
        'addtime': '',
        'creatime': ''
      }
    }
  },
  methods: {
    closexiangqing: function () {
      this.gonggaolist = {
        'id': '',
        'title': '',
        'content': '',
        'c_uid': '',
        'addtime': '',
        'creatime': ''
      }
      this.$emit('close', 'none')
    },
    zenggaigonggao: function (e) {
      var btn = e.target.innerText
      var that = this
      var data = {
        id: this.gonggaolist.id,
        title: this.gonggaolist.title,
        content: this.gonggaolist.content
      }
      var dataNew = {
        title: this.gonggaolist.title,
        content: this.gonggaolist.content
      }
      if (btn === '编辑公告') {
        if (data.title !== '' && data.content !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Message-update', this.$qs.stringify(data)).then(function (data) {
            that.closexiangqing()
          }).catch(function (err) {
            that.fetchError(err)
          })
        } else {
          alert('请输入正确的内容')
        }
      } else {
        if (dataNew.title !== '' && dataNew.content !== '') {
          this.$axios.post('https://www.ispccn.com/Finance-Message-add', this.$qs.stringify(dataNew)).then(function (data) {
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
      this.gonggaolist = a
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
    width: 90%;
    margin: 20px 4%;
  }
  label span{
    display: inline-block;
    width: 25%;
  }
  #gonggaobiaoti,#gongggaoshijian,#gonggaoneirong{
    width: 70%;
    text-indent: 1em;
  }
  #gonggaobiaoti{
    font-weight: bold;
    height: 25px;
  }
  #gonggaoneirong{
    height: 160px;
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
    margin: 0 0 0 65%;
    outline: none;
    transition: .1s all;
  }
  form button:hover{
    transform: translate(1px,1px);
  }
  #jiesulehaokaixin span{
    vertical-align: top;
  }
</style>
