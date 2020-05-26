<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <input
        v-model="user.username"
        type="text"
        name="username"
        placeholder="Username"
      />
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

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("register", this.user);
        this.$router.push("/");
      } catch {
        this.$store.dispatch("pushNotification", {
          type: "error",
          message: "Sorry, couldn't register, please check your inputs",
        });
      }
    },
  },
};
</script>

<style scoped></style>
