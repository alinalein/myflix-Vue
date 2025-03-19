<template>
    <div class="movies_div movies_view" v-if="filteredMovies.length">
        <div class="movie-card" v-for="movie in filteredMovies" :key="movie.id">
            <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
            <p>
                {{ movie.Title }}
            </p>
            <div class="movie_buttons_div">
                <button class="show_button" @click="showMovieDetails(movie)">
                    Show Details
                </button>
                <button class="fav_button" v-if="isFavorite(movie._id)" @click="handleDeleteMovie(movie._id)">
                    <i class="fas fa-heart" style="color: rgb(229, 9, 20); "></i>
                </button>
                <button class="fav_button" v-if="!isFavorite(movie._id)" @click="handleAddMovie(movie._id)">
                    <i class="far fa-heart" style="color: rgb(229, 9, 20);"></i>
                </button>
            </div>
        </div>
    </div>
    <div v-else-if="!filteredMovies.length && !dataFetch" class="movies_view no_result">
        <p style="color: white">No results found.</p>
    </div>
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
    min-height: 92vh;
    background-color: rgb(50, 49, 49);
}

.no_result {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.movies_div {
    width: 100%;
    padding: 0 200px;
    gap: 10px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
}

.movie-card {
    position: relative;
    overflow: hidden;
    height: 47vh;
    min-width: 18vw;
    border-radius: 5px;
    background-color: black;
    box-shadow: 4px 4px 15px rgba(212, 209, 209, 0.2);
    padding: 10px;
}

.movie_buttons_div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgb(0, 0, 0), rgba(229, 9, 20, 0.413));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}

.movie-card:hover .movie_buttons_div {
    opacity: 0.9;
}

.show_button {
    color: rgb(211, 211, 211);
    border-radius: 4px;
    font-size: 1rem;
    padding: 5px;
    background-color: rgb(84, 80, 80);
    border: 1px solid gray;
    cursor: pointer;
    margin-bottom: 20px;
}

.fav_button {
    background-color: transparent;
    border: none;
    font-size: 4rem;
    padding: 0 10px;
}

.movie_buttons_div button {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.movie_buttons_div button:hover {
    transform: scale(1.2);
}

.movie-card p {
    color: rgb(211, 209, 209);
    font-size: x-large;
    padding-bottom: 10px;
}

.movie-card__img {
    height: 40vh;
    padding-bottom: 10px;
    border-radius: 2px;
}

@media (max-width: 1820px) {
    .movies_div {
        grid-template-columns: repeat(3, 1fr);
        padding: 0 50px;
    }

    .movie-card {
        min-width: 330px;
    }
}

@media (max-width: 1150px) {
    .movies_div {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 20px;
    }
}

@media (max-width: 700px) {
    .movies_div {
        grid-template-columns: repeat(1, 1fr);
        padding: 0 30px;
    }
}
</style>