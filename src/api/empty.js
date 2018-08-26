import request from '@/utils/request'

export function shouge(data) {
  return request({
    url: '/api/Empty/shouge',
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


export function listEmptySellIsFinishedDetail(data) {
  return request({
    url: '/api/Empty/listEmptySellIsFinishedDetail',
    method: 'get',
    params: data
  });
}

export function listEmptySellIsFinished(data) {
  return request({
    url: '/api/Empty/listEmptySellIsFinished',
    method: 'get',
    params: data
  });
}

export function getEmptySellDetail(data) {
  return request({
    url: '/api/Empty/getEmptySellDetail',
    method: 'get',
    params: data
  });
}
export function deleteEmpty(data) {
  return request({
    url: '/api/Empty/delete',
    method: 'get',
    params: data
  });
}

export function doEmpty(data) {
  return request({
    url: '/api/Empty/doEmpty',
    method: 'post',
    params: data
  });
}

export function doMore(data) {
  return request({
    url: '/api/More/doMore',
    method: 'post',
    params: data
  });
}
