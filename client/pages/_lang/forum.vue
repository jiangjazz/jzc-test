<template>
  <div class="page-index">
    <AppHeader />
    <AppNav />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['countryList']),
    ...mapGetters(['formatCountryList'])
  }
}
</script>

