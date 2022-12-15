import * as React from "react";
import PensionBottom from "../../../src/components/pension/PensionBottom";

describe("PensionBottom.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionBottom />);

    //Checking that the component renders with the text
    cy.get('[data-test-id="paymentPercent"]').should(
      "have.text",
      "Procent af din løn"
    );
    cy.get('[data-test-id="paymentPercentOutText"]').should(
      "have.text",
      "Din pensionsudbetaling er svarende til % af din løn på pensionstidspunktet"
    );
    cy.get('[data-test-id="pensionBottomWrapper"]').contains("Book et møde");
    cy.get('[data-test-id="pensionBottomWrapper"]').contains("Eller prøv");
    cy.get('[data-test-id="pensionBottomWrapper"]')
      .contains("Dreamplan")
      .should("not.have.attr", "href", "#undefined");
  });
});
