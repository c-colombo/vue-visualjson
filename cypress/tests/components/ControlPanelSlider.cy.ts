import ControlPanelSlider from "../../../src/components/ControlPanel/ControlPanelSlider.vue";

describe("<ControlPanelSlider />", () => {
  it("renders", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
  });
  it("has label", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("h3").should("have.text", "Test: ");
  });
  it("has value", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").should("have.value", "0");
  });
  it("has min", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").should("have.attr", "min", "0");
  });
  it("has max", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").should("have.attr", "max", "100");
  });
  it("has step", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").should("have.attr", "step", "1");
  });
  it("updates value", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").invoke("val", 50).trigger("input");
    cy.get("input").should("have.value", "50");
  });
  it("enforces minimum value", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").invoke("val", -1).trigger("input");
    cy.get("input").should("have.value", "0");
  });
  it("enforces maximum value", () => {
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
      },
    });
    cy.get("input").invoke("val", 101).trigger("input");
    cy.get("input").should("have.value", "100");
  });
  it("emits input", () => {
    const onInputSpy = cy.spy().as("onInputSpy");
    cy.mount(ControlPanelSlider, {
      props: {
        label: "Test",
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        onInput: onInputSpy,
      },
    });
    cy.get("input").invoke("val", 50).trigger("input");
    cy.get("input").should("have.value", "50");
    cy.get("@onInputSpy").should("have.been.calledOnce");
  });
});
