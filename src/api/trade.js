import request from '@/utils/request'

export function fetchTradeRecord(params) {
  return request({
    url: '/api/traderecord',
    method: 'get',
    params
  })
}
