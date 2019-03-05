/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:53:44 
 * @Last Modified by:   Janzen 
 * @Last Modified time: 2019-03-04 18:53:44 
 */
<template>
  <div class="page-login">
    login
    <input class="u-input" v-model="username" type="text" name="username">
    <input class="u-input" v-model="password" type="password" name="password" @keyup.enter="login">
    <button @click="login">Login</button>

    <button @click="checklogin">CheckLogin</button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      //
      username: '',
      //
      password: ''
    }
  },
  methods: {
    // 登陆
    login() {
      console.log(123123)
      let { username, password } = this
      this.$store.dispatch('account/login', {
        username,
        password
      })
    },
    //
    checklogin() {
      this.$store.dispatch('account/checkLogin')
    }
  }
}
</script>
<style lang="stylus" scoped>
.u-input
  border: 1px solid red
</style>

