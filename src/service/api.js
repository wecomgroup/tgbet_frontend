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