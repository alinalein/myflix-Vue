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

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStoredUser, getToken } from '@/utils/helpers'
import type { SignupResponse } from '@/types/index';

const username = ref<string>('')
const birthday = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()

const signup = async (): Promise<void> => {
    try {
        const response = await axios.post<SignupResponse>('https://movie-api-lina-834bc70d6952.herokuapp.com/users/signup', {
            Username: username.value,
            Email: email.value,
            Birthday: birthday.value,
            Password: password.value
        },
            {
                headers: { 'Content-Type': 'application/json' }
            })

        if (response.status === 201) {
            router.push({ name: 'LogIn' })
            alert('Successfully created the user profile')
        }
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                alert('Could not sign up, please fill out all fields accordingly');
            } else if (error.response.status === 409) {
                alert('username already exist, please pick another one')
            }
            else {
                alert('Unexpected error');
            }
        } else {
            alert('Unexpected error');
        }
    }
}
onMounted(async (): Promise<void> => {
    const userData = getStoredUser()
    const token = getToken()
    // when user data found in localstorage, redirect to homepage
    if (userData && token) {
        router.push({ name: 'HomePage' });
    }
})
</script>
