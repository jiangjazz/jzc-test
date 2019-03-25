/*
 * @Author: Janzen 
 * @Date: 2018-05-25 16:48:15 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-25 16:35:24
 */
/**
 * 富文本编辑器
 * 该组件已全局注册
 * demo
 * AppEditor idName="noteEditor" ref="noteEditor" :myContent="editContent" :dataChange="dataChange" :uploadSuccess="uploadSuccess">
 * /AppEditor
 *
 * @param {string} idName -> 生成的组件的id值
 * @param {string} myContent -> 初始化的初始值，仅在初次加载组件时生效
 * @param {function} dataChange -> 内容发生变动触发
 * @param {function} uploadSuccess -> 上传成功后执行，参数 data = {url, aid}
 */
<template>
  <div id="edit" class="u-wangeditor">
    <slot name="comment"></slot>
    <div :id="idName" ref="ccc" style="text-align:left">
    </div>
    <slot name="sendreply"></slot>
    <slot name="edit"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import emotions from '~/static/emoticonJson/index'

const defaultMenus = [
  'head', // 标题
  'bold', // 粗体
  'italic', // 斜体
  // 'underline', // 下划线
  // 'strikeThrough', // 删除线
  // 'foreColor', // 文字颜色
  // 'backColor', // 背景颜色
  'link', // 插入链接
  // 'justify', // 对齐方式
  // 'emoticon', // 表情
  'image', // 插入图片
  'undo' // 撤销
  // 'redo', // 重复
  // 'hidden',
  // 'enclosure'
]
export default {
  name: 'editor',
  props: {
    // id名 防止一个页面多个编辑器
    idName: {
      type: String,
      default: 'editorElem'
    },
    // 需要显示的菜单
    menus: {
      type: Array,
      default() {
        return defaultMenus
      }
    },
    // 默认内容数据
    myContent: {
      type: String,
      default: ''
    },
    /**
     * 数据发生变化后执行
     * @param {string} data ->内容
     */
    dataChange: {
      type: Function,
      default() {
        return data => {}
      }
    },
    /**
     * 图片上传成功后执行
     * @param {string} url -> 上传成功后的img url
     * @param {aid} number -> 上传成功后的img aid
     */
    uploadSuccess: {
      type: Function,
      default() {
        return ({ url, aid }) => {}
      }
    }
  },
  data() {
    return {
      // 编辑器对象
      editor: null,
      // 配置摸人内容
      editorContent: this.myContent,
      // 上传图片状态
      isShowLoading: false
    }
  },
  computed: {
    ...mapState(['baseUrl', 'uid'])
  },
  methods: {
    // 数据更新
    updateData(data) {
      // sync content to component
      this.editorContent = data
      this.dataChange(data)
    },
    /**
     * 该方法必须存在，并且在上传成功后执行
     * @param {obj} error ->上传出错后返还，是接口出错的res参数
     * @param {string} url -> 上传成功后的img url
     * @param {number} aid -> 上传成功后的img aid
     */
    // 上传图片成功执行
    uploaded({ error, url, aid }) {
      console.log(error, url, aid, 11111111)
      if (error) {
        if (error.data.Variables.upload_error) {
          this.$vux.toast.show({
            text: error.data.Variables.upload_error,
            type: 'warn'
          })
        } else {
          this.$vux.toast.show({
            text: error.msg,
            type: 'warn'
          })
        }
      } else {
        this.uploadSuccess({ url, aid })
      }
    }
  },
  mounted() {
    let _this = this
    let Editor = this.$wangEditor
    this.editor = new Editor(`#${this.idName}`)
    /* editor.customConfig.onblur = html => {
      this.updateData(html)
    } */
    this.editor.customConfig.onchange = html => {
      this.updateData(html)
    }
    this.editor.customConfig.lang = {
      设置标题: 'Title',
      正文: 'P',
      链接文字: 'Link text',
      链接: 'Link',
      上传图片: 'Upload Image',
      上传: 'Upload',
      创建: 'Init',
      背景色: 'Background Color',
      文字颜色: 'Font Color',
      插入: 'Insert',
      对齐方式: 'Align',
      靠左: 'Left  ',
      居中: 'Center',
      靠右: 'Right ',
      'http://...': 'Enter the full link URL:'
      // 还可自定添加更多
    }
    // 表情功能
    // this.editor.customConfig.emotions = emotions
    /* 隐藏 */
    // this.editor.hiddenClick = function() {
    // }
    /* 附件 */
    // this.editor.enclosureClick = function() {
    // }
    this.editor.customConfig.debug = true
    // 编辑框z-index
    this.editor.customConfig.zIndex = 100
    // 设置chang事件触发间隔时间
    this.editor.customConfig.onchangeTimeout = 100
    // 自定义菜单配置
    this.editor.customConfig.menus = this.menus.length
      ? this.menus
      : defaultMenus
    // 默认为 10000 张（即不限制），需要限制可自己配置
    this.editor.customConfig.uploadImgMaxLength = 1
    // 隐藏“网络图片”tab
    this.editor.customConfig.showLinkImg = false
    // 配置服务器端地址
    this.editor.customConfig.uploadImgServer = `${
      this.baseUrl
    }/api/mobile/index.php?version=5&module=uploadimage`
    // 自定义filename
    this.editor.customConfig.uploadFileName = 'Filedata'
    this.editor.customConfig.withCredentials = true
    this.editor.customConfig.uploadImgHooks = {
      before(xhr, editor, files) {
        console.log(files)
        _this.isShowLoading = true
      },
      success(xhr, editor, result) {
        console.log('success', result)
        _this.isShowLoading = false
        _this.uploaded({
          url: `${_this.baseUrl}/data/attachment/forum/${
            result.data.Variables.image_name
          }`,
          aid: result.data.Variables.aid
        })
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail(xhr, editor, result) {
        console.log('fail')
        _this.uploaded({
          error: result
        })
        _this.isShowLoading = false
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error(xhr, editor) {
        console.log(xhr, 3333)
        console.log('error')
        _this.isShowLoading = false
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout(xhr, editor) {
        console.log('timeout')
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert(insertImg, result, editor) {
        console.log('insert')
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        console.log(result)
        if (result.data.Variables.image_name) {
          insertImg(
            `${_this.baseUrl}/data/attachment/forum/${
              result.data.Variables.image_name
            }`
          )
        }
        _this.isShowLoading = false
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    this.editor.create()
    // 初始化内容
    this.editor.txt.html(this.myContent)
  }
}
</script>
