<template>
  <div>
    <h1>Dashboard</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></EventCard>
  </div>
</template>

<script>
import { getEvents } from "@/services/event-service.js";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  async created() {
    this.events = (await getEvents()).data;
  },
};
</script>

<style scoped></style>
