/*
 * @Author: Janzen 
 * @Date: 2019-03-05 18:12:28 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-05 19:50:29
 */
<template>
  <v-snackbar v-model="showSnackbar" @close="close" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
    :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" :color="color">
    {{ popMessage.msg }}
    <v-btn color="pink" flat @click="close">
      <v-icon v-text="$vuetify.icons.close"></v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      y: 'top',
      x: null,
      mode: 'multi-line',
      timeout: 3000
    }
  },
  computed: {
    ...mapState(['popMessage']),
    // 计算当前提示框的类型
    color() {
      let { type='error' } = this.popMessage
      let color = ''
      switch (type) {
        case 'success':
          color = 'success'
          break
        case 'error':
          color = 'error'
          break
        default:
          break
      }
      return color
    },
    // 显示提示框
    showSnackbar: {
      get() {
        return !!this.popMessage.msg
      },
      set(value) {
        this.$store.commit('setPopmsg', {
          msg: ''
        })
      }
    }
  },
  methods: {
    // 关闭提示框
    close() {
      this.showSnackbar = false
    }
  }
}
</script>

