import Tree from "../../../src/components/Tree/Tree.vue";
import complexJson from "../../fixtures/mocks/complex-json.json";
import veryComplexJson from "../../fixtures/mocks/very-complex-json.json";
import broadJson from "../../fixtures/mocks/broad-json.json";
import twoDimensionalArrayJson from "../../fixtures/mocks/two-dimensional-array-json.json";
import multiDimensionalArrayJson from "../../fixtures/mocks/multi-dimensional-array-json.json";
import mixedArrayJson from "../../fixtures/mocks/mixed-array-json.json";
import defaultFormatting from "../../fixtures/defaultFormatting";

describe("<Tree />", () => {
  it("renders complexJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(complexJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 4);
    cy.get("[class=edge]").should("have.length", 3);
  });
  it("renders complexJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(complexJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 6);
    cy.get("[class=edge]").should("have.length", 5);
  });
  it("renders veryComplexJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(veryComplexJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 7);
    cy.get("[class=edge]").should("have.length", 6);
  });
  it("renders veryComplexJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(veryComplexJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 15);
    cy.get("[class=edge]").should("have.length", 14);
  });
  it("renders broadJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(broadJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 19);
    cy.get("[class=edge]").should("have.length", 18);
  });
  it("renders broadJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(broadJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 19);
    cy.get("[class=edge]").should("have.length", 18);
  });
  it("renders twoDimensionalArrayJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(twoDimensionalArrayJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 2);
    cy.get("[class=edge]").should("have.length", 1);
  });
  it("renders twoDimensionalArrayJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(twoDimensionalArrayJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 3);
    cy.get("[class=edge]").should("have.length", 2);
  });
  it("renders miltiDimensionalArrayJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(multiDimensionalArrayJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 2);
    cy.get("[class=edge]").should("have.length", 1);
  });
  it("renders miltiDimensionalArrayJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(multiDimensionalArrayJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 3);
    cy.get("[class=edge]").should("have.length", 2);
  });
  it("renders mixedArrayJson with collapsed arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(mixedArrayJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 1);
    cy.get("[class=edge]").should("have.length", 0);
  });
  it("renders mixedArrayJson with expanded arrays", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(mixedArrayJson),
        formatting: { ...defaultFormatting, collapseArrays: false },
      },
    });
    cy.get("[class=node]").should("have.length", 3);
    cy.get("[class=edge]").should("have.length", 2);
  });
  it("renders blank tree with passed invalid JSON", () => {
    cy.mount(Tree, {
      propsData: {
        data: undefined,
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 1);
    cy.get("[class=edge]").should("have.length", 0);
  });
  it("emits treeBuilt when tree is built", () => {
    const onTreeBuiltSpy = cy.spy().as("onTreeBuiltSpy");
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(complexJson),
        formatting: defaultFormatting,
        onTreeBuilt: onTreeBuiltSpy,
      },
    });
    cy.get("@onTreeBuiltSpy").should("have.been.calledOnce");
  });
  it("update array value when array is incremented", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(mixedArrayJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 1);
    cy.get("[class=arrayButton]").eq(1).click();
    cy.get("[class=arrayButton]").eq(1).click();
    cy.get("[class=arrayButton]").eq(1).click();
    cy.get("[class=arrayButton]").eq(1).click();
    cy.get("[class=node]").should("have.length", 2);
    cy.get("[class=edge]").should("have.length", 1);
  });
  it("update array value when array is decremented", () => {
    cy.mount(Tree, {
      propsData: {
        data: JSON.stringify(mixedArrayJson),
        formatting: defaultFormatting,
      },
    });
    cy.get("[class=node]").should("have.length", 1);
    cy.get("[class=arrayButton]").eq(0).click();
    cy.get("[class=node]").should("have.length", 2);
    cy.get("[class=edge]").should("have.length", 1);
  });
});
