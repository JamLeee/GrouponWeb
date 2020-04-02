<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :keyword="item.name"
        :class="[item.name,item.active?'s-nav-active':'']"
        @click="navSelect"
      >{{item.txt}}</dd>
    </dl>
    <dl>
      <ul>
        <Item v-for="(item,idx) in list" :key="idx" :meta="item" />
      </ul>
    </dl>
  </div>
</template>
<script>
import Item from '@/components/products/product.vue'

export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: 'true'
        },
        {
          name: 's-price',
          txt: '按价格',
          active: 'false'
        }
      ],
      tag: 0
    }
  },

  methods: {
    navSelect: function(e) {
      let NList = this.list
      let order = e.currentTarget.getAttribute('keyword')
      let tag = this.tag
      if (order === 's-price') {
        if (tag === 0) {
          NList.sort((a, b) => a.rate - b.rate)
          this.tag = 1
        } else {
          NList.sort((a, b) => b.rate - a.rate)
          this.tag = 0
        }
      } else if (order === 's-default') {
        console.log(NList)
      }
      this.list = NList
    },
    Mlocation: function() {
      console.log(this.key)
    }
  }
}
</script>
