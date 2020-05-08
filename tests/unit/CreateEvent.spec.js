import { mount } from "@vue/test-utils";
import CreateEvent from "@/views/CreateEvent.vue";

describe("CreateEvent", () => {
  test("it has an <h1> heading", () => {
    const wrapper = mount(CreateEvent);

    expect(wrapper.contains("h1")).toBe(true);
  });

  test("it has an <h1> heading with a Create an Event text content", () => {
    const wrapper = mount(CreateEvent);
    expect(wrapper.get("h1").text()).toBe("Create an Event");
  });
});
