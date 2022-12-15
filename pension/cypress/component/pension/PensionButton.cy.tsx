import * as React from "react";
import PensionButton from "../../../src/components/pension/PensionButton";

describe("PensionButton.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionButton />);

    cy.get('[data-test-id="calendlyButton"]').contains("Book et møde");
    cy.get('[data-test-id="calendlyButton"]').should(
      "have.attr",
      "disabled",
      "disabled"
    );
    cy.get('[data-test-id="calendlyButtonWrapper"]').contains("Eller prøv");
    cy.get('[data-test-id="calendlyButtonWrapper"]')
      .contains("a")
      .should("have.attr", "href", "https://www.dreamplan.io/");
  });
});
