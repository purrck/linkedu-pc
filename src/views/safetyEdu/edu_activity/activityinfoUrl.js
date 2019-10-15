import axios from '@/axios/axios';
import {baseUrl, ortherUrl, dicUrl} from '@/config/env';

const routePath = 'activity';
const modelName = 'activityInfoQ';

export default {
  //改变状态
  updateStatus(params) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationAd/updateStatus`,
      method: 'put',
      data: params
    })
  },
  //编辑
  activityPlansAdEdit(params) {
    return axios({
      url: baseUrl + `/sm/activity/activityPlansAd/edit`,
      method: 'put',
      data: params
    })
  },
  //删除
  ActivityPlanIdDel(params) {
		return axios({
            url: baseUrl + `/sm/user/entityOrganizationAd`,
            method: 'delete',
            data: params
        })
  },
  //停用
  updateStatusByActivityIdSet(params) {
    return axios({
      url: baseUrl + `/om/activity/activityInfoAd/updateStatusByActivityIdSet`,
      method: 'put',
      data: params,
    })
  },
  //停用
  disableByActivityPlanId(params) {
    return axios({
      url: baseUrl + `/activity/activityPlansAd/disableByActivityPlanId`,
      method: 'put',
      data: params,
    })
  },
  // 删除列表数据
  batchDelObj(params) {
    return axios({
      //url: baseUrl + `/${routePath}/entityOrganizationUserAd`,
      url: baseUrl + `/sm/user/entityOrganizationUserRule`,
      method: 'delete',
      data: params
    })
  },
  activityDetail(id){
    return axios({
        url: baseUrl + `/sm/user/entityOrganizationAd/${id}`,
        method: 'get'
    })
  },
  activityPlansAd(params){
    return axios({
      url: baseUrl + `/sm/activity/activityPlansAd/add`,
      method: 'post',
      data: params
    })
  },
// 获取课程分类
  entityType() {
    return axios({
      url: baseUrl + `/base/entityType`,
      method: 'get'
    })
  },
  //审核/驳回
  activityPlansAudit(params) {
    return axios({
      url: baseUrl + `/sm/activity/activityPlansAd/activityPlansAudit`,
      method: 'PUT',
      data: params
    })
  },
  mingdanListV1(params){
    return axios({
      url: baseUrl + `/sm/activity/activityPlanCheckinAd/page`,
      method: 'get',
      params: params
    })
  },
  mingdanList(params){
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationUserAd/page`,
      method: 'get',
      params: params
    })
  },
  // 获取资源
  entityActivityinfoList(params) {
    return axios({
      //url: baseUrl + `/sm/user/entityOrganizationUserRule/page?entityType=activityinfo&page=1&limit=10`,
      url: baseUrl + "/sm/user/entityRegionAd/page",
      //url:"/static/mock/schoolCourse/list.json",
      method: 'get',
      params: params
    })
  },
  // 获取安全教育列表
  fetchActivityinfoList(params) {
    return axios({
      //url: baseUrl + `/sm/user/entityOrganizationUserRule/page?entityType=activityinfo&page=1&limit=10`,
      url: baseUrl + `/sm/user/entityOrganizationAd/page?entityType=activityinfo`,
      method: 'get',
      params: params
    })
  },
  // 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + `/sm/user/entityRegionAd/page?entityType=activityinfo&page=1&limit=10`,
      method: 'get',
      params: params
    })
  },

  // 增加列表
  addObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/add`,
      method: 'post',
      data: params
    })
  },
  // 运营查看详情
  getObjYunYing(id) {
    return axios({
      url: baseUrl + `/activity/activityInfoQAd/${id}`,
      method: 'get'
    })
  },
  // 校园计划查看详情
  getObj(id) {
    return axios({
      url: baseUrl + `/activity/activityPlansQAd/${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'put',
      data: params,
    })
  },
}
