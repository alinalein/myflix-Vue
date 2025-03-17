<template>
    <div>
        <h1>{{ genre }} Movies</h1>

        <div v-if="filteredMovies.length" class="movies_view">
            <div class="movie-card" v-for="movie in filteredMovies" :key="movie.id">
                <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
                <p>{{ movie.Title }}</p>
                <p>{{ movie.Director.Name }}</p>
                <button v-if="isFavorite(movie._id)" @click="handleDeleteMovie(movie._id)">
                    Remove from Favorites
                </button>
                <button v-if="!isFavorite(movie._id)" @click="handleAddMovie(movie._id)">
                    Add to Favorites
                </button>
            </div>
        </div>

        <p v-else>No movies found for this genre.</p>
    </div>
</template>

<script>
import { deleteMovie, addMovie, fetchMovies } from '../utils/helpers';

export default {
    name: 'GenrePage',
    data() {
        return {
            movies: [],
            filteredMovies: [],
            favorites: [],
            genre: ''
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
        }
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