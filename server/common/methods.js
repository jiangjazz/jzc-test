/**
 * 生成cookie字符串
 */
function formatCookie(cookieArr) {
  let str = '' 
  let arr = cookieArr.map(item => {
    return item.split(';')[0] || ''
  }).filter(item => {
    if (!!item && item.indexOf('=') >= 0) {
      return true
    } else {
      return false
    }
  })
  if (arr.length > 0) {
    str = arr.join(';')
  }
  return str
}

module.exports = {
  formatCookie
}