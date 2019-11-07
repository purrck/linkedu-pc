/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import {setStore, getStore, removeStore} from '@/util/store'
import {validatenull} from "@/util/validate"
import router from '@/router/_router'
import {findMenuParent} from "../../util/util";

const tagObj = {
  label: '',
  path: '',
  query: '',
  num: '',
  current: false,
}
const tagIndex = {path: "/page/wel",name:"首页",label: "首页",  query: '',}
//处理状态
function setFistTag(list) {
  if (list.length === 1) {
    list[0].current = true;
  } else {
    list.some(a => {
      a.current = false
    })
  }
  return list;

}


const navs = {
  state: {
    tagList: getStore({name: 'tagList'}) || [{path: "/page/wel",name:"首页",label: "首页",  query: '',   meta: {keepAlive: true}}],
    activeTag: getStore({name: 'activeTag'}) ||tagIndex,
    tagType: getStore({name: 'tagType'}) || tagIndex,
  },
  actions: {},
  mutations: {

    ADD_TAG: (state, to) => {
      let obj ={};
      // // console.log(to)
      // // console.log('查询遍历路由')
      let parent =  findMenuParent(to);
      // // console.log('找到路由定义的名称')
      // // console.log(parent)
      obj.label = parent.label;
      obj.path = to.path;
      obj.fullPath = to.fullPath;
      obj.name = to.name;
      obj.query = to.query;
      obj.params = to.params;
      // obj.meta = {
      //   keepAlive: true
      // };
      let path =  obj.path.split('/');
      let uniPath = ''; //去掉所谓的ID 判断是有同类否
      if(path.length === 3){
        uniPath = `/${path[1]}/${path[2]}`;
      }else if(path.length > 3) {
        uniPath = `/${path[1]}/${path[2]}/${path[3]}`;
      }

      if(obj.path.indexOf('/login')!== -1) return;
      setStore({name: 'activeTag', content:obj, type: ''});
      state.activeTag = obj;
      //全等就返回
      if(state.tagList.some(a => a.fullPath === obj.fullPath)) return;
      //同类就替代
      if(state.tagList.some(a => a.path.indexOf(uniPath)!==-1)){
        state.tagList.forEach(res=>{
          if(res.path.indexOf(uniPath)!==-1){
            res.fullPath = obj.fullPath;
            res.path = obj.path;
            res.query = obj.query;
            res.params = obj.params;
          }
        })
      }else{ //不等也没有同类
        state.tagList.push(obj);
      }
      setStore({name: 'tagList', content:state.tagList, type: ''})

    },

    SET_TAG_TYPE: (state, item) => {
      if(state.tagType === item) return;
      state.tagType = item;
      let arr = [];
      arr.push(item);
      state.tagList = arr;
      setStore({name: 'tagList', content:arr, type: ''});
      setStore({name: 'activeTag', content:item, type: ''});
      setStore({name: 'tagType', content:item, type: ''})
    },
    DEL_TAG: (state, action) => {
      state.tagList.forEach((ele, num) => {
        if (ele.path === action.path) {
          state.tagList.splice(num, 1)
          if(state.activeTag.path === action.path){
            // console.log('路由相同，找下一个');
            let nextOne = state.tagList[num-1];
            // console.log(nextOne.path);
            myVue.$router.push({path:nextOne.path})
          }
          setStore({name: 'tagList', content: state.tagList, type: ''})
        }
      })
    },
    DEL_ALL_TAG: (state, action) => {
      state.tagList = [];
      state.activeTag = '/page/wel';
      state.tagType = tagIndex;
      setStore({name: 'activeTag', content: '', type: ''});
      setStore({name: 'tagType', content: '', type: ''});
      setStore({name: 'tagList', content: '', type: ''});
      }
    }
};
export default navs
