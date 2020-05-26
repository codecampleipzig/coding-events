<template>
  <div>
    <h1>Dashboard</h1>
    <img class="avatar" v-if="avatarURL" :src="avatarURL" />
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
      const profile = this.$store.state.userData.user.profile;
      return profile
        ? process.env.VUE_APP_API_URL + profile.avatar.formats.thumbnail.url
        : null;
    },
  },
  async created() {
    this.events = (await getEvents()).data;
  },
};
</script>

<style scoped>
img.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
