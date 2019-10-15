import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = ''
const modelName = ''
const applicationCilent = ''
const vueFullTypeName = 'CourseClassTeacher'

export default {
  
  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      method: 'get',
      params: params
    })
  },
}
