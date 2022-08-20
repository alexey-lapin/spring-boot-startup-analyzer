import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import Analyzer from "@/views/AnalyzerView.vue";
import Usage from "@/views/UsageView.vue";

const router = createRouter({
  history:
    import.meta.env.VITE_APP_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Analyzer,
    },
    {
      path: "/usage",
      name: "Usage",
      component: Usage,
    },
  ],
});

export default router;
