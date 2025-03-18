<template>
    <div class="movies_view" v-if="filteredMovies.length">
        <div class="movie-card" v-for="movie in filteredMovies" :key="movie.id">
            <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
            <p>
                {{ movie.Title }}
            </p>
            <button @click="showMovieDetails(movie)">
                Show Movie Details
            </button>
            <button v-if="isFavorite(movie._id)" @click="handleDeleteMovie(movie._id)">
                Remove from Favorites
            </button>
            <button v-if="!isFavorite(movie._id)" @click="handleAddMovie(movie._id)">
                Add to Favorites
            </button>

        </div>
    </div>
    <p v-else-if="!filteredMovies.length && !dataFetch">No results found.</p>
    <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
</template>

<script>
import MovieDetails from './MovieDetails.vue';
import { deleteMovie, addMovie, fetchMovies } from '../utils/helpers';

export default {
    name: 'HomePage',
    components: {
        MovieDetails
    },
    data() {
        return {
            movies: [],
            filteredMovies: [],
            favorites: [],
            dataFetch: true,
            selectedMovie: null
        }
    },
    watch: {
        '$route.query.q': { // listen to changes in the $route.query.q ->http://localhost:8080/?q=x
            immediate: true,  //  Runs when the component loads
            handler(newQuery) {
                this.filterMovies(newQuery || ''); // handler trigger the function with the new quary parameter 
            }
        }
    },
    methods: {
        async handleAddMovie(movieId) {
            await addMovie(movieId);

            const userData = JSON.parse(localStorage.getItem('user'));
            this.favorites = userData.FavoriteMovies; // gets actual list with favs from local 
        },

        async handleDeleteMovie(movieId) {
            await deleteMovie(movieId);

            const userData = JSON.parse(localStorage.getItem('user'));
            this.favorites = userData.FavoriteMovies;
        },

        isFavorite(movieId) {
            return this.favorites.includes(movieId);
        },

        async fetchMovies() {
            this.dataFetch = true;
            const moviesData = await fetchMovies();
            if (moviesData) {
                this.movies = moviesData;
                this.filteredMovies = moviesData;  // Show all movies initially
            }
            this.dataFetch = false;
        },

        filterMovies(query) {
            if (!query) {
                this.filteredMovies = this.movies;
            } else {
                const lowerCaseQuery = query.toLowerCase();
                this.filteredMovies = this.movies.filter(movie =>
                    movie.Title.toLowerCase().includes(lowerCaseQuery)
                );
            }
        },
        showMovieDetails(movie) {
            this.selectedMovie = movie;
        },
    },
    async mounted() {
        await this.fetchMovies();  // calls api call to get all movies on load 
        this.filterMovies(this.$route.query.q || '');

        let userData = JSON.parse(localStorage.getItem('user')); // need to be parsed to object that can access FavoriteMovies
        // when no user data found in localstorage, redirect to homepage
        if (!userData) {
            this.$router.push({ name: 'LogIn' });
        }
        else {
            this.favorites = userData.FavoriteMovies || [];  // load favorites from localStorage
        }
    }
}

</script>
<style>
.movies_view {
    background-color: rgb(50, 49, 49);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
}

.movie-card {
    width: 100%;
    border-radius: 5px;
    background-color: black;
    box-shadow: 4px 4px 15px rgba(212, 209, 209, 0.2);
    padding: 10px;
    width: 20vw;
    border: 2px solid red;
}

.movie-card__img {
    height: 300px;
}
</style>