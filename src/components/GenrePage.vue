<template>
    <div class="movies_view">
        <h1 class="genre_title">{{ genre }} Movies</h1>
        <div v-if="filteredMovies.length" class="movies_div">
            <div class="movie-card" v-for="movie in filteredMovies" :key="movie.id">
                <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
                <p>{{ movie.Title }}</p>
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
        <div v-else class="movies_view">
            <p>No movies found for this genre.</p>
        </div>
    </div>

    <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
</template>

<script>
import MovieDetails from './MovieDetails.vue';
import { deleteMovie, addMovie, fetchMovies } from '../utils/helpers';

export default {
    name: 'GenrePage',
    components: {
        MovieDetails
    },
    data() {
        return {
            movies: [],
            filteredMovies: [],
            favorites: [],
            genre: '',
            selectedMovie: null
        }
    },
    watch: {
        '$route.params.genre'(newGenre) {
            this.genre = newGenre;
            this.filterMoviesByGenre();
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
        filterMoviesByGenre() {
            this.filteredMovies = this.movies.filter(
                movie => movie.Genre?.Name === this.genre
            );
        },
        showMovieDetails(movie) {
            this.selectedMovie = movie;
        },
    },
    async mounted() {
        this.movies = await fetchMovies();
        this.genre = this.$route.params.genre;
        this.filterMoviesByGenre();

        let userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            this.favorites = userData.FavoriteMovies || [];  // load favorites from localStorage
        }
    }
}
</script>
<style>
.genre_title,
.fav_title {
    position: relative;
    color: rgb(171, 171, 171);
    padding: 20px 0;
}
</style>