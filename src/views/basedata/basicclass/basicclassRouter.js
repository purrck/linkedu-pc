import listClassInfo from './listClassInfo'
import addClass from './addClass'
import fenpei from './fenpei'
import detailClassInfo  from './detailClassInfo'

export default {
  children: [
    //新baseData
    {path: `/basedata/listClassInfo`,
      name: `/basedata/listClassInfo`,
      label: '班级信息',
      component: listClassInfo
    },
    {
      path: `/basedata/classInitialize`,
      name: `/basedata/classInitialize`,
      label: '班级初始化',
      component: addClass
    },
    {
      path: `/basedata/classFenpei`,
      name: `/basedata/classFenpei`,
      label: '班级分配',
      component: fenpei
    },
    {
      path: `/basedata/detailClassInfo/:type/:id`,
      name: `/basedata/detailClassInfo/:type/:id`,
      label: '班级信息',
      component: detailClassInfo
    },
  ]
}
