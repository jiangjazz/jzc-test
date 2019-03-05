/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:52:13 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-05 18:15:10
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

    <!-- 弹窗 -->
    <LoginDialog />
    <!-- 弹窗 end-->

    <!-- 全局提示信息框 -->
    <Popmsg />
    <!-- 全局提示信息框 end-->
  </v-app>
</template>

<script>
import LoginDialog from '~/components/dialog/Login'
import Popmsg from '~/components/common/Popmsg'

export default {
  components: {
    LoginDialog,
    Popmsg
  }
}
</script>
