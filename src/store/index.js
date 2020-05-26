import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    userData: null,
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
    SET_USER_DATA(state, userData) {
      state.userData = userData;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.jwt}`;
    },
  },
  actions: {
    pushNotification(context, { type, message }) {
      const notification = {
        id: getNewId(),
        type: type || "success",
        message,
      };
      context.commit("PUSH_NOTIFICATION", notification);

      setTimeout(() => {
        context.commit("REMOVE_NOTIFICATION", notification);
      }, 6000);
    },
    async login(context, { email, password }) {
      console.log("login", email, password);

      // Make a POST request to /auth/local
      const res = await axios.post(
        process.env.VUE_APP_API_URL + "/auth/local",
        {
          identifier: email,
          password,
        }
      );

      context.commit("SET_USER_DATA", res.data);
    },
  },
});
