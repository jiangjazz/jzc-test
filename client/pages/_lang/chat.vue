<template>
  <div class="page-chat">
    <nuxt-child />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'chat',
  async fetch({store}) {
    await store.dispatch('chat/getMessageList')
  },
  computed: {
    ...mapState('chat', ['messageList'])
  }
}
</script>

