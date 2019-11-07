import axios from '@/axios/axios';
import {baseUrl} from '@/config/env'

export default {
  state: {
    gradeData: [],
    subjectData: [],
    gradeAndSubject: [],
    segment: {
      name: "",
      id: ""
    }
  },
  getters: {
    getSementGrade(state) {
      return state.gradeData
    },
    getSementSubject(state) {
      return state.subjectData
    },
    getGradeAndSubject(state) {
      // console.log(state)
      // console.log(state.gradeData)
      // console.log(state.gradeData[0])
      // state.gradeData[0].children.map((item,index) => {
      //     item.sementSubject = [];
      //     // console.log(state.subjectData[0].children)
      //     state.subjectData[0].children.map(item1 => {
      //         item.sementSubject.push({
      //             subjectName : item1.name,
      //             subjectId : item1.id,
      //             switch : true,
      //             gradeName : item.name,
      //             gradeId : item.id,
      //             segmentName : state.segment.name,
      //             segmentId : state.segment.id
      //         })
      //     })
      /*state.subjectData[0].children.map((item1,index1) => {
          item.sementSubject.push({
              subjectName : item1.name,
              subjectId : item1.id,
              switch : true,
              gradeName : item.name,
              gradeId : item.id,
              //segmentName : this.gradeList.name,
              //segmentId : this.gradeList.id
          })
      })*/

      // })

      // return state.gradeData[0].children;
    }
  },
  mutations: {
    SET_SEGMENT_GRADE(state, played) {
      state.gradeData = played;
    },
    SET_SEGMENT_SUBJECT(state, played) {
      // console.log(played)
      state.subjectData = played;
    },
    SET_SEGMENT_NAME_ID(state, played) {

      // console.log(played)
      state.segment.name = played.name;
      state.segment.id = played.id;
    }
  },
  actions: {
    schoolTree(context, played) {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/schoolTree",
        //url: "/static/mock/segmentGrade/segmentGrade.json",
        method: 'get',
        params: played
      })
    },
    classTeacherTree() {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/classTeacherTree",
        //url: "/static/mock/segmentGrade/segmentGrade.json",
        method: 'get'
      })
    },
    segmentGradeService1(context, played) {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/classTree",
        //url: "/static/mock/segmentGrade/segmentGrade.json",
        method: 'get'
      })
    },
    segmentSubjectService1(context, played) {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/subjectBySegmentTree",
        //url: "/static/mock/subject/subjectById.json",
        method: 'post',
        data: played
      })
    },
    segmentGradeService(context, played) {
      return axios({
        url: baseUrl + "/base/schoolDropDownAd/classTree",
        //url: "/static/mock/segmentGrade/segmentGrade.json",
        method: 'get'
      }).then((res) => {
        context.commit("SET_SEGMENT_GRADE", res.data.data.children)
      })
    },
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
