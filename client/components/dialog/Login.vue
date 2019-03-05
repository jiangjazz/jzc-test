/*
 * @Author: Janzen 
 * @Date: 2019-03-05 09:35:35 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-05 20:56:49
 */
<template>
  <v-dialog content-class="u-dialog loginDialog" v-model="visible" max-width="400" :fullscreen="false">
    <v-card>
      <!-- 标题 -->
      <v-card-title>
        <v-btn class="u-dialog_close" icon @click="close">
          <v-icon v-text="$vuetify.icons.close"></v-icon>
        </v-btn>
        <span class="u-dialog_title">Login</span>
      </v-card-title>
      <!-- 标题 end-->
      <v-divider></v-divider>
      <!-- 内容 -->
      <v-card-text>
        <v-form ref="loginForm" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="form.username" :rules="rules.username" label="Email/Username*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="form.password" @keyup.enter="login" :rules="rules.password" label="Password*" type="password"
                required></v-text-field>
            </v-flex>
            <v-flex xs6 class="remember">
              <v-checkbox v-model="form.isRemember" true-value="yes" false-value="no" label="Remember me" color="primary"
                hide-details></v-checkbox>
            </v-flex>
            <v-flex xs6 class="forgetPassword">
              <v-btn flat small>Forgot password ?</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary" block :loading="loading" @click.stop="login">Login</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn block dark>Register</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <!-- 内容 end-->
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 表单数据
      form: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 是否记住密码
        isRemember: 'yes'
      },
      rules: {
        username: [v => !!v || 'The username may not be empty.'],
        password: [v => !!v || 'The password may not be empty.']
      },
      // 交互加载中
      loading: false
    }
  },
  computed: {
    // 弹窗可见
    visible: {
      get() {
        return this.$store.state.loginDialogVisible
      },
      set(value) {
        this.$store.commit('setDialog', { loginDialogVisible: value })
      }
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.reset()
      this.$store.commit('setDialog', { loginDialogVisible: false })
    },
    // 登陆
    login() {
      console.log('验证')
      // if (this.$refs.loginForm.validate()) {
      console.log('验证成功', this.form)
      let { username, password, isRemember } = this.form
      this.loading = true
      this.$store
        .dispatch('account/login', {
          username,
          password,
          loginsubmit: isRemember
        })
        .then(res => {
          console.log(res, 123213)
          this.loading = false
          if (Number(res.code) === 0) {
            this.$store.commit('setUsermsg', res.data.Variables)
            this.close()
          }
        })
        .catch(err => {
          this.loading = false
        })
      // }
    },
    // 重置表单
    reset() {
      this.$refs.loginForm.reset()
    },
    // 重置报错信息
    resetValidation() {
      this.$refs.loginForm.resetValidation()
    }
  }
}
</script>

