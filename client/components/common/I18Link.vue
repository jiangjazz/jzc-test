/*
 * @Author: Janzen 
 * @Date: 2019-03-08 16:30:57 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 16:34:56
 */
<template>
  <n-link :to="`${preLink}${to}`">
    <slot></slot>
  </n-link>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    // url
    to: {
      type: String,
      required: true,
      default: '/'
    }
  },
  computed: {
    ...mapGetters(['preLink'])
  }
}
</script>

