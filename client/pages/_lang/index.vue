/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:53:34 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-10 16:48:33
 */
<template>
  <div class="page-home">
    <AppHeader />
    <AppNav />
    <v-container id="home_content" class="home_content">
      <v-layout v-scroll:#home_content="onScroll" column justify-center align-center>
        <v-flex xs12 class="banner_ct">
          <HomeBanner />
          <HomeRecomList />
        </v-flex>

      </v-layout>
    </v-container>
    <div class="text-xs-center" v-show="isLoading">
      <v-progress-circular class="" indeterminate color="#999999"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  data() {
    return {
      isLoading: false,
      // 只在移动端滚动触发使用
      page: this.$route.query.page || 1
    }
  },
  computed: {
    ...mapState('home', ['recomCount', 'recomLimit'])
  },
  methods: {
    onScroll(e) {
      let { scrollHeight = 0, scrollTop = 0, clientHeight = 0 } = e.target
      // console.log(scrollHeight, scrollTop, clientHeight)
      if (
        clientHeight > 0 &&
        scrollTop > scrollHeight - clientHeight - 50 &&
        !this.isLoading &&
        this.recomLimit * this.page < this.recomCount
      ) {
        // 当符合触发条件，并且可触发时，才触发
        console.log('条件符合，触发翻页')
        this.page += 1
        this.isLoading = true
        this.$store.dispatch('home/getRecomList', { page: this.page, isMobile: true })
          .then(res => {
            this.isLoading = false
          })
      }
    }
  }
}
</script>
