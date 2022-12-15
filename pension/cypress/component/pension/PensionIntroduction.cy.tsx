import * as React from "react";
import PensionIntroduction from "../../../src/components/pension/PensionIntroduction";

describe("PensionIntroduction.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionIntroduction />);
    cy.get('[data-test-id="pensionPageTitle"]').should("have.text", "Pension");
    cy.get('[data-test-id="pensionPageTitle"]').get("button").should("exist");
    cy.get('[data-test-id="pensionPageText"]').should(
      "have.text",
      "Her kan du se konsekvenserne af at ændre din pensionsalder:"
    );
  });
});
