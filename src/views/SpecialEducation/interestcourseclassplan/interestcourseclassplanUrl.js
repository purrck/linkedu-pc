
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// const  baseUrl = '/cHF';    //将环境切换为本地

const  routePath = 'sm/spedu';
const  modelName = 'interestCourseClassPlan';
const  vueFullTypeName = `InterestCourseClassPlan`;

export default {

  // 获取列表
  fetchListsss(params) {
    return axios({
      url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/page`,
      method: 'get',
      params: params
    })
  },


//获取节数
  getInterestCourseClassSections (params) {
  return axios({
    url: baseUrl + `/sm/base/orgSchoolTimelineDetailAd/timelineDetailList`,
    //url: `/static/mock/schoolCourse/resources.json`,
    method: 'post',
    data: params
  })
},




  // 签到
  studentArrive(params) {
  return axios({
    url: baseUrl + `/sm/spedu/interestCourseClassStudentCheckAd/studentCheck?`,
    method: 'post',
    data: params
  })
},

// 获取
  getList(params) {
  return axios({
    url: baseUrl + `/sm/spedu/interestCourseClassStudentAd/page?`,
    method: 'get',
    params: params
  })
},

  // 获取地点列表
  getPlaceList(params) {
    return axios({
      url: baseUrl + `/base/basicSchoolPlace/getSchoolPlace`,
      method: 'get',
      params: params
    })
  },

  //  获取地点列表
  // getPlaceList(params) {
  //   return axios({
  //     url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/list?`,
  //     method: 'get',
  //     params: params
  //   })
  // },
  // //  获取地点列表
  // getPlaceListChildrens(params) {
  //   return axios({
  //     url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/page?`,
  //     method: 'get',
  //     params: params
  //   })
  // },

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
                url: baseUrl + `/${routePath}/${modelName}Ad/add`,
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
