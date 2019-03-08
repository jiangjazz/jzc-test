/*
 * @Author: Janzen 
 * @Date: 2019-03-06 13:40:08 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 11:22:22
 */
<template>
  <v-dialog content-class="u-dialog chooseCountryDialog" v-model="visible" max-width="360" scrollable>
    <v-card>
      <!-- 标题 -->
      <v-card-title>
        <v-btn class="u-dialog_close" icon @click="close">
          <v-icon v-text="$vuetify.icons.close"></v-icon>
        </v-btn>
        <span class="u-dialog_title">Country or region</span>
      </v-card-title>
      <!-- 标题 end-->
      <v-divider></v-divider>
      <!-- 内容 -->
      <v-card-text>
        <v-layout class="text-xs-center" row justify-center wrap>
          <v-flex v-for="item in sortCountryList" :key="item.fid" grow>
            <v-chip color="#f1f1f1" :selected="Number(item.fid) === Number(fid)" @click="setCountry(item)">
              <v-avatar>
                <img :src="`${baseUrl}/${item.icon}`" :alt="`${item.country}`">
              </v-avatar>
              {{ item.country }}
            </v-chip>
          </v-flex>
          <!-- 占位空格，美化样式 -->
          <v-flex v-if="sortCountryList.length % 2 !== 0" grow>
            <div class="placeholderItem"></div>
          </v-flex>
          <!-- 占位空格，美化样式 end-->
        </v-layout>
      </v-card-text>
      <!-- 内容 end-->
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import LangJson from '~/static/lang'

export default {
  data() {
    return {
      // 国家JSON数据
      countrys: LangJson
    }
  },
  computed: {
    ...mapState(['baseUrl', 'country']),
    ...mapState('country', ['countryList']),
    ...mapGetters(['fid']),
    // 排序后的国家列表
    sortCountryList() {
      let arr = []
      for (let item in this.countrys) {
        arr.push(this.countrys[item])
      }
      arr = arr
        .sort((a, b) => {
          if (a.country > b.country) {
            return 1
          } else if (a.country < b.country) {
            return -1
          }
          return 0
        })
        .filter((item, index) => {
          return item.fid
        })
      arr.some(item => {
        let status = item.fid === this.country
        if (status) {
          console.log(item, 123123121)
        }
        return status
      })
      // 将Global排序到最后，并且将原数组中从原来的Global位置删除
      arr.forEach((item, index, array) => {
        if (item.country === 'Global') {
          array[array.length] = item
          array.splice(index, 1)
        }
      })
      return arr
    },
    // 弹窗可见
    visible: {
      get() {
        return this.$store.state.countryDialogVisible
      },
      set(value) {
        this.$store.commit('setDialog', { countryDialogVisible: value })
      }
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$store.commit('setDialog', { countryDialogVisible: false })
    },
    /**
     * 点击-选择国家
     * @param {object} item 选中的国家信息
     */
    setCountry(item) {
      let { route } = item
      let { lang = 'global' } = this.$route.params
      let path = this.$route.path
      if (route === 'global') {
        path = path.replace(`/${lang}`, '')
      } else if (lang === 'global') {
        path = `/${route}${path}`
      } else {
        path = path.replace(`/${lang}`, `/${route}`)
      }
      
      this.$router.push(path)

      this.$store.commit('setCountry', item)
      this.$store.commit('setDialog', {countryDialogVisible: false})
    }
  }
}
</script>
