import NodeProperty from "../../../src/components/Node/NodeProperty.vue";
import {
  stringProperty,
  numberProperty,
  booleanProperty,
  nullProperty,
  objectProperty,
} from "../../../cypress/fixtures/nodeProperties";
import defaultFormatting from "../../../cypress/fixtures/defaultFormatting";

describe("<NodeProperty />", () => {
  it("renders", () => {
    cy.mount(NodeProperty, {
      props: {
        property: stringProperty,
        formatting: defaultFormatting,
      },
    });
  });
  it("renders string property", () => {
    cy.mount(NodeProperty, {
      props: {
        property: stringProperty,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "stringPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", `"stringPropertyValue"`);
  });
  it("renders number property", () => {
    cy.mount(NodeProperty, {
      props: {
        property: numberProperty,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "numberPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", "42");
  });
  it("renders boolean property", () => {
    cy.mount(NodeProperty, {
      props: {
        property: booleanProperty,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "booleanPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", "true");
  });
  it("renders null property", () => {
    cy.mount(NodeProperty, {
      props: {
        property: nullProperty,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "nullPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", "null");
  });
  it("renders object property", () => {
    cy.mount(NodeProperty, {
      props: {
        property: objectProperty,
        formatting: defaultFormatting,
      },
    });
    cy.get("h3").eq(0).should("have.text", "objectPropertyKey");
    cy.get("h3").eq(1).should("have.text", ":");
    cy.get("h3").eq(2).should("have.text", "(object)");
  });
  it("renders type labels", () => {
    cy.mount(NodeProperty, {
      props: {
        property: stringProperty,
        formatting: {
          ...defaultFormatting,
          typeLabels: true,
        },
      },
    });
    cy.get("h3").eq(0).should("have.text", "stringPropertyKey");
    cy.get("h3").eq(1).should("have.text", "<string>");
    cy.get("h3").eq(2).should("have.text", ":");
    cy.get("h3").eq(3).should("have.text", `"stringPropertyValue"`);
  });
});
