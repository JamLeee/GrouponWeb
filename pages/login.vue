<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="/"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
      </div>
      <div class="form">
        <h4 class="tips" v-if="error">
          <i />
          {{ error }}
        </h4>
        <p>
          <span>账号登录</span>
        </p>
        <el-input prefix-icon="profile" v-model="username" placeholder="请输入用户名"></el-input>
        <el-input prefix-icon="password" v-model="password" type="password" placeholder="请输入密码"></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">七天内自动登录</el-checkbox>
          <b>
            <a href="/">忘记密码？</a>
          </b>
        </div>
        <el-button class="btn-login" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJs from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      checked: true
    }
  },
  methods: {
    login: function() {
      let self = this
      this.$axios
        .post('/users/signin', {
          username: window.encodeURIComponent(self.username),
          password: CryptoJs.MD5(self.password).toString()
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = '/'
            } else {
              self.error = data.msg
            }
          } else {
            self.error = `服务器错误，错误代码${status}`
          }
          setInterval(function() {
            self.error = ''
          }, 10000)
        })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/login/index.scss';
</style>
