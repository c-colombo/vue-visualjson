import Node from "../../../src/components/Node/Node.vue";
import {
  objectNode,
  offsetObjectNode,
  arrayNode,
  offsetArrayNode,
} from "../../../cypress/fixtures/node";
import defaultFormatting from "../../../cypress/fixtures/defaultFormatting";

describe("<Node />", () => {
  it("renders object node without color coding", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: defaultFormatting,
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      objectNode.properties.length
    );
    // cy.screenshot();
  });
  it("renders object node with color coding", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting, colorcodeNodes: true },
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      objectNode.properties.length
    );
    // cy.screenshot();
  });
  it("renders array node without color coding", () => {
    cy.mount(Node, {
      props: {
        nodeData: arrayNode,
        formatting: defaultFormatting,
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      arrayNode.properties.length
    );
    // cy.screenshot();
  });
  it("renders array node with color coding", () => {
    cy.mount(Node, {
      props: {
        nodeData: arrayNode,
        formatting: { ...defaultFormatting, colorcodeNodes: true },
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      arrayNode.properties.length
    );
    // cy.screenshot();
  });
  it("renders object node with offset", () => {
    cy.mount(Node, {
      props: {
        nodeData: offsetObjectNode,
        formatting: defaultFormatting,
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      offsetObjectNode.properties.length
    );
    cy.get("[class='node']").should(
      "have.css",
      "left",
      `${offsetObjectNode.x * 16}px`
    );
    cy.get("[class='node']").should(
      "have.css",
      "top",
      `${offsetObjectNode.y * 16}px`
    );
  });
  it("renders array node with offset", () => {
    cy.mount(Node, {
      props: {
        nodeData: offsetArrayNode,
        formatting: defaultFormatting,
      },
    });
    cy.get("[class='property']").should(
      "have.length",
      offsetArrayNode.properties.length
    );
    cy.get("[class='node']").should(
      "have.css",
      "left",
      `${offsetArrayNode.x * 16}px`
    );
    cy.get("[class='node']").should(
      "have.css",
      "top",
      `${offsetArrayNode.y * 16}px`
    );
  });
  it("has correct text size", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting },
      },
    });
    cy.get("[class='node']").should(
      "have.css",
      "font-size",
      `${defaultFormatting.textSize * 16}px`
    );
  });
  it("has correct line spacing", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting },
      },
    });
    cy.get("[class='node']").should(
      "have.css",
      "line-height",
      `${(defaultFormatting.textSize + defaultFormatting.lineSpacing) * 16}px`
    );
  });
  it("has correct padding", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting },
      },
    });
    cy.get("[class='node']").should(
      "have.css",
      "padding",
      `${defaultFormatting.nodePaddingVertical * 16}px`
    );
  });
  it("has correct width", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting },
      },
    });
    cy.get("[class='node']").should(
      "have.css",
      "width",
      `${defaultFormatting.nodeWidth * 16}px`
    );
  });
  it("has correct height", () => {
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: { ...defaultFormatting },
      },
    });
    cy.get("[class='node']").should(
      "have.css",
      "height",
      `${
        (defaultFormatting.textSize + defaultFormatting.lineSpacing) *
        16 *
        objectNode.properties.length
      }px`
    );
  });
  it("emit decrementIndex", () => {
    const onDecrementIndexSpy = cy.spy().as("onDecrementIndexSpy");
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: defaultFormatting,
        onDecrementIndex: onDecrementIndexSpy,
      },
    })
      .get("[class='property']")
      .eq(5)
      .find("button")
      .eq(1)
      .click()
      .then(() => {
        expect(onDecrementIndexSpy).to.be.calledOnce;
      });
  });
  it("emit incrementIndex", () => {
    const onIncrementIndexSpy = cy.spy().as("onIncrementIndexSpy");
    cy.mount(Node, {
      props: {
        nodeData: objectNode,
        formatting: defaultFormatting,
        onIncrementIndex: onIncrementIndexSpy,
      },
    })
      .get("[class='property']")
      .eq(5)
      .find("button")
      .eq(0)
      .click()
      .then(() => {
        expect(onIncrementIndexSpy).to.be.calledOnce;
      });
  });
});
