<template>
  <v-container class="page-latest hasNavHeader">
    <v-layout justify-center>
      <v-btn type="success" @click.stop="checkLogin">CheckLogin</v-btn>
      <AppEditor></AppEditor>
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
