<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部美食</dt>
      <dd v-for="(item,idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseenter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="senter" @mouseleave="sleave">
      <template v-for="(ditem,cidx) in curDetail.child">
        <h4 :key="cidx">{{ ditem.title }}</h4>
        <span v-for="v in ditem.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kind: '',
      MenuList: [
        {
          name: '机票 / 火车票',
          type: 'airport',
          child: [
            {
              title: '机票',
              child: ['国内机票', '国际/港澳台机票']
            },
            {
              title: '火车票',
              child: ['火车票']
            }
          ]
        },
        {
          type: 'food',
          name: '美食',
          child: [
            { title: '美食', child: ['火锅', '串串', '烤肉', '海鲜'] },
            { title: '美食', child: ['火锅', '串串', '烤肉', '海鲜'] }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            { title: '外卖', child: ['外卖', '外卖', '外卖', '外卖'] },
            { title: '外卖', child: ['外卖', '外卖', '外卖', '外卖'] }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            { title: '酒店', child: ['酒店', '酒店', '酒店', '酒店'] },
            { title: '酒店', child: ['酒店', '酒店', '酒店', '酒店'] }
          ]
        }
      ]
    }
  },
  computed: {
    curDetail: function() {
      return this.$store.state.home.menu.filter(
        item => item.type === this.kind
      )[0]
    }
  },
  methods: {
    mouseleave: function() {
      let self = this
      self._time = setTimeout(function() {
        return (self.kind = '')
      }, 200)
    },
    mouseenter: function(e) {
      //this.kind = e.target.querySelector('i').className

      let self = this
      self._timer = setTimeout(function() {
        //获取当前i的class名称
        self.kind = e.target.querySelector('i').className
        console.log(self.kind)
      }, 200)
    },
    senter: function() {
      clearTimeout(this._time)
    },
    sleave: function() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/index/index.scss';
</style>

