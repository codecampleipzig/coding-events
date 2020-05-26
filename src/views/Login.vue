<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input
        v-model="user.email"
        type="email"
        name="email"
        placeholder="Email"
        @blur="$v.user.email.$touch()"
      />
      <div v-if="$v.user.email.$error" class="error">
        Email is required, please check your input
      </div>
      <input
        v-model="user.password"
        type="password"
        name="password"
        placeholder="Password"
        @blur="$v.user.password.$touch()"
      />
      <div v-if="$v.user.password.$error" class="error">
        Password is required, has to have at least 6 characters
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

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
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

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
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  text-align: left;
  font-size: 0.8rem;
  margin-bottom: 0.5em;
  margin-top: -0.8em;
}
</style>
