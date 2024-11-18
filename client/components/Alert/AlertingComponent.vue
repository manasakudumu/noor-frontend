<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

interface Alert {
  _id: string;
  userId: string;
  status: boolean;
  location: string;
}

const alertStatus = ref<Alert | null>(null);
const isLoading = ref(false);
const error = ref("");

async function activateEmergency() {
  isLoading.value = true;
  try {
    const response = await fetchy("/api/alert/activate", "POST", {});
    alertStatus.value = response as Alert;
    error.value = ""; // Clear any previous error
  } catch (err) {
    error.value = "Failed to activate emergency alert. Please try again.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

onBeforeMount(async () => {
  try {
    const response = await fetchy("/api/alert/status", "GET", {});
    alertStatus.value = response as Alert;
  } catch (err) {
    error.value = "Failed to load alert status";
  }
});
</script>

<template>
  <div class="alert-container">
    <h2>Emergency Alert</h2>
    <button @click="activateEmergency" class="emergency-button" :disabled="isLoading">Activate Emergency</button>
    <p v-if="alertStatus && alertStatus.status">Emergency is active. Location sent to trusted contacts.</p>
    <p v-else>Press the button in case of an emergency to alert your trusted contacts.</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.alert-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5em;
}

.emergency-button {
  padding: 1em 2em;
  font-size: 1.5em;
  background-color: #e87878;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.emergency-button:disabled {
  background-color: #ffcccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1em;
}
</style>
