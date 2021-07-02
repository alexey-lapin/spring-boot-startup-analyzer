import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

import Analyzer from "../views/Analyzer.vue";
import Usage from "../views/Usage.vue";

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
  history:
    process.env.VUE_APP_HISTORY === "hash"
      ? createWebHashHistory(process.env.BASE_URL)
      : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
