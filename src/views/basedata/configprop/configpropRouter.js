import listConfigprop from './listConfigprop'
import editConfigprop from './editConfigprop'

const _import = require('@/router/_import');

export default {
  children: [
    {path: `/basedata/listConfigprop`, name: `/basedata/listConfigprop`, label: `系统配置`, component: listConfigprop},
    {
      path: `/basedata/editConfigprop/:type/:id`,
      // name: `/basedata/editConfigprop/:type/:id`,
      name: `系统配置`,
      component: editConfigprop
    },
  ]
}
