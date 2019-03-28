const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
//
const config = require('./config/index')
// api地址 测试环境
const baseUrl = config.API_URL || ''
const selfUrl = config.SELF_URL || ''

module.exports = {
  mode: 'universal',
  srcDir: 'client',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~assets/iconfont/iconfont.css',
    '~assets/style/app.styl',
    '~assets/stylus/index.styl'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/wangeditor',
      ssr: false
    },
    '@/plugins/vuetify',
    '@/plugins/public-components',
    '@/plugins/axios-client',
    '@/plugins/i18n'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios'
  ],
  /**
   * 配置在客户端和服务端共享的环境变量
   */
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3001',
    // API url
    baseUrl: baseUrl,
    //
    selfUrl: selfUrl
  },
  /**
   * 路由相关
   */
  router: {
    // 中间件
    middleware: ['i18n'],
    // scroll to top
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = {
            x: 0,
            y: 0
          }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = {
            x: 0,
            y: 0
          }
        }
        if (to.hash) {
          position = {
            selector: to.hash
          }
        }
        return position
      }
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: `${process.env.HOST || 'http://0.0.0.0'}:${process.env.PORT || 3001}`,
    browserBaseURL: '',
    credentials: false,
    proxy: {
      '/selfapi': `${process.env.HOST || 'http://0.0.0.0'}:${process.env.PORT || 3001}`
    },
    debug: false,
    retry: {
      retries: 3
    },
    requestInterceptor: (config, {store}) => {
      config.headers.common['Authorization'] = '';
      config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
      return config
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  },
  server: {
    socket: '/tmp/nuxt.socket'
  }
}
