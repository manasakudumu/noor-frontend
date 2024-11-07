<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());
const router = useRouter();

// Update the session before mounting the app to check if the user is logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch (error) {
    console.error("Error updating session:", error);
  }
});

const logout = async () => {
  try {
    await userStore.logoutUser();
    await router.push({ name: "Login" });
  } catch (error) {
    console.error("Error during logout or navigation:", error);
  }
};
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/logo.svg" alt="Noor Logo" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>Noor</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }">Home</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Alerting' }" :class="{ underline: currentRouteName == 'Alerting' }">Alerting</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Monitoring' }" :class="{ underline: currentRouteName == 'Monitoring' }">Monitoring</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Messaging' }" :class="{ underline: currentRouteName == 'Messaging' }">Messaging</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }">Settings</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Profile' }" :class="{ underline: currentRouteName == 'Profile' }">Profile</RouterLink>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }">Login</RouterLink>
          <RouterLink :to="{ name: 'Register' }" :class="{ underline: currentRouteName == 'Register' }" style="margin-left: 0.5em">Register</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <button @click="logout" class="logout-button">Logout</button>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
  <footer>Created by Manasa Kudumu</footer>
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: #95b3a8ff;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.logout-button {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: large;
  padding: 0.5em;
}

footer {
  padding: 3em 4em;
  margin-top: 1em;
  background-color: #95b3a8ff;
  text-align: center;
}

.underline {
  text-decoration: underline;
}
</style>
