<template>
    <div class="nav">
        <template v-if="!isUserLoggedIn">
            <router-link to="log-in">Log In</router-link>
            <router-link to="sign-up">Sign Up</router-link>
        </template>
        <template v-else>
            <router-link to="/">Home</router-link>
            <div class="dropdown">
                <div class="dropdown-button">Genres ▼</div>
                <div class="dropdown-content">
                    <a v-for="genre in genres" :key="genre" @click="navigateToGenre(genre)">
                        {{ genre }}
                    </a>
                </div>
            </div>

            <router-link to="/fav-movies">My List</router-link>
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
            isUserLoggedIn: !!localStorage.getItem('user'),
            selectedGenre: '',
            genres: ['Action', 'Biography', 'Crime', 'Drama', 'Sci-Fi']
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
        navigateToGenre(selectedGenre) {
            this.$router.push({ name: 'GenrePage', params: { genre: selectedGenre } });
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

.dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.dropdown-button {
    color: #fff;
    padding: 10px 15px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #2a2a2a;
    min-width: 120px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
    /* ✅ Show dropdown on hover */
}

.dropdown-content a {
    color: #fff;
    padding: 10px 15px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #444;
}
</style>