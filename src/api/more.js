import request from '@/utils/request'

export function shouge(data) {
  return request({
    url: '/api/More/shouge',
    method: 'get',
    params: data
  });
}

export function forceShouge(data) {
  return request({
    url: '/api/More/forceShouge',
    method: 'get',
    params: data
  });
}

export function listMoreBuyIsNotFinished(data) {
  return request({
    url: '/api/More/listMoreBuyIsNotFinished',
    method: 'get',
    params: data
  });
}
