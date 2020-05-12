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
import { createEvent } from "@/services/event-service.js";

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
        const res = await createEvent(this.event);
        console.log("Created new event", res.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped></style>
