import { describe, it, expect } from 'vitest';
import { getStoredUser, getToken, isFavorite } from '../../../src/utils/helpers';

describe('helpers', () => {
    it('should return user if stored in localStorage', () => {
        const fakeUser = { Username: 'Anna', FavoriteMovies: [] };
        localStorage.setItem('user', JSON.stringify(fakeUser));

        const result = getStoredUser();
        expect(result).not.toBeNull();
        expect(result?.Username).toBe('Anna');
    });

    it('should return null if no user is stored', () => {
        localStorage.removeItem('user');

        const result = getStoredUser();
        expect(result).toBeNull();
    });

    it('should return token if stored', () => {
        localStorage.setItem('token', 'test-token');

        const result = getToken();
        expect(result).toBe('test-token');
    });

    it('should return null if no token is stored', () => {
        localStorage.removeItem('token');

        const result = getToken();
        expect(result).toBeNull();
    });

    describe('isFavorite', () => {
        it('should return true if movieId is in favorites', () => {
            const favIds = ['id1', 'id2', 'id3'];
            expect(isFavorite('id2', favIds)).toBe(true);
        });

        it('should return false if movieId is not in favorites', () => {
            const favIds = ['id1', 'id2', 'id3'];
            expect(isFavorite('id4', favIds)).toBe(false);
        });

        it('should return false if favorites list is empty', () => {
            const favIds: string[] = [];
            expect(isFavorite('id1', favIds)).toBe(false);
        });
    });
});
