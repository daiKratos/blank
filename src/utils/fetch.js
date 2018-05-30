import qs from 'qs'
import axios from 'axios'
import { router } from '@/router'
import cookie from 'eustia-module/cookie'
import Message from 'iview/src/components/message'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 25000
})

service.interceptors.request.use(
  config => {
    if (['post', 'put', 'delete'].includes(config.method)) config.data = qs.stringify(config.data)
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  res => {
    const { data: body } = res
    if (body) {
      if (body.code === 112) {
        router.push('/login')
        cookie.remove('token')
        cookie.remove('username')
      } else if (body.code === 108) {
        router.push('/employee/login')
        cookie.remove('token')
        cookie.remove('username')
      } else if (body.code !== 0) {
        Message.error(res.data.message)
        return Promise.reject(res)
      }
    }
    return res.data
  },
  error => {
    const { response: res } = error
    switch (res.status) {
      case 403:
        router.push('/403')
        break
      case 404:
        router.push('/404')
        break
      case 500:
        router.push('/500')
        break
    }
    return Promise.reject(error)
  }
)

const fetch = (url, method, config = {}) => service({ url, method, ...config })

export default fetch
