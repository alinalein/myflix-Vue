<template>
    <div>
        <input class="search" v-model="searchQuery" @keyup="searchMovies" placeholder="Search for movies..." />
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
            // ✅ Redirect to HomePage only if not already there
            if (this.$route.name !== 'HomePage') {
                await this.$router.push({ name: 'HomePage', query: { q: this.searchQuery } });
            } else {
                this.$router.replace({
                    ...this.$route,
                    query: { ...this.$route.query, q: this.searchQuery }
                });
            }
        },

        resetSearchQuery() {
            if (this.$route.name !== 'HomePage') {
                this.searchQuery = '';  // ✅ Only reset the query when NOT on HomePage

                const newQuery = { ...this.$route.query };
                delete newQuery.q;

                this.$router.replace({ ...this.$route, query: newQuery });
            }
        }
    },
    watch: {
        '$route'(to, from) {
            if (to.name !== from.name && to.name !== 'HomePage') {
                this.resetSearchQuery();  // ✅ Only reset when leaving HomePage
            }
        }
    }
}
</script>
<style>
.search {
    margin-top: 7px;
    border-radius: 5px;
    padding: 2px;
}
</style>