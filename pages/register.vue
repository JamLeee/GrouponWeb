<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
          <el-button type="mini" @click="sendMsg">发送邮箱验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input type="password" v-model="form.cpwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/4"
            target="_blank"
          >《美团点评用户服务协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import CryptoJs from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      error: '',
      statusMsg: '',
      form: {
        //每个input输入框对应变量
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        //定义用户输入规则
        name: [
          //require是否必填项，type类型，message返回的信息，trigger触发方法
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            type: 'string',
            message: '请输入正确的验证码',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            //增加一个验证的函数value值，当前表单，返回值
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.form.pwd) {
                callback(new Error('两次输入的密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register: function() {
      let self = this
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log('valid:' + valid)
          self.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(self.form.name),
              password: CryptoJs.MD5(self.form.pwd).toString(),
              email: self.form.email,
              code: self.form.code
            })
            .then(({ status, data }) => {
              //判断是否注册成功
              if (status === 200) {
                //状态码为200为成功，则跳转到登录页
                if (data && data.code === 0) {
                  location.href = '/login'
                  console.log('成功：' + data)
                } else {
                  self.error = data.msg
                  console.log('status:' + status)
                }
              } else {
                self.error = `服务器出错，错误代码${status}`
              }
              //防止错误修正后error一直存在，设置定时器清空error
              setInterval(function() {
                self.error = ''
              }, 10000)
            })
        }
      })
    },
    sendMsg: function() {
      const self = this
      let namePass //获取名称和email是否符合标准
      let emailPass
      //判断是否已发送邮件
      if (self.timerid) {
        return false
      }
      //用element-ui自带方法获取值是否通过验证
      this.$refs['form'].validateField('name', valid => {
        namePass = valid
      })
      //清空statusMsg信息
      self.statusMsg = ''
      if (namePass) {
        //如果name未通过验证则返回
        return false
      }
      this.$refs['form'].validateField('email', valid => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        //如果值都通过验证则发送邮件（element-ui方法未通过是有值）
        self.$axios
          .post('/users/verify', {
            username: encodeURIComponent(self.form.name),
            email: self.form.email
          })
          .then(({ status, data }) => {
            //判断是否发送成功
            if (status === 200 && data && data.code === 0) {
              //成功则设置倒计时
              let count = 60
              self.statusMsg = `验证码已发送，剩余${count--}秒`
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已发送,剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                  self.statusMsg = ''
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          })
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
