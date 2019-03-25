<template>
  <div class="page-index">
    <AppHeader />
    <AppNav />
    <v-container>
      <v-layout justify-center>
        <v-btn type="success" @click.stop="checkLogin">CheckLogin</v-btn>
        <AppEditor></AppEditor>
      </v-layout>
    </v-container>
  </div>
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

