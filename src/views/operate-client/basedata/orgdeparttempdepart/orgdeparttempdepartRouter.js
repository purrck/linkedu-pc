import listTempDepart from './listTempDepart'
import detailTempDepart from './detailTempDepart'

const model = 'safety';
export default {
  children: [
    {path: `/basedata/listTempDepart`, name: `/basedata/listTempDepart`, label: ' 部门模板', component: listTempDepart},
    {
      path: `/basedata/detailTempDepart/:type/:id`,
      name: `/basedata/detailTempDepart/:type/:id`,
      label: '部门模板',
      component: detailTempDepart
    },
  ]
}
