import listPublicHoliday from './listPublicHoliday'
import detailPublicHoliday from './detailPublicHoliday'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listPublicHoliday`, name : 'listPublicHoliday',label : '假期管理', component : listPublicHoliday},
    {path: `/${model}/detailPublicHoliday/:type/:id`, name : 'detailPublicHoliday',label : '假期管理', component : detailPublicHoliday},
  ]
}
