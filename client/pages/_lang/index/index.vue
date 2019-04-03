<template>
  <AppScroll :pullUp="pullUp" :size="recomLimit" :count="Number(recomCount)">
    <HomeBanner />
    <HomeRecomList />
  </AppScroll>
</template>

<script>
import { mapState } from 'vuex'
import HomeBanner from '~/components/home/Banner'
import HomeRecomList from '~/components/home/RecomList'

export default {
  name: 'foryou',
  components: {
    HomeBanner,
    HomeRecomList
  },
  async fetch({ store }) {
    await store.dispatch('home/getBannerList')
    await store.dispatch('home/getRecomList', {})
  },
  computed: {
    ...mapState('home', ['recomList', 'recomCount', 'recomLimit'])
  },
  methods: {
    /**
     * 上拉或者刷新加载数据
     * @param {number} num 当前页码
     */
    async pullUp({ num }) {
      let resStatus = await this.$store.dispatch('home/getRecomList', {
        page: num
      })

      return new Promise((resolve, reject) => {
        if (resStatus) {
          resolve(this.recomList)
        } else {
          reject()
        }
      })
    }
  }
}
</script>
