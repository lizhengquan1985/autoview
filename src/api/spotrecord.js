import request from '@/utils/request';

export function fetchSpotRecord(params) {
  return request({
    url: '/api/spotrecord/list',
    method: 'get',
    params,
  });
}

export function fetchSpotRecordDTO(query) {
  return request({
    url: '/api/spotrecord/listdto',
    method: 'get',
    params: query,
  });
}

export function fetchStatisticsLine(query) {
  return request({
    url: '/api/spotrecord/line',
    method: 'get',
    params: query,
  });
}

