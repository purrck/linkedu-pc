import axios from '@/axios/axios';
import {baseUrl, dicUrl, khglUrl, ortherUrl} from '@/config/env';

export default {

  // 增加列表
  add(params) {
    return axios({
      url: `${baseUrl}/base/basicSchoolOrgAd/add`,
      method: 'post',
      data: params
    })
  },
  // 获取单一数据
  getById(params) {
    return axios({
      //url: `http://192.168.2.85:1234/static/mock/schoolGetById.json`,
      url: `${baseUrl}/base/basicSchoolOrgAd/${params.id}`,
      method: 'get'
    })
  },
  // 获取集合
  getList(params) {
    return axios({
      //url: `/static/mock/basicSchoolOrgAd.json`,
      url: `${baseUrl}/base/basicSchoolOrgAd/page`,
      method: 'get',
      params: params
    })
  },
  // 编辑
  edit(params) {
    return axios({
      //url: `http://localhost:1234/static/mock/schoolEdit.json`,
      url: `${baseUrl}/base/basicSchoolOrgAd/edit`,
      method: 'put',
      data: params
    })
  },
  // 批量删除
  lotDel(params) {
    return axios({
      //url: `http://localhost:1234/static/mock/basicSchoolOrgAd.json`,
      url: `${baseUrl}/base/basicSchoolOrgAd`,
      method: 'delete',
      data: params
    })
  },
  // 获取全部集合
  getAllList() {
    return axios({
      url: `${baseUrl}/base/basicSchoolOrgAd`,
      //url: `http://localhost:1234/static/mock/basicSchoolOrgAd.json`,
      method: 'get'
    })
  },
}
