<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const userStore = useUserStore();
const router = useRouter();

// Check if user session is active on component mount
onMounted(async () => {
  console.log("Checking session...");
  await userStore.updateSession();
  console.log("Session updated. Is logged in:", isLoggedIn.value);
});

watch(isLoggedIn, (newValue) => {
  console.log("Login state changed:", newValue);
  if (!newValue) {
    void router.push({ name: "Login" });
  }
});
</script>

<template>
  <main>
    <header class="header">
      <h1>Welcome to Noor!</h1>
      <p class="intro-description">Use Noor to stay connected and ensure your safety. Start a check-in, send an alert, or message trusted contacts.</p>
      <div class="button-container">
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
      </div>
    </header>
  </main>
</template>

<style scoped>
/* Styling remains unchanged */
</style>
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
  background-color: #95b3a8ff;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.alert-button {
  background-color: rgb(244, 110, 110);
}

.nav-button:hover {
  background-color: rgb(110, 152, 137);
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
