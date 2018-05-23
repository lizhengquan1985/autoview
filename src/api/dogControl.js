import request from '@/utils/request'

export function listDogControl() {
  return request({
    url: '/api/Control/list',
    method: 'get'
  });
}

export function createDogControl(data) {
  return request({
    url: '/api/Control/new',
    method: 'post',
    data
  });
}
