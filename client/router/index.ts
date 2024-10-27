import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

// Importing all views
import AlertingView from "@/views/AlertingView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MessagingView from "@/views/MessagingView.vue";
import MonitoringView from "@/views/MonitoringView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import PostingView from "@/views/PostingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SettingView from "@/views/SettingView.vue";
import TrustedContactsView from "@/views/TrustedContactsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Home" };
        }
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/alerting",
      name: "Alerting",
      component: AlertingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/monitoring",
      name: "Monitoring",
      component: MonitoringView,
      meta: { requiresAuth: true },
    },
    {
      path: "/trusted-contacts",
      name: "TrustedContacts",
      component: TrustedContactsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/messaging",
      name: "Messaging",
      component: MessagingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/posting",
      name: "Posting",
      component: PostingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

/**
 * Global navigation guard to redirect unauthenticated users to the login page.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
