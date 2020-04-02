import Router from 'koa-router'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'

let router = new Router({ prefix: '/order' })

router.post('/createOrder', async ctx => {
  //获取id，价格和数量
  let { id, price, count } = ctx.request.body
  console.log(id, price, count)
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString()
  //判断是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录'
    }
  } else {
    //找到对应的购物车,查询数据库
    let findCart = await Cart.findOne({ cartNo: id })
    //如果查到结果则创建订单
    let order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    })

    try {
      //写入数据库
      let result = await order.save()
      if (result) {
        //生成订单后删除购物车
        await findCart.remove()
        //成功则返回orderID
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'order remove fail'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
})

//获取订单
router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      let result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '查询失败'
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e
      }
    }
  }
})

export default router
