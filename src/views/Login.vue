<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input
        v-model="user.email"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        v-model="user.password"
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        // Dispatch the login action
        await this.$store.dispatch("login", this.user);
        this.$router.push("/");
      } catch {
        this.$store.dispatch("pushNotification", {
          type: "error",
          message: "Unable to login, please check your inputs and try again.",
        });
      }
    },
  },
};
</script>

<style scoped></style>
