import PostList from '../pages/PostList.vue';
import Post from '../pages/SinglePost.vue';
import User from '../pages/SingleUser.vue';
import LogIn from '../pages/LogIn.vue';
import Register from '../pages/Register.vue';
import Error404 from '../pages/404.vue';

const routes = [
    {
        name: 'Homepage',
        path: '/',
        component: PostList
    },
    {
        name: 'Single Post',
        path: '/post/:id',
        component: Post
    },
    {
        name: 'Single User',
        path: '/user/:id',
        component: User
    },
    {
        name: 'Log In',
        path: '/login',
        component: LogIn
    },
    {
        name: 'Log Out',
        path: '/register',
        component: Register
    },
    {
        name: '404',
        path: '*',
        component: Error404
    }
];

export default routes;
