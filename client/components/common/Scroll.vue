<template>
  <!--mescroll滚动区域的基本结构-->
  <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <!--内容...-->
    <div>
      <slot></slot>
      <!-- <div v-for="(item, index) in dataList" :key="index">
        {{item}}
        <br /><br />
      </div> -->
    </div>
  </mescroll-vue>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'

export default {
  props: {
    // 每页数据条数,默认10
    size: {
      type: Number,
      default: 10
    },
    // 总数
    count: {
      type: Number,
      required: true,
      default: 0
    },
    // 上拉加载数据函数
    pullUp: {
      type: Function,
      required: true,
      default() {
        return () => {}
      }
    }
  },
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        textInOffset: 'Pull Down To Refresh', // 下拉的距离在offset范围内的提示文本
        textOutOffset: 'Release To Refresh', // 下拉的距离大于offset范围的提示文本
        textLoading: 'Loading' // 加载中的提示文本
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        //以下是一些常用的配置,当然不写也可以的.
        // 是否在初始化完毕之后自动执行一次下拉刷新的回调
        auto: false,
        page: {
          num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: this.size //每页数据条数,默认10
          // size: 10 //每页数据条数,默认10
        },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">Loading...</p>',
        htmlNodata: '<p class="upwarp-nodata">No more data</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: './static/mescroll/mescroll-totop.png', //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        }
        // empty: {
        //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //   warpId: 'xxid', //父布局的id (1.3.5版本支持传入dom元素)
        //   icon: './static/mescroll/mescroll-empty.png', //图标,默认null,支持网络图
        //   tip: '暂无相关数据~' //提示
        // }
      },
      dataList: [] // 列表数据
    }
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      let _this = this
      let hasNext = (page.num) * this.size < this.count
      console.log(page.num, page.size, this.count, 888888)
      this.pullUp(page)
        .then(res => {
          // 数据渲染成功后,隐藏下拉刷新的状态
          _this.$nextTick(() => {
            console.log(res.length, this.count, 77777)
            mescroll.endSuccess(res.length, hasNext)
          })
        })
        .catch(err => {
          //     // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    }
  }
}
</script>

<style scope>
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: absolute;
  top: 104px;
  bottom: 0;
  height: auto;
}
.page-test:after {
  clear: both;
}
</style>