import axios from "axios";
import type {
  Movie,
  AddMovieResponse,
  DeleteMovieResponse,
} from "@/types/index";
import type { Ref } from "vue";

export const baseUrl = "https://my-flix-api-267292098478.europe-north1.run.app";

export const getStoredUser = (): {
  Username: string;
  Email: string;
  Birthday: string;
  FavoriteMovies: string[];
} | null => {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) return null;
  try {
    return JSON.parse(rawUser) as {
      Username: string;
      Email: string;
      Birthday: string;
      FavoriteMovies: string[];
    };
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const addMovie = async (id: string) => {
  try {
    const user = getStoredUser();
    const token = getToken();
    if (!user || !token) return;
    const response = await axios.put<AddMovieResponse>(
      `${baseUrl}/users/${user.Username}/movies/add/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      // returned user that has the data username & favmovies is called !! updatedUser !!,
      // for that reason merge the user in the localstorage with user returned by api
      // const existingUserData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = {
        ...user,
        ...response.data.updatedUser,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      alert("movie added to favorites");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("occured error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error occured:", error);
    }
    alert("movie could not be added");
  }
};

export const deleteMovie = async (id: string) => {
  try {
    const user = getStoredUser();
    const token = getToken();
    if (!user || !token) return;

    const response = await axios.delete<DeleteMovieResponse>(
      `${baseUrl}/users/${user.Username}/movies/remove/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      // const existingUserData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = {
        ...user,
        ...response.data.updatedUser,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      alert("the movie was deleted from the favs");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error occurred:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    alert("Movie could not be deleted");
  }
};

export const fetchMovies = async (): Promise<Movie[] | undefined> => {
  try {
    const userToken = getToken();
    if (!userToken) return;
    const response = await axios.get<Movie[]>(`${baseUrl}/movies`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (response.status === 200) {
      return response.data; // Axios handles JSON parsing automatically
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching movies:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    alert("An error occurred while fetching the movies.");
  }
};

export function isFavorite(movieId: string, favMovieIds: string[]): boolean {
  return favMovieIds.includes(movieId);
}

export async function updateFavoriteMoviesAfterAdd(
  movieId: string,
  favMovieIds: Ref<string[]>
): Promise<void> {
  await addMovie(movieId);
  const userData = getStoredUser();
  if (userData) {
    favMovieIds.value = userData.FavoriteMovies;
  }
}

export async function updateFavoriteMoviesAfterDelete(
  movieId: string,
  favMovieIds: Ref<string[]>
): Promise<void> {
  await deleteMovie(movieId);
  const userData = getStoredUser();
  if (userData) {
    favMovieIds.value = userData.FavoriteMovies;
  }
}
