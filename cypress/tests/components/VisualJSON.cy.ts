import VisualJSON from "../../../src/components/VisualJSON.vue";
import complexJson from "../../fixtures/mocks/complex-json.json";

describe("<VisualJSON />", () => {
  it("renders with valid json", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
      },
    });
    cy.get("[class=button-row]").should("have.length", 1);
    cy.get("[class=button]").should("have.length", 2);
    cy.get("[class=control-panel]").should("have.length", 0);
    cy.get("[class=content]").should("have.length", 1);
    cy.get("[class=error]").should("have.length", 0);
    cy.get("[class=node]").should("have.length", 4);
    cy.get("[class=edge]").should("have.length", 3);
  });
  it("renders with invalid json", () => {
    cy.mount(VisualJSON, {
      props: {
        json: undefined,
      },
    });
    cy.get("[class=button-row]").should("have.length", 1);
    cy.get("[class=button]").should("have.length", 2);
    cy.get("[class=control-panel]").should("have.length", 0);
    cy.get("[class=content]").should("have.length", 0);
    cy.get("[class=error]").should("have.length", 1);
  });
  it("renders with custom formatting", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
        defaultFormatting: {
          collapseArrays: false,
          colorcodeEdges: false,
          colorcodeNodes: false,
          typeLabels: false,
          textSize: 0.75,
          lineSpacing: 0.25,
          nodePaddingVertical: 0.5,
          nodePaddingHorizontal: 0.5,
          nodeWidth: 24,
          nodeSpacingVertical: 4,
          tierSpacingHorizontal: 6,
        },
      },
    });
    cy.get("[class=button-row]").should("have.length", 1);
    cy.get("[class=button]").should("have.length", 2);
    cy.get("[class=control-panel]").should("have.length", 0);
    cy.get("[class=content]").should("have.length", 1);
    cy.get("[class=error]").should("have.length", 0);
    cy.get("[class=node]").should("have.length", 6);
    cy.get("[class=edge]").should("have.length", 5);
  });
  it("renders with partially custom formatting", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
        defaultFormatting: {
          collapseArrays: false,
        },
      },
    });
    cy.get("[class=button-row]").should("have.length", 1);
    cy.get("[class=button]").should("have.length", 2);
    cy.get("[class=control-panel]").should("have.length", 0);
    cy.get("[class=content]").should("have.length", 1);
    cy.get("[class=error]").should("have.length", 0);
    cy.get("[class=node]").should("have.length", 6);
    cy.get("[class=edge]").should("have.length", 5);
  });
  it("opens control panel when button is clicked", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
      },
    });
    cy.get("[class=button]").eq(1).click();
    cy.get("[class=control-panel]").should("have.length", 1);
  });
  it("closes control panel when button is clicked", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
      },
    });
    cy.get("[class=button]").eq(1).click();
    cy.get("[class=control-panel]").should("have.length", 1);
    cy.get("[class=button]").eq(1).click();
    cy.get("[class=control-panel]").should("have.length", 0);
  });
  it("zooms in viewport when mouse scrolls up", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
      },
    }).then(() => {
      cy.get("[class=content]").should(
        "have.css",
        "transform",
        "matrix(1, 0, 0, 1, 0, 0)"
      );
      cy.get("[class=visualjson]").trigger("wheel", {
        deltaY: -100,
      });
      cy.get("[class=content]").should(
        "have.css",
        "transform",
        "matrix(1.1, 0, 0, 1.1, 8.6, -24)"
      );
    });
  });
  it("zooms out viewport when mouse scrolls down", () => {
    cy.mount(VisualJSON, {
      props: {
        json: JSON.stringify(complexJson),
      },
    }).then(() => {
      cy.get("[class=content]").should(
        "have.css",
        "transform",
        "matrix(1, 0, 0, 1, 0, 0)"
      );
      cy.get("[class=visualjson]").trigger("wheel", {
        deltaY: +100,
      });
      cy.get("[class=content]").should(
        "have.css",
        "transform",
        "matrix(0.9, 0, 0, 0.9, -8.6, 24)"
      );
    });
  });
  // it("pans viewport when mouse clicks and drags", () => {
  //   cy.mount(VisualJSON, {
  //     props: {
  //       json: JSON.stringify(complexJson),
  //     },
  //   }).then(() => {
  //     cy.get("[class=content]").should(
  //       "have.css",
  //       "transform",
  //       "matrix(1, 0, 0, 1, 0, 0)"
  //     );
  //     cy.get("[class=visualjson]")
  //       .trigger("mousedown", {
  //         clientX: 20,
  //         clientY: 20,
  //       })
  //       .then(() => {
  //         cy.get("[class=visualjson]").trigger("mousemove", {
  //           clientX: 100,
  //           clientY: 100,
  //         });
  //       })
  //       .then(() => {
  //         cy.get("[class=visualjson]").trigger("mouseup", {
  //           clientX: 100,
  //           clientY: 100,
  //         });
  //       });
  //     cy.get("[class=content]").should(
  //       "have.css",
  //       "transform",
  //       "matrix(1, 0, 0, 1, 100, 100)"
  //     );
  //   });
  // });
});
