
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// const  baseUrl = '/cHF';    //将环境切换为本地

const  routePath = 'sm/dormitory';
const  modelName = 'basicSchoolDormitory';
const  vueFullTypeName = `BasicSchoolDormitory`;

export default {
  // 获取场所列表
  fetchListsss(params) {
    return axios({
      url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/page`,
      method: 'get',
      params: params
    })
  },
  // 获取学生人数
  getAllStudents(params) {
    return axios({
      url: baseUrl + `/sm/dormitory/basicSchoolDormitoryStudentAd/page`,
      method: 'get',
      params: params
    })
  },

  getStudentsLeaveNum(params) {
  return axios({
    url: baseUrl + `/sm/attendance/studentLeaveAd/count`,
    method: 'get',
    params: params
  })
},

  getPlaceType(id) {
    return axios({
      url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/${id}`,
      method: 'get',
    })
  },
  // // 获取学生
  // getStudentList (params) {
  //   return axios({
  //     url: baseUrl+`/sm/dormitory/basicSchoolDormitoryStudentAd/page?page=1&limit=10`,
  //     method: 'get',
  //     params: params
  //
  //   })
  // },
  // // 获取学生家长信息
  // getParentMessage (params) {
  //   return axios({
  //     url: baseUrl+`/sm/user/schoolPerson/listStudentParent?isGetParent=true`,
  //     method: 'get',
  //     params: params
  //
  //   })
  // },
  // // 选择学生家长
  // chooseParent (params) {
  //   return axios({
  //     url: baseUrl+`/sm/user/schoolPerson/listStudentParent?isGetParent=true`,
  //     method: 'get',
  //     params: params
  //   })
  // },


  // 增加来访记录
  addVisitor(params) {
    return axios({
      url: baseUrl + `/sm/visitCheck/schoolVisitRecordAd/add`,
      method: 'post',
      data: params
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
  // 获取地点列表
  getPlaceList(params) {
    return axios({
      url: baseUrl + `/base/basicSchoolPlace/getSchoolPlace`,
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
  // 修改详情
  changeTime(params) {
    return axios({
      url: baseUrl + `/sm/visitCheck/schoolVisitRecordAd/edit`,
      method: 'put',
      data: params,
    })
  },
}
