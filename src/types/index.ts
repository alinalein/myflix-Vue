export interface SignupResponse {
    status: string;
    Username: string;
    Email: string;
    Birthday: string;
}

export interface LoginResponse {
    user: {
        Username: string;
        Email: string;
        Birthday: string;
        FavoriteMovies: string[];
    };
    token: string;
    message: string;
}

export interface UpdateResponse {
    Username: string;
    Email: string;
    Birthday: string;
}

export interface Movie {
    _id: string;
    Title: string;
    Description: string;
    ImagePath: string;
    Genre: { Name: string };
    Director: { Name: string };
    Actors: string[];
}

export interface UpdatedUser {
    Username: string;
    FavoriteMovies: string[];
}

export interface AddMovieResponse {
    message: string;
    updatedUser: UpdatedUser;
}

export interface DeleteMovieResponse {
    message: string;
    updatedUser: UpdatedUser;
}