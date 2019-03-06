/*
 * @Author: Janzen 
 * @Date: 2019-03-06 16:41:31 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-06 16:51:07
 */
/* eslint-disable */
import LangJson from '~/static/lang'

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

  // 检测是否为不存在的页面，是则跳转
  if (route.matched && route.matched.length === 0) {
    return error({
      message: 'This page could not be found.',
      statusCode: 404
    })
  }
  // console.log(1111, paramsLocale, locale, route.fullPath)
  if (paramsLocale !== locale) {
    // console.log(1111111111)
    store.commit('setCountry', LangJson[paramsLocale])
  }
}
