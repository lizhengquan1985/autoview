import request from '@/utils/request';

export function shouge(data) {
  return request({
    url: '/api/Empty/shouge',
    method: 'get',
    params: data,
  });
}

export function listEmptyOrderIsNotFinished(data) {
  return request({
    url: '/api/Empty/listEmptyOrderIsNotFinished',
    method: 'get',
    params: data,
  });
}

export function listEmptyOrderIsFinished(data) {
  return request({
    url: '/api/Empty/listEmptyOrderIsFinished',
    method: 'get',
    params: data,
  });
}

export function listEmptySellIsFinished(data) {
  return request({
    url: '/api/Empty/listEmptySellIsFinished',
    method: 'get',
    params: data,
  });
}

export function deleteEmpty(data) {
  return request({
    url: '/api/Empty/delete',
    method: 'delete',
    params: data,
  });
}

export function doEmpty(data) {
  return request({
    url: '/api/Empty/doEmpty',
    method: 'post',
    params: data,
  });
}

export function doMore(data) {
  return request({
    url: '/api/More/doMore',
    method: 'post',
    params: data,
  });
}
