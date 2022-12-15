import * as React from "react";
import PensionDiagram from "../../../src/components/pension/PensionDiagram";

describe("PensionDiagram.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionDiagram />);
    cy.get('[data-test-id="pensionPaymentPercentIn"]').should("exist");
    cy.get('[data-test-id="pensionPaymentPercentOut"]').should("exist");
    cy.get('[data-test-id="pensionPaymentInDiagram"]').should("exist");
    cy.get('[data-test-id="pensionPaymentOutDiagram"]').should("exist");
  });
});
