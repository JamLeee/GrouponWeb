<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <dl>
          <dt>我的订单</dt>
          <dd>
            全部订单
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            待付款
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            待使用
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            待评价
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            退款/售后
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>
            收藏的商家
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            收藏的团购
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="退款/售后" name="aftersale">
            <list :cur="cur" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import List from '../components/order/list'
export default {
  components: {
    List
  },
  data() {
    return {
      activeName: 'all',
      list: [],
      cur: []
    }
  },
  watch: {
    activeName: function(val) {
      this.cur = this.list.filter(item => {
        if (val === 'unpay') {
          return item.status === 0
        } else if (val === 'all') {
          return true
        } else {
          return false
        }
      })
    },
    list: function() {
      let val = this.name
      this.cur = this.list.filter(item => {
        if (val === 'unpay') {
          return item.status === 0
        } else if (val === 'all') {
          return true
        } else {
          return false
        }
      })
    }
  },
  methods: {
    handleClick: function(tab) {
      this.activeName = tab.name
    }
  },
  async asyncData(ctx) {
    let {
      status,
      data: { code, list }
    } = await ctx.$axios.post('order/getOrders')
    console.log('----' + list[0].imgs[0].url, '---', list[0].imgs.length)
    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : '/logo.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '未付款' : '已付款'
          }
        }),
        cur: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : '/logo.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? '未付款' : '已付款'
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/order/index.scss';
</style>
