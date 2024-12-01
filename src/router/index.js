import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import BlogPost from '../views/blog_view.vue';
import About from '../views/about.vue';
import Animation from '../components/animation.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/post', name: 'BlogPost', component: BlogPost },
    { path: '/about', name: 'About', component: About },
    { path: '/animation', name: 'Animation', component: Animation },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
