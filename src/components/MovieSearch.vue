<template>
    <div class="search">
        <input v-model="searchQuery" @keyup="searchMovies" placeholder="Search for movies..." />
    </div>
</template>
<script>

export default {
    name: 'MovieSearch',
    data() {
        return {
            searchQuery: ''
        };
    },
    methods: {
        async searchMovies() {
            const isOnHomePage = this.$route.name === 'HomePage';

            // Use `push` if navigating to HomePage, otherwise use `replace` to update the query
            this.$router[isOnHomePage ? 'replace' : 'push']({
                name: 'HomePage',
                query: { q: this.searchQuery }
            });
        },

        resetSearchQuery() {
            if (this.$route.name !== 'HomePage') {
                this.searchQuery = '';  //  reset the query when NOT on HomePage

                this.$router.replace({ // updates the URL without adding a new history entry
                    ...this.$route,
                    query: { ...this.$route.query, q: undefined }// removes the query parameter 
                });
            }
        }
    },
    watch: {
        '$route'(to, from) { // detects when the route changes and resets the search query if the user navigates away from HomePage
            if (to.name !== from.name && to.name !== 'HomePage') {
                this.resetSearchQuery();
            }
        }
    }
}
</script>
<style>
.search input {
    border-radius: 5px;
    padding: 4px;
    background-color: rgb(30, 30, 30);
    color: white;
}
</style>