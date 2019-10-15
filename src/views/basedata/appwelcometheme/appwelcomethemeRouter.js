import listAppWelcomeTheme from '@/views/basedata/appwelcometheme/listAppWelcomeTheme'
import detailAppWelcomeTheme from '@/views/basedata/appwelcometheme/detailAppWelcomeTheme'

const _import = require('@/router/_import');
const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listAppWelcomeTheme`,
      name: 'listAppWelcomeTheme',
      label: '应用主题',
      component: listAppWelcomeTheme},
    {
      path: `/${model}/detailAppWelcomeTheme/:type/:id`,
      name: 'detailAppWelcomeTheme',
      label: '应用主题',
      component: detailAppWelcomeTheme
    },
  ]
}
