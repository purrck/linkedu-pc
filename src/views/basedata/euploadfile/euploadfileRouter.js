import listEuploadfile from './listEuploadfile'
import editEuploadfile from './editEuploadfile'

export default {
  children: [
    {path: `/basedata/listEuploadfile`, name: `/basedata/listEuploadfile`, label: `文件`, component: listEuploadfile},
    {
      path: `/basedata/editEuploadfile/:type/:id`,
      name: `/basedata/editEuploadfile/:type/:id`,
      label: `文件`,
      component: editEuploadfile
    },
  ]
}

