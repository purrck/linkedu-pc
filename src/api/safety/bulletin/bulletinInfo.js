import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'
 //const baseUrl = 'iHF/'


export function getBulletinType(query) {
  return axios({
    url: `${baseUrl}/base/codeInt/listCodeInt?bulletinType=${query}`,
    //url: '/static/mock/bulletin/bulletin.json',
    method: 'get'
  })
}

 //列表
 export function bulletinList(query) {
  return axios({
    url: baseUrl + '/sm/security/bulletinInfoAd/page',
    //url: '/static/mock/bulletin/bulletin.json',
    method: 'get',
    params: query
  })
}
//发送对象范围
export function bulletinUserRuleAdNew(query) {
  return axios({
    url: baseUrl + '/sm/security/bulletinUserRuleAd/add',
    //url: '/static/mock/bulletinAdd.json',
    method: 'post',
    data: query
  })
}
//新增sm
export function bulletinAddNew(query) {
  return axios({
    url: baseUrl + '/sm/security/bulletinInfoAd/add',
    //url: '/static/mock/bulletinAdd.json',
    method: 'post',
    data: query
  })
}
//新增
export function bulletinAdd(query) {
  return axios({
    url: baseUrl + '/security/bulletinInfoAd/add',
    //url: '/static/mock/bulletinAdd.json',
    method: 'post',
    data: query
  })
}
//删除
export function bulletinLotDel(params){
    return axios({
        //url: `/static/mock/bulletinInfoDelete.json`,
        url: `${baseUrl}/security/bulletinInfoAd`,
        method: 'delete',
        data : params
    })
}
//获取单一数据
export function getBulletinInfo(params){
  return axios({
      //url: `/static/mock/bulletin/bulletinInfoData.json`,
      url: `${baseUrl}/sm/security/bulletinInfoAd/${params.id}`,
      method: 'get'
  })
}
//更新
export function UpadteBulletinInfo(params){
  return axios({
      //url: `/static/mock/bulletinInfoEdit.json`,
      url: `${baseUrl}/security/bulletinInfoAd/edit`,
      method: 'put',
      data : params
  })
}
//提交审核
export function bulletinInfoCommitcheck(params){
  return axios({
      //url: `/static/mock/commitcheck.json`,
      url: `${baseUrl}/sm/security/bulletinInfoAd/commitcheck`,
      method: 'put',
      data : params
  })
}

//撤回
export function bulletinInfoWithdraw(params){
  return axios({
      //url: `/static/mock/commitcheck.json`,
      url: `${baseUrl}/security/bulletinInfoAd/withdraw`,
      method: 'put',
      data : params
  })
}

//审核通过
export function bulletinVerifyPass(params){
  return axios({
      //虞凯让加sm
      //url: `/static/mock/bulletin/verifyPass.json`,
      url: `${baseUrl}/sm/security/bulletinInfoAd/verifyPass`,
      method: 'put',
      data : params
  })
}

//审核驳回
export function bulletinVerifyReject(params){
  return axios({
      //url: `/static/mock/bulletin/verifyReject.json`,
      url: `${baseUrl}/security/bulletinInfoAd/verifyReject`,
      method: 'put',
      data : params
  })
}

//通知对象范围
export function bulletinUserRuleAdPage(params){
  return axios({
      //url: `/static/mock/bulletin/bulletinUserRuleAdPage.json`,
      url: `${baseUrl}/sm/security/bulletinUserRuleAd/page`,
      method: 'get',
      params: params
  })
}

//通知对象范围删除
export function bulletinUserRuleAdLotDel(params){
  return axios({
      //url: `/static/mock/bulletinUserRuleAdLotDel.json`,
      url: `${baseUrl}/security/bulletinUserRuleAd`,
      method: 'delete',
      data : params
  })
}

//获取校领导
export function bulletinUserRuleAdDepInfoBySchoolId(){
  return axios({
      //url: `/static/mock/bulletin/depInfoBySchoolId.json`,
      url: `${baseUrl}/security/bulletinUserRuleAd/depInfoBySchoolId`,
      method: 'get'
  })
}

//获取班主任-家长
export function bulletinUserRuleAdSchoolInfoWithOutSegment(){
  return axios({
      //url: `/static/mock/bulletin/schoolInfoWithOutSegment.json`,
      url: `${baseUrl}/security/bulletinUserRuleAd/schoolInfoWithOutSegment`,
      method: 'get'
  })
}

//新增通知对象范围
export function bulletinUserRuleAdAdd(params){
  return axios({
      //url: `/static/mock/bulletin/bulletinUserRuleAdAdd.json`,
      url: `${baseUrl}/security/bulletinUserRuleAd/add`,
      method: 'post',
      data : params
  })
}

//回执列表
export function bulletinUserReceiptAdPage(params){
  return axios({
      //url: `/static/mock/bulletin/bulletinUserReceiptAdList.json`,
      url: `${baseUrl}/sm/security/bulletinUserReceiptAd/page`,
      method: 'get',
      params : params
  })
}

//通知对象列表
export function bulletinUserAdPage(params){
  return axios({
      //url: `/static/mock/bulletin/bulletinUserAdPage.json`,
      url: `${baseUrl}/sm/security/bulletinUserAd/page`,
      method: 'get',
      params : params
  })
}

//通知对象删除
export function bulletinUserAdDel(params){
  return axios({
      //url: `/static/mock/bulletinUserRuleAdLotDel.json`,
      url: `${baseUrl}/security/bulletinUserAd`,
      method: 'delete',
      data : params
  })
}



export function bulletinUserReceiptAd(params){
  return axios({
      //url: `/static/mock/bulletinUserRuleAdLotDel.json`,
      url: `${baseUrl}/security/bulletinUserReceiptAd/${params.bulletinReceiptId}`,
      method: 'get'
  })
}















export function getObj(id) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo/' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return axios({
    url: baseUrl + '/security/bulletinInfoAggregationAd/page',
    method: 'get',
    params: query
  })
}

export function fetchBulletinTypeCodeList() {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinRedis/infoType',
    method: 'get'
  })
}

export function fetchBulletinStatusCodeList() {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinRedis/infoStatus',
    method: 'get'
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo/add',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletininfo/' + id,
    method: 'delete'
  })
}

export function batchDelObj(ids) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo',
    method: 'delete',
    data: ids
  })
}

//通知撤回
export function withdrawInfo(obj) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo/withdraw',
    method: 'put',
    data: obj
  })
}

//保存为草稿
export function putObj(obj) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo/edit',
    method: 'put',
    data: obj
  })
}

//提交审核
export function commitCheck(obj) {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinInfo/commitcheck',
    method: 'put',
    data: obj
  })
}

//获取角色列表
export function getRoles() {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinRedis/infoRole',
    method: 'get',
  })
}
//获取部门列表
export function getdepament() {
  return axios({
    url: baseUrl + '/security/bulletin/bulletinRedis/infoRule',
    method: 'get',
  })
}

//获取学段列表
export function getSegment(params) {
  return axios({
    url: baseUrl + '/security/admin/basicSchoolSegment/schoolOrgId',
    method: 'get',
    params:params
  })
}
//获取学级列表
export function getGrade(ids) {
  return axios({
    url: baseUrl + '/security/admin/basicGrade/segmentIds',
    method: 'post',
    data: ids
  })
}
//获取班级列表
export function getClass(params) {
  return axios({
    url: baseUrl + '/security/admin/basicClass/gradeIds',
    method: 'post',
    data: params
  })
}



