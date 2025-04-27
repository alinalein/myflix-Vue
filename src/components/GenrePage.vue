<template>
    <div class="movies_view">
        <h1 class="genre_title">{{ genre }} Movies</h1>
        <div v-if="filteredMovies.length" class="movies_div">
            <div class="movie-card" v-for="movie in filteredMovies" :key="movie._id">
                <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
                <p>{{ movie.Title }}</p>
                <div class="movie_buttons_div">
                    <button class="show_button" @click="showMovieDetails(movie)">
                        Show Details
                    </button>
                    <button class="fav_button" v-if="checkIsFavorite(movie._id)" @click="handleDeleteMovie(movie._id)">
                        <i class="fas fa-heart" style="color: rgb(229, 9, 20); "></i>
                    </button>
                    <button class="fav_button" v-if="!checkIsFavorite(movie._id)" @click="handleAddMovie(movie._id)">
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

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import MovieDetails from './MovieDetails.vue';
import {
    updateFavoriteMoviesAfterAdd, updateFavoriteMoviesAfterDelete, isFavorite,
    fetchMovies, getStoredUser
} from '@/utils/helpers';
import type { Movie } from '@/types/index'

const movies = ref<Movie[]>([]);
const filteredMovies = ref<Movie[]>([]);
const favMovieIds = ref<string[]>([]);
const genre = ref<string>('')
const selectedMovie = ref<Movie | null>(null);
const route = useRoute()

const filterMoviesByGenre = (): void => {
    filteredMovies.value = movies.value.filter(
        movie => movie.Genre?.Name === genre.value
    );
}
watch(
    () => route.params.genre,  // WATCH this value
    (newGenre) => {             // HANDLER function when it changes
        genre.value = newGenre as string;
        filterMoviesByGenre();
    }
)

const handleAddMovie = async (movieId: string): Promise<void> => {
    await updateFavoriteMoviesAfterAdd(movieId, favMovieIds);
}

const handleDeleteMovie = async (movieId: string): Promise<void> => {
    await updateFavoriteMoviesAfterDelete(movieId, favMovieIds);
}

const checkIsFavorite = (movieId: string): boolean => {
    return isFavorite(movieId, favMovieIds.value);
}

const showMovieDetails = (movie: Movie): void => {
    selectedMovie.value = movie;
}
onMounted(async (): Promise<void> => {

    const moviesData = await fetchMovies();
    if (moviesData) {
        movies.value = moviesData;
    }
    const genreParam = route.params.genre;
    genre.value = Array.isArray(genreParam) ? genreParam[0] : genreParam || '';
    filterMoviesByGenre();

    const userData = getStoredUser()
    if (userData) {
        favMovieIds.value = userData.FavoriteMovies || [];  // load favorites from localStorage
    }
})
</script>
<style>
.genre_title,
.fav_title {
    position: relative;
    color: rgb(171, 171, 171);
    padding: 20px 0;
}
</style>