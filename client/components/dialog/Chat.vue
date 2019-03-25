/*
 * @Author: Janzen 
 * @Date: 2019-03-12 11:43:04 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-12 12:48:25
 */
<template>
  <v-dialog content-class="u-dialog chatDialog" v-model="visible" fullscreen scrollable @scroll.stop>
    <v-card>

      <AppHeader>
        <!-- 左侧按钮 -->
        <div slot="left">
          <v-btn icon>
            <v-icon v-text="$vuetify.icons.add"></v-icon>
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

      <!-- 标题 -->
      <v-card-title>
        <!-- <v-btn class="u-dialog_close" icon @click="close">
          <v-icon v-text="$vuetify.icons.close"></v-icon>
        </v-btn> -->
        <span class="u-dialog_title">Country or region</span>
      </v-card-title>
      <!-- 标题 end-->
      <v-divider></v-divider>
      <!-- 内容 -->
      <v-card-text>
        <v-layout class="text-xs-center" row justify-center wrap>
          <v-textarea name="input-7-1" value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            no-resize></v-textarea>
        </v-layout>
      </v-card-text>
      <!-- 内容 end-->
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    // 弹窗可见
    visible: {
      get() {
        return this.$store.state.chatDialogVisible
      },
      set(value) {
        this.$store.commit('setDialog', { chatDialogVisible: value })
      }
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$store.commit('setDialog', { chatDialogVisible: false })
    }
  },
  mounted() {
    console.log('asdadas')
  }
}
</script>

