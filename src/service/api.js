import request from './http'

export const indexInfo = () => request({
  method: 'POST',
  url: '/index/info',
  data: {}
})

export const indexTimeline = () => request({
  method: 'POST',
  url: '/index/timeline',
  data: {}
})

export const mineBalance = () => request({
  method: 'POST',
  url: '/mine/balance',
  data: {}
})

export const mineToken = (data) => request({
  method: 'POST',
  url: '/mine/token',
  data
})

export const mineLogin = (data) => request({
  method: 'POST',
  url: '/mine/login',
  data
})