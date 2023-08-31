import NodeArrayProperty from "../../../src/components/Node/NodeArrayProperty.vue";
import {
  arrayPropertyWithStrings,
  arrayPropertyWithNumbers,
  arrayPropertyWithBooleans,
  arrayPropertyWithNulls,
  arrayPropertyWithObjects,
  arrayPropertyWithArrays,
  arrayPropertyWithEmptyArray,
  arrayPropertyWithMixedTypes,
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
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithStrings.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithStrings.array.index}:`);
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
  it("renders collapsed array property with strings, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithStrings.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithStrings.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with strings, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithStrings,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
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
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithNumbers.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithNumbers.array.index}:`);
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
  it("renders collapsed array property with numbers, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNumbers,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithNumbers.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithNumbers.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with numbers, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNumbers,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `[42, 43]`);
  });
  it("renders collapsed array property with booleans", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithBooleans,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithBooleans.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithBooleans.array.index}:`);
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
  it("renders collapsed array property with booleans, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithBooleans,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithBooleans.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithBooleans.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with booleans, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithBooleans,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `[true, false]`);
  });
  it("renders collapsed array property with nulls", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNulls,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithNulls.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithNulls.array.index}:`);
    cy.get("h3")
      .eq(3)
      .should(
        "have.text",
        `${
          arrayPropertyWithNulls.array.data[arrayPropertyWithNulls.array.index]
        }`
      );
  });
  it("renders collapsed array property with nulls, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNulls,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithNulls.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithNulls.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with nulls, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithNulls,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `["null", "null"]`);
  });
  it("renders collapsed array property with objects", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithObjects,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithObjects.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithObjects.array.index}:`);
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
  it("renders collapsed array property with objects, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithObjects,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithObjects.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithObjects.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with objects, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithObjects,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `["object", "object"]`);
  });
  it("renders collapsed array property with arrays", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithArrays,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithArrays.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithArrays.array.index}:`);
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
  it("renders collapsed array property with arrays, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithArrays,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithArrays.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithArrays.array.index}:`);
    cy.get("h3")
      .eq(4)
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
  it("renders expanded array property with arrays, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithArrays,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `["array", "array"]`);
  });
  it("renders collapsed array property with empty array", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithEmptyArray,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", `(${0})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3").eq(2).should("have.text", `0:`);
    cy.get("h3").eq(3).should("have.text", `(empty array)`);
  });
  it("renders collapsed array property with empty array, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithEmptyArray,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", `(${0})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3").eq(3).should("have.text", `0:`);
    cy.get("h3").eq(4).should("have.text", `(empty array)`);
  });
  it("renders expanded array property with empty array", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithEmptyArray,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `[]`);
  });
  it("renders expanded array property with empty array, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithEmptyArray,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `[]`);
  });
  it("renders collapsed array property with mixed types", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithMixedTypes,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3")
      .eq(1)
      .should("have.text", `(${arrayPropertyWithMixedTypes.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(2)
      .should("have.text", `${arrayPropertyWithMixedTypes.array.index}:`);
    cy.get("h3").eq(3).should("have.text", `(array)`);
  });
  it("renders collapsed array property with mixed types, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithMixedTypes,
        formatting: { ...defaultFormatting, typeLabels: true },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3")
      .eq(2)
      .should("have.text", `(${arrayPropertyWithMixedTypes.array.length})`);
    cy.get("button").eq(0);
    cy.get("button").eq(1);
    cy.get("h3")
      .eq(3)
      .should("have.text", `${arrayPropertyWithMixedTypes.array.index}:`);
    cy.get("h3").eq(4).should("have.text", `(array)`);
  });
  it("renders expanded array property with mixed types", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithMixedTypes,
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3")
      .eq(2)
      .should("have.text", `["array", 42, true, "null", "object", "array"]`);
  });
  it("renders expanded array property with mixed types, with type labels", () => {
    cy.mount(NodeArrayProperty, {
      props: {
        property: arrayPropertyWithMixedTypes,
        formatting: {
          ...defaultFormatting,
          collapseArrays: false,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "arrayPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<array>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3")
      .eq(3)
      .should("have.text", `["array", 42, true, "null", "object", "array"]`);
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
    cy.get("button").eq(1).click();
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
    cy.get("button").eq(0).click();
    cy.get("@onIncrementIndexSpy").should("have.been.calledOnce");
  });
});
