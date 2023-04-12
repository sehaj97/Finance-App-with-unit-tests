import React from "react";
import { shallow, mount } from "enzyme";
import AccountBalance from "../components/AccountBalance";
import Notification from "../components/Notification";
import toJson from "enzyme-to-json";

const userBalance = {
  balance: 1100,
  savingsBalance: 103,
};

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
