import routes from "./routes";
import {
    createRouter,
    createWebHistory
} from "vue-router";
import { useUserSession } from "../store/auth-store"

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/auth/login',
        '/home',
        '/home/berita',
        '/home/detail-berita/'
    ];

    
    const isPublicPage = publicPages.some(v => to.path.includes(v))
    const session = useUserSession();

    if (!isPublicPage && Object.keys(session).length === 0)
    {
        next({
            path: '/auth/login',
            replace: true
        })
    } else
    {
        if (to.path === '/auth/login' && Object.keys(session).length > 0)
        {
            next({
                path: '/'
            })
        } else
        {
            next()
        }
    }
})

export default router;