import request from '@/utils/request'

export function fetchSpotRecord(params) {
  return request({
    url: '/api/spotrecord',
    method: 'get',
    params
  })
}
