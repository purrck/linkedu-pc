import listSchoolSecurityPlace from './listSchoolSecurityPlace'
import detailSchoolSecurityPlace from './detailSchoolSecurityPlace'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSchoolSecurityPlace`, name: 'listSchoolSecurityPlace', label:'巡检点', component: listSchoolSecurityPlace},
    {path: `/${model}/detailSchoolSecurityPlace/:type/:id`, name: 'detailSchoolSecurityPlace', label:'巡检点', component: detailSchoolSecurityPlace},
  ]
}

