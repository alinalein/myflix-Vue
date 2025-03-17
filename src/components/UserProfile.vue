<template>
    <form @submit.prevent="updateProfile" class="signUp">
        <label for="username">Username</label>
        <input type="text" v-model="username" placeholder="Username" required />
        <label for="username">E-Mail</label>
        <input type="text" v-model="email" placeholder="E-Mail" required />
        <label for="Birthday">Birthday</label>
        <input placeholder="Birthday" type="date" v-model="birthday" required />
        <button type="submit">Update Profile</button>
    </form>

    <button type="button" @click="deleteProfile">Delete Profile</button>
</template>
<script>
import axios from 'axios'

export default {
    name: 'UserProfile',
    data() {
        return {
            username: '',
            email: '',
            birthday: '',
        }
    },
    methods: {
        async updateProfile() {
            const confirmation = confirm("Are you sure you want to change your details.");

            if (!confirmation) {
                return;
            }
            const formattedBirthday = new Date(this.birthday).toISOString().split('T')[0];

            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const token = localStorage.getItem('token')
                let response = await axios.put(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${user.Username}`,
                    {
                        Username: this.username,
                        Email: this.email,
                        Birthday: formattedBirthday

                    }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (response.status === 200) {
                    // the response date is not wrapped in updatedUser as it is the case for add movie return
                    const updatedUser = { ...user, ...response.data };
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    console.log('udated User', updatedUser)
                    this.username = updatedUser.Username;
                    this.email = updatedUser.Email;
                    this.birthday = updatedUser.Birthday.split('T')[0];

                    alert('Profile updated successfully!');
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    alert('Permission denied')
                } else if (error.response?.status === 409) {
                    alert(`${this.username} already exists, please pick another Username.`);
                } else {
                    console.error('Error updating profile:', error.response?.data || error.message);
                    alert('Unexpected error occured')
                }
            }
        },
        async deleteProfile() {
            const confirmation = confirm("Are you sure you want to delete your profile? This action cannot be undone.");

            if (!confirmation) {
                return;
            }
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const token = localStorage.getItem('token')
                let response = await axios.delete(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/deregister/${user.Username}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )

                if (response.status === 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    this.$router.push({ name: 'SignUp' })
                }
            } catch (error) {
                console.error('Error deleting profile:', error.response?.data || error.message);
                alert('Profile could not be deleted')
            }
        },
        formatDate(date) {
            if (!date) return '';
            const parsedDate = new Date(date);
            return parsedDate.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
        }

    },
    mounted() {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.Birthday) {
            // Ensure the date is correctly formatted as "YYYY-MM-DD"
            const parsedDate = new Date(userData.Birthday).toISOString().split('T')[0];
            this.birthday = parsedDate;
        }
        if (userData) {
            this.username = userData.Username || '';
            this.email = userData.Email || '';
        }
    }
}

</script>