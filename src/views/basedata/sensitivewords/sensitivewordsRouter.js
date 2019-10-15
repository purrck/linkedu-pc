
import listSensitiveWords from './listSensitiveWords'
import detailSensitiveWords from './detailSensitiveWords'
const model = 'basedata';

export default {
        children:[
            {path: `/${model}/listSensitiveWords`, name : 'listSensitiveWords',label : '敏感词', component : listSensitiveWords},
            {path: `/${model}/detailSensitiveWords/:type/:id`, name : 'detailSensitiveWords', label : '敏感词', component : detailSensitiveWords},
        ]
}
