import * as React from "react";
import PensionOverview from "../../../src/components/pension/PensionOverview";

describe("PensionOverview.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionOverview />);
    cy.get('[data-test-id="arrowDown"]').should("exist");
    cy.get('[data-test-id="pensionPaymentIn"]').should(
      "have.text",
      "Indbetaling"
    );
    cy.get('[data-test-id-input="inputPaymentIn"]').should(
      "have.attr",
      "placeholder",
      "pr. måned"
    );
    cy.get('[data-test-id="pensionPaymentInText"]').should(
      "have.text",
      " kr. før skat"
    );
    cy.get('[data-test-id="lockClosedPaymentIn"]').should("exist");

    cy.get('[data-test-id="arrowUp"]').should("exist");
    cy.get('[data-test-id="pensionPaymentOut"]').should(
      "have.text",
      "Udbetaling"
    );
    cy.get('[data-test-id-input="inputPaymentOut"]').should(
      "have.attr",
      "placeholder",
      "pr. måned"
    );
    cy.get('[data-test-id="pensionPaymentOutText"]').should(
      "have.text",
      " kr. før skat"
    );
    cy.get('[data-test-id="lockClosedPaymentOut"]').should("exist");
  });
});
