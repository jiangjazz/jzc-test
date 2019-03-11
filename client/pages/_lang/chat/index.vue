<template>
  <div class="">
    <AppHeader>
      <!-- 左侧按钮 -->
      <div slot="left" slot-scope="props">
        <v-btn v-if="uid" icon :to="`${preLink}/ucenter`">
          <img :class="`${props.className}_headpic`" :src="usermsg.member_avatar" />
        </v-btn>
        <v-btn v-else icon @click.stop="showLogin">
          <v-icon v-text="$vuetify.icons.user"></v-icon>
        </v-btn>
      </div>
      <!-- 左侧按钮 end-->
      消息
      <!-- 右侧按钮 -->
      <div slot="right">
        <v-btn icon>
          <v-icon v-text="$vuetify.icons.add"></v-icon>
        </v-btn>
      </div>
      <!-- 右侧按钮 end-->
    </AppHeader>

    <v-container>
      <v-layout column justify-center align-center>

        <v-list two-line>
          <template v-for="(item, index) in messageList">
            <v-divider v-show="index!==0" inset :key="index"></v-divider>
            <v-list-tile :key="item.tousername" avatar>
              <v-list-tile-avatar>
                <img :src="`${baseUrl}/uc_server/avatar.php?uid=${item.touid}&size=big`">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.tousername"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.message || item.subject"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'chatMessage',
  computed: {
    ...mapState(['baseUrl', 'uid', 'usermsg']),
    ...mapState('chat', ['messageList']),
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

