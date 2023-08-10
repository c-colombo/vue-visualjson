import ControlPanelSwitch from "../../../src/components/ControlPanel/ControlPanelSwitch.vue";

describe("<ControlPanelSwitch />", () => {
  it("renders", () => {
    cy.mount(ControlPanelSwitch, {
      props: {
        label: "Test",
        value: false,
      },
    });
  });
  it("has label", () => {
    cy.mount(ControlPanelSwitch, {
      props: {
        label: "Test",
        value: false,
      },
    });
    cy.get("h3").should("have.text", "Test: ");
  });
  it("toggles", () => {
    cy.mount(ControlPanelSwitch, {
      props: {
        label: "Test",
        value: false,
      },
    });
    cy.get("input").click();
    cy.get("input").should("be.checked");
    cy.get("input").click();
    cy.get("input").should("not.be.checked");
  });
  it("emits input", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(ControlPanelSwitch, {
      props: {
        label: "Test",
        value: false,
        onChange: onChangeSpy,
      },
    });
    cy.get("input").click();
    cy.get("input").should("be.checked");
    cy.get("@onChangeSpy").should("have.been.calledOnce");
    cy.get("input").click();
    cy.get("input").should("not.be.checked");
    cy.get("@onChangeSpy").should("have.been.calledTwice");
  });
});
