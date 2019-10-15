
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// const  baseUrl = '/cHF';    //将环境切换为本地

const  routePath = 'sm/dormitory';
const  modelName = 'basicSchoolDormitoryStudent';
const  vueFullTypeName = `BasicSchoolDormitoryStudent`;

export default {
  // 获取学段列表
  getGradeList (params) {
    return axios({
      url: baseUrl + `/base/basicSchoolAggregation/schoolInfoWithSegment?`,
      //url: `/static/mock/schoolCourse/resources.json`,
      method: 'get',
      params: params
    })
  },
  // 获取年级列表
  getStatusList(params) {
    return axios({
      url: baseUrl + `/base/schoolSegmentSubjectAd/page`,
      //url : `/static/mock/subject/list.json`,
      method: 'get',
      params: params
    })
  },
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
		return axios({
                url: baseUrl + `/${routePath}/${modelName}Ad/addMore`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/${id}`,
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
