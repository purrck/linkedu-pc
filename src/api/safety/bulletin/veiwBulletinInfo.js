import axios from '../../../axios/axios'
import { baseUrl, khglUrl, dicUrl } from '@/config/env'

export function getObj(id) {
  return axios({
    url: baseUrl + '/bulletin/bulletinInfo/' + id,
    method: 'get'
  })
}

export function pass(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinInfo/verifyPass',
    method: 'put',
    data: obj
  })
}

export function reject(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinInfo/verifyReject',
    method: 'put',
    data: obj
  })
}

export function fetchBulletinTypeCodeList() {
  return axios({
    url: baseUrl + '/bulletin/bulletinRedis/infoType',
    method: 'get'
  })
}

export function getReceiptNum(bulletinId) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/getReceiptNum',
    params: bulletinId,
    method: 'get'
  })
}
