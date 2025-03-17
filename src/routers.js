import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";
import UserProfile from "./components/UserProfile.vue";
import FavMovies from "./components/FavMovies.vue";
import SignUp from "./components/SignUp.vue";
import GenrePage from "./components/GenrePage.vue";
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'LogIn',
        component: LogIn,
        path: '/log-in'
    },
    {
        name: 'UserProfile',
        component: UserProfile,
        path: '/profile'
    },
    {
        name: 'FavMovies',
        component: FavMovies,
        path: '/fav-movies'
    },
    {
        name: 'GenrePage',
        component: GenrePage,
        path: '/genre/:genre'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;