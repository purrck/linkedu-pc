import Layout from '@/components/container/index'
import questioninviteRouter from "../views/questionAnswer/questioninvite/questioninviteRouter";
import questioninfoRouter from "../views/questionAnswer/questioninfo/questioninfoRouter";
import questionanswerRouter from "../views/questionAnswer/questionanswer/questionanswerRouter";
import questiontagRouter from '../views/questionAnswer/questiontag/questiontagRouter';
import questiontypeRouter from '../views/questionAnswer/questiontype/questiontypeRouter';
import schoolstudentcommentlibRouter from '../views/questionAnswer/schoolstudentcommentlib/schoolstudentcommentlibRouter';

export default[
    {
        path: '/questionAnswer',
        component: Layout,
        children: [
            ...questioninviteRouter.children,
            ...questioninfoRouter.children,
            ...questionanswerRouter.children,
            ...questiontagRouter.children,
            ...questiontypeRouter.children,
            ...schoolstudentcommentlibRouter
        ]

    }
]
