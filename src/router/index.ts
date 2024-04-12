import {createRouter, createWebHistory} from 'vue-router'
import AppView from '@/views/AppView.vue';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (from.name !== to.name && (!from.meta.navGroup || from.meta.navGroup !== to.meta.navGroup)) {
            return {
                top: 0
            };
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/app',
            name: 'app',
            component: AppView
        },

    ]
})

export default router
