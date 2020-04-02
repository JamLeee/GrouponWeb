<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/order">我的订单</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">我的收藏</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">抵用券</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">账户设置</nuxt-link>
          </dd>
        </dl>
      </li>
      <li class="list">
        <nuxt-link to="/app">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/my">我想合作</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">免费开店</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">智能收银</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/my">免费合作</nuxt-link>
          </dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel">
            <dt>我要住酒店</dt>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
            <dd>星级酒店</dd>
          </dl>
          <dl class="food">
            <dt>我要吃美食</dt>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
          </dl>
          <dl class="movie">
            <dt>我要看电影</dt>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
            <dd>特色美食</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd>
              <a href="http://">
                <img
                  class="appicon"
                  src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                />
              </a>
            </dd>
            <dd>
              <a href="http://">
                <img
                  class="appicon"
                  src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                />
              </a>
            </dd>
            <dd>
              <a href="http://">
                <img
                  class="appicon"
                  src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                />
              </a>
            </dd>
            <dd>
              <a href="http://">
                <img
                  class="appicon"
                  src="//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                />
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/header/topbar.scss';
</style>
