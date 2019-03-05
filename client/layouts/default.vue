/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:52:13 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 19:22:06
 */
<template>
  <v-app>

    <!-- 主体内容 -->
    <v-content class="layout-default">
      <nuxt />
    </v-content>
    <!-- 主体内容 end-->

    <!-- 底部 -->
    <AppFooter />
    <!-- 底部 -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
