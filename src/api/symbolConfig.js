import request from '@/utils/request';

export function upsertSymbolConfig(data) {
  return request({
    url: '/api/SymbolConfig/upsertSymbolConfig',
    method: 'post',
    data,
  });
}

export function listSymbolConfig(params) {
  return request({
    url: '/api/SymbolConfig/listSymbolConfig',
    method: 'get',
    params,
  });
}

export function refreshHistoryMaxMin(data) {
  return request({
    url: '/api/SymbolConfig/refreshHistoryMaxMin',
    method: 'put',
    params: data,
  });
}
