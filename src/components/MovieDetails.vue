<template>
    <div v-if="movie" class="movie-details">
        <div class="details_close">
            <h1> {{ props.movie.Title }}</h1>
            <button @click="$emit('close')">X</button>
        </div>

        <img :src="props.movie.ImagePath" :alt="props.movie.Title" class="movie-details__img" />
        <div class="details_details">
            <p><strong>Director:</strong> {{ props.movie.Director.Name }}</p>
            <p><strong>Description:</strong> {{ movie.Description }}</p>
            <p><strong>Genre:</strong> {{ props.movie.Genre.Name }}</p>
            <p><strong>Actors:</strong> {{ props.movie.Actors.join(', ') }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Movie } from '@/types/index';

const props = defineProps<{
    movie: Movie;
}>();
</script>

<style>
.movie-details {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(0, 0, 0);
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    width: 30vw;
    max-width: 100%;
    border: 2px solid rgb(165, 0, 0);
}

.details_close {
    color: rgb(165, 0, 0);
    display: flex;
    padding-bottom: 15px;
    justify-content: space-between;
}

.details_close h1 {
    font-size: 2.3rem;
}

.details_close button {
    background-color: transparent;
    color: rgb(165, 0, 0);
    border: none;
    font-size: 1.3rem;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 4px 4px 4px 4px rgba(165, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.5s ease-in;
}

.details_close button:hover {
    transform: scale(0.8);
}

.details_details {
    color: rgb(172, 172, 172);
    display: block;
    text-align: left;
    width: 100%;
    padding-top: 15px;
}

.details_details p {
    padding-bottom: 5px;
}

.movie-details__img {
    width: 50%;
    box-shadow: 0 0 14px 14px rgba(165, 0, 0, 0.3);
}
</style>