import listBasicschoolorg from './listBasicschoolorg'
import basicschoolorg from './page'



export default {
  children:
    [
      {
        path: `/basedata/listBasicschoolorg`,
        name: `/basedata/listBasicschoolorg`,
        label: `学校管理`,
        component: listBasicschoolorg
      },
      {
        path: `/basedata/basicschoolorg/p`,
        name: `/basedata/basicschoolorg/p`,
        label: `学校管理-`,
        component: basicschoolorg
      },
    ]
}
