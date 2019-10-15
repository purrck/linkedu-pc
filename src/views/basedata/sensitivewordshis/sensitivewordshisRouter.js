
import listSensitiveWordsHis from './listSensitiveWordsHis'
import detailSensitiveWordsHis from './detailSensitiveWordsHis'
import sensitivewordshisTotal from './sensitivewordshisTotal'
const model = 'basedata';

export default {
        children:[
            {path: `/${model}/listSensitiveWordsHis`, name : 'listSensitiveWordsHis',label : '敏感词历史', component : listSensitiveWordsHis},
            {path: `/${model}/sensitiveHisTotal`, name : 'sensitivewordshisTotal',label : '敏感词历史统计', component : sensitivewordshisTotal},
            {path: `/${model}/detailSensitiveWordsHis/:type/:id`, name : 'detailSensitiveWordsHis',label : '敏感词历史', component : detailSensitiveWordsHis},
        ]
}
