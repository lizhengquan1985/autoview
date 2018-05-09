import request from '@/utils/request'
export function listTodayTrade(query) {
  return request({
    url: '/api/day/listTodayTrade',
    method: 'get',
    params: query
  })
}

export function listPigMoreStatisticsDay(query) {
  return request({
    url: '/api/day/listPigMoreStatisticsDay',
    method: 'get',
    params: query
  })
}

export function kline(query) {
  return request({
    url: '/api/day/kline',
    method: 'get',
    params: query
  })
}
