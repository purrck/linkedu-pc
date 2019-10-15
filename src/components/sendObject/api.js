import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'


export function getTypeBy (url,params) {
  return axios({
    url: `${baseUrl}${url}`,
    method: 'get',
    params: params
  })
}
