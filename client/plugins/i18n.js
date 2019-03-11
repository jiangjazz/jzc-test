/*
 * @Author: Janzen 
 * @Date: 2019-03-06 16:38:35 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-10 21:09:56
 */
/* eslint-disable */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({
  app,
  store
}) => {
  let langs = {
    'en': require('~/locales/en.json'),
    'fr': require('~/locales/fr.json')
  }
  let messages = {}
  // 读取API的国家列表
  let LangJson = store.getters.formatCountryList
  for (let item in LangJson) {
    messages[LangJson[item].route] = langs[LangJson[item].lang]
  }
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'global',
    messages
  })
}
