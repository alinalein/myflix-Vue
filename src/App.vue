<template>
  <AppNavigation />
  <router-view />
</template>

<script setup lang="ts">
import AppNavigation from './components/AppNavigation.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('../src/assets/final.webp');
}

.update_div {
  height: 100%;
  width: 100%;
  background-color: rgb(50, 49, 49);
}

.update_div,
.background {
  height: 92vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.update_form {
  box-shadow: 6px 6px 17px rgba(212, 209, 209, 0.2);
}

.background div,
.update_form {
  width: 35%;
  display: flex;
  flex-direction: column;
  background-color: rgba(3, 3, 3, 0.562);
  border-radius: 4px;
  padding: 30px;
}

.background h1,
.update_form h1 {
  padding-bottom: 5vh;
  color: white;
}

.background p {
  padding-top: 5%;
  color: gray;
  align-self: flex-start;
}

.signUp,
.logIn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.signUp label,
.logIn label {
  color: rgba(154, 151, 151, 0.943);
  padding: 2px;
}

.signUp input,
.logIn input {
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
  font-size: 0.95rem;
  padding: 1.2rem 1rem 0.5rem;
  display: block;
  margin-bottom: 15px;
  background-color: rgba(75, 73, 73, 0.8);
  border-radius: 8px;
}

.logIn input::placeholder,
.signUp input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

input[type="date"] {
  color: rgba(255, 255, 255, 0.9);
  opacity: 0.7;
}

.signUp button,
.logIn button {
  width: 100%;
  color: white;
  height: 2.5rem;
  background-color: rgb(229, 9, 20);
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 1.2rem;
  cursor: pointer;
  transition-duration: 250ms;
  transition-property: background-color;
}

.signUp button:hover,
.logIn button:hover {
  background-color: rgba(229, 9, 20, 0.731);
}

.redirect_link {
  text-decoration: none;
  color: white;
  font-weight: 750;
}

@media (max-width: 1180px) {

  .background div,
  .update_form {
    width: 60%
  }
}

@media (max-width: 720px) {

  .background div,
  .update_form {
    width: 95%
  }
}
</style>