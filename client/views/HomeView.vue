<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const userStore = useUserStore();
const router = useRouter();

// Check if user session is active on component mount
onMounted(async () => {
  await userStore.updateSession();
});

// Watch for changes in login state
watch(isLoggedIn, (newValue: any) => {
  if (!newValue) {
    void router.push({ name: "Login" });
  }
});
</script>

<template>
  <main>
    <header class="header">
      <h1>Welcome to Noor!</h1>
      <h2 v-if="isLoggedIn" class="welcome-message">Let your light, light up the world ⭐️ {{ currentUsername }}!</h2>
      <p class="intro-description">Use Noor to stay connected, and ensure your safety. Start a check-in, send an alert, or message trusted contacts.</p>
      <div class="button-container" v-if="isLoggedIn">
        <RouterLink :to="{ name: 'CheckIn' }">
          <button class="nav-button">Check-In</button>
        </RouterLink>
        <RouterLink :to="{ name: 'Messaging' }">
          <button class="nav-button">Messages</button>
        </RouterLink>
        <RouterLink :to="{ name: 'Alerting' }">
          <button class="nav-button alert-button">Emergency Alert</button>
        </RouterLink>
        <RouterLink :to="{ name: 'TrustedContacts' }">
          <button class="nav-button">Trusted Contacts</button>
        </RouterLink>
        <RouterLink :to="{ name: 'Posting' }">
          <button class="nav-button">Post an Update</button>
        </RouterLink>
        <RouterLink :to="{ name: 'Profile' }">
          <button class="nav-button">My Profile</button>
        </RouterLink>
      </div>
    </header>
    <section class="post-section" v-if="isLoggedIn">
      <h2>Latest Posts</h2>
      <PostListComponent />
    </section>
    <p v-else class="login-prompt">Please log in to see updates from your trusted contacts.</p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2em;
}

h1 {
  font-size: 2.5em;
  color: #2c3e50;
}

.welcome-message {
  color: #16a085;
  font-size: 1.8em;
  margin-top: 0.5em;
}

.intro-description {
  font-size: 1.2em;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0.5em auto;
}

.button-container {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1em;
}

.nav-button {
  padding: 0.8em 1.5em;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.alert-button {
  background-color: red;
}

.nav-button:hover {
  background-color: #2980b9;
}

.post-section {
  width: 100%;
  max-width: 800px;
  padding: 1em;
  border-top: 1px solid #ecf0f1;
}

h2 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 1em;
}

.login-prompt {
  text-align: center;
  font-size: 1.2em;
  color: #7f8c8d;
}
</style>
