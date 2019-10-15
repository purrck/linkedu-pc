import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'course'
const modelName = 'course'
const applicationCilent = 'Ad'

export default {
  // 是否停用
  tingyong (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/disableCourse`,
      //url:"/static/mock/schoolCourse/tingyong.json",
      method: 'post',
      data: params
    })
  },
  // 添加课程v1
  courseInfoAdd (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/add`,
      method: 'post',
      data: params
    })
  },  // 添加课程v1
  courseInfEdit (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/edit`,
      method: 'put',
      data: params
    })
  },
   // 获取问卷列表
   wenjuanList (params) {
    return axios({
      url: baseUrl + `/om/market/marketSurveyAd/page`,
      method: 'get',
      params: params
    })
  },
  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/add`,
      method: 'post',
      data: params
    })
  },
  // 查看详情v12
  getObj(data) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/selectOneCourse`,
      method: 'get',
      params : data
    })
  },
  // 是否停用
  updateStatus (params) {
    return axios({
      url: baseUrl + `/om/course/courseInfo/updateStatus`,
      //url:"/static/mock/schoolCourse/tingyong.json",
      method: 'put',
      data: params
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
  createChapterByCourse (data) {
    return axios({
      url: `${baseUrl}/om/resource/chapter/add`,
      method: 'post',
      data
    })
  }
}
