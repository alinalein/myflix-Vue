import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FavMovies from '@/components/FavMovies.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

describe('Favorite Movies Page', () => {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [],
    });

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify({
            Username: 'Anna',
            Email: 'anna@example.com',
            Birthday: '2000-01-01',
            FavoriteMovies: ['1']
        }));
        localStorage.setItem('token', 'fake-token');
    });

    it('renders favorite movies', async () => {
        const wrapper = mount(FavMovies, {
            global: { plugins: [router] }
        });

        // Small wait if needed (if any promises)
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(wrapper.text()).toContain('My Favorite Movies');
        // Assuming you would fetch or mock fetchMovies as well, if needed
    });
});
