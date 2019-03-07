<template>
  <v-container class="page-index">
    <AppHeader />
    <AppNav />

    <v-layout justify-center>
      <v-btn type="success" @click.stop="checkLogin">CheckLogin</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'latest',
  methods: {
    // 验证登陆
    checkLogin() {
      this.$store.dispatch('account/checkLogin')
    }
  }
}
</script>

