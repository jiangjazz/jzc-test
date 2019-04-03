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
  async fetch({ store, query }) {
    let { page = 1 } = query
    await store.dispatch('home/getBannerList')
    await store.dispatch('home/getRecomList', { page })
  },
  computed: {
    ...mapState('home', ['recomList', 'recomCount', 'recomLimit'])
  },
  methods: {
    /**
     * 上拉或者刷新加载数据
     * @param {number} num 当前页码
     * @param {number} size 每页个数
     */
    async pullUp({ num, size }) {
      let resStatus = await this.$store.dispatch('home/getRecomList', {
        page: num + 1,
        isMobile: true
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
