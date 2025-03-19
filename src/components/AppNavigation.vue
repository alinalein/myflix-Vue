<template>
    <div class="nav">
        <p>myFlix</p>
        <button class="hamburger-menu" @click="toggleMenu">
            ☰
        </button>
        <!-- Navigation Links (Visible by default, Hidden only on small screens) -->
        <div :class="['nav-links', { active: isMenuOpen }]">
            <template v-if="!isUserLoggedIn">
                <router-link to="log-in">Login</router-link>
                <router-link to="sign-up">Signup</router-link>
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
            isMenuOpen: false,
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
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        checkUserStatus() {
            let user = localStorage.getItem('user')
            this.isUserLoggedIn = !!user; //!! check here if the value of user true (loogedin) OR false (not logged in)
        },
        navigateToGenre(selectedGenre) {
            this.$router.push({ name: 'GenrePage', params: { genre: selectedGenre } });
            this.isMenuOpen = false;
        },
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.isUserLoggedIn = false;
            this.$router.push({ name: 'LogIn' })
            this.isMenuOpen = false;
        }
    }
}
</script>
<style>
.nav {
    background-color: black;
    display: flex;
    align-items: center;
    height: 8vh;
    width: 100%;
}

.nav p {
    color: black;
    font-size: 2rem;
    padding: 10px;
    animation: glow 3s ease-in-out infinite;
}

.nav a,
.nav router-link {
    cursor: pointer;
    color: rgb(171, 171, 171);
    font-size: 1.1rem;
    padding: 10px 20px;
    text-decoration: none;
    transition-duration: 250ms;
    transition-property: color;
}

.nav a:hover {
    color: white;
}

.nav-links {
    width: 100%;
    display: flex;
}

/* pushes all after 5th child to left */
.nav a:nth-child(5) {
    margin-left: auto;
}

.dropdown {
    color: rgb(171, 171, 171);
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.dropdown-button {
    color: rgb(171, 171, 171);
    padding: 10px 15px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: black;
    min-width: 120px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content a {
    color: rgb(171, 171, 171);
    padding: 10px 15px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #444;
}

.hamburger-menu {
    display: none;
}

@keyframes glow {

    0%,
    100% {
        text-shadow: -3px -3px 8px rgba(0, 0, 0, 0.2),
            3px -3px 8px rgba(0, 0, 0, 0.2),
            -3px 3px 8px rgba(0, 0, 0, 0.2),
            3px 3px 8px rgba(0, 0, 0, 0.2);
    }

    50% {
        text-shadow: -3px -3px 8px rgba(255, 0, 0, 0.6),
            3px -3px 8px rgba(255, 0, 0, 0.6),
            -3px 3px 8px rgba(255, 0, 0, 0.6),
            3px 3px 8px rgba(255, 0, 0, 0.6);
    }
}

@media (max-width: 850px) {
    .nav {
        flex-direction: column;
        height: auto;
        text-align: center;
    }

    .hamburger-menu {
        display: block;
        background-color: rgb(229, 9, 20);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 10px 20px;
        width: 100%;
        text-align: center;
    }

    .nav-links {
        display: none;
        /* Links hidden by default on small screens */
        flex-direction: column;
        width: 100%;
    }

    .nav-links.active {
        display: flex;
        /* Links shown when hamburger menu clicked */
    }

    .nav a {
        width: 100%;
        padding: 10px 0;
    }

    .dropdown-content {
        position: relative;
        width: 100%;
        text-align: center;
    }

    .dropdown-content a {
        width: 100%;
        padding: 10px 0;
    }
}
</style>