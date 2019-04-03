/*
 * @Author: Janzen 
 * @Date: 2019-03-09 15:49:31 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-03 15:23:32
 */
<template>
  <section class="recomList" id="recomList">
    <v-card v-for="item in recomList" :key="`${item.tid}`">
      <AppLink :to="`/forum/${item.fid}/${item.tid}`">
        <v-img :src="`${baseUrl}/${item.mpic}`" lazy-src="./images/home/lazyload.png" :alt="item.discribe"></v-img>
      </AppLink>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-actions>
        <v-btn small flat class="author" nuxt :to="linkTo(item.authorid)">{{ item.author }}</v-btn>
        <span>{{ formatData(item.dateline) }}</span>
        <v-spacer />
        <div class="right_actions">
          <v-icon small v-text="$vuetify.icons.eye"></v-icon>
          {{formatNumber(item.views)}}
          <v-icon small v-text="$vuetify.icons.message"></v-icon>
          {{formatNumber(item.replies)}}
        </div>
      </v-card-actions>
    </v-card>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { formatData, formatNumber } from '~/common/methods.js'

export default {
  computed: {
    ...mapState(['baseUrl', 'uid']),
    ...mapState('home', ['recomList', 'recomCount']),
    ...mapGetters(['preLink'])
  },
  methods: {
    formatData,
    formatNumber,
    // 最终的链接
    linkTo(id) {
      let link = `${this.preLink}/ucenter`
      if (Number(this.uid) !== Number(id)) {
        link += `?uid=${id}`
      }
      return link
    }
  }
}
</script>

