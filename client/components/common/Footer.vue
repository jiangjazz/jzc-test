/*
 * @Author: Janzen 
 * @Date: 2019-03-04 18:51:54 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-06 16:52:58
 */
<template>
  <v-footer :class="className" :fixed="false" dark height="150">
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row justify-center :reverse="false" fill-height :class="`${className}_action`">
          <v-btn flat small class="item" :to="`${preLink}/`">Home</v-btn>
          <template v-if="uid">
            <v-btn flat small class="item">{{ username }}</v-btn>
            <v-btn flat small class="item" @click.stop="logout">Logout</v-btn>
          </template>
          <template v-else>
            <v-btn flat small class="item">Register</v-btn>
            <v-btn flat small class="item" @click.stop="showLogin">Login</v-btn>
          </template>
        </v-layout>
      </v-flex>
      <v-flex xs12 :class="`${className}_country`">
        <v-layout row justify-center >
          <img class="ctyPic" src="http://xclub.pre.transsion.net/data/attachment/forum/201801/12/021801kdaahyrr231381hz.png" alt="">
          <span @click.stop="showChooseCountry">Global</span>
        </v-layout>
      </v-flex>
      <v-flex xs12 :class="`${className}_copyRight`">
        Copyright @ 2012 - 2018 Infinix. All rights reserved
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      // classname
      className: 'm-footer'
    }
  },
  computed: {
    ...mapState(['uid']),
    ...mapGetters(['preLink', 'username'])
  },
  methods: {
    // 点击-显示登陆界面
    showLogin() {
      this.$store.dispatch('showDialog', {dialog: 'login'})
    },
    // 点击-显示选择国家界面
    showChooseCountry() {
      this.$store.dispatch('showDialog', {dialog: 'country'})
    },
    // 点击-退出登陆
    logout() {
      this.$store.dispatch('account/logout')
        .then(res => {
          // 清除个人信息并提示
          this.$store.commit('setUsermsg', {})
          this.$store.commit('setPopmsg', {
            type: 'success',
            msg: res.msg
          })
        })
    }
  }
}
</script>
