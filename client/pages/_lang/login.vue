/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:53:44 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 09:32:51
 */
<template>
  <div class="page-login">

    <button @click="clearStore">ClearStore</button>
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
    clearStore() {
      this.$axios.$post('/selfapi/common/clearstore')
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.u-input
  border: 1px solid red
</style>

