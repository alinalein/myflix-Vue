<template>
    <div class="background">
        <h1 class="title_sign_up">Sign Up </h1>

        <div class="signUp">
            <input type="text" v-model="username" placeholder="Enter Username" />
            <input type="email" v-model="email" placeholder="Enter Email" />
            <input type="date" v-model="birthday" placeholder="Enter Birthday" />
            <input type="password" v-model="password" placeholder="Enter Password" />
            <button type="button" v-on:click="signup">Sign Up </button>
        </div>
        <p>
            <router-link class="link_sign-up" to="/log-in">Log In</router-link>
        </p>
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
                    this.$router.push({ name: 'HomePage' })
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('token', response.data.token)
                }
            }
            catch (error) {
                if (error.status === 422) {
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
        // when user data found in localstorage, redirect to homepage
        if (userData) {
            this.$router.push({ name: 'HomePage' });
        }
    }
}
</script>

<style>
.background {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('../assets/final.webp');
    height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.signUp input,
.logIn input {
    width: 300px;
    height: 30px;
    padding-left: 20px;
    display: block;
    margin-bottom: 10px;
    border: 2px solid aqua;
    border-radius: 5px;
}

.signUp button,
.logIn button {
    width: 200px;
    height: 30px;
    background-color: aqua;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.title_sign_up,
.title_log_in {
    padding-bottom: 100px;
    color: white;
}

.link_sign-up,
.link_log-in {
    color: red;
    margin: 100px;
}
</style>