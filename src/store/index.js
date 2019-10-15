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

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import errLog from './modules/errLog'
import getters from './getters'
import review from './modules/review'
import dialog from './modules/dialog'
import importFileV2 from './modules/importFileV2'
import tree from './modules/tree'
import segmentGradeClass from './modules/segmentGradeClass'
import segmentGrade from './modules/segmentGrade'
import segmentSubject from './modules/segmentSubject'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    errLog,
    tags,
    review,
    dialog,
    importFileV2,
    tree,
    segmentGradeClass,
    segmentGrade,
    //segmentSubject
  },
  getters,
})

export default store
