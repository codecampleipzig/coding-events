<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input
        type="email"
        v-model="user.email"
        placeholder="Email"
        @blur="$v.user.email.$touch()"
      />
      <template v-if="$v.user.email.$error">
        <div class="error" v-if="!$v.user.email.required">
          Email is required
        </div>
        <div class="error" v-else-if="!$v.user.email.email">
          This is not a valid email address
        </div>
      </template>

      <input
        type="password"
        v-model="user.password"
        placeholder="Password"
        @blur="$v.user.password.$touch()"
      />
      <div class="error" v-if="$v.user.password.$error">
        Password is required and is at least 6 characters long
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
      if (this.$v.$invalid) return;

      try {
        await this.$store.dispatch("login", this.user);
        this.$router.push("/");
      } catch {
        this.$store.dispatch(
          "pushNotification",
          "Failed to login, please check your email and password and try again"
        );
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
  margin-bottom: 0.5em;
  margin-top: -0.8em;
  font-size: 0.8rem;
}
</style>
