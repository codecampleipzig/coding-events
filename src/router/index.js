import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import CreateEvent from "@/views/CreateEvent.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
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
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != "register" && to.name != "login" && store.state.user == null) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
