<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword" />
      <Categroy :areas="areas" :types="types" />
      <List :list="list" />
    </el-col>
    <el-col :span="5">
      <Amap :width="300" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs'
import Categroy from '@/components/products/categroy'
import List from '@/components/products/list'
import Amap from '@/components/public/map'

export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data() {
    return {
      keyword: '',
      types: [],
      areas: [],
      list: [],
      point: []
    }
  },

  async asyncData(ctx) {
    //异步获取关键词与地图信息
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    console.log(keyword, city)
    let {
      status,
      data: { count, pois }
    } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    let {
      status: status2,
      data: { areas, types }
    } = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    //console.log('count===' + count)
    //console.log(pois)
    //console.log(areas)

    //console.log(count, pois, types, areas)

    if (status === 200 && count > 0 && status2 === 200) {
      return {
        //数据筛选、映射
        list: pois
          .filter(item => item.photos.length)
          .map(item => {
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random() * 1000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '明日可订',
              location: item.location,
              module: item.type.split(';')[0]
            }
          }),
        //给keyword赋值
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  },
  compouted: {
    point: function() {
      console.log(point)
      return point
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/products/index.scss';
</style>
