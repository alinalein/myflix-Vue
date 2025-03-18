<template>
    <div class="background">
        <div>
            <h1>Login</h1>

            <form @submit.prevent="login" class="logIn">
                <label>Username:</label>
                <input type="text" v-model="username" placeholder="Username" required />
                <label>Password:</label>
                <input type="password" v-model="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>New to myFlix?
                <router-link class="redirect_link" to="/sign-up">Signup</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                let response = await axios.post('https://movie-api-lina-834bc70d6952.herokuapp.com/users/login',
                    {
                        Username: this.username,
                        Password: this.password
                    }, {
                    headers: { 'Content-Type': 'application/json' }

                })
                if (response.status === 201) {
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('token', response.data.token)
                    this.$router.push({ name: 'HomePage' })
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert('could not sign in, please check your login credentials')
                } else {
                    alert('Unexpected error')
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
