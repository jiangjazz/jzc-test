<template>
  <AppScroll ref="indexScroll" :pullUp="pullUp" :size="recomLimit" :count="Number(recomCount)">
    <HomeBanner />
    <HomeRecomList ref="list" />
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
  // async fetch({ store }) {
  //   await store.dispatch('home/getBannerList')
  //   await store.dispatch('home/getRecomList', {})
  // },
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
  },
  // keep alive组件在切换时滚动至相应位置
  activated() {
    let indexScroll = this.$refs.indexScroll
    if (indexScroll) {
      indexScroll.beforeRouteEnter()
    }
  },
  // keep alive组件在切换时记录当前位置信息
  deactivated() {
    let indexScroll = this.$refs.indexScroll
    if (indexScroll) {
      indexScroll.beforeRouteLeave()
    }
  },
  mounted() {
    this.$store.dispatch('home/getBannerList')
    this.$store.dispatch('home/getRecomList', {})
  }
}
</script>
