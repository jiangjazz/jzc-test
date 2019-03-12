<template>
  <div class="page-chatMessage">
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
        <v-flex xs12 class="chatMessage_ct">

          <v-list two-line>
            <template v-for="(item, index) in messageList">
              <v-divider v-show="index!==0" inset :key="index"></v-divider>
              <v-list-tile :key="item.tousername" avatar>
                <v-list-tile-avatar>
                  <img :src="`${baseUrl}/uc_server/avatar.php?uid=${item.touid}&size=big`">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="getTitle(item)"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.message ? formatMessageBrief(item.message) : formatMessageBrief(item.subject)"></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <!-- <v-list-tile-action-text>{{ formatData(item.dateline) }}</v-list-tile-action-text> -->

                  <v-icon color="yellow darken-2" v-text="$vuetify.icons.eye">
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { formatEmoji, formatData } from '~/common/methods.js'

export default {
  name: 'chatMessage',
  computed: {
    ...mapState(['baseUrl', 'uid', 'usermsg']),
    ...mapState('chat', ['messageList']),
    ...mapGetters(['preLink'])
  },
  methods: {
    formatData,
    // 点击-显示登陆界面
    showLogin() {
      this.$store.dispatch('showDialog', { dialog: 'login' })
    },
    // 简略信息
    formatMessageBrief(message) {
      return this.formatMessage(message).replace(
        /[\<\[]img.*?[\>\]]/g,
        '[图片]'
      )
    },
    /**
     * 获取当前标题
     * @param {object} item 信息对象
     **/
    getTitle(item) {
      let str = Number(item.pmtype) === 1 ? item.tousername : item.subject
      return `${str}<span class="dataline">${formatData(item.dateline)}</span>`
    },
    /**
     * 格式化信息
     * @param {string} message 信息
     **/
    formatMessage(message) {
      let msg = message || ''
      return formatEmoji(msg.replace(/\[|</g, '<').replace(/\]|>/g, '>'), true)
    }
  },
  mounted() {
    console.log(this.messageList)
  }
}
</script>

