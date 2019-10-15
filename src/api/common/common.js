import axios from '@/axios/axios'
import {ortherUrl, baseUrl, khglUrl, dicUrl} from '@/config/env'
// const  baseUrl = '/cHF'
import store from '../../store'
export default {
  //获取数据字典
  getCodeIntType (val) {
    /*
    *作者：wys
    * 如果不行就改回来
     */
    // return axios({
    //   url: `${baseUrl}/base/codeInt/listCodeInt?codetypeId=${val}`,
    //   method: 'get',
    // })
    return new Promise((resolve, reject) => {
      let data = store.state.common.codeTpyeList.find(a=> {
        if(a.key === val) {
          return a
        }
      });
      if(data) {
        resolve(data.value)
      }else{
        return axios({
          url: `${baseUrl}/base/codeInt/listCodeInt?codetypeId=${val}`,
          method: 'get',
        }).then(res =>{
          if(res.data.resultCode === '000000'){
            let codeMsg = {key:val,value:res};
            store.commit('SET_CODETYPELIST',codeMsg);
            resolve(res);
          }else{
            reject()
          }
        })
      }
    });
  },
  //用户类型
  commonRequest(url,type,data){
    return axios({
      url: `${baseUrl}${url}`,
      method: type || 'get',
      data:type==='post'?data:'',
      params:type==='get'?data:''
    })
  },//用户类型
  getUserType(){
    return axios({
      url: `${baseUrl}/userapp/base/codeInt/list?codetypeId=userType`,
      method: 'get'
    })
  },
  getCourseType(type){
    return axios({
      url: `${baseUrl}/userapp/base/codeInt/list?codetypeId=securityEducationType&fileName=courseType&propKey=${type}`,
      method: 'get'
    })
  },
  getRoleForDialog(url,params){
    return axios({
      url: `${baseUrl}${url}`,
      //url : url,
      method: 'get',
      params : params
    })
  },
  getDetailForDialog(url){
    return axios({
      url: `${baseUrl}${url}`,
      //url : url,
      method: 'get'
    })
  },
  //学校-学段-班级-学科
  getSchoolTree(url,params){
    return axios({
      url: `${baseUrl}${url}`,
      method: 'get',
      params : params
    })
  },
  //学段-年级-班级
  getSegmentGradeclass(){
    return axios({
      url: `${baseUrl}/base/schoolSegmentSubjectAd/subjectTeacherTree`,
      method: 'get'
    })
  },
  //学校学科
  getSchoolSubjectTree(){
    return axios({
      url: `${baseUrl}/base/schoolDropDownAd/schoolSubjectTree`,
      method: 'get'
    })
  },
  /**
   * 学校学科
   * @returns {AxiosPromise}
   */
  getSubject(){
    return axios({
      url: `${baseUrl}/base/schoolDropDownAd/subjectAll`,
      method: 'get'
    })
  },
  //年级-班级
  getGradeClass(){
    return axios({
      url: `${baseUrl}/base/basicSchoolAggregation/schoolInfoWithOutSegmentNoId`,
      method: 'get'
    })
  },
  //学段-班级-学科 v1
  getSegmentGradeSubject(){
    return axios({
      url: `${baseUrl}/base/schoolSegmentSubjectAd/subjectTree`,
      method: 'get'
    })
  },
  //平级-年级-班级-学科
  getPJGradeClassSubject(){
    return axios({
      url: `${baseUrl}/base/schoolDropDownAd/classTeacherTree`,
      method: 'get'
    })
  },
  //学段-年级
  getSegmentGrade(){
    return axios({
      url: `${baseUrl}/base/schoolDropDownAd/classTree`,
      method: 'get'
    })
  },
  //教师excel 导入
  importFile (data) {
    return axios({
      url: baseUrl + '/user/basicTeacherAd/import',
      method: 'post',
      ContentType: 'multipart/form-data',
      data: data
    })
  },
  importFileV1 (data, url) {
    return axios({
      url: `${baseUrl}/${url}`,
      method: 'post',
      ContentType: 'multipart/form-data',
      data: data
    })
  },
  //教师excel 导出
  exportFile (ids) {
    window.location.href = `${baseUrl}user/basicTeacherAd/export?teacherIds=${ids}`
  },


  //获取所有学段
  basicSegmentAd () {
    return axios({
      url: `${baseUrl}/base/basicSegmentAd`,
      method: 'get'
    })
  },//获取所有学段
  getImageUrl () {
    return axios({
      url: `${baseUrl}/base/basicSegmentAd`,
      method: 'get'
    })
  },//获取所有学段
  getFilesUrl () {
    return axios({
      url: `${baseUrl}/base/basicSegmentAd`,
      method: 'get'
    })
  },//获取echarts
  getEchart (type) {
    return axios({
      url: `${baseUrl}/base/statisticsResultsPt/${type}`,
      method: 'get'
    })
  },
  getClassTreeBySchool(id = '580df6d6c0a802137a30f614fcb1d90d') {
    return axios({
      url: `${baseUrl}/base/basicSchoolAggregation/schoolInfoWithSegment?schoolId=${id}`,
      method: 'get'
    })
  },
  getAllSchool() {
    return axios({
      url: `${baseUrl}/base/basicSchoolOrgQ/page`,
      method: 'get',
      params: {page: 1, limit: 9999}
    })
  }

}


/**
 * 翻译接口
 * @param type 默认为
 * @returns {AxiosPromise}
 */
export function getDirTranslateByEntityType ({type} = {type: 'entitytypead'}) {
  return axios({
    url: baseUrl + `/base/${type}/page`,
    method: 'get',
    params: {limit: 99999}
  })
}
