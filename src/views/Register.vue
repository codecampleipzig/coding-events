<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submit">
      <div class="avatar-preview">
        <img v-if="avatarPreviewURL" :src="avatarPreviewURL" />
        <p>Preview</p>
      </div>

      <label class="file-upload"
        >Choose Avatar
        <input type="file" @change="fileSelected" />
      </label>
      <input type="text" v-model="user.username" placeholder="Username" />
      <input type="email" v-model="user.email" placeholder="Email" />
      <input type="password" v-model="user.password" placeholder="Password" />
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
      avatar: "",
    };
  },
  computed: {
    avatarPreviewURL() {
      return this.avatar ? window.URL.createObjectURL(this.avatar) : "";
    },
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("register", this.user);
        try {
          await this.$store.dispatch("uploadAvatar", this.avatar);
        } catch (error) {
          this.$store.dispatch(
            "pushNotification",
            "Couldn't upload Image, please visit your user profile and try again."
          );
        } finally {
          this.$router.push("/");
        }
      } catch (error) {
        this.$store.dispatch(
          "pushNotification",
          "Failed to register, please check your inputs and try again"
        );
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
  cursor: pointer;
  font-size: 1rem;
  -webkit-appearance: none;
  -moz-appearnce: none;
  border: 1px solid lightgray;
  color: gray;
  outline: none;
  width: auto;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 3px;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
}

.avatar-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 1rem auto;
  border-radius: 50%;
  border: 1px solid lightgray;
  position: relative;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 50%;
}

.avatar-preview p {
  color: lightgray;
  margin: 0;
}
</style>
