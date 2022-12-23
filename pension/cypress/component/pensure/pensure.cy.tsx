import * as React from "react";
import PensureLinkButton from "../../../src/components/pensure/pensure";

describe("PensureLinkButton.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensureLinkButton forwardurl={""} />);
    cy.get('[data-test-id="pensureTitle"]').should("exist");
    cy.get('[data-test-id="pensureTitle"]').should(
      "have.text",
      "Hent automatisk din pensionsdata ved at benytte vores samarbejdspartner"
    );
    cy.get('[data-test-id="pensureButton"]').should("exist")
    cy.get('[data-test-id="pensureButton"]').should("have.text", "Pensure");
    cy.get('[data-test-id="pensureButtonWrapper"]').contains("a")
  });
});
