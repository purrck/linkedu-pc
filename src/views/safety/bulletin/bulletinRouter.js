const _import = require('@/router/_import')
export default [
  {
    path: '/safety/preview',
    name: '通知预览',
    component: _import('safety/bulletin/previewBulletinInfo', 'views')
  },
  {
    path: '/safety/sendToObj',
    name: '/safety/sendToObj',
    label: '发送对象',
    component: _import('safety/bulletin/sendToObj', 'views')
  },
  {
    path: '/safety/bulletin',
    name: '通知管理',
    component: _import('safety/bulletin/bulletinInfo', 'views')
  },
  {
    path: '/safety/editbulletinInfo',
    label: '编辑通知',
    name: '/safety/editbulletinInfo',
    component: _import('safety/bulletin/editbulletinInfo', 'views')
  },
  {
    path: '/safety/objbulletin',
    name: '/safety/objbulletin',
    label: '通知对象',
    component: _import('safety/bulletin/objbulletin', 'views')
  },
  {
    path: '/safety/bulletinUser',
    name: '/safety/bulletinUser',
    label: '通知对象列表',
    component: _import('safety/bulletin/bulletinUser', 'views')
  },
  {
    path: '/safety/bulletinUserReceipt',
    name: '/safety/bulletinUserReceipt',
    label: '通知回执',
    component: _import('safety/bulletin/bulletinUserReceipt', 'views')
  },
  {
    path: '/safety/viewBulletinInfoCheck',
    name: '通知审核',
    label: '通知审核',
    component: _import('safety/bulletin/viewBulletinInfoCheck', 'views')
  },
  {
    path: '/safety/viewBulletinInfoDetail',
    label: '通知审核',
    name: '/safety/viewBulletinInfoDetail',
    component: _import('safety/bulletin/viewBulletinInfoDetail', 'views')
  },
]
