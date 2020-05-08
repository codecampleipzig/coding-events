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
export default {
  data() {
    return {
      event: {
        title: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.event);
    }
  }
};
</script>

<style scoped></style>
