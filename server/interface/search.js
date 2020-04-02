import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({ prefix: '/search' })

//获取搜索前十数据接口
router.get('/top', async ctx => {
  let {
    status,
    data: { top }
  } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  })
  ctx.body = {
    top: status === 200 ? top : [{ name: '未搜到该内容' }]
  }
})

//热门景点接口
router.get('/hotPlace', async ctx => {
  //获取城市,判断是否存在store，存在则直接取，不存在则用query
  let city = ctx.store ? ctx.store.state.position.city : ctx.query.city
  //console.log(ctx.store, city)

  let {
    status,
    data: { result }
  } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city
    }
  })
  //返回结果
  ctx.body = {
    result: status === 200 ? result : []
  }
})

//通过关键词获取当前城市商品
router.get('/resultsByKeywords', async ctx => {
  //获取当前城市与关键词
  const { city, keyword } = ctx.query
  let {
    status,
    data: { count, pois }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async ctx => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '深圳'
  let {
    status,
    data: { product, more }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
