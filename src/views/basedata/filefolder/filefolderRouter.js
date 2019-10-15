import listFilefolder from './listFilefolder'
import editFilefolder from './editFilefolder'

export default {
  children: [
    {path: `/basedata/listFilefolder`, name: `/basedata/listFilefolder`, label: `文件夹`, component: listFilefolder},
    {
      path: `/basedata/editFilefolder/:type/:id`,
      name: `/basedata/editFilefolder/:type/:id`,
      label: `文件夹`,
      component: editFilefolder
    },
  ]
}

