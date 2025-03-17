<template>
    <div class="movies_view">
        <div class="movie-card" v-for="movie in favMovies" :key="movie.id">
            <img class="movie-card__img" :src="movie.ImagePath" :alt="movie.Title" />
            <p>
                {{ movie.Title }}
            </p>

            <button @click="showMovieDetails(movie)">
                Show Movie Details
            </button>
            <button @click="handleDelete(movie._id)">Remove From Favorites</button>
        </div>
    </div>
    <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
</template>

<script>
import axios from 'axios';
import MovieDetails from './MovieDetails.vue';
import { deleteMovie } from '../utils/helpers';
export default {
    name: 'FavMovies',
    components: {
        MovieDetails
    },
    data() {
        return {
            movies: [],
            favMovies: [],
            selectedMovie: null
        }
    },
    methods: {
        async fetchMovies() {
            try {
                const token = localStorage.getItem('token')
                let response = await axios.get('https://movie-api-lina-834bc70d6952.herokuapp.com/movies', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (response.status === 200) {
                    this.movies = response.data;// Axios handles JSON parsing automatically

                    let user = JSON.parse(localStorage.getItem('user'));


                    this.favMovies = this.movies.filter(movie => user.FavoriteMovies.includes(movie._id))
                    console.log('favs', this.favMovies)
                    console.log(user)

                }
            } catch (error) {
                console.error('Error fetching movies:', error.response ? error.response.data : error.message);
                alert('An error occurred while fetching the movies.');
            }
        },
        async handleDelete(movieId) {
            try {
                await deleteMovie(movieId);  // Call the delete function
                this.favMovies = this.favMovies.filter(movie => movie._id !== movieId); // update UI 
            } catch (error) {
                console.error('Error deleting movie:', error.response?.data || error.message);
            }
        },
        showMovieDetails(movie) {
            this.selectedMovie = movie;
        },
    },
    mounted() {
        this.fetchMovies();
    }
}
</script>
<style>
.movie-card {
    border: 1px solid gray;
    margin: 10px;
}
</style>