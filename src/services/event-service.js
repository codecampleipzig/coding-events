import axios from "axios";

export function createEvent(event) {
  return axios.post("http://localhost:3001/events", event);
}

export function getEvents() {
  return axios.get("http://localhost:3001/events");
}
