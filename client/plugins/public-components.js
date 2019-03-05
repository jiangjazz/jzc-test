/*
 * @Author: Janzen 
 * @Date: 2018-05-23 16:15:55 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 19:21:22
 */
import Vue from 'vue'
import AppHeader from '~/components/common/Header'
import AppFooter from '~/components/common/Footer'
import AppNav from '~/components/common/Nav'

Vue.use({
    install(Vue, options) {
        Vue.component('AppHeader', AppHeader)
        Vue.component('AppFooter', AppFooter)
        Vue.component('AppNav', AppNav)
    }
})
