<script setup> 
import commonHeader from '../components/commonHeader.vue'
import commonAside from '../components/commonAside.vue'
import commonTag from '@/components/commonTag.vue'
</script>
<template>
  <div class="common-layout">
    <el-container class="lay-container" >
      <commonAside />
      <el-container >
        <commonHeader/>
        <commonTag></commonTag>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.common-layout{
  height: 100%;
  & > .el-container{
    height: 100%;
    align-items: baseline;
    & > .el-aside{
      height: 100%;
      background: #545c64;
    }
  }
  .lay-container{
    flex-wrap:nowrap;
    .right-main{
      height: calc(100% - 114px);
    }
  }
}
.el-container{
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}
</style>