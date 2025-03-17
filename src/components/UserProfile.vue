<template>
    <p>Username: {{ userName }}</p>
    <p>E-Mail: {{ eMail }}</p>
    <p>Birthday: {{ birthDay }}</p>

    <input type="text" v-model="tempUserName" placeholder="Username" />
    <input type="text" v-model="tempEmail" placeholder="E-Mail" />
    <input type="date" v-model="tempBirthday" placeholder="Birthday" />
    <button type="button" v-on:click="updateProfile">Update Profile</button>

    <button type="button" @click="deleteProfile">Delete Profile</button>
</template>
<script>
import axios from 'axios'

export default {
    name: 'UserProfile',
    data() {
        return {
            userName: '',
            eMail: '',
            birthDay: '',

            tempUserName: '',
            tempEmail: '',
            tempBirthday: ''
        }
    },
    methods: {
        async updateProfile() {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const token = localStorage.getItem('token')
                console.log('Token:', token);
                let response = await axios.put(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${user.Username}`,
                    {
                        Username: this.tempUserName,
                        Email: this.tempEmail,
                        Birthday: this.tempBirthday

                    }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (response.status === 200) {
                    const updatedUser = { ...user, ...response.data.updatedUser };
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    console.log('udated User', updatedUser)
                    this.userName = updatedUser.Username;
                    this.eMail = updatedUser.Email;
                    this.birthDay = updatedUser.Birthday;

                    alert('Profile updated successfully!');
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    alert('Permission denied')
                } else if (error.response?.status === 409) {
                    const conflictingUsername = error.data?.updatedUser?.Username || this.userName;
                    alert(`${conflictingUsername} already exists, please pick another Username.`);
                } else {
                    console.error('Error updating profile:', error.response?.data || error.message);
                    alert('Unexpected error occured')
                }
            }
        },
        async deleteProfile() {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const token = localStorage.getItem('token')
                console.log('Token:', token);
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
        }

    },
    mounted() {
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
            // Displayed data
            this.userName = userData.Username || '';
            this.eMail = userData.Email || '';
            this.birthDay = userData.Birthday || '';

            // Initialize temporary fields for editing
            this.tempUserName = this.userName;
            this.tempEmail = this.eMail;
            this.tempBirthday = this.birthDay;
        }
    }
}

</script>