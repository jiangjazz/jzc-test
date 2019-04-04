/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:53:34 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-04 11:50:34
 */
<template>
  <div class="page-home">
    <AppHeader />
    <AppNav />

    <nuxt-child keep-alive />
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>
