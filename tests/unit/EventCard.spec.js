import { mount } from "@vue/test-utils";
import EventCard from "@/components/EventCard.vue";

describe("EventCard", () => {
  test("it should be able to mount the component", () => {
    const wrapper = mount(EventCard);

    expect(wrapper).toBeDefined();
  });
});
