import Router from 'koa-router'
import axios from './utils/axios'
import Categroy from '../dbs/models/categroy'

let router = new Router({
  prefix: '/categroy'
})

router.get('/crumbs', async ctx => {
  let {
    status,
    data: { areas, types }
  } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '深圳'
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
  //线下数据
  // let Scity = ctx.query.city.replace('市', '')
  // let result = await Categroy.findOne({ city: Scity })
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [1, 2, 3],
  //     types: [1, 2, 3],
  //     result,
  //     Scity
  //   }
  // }
})

export default router
