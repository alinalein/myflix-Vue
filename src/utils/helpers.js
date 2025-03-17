import axios from "axios";

export const addMovie = async (id) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token')
        let response = await axios.put(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/add/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }

            })
        if (response.status === 200) {
            // returned user that has the data username & favmovies is called !! updatedUser !!, 
            // for that reason merge the user in the localstorage with user returned by api
            const existingUserData = JSON.parse(localStorage.getItem('user'));
            const updatedUserData = {
                ...existingUserData,
                ...response.data.updatedUser
            };
            localStorage.setItem('user', JSON.stringify(updatedUserData));

            alert('movie added to favorites')
        }

    } catch (error) {
        console.log('occured error:', error.response)
        alert('movie could not be added')
    }
}

export const deleteMovie = async (id) => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token')

        let response = await axios.delete(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/remove/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
        if (response.status === 200) {
            const existingUserData = JSON.parse(localStorage.getItem('user'));
            const updatedUserData = {
                ...existingUserData,
                ...response.data.updatedUser
            };
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            alert('the movie was deleted from the favs')
        }
    } catch (error) {
        console.log('occured error:', error.response)
        alert('Movie could not be deleted');
    }
}

export const fetchMovies = async () => {
    try {
        let userToken = localStorage.getItem('token')
        let response = await axios.get('https://movie-api-lina-834bc70d6952.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${userToken}` }
        })
        if (response.status === 200) {
            return response.data;  // Axios handles JSON parsing automatically
        }
    } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        alert('An error occurred while fetching the movies.');
    }
}