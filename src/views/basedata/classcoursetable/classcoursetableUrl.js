import axios from '@/axios/axios';
import {baseUrl, dicUrl, ortherUrl} from '@/config/env';

const routePath = 'sm/courseTable';
const modelName = 'classCourseTable';
const vueFullTypeName = `classCourseTableAd`;
export default {


  // 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj(params) {
    return axios({   //sm/courseTable/classCourseTableAd/add
      url: baseUrl + `/${routePath}/${modelName}Ad/insertCourseTableNew`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + `/sm/base/calendarDropDown/subjectTeacher?classId=`+id,
      method: 'get',
    })
  },
  // 查看详情
  getSetting(params) {
    return axios({
      url: baseUrl + `/sm/courseTable/classCourseTableAd/courseTableByClassId`,
      method: 'get',
      params: params,
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
