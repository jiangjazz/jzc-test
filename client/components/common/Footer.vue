/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:51:54 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-04 12:57:17
 */
<template>
  <v-bottom-nav :class="className" :value="true" fixed height="48px" color="white">
    <v-btn color="teal" flat :to="`${preLink}/`" value="foryou">
      <span>foryou</span>
      <v-icon v-text="$vuetify.icons.home"></v-icon>
    </v-btn>

    <v-btn color="teal" flat :to="`${preLink}/ranking`" value="ranking">
      <span>ranking</span>
      <v-icon v-text="$vuetify.icons.topics"></v-icon>
    </v-btn>

    <v-btn color="teal" flat :to="`${preLink}/task`" value="task">
      <span>task</span>
      <v-icon v-text="$vuetify.icons.user"></v-icon>
    </v-btn>
  </v-bottom-nav>
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
    ...mapGetters(['preLink', 'username'])
  }
}
</script>
