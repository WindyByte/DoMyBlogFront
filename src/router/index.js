import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import ArticleView from '../views/article_view.vue';
import About from '../views/about.vue';
import Animation from '../components/animation.vue';
import ArticleDetail from '@/components/article_detail.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/articleView',
        name: 'ArticleView',
        component: ArticleView
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/animation',
        name: 'Animation',
        component: Animation
    },
    {
        path: '/article', // 动态路由匹配
        name: 'ArticleDetail',
        component: ArticleDetail, // 文章详情页组件
        props: true, // 将路由参数作为 props 传递给组件
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
