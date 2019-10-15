import listAccessmetricsUri from '@/views/safety/accessmetricsuri/listAccessmetricsUri'
import detailAccessmetricsUri from '@/views/safety/accessmetricsuri/detailAccessmetricsUri'

const model = 'safety';

export default {children:[
    {path: `/safety/listAccessmetricsUri`, name: 'listAccessmetricsUri',label: '访问记录', component: listAccessmetricsUri},
    {path: `/safety/detailAccessmetricsUri/:type/:id`, name: 'detailAccessmetricsUri',label: '访问记录', component: detailAccessmetricsUri},
]}
