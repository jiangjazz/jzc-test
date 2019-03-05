/*
 * @Author: Janzen 
 * @Date: 2018-11-05 15:02:11 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-01 15:02:37
 */
/**
 * axios配置
 */
export default function ({
  $axios,
  redirect
}) {
  $axios.onRequest(config => {
    console.log('Making request to ', config)
  })
  $axios.onResponse(res => {
    console.log(res, 8848)
    // console.log(data.data)
    return res
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
