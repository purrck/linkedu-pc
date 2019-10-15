import listEntitytype from './listEntitytype'
import editEntitytype from './editEntitytype'

const _import = require('@/router/_import');

export default {
  children: [
    {path: `/safety/listEntitytype`, name: `listEntitytype`, label: `信息类型`, component: listEntitytype},
    {path: `/safety/editEntitytype/:type/:id`, name: `editEntitytype`, label: `信息类型`, component: editEntitytype}]
}
