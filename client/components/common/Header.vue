/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:49:07 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-04 11:28:30
 */
<template>
  <v-toolbar :class="className" :clipped-left="false" fixed>
    <!-- 左功能按钮 -->
    <slot :className="className" :mclass="`${className}_left`" name="left">
      <v-btn icon>
        <v-icon v-text="$vuetify.icons.search"></v-icon>
        <!-- <i class="iconfont icon-search-o"></i> -->
      </v-btn>
    </slot>
    <!-- 左功能按钮 end-->
    <v-spacer />

    <v-toolbar-title>
      <slot>{{ title }}</slot>
    </v-toolbar-title>
    
    <v-spacer />
    <!-- 右功能按钮 -->
    <slot :className="className" :mclass="`${className}_right`" name="right">
      <v-btn v-if="uid" icon :to="`${preLink}/ucenter`">
        <img :class="`${className}_headpic`" :src="usermsg.member_avatar" />
      </v-btn>
      <v-btn v-else icon @click.stop="showLogin">
        <v-icon v-text="$vuetify.icons.user"></v-icon>
      </v-btn>
    </slot>
    <!-- 右功能按钮 end-->
  </v-toolbar>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    // 标题
    title: {
      type: String,
      default: 'Xclub'
    }
  },
  data() {
    return {
      // 组件的classname
      className: 'm-header'
    }
  },
  computed: {
    ...mapState(['uid', 'usermsg']),
    ...mapGetters(['preLink'])
  },
  methods: {
    // 点击-显示登陆界面
    showLogin() {
      this.$store.dispatch('showDialog', { dialog: 'login' })
    }
  }
}
</script>

