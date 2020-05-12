import { mount } from "@vue/test-utils";
import EventCard from "@/components/EventCard.vue";

const exampleEvent = {
  id: 1,
  title: "Challenge Session",
  details: "Please bring beer!",
  date: "04/07/2020 20:00",
  location: "https://zoom.us/j/861156*454",
};

describe("EventCard", () => {
  test("it should be able to mount the component", () => {
    const wrapper = mount(EventCard, {
      propsData: {
        event: exampleEvent,
      },
    });

    expect(wrapper).toBeDefined();
  });

  test.skip("it should have a prop called event", () => {
    const wrapper = mount(EventCard, {
      propsData: {
        event: exampleEvent,
      },
    });

    expect(wrapper.vm.event).toEqual(exampleEvent);
  });

  test.skip("is should have an h2 with the event title", () => {
    const wrapper = mount(EventCard, {
      propsData: {
        event: exampleEvent,
      },
    });

    expect(wrapper.get("h2").text()).toBe(exampleEvent.title);
  });

  test.skip("it should have a paragraph with the event details", () => {
    const wrapper = mount(EventCard, {
      propsData: {
        event: exampleEvent,
      },
    });

    expect(
      wrapper.findAll("p").wrappers.find(p => p.text() == exampleEvent.details)
    ).toBeTruthy();
  });

  test.skip("it should have a paragraph which contains the event location", () => {
    const wrapper = mount(EventCard, {
      propsData: {
        event: exampleEvent,
      },
    });

    expect(
      wrapper.findAll("p").wrappers.find(p => p.text() == exampleEvent.location)
    ).toBeTruthy();
  });

  test.skip("it should have an h3 with the event date formatted using Date.prototype.toDateString()", () => {
    const exampleDate = "2020-05-12T18:42:51.592Z";
    const wrapper = mount(EventCard, {
      propsData: {
        event: { ...exampleEvent, date: exampleDate },
      },
    });

    expect(wrapper.get("h3").text()).toBe(new Date(exampleDate).toDateString());
  });
});
