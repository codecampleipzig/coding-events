<template>
  <div>
    <h1>Register</h1>
    <div class="avatar-preview">
      <p>Preview</p>
    </div>
    <form @submit.prevent="submit">
      <label class="file-upload">
        Upload Avatar
        <input type="file"
      /></label>
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

<style scoped>
.file-upload input[type="file"] {
  display: none;
}

.file-upload {
  border: 1px solid lightgrey;
  color: grey;
  width: auto;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 3px;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border: 1px solid lightgrey;
  color: grey;
  margin: 0.8rem auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
