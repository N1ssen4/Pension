import * as React from "react";
import PensionInputAge from "../../../src/components/pension/PensionInputAge";

describe("PensionInputAge.cy.tsx", () => {
  it("Should render properly", () => {
    cy.mount(<PensionInputAge />);
    cy.get('[data-test-id="publicPensionAge"]').should(
      "have.text",
      "Folkepensions-alder"
    );
    cy.get('[data-test-id="wantedPensionAge"]').should(
      "have.text",
      "Ønsket Pensionsalder"
    );
    cy.get('[data-test-id-input="publicPensionAge"]').should(
      "have.attr",
      "placeholder",
      "Antal år"
    );
    cy.get('[data-test-id-input="publicPensionAge"]').should(
      "have.attr",
      "value",
      "72"
    );
    cy.get('[data-test-id="publicPensionYear"]').should("have.text", "YYYY");

    cy.get('[data-test-id-input="wantedPensionAge"]').should(
      "have.attr",
      "placeholder",
      "Antal år"
    );
    cy.get('[data-test-id-input="wantedPensionAge"]').should(
      "have.attr",
      "value",
      "0"
    );
    cy.get('[data-test-id="wantedPensionYear"]').should("have.text", "YYYY");
  });
});
