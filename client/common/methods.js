/*
 * @Author: Janzen 
 * @Date: 2018-05-28 11:54:10 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-06-12 15:00:15
 */

import Vue from 'vue'
import emoji from '~/static/emoticonJson/index.js'

/**
 * 格式化编辑框内容，content转化成data
 * @param {string} content -> 输入内容
 * @param {array} aids -> 图片集合
 */
export const contentToData = function (content, aids) {
  if (typeof content !== 'string') {
    console.log('%c 格式化内容必须为字符串', 'color: red;')
    return false
  }
  let data = content.replace(/\<img src=\"http.*?\>/g, function (match) {
    console.log(match)
    // 最终返还的替换好的字符串
    let repacledStr = match
    let src = match.match(/\"(http.*?)\"/g)[0]
    // 匹配到的url
    let url = src.substring(1, src.length - 1)
    // 检测aids内是否存在该url，如果有则格式化
    aids.some(item => {
      let status = (item.url === url)
      if (status) {
        repacledStr = `[attach]${item.aid}[/attach]`
      }
      return status
    })
    return repacledStr
  }).replace(/</g, '[').replace(/>/g, ']').replace(/&nbsp;/g, '')
  console.log(data)
  return data
}

/**
 * 格式化文本内容, data转化成content
 * @param {string} data -> 接口获取数据
 */
export const formatEmoji = function (data) {
  if (typeof data !== 'string') {
    console.log('只能格式化string内容')
    return false
  }
  let reString = data // 最终返还的字符串
  let emojiImgRg = /\[img[^\]].*?]/g // img字符串正则
  let emojiRg = /\{:\d+_\d+:}/g // 表情包匹配正则
  /* 格式化表情包 */
  let _emojiArr = data.match(emojiRg)
  let _obj = {} // 最终生成的表情包对象 key: {:xx_xx:} value: src
  // 重组所有表情包
  emoji.forEach((item, index) => {
    item.content.forEach((item, index) => {
      _obj[item.alt] = item.src
    })
  })
  // 解决历史遗留问题
  reString = reString.replace(emojiImgRg, (item, index, str) => {
    let match = item.match(emojiRg)
    if (match && match[0]) {
      return match[0]
    } else {
      return item
    }
  })
  // 真正的转译
  reString = reString.replace(emojiRg, (item, index, str) => {
    return `<img src="${_obj[item]}" alt="${item}" data-w-e="1" />`
  })
  return reString
}

/**
 * 格式化时间
 * @param {string|number} str 传入的日期时间戳（计算到秒）
 * @param {number} type 需要转化的时间格式，默认1：精确到秒；2:精确到天
 */
export const formatData = function (value, type = 1) {
  let d = new Date(Number(value) * 1000)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  let hour = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  let result = ''
  switch (type) {
    case 2:
      result = `${year}-${month}-${day}`
      break
    case 1:
    default:
      result = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
      break
  }
  return result
}

/**
 * 格式化 来源
 * @param {string} name -> 来源名称
 */
export const formatDevice = function (name) {
  if (name) {
    if (name.toLowerCase().indexOf('infinix') !== -1) {
      return `from ${name}`
    } else if (name.toLowerCase() === 'pc') {
      return 'from PC'
    } else if (name.toLowerCase() === 'web') {
      return 'from WEB'
    } else {
      return 'from XClub app'
    }
  } else {
    return 'from PC'
  }
}

/**
 * 数量简写
 */
export const formatNumber = function (num) {
  let _num = num || 0
  let len = _num.toString().length
  if (len > 9) {
    return `${Math.ceil(_num / 1000000000)}B`
  } else if (len > 6) {
    return `${Math.ceil(_num / 1000000)}M`
  } else if (len > 3) {
    return `${Math.ceil(_num / 1000)}K`
  } else {
    return _num
  }
}
