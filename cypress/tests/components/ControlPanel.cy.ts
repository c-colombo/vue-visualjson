import ControlPanel from "../../../src/components/ControlPanel/ControlPanel.vue";
import defaultFormatting from "../../fixtures/defaultFormatting";

const switchCount = Object.entries(defaultFormatting).filter((entry) => {
  if (typeof entry[1] === "boolean") return entry;
}).length;
const sliderCount =
  Object.entries(defaultFormatting).filter((entry) => {
    if (typeof entry[1] === "number") return entry;
  }).length - 2;

describe("<ControlPanel />", () => {
  it("renders", () => {
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
      },
    });
  });
  it("loads default formatting", () => {
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
      },
    });
    cy.get("input[type=checkbox]").eq(0).should("be.checked");
    cy.get("input[type=checkbox]").eq(1).should("not.be.checked");
    cy.get("input[type=checkbox]").eq(2).should("not.be.checked");
    cy.get("input[type=checkbox]").eq(3).should("not.be.checked");
    cy.get("input[type=range]").eq(0).should("have.value", "0.75");
    cy.get("input[type=range]").eq(1).should("have.value", "0.25");
    cy.get("input[type=range]").eq(2).should("have.value", "24");
    cy.get("input[type=range]").eq(3).should("have.value", "4");
    cy.get("input[type=range]").eq(4).should("have.value", "6");
  });
  it("has sliders", () => {
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
      },
    });
    cy.get("input[type=range]").should("have.length", sliderCount);
  });
  it("has switches", () => {
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
      },
    });
    cy.get("input[type=checkbox]").should("have.length", switchCount);
  });
  it("emits collapseArrays", () => {
    const onUpdateCollapseArraysSpy = cy.spy().as("onUpdateCollapseArraysSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:collapseArrays": onUpdateCollapseArraysSpy,
      },
    });
    cy.get("input[type=checkbox]").eq(0).click();
    cy.get("@onUpdateCollapseArraysSpy").should("have.been.calledOnce");
  });
  it("emits colorcodeEdges", () => {
    const onUpdateColorcodeEdgesSpy = cy.spy().as("onUpdateColorcodeEdgesSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:colorcodeEdges": onUpdateColorcodeEdgesSpy,
      },
    });
    cy.get("input[type=checkbox]").eq(1).click();
    cy.get("@onUpdateColorcodeEdgesSpy").should("have.been.calledOnce");
  });
  it("emits colorcodeNodes", () => {
    const onUpdateColorcodeNodesSpy = cy.spy().as("onUpdateColorcodeNodesSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:colorcodeNodes": onUpdateColorcodeNodesSpy,
      },
    });
    cy.get("input[type=checkbox]").eq(2).click();
    cy.get("@onUpdateColorcodeNodesSpy").should("have.been.calledOnce");
  });
  it("emits typeLabels", () => {
    const onUpdateTypeLabelsSpy = cy.spy().as("onUpdateTypeLabelsSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:typeLabels": onUpdateTypeLabelsSpy,
      },
    });
    cy.get("input[type=checkbox]").eq(3).click();
    cy.get("@onUpdateTypeLabelsSpy").should("have.been.calledOnce");
  });
  it("emits textSize", () => {
    const onUpdateTextSizeSpy = cy.spy().as("onUpdateTextSizeSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:textSize": onUpdateTextSizeSpy,
      },
    });
    cy.get("input[type=range]").eq(0).invoke("val", 1).trigger("input");
    cy.get("@onUpdateTextSizeSpy").should("have.been.calledOnce");
  });
  it("emits lineSpacing", () => {
    const onUpdateLineSpacingSpy = cy.spy().as("onUpdateLineSpacingSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:lineSpacing": onUpdateLineSpacingSpy,
      },
    });
    cy.get("input[type=range]").eq(1).invoke("val", 1).trigger("input");
    cy.get("@onUpdateLineSpacingSpy").should("have.been.calledOnce");
  });
  it("emits nodeWidth", () => {
    const onUpdateNodeWidthSpy = cy.spy().as("onUpdateNodeWidthSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:nodeWidth": onUpdateNodeWidthSpy,
      },
    });
    cy.get("input[type=range]").eq(2).invoke("val", 1).trigger("input");
    cy.get("@onUpdateNodeWidthSpy").should("have.been.calledOnce");
  });
  it("emits nodeSpacingVertical", () => {
    const onUpdateNodeSpacingVerticalSpy = cy
      .spy()
      .as("onUpdateNodeSpacingVerticalSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:nodeSpacingVertical": onUpdateNodeSpacingVerticalSpy,
      },
    });
    cy.get("input[type=range]").eq(3).invoke("val", 1).trigger("input");
    cy.get("@onUpdateNodeSpacingVerticalSpy").should("have.been.calledOnce");
  });
  it("emits tierSpacingHorizontal", () => {
    const onUpdateTierSpacingHorizontalSpy = cy
      .spy()
      .as("onUpdateTierSpacingHorizontalSpy");
    cy.mount(ControlPanel, {
      props: {
        formatting: defaultFormatting,
        "onUpdate:tierSpacingHorizontal": onUpdateTierSpacingHorizontalSpy,
      },
    });
    cy.get("input[type=range]").eq(4).invoke("val", 1).trigger("input");
    cy.get("@onUpdateTierSpacingHorizontalSpy").should("have.been.calledOnce");
  });
});
