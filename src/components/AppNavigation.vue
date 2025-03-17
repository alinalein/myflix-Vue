<template>
    <div class="nav">
        <template v-if="!isUserLoggedIn">
            <router-link to="log-in">Log In</router-link>
            <router-link to="sign-up">Sign Up</router-link>
        </template>
        <template v-else>
            <router-link to="/">Home</router-link>
            <router-link to="#">Genres</router-link>
            <router-link to="fav-movies">My List</router-link>
            <MovieSearch />

            <router-link to="/profile">My Profile</router-link>
            <a v-on:click="logout" ref="">Log Out</a>
        </template>

    </div>
</template>
<script>
import MovieSearch from './MovieSearch.vue';
export default {
    name: 'AppNavigation',
    components: {
        MovieSearch
    },
    data() {
        return {
            // returns true when user logged in
            isUserLoggedIn: !!localStorage.getItem('user')
        }
    },
    // created() {  //lifecycle hook-> executed after the component is initialized but before it's mounted.
    //     //logic that requires imidiate data set up 
    //     this.checkUserStatus();

    // },
    watch: { // watch track localStorage changes directly
        '$route'() { // Rerun when route changes
            this.isUserLoggedIn = !!localStorage.getItem('user');
        }
    },
    methods: {
        checkUserStatus() {
            let user = localStorage.getItem('user')
            this.isUserLoggedIn = !!user; //!! check here if the value of user true (loogedin) OR false (not logged in)
        },
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.isUserLoggedIn = false;
            this.$router.push({ name: 'LogIn' })
        }
    }
}
</script>
<style>
.nav {
    background-color: red;
    display: flex;
}

.nav a,
.nav router-link {
    cursor: pointer;
    color: black;
    padding: 10px 20px;
}

/* pushes all after 5th child to left */
.nav a:nth-child(5) {
    color: blue;
    margin-left: auto;
}

.nav a:hover {
    background: yellow;
}
</style>