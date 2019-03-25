<template>
  <div id="login">
    <div id="myback">
      <div id="zuobian">
        <img src="../assets/zhineng.png" alt="">
      </div>
      <div id="youbian">
        <div>
          <h6>用户登录</h6>
          <p>USER LOGIN</p>
        </div>
        <div>
          <img src="" alt=""><input type="text" v-model.trim="username" value="" placeholder="请输入用户名">
          <img src="" alt=""><input type="password" v-model.trim="pwd" value=""  placeholder="请输入密码">
          <input type="checkbox" id="remenberP" style="width: 20px;" name="remenberP" v-model="checked"><label for="remenberP" onclick="jizhumima1"></label><span>记住用户名和密码</span>
        </div>
        <div>
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      pwd: '',
      checked: ''
    }
  },
  methods: {
    login () {
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.pwd)
      this.$axios.post('https://www.ispccn.com/Finance-Login-dologin', params).then(res => {
        if (res.data.status === 1) {
          sessionStorage.username = this.username
          this.$router.push({path: '/index'})
        } else {
          alert('登录失败')
        }
      })
    },
    getNowDate () {
      var d = new Date()
      return d.getFullYear()
    },
    jizhumima1: function (e) {
    }
  }
}
</script>

<style scoped>
  #login{
    width: 100%;
    min-width: 640px;
    min-height: 480px;
    height: 100%;
  }
#login{
  background-image: url("../assets/login-back.png");
  width: 100%;
  height: 100%;
  min-width: 640px;
  min-height: 480px;
  background-size: 140%;
  background-position: 100%;
  overflow: hidden;
}
  #myback{
    background-image: url("../assets/lines.png");
    width: 100%;
    height: 100%;
    min-width: 640px;
    min-height: 480px;
    background-size: 130%;
    background-position: 90% 40%;
  }
  #zuobian{
    width: 72%;
    height: 100%;
    overflow: hidden;
    display: inline-block;
  }
  #zuobian img{
    height: 70%;
    margin-top: 15%;
    margin-left: 30%;
  }
  #youbian{
    display: inline-block;
    width: 25%;
    vertical-align: top;
  }
  #youbian h6{
    font-size: 24px;
    color: rgba(68,82,213,1);
    font-weight: normal;
    margin-top: 40%;
  }
  #youbian p{
    width:88px;
    height:10px;
    font-size:12px;
    font-weight:400;
    color:rgba(149,149,149,1);
    opacity:0.8;
  }
  #youbian input{
    width:90%;
    margin: 40px 0 0 0;
    height:40px;
    background:#fff;
    border:1px solid rgba(223, 223, 223, 1);
    text-indent: 1em;
  }
  #youbian span{
    height:18px;
    font-size:12px;
    font-weight:400;
    color:rgba(136,136,136,1);
    line-height:18px;
    display: inline-block;
    vertical-align: top;
    margin: 20px 0 0 5px;
  }
  #youbian button{
    width:90%;
    height:40px;
    background:rgba(67,67,67,1);
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
  }
  #remenberP +label{
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin-top: 20px;
    left: 0;
    background: white;
    border: 1px #4452D5 solid;
    vertical-align: top;
  }
  #remenberP:checked +label::before {
    display: block;
    content: "\2714";
    text-align: center;
    font-size: 16px;
    color: #4452D5;
  }
  input[type=checkbox]{
    visibility: hidden;
  }
</style>
