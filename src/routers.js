import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";
import UserProfile from "./components/UserProfile.vue";
import FavMovies from "./components/FavMovies.vue";
import GenrePage from "./components/GenrePage.vue";
import SignUp from "./components/SignUp.vue"
import { createRouter, createWebHashHistory } from 'vue-router';


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
        name: 'GenrePage',
        component: GenrePage,
        path: '/genre/:genre'
    },
    {
        name: 'FavMovies',
        component: FavMovies,
        path: '/fav-movies'
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;