import listAmAccesslogentry from '@/views/safety/amaccesslogentry/listAmAccesslogentry'
import detailAmAccesslogentry from '@/views/safety/amaccesslogentry/detailAmAccesslogentry'

const model = 'safety';
export default {
  children: [
    {
      path: `/safety/listAmAccesslogentry`,
      name: 'listAmAccesslogentry',
      label: '接入信息',
      component: listAmAccesslogentry
    },
    {
      path: `/safety/detailAmAccesslogentry/:type/:id`,
      name: 'detailAmAccesslogentry',
      label: '接入信息',
      component: detailAmAccesslogentry
    },
  ]
}
