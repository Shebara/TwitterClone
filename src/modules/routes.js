import PostList from '../pages/PostList.vue';
import Error404 from '../pages/404.vue';

const routes = [
    {
        name: 'Homepage',
        path: '/',
        component: PostList
    },
    {
        name: '404',
        path: '*',
        component: Error404
    }
];

export default routes;
