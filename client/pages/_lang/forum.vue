<template>
  <div class="page-index">
    <AppHeader />
    <AppNav />

    <v-container>
      <!-- {{ countryList }}
      {{ countryList.length }}
      ===============
      {{ formatCountryList }} -->
    </v-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['countryList']),
    ...mapGetters(['formatCountryList']),
  }
}
</script>

