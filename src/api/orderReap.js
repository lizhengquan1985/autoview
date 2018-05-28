import request from '@/utils/request'

export function createOrderReap(data) {
  return request({
    url: '/api/OrderReap/new',
    method: 'post',
    data
  });
}
