import NodeArrayProperty from "../../../src/components/Node/NodeArrayProperty.vue";
import {
  arrayPropertyWithStrings,
  arrayPropertyWithNumbers,
  arrayPropertyWithBooleans,
  arrayPropertyWithNulls,
  arrayPropertyWithObjects,
  arrayPropertyWithArrays,
} from "../../../cypress/fixtures/nodeProperties";
import defaultFormatting from "../../../cypress/fixtures/defaultFormatting";

describe("<NodeArrayProperty />", () => {
  it("renders", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: defaultFormatting,
      },
    });
  });
  it("renders collapsed array property with strings", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithStrings.array.index + 1}/${
          arrayPropertyWithStrings.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `"${
          arrayPropertyWithStrings.array.data[
            arrayPropertyWithStrings.array.index
          ]
        }"`
      );
  });
  it("renders expanded array property with strings", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3")
      .eq(2)
      .should("have.text", `["arrayPropertyValue1", "arrayPropertyValue2"]`);
  });
  it("renders collapsed array property with numbers", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNumbers,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithNumbers.array.index + 1}/${
          arrayPropertyWithNumbers.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `${
          arrayPropertyWithNumbers.array.data[
            arrayPropertyWithNumbers.array.index
          ]
        }`
      );
  });
  it("renders expanded array property with numbers", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNumbers,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `[42, 43]`);
  });
  it("renders collapsed array property with booleans", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithBooleans,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithBooleans.array.index + 1}/${
          arrayPropertyWithBooleans.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `${
          arrayPropertyWithBooleans.array.data[
            arrayPropertyWithBooleans.array.index
          ]
        }`
      );
  });
  it("renders expanded array property with booleans", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithBooleans,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `[true, false]`);
  });
  it("renders collapsed array property with nulls", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNulls,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithNulls.array.index + 1}/${
          arrayPropertyWithNulls.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `${
          arrayPropertyWithNulls.array.data[arrayPropertyWithNulls.array.index]
        }`
      );
  });
  it("renders expanded array property with nulls", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNulls,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `["null", "null"]`);
  });
  it("renders collapsed array property with objects", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithObjects,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithObjects.array.index + 1}/${
          arrayPropertyWithObjects.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `(${
          arrayPropertyWithObjects.array.data[
            arrayPropertyWithObjects.array.index
          ]
        })`
      );
  });
  it("renders expanded array property with objects", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithObjects,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `["object", "object"]`);
  });
  it("renders collapsed array property with arrays", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithArrays,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(1)
      .should(
        "have.text",
        `${arrayPropertyWithArrays.array.index + 1}/${
          arrayPropertyWithArrays.array.length
        }`
      );
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `(${
          arrayPropertyWithArrays.array.data[
            arrayPropertyWithArrays.array.index
          ]
        })`
      );
  });
  it("renders expanded array property with arrays", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithArrays,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `["array", "array"]`);
  });
  it("emit decrementIndex", () => {
    const onDecrementIndexSpy = cy.spy().as("onDecrementIndexSpy");
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: defaultFormatting,
        onDecrementIndex: onDecrementIndexSpy,
      },
    });
    cy.get("button").eq(0).click();
    cy.get("@onDecrementIndexSpy").should("have.been.calledOnce");
  });
  it("emit incrementIndex", () => {
    const onIncrementIndexSpy = cy.spy().as("onIncrementIndexSpy");
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: defaultFormatting,
        onIncrementIndex: onIncrementIndexSpy,
      },
    });
    cy.get("button").eq(1).click();
    cy.get("@onIncrementIndexSpy").should("have.been.calledOnce");
  });
});
