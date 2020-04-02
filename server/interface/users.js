import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'
//import { ElStep } from 'element-ui/types/step'

//创建路由
let router = new Router({
  prefix: '/users'
})

//获取Redis客户端
let Store = new Redis().client

//注册接口
router.post('/signup', async ctx => {
  //获取用户输入的信息
  const { username, password, email, code } = ctx.request.body
  console.log(username)
  if (code) {
    //如果code的存在则获取Redis中的code值与expire时间
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    console.log('saveCode:' + saveCode)
    console.log('code:' + code)

    //判断用户输入的code是否与存在redis中的code相同
    if (code === saveCode) {
      //如果code值相同则判断是否在有效期内
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码过期'
        }
        return false
      } else {
        //验证码相等且时间小于1分钟
        //获取用户
        let user = await User.find({ username })
        if (user.length) {
          ctx.body = {
            code: -1,
            msg: `'用户名已被注册'${user}`
          }
          return
        }

        //写库操作
        let nuser = await User.create({
          username,
          password,
          email
        })

        //注册成功则自动登录
        if (nuser) {
          //用axios登录
          let res = await axios.post('/users/signin', { username, password })
          //判断是否成功注册

          if (res.data && res.data.code === 0) {
            ctx.body = {
              code: 0,
              msg: '注册成功',
              user: res.data.user
            }
          } else {
            ctx.body = {
              code: -1,
              msg: `'error'2`
            }
          }
        } else {
          ctx.body = {
            code: -1,
            msg: `'注册失败'`
          }
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请输入正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
})

//登录接口
router.post('/signin', async (ctx, next) => {
  //利用passport的authenticate方法登录
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          //传user出去
          user
        }
        //登录动作
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

//验证接口
router.post('/verify', async (ctx, next) => {
  //获取username和expire时间
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

  //判断验证码时间有没有小于1分钟
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，1分钟一次'
    }
    return false
  }

  //定义发送对象
  let transporter = nodeMailer.createTransport({
    // host: Email.smtp.host,
    // port: 587,
    // secure: false,
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  //定义接收对象
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  //定义发送内容
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '美团网注册验证码',
    html: `您的注册验证码为<b>${ko.code}</b>`
  }

  //发送邮件
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      //没有错误则在redis中存储code和expire
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送'
  }
  console.log(mailOptions)
})

//退出接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout() //退出方法
  //二次验证是否成功退出
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

//获取用户名接口
router.get('/getUser', async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

//导出接口
export default router
