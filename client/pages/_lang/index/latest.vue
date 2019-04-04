<template>
  <v-container class="page-latest hasNavHeader">
    <v-btn type="success" @click.stop="checkLogin">CheckLogin</v-btn>
    <AppEditor></AppEditor>
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
