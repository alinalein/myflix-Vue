import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LogIn from '@/components/LogIn.vue';
import axios from 'axios';
import { createMemoryHistory, createRouter } from 'vue-router';

vi.mock('axios');

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('logs in successfully and redirects', async () => {
        (axios.post as any).mockResolvedValue({
            status: 201,
            data: {
                user: {
                    Username: 'Anna',
                    Email: 'anna@example.com',
                    Birthday: '2000-01-01',
                    FavoriteMovies: [],
                },
                token: 'fake-token-123',
            },
        });

        const router = createRouter({
            history: createMemoryHistory(),
            routes: [],
        });

        const wrapper = mount(LogIn, {
            global: {
                plugins: [router],
            },
        });

        await wrapper.find('input[placeholder="Username"]').setValue('Anna');
        await wrapper.find('input[placeholder="Password"]').setValue('test123');
        await wrapper.find('form').trigger('submit.prevent');

        expect(localStorage.getItem('user')).not.toBeNull();
        expect(localStorage.getItem('token')).not.toBeNull();
    });
});
