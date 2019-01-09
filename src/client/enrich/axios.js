import axios from 'axios'
import { encrypt } from './crypto'
import { merge } from 'lodash'

export const httpAgent = axios

export const httpsAgent = axios.create()
httpsAgent.interceptors.request.use(request => {
  console.log('asfasdasdasd', process.env.NODE_ENV, request.data)
  let origin = request.data

  if (origin !== null) {
    request.data = {
      cipher: encrypt(origin)
    }

    if (process.env.NODE_ENV !== 'production') {
      request.data.origin = origin
    }
  }

  return request
})

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    merge(axios.defaults, options, process.env.API_CONF)

    Object.defineProperties(Vue.prototype, {
      axios: {
        get () {
          return axios
        }
      },
      $http: {
        get () {
          return axios
        }
      },
      $https: {
        get () {
          return httpsAgent
        }
      }
    })
  }
}
