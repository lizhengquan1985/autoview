import request from '@/utils/request';

export function listDogControl(params) {
  return request({
    url: '/api/Control/list',
    method: 'get',
    params,
  });
}

export function createDogControl(data) {
  return request({
    url: '/api/Control/new',
    method: 'post',
    data,
  });
}

export function refreshHistoryMaxMin(data) {
  return request({
    url: '/api/Control/refreshHistoryMaxMin',
    method: 'get',
    params: data,
  });
}

export function initEmptyPrice(data) {
  return request({
    url: '/api/Control/initEmpty30Percent',
    method: 'put',
    params: data,
  });
}

export function getFlexCount(data) {
  return request({
    url: '/api/Control/getFlexCount',
    method: 'get',
    params: data,
  });
}

export function initAccountInfo(data) {
  return request({
    url: '/api/Control/initAccountInfo',
    method: 'get',
    params: data,
  });
}
