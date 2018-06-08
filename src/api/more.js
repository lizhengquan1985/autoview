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

export function listMoreBuyIsFinished(data) {
  return request({
    url: '/api/More/listMoreBuyIsFinished',
    method: 'get',
    params: data
  });
}

export function listMoreBuyIsFinishedDetail(data) {
  return request({
    url: '/api/More/listMoreBuyIsFinishedDetail',
    method: 'get',
    params: data
  });
}

export function getMoreBuyDetail(data) {
  return request({
    url: '/api/More/getMoreBuyDetail',
    method: 'get',
    params: data
  });
}
export function deleteMore(data) {
  return request({
    url: '/api/More/delete',
    method: 'get',
    params: data
  });
}
export function emptyInfo(data) {
  return request({
    url: '/api/Empty/emptyInfo',
    method: 'get',
    params: data
  });
}
