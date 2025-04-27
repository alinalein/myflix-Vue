<template>
    <div class="search">
        <input v-model="searchQuery" @keyup="searchMovies" placeholder="Search for movies..." />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const searchQuery = ref<string>('')
const router = useRouter()
const route = useRoute()

const searchMovies = async (): Promise<void> => {
    const isOnHomePage = route.name === 'HomePage';

    // Use `push` if navigating to HomePage, otherwise use `replace` to update the query
    const navigate = isOnHomePage ? router.replace : router.push;

    await navigate({
        name: 'HomePage',
        query: { q: searchQuery.value }
    });
}

const resetSearchQuery = async () => {
    if (route.name !== 'HomePage') {
        searchQuery.value = '';  //  reset the query when NOT on HomePage

        const newQuery = { ...route.query };
        delete newQuery.q; // cleanly remove 'q' from the URL -> so  ?q= is not staying as with -> q: undefined 

        await router.replace({// updates the URL without adding a new history entry
            name: route.name as string,
            query: newQuery
        });
    }
}
watch(
    () => route.name,  // detects when the route changes and resets the search query if the user navigates away from HomePage
    (to: unknown, from: unknown) => {
        if (to !== from && to !== 'HomePage') {
            resetSearchQuery();
        }
    }
);
</script>
<style>
.search {
    display: flex;
    align-items: center;
    justify-content: center;
}

.search input {
    border-radius: 5px;
    padding: 4px;
    background-color: rgb(75, 73, 73);
    color: white;
}

.search input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}
</style>