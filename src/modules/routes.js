import store from './store.js';

import MyPosts from '../pages/MyPosts.vue';
import AllPosts from '../pages/AllPosts.vue';
import FollowedPosts from '../pages/FollowedPosts.vue';
import Post from '../pages/SinglePost.vue';
import User from '../pages/UserProfile.vue';
import LogIn from '../pages/LogIn.vue';
import Register from '../pages/Register.vue';
import EditProfile from '../pages/EditProfile.vue';
import EditPost from '../pages/EditPost.vue';
import Error404 from '../pages/404.vue';

const routes = [
    {
        name: 'Homepage',
        path: '/',
        component: MyPosts
    },
    {
        name: 'All Posts',
        path: '/posts',
        component: AllPosts
    },
    {
        name: 'Single Post',
        path: '/post/:id',
        component: Post
    },
    {
        name: 'My Profile',
        path: '/profile',
        component: User
    },
    {
        name: 'User Profile',
        path: '/profile/:id',
        component: User
    },
    {
        name: 'Followed Posts',
        path: '/followed',
        component: FollowedPosts
    },
    {
        name: 'Log In',
        path: '/login',
        component: LogIn
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    },
    {
        name: 'Edit Profile',
        path: '/editprofile',
        component: EditProfile
    },
    {
        name: 'New Post',
        path: '/edit',
        component: EditPost
    },
    {
        name: 'Edit Post',
        path: '/edit/:id',
        component: EditPost
    },
    {
        name: 'Log Out',
        path: '/logout',
        component: {
            beforeRouteEnter() {
                store.commit('logout');
            }
        }
    },
    {
        name: '404',
        path: '*',
        component: Error404
    }
];

export default routes;
