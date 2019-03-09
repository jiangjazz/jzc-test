/*
 * @Author: Janzen 
 * @Date: 2019-03-08 15:33:12 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-09 15:24:35
 */
<template>
  <v-responsive :aspect-ratio="2/1">
    <v-carousel class="home_banner" interval="600000">
      <div v-for="item in bannerList" :key="item.bid">
        <AppLink v-if="item.fid && item.tid" :to="`/forum/${item.fid}/${item.tid}`">
          <v-carousel-item :src="`${baseUrl}/${item.mpic}`"></v-carousel-item>
        </AppLink>
        <v-carousel-item v-else :src="`${baseUrl}/${item.mpic}`"></v-carousel-item>
      </div>
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
