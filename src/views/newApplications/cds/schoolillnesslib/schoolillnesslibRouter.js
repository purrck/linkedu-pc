import listSchoolIllnessLib from './listSchoolIllnessLib'
import detailSchoolIllnessLib from './detailSchoolIllnessLib'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolIllnessLib`, name : 'listSchoolIllnessLib', component : listSchoolIllnessLib},
    {path: `/${model}/detailSchoolIllnessLib/:type/:id`, name : 'detailSchoolIllnessLib', component : detailSchoolIllnessLib},
  ]
