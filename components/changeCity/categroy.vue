<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择:</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import jspy from 'js-pinyin'
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTYVWXYZ'.split(''),
      block: []
    }
  },
  //异步获取数据
  async mounted() {
    let self = this
    let blocks = [] //创建数组
    let {
      status,
      data: { city }
    } = await self.$axios.get('/geo/city') //获取所有城市
    if (status === 200) {
      let p //城市首字母
      let c //城市的charcode
      let d = {} //临时数组对象
      city.forEach(item => {
        //1、利用js pinyin库的getFullChars方法获取城市的完整拼音转换为小写并取首字母
        p = jspy
          .getFullChars(item.name)
          .toLocaleLowerCase()
          .slice(0, 1)
        c = p.charCodeAt(0)
        if (c > 96 && c < 123) {
          if (!d[p]) {
            //判断字母是否在数组集合中有该字母
            d[p] = []
          }
          //有数组则吧遍历的城市放到该数组中
          d[p].push(item.name)
        }
      })
      //2、遍历临时数组对象转化为数组
      for (let [k, v] of Object.entries(d)) {
        //js遍历对象属性的方法为Object.entries(对象),k和v分别是两个属性值
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      //3、排序
      //js sort排序方法不传参数按照字符编码顺序排序，传参数则可以按照升序和降序，a-b为升序，b-a为升序
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changecity/categroy.scss';
</style>
