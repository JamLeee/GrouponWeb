<template>
  <div class="page-order">
    <el-row>
      <el-col :span="6" class="navbar">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :default-openeds="['1','2']"
        >
          <el-menu-item index="0">
            <span slot="title">我的美团</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部订单</el-menu-item>
              <el-menu-item index="1-2">待付款</el-menu-item>
              <el-menu-item index="1-3">待使用</el-menu-item>
              <el-menu-item index="1-4">待评价</el-menu-item>
              <el-menu-item index="1-5">退款/售后</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2" :collapse="false">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的收藏</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部订单</el-menu-item>
              <el-menu-item index="1-2">待付款</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">抵用券</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="table">
          <el-tab-pane label="全部订单" name="first">全部订单</el-tab-pane>
          <el-tab-pane label="待付款" name="second">待付款</el-tab-pane>
          <el-tab-pane label="待使用" name="third">待使用</el-tab-pane>
          <el-tab-pane label="待评价" name="fourth">待评价</el-tab-pane>
          <el-tab-pane label="退款/售后" name="Fifth">退款/售后</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleOpen: function() {},
    handleClose: function() {},
    handleClick: function() {}
  }
}
</script>
<style lang="scss">
@import '@/assets/css/order/index.scss';
</style>
