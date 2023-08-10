import Edge from "../../../src/components/Edge.vue";
import {
  objectEdge,
  offsetStartObjectEdge,
  offsetEndObjectEdge,
  arrayEdge,
  offsetStartArrayEdge,
  offsetEndArrayEdge,
} from "../../fixtures/edge";
import defaultFormatting from "../../fixtures/defaultFormatting";

describe("<Edge />", () => {
  it("renders object edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: objectEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = objectEdge.x1 * 16;
    const startY = objectEdge.y1 * 16;
    const lengthX = (objectEdge.x2 - objectEdge.x1) * 16;
    const lengthY = (objectEdge.y2 - objectEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
    // cy.screenshot()
  });
  it("renders object edge with color coding", () => {
    cy.mount(Edge, {
      props: {
        edgeData: objectEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: {
          ...defaultFormatting,
          colorcodeEdges: true,
        },
      },
    });
    cy.get("svg").should("exist");
    const startX = objectEdge.x1 * 16;
    const startY = objectEdge.y1 * 16;
    const lengthX = (objectEdge.x2 - objectEdge.x1) * 16;
    const lengthY = (objectEdge.y2 - objectEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
    // cy.screenshot()
  });
  it("renders offset start object edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: offsetStartObjectEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = offsetStartObjectEdge.x1 * 16;
    const startY = offsetStartObjectEdge.y1 * 16;
    const lengthX = (offsetStartObjectEdge.x2 - offsetStartObjectEdge.x1) * 16;
    const lengthY = (offsetStartObjectEdge.y2 - offsetStartObjectEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
  });
  it("renders offset end object edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: offsetEndObjectEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = offsetEndObjectEdge.x1 * 16;
    const startY = offsetEndObjectEdge.y1 * 16;
    const lengthX = (offsetEndObjectEdge.x2 - offsetEndObjectEdge.x1) * 16;
    const lengthY = (offsetEndObjectEdge.y2 - offsetEndObjectEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
  });
  it("renders array edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: arrayEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = arrayEdge.x1 * 16;
    const startY = arrayEdge.y1 * 16;
    const lengthX = (arrayEdge.x2 - arrayEdge.x1) * 16;
    const lengthY = (arrayEdge.y2 - arrayEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
    // cy.screenshot()
  });
  it("renders array edge with color coding", () => {
    cy.mount(Edge, {
      props: {
        edgeData: arrayEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: {
          ...defaultFormatting,
          colorcodeEdges: true,
        },
      },
    });
    cy.get("svg").should("exist");
    const startX = arrayEdge.x1 * 16;
    const startY = arrayEdge.y1 * 16;
    const lengthX = (arrayEdge.x2 - arrayEdge.x1) * 16;
    const lengthY = (arrayEdge.y2 - arrayEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
    // cy.screenshot()
  });
  it("renders offset start array edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: offsetStartArrayEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = offsetStartArrayEdge.x1 * 16;
    const startY = offsetStartArrayEdge.y1 * 16;
    const lengthX = (offsetStartArrayEdge.x2 - offsetStartArrayEdge.x1) * 16;
    const lengthY = (offsetStartArrayEdge.y2 - offsetStartArrayEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
  });
  it("renders offset end array edge", () => {
    cy.mount(Edge, {
      props: {
        edgeData: offsetEndArrayEdge,
        height: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        width: 12 + 4 * defaultFormatting.nodeSpacingVertical,
        formatting: defaultFormatting,
      },
    });
    cy.get("svg").should("exist");
    const startX = offsetEndArrayEdge.x1 * 16;
    const startY = offsetEndArrayEdge.y1 * 16;
    const lengthX = (offsetEndArrayEdge.x2 - offsetEndArrayEdge.x1) * 16;
    const lengthY = (offsetEndArrayEdge.y2 - offsetEndArrayEdge.y1) * 16;
    cy.get("path").should(
      "have.attr",
      "d",
      `M ${startX} ${startY} C ${startX + lengthX / 2} ${startY} ${
        startX + lengthX / 2
      } ${startY + lengthY} ${startX + lengthX} ${startY + lengthY}`
    );
  });
});
