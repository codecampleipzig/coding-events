<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/events/new">Create Event</router-link>
    </div>
    <router-view />
    <transition appear name="fade">
      <div
        class="notification-container"
        v-if="$store.state.notifications.length > 0"
      >
        <div
          v-for="notification in $store.state.notifications"
          :key="notification.id"
        >
          <p>
            {{ notification.message }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter {
  opacity: 0;
  transform: scaleY(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: none;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  transition: all 1s;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100vh) translateX(-100vw) scale(5);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.notification-container {
  position: fixed;
  right: 1em;
  bottom: 1em;
  width: 300px;
}

.notification-container p {
  background-color: rgba(0, 255, 0, 0.2);
  color: green;
  border-left: 3px solid green;
  padding: 1em 0;
}
</style>
