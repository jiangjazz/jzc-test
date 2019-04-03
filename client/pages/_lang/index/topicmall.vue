<template>
  <AppScroll :pullUp="pullUp" :size="recomLimit" :count="Number(recomCount)">
    <HomeRecomList />
  </AppScroll>
</template>

<script>
import { mapState } from 'vuex'
import HomeRecomList from '~/components/home/RecomList'

export default {
  name: 'topicmall',
  components: {
    HomeRecomList
  },
  async fetch({ store }) {
    await store.dispatch('home/getRecomList', {})
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
