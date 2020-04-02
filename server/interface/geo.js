import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({ prefix: '/geo' })

//获取定位
router.get('/getPosition', async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

//获取菜单接口
router.get('/menu', async ctx => {
  let {
    status,
    data: { menu }
  } = await axios.get(`http://cp-tools.cn/geo/menu`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

//获取省份定位
router.get('/province', async ctx => {
  let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }

  //第二种获取第三方信息库
  // let {
  //   status,
  //   data: { province }
  // } = await axios.get(`http://cp-tool.cn/geo/province`)
  // ctx.body = {
  //   province: status === 200 ? province : []
  // }
})

//获取所有城市
router.get('/city', async ctx => {
  let {
    status,
    data: { city }
  } = await axios.get(`http://cp-tools.cn./geo/city`)
  ctx.body = {
    city: status === 200 ? city : []
  }
})

//根据信息查询城市
router.get('/province/:id', async ctx => {
  let {
    status,
    data: { city }
  } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

//获取热门城市
router.get('/hotCity', async ctx => {
  let {
    status,
    data: { hots }
  } = await axios.get('http://cp-tools.cn/geo/hotCity')
  ctx.body = {
    hots: status === 200 ? hots : []
  }
})

export default router
