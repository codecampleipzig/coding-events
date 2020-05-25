<template>
  <div>
    <img v-if="avatarURL" class="profile-img" :src="avatarURL" />
    <p v-if="$store.state.user">{{ $store.state.user.user.username }}</p>
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
  computed: {
    avatarURL() {
      if (!this.$store.state.profile) {
        return "";
      }
      return `${process.env.VUE_APP_API_URL}${this.$store.state.profile.avatar.formats.thumbnail.url}`;
    },
  },
};
</script>

<style scoped>
.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
