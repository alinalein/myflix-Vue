import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SignUp from '@/components/SignUp.vue';
import axios from 'axios';
import { createMemoryHistory, createRouter } from 'vue-router';

// Mock axios
vi.mock('axios');

describe('SignUp Page', () => {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: '/log-in', name: 'LogIn', component: { template: '<div>Login</div>' } }],
    });

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('signs up successfully and redirects to login', async () => {
        // Mock API signup success
        (axios.post as any).mockResolvedValue({
            status: 201,
            data: {} // you don't need much here for signup
        });

        const wrapper = mount(SignUp, {
            global: { plugins: [router] }
        });

        await wrapper.find('[data-testid="username"]').setValue('Anna');
        await wrapper.find('[data-testid="email"]').setValue('anna@example.com');
        await wrapper.find('[data-testid="birthday"]').setValue('2000-01-01');
        await wrapper.find('[data-testid="password"]').setValue('password123');
        await wrapper.find('[data-testid="submit"]').trigger('submit.prevent');

        // Important: wait for router after submit
        await router.isReady();

        expect(router.currentRoute.value.name).toBe('LogIn');
    });
});
