<template>
  <div>
    <h1>Dashboard</h1>
    <img v-if="avatarURL" :src="avatarURL" class="avatar" />
    <p>{{ $store.state.userData.user.username }}</p>
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
  computed: {
    avatarURL() {
      // Check if logged in
      const userData = this.$store.state.userData;
      if (!userData) return null;

      // Check if there's a profile
      const profile = userData.user.profile;
      if (!profile) return null;

      return process.env.VUE_APP_UPLOAD_URL + profile.avatar.url;
    },
  },
  async created() {
    this.events = (await getEvents()).data;
  },
};
</script>

<style scoped>
img.avatar {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
