import axios from '@/axios/axios'
import {baseUrl} from '@/config/env'

export function getTheSchoolInspectionPoint () {
  return axios({
    url: `${baseUrl}/sm/base/schoolSecurityPlaceAd/list`
  })
}
export function getTheSchoolRoute () {
  return axios({
    url: `${baseUrl}/sm/base/schoolSecurityCheckRouteAd/list`
  })
}
export function getDepPosiTree () {
  return axios({
    url: `${baseUrl}/userapp/userAggregationAd/depPosiTree`,
    method: 'get'
  })
}
