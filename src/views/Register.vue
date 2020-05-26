<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <div class="avatar-preview">
        <img v-if="avatarURL" :src="avatarURL" />
        <p>Preview</p>
      </div>
      <label class="file-upload">
        Upload Avatar
        <input @change="fileSelected" type="file" />
      </label>
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
      avatar: null,
    };
  },
  computed: {
    avatarURL() {
      return this.avatar ? window.URL.createObjectURL(this.avatar) : null;
    },
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("register", this.user);

        try {
          await this.$store.dispatch("uploadAvatar", this.avatar);
        } catch {
          this.$store.dispatch("pushNotification", {
            type: "error",
            message:
              "There was a problem uploading your avatar, please try again from the user profile",
          });
        }
        this.$router.push("/");
      } catch {
        this.$store.dispatch("pushNotification", {
          type: "error",
          message: "Sorry, couldn't register, we are very sorry",
        });
      }
    },
    fileSelected(event) {
      if (event.target.files.length > 0) {
        this.avatar = event.target.files[0];
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.file-upload {
  border: 1px solid lightgray;
  color: gray;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 3px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  display: flex;
  margin: 0.5rem auto;
  border-radius: 50%;
  color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
}
</style>
