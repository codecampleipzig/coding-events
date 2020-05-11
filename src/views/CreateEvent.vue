<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="submit">
      <input
        v-model="event.title"
        type="text"
        name="title"
        placeholder="Add a Title"
      />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      event: {
        title: ""
      }
    };
  },
  methods: {
    async submit() {
      try {
        const res = await axios.post(
          "http://localhost:3000/events",
          this.event
        );
        console.log("Created new event", res.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped></style>
