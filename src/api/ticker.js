import request from '@/utils/request';

export function listTickerSymbolDTO(data) {
  return request({
    url: '/api/Ticker/listTickerSymbolDTO',
    method: 'get',
    params: data,
  });
}

