<template>
  <div class="tags">
    <el-tag :key="tag.name"
            v-for="(tag,index) in tags"
            :closable="tag.name !=='home'"
            :disable-transitions='false'
            :effect="$route.name == tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="closeTag(tag,index)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { useSelectMenu } from '@/store/Store.js'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    const useTags = useSelectMenu()
   /*JSON.parse(JSON.stringify(tags.value)) 及toRaw()将响应式对象变为普通对象
     这里为什么在state里的tabList直接变为由proxy代理的响应式对象，目前本人猜测是使用的pinia，pinia相对于
     vuex去掉了mutation,为了实现直接可以修改state的值，将state里存储的数据默认做了响应式处理。还未验证，日后关注
     */
    const tags = useTags.tabList
    const router = useRouter()
    const route = useRoute()
    const changeMenu = (tag) => {
      useTags.SelectMenu(tag)
      router.push({ path: tag.path })
    }
/* 关闭tag标签 */
    const closeTag = (tag,index) => {   
      const length = tags.length - 1
      useTags.closeTag(tag)  
     
      // const arr =tags
    		if( index == length ){
          useTags.currentPath =  tags[index-1]/* 修改当前路径信息 */
            router.push({path:tags[index-1].path}) /* 如果每次删除的路由是标签中的最后一个，则跳转前一个 */
          }else {
            useTags.currentPath =  tags[index]
            router.push({path:tags[index].path})/* 往后路由跳转,此时的index对应的值是原当前路由的后一个路由的数据 */
          }
    }
    return {
      tags,
      changeMenu,
      closeTag
    }
  }
}
</script>

<style lang=less scoped>
.tags {
  padding: 15px;
  width: 100%;
  .el-tag {
    margin-right: 12px;
    cursor: pointer;
  }
}
</style>