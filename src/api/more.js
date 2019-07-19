import request from '@/utils/request';

export function shouge(data) {
  return request({
    url: '/api/More/shouge',
    method: 'get',
    params: data,
  });
}

export function listMoreOrderIsNotFinished(data) {
  return request({
    url: '/api/More/listMoreOrderIsNotFinished',
    method: 'get',
    params: data,
  });
}

export function listMoreOrderIsFinished(data) {
  return request({
    url: '/api/More/listMoreOrderIsFinished',
    method: 'get',
    params: data,
  });
}

export function deleteMore(data) {
  return request({
    url: '/api/More/delete',
    method: 'delete',
    params: data,
  });
}

export function emptyInfo(data) {
  return request({
    url: '/api/Empty/emptyInfo',
    method: 'get',
    params: data,
  });
}

export function moreInfo(data) {
  return request({
    url: '/api/More/moreInfo',
    method: 'get',
    params: data,
  });
}

export function listDogMoreBuyNotFinishedStatistics(data) {
  return request({
    url: '/api/More/listDogMoreBuyNotFinishedStatistics',
    method: 'get',
    params: data,
  });
}

export function listNotFilledData(data) {
  return request({
    url: '/api/More/listNotFilledData',
    method: 'get',
    params: data,
  });
}

