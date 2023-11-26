import request from '../http'

export const wcLogin = (param) => request({
  method: 'POST',
  url: '/xxx',
  data: param
})

export const wcConfig = () => request({
  method: 'GET',
  url: '/xxx'
})