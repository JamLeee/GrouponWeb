<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <Mmenu />
      </el-col>
      <el-col :span="19">
        <my-life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <my-style />
    </el-row>
  </div>
</template>

<script>
import Mmenu from '../components/index/menu.vue'
import MyLife from '../components/index/life.vue'
import MyStyle from '../components/index/artistic.vue'
export default {
  components: {
    Mmenu,
    MyLife,
    MyStyle
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
@import '@/assets/css/public/index.scss';
</style>
