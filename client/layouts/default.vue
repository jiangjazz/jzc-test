/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:52:13 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-12 11:50:01
 */
<template class="layout-default">
  <v-app>
    <!-- 主体内容 -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- 主体内容 end-->

    <!-- 底部 -->
    <AppFooter />
    <!-- 底部 -->

    <!-- 弹窗 -->
    <LoginDialog />
    <ChooseCountryDialog />
    <ChatDialog />
    <!-- 弹窗 end-->

    <!-- 全局提示信息框 -->
    <Popmsg />
    <!-- 全局提示信息框 end-->
  </v-app>
</template>

<script>
import LoginDialog from '~/components/dialog/Login'
import ChooseCountryDialog from '~/components/dialog/ChooseCountry'
import ChatDialog from '~/components/dialog/Chat'

import Popmsg from '~/components/common/Popmsg'

export default {
  components: {
    LoginDialog,
    ChooseCountryDialog,
    ChatDialog,
    Popmsg
  }
}
</script>
