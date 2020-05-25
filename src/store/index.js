import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

let nextId = 1;

function getNewId() {
  const id = nextId;
  nextId += 1;
  return id;
}

export default new Vuex.Store({
  state: {
    notifications: [],
    user: null,
    profile: null,
  },
  mutations: {
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
      const index = state.notifications.findIndex(
        notification => notification.id == notificationToRemove.id
      );
      state.notifications.splice(index, 1);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.jwt}`;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile;
      localStorage.setItem("profile", JSON.stringify(profile));
    },
    REMOVE_USER(state) {
      state.user = null;
      state.profile = null;
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  actions: {
    pushNotification(context, message) {
      const notification = {
        id: getNewId(),
        message,
      };
      context.commit("PUSH_NOTIFICATION", notification);

      setTimeout(() => {
        context.commit("REMOVE_NOTIFICATION", notification);
      }, 5000);
    },
    async register(context, user) {
      const res = await axios.post(
        `${process.env.VUE_APP_API_URL}/auth/local/register`,
        user
      );

      context.commit("SET_USER", res.data);
    },
    async uploadAvatar({ commit, state }, avatar) {
      if (!state.user) throw new Error("You have to login to upload an avatar");

      const body = new FormData();
      body.set("data", JSON.stringify({ user: state.user.user.id }));
      body.set("files.avatar", avatar);
      const res = await axios.post(
        `${process.env.VUE_APP_API_URL}/profiles`,
        body,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      commit("SET_PROFILE", res.data);
    },
    async login(context, { email, password }) {
      const res = await axios.post(
        `${process.env.VUE_APP_API_URL}/auth/local`,
        { identifier: email, password }
      );

      context.commit("SET_USER", res.data);
      context.commit("SET_PROFILE", res.data.user.profile);
    },
    logout({ commit }) {
      commit("REMOVE_USER");
      router.push("/login");
    },
    loadLocalState({ commit }) {
      const user = localStorage.getItem("user");
      if (user) {
        commit("SET_USER", JSON.parse(user));
      }
      const profile = localStorage.getItem("profile");
      if (profile) {
        commit("SET_PROFILE", JSON.parse(profile));
      }
    },
  },
});
