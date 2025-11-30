import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addMovie, deleteMovie, updateFavoriteMoviesAfterAdd, updateFavoriteMoviesAfterDelete, fetchMovies } from '../../../src/utils/helpers';
import axios from 'axios';
import { ref } from 'vue';

// Mock axios
vi.mock('axios')

describe('Integration - helpers.ts', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    describe('addMovie', () => {
        it('should update localStorage after adding a movie', async () => {
            const fakeUser = {
                Username: 'Anna',
                Email: 'anna@example.com',
                Birthday: '2000-01-01',
                FavoriteMovies: []
            };
            localStorage.setItem('user', JSON.stringify(fakeUser));
            localStorage.setItem('token', 'fake-token');

            (axios.put as any).mockResolvedValue({
                status: 200,
                data: {
                    updatedUser: {
                        Username: 'Anna',
                        FavoriteMovies: ['movie123']
                    }
                }
            });

            await addMovie('movie123');

            const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
            expect(updatedUser.FavoriteMovies).toContain('movie123');
        });
    });

    describe('deleteMovie', () => {
        it('should update localStorage after deleting a movie', async () => {
            const fakeUser = {
                Username: 'Anna',
                Email: 'anna@example.com',
                Birthday: '2000-01-01',
                FavoriteMovies: ['movie123']
            };
            localStorage.setItem('user', JSON.stringify(fakeUser));
            localStorage.setItem('token', 'fake-token');

            (axios.delete as any).mockResolvedValue({
                status: 200,
                data: {
                    updatedUser: {
                        Username: 'Anna',
                        FavoriteMovies: []
                    }
                }
            });

            await deleteMovie('movie123');

            const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
            expect(updatedUser.FavoriteMovies).not.toContain('movie123');
        });
    });
    describe('fetchMovies', () => {
        it('should return movies array if fetch successful', async () => {
            // Arrange
            localStorage.setItem('token', 'fake-token');

            const mockMovies = [
                { _id: '1', Title: 'Movie One', Description: '...', ImagePath: '', Genre: { Name: 'Action' }, Director: { Name: 'Director A' }, Actors: [] },
                { _id: '2', Title: 'Movie Two', Description: '...', ImagePath: '', Genre: { Name: 'Drama' }, Director: { Name: 'Director B' }, Actors: [] }
            ];

            (axios.get as any).mockResolvedValue({
                status: 200,
                data: mockMovies
            });

            // Act
            const result = await fetchMovies();

            // Assert
            expect(result).toEqual(mockMovies);
            expect(result?.length).toBe(2);
        });

        it('should return undefined if no token found', async () => {
            // Act
            const result = await fetchMovies();

            // Assert
            expect(result).toBeUndefined();
        });

        it('should return undefined if fetch fails', async () => {
            localStorage.setItem('token', 'fake-token');

            (axios.get as any).mockRejectedValue(new Error('Network error'));

            const result = await fetchMovies();

            expect(result).toBeUndefined();
        });
    });

    describe('updateFavoriteMoviesAfterAdd', () => {
        it('should sync favMovieIds after adding a movie', async () => {
            const fakeUser = {
                Username: 'Anna',
                Email: 'anna@example.com',
                Birthday: '2000-01-01',
                FavoriteMovies: []
            };
            localStorage.setItem('user', JSON.stringify(fakeUser));
            localStorage.setItem('token', 'fake-token');

            (axios.put as any).mockResolvedValue({
                status: 200,
                data: {
                    updatedUser: {
                        Username: 'Anna',
                        FavoriteMovies: ['movie456']
                    }
                }
            });

            const favMovieIds = ref<string[]>([]);
            await updateFavoriteMoviesAfterAdd('movie456', favMovieIds);

            expect(favMovieIds.value).toContain('movie456');
        });
    });

    describe('updateFavoriteMoviesAfterDelete', () => {
        it('should sync favMovieIds after deleting a movie', async () => {
            const fakeUser = {
                Username: 'Anna',
                Email: 'anna@example.com',
                Birthday: '2000-01-01',
                FavoriteMovies: ['movie789']
            };
            localStorage.setItem('user', JSON.stringify(fakeUser));
            localStorage.setItem('token', 'fake-token');

            (axios.delete as any).mockResolvedValue({
                status: 200,
                data: {
                    updatedUser: {
                        Username: 'Anna',
                        FavoriteMovies: []
                    }
                }
            });

            const favMovieIds = ref<string[]>(['movie789']);
            await updateFavoriteMoviesAfterDelete('movie789', favMovieIds);

            expect(favMovieIds.value).not.toContain('movie789');
        });
    });

});
