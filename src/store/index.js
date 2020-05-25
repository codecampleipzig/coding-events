import Vue from "vue";
import Vuex from "vuex";

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
  },
});
