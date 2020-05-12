import { mount } from "@vue/test-utils";
import Dashboard from "@/views/Dashboard.vue";
import { getEvents } from "@/services/event-service.js";

jest.mock("@/services/event-service.js");

const exampleEvents = [
  {
    id: 1,
    title: "Challenge Session",
    details: "Please bring beer!",
    date: "04/07/2020 20:00",
    location: "https://zoom.us/j/861156*454"
  },
  {
    id: 2,
    title: "Study Group",
    details: "Please bring your laptop!",
    date: "06/19/2020 16:00",
    location: "Albertina"
  },
  {
    id: 3,
    title: "Pair Programming Session",
    details: "Please bring pizza!",
    date: "05/06/2020 15:15",
    location: "https://zoom.us/j/861156*454"
  }
];

describe("Dashboard", () => {
  beforeEach(() => {
    getEvents.mockReset();
    getEvents.mockResolvedValue({ data: exampleEvents });
  });
  test("it should call getEvents when created", () => {
    mount(Dashboard);

    expect(getEvents).toHaveBeenCalled();
  });

  test("it should set the data property events to the received events when created", async () => {
    const wrapper = mount(Dashboard);

    await getEvents.mock.results[0].value;
    expect(wrapper.vm.events).toEqual(exampleEvents);
  });
});
