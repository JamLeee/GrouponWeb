<template>
  <div class="m-header">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
            placeholder="请输入商家名称或地点"
          />
          <button class="el-button el-button--primary" @click="searchBtn">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索：</dt>
            <dd v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            :href="'/products?keyword='+encodeURIComponent(item.name)"
            v-for="(item,idx) in $store.state.home.hotPlace"
            :key="idx"
          >{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="text">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="text">不满意退货</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="text">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      search: '',
      searchList: [],
      hotPlace: [],
      isFocus: false
    }
  },
  computed: {
    isHotPlace: function() {
      return this.isFocus && !this.search
    },
    isSearchList: function() {
      return this.isFocus && this.searchList
    }
  },
  methods: {
    focus: function() {
      this.isFocus = true
    },
    blur: function() {
      let self = this
      setTimeout(() => {
        self.isFocus = false
      }, 200)
    },
    input: _.debounce(async function() {
      let self = this
      let city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = [] //清空原有列表内容
      //获取数据
      let {
        status,
        data: { top }
      } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      //把数据填充到searchList中
      self.searchList = top.slice(0, 10)
    }, 10),
    searchBtn: function() {
      window.location.href =
        '/products?keyword=' + encodeURIComponent(this.search)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/header/search.scss';
</style>
