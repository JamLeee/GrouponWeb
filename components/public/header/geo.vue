<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{$store.state.geo.position.city}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>[广州 中山 惠州]
  </div>
</template>
<script>
export default {}
</script>
