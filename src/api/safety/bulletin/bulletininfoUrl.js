import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'

export default {
  getObj(id) {
    return axios({
      url: baseUrl+'/bulletin/bulletinInfo/' + id,
      method: 'get'
    })
  },
  getCodeIntType(x,y){
    return axios({
      url: baseUrl+'admin/'+x+y
    })
  },
  fetchList(query) {
    return axios({
      url: baseUrl+'/bulletin/bulletinInfo/page',
      method: 'get',
      params: query
    })
  },
  addObj(obj) {
    return axios({
      url: baseUrl+'/bulletin/bulletinInfo/add',
      method: 'post',
      data: obj
    })
  },

  batchDelObj(ids) {
    return axios({
      url: baseUrl+'/bulletin/bulletinInfo',
      method: 'delete',
      data: ids
    })
  },
  putObj(obj) {
    return axios({
      url: baseUrl+'/bulletin/bulletinInfo/edit',
      method: 'put',
      data: obj
    })
  }
}
