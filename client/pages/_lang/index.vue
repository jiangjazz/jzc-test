/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:53:34 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-09 16:31:32
 */
<template>
  <div class="page-home">
    <AppHeader />
    <AppNav />
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 class="banner_ct">
          <HomeBanner />
          <HomeRecomList />
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import HomeBanner from '~/components/home/Banner'
import HomeRecomList from '~/components/home/RecomList'

export default {
  components: {
    HomeBanner,
    HomeRecomList
  },
  async fetch({ store, query }) {
    let { page = 1 } = query
    await store.dispatch('home/getBannerList')
    await store.dispatch('home/getRecomList', { page })
  },
  mounted() {
    // this.$store.dispatch('home/getBannerList')
  }
}
</script>
