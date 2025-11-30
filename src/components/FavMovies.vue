<template>
    <div class="movies_view">
        <h1 class="fav_title">My Favorite Movies</h1>
        <div class="movies_div">
            <div class="movie-card" v-for="movie in favMoviesObjects" :key="movie._id">
                <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
                <p>
                    {{ movie.Title }}
                </p>
                <div class="movie_buttons_div">
                    <button class="show_button" @click="showMovieDetails(movie)">
                        Show Details
                    </button>
                    <button class="fav_button" @click="handleDelete(movie._id)">
                        <i class="fas fa-heart" style="color: rgb(229, 9, 20); "></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { deleteMovie, getStoredUser, fetchMovies } from '@/utils/helpers';
import MovieDetails from './MovieDetails.vue';
import type { Movie } from '@/types/index';

const movies = ref<Movie[]>([]);
const favMoviesObjects = ref<Movie[]>([]);
const selectedMovie = ref<Movie | null>(null);

const loadFavMovies = async (): Promise<void> => {
    const moviesData = await fetchMovies();
    if (!moviesData) return;

    movies.value = moviesData;

    const user = getStoredUser();
    if (user) {
        favMoviesObjects.value = movies.value.filter(movie =>
            user.FavoriteMovies.includes(movie._id)
        );
    }
};

const handleDelete = async (movieId: string): Promise<void> => {
    try {
        await deleteMovie(movieId);  // Call the delete function
        favMoviesObjects.value = favMoviesObjects.value.filter(movie => movie._id !== movieId); // update UI 
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting movie:', error.message);
        } else {
            console.error('Unknown error deleting movie:', error);
        }
    }
};

const showMovieDetails = (movie: Movie): void => {
    selectedMovie.value = movie;
};

onMounted(async (): Promise<void> => {
    await loadFavMovies();
});
</script>
<style>
.movie-card {
    border: 1px solid gray;
    margin: 10px;
}
</style>