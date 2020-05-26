import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import CreateEvent from "@/views/CreateEvent.vue";
import Login from "@/views/Login.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/events/new",
    name: "create-event",
    component: CreateEvent,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // If not authenticated redirect to login
  if (to.name != "login" && store.state.userData == null) {
    return next({ name: "login" });
  }
  next();
});

export default router;
