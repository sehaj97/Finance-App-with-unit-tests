import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import AccountBalance from "./components/AccountBalance";
import Notification from "./components/Notification";
import toJson from "enzyme-to-json";

const userBalance = {
  balance: 1100,
  savingsBalance: 103,
};

// unit test
it("1. renders App without crashing", () => {
  shallow(<App />);
});

// notification component test
describe("renders notification component", () => {
  it("renders App without crashing", () => {
    shallow(<Notification />);
  });
});

// App component test
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
  it("renders button", () => {
    const wrapper = mount(<AccountBalance accounts={userBalance} />);
    const label = wrapper.find("#balance-button").text();
    expect(label).toEqual("Send 100$");
  });
});

// test for props
describe("passing props properly", () => {
  const accountWrapper = mount(<AccountBalance accounts={userBalance} />);
  const notificationWrapper = mount(
    <Notification balance={userBalance.balance} />
  );
  it("accepts user account props", () => {
    expect(accountWrapper.props().accounts).toEqual(userBalance);
  });
  it("contains savingBalance value", () => {
    const value = accountWrapper.find(".savings").text();
    const expectedValue = userBalance.savingsBalance + "$";
    expect(value).toEqual(expectedValue);
  });
  it("notification accepts props", () => {
    expect(notificationWrapper.props().balance).toEqual(userBalance.balance);
  });
});

// test logic
describe("logic", () => {
  const wrapper = mount(<AccountBalance accounts={userBalance} />);
  const notificationWrapper = mount(
    <Notification balance={userBalance.balance} />
  );
  wrapper.find("#balance-button").simulate("click");
  it("button click - update savings", () => {
    const savingsValue = wrapper.find(".savings").text();
    const expectedValue = userBalance.savingsBalance + 100 + "$";
    expect(savingsValue).toEqual(expectedValue);
  });
  it("button click - update balance", () => {
    const balanceValue = wrapper.find(".balance").text();
    const expectedBalanceValue = userBalance.balance - 100 + "$";
    expect(balanceValue).toEqual(expectedBalanceValue);
  });
});

describe("snapshots", () => {
  it("App snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Accounts snapshots", () => {
    const accountBalanceTree = shallow(
      <AccountBalance accounts={userBalance} />
    );
    expect(toJson(accountBalanceTree)).toMatchSnapshot();
  });
  it("Notification snapshot", () => {
    const notificationTree = shallow(<Notification />);
    expect(toJson(notificationTree)).toMatchSnapshot();
  });
});
