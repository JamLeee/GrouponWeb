<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd
        v-for="(item,idx) in lifeList"
        :key="idx"
        :kind="item.type"
        :class="{active:Akind===item.type}"
        @mouseenter="over"
        :keyword="item.name"
      >{{ item.name }}</dd>
    </dl>
    <ul class="ibody">
      <template v-for="(item,index) in curLifelist.child">
        <li :key="index">
          <el-card shadow="never" :body-style="{ padding: '0px' }">
            <img :src="item.img" />
            <ul class="cbody">
              <li class="title">{{item.title}}</li>
              <li class="pos">
                <span v-for="(feature,featureid) in item.features" :key="featureid">{{feature}}</span>
              </li>
              <li class="price">
                <span>¥</span>
                <em>{{item.price}}</em>
                <span>/起</span>
              </li>
            </ul>
          </el-card>
        </li>
      </template>
    </ul>
  </section>
</template>
<script>
export default {
  data() {
    return {
      Akind: 'all',
      lifeList: [
        {
          type: 'all',
          name: '全部',
          child: [
            {
              img:
                'http://p1.meituan.net/msmerchant/05ddb5ae154b09bfa16936f36f59a5d41352106.jpg',
              title: '必胜客（中心书城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'http://p1.meituan.net/msmerchant/05ddb5ae154b09bfa16936f36f59a5d41352106.jpg',
              title: '必胜客（中心书城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'http://p1.meituan.net/msmerchant/05ddb5ae154b09bfa16936f36f59a5d41352106.jpg',
              title: '必胜客（中心书城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            }
          ]
        },
        {
          type: 'date',
          name: '约会聚餐',
          child: [
            {
              img:
                'https://img.meituan.net/msmerchant/ac23fce050a58e4aee0f746e805c93ff168844.jpg',
              title: '南小馆·玲珑（平安中心店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'https://img.meituan.net/msmerchant/ac23fce050a58e4aee0f746e805c93ff168844.jpg',
              title: '南小馆·玲珑（平安中心店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'https://img.meituan.net/msmerchant/ac23fce050a58e4aee0f746e805c93ff168844.jpg',
              title: '南小馆·玲珑（平安中心店）',
              features: ['早订多减', '早订多减'],
              price: 382
            }
          ]
        },
        {
          type: 'spa',
          name: '丽人SPA',
          child: [
            {
              img:
                'https://p0.meituan.net/wedding/5b52bd4134c6d982536cf83e1a7092c31546829.png',
              title: '首脑美发沙龙（中心城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'https://p0.meituan.net/wedding/5b52bd4134c6d982536cf83e1a7092c31546829.png',
              title: '首脑美发沙龙（中心城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            },
            {
              img:
                'https://p0.meituan.net/wedding/5b52bd4134c6d982536cf83e1a7092c31546829.png',
              title: '首脑美发沙龙（中心城店）',
              features: ['早订多减', '早订多减'],
              price: 382
            }
          ]
        }
      ]
    }
  },
  computed: {
    curLifelist: function() {
      return this.lifeList.filter(item => item.type === this.Akind)[0]
    }
  },
  methods: {
    over: async function(e) {
      let self = this
      let dom = e.currentTarget
      this.Akind = dom.getAttribute('kind')
      let keyword = dom.getAttribute('keyword')
      console.log(this.Akind)
      let {
        status,
        data: { count, poi }
      } = await self.$axios.get('http://cp-tools.cn/search/resultByKeyword', {
        params: {
          keyword,
          city: self.$store.state.geo.position.city
        }
      })
      if ((status === 200, count > 0)) {
        let r = pois
          .filter(item => item.photos.length)
          .map(item => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost || '暂无',
              img: item.photos[0].url,
              url: '//localhost/register'
            }
          })
        self.list[self.kind] = r.slice(0, 9)
      } else {
        self.list[self.kind] = []
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
