import axios from 'axios'
const { host } = require('Config')
// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'

// const pro = process.env.NODE_ENV === 'production'
// const test = process.env.NODE_TEST === 'test'

const callApi = (url, method, data, isServer = false, options = {}) => {
  const opts = { ...options }
  const reqContent = Object.assign(
    {},
    {
      method,
      url,
      baseURL: host,
      // baseURL: isServer ? (pro && !test ? `http://${host}/api/` : `http://${host}/api/`) : '/api/',
      // baseURL: 'http://103.80.170.234:8080/1.0/app/',
      // baseURL: 'http://127.0.0.1:8080/1.0/app/',
      headers: {
        'Content-Type': 'application/json',
      },
      params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
      data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
      withCredentials: false, // 请求时是否携带cookie
    },
    opts,
  )

  return axios(reqContent).then(res => res.data)
}

const callGraphql = (url, data, options = {}) => {
  const opts = { ...options }
  const reqContent = Object.assign(
    {},
    {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/graphql',
      },
      data: data, // 适用于 PUT POST PATCH
    },
    opts,
  )
  return axios(reqContent)
}

export default {
  callApi,
  callGraphql,
  get: (url, data = {}, isServer) => callApi(url, 'get', data, isServer),
  put: (url, data = {}, isServer) => callApi(url, 'put', data, isServer),
  post: (url, data = {}, isServer) => callApi(url, 'post', data, isServer),
  delete: (url, data = {}, isServer) => callApi(url, 'delete', data, isServer),
}
