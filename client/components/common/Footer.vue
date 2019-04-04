/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:51:54 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-04 15:41:19
 */
<template>
  <div class="v-item-group v-bottom-nav theme--light v-bottom-nav--fixed v-bottom-nav--active white m-footer">
    <v-btn v-for="item in items" :key="item.name" :class="{'v-btn--active': isActive(item)}" color="teal" flat :to="item.to" exact>
      <span>{{ item.name }}</span>
      <v-icon v-text="$vuetify.icons[item.icon]"></v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      // classname
      className: 'm-footer'
    }
  },
  computed: {
    ...mapGetters(['preLink', 'username']),
    // 导航数据
    items() {
      return [
        { to: { path: `${this.preLink}/` }, name: 'foryou', icon: 'home' },
        {
          to: { path: `${this.preLink}/ranking` },
          name: 'ranking',
          icon: 'topics'
        },
        { to: { path: `${this.preLink}/task` }, name: 'task', icon: 'user' }
      ]
    }
  },
  methods: {
    /**
     * 当前tab是否被选中
     * @param {obj} ite 当前数据
     */
    isActive(ite) {
      let { path } = this.$route
      let name = 'none'
      this.items.some((item, i) => {
        let status = item.to.path === path
        if (status) {
          name = item.name
        }
        return status
      })
      return name === ite.name
    }
  }
}
</script>
