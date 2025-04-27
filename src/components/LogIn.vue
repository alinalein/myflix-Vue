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

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStoredUser, getToken } from '@/utils/helpers'
import type { LoginResponse } from '@/types/index';

const username = ref<string>('')
const password = ref<string>('')
const router = useRouter()

const login = async (): Promise<void> => {
    try {
        const response = await axios.post<LoginResponse>('https://movie-api-lina-834bc70d6952.herokuapp.com/users/login',
            {
                Username: username.value,
                Password: password.value
            }, {
            headers: { 'Content-Type': 'application/json' }

        })
        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)
            router.push({ name: 'HomePage' })
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                alert('Could not sign in, please check your login credentials');
            } else {
                console.error('Login error:', error.response?.data || error.message);
                alert('Unexpected error');
            }
        } else {
            console.error('Unknown login error:', error);
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
