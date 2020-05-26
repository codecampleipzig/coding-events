import { shallowMount, createLocalVue } from "@vue/test-utils";
import Dashboard from "@/views/Dashboard.vue";
import { getEvents } from "@/services/event-service.js";
import EventCard from "@/components/EventCard.vue";
import Vuex from "vuex";

jest.mock("@/services/event-service.js");

const exampleEvents = [
  {
    id: 1,
    title: "Challenge Session",
    details: "Please bring beer!",
    date: "04/07/2020 20:00",
    location: "https://zoom.us/j/861156*454",
  },
  {
    id: 2,
    title: "Study Group",
    details: "Please bring your laptop!",
    date: "06/19/2020 16:00",
    location: "Albertina",
  },
  {
    id: 3,
    title: "Pair Programming Session",
    details: "Please bring pizza!",
    date: "05/06/2020 15:15",
    location: "https://zoom.us/j/861156*454",
  },
];

describe("Dashboard", () => {
  let localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store({});

  beforeEach(() => {
    getEvents.mockReset();
    getEvents.mockResolvedValue({ data: exampleEvents });
  });
  test("it should call getEvents when created", () => {
    shallowMount(Dashboard, {
      localVue,
      store,
    });

    expect(getEvents).toHaveBeenCalled();
  });

  test("it should set the data property events to the received events when created", async () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      store,
    });

    await getEvents.mock.results[0].value;
    expect(wrapper.vm.events).toEqual(exampleEvents);
  });

  test("it should contain an event card for each event", () => {
    const wrapper = shallowMount(Dashboard, {
      data() {
        return {
          events: exampleEvents,
        };
      },
      localVue,
      store,
    });

    expect(wrapper.findAll(EventCard)).toHaveLength(exampleEvents.length);
  });

  test("it should pass the event as a prop to each event card", () => {
    const wrapper = shallowMount(Dashboard, {
      data() {
        return {
          events: exampleEvents,
        };
      },
      localVue,
      store,
    });

    wrapper.findAll(EventCard).wrappers.every((eventCard, index) => {
      expect(eventCard.vm.event).toEqual(exampleEvents[index]);
    });
  });
});
