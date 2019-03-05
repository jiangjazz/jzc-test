/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:49:07 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 18:50:25
 */
<template>
  <v-toolbar class="m-header" :clipped-left="false">
    <v-btn icon>
      <i class="iconfont icon-search-o"></i>
    </v-btn>
    <v-spacer />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn icon @click.stop="">
      <i class="iconfont icon-user"></i>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      // 标题
      title: 'Infinix',
    }
  }
}
</script>

