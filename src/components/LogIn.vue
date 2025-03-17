<template>
    <div class="background">
        <h1 class="title_log_in">Log In</h1>

        <form @submit.prevent="login" class="logIn">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Log In</button>
        </form>
        <p>
            <router-link class="link_log-in" to="/sign-up">Sign Up</router-link>
        </p>
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

<style></style>