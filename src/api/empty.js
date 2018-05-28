import request from '@/utils/request'

export function shouge(data) {
  return request({
    url: '/api/Empty/shouge',
    method: 'get',
    params: data
  });
}

export function forceShouge(data) {
  return request({
    url: '/api/Empty/forceShouge',
    method: 'get',
    params: data
  });
}

export function listEmptySellIsNotFinished(data) {
  return request({
    url: '/api/Empty/listEmptySellIsNotFinished',
    method: 'get',
    params: data
  });
}
