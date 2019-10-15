import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'om/news'
const modelName = 'publishArticle'

export default {

  // 获取列表
  fetchList (params) {
    // console.error(params)
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/add`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj (id) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'put',
      data: params,
    })
  },
  getColumnSelect () {
    return axios({
      // url: `${baseUrl}/news/publishColumnAd/top`,
      url: `${baseUrl}/${routePath}/publishColumnAd/getTree`,
      method: 'get'
    })
  },
  /**
   * 通过栏目ID获取模板详情
   * @param columnId {String}
   * @returns {AxiosPromise}
   */
  getTemplateDetailByColumnId ({columnId}) {
    //http://192.168.2.161:9999/news/publishColumnAd/getTemplateByColumnId?columnId=4a5fab96c0a80c310a846d549a18153b
    return axios({
      url: `${baseUrl}/${routePath}/publishColumnAd/getTemplateByColumnId`,
      method: 'get',
      params: {columnId}
    })
  },
  toTop ({articleId, topStartTime, topEndTime}) {
    return axios({
      url: `${baseUrl}/${routePath}/${modelName}Ad/toTop`,
      method: 'post',
      data: {articleId, topStartTime, topEndTime}
    })
  },
  checkTop ({articleId}) {
    return axios({
      url: `${baseUrl}/${routePath}/publishArticleAd/checkTop?articleId=${articleId}`,
      method: 'get'
    })
  },
  cancelTop({articleId}) {
    return axios({
      url: `${baseUrl}/${routePath}/publishArticleAd/toTopNot`,
      method: 'post',
      data: {articleId}
    })
  },
  commit ({articleId}) {
    return axios({
      url: `${baseUrl}/${routePath}/publishArticleAd/commit`,
      method: 'post',
      data: {articleId}
    })
  },
  /**
   * 通过审核
   * @param articleId
   * @param rejectReason 审核通过的备注
   * @returns {AxiosPromise}
   */
  pass ({articleId, rejectReason}) {
    return axios({
      url: `${baseUrl}/${routePath}/publishArticleAd/pass`,
      method: 'put',
      data: {articleId, rejectReason}
    })
  },
  /**
   * 审核被拒绝
   * @param articleId
   * @param rejectReason 驳回理由
   * @returns {AxiosPromise}
   */
  reject ({articleId, rejectReason}) {
    return axios({
      url: `${baseUrl}/${routePath}/publishArticleAd/reject`,
      method: 'put',
      data: {articleId, rejectReason}
    })
  },
  /**
   * 撤回单个
   * @param articleId
   * @returns {AxiosPromise}
   */
  recall ({articleId}) {
    return axios({
      url: `${baseUrl}/${routePath}/${modelName}Ad/recall/${articleId}`,
      method: 'put'
    })
  },
  /**
   * 批量撤回
   * @param recallIds
   * @returns {AxiosPromise}
   */
  reCallMultiple ({recallIds}) {
    return axios({
      url: `${baseUrl}/${routePath}/${modelName}Ad/recall`,
      method: 'put',
      data: {recallIds}
    })
  }
}
