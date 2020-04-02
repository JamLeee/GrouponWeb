import Router from 'koa-router'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'

let router = new Router({
  prefix: '/cart'
})

//创建购物车
router.post('/createCart', async ctx => {
  //登录拦截
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {
    //创建时间戳和购物车id
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    //拿到对应产品的id
    let {
      params: { id, detail }
    } = ctx.request.body
    //创建购物车
    let cart = new Cart({
      id,
      cartNo,
      detail,
      user: ctx.session.passport.user,
      time
    })
    //存储，入库操作
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        //需要把购物车的id返回
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '创建失败'
      }
    }
  }
})

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    let {
      params: { id, detail }
    } = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

//获取购物车信息
router.post('/getCart', async ctx => {
  //获取id
  let { id } = ctx.request.body
  //查询结果
  try {
    let result = await Cart.findOne({
      cartNo: id
    })
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: 'fail'
    }
  }
})

export default router
