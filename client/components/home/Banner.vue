/*
 * @Author: Janzen 
 * @Date: 2019-03-08 15:33:12 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 16:03:15
 */
<template>
<v-responsive :aspect-ratio="11/4">
  <v-carousel class="home_banner" interval="600000">
    <v-carousel-item v-for="item in bannerList" :key="item.bid" :src="`${baseUrl}/${item.pic}`"></v-carousel-item>
  </v-carousel>
  </v-responsive>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['baseUrl']),
    ...mapState('home', ['bannerList'])
  }
}
</script>
