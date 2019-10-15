import axios from '@/axios/axios';
import {baseUrl} from '@/config/env'
export default {
    state : {
        data : []
    },
    getters : {
        getSementGradeClass(state){
            return state.data
        }
    },
    mutations : {
        SET_SEGMENT_GRADE_CLASS(state,played){
            state.data = played;
        }
    },
    actions : {
        subjectTeacherTree(context,played){
            return axios({
                url: baseUrl + "/base/schoolDropDownAd/classTeacherTree",
                method: 'get'
            }).then((res) => {
                context.commit("SET_SEGMENT_GRADE_CLASS",res.data.data.children)
            })
        }
    }
}