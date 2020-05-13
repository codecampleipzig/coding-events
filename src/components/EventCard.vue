<template>
  <div>
    <h2>{{ event.title }}</h2>
    <h3>{{ formattedDate }}</h3>
    <p>{{ event.location }}</p>
    <p>{{ event.details }}</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
  computed: {
    formattedDate() {
      return new Date(this.event.date).toDateString();
    },
  },
};
</script>

<style scoped></style>
