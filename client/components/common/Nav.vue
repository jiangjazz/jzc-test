/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:52:00 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 10:23:42
 */
<template>
  <v-tabs class="m-nav" :value="active" color="white" slider-color="green" fixed-tabs grow>
    <!-- <v-tab v-for="item in items" :key="item.label" :to="item.to">
      {{ item.label }}
    </v-tab> -->
    <v-tab v-for="item in items" :key="item.label" :to="`${preLink}${item.to}`">
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      //
      items: [
        { to: '/', label: 'Home' },
        { to: '/latest', label: 'Latest' },
        { to: '/forum', label: 'Forum' }
      ]
    }
  },
  computed: {
    ...mapState(['locale']),
    ...mapGetters(['preLink']),
      // 当前选中
    active() {
      let activeNum = 0
      let { path } = this.$route
      this.items.some((item, index) => {
        if ( path.indexOf(item.to) === 0 ) {
          activeNum = index
          return true
        } else {
          return false
        }
      })
      return activeNum
    }
  }
}
</script>
