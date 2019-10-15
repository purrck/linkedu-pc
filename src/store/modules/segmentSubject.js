import axios from '@/axios/axios';
import {baseUrl} from '@/config/env'

export default {
  state: {
    data: []
  },
  getters: {
    getSementSubject(state) {

      return state.data
    }
  },
  mutations: {
    SET_SEGMENT_SUBJECT(state, played) {
      state.data = played;
    }
  },
  actions: {
    segmentSubjectService(context, played) {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/subjectBySegmentTree",
        //url: "/static/mock/subject/subjectById.json",
        method: 'post',
        data: played
      }).then((res) => {
        context.commit("SET_SEGMENT_SUBJECT", res.data.data.children)
      })
    }
  }
}
