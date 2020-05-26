<template>
  <div id="app">
    <div v-if="$store.state.userData == null" id="nav">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
    <div v-else id="nav">
      <router-link :to="{ name: 'dashboard' }">Dashboard</router-link> |
      <router-link :to="{ name: 'create-event' }">Create Event</router-link>
    </div>
    <router-view />
    <div class="notification-container">
      <transition-group tag="span" name="list">
        <div
          v-for="notification in $store.state.notifications"
          :key="notification.id"
        >
          <p :class="notification.type">
            {{ notification.message }}
          </p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style>
.list-enter {
  opacity: 0;
  transform: scaleY(0);
}

.list-enter-active {
  transition: all 1s;
}

.list-enter-to {
  opacity: 1;
  transform: none;
}

.list-leave {
  opacity: 1;
}

.list-leave-active {
  transition: all 1s;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
  margin: auto;
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
  background-color: rgb(223, 253, 223);
  color: green;
  border-left: 3px solid green;
  padding: 1em 0.5em;
}

.notification-container p.error {
  color: red;
  background-color: rgb(255, 219, 219);
  border-left: 3px solid red;
}

input {
  display: block;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.2em;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  font-family: inherit;
}

button {
  font-size: 1rem;
  -webkit-appearance: none;
  -moz-appearnce: none;
  border: 1px solid #42b983;
  color: #42b983;
  outline: none;
  width: auto;
  cursor: pointer;
  padding: 0.5rem 2rem;
  font-family: inherit;
  border-radius: 3px;
  font-weight: 500;
}
</style>
