import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieSearch from '@/components/MovieSearch.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

describe('MovieSearch Component', () => {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: '/', name: 'HomePage', component: { template: '<div>Home</div>' } }],
    });

    it('updates query on search', async () => {
        const replaceMock = vi.spyOn(router, 'replace');

        // 👇 VERY IMPORTANT: We need to "navigate" to HomePage first
        router.push({ name: 'HomePage' });
        await router.isReady(); // wait until router is ready

        const wrapper = mount(MovieSearch, {
            global: { plugins: [router] }
        });

        const input = wrapper.find('input[type="text"]');
        await input.setValue('Action');
        await input.trigger('keyup');

        expect(replaceMock).toHaveBeenCalledWith({
            name: 'HomePage',
            query: { q: 'Action' },
        });
    });
});
