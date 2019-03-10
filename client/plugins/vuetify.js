import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import * as directives from 'vuetify/es5/directives'
import colors from 'vuetify/es5/util/colors'
const MY_ICONS = {
  'complete': '',
  'cancel': '',
  'close': 'iconfont icon-close',
  'delete': '', // delete (e.g. v-chip close)
  'clear': '',
  'success': '',
  'info': '',
  'warning': '',
  'error': '',
  'prev': '',
  'next': '',
  'checkboxOn': 'iconfont icon-right-circle-o',
  'checkboxOff': 'iconfont icon-close-o',
  'checkboxIndeterminate': '',
  'delimiter': '', // for carousel
  'sort': '',
  'expand': '',
  'menu': '',
  'subgroup': '',
  'dropdown': '',
  'radioOn': '',
  'radioOff': '',
  'edit': '',
  // new add
  'search': 'iconfont icon-search-o',
  'user': 'iconfont icon-user',
  'eye': 'iconfont icon-eye-w',
  'message': 'iconfont icon-message-square-w',
}

Vue.use(Vuetify, {
  iconfont: 'iconfont',
  icons: MY_ICONS,
  directives,
  theme: {
    primary: '#03AA4D' || colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: '#FFBF00' || colors.amber.base,
    error: '#d40000' || colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
