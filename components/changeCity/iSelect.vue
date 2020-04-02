<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      pvalue: '',
      cvalue: '',
      province: [],
      city: [],
      input: '',
      cities: []
    }
  },
  watch: {
    //通过监听pvalue值获取city的数据，并用map方法将数据一一对应
    pvalue: async function(newPvalue) {
      let self = this
      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  //加载的时候把所有省份请求回来
  mounted: async function() {
    let self = this
    let {
      status,
      data: { province }
    } = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      let self = this
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 100),
    handleSelect: function(item) {
      location.href = `localhost:3000/${item.value}`
      console.log(item.value)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changeCity/iSelect.scss';
</style>
