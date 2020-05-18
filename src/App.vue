<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/events/new">Create Event</router-link>
    </div>
    <router-view />
    <div class="notification-container">
      <p
        v-for="notification in $store.state.notifications"
        :key="notification.id"
      >
        {{ notification.message }}
      </p>
    </div>
  </div>
</template>

<style>
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
