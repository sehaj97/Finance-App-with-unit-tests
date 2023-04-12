import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import AccountBalance from "./components/AccountBalance";
import Notification from "./components/Notification";

// unit test
it("renders App without crashing", () => {
  shallow(<App />);
});

// component test
describe("renders component", () => {
  it("renders App without crashing", () => {
    shallow(<App />);
  });

  it("renders header without crashing", () => {
    const wrapper = shallow(<App />);
    const welcomeHeader = (
      <h1 className="has-text-centered title is-1">
        Welcome in the personal finance app!
      </h1>
    );
    expect(wrapper.contains(welcomeHeader)).toEqual(true);
  });
});
