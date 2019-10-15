import listAaAuditLog from '@/views/basedata/aaauditlog/listAaAuditLog'
import detailAaAuditLog from '@/views/basedata/aaauditlog/detailAaAuditLog'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaAuditLog`, name : 'listAaAuditLog', label: '操作记录',component : listAaAuditLog},
    {path: `/${model}/detailAaAuditLog/:type/:id`, name : 'detailAaAuditLog', label: '操作记录',component : detailAaAuditLog},
]}
