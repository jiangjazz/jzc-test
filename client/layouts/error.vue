/*
 * @Author: Janzen 
 * @Date: 2019-03-08 09:56:07 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 16:35:41
 */
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <AppLink to="/">Home page</AppLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['error'],
  // layout: 'default' // you can set a custom layout for the error page
}
</script>
