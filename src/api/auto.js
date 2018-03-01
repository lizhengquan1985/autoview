import request from '@/utils/request'

export function fetchLZQDetail() {
  return request({
    url: '/spotrecord/detail?username=lzq',
    method: 'get'
  })
}

export function fetchYXQDetail() {
  return request({
    url: '/spotrecord/detail?username=yxq',
    method: 'get'
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
