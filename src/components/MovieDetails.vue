<template>
    <div v-if="movie" class="movie-details">
        <h2>{{ movie.Title }}</h2>
        <img :src="movie.ImagePath" :alt="movie.Title" class="movie-details__img" />
        <p><strong>Director:</strong> {{ movie.Director.Name }}</p>
        <p><strong>Description:</strong> {{ movie.Description }}</p>
        <p><strong>Genre:</strong> {{ movie.Genre.Name }}</p>
        <p><strong>Actors:</strong> {{ movie.Actors.join(', ') }}</p>

        <button @click="$emit('close')">Close</button>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
.movie-details {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
}

.movie-details__img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
}
</style>