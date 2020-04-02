<template>
  <div class="page-cart">
    <el-row>
      <el-col :span="24" v-if="cart.length" class="m-cart">
        <List :cart-data="cart" />
        <p>
          应付金额:
          <em class="money">￥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>
<script>
import List from '../components/cart/list'
export default {
  components: {
    List
  },

  computed: {
    total() {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.count
      })
      return total
    }
  },
  async asyncData(ctx) {
    //获取购物车
    let {
      status,
      data: {
        code,
        data: { name, price }
      }
    } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    console.log(status, name)
    if (status === 200 && code === 0 && name) {
      return {
        cart: [
          {
            name,
            price,
            count: 1
          }
        ],
        cartNo: ctx.query.id
      }
    }
  },

  methods: {
    submit: async function() {
      console.log(this.cart, this.cartNo, this.cart[0].count)
      let {
        status,
        data: { code, id }
      } = await this.$axios.post('/order/createOrder', {
        id: this.cartNo,
        count: this.cart[0].count,
        price: this.cart[0].price
      })
      if (status === 200 && code === 0) {
        this.$alert(`恭喜您已成功下单，订单号：${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: action => {
            location.href = '/order'
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/cart/index.scss';
</style>
