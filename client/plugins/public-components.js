/*
 * @Author: Janzen 
 * @Date: 2018-05-23 16:15:55 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-28 16:44:09
 */
import Vue from 'vue'
import AppHeader from '~/components/common/Header'
import AppFooter from '~/components/common/Footer'
import AppNav from '~/components/common/Nav'
import AppLink from '~/components/common/I18Link'
import AppEditor from '~/components/common/WangEditor'
import AppScroll from '~/components/common/Scroll'

Vue.use({
    install(Vue, options) {
        Vue.component('AppHeader', AppHeader)
        Vue.component('AppFooter', AppFooter)
        Vue.component('AppNav', AppNav)
        Vue.component('AppLink', AppLink)
        Vue.component('AppEditor', AppEditor)
        Vue.component('AppScroll', AppScroll)
    }
})
