/*
 * @Author: Janzen 
 * @Date: 2019-03-06 16:41:31 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 11:27:32
 */
/* eslint-disable */

export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
  commit
}) {

  // console.log('%ci18插件', 'background: black; color: white;')
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // 默认路由
  const defaultLocale = app.i18n.fallbackLocale
  let locale = store.state.locale || defaultLocale
  let paramsLocale = params.lang || defaultLocale
  app.i18n.locale = paramsLocale
  // 读取API的国家列表
  let LangJson = store.getters.formatCountryList

  // 检测是否为不存在的页面，是则跳转
  if (route.matched && route.matched.length === 0) {
    return error({
      message: 'This page could not be found.',
      statusCode: 404
    })
  }
  // console.log(1111, paramsLocale, locale, route.fullPath)
  if (params.lang === 'global') {
    let str = route.fullPath.replace('/global', '')
    // 空路由不会触发跳转，必须为 /
    str = str === '' ? '/' : str
    return redirect(str)
  } else {
    if (paramsLocale !== locale) {
      store.commit('setCountry', LangJson[paramsLocale])
    }
  }
}
