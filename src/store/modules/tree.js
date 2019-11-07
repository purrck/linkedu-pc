import axios from '@/axios/axios';
import {baseUrl} from '@/config/env'
export  default {
    state : {
        all : [],
        segment : [],
        grade : [],
        class : [],
        subject : []
    },
    getters : {
        getAll(state){
            /*let str = "0";
            let index = 0;
            var _a = (children) => {
                for(let i=0; i<children.length; i++){
                    children[i].flag = `${str}-${i}`;
                }
                str = `${str}-${index}`
                _a(children[index].children);
            }
            _a(state.all);*/
            return state.all
        }
    },
    mutations : {
        getTree(state,played){
            state.all = played;
            // console.log(played)
        }
    },
    actions : {
        config(context, played){
            axios({
                //url: baseUrl + "/base/schoolSegmentSubjectAd/subjectTree",
                url: "/static/mock/schoolTree.json",
                method: 'get'
            }).then((res) => {
                context.commit("getTree",res.data.data.children)
            })
        }
    }
}