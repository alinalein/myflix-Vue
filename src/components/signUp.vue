<template>
    <div class="background">
        <div>
            <h1>Signup</h1>

            <form @submit.prevent="signup" class="signUp">
                <label></label>
                <label>Username, please choose at least 5 characters:</label>
                <input type="text" v-model="username" placeholder="Enter Username" required />
                <label>Email, please choose at least 8 characters:</label>
                <input type="email" v-model="email" placeholder="Enter Email" required />
                <label>Birthday:</label>
                <input type="date" v-model="birthday" placeholder="Enter Birthday" required />
                <label>Password:</label>
                <input type="password" v-model="password" placeholder="Enter Password" required />
                <button type="submit">Signup</button>
            </form>
            <p>Have an account? <router-link class="redirect_link" to="/log-in">Login</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            email: '',
            birthday: '',
            password: ''
        }
    },
    methods: {
        async signup() {
            try {
                let response = await axios.post('https://movie-api-lina-834bc70d6952.herokuapp.com/users/signup', {
                    Username: this.username,
                    Email: this.email,
                    Birthday: this.birthday,
                    Password: this.password
                },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    })

                if (response.status === 201) {
                    this.$router.push({ name: 'LogIn' })
                    alert('Successfully created the user profile')
                }
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    alert('could not sign up, please fill out all fields accordingly ')
                } else if (error.status === 409) {
                    alert('username already exist, please pick another one')
                } else {
                    alert('un unexpected error happened')
                }

            }
        }
    },
    mounted() {
        let userData = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        // when user data found in localstorage, redirect to homepage
        if (userData && token) {
            this.$router.push({ name: 'HomePage' });
        }
    }
}
</script>
