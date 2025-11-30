import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// 1. Create a mock router manually
const pushMock = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
    useRoute: () => ({
        name: 'UserProfile',
    }),
}));

describe('UserProfile Page', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.stubGlobal('confirm', () => true); // always confirm
    });

    it('deletes user profile and redirects', async () => {
        // Mock axios delete to simulate server response
        (axios.delete as any).mockResolvedValue({ status: 200 });

        const wrapper = mount(UserProfile, {
            global: {
                stubs: ['router-link'], // in case router-link needed
            },
        });

        // Act
        await wrapper.find('[data-testid="delete-profile"]').trigger('click');
        await Promise.resolve(); // flush all promises

        // Assert
        expect(localStorage.getItem('user')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(pushMock).toHaveBeenCalledWith({ name: 'SignUp' });
    });
});
